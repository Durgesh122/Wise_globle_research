import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

export default function AccessibilityFeedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    pageUrl: '',
    type: 'issue', // issue | suggestion | question
    severity: 'medium', // low | medium | high
    device: 'desktop', // desktop | mobile | tablet
    browser: '',
    assistiveTech: '',
    message: '',
    consent: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please provide your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Describe the accessibility issue or suggestion';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        pageUrl: form.pageUrl.trim() || (typeof window !== 'undefined' ? window.location.href : ''),
        type: form.type,
        severity: form.severity,
        device: form.device,
        browser: form.browser.trim() || null,
        assistiveTech: form.assistiveTech.trim() || null,
        message: form.message.trim(),
        consent: !!form.consent,
        timestamp: Date.now(),
      };
      const result = await push(ref(db, 'accessibilityFeedback'), payload);
      setSubmissionId(result.key);
      setSubmitted(true);
      // optional: reset form
      setForm({
        name: '',
        email: '',
        subject: '',
        pageUrl: '',
        type: 'issue',
        severity: 'medium',
        device: 'desktop',
        browser: '',
        assistiveTech: '',
        message: '',
        consent: true,
      });
    } catch (err) {
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center p-4">
        <div role="status" aria-live="polite" className="w-full max-w-xl p-6 rounded-xl bg-green-900/30 border border-green-600 backdrop-blur">
          <h1 className="text-2xl font-semibold mb-2">Thank you</h1>
          <p>Your accessibility feedback has been recorded. We will review and address it as soon as possible.</p>
          {submissionId && (
            <p className="text-sm text-white/80 mt-2">Submission ID: <span className="font-mono">{submissionId}</span></p>
          )}
          <a href="/" className="inline-block mt-4 px-4 py-2 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">Go home</a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-2xl bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 sm:p-6 text-white">
        <h1 className="text-3xl font-semibold text-center">Accessibility Feedback</h1>
        <p className="text-white/80 text-center mt-1">Report barriers or suggest improvements. Fields marked * are required.</p>

        {errors.submit && <div className="mt-3 p-3 rounded bg-red-900/40 border border-red-600 text-sm">{errors.submit}</div>}

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name *</label>
            <input id="name" name="name" type="text" value={form.name} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
            {errors.name && <div id="name-err" className="text-red-300 text-sm mt-1">{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email *</label>
            <input id="email" name="email" type="email" value={form.email} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} />
            {errors.email && <div id="email-err" className="text-red-300 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1">Subject</label>
            <input id="subject" name="subject" type="text" value={form.subject} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black" />
          </div>
          <div>
            <label htmlFor="pageUrl" className="block mb-1">Page URL</label>
            <input id="pageUrl" name="pageUrl" type="url" value={form.pageUrl} onChange={onChange} placeholder="https://example.com/page" className="w-full rounded-md px-3 py-2 text-black" />
          </div>

          <div>
            <label htmlFor="type" className="block mb-1">Type</label>
            <select id="type" name="type" value={form.type} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black">
              <option value="issue">Issue</option>
              <option value="suggestion">Suggestion</option>
              <option value="question">Question</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Severity</label>
            <div className="flex gap-3 items-center h-10">
              {['low','medium','high'].map((s) => (
                <label key={s} className="inline-flex items-center gap-1 text-sm">
                  <input type="radio" name="severity" value={s} checked={form.severity===s} onChange={onChange} /> {s[0].toUpperCase()+s.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="device" className="block mb-1">Device</label>
            <select id="device" name="device" value={form.device} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black">
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div>
            <label htmlFor="browser" className="block mb-1">Browser</label>
            <input id="browser" name="browser" type="text" value={form.browser} onChange={onChange} placeholder="e.g., Chrome 126" className="w-full rounded-md px-3 py-2 text-black" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="assistiveTech" className="block mb-1">Assistive technology (if any)</label>
            <input id="assistiveTech" name="assistiveTech" type="text" value={form.assistiveTech} onChange={onChange} placeholder="e.g., NVDA, VoiceOver, keyboard-only" className="w-full rounded-md px-3 py-2 text-black" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-1">Issue or suggestion *</label>
            <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} className="w-full rounded-md px-3 py-2 text-black" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'msg-err' : undefined} />
            {errors.message && <div id="msg-err" className="text-red-300 text-sm mt-1">{errors.message}</div>}
          </div>

          <div className="sm:col-span-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="consent" checked={!!form.consent} onChange={(e)=> setForm((f)=>({...f, consent: e.target.checked}))} />
              I agree to be contacted about my feedback
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          <button type="submit" disabled={submitting} className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
          <a href="/" className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400">Cancel</a>
        </div>
      </form>
    </section>
  );
}
