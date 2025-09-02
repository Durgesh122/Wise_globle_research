import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiZapOff, FiLink, FiType, FiDroplet, FiMoon } from 'react-icons/fi';

// Simple universal accessibility icon (stick figure with arms), drawn as pure SVG
const A11yIcon = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <defs>
      <linearGradient id="a11y-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
    </defs>
    {/* Badge background */}
    <circle cx="32" cy="32" r="30" fill="url(#a11y-grad)" />
    {/* Person: head */}
    <circle cx="32" cy="22" r="5" fill="#ffffff" opacity="0.95" />
    {/* Arms */}
    <path d="M14 30 L50 30" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
    {/* Body */}
    <path d="M32 30 L32 44" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
    {/* Legs */}
    <path d="M32 44 L22 54" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
    <path d="M32 44 L42 54" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
  </svg>
);

// Lightweight global accessibility control panel
// - Persists settings to localStorage
// - Applies attrs/styles on <html> so it works app-wide

const STORAGE_KEY = 'a11ySettings';

const defaultSettings = {
  fontScale: 1.0, // multiplies root font-size
  highContrast: false,
  reduceMotion: false,
  highlightLinks: false,
  readableFont: false,
  grayscale: false,
  invert: false,
  lineHeight: 'normal', // 'normal' | 'relaxed'
};

function clampFontScale(value) {
  return Math.max(0.9, Math.min(1.8, parseFloat(value.toFixed(2))));
}

