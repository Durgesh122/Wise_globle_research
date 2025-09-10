import React from 'react';
import { Link } from 'react-router-dom';
import AccessibleMedia from '../components/AccessibleMedia';


import { Helmet } from 'react-helmet-async';
export default function AccessibilityStatement() {
  // Format date as `DD MMMM YYYY`
  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  const lastUpdated = formatDate(new Date());

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleDownloadJSON = () => {
    const conformance = {
      name: 'Wise Global Accessibility Statement',
      version: '2025-09',
      standard: 'WCAG 2.1 Level AA',
      updatedOn: new Date().toISOString(),
      testing: ['axe', 'eslint-plugin-jsx-a11y', 'pa11y', 'keyboard walkthroughs', 'screen reader spot checks'],
      features: [
        'Keyboard navigation',
        'Semantic HTML & ARIA',
        'High contrast support',
        'Text size & motion controls',
        'Clear form labels & errors',
        'Captions & transcripts for media',
      ],
      knownLimitations: [
        'Some third-party widgets may have constraints; alternatives provided where possible.',
      ],
      contact: {
        email: 'support@wiseglobal.example',
        feedbackPath: '/accessibility-feedback',
        sla: 'Typically respond within 5 business days',
      },
    };

    const blob = new Blob([JSON.stringify(conformance, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessibility-conformance.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Accessibility Statement – Wise Global Research Services',
    inLanguage: 'en',
    mainEntity: {
      '@type': 'CreativeWork',
      accessibilitySummary:
        'This site targets WCAG 2.1 Level AA with keyboard navigation, semantic markup, contrast, media captions/transcripts, and user controls for text size and motion.',
      accessibilityFeature: [
        'alternativeText',
        'captions',
        'transcript',
        'highContrast',
        'resizeText',
        'displayTransformability',
        'structuralNavigation',
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>Accessibility Statement - Wise Global Research</title>
        <meta name="description" content="Accessibility Statement page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/accessibilitystatement" />
      </Helmet>
      <section aria-labelledby="a11y-title" className="min-h-screen text-white p-4 sm:p-6 md:p-10 print:bg-white print:text-black">
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
          {/* Easy Read summary */}
          <div className="inline-block text-left w-full">
            <h2 className="text-2xl font-semibold text-center">Easy Read summary</h2>
            <p className="mt-2 text-white/85">
              This website should be easy to use for everyone. You can use the keyboard, change text size, and turn off
              animations. Videos have captions and transcripts. If you face any problem, you can tell us.
            </p>
          </div>

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

          {/* WCAG self-audit summary */}
          <div>
            <h2 className="text-2xl font-semibold">WCAG 2.1 AA self-audit (summary)</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-white/20 rounded-lg">
                <caption className="sr-only">Summary of notable WCAG success criteria status</caption>
                <thead className="bg-white/10">
                  <tr>
                    <th scope="col" className="px-3 py-2">Criterion</th>
                    <th scope="col" className="px-3 py-2">Description</th>
                    <th scope="col" className="px-3 py-2">Status</th>
                    <th scope="col" className="px-3 py-2">Last check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-white/5">
                    <th scope="row" className="px-3 py-2 whitespace-nowrap">1.3.1</th>
                    <td className="px-3 py-2">Info and Relationships</td>
                    <td className="px-3 py-2 text-green-300">Compliant</td>
                    <td className="px-3 py-2">{lastUpdated}</td>
                  </tr>
                  <tr className="odd:bg-white/5">
                    <th scope="row" className="px-3 py-2 whitespace-nowrap">1.4.3</th>
                    <td className="px-3 py-2">Contrast (Minimum)</td>
                    <td className="px-3 py-2 text-green-300">Compliant</td>
                    <td className="px-3 py-2">{lastUpdated}</td>
                  </tr>
                  <tr className="odd:bg-white/5">
                    <th scope="row" className="px-3 py-2 whitespace-nowrap">2.1.1</th>
                    <td className="px-3 py-2">Keyboard</td>
                    <td className="px-3 py-2 text-green-300">Compliant</td>
                    <td className="px-3 py-2">{lastUpdated}</td>
                  </tr>
                  <tr className="odd:bg-white/5">
                    <th scope="row" className="px-3 py-2 whitespace-nowrap">2.4.7</th>
                    <td className="px-3 py-2">Focus Visible</td>
                    <td className="px-3 py-2 text-green-300">Compliant</td>
                    <td className="px-3 py-2">{lastUpdated}</td>
                  </tr>
                </tbody>
              </table>
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

          {/* Quick help */}
          <div>
            <h2 className="text-2xl font-semibold">Quick help: keyboard & landmarks</h2>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Use Tab/Shift+Tab to move between interactive elements.</li>
                <li>Use the skip link (visible on focus) to jump to main content.</li>
                <li>Regions: header, navigation, main, complementary, and contentinfo.</li>
              </ul>
            </div>
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

          {/* Live test snapshot (placeholder) */}
          <div>
            <h2 className="text-2xl font-semibold">Latest automated scan (snapshot)</h2>
            <p className="mt-2 text-white/85">Summary from our most recent automated scan.</p>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Critical: 0</li>
                <li>Serious: 0</li>
                <li>Moderate/Minor: few, under review</li>
                <li>Last run: {lastUpdated}</li>
              </ul>
            </div>
            <p className="mt-2 text-white/60 text-sm">Note: Programmatic CI wiring can publish exact counts here.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Known limitations</h2>
            <p className="mt-2 text-white/85">
              Some third‑party widgets or tools may be outside our direct control. Where possible, we provide
              alternative solutions or fallbacks.
            </p>
            <div className="mt-3 inline-block text-left">
              <ul className="list-disc list-inside marker:text-green-300/90">
                <li>Embedded maps and some analytics dashboards</li>
                <li>External chat or survey widgets</li>
              </ul>
            </div>
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
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/accessibility-statement.html"
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
                aria-label="Download HTML version"
              >
                Download HTML version
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
              >
                Save as PDF (Print)
              </button>
              <button
                type="button"
                onClick={handleDownloadJSON}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
              >
                Download JSON conformance
              </button>
            </div>
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
            <p className="mt-3 text-white/70 text-sm">
              Standards and references: <a className="underline hover:text-green-200" href="https://www.w3.org/TR/WCAG21/">WCAG 2.1</a> •{' '}
              <a className="underline hover:text-green-200" href="https://www.w3.org/WAI/">WAI</a> • SEBI digital accessibility guidance
            </p>
          </div>

          <p className="text-sm text-white/70">Last updated: {lastUpdated}</p>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </div>
    </section>
    </>
  );
}
