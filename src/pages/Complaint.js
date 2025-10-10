import React, { useState, useContext } from 'react';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaCheckCircle,
  FaRegClock,
  FaUserTie
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { ThemeContext } from '../context/ThemeContext';

import { Helmet } from 'react-helmet-async';
const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaintType: '',
    description: '',
    resolution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const complaintTypes = [
    "Service Delay", "Research Quality", "Miscommunication",
    "Refund Request", "Technical Issue", "Billing Problem", "Other"
  ];

  const { theme, gradients } = useContext(ThemeContext);
  const activeTheme = gradients[theme] || gradients['default'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentStep(4);
    // Save complaint to RTDB
    try {
      const newComplaint = {
        ...formData,
        timestamp: Date.now()
      };
      try {
        await push(ref(db, 'complaints'), newComplaint);
        setSubmitted(true);
      } catch (dbErr) {
        console.warn('Complaint page: RTDB push failed', dbErr);
        if (dbErr && (dbErr.code === 'PERMISSION_DENIED' || /permission_denied/i.test(dbErr.message || ''))) {
          // Attempt best-effort email fallback
          try {
            const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const port = (typeof window !== 'undefined' && window.location.port) ? window.location.port : '';
            const useRelative = (process.env.REACT_APP_USE_LOCAL_SEND_EMAIL === 'true') || (isLocalhost && port === '3001');
            const endpoint = useRelative ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
            await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: newComplaint.name || '',
                email: newComplaint.email || '',
                mobile: newComplaint.mobile || '',
                city: '',
                interest: 'Complaint Form (fallback)',
                message: `Type: ${newComplaint.complaintType}\n\nDescription: ${newComplaint.description}\n\nPreferred resolution: ${newComplaint.resolution || ''}`,
                source: 'Complaints-fallback'
              })
            });
            setSubmitted(true);
          } catch (fallbackErr) {
            console.error('Complaint page: fallback failed', fallbackErr);
            toast.error('Failed to submit complaint. Please try again later.');
            setCurrentStep(3);
            return;
          }
        } else {
          throw dbErr;
        }
      }
      // Best-effort: also notify server to send an email copy to support
      (async () => {
            try {
              // Use relative endpoint in development only when appropriate
              const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
              const port = (typeof window !== 'undefined' && window.location.port) ? window.location.port : '';
              const useRelative = (process.env.REACT_APP_USE_LOCAL_SEND_EMAIL === 'true') || (isLocalhost && port === '3001');
              const endpoint = useRelative ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newComplaint.name || '',
              email: newComplaint.email || '',
              mobile: newComplaint.mobile || '',
              city: '',
              interest: 'Complaint Form',
              message: `Type: ${newComplaint.complaintType}\n\nDescription: ${newComplaint.description}\n\nPreferred resolution: ${newComplaint.resolution || ''}`,
              source: 'Complaints'
            })
          });
        } catch (err) {
          console.warn('Failed to POST to /send-email from Complaint page:', err);
        }
      })();
    } catch (error) {
      console.error('Error saving complaint:', error);
      toast.error('Failed to submit complaint: ' + error.message);
      setCurrentStep(3); // return to review so user can retry
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <>
      <Helmet>
        <title>Complaint - Wise Global Research</title>
        <meta name="description" content="Complaint page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/complaint" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          minHeight: '100vh',
          background: activeTheme.background,
          color: activeTheme.textColor,
          transition: activeTheme.transition,
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative background glows */}
        <div aria-hidden={true} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 25% 25%, rgba(99,102,241,0.16), rgba(99,102,241,0.02) 40%)', filter: 'blur(72px)', top: '-8%', left: '-6%' }} />
          <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle at 75% 75%, rgba(99,102,241,0.10), rgba(99,102,241,0.00) 40%)', filter: 'blur(56px)', bottom: '-12%', right: '-6%' }} />
        </div>

        <div className="px-4 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            {/* Outer grouped card: header, progress, form inside this */}
            <div className="w-full" style={{ border: '2px solid #6366f1', borderRadius: 20, background: '#fff', boxShadow: '0 12px 48px rgba(60,60,120,0.08)', padding: 'clamp(18px, 4vw, 36px)' }}>
              {/* Header */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6 sm:mb-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-red-100 text-red-600 p-3 rounded-full mb-4"
                  style={{ background: 'rgba(255,0,0,0.08)' }}
                >
                  <RiCustomerService2Fill className="text-3xl text-indigo-700" />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-800">
                  <Trans i18nKey="pages.Complaint.investor">Investor</Trans>
                  <span className="mx-1"><Trans i18nKey="pages.Complaint.grievance">Grievance</Trans></span>
                  <Trans i18nKey="pages.Complaint.portal">Portal</Trans>
                </h1>
                <p className="text-base sm:text-lg max-w-2xl mx-auto text-black" style={{ opacity: 0.92 }}>
                  <Trans i18nKey="pages.Complaint.your-concerns-are-our-priority-we-re-seb">
                    Your concerns are our priority — we&apos;re committed under SEBI guidelines to resolve complaints within
                  </Trans>{" "}
                  <span className="font-semibold text-indigo-700"><Trans i18nKey="pages.Complaint.7-working-days">7 working days</Trans></span>.
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6 sm:mb-10"
              >
                <div className="flex justify-between relative flex-wrap gap-2 sm:gap-0">
                  {[1, 2, 3, 4].map((step) => (
                    <motion.div
                      key={step}
                      whileHover={{ scale: 1.1 }}
                      className={`flex flex-col items-center z-10 ${currentStep >= step ? 'text-indigo-700' : 'text-black dark:text-gray-400'}`}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        {step === 4 ? <FaCheckCircle className="text-xl" /> : <span className="font-bold">{step}</span>}
                      </div>
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-black dark:text-gray-400" style={{ opacity: 0.8 }}>
                        {['Details', 'Complaint', 'Review', 'Submit'][step - 1]}
                      </span>
                    </motion.div>
                  ))}
                  <div className="absolute top-5 sm:top-6 left-0 right-0 h-1 bg-gray-100 -z-1" style={{ borderRadius: 8 }}>
                    <motion.div
                      className="h-full bg-indigo-600"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentStep - 1) * 33.33}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <AnimatePresence>
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl overflow-hidden w-full"
              style={{
                background: '#fff',
                color: '#0b1220',
                boxShadow: '0 8px 32px 0 rgba(60,60,120,0.12), 0 1.5px 8px 0 rgba(99,102,241,0.08)',
                margin: '0 auto',
                width: '100%',
                padding: 'clamp(12px, 4vw, 32px)',
                borderRadius: 20,
                border: '2px solid #6366f1',
              }}
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-800">
                    <FaUserTie className="text-indigo-600" /><Trans i18nKey="pages.Complaint.your-information">Your Information</Trans></h2>
                  <div className="space-y-4 sm:space-y-5">
                    {["name", "email", "mobile"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-2xs xs:text-xs sm:text-sm font-medium mb-1 capitalize text-black">
                          {field === "email" ? "Client ID / Email" : field.replace(/^\w/, c => c.toUpperCase())} *
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-black text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          style={{ color: '#0b1220', background: 'rgba(255,255,255,0.95)' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow"
                      disabled={!formData.name || !formData.email || !formData.mobile}
                    ><Trans i18nKey="pages.Complaint.next-complaint-details">Next: Complaint Details</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2 text-[#6366f1]">
                    <FaExclamationTriangle className="text-[#6366f1]" /><Trans i18nKey="pages.Complaint.complaint-details">Complaint Details</Trans></h2>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.nature-of-complaint">Nature of Complaint *</Trans></label>
                      <select
                        name="complaintType"
                        value={formData.complaintType}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-black text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        style={{ color: '#0b1220', background: 'rgba(255,255,255,0.95)' }}
                      >
                        <option value=""><Trans i18nKey="pages.Complaint.select-complaint-type">Select complaint type</Trans></option>
                        {complaintTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.description">Description *</Trans></label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-black text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        style={{ color: '#0b1220', background: 'rgba(255,255,255,0.95)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.preferred-resolution">Preferred Resolution</Trans></label>
                      <input
                        type="text"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-black text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        style={{ color: '#0b1220', background: 'rgba(255,255,255,0.95)' }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm sm:text-base border border-indigo-200"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.complaintType || !formData.description}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow"
                    ><Trans i18nKey="pages.Complaint.next-review">Next: Review</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-800">
                    <FaRegClock className="text-indigo-600" /><Trans i18nKey="pages.Complaint.review-your-complaint">Review Your Complaint</Trans></h2>
                  <div className="space-y-3 text-sm text-black dark:text-gray-300">
                    <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.name">Name:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.name}</span></p>
                    <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.email-client-id">Email / Client ID:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.email}</span></p>
                    <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.mobile">Mobile:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.mobile}</span></p>
                    <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.complaint-type">Complaint Type:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.complaintType}</span></p>
                    <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.description-1">Description:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.description}</span></p>
                    {formData.resolution && (
                      <p><strong className="text-black dark:text-gray-300"><Trans i18nKey="pages.Complaint.preferred-resolution-2">Preferred Resolution:</Trans></strong> <span className="text-black dark:text-gray-400">{formData.resolution}</span></p>
                    )}
                    <div className="mt-3 text-xs text-black dark:text-gray-300 space-y-1">
                      <p>* Inclusive of complaints of previous years resolved in the current year.</p>
                      <p># Inclusive of complaints pending as on the last day of the year. (as on 31st March)</p>
                      <p>* Inclusive of complaints of previous months resolved in the current month.</p>
                      <p># Inclusive of complaints pending as on the last day of the month.</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start text-xs sm:text-sm" style={{ color: '#374151', opacity: 0.9 }}>
                    <input id="complaint-confirm" name="complaintConfirm" type="checkbox" required className="mr-2 mt-1 accent-indigo-600" />
                    <label htmlFor="complaint-confirm" className="text-sm text-black"><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and-"><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and--1">I confirm this complaint is genuine and understand it will be registered as per SEBI compliance.</Trans></Trans></label>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm sm:text-base border border-indigo-200"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="submit"
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg text-sm sm:text-base shadow"
                    ><Trans i18nKey="pages.Complaint.submit-complaint">Submit Complaint</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                <motion.div className="p-4 sm:p-8 text-center">
                  <FaPaperPlane className="text-indigo-600 text-4xl mb-4 animate-bounce" />
                  <p className="text-base sm:text-lg" style={{ color: '#0b1220' }}><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait"><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait-1">Submitting your complaint, please wait...</Trans></Trans></p>
                </motion.div>
              )}
            </motion.form>
            ) : (
            <motion.div
              className="bg-white rounded-2xl text-center w-full"
              style={{
                background: '#fff',
                color: '#0b1220',
                boxShadow: '0 8px 32px 0 rgba(60,60,120,0.12), 0 1.5px 8px 0 rgba(99,102,241,0.08)',
                margin: '0 auto',
                width: '100%',
                padding: 'clamp(12px, 4vw, 32px)',
                borderRadius: 20,
                border: '2px solid #6366f1',
              }}
            >
              <FaCheckCircle className="text-indigo-600 text-4xl mb-4 mx-auto" />
              <h2 className="text-base sm:text-xl font-bold" style={{ color: '#0b1220' }}><Trans i18nKey="pages.Complaint.complaint-registered-successfully"><Trans i18nKey="pages.Complaint.complaint-registered-successfully-1">Complaint Registered Successfully!</Trans></Trans></h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg text-sm sm:text-base shadow"
              ><Trans i18nKey="pages.Complaint.submit-another-complaint">Submit Another Complaint</Trans></button>
            </motion.div>
          )}
        </AnimatePresence>

              </div>
            </div>
        </div>
      </motion.div>
    </>
  );
};

export default Complaint;