function applySettingsToDocument(settings) {
  const root = document.documentElement;

  // Root font size scaling (affects rem)
  root.style.fontSize = `${clampFontScale(settings.fontScale) * 100}%`;

  // Helper to set boolean data attributes as "true" so CSS selectors like
  // html[data-high-contrast="true"] match correctly across the site.
  const setBoolAttr = (name, isOn) => {
    if (isOn) root.setAttribute(name, 'true');
    else root.removeAttribute(name);
  };

  // Data attributes for CSS toggles
  setBoolAttr('data-high-contrast', !!settings.highContrast);
  setBoolAttr('data-reduce-motion', !!settings.reduceMotion);
  setBoolAttr('data-highlight-links', !!settings.highlightLinks);
  setBoolAttr('data-readable-font', !!settings.readableFont);
  setBoolAttr('data-grayscale', !!settings.grayscale);
  setBoolAttr('data-invert', !!settings.invert);

  if (settings.lineHeight === 'relaxed') {
    root.setAttribute('data-line-height', 'relaxed');
  } else {
    root.removeAttribute('data-line-height');
  }
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const firstInteractiveRef = useRef(null);
  const panelRef = useRef(null);
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultSettings;
      const parsed = JSON.parse(raw);
      return { ...defaultSettings, ...parsed };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    applySettingsToDocument(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore persistence errors
    }
  }, [settings]);

  useEffect(() => {
    // Close on Escape
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Focus first button inside menu for accessibility
    const id = setTimeout(() => firstInteractiveRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  // Very small focus trap: loop focus within panel when open
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      const root = panelRef.current;
      if (!root) return;
      const foci = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (foci.length === 0) return;
      const first = foci[0];
      const last = foci[foci.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const btnCommon = 'px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400';
  const switchCls = (active) => `inline-flex items-center justify-between w-full ${btnCommon} ${active ? 'ring-1 ring-green-400' : ''}`;

  const increaseFont = () => setSettings((s) => ({ ...s, fontScale: clampFontScale(s.fontScale + 0.1) }));
  const decreaseFont = () => setSettings((s) => ({ ...s, fontScale: clampFontScale(s.fontScale - 0.1) }));
  const resetFont = () => setSettings((s) => ({ ...s, fontScale: 1.0 }));

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));
  const setLineHeight = (val) => setSettings((s) => ({ ...s, lineHeight: val }));

  const resetAll = () => setSettings(defaultSettings);

  // Place on the right, just above the chat widget
  return (
    <div aria-live="polite" aria-relevant="additions text" className="z-[1000]">
      {/* Floating trigger button */}
      <button
        type="button"
        aria-label="Accessibility options"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-40 right-6 md:right-6 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 w-14 h-14 flex items-center justify-center"
      >
        <A11yIcon className="w-9 h-9" />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility menu"
          className="fixed left-0 right-0 bottom-0 sm:left-auto sm:right-6 sm:bottom-56 w-full sm:w-[320px] max-w-[100vw] sm:max-w-[92vw] rounded-t-2xl sm:rounded-xl bg-gray-900/95 text-white shadow-2xl border border-white/10 backdrop-blur p-3 md:p-4 space-y-3 z-[1001]"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center">
                <A11yIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold leading-tight">Accessibility</h2>
                <p className="text-[11px] text-white/70">Adjust for better readability</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className={btnCommon} aria-label="Close accessibility menu">✕</button>
          </div>

          {/* Text size */}
          <div className="space-y-2">
            <div className="text-xs opacity-80">Text size</div>
            <div className="flex items-center gap-2">
              <button ref={firstInteractiveRef} onClick={decreaseFont} className={`${btnCommon} px-3 py-2`} aria-label="Decrease text size">A−</button>
              <button onClick={resetFont} className={`${btnCommon} px-3 py-2`} aria-label="Reset text size">A</button>
              <button onClick={increaseFont} className={`${btnCommon} px-3 py-2`} aria-label="Increase text size">A+</button>
              <div className="ml-auto text-xs opacity-80" aria-live="polite">{Math.round(settings.fontScale * 100)}%</div>
            </div>
          </div>

          {/* Line height */}
          <div className="space-y-2">
            <div className="text-xs opacity-80">Line spacing</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLineHeight('normal')} className={`${switchCls(settings.lineHeight === 'normal')} py-2`} aria-pressed={settings.lineHeight === 'normal'}>Normal</button>
              <button onClick={() => setLineHeight('relaxed')} className={`${switchCls(settings.lineHeight === 'relaxed')} py-2`} aria-pressed={settings.lineHeight === 'relaxed'}>Relaxed</button>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button onClick={() => toggle('highContrast')} className={`${switchCls(settings.highContrast)} py-2`} aria-pressed={settings.highContrast}>
              <span className="flex items-center gap-2"><FiSun className="opacity-90" /> High contrast</span>
            </button>
            <button onClick={() => toggle('reduceMotion')} className={`${switchCls(settings.reduceMotion)} py-2`} aria-pressed={settings.reduceMotion}>
              <span className="flex items-center gap-2"><FiZapOff className="opacity-90" /> Reduce motion</span>
            </button>
            <button onClick={() => toggle('highlightLinks')} className={`${switchCls(settings.highlightLinks)} py-2`} aria-pressed={settings.highlightLinks}>
              <span className="flex items-center gap-2"><FiLink className="opacity-90" /> Highlight links</span>
            </button>
            <button onClick={() => toggle('readableFont')} className={`${switchCls(settings.readableFont)} py-2`} aria-pressed={settings.readableFont}>
              <span className="flex items-center gap-2"><FiType className="opacity-90" /> Readable font</span>
            </button>
            <button onClick={() => toggle('grayscale')} className={`${switchCls(settings.grayscale)} py-2`} aria-pressed={settings.grayscale}>
              <span className="flex items-center gap-2"><FiDroplet className="opacity-90" /> Grayscale</span>
            </button>
            <button onClick={() => toggle('invert')} className={`${switchCls(settings.invert)} py-2`} aria-pressed={settings.invert}>
              <span className="flex items-center gap-2"><FiMoon className="opacity-90" /> Invert colors</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <button onClick={resetAll} className={`${btnCommon} w-full py-2`} aria-label="Reset accessibility settings">Reset</button>
            <button onClick={() => setOpen(false)} className={`${btnCommon} w-full py-2`} aria-label="Done and close">Done</button>
          </div>

          <p className="text-[10px] opacity-60 mt-1">Settings are saved on this device.</p>
        </div>
      )}
    </div>
  );
}
