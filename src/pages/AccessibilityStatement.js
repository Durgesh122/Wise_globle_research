import React from 'react';
import { Link } from 'react-router-dom';
import AccessibleMedia from '../components/AccessibleMedia';

export default function AccessibilityStatement() {
  return (
    <section aria-labelledby="a11y-title" className="min-h-screen text-white p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 id="a11y-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Accessibility Statement
        </h1>
        <p className="mt-3 text-white/80">
          We are committed to ensuring our website and services are accessible and usable by all users, including
          persons with disabilities. Our goal is to provide an inclusive digital environment aligned with SEBI’s
          digital accessibility guidelines and the WCAG 2.1 Level AA standards.
        </p>

        <div className="mt-10 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold">Conformance status</h2>
            <p className="mt-2 text-white/85">
              Our target is WCAG 2.1 Level AA conformance. To achieve and maintain this, we regularly:
            </p>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Run automated accessibility scans</li>
                <li>Conduct manual audits</li>
                <li>Incorporate user feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">What we’ve implemented</h2>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Keyboard navigable interface and visible focus states</li>
                <li>Semantic HTML and appropriate ARIA labels where needed</li>
                <li>Color contrast improvements and High Contrast mode</li>
                <li>Options to adjust text size, line spacing, and motion reduction</li>
                <li>Clear form labels, instructions, and error feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Compatibility</h2>
            <p className="mt-2 text-white/85">
              The site is compatible with modern browsers (Chromium, Firefox, Safari) and leading screen readers
              (NVDA, JAWS, VoiceOver) on supported operating systems.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">How we test</h2>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Automated scans (axe, eslint-plugin-jsx-a11y, pa11y)</li>
                <li>Keyboard-only walkthroughs of key user flows</li>
                <li>Screen reader spot checks (NVDA/VoiceOver)</li>
                <li>Regular improvements based on user feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Known limitations</h2>
            <p className="mt-2 text-white/85">
              Some third‑party widgets or tools may be outside our direct control. Where possible, we provide
              alternative solutions or fallbacks.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Media accessibility</h2>
            <p className="mt-2 text-white/85">
              For audio/video content we publish, we will provide:
            </p>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Synchronized captions</li>
                <li>Full transcripts</li>
                <li>Indian Sign Language (ISL) interpretation where appropriate</li>
              </ul>
            </div>
            <p className="mt-3 text-white/85">The preview below demonstrates our standard accessible media layout.</p>
            <div className="mt-6">
              <AccessibleMedia
                type="video"
                title="Sample media accessibility layout (preview)"
                description="Non-functional preview to communicate our commitment to accessible media."
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Controls for you</h2>
            <p className="mt-2 text-white/85">
              Use the Accessibility Menu (floating button) to change text size, contrast, line spacing, motion, and more.
              Shortcut: press “/” or Ctrl/⌘+K to jump directly to site search.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Feedback and contact</h2>
            <p className="mt-2 text-white/85">
              If you encounter any accessibility issues or need content in an alternative format, please tell us.
              We typically respond within 5 business days.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Link to="/accessibility-feedback" className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-green-200 underline-offset-2">
                Open Accessibility Feedback form
              </Link>
              <a href="mailto:support@wiseglobal.example" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20">
                support@wiseglobal.example
              </a>
            </div>
          </div>

          <p className="text-sm text-white/70">Last updated: 02 September 2025</p>
        </div>
      </div>
    </section>
  );
}
