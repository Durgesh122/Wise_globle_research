import React, { useState, useEffect, useRef, useContext, startTransition } from 'react';
import { FiHome, FiGrid, FiUsers, FiBarChart2, FiCreditCard, FiAlertCircle, FiPhone, FiFileText, FiChevronRight } from 'react-icons/fi';
// useTranslation removed from this file to rely on translateWithFallback helper
import { Link, useLocation } from 'react-router-dom';
// Removed react-icons usage per requirement to have no icons in the navbar
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

// Contact info for top header bar (update with real company details)
const CONTACT = {
  email: 'support@wiseglobalresearch.com',
  phone: '+91-9977909494',
  socials: {
    facebook: 'https://facebook.com/wiseglobal',
    twitter: 'https://x.com/wiseglobal',
    instagram: 'https://instagram.com/wiseglobal',
    linkedin: 'https://linkedin.com/company/wiseglobal',
    youtube: 'https://youtube.com/@wiseglobal',
  },
};

// Lightweight inline social icons (no extra deps)
function SocialIcon({ type, className = 'w-6 h-6' }) {
  const common = { width: 10, height: 10, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  switch (type) {
    case 'facebook':
      return (
        <svg {...common} className={className} role="img" aria-label="Facebook icon">
          <path d="M22 12.06C22 6.49 17.52 2 11.94 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.98v-7.06H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34v7.06C18.34 21.24 22 17.08 22 12.06z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...common} className={className} role="img" aria-label="X (Twitter) icon">
          <path d="M18.244 2H21l-6.5 7.432L22 22h-6.875l-4.8-6.223L4.83 22H2l7.033-8.04L2 2h6.953l4.36 5.73L18.244 2zm-1.203 18h1.884L7.04 4H5.044l11.997 16z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} className={className} role="img" aria-label="Instagram icon">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1.2 1.2 0 11-1.2-1.2A1.2 1.2 0 0118 6.2z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} className={className} role="img" aria-label="LinkedIn icon">
          <path d="M6.94 21.5H3.56V9.25H6.94V21.5zM5.25 7.79A1.85 1.85 0 115.24 4.1a1.85 1.85 0 01.01 3.69zM21.5 21.5h-3.37v-6.3c0-1.5-.53-2.52-1.85-2.52-1.01 0-1.62.68-1.89 1.34-.1.25-.13.6-.13.95v6.53h-3.37s.04-10.6 0-11.7h3.37v1.66c.45-.69 1.25-1.67 3.05-1.67 2.22 0 3.89 1.45 3.89 4.58v7.13z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common} className={className} role="img" aria-label="YouTube icon">
          <path d="M23.5 7.5s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1C16.97 3.75 12 3.75 12 3.75h-.01s-4.97 0-8.2.39c-.46.05-1.46.05-2.36 1C.73 5.86.5 7.5.5 7.5S.25 9.4.25 11.3v1.4c0 1.9.25 3.8.25 3.8s.23 1.64.94 2.36c.9.95 2.08.92 2.61 1.02 1.9.18 8 .38 8 .38s4.97 0 8.2-.39c.46-.05 1.46-.05 2.36-1 .71-.72.94-2.36.94-2.36s.25-1.9.25-3.8v-1.4c0-1.9-.25-3.8-.25-3.8zM9.75 14.62V7.99l6.25 3.31-6.25 3.32z"/>
        </svg>
      );
    default:
      return null;
  }
}

// Removed older TopContactBar variant and inline icon components; using a single theme-aware TopContactBar below.

// Fallback helpers: when i18n is not loaded or a key isn't translated,
// produce a readable label from the key (e.g. 'navbar.home' -> 'Home').
function humanizeKey(key) {
  if (!key || typeof key !== 'string') return '';
  // Use last segment after dot or slash
  const parts = key.split(/[./]/);
  let last = parts[parts.length - 1];
  // Replace dashes/underscores with spaces
  last = last.replace(/[-_]/g, ' ');
  // Split camelCase boundaries: fooBar -> foo Bar
  last = last.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Split on non-alphanumeric and collapse spaces
  const words = last.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function translate(tFunc, key) {
  try {
    if (typeof tFunc === 'function') {
      const translated = tFunc(key);
      // If translation is missing react-i18next often returns the key itself.
      if (translated && translated !== key && !/\S+\.\S+/.test(translated)) {
  return translated;
      }
    }
  } catch (e) {
    // ignore and fallback
  }
  return humanizeKey(key);
}

// Central fallback wrapper used throughout the component.
// Uses i18n translator when available, falls back to explicit labels or humanized key.
function translateWithFallback(tFunc, key) {
  if (!key) return '';
  // Try translator first
  try {
    if (typeof tFunc === 'function') {
      const translated = tFunc(key);
      if (translated && translated !== key && !/\S+\.\S+/.test(translated)) {
        return translated;
      }
    }
  } catch (e) {
    // ignore and fallback below
  }

  // If explicit fallback label exists, return it
  if (labelsFallbacks && Object.prototype.hasOwnProperty.call(labelsFallbacks, key)) {
    return labelsFallbacks[key];
  }

  // Reuse the safer translate() helper which will humanize the key
  return translate(tFunc, key) || '';
}

// Explicit fallbacks for key labels that should show specific text
const labelsFallbacks = {
  'navbar.home': 'Home',
  'navbar.services.title': 'Services',
  'navbar.company.title': 'Company',
  'navbar.hrZone.title': 'HR Zone',
  'navbar.insights.title': 'Insights',
  'navbar.dashboard.title': 'Dashboard',
  'navbar.payment': 'Payment',
  'navbar.complaintBox': 'Complaint Box',
  'navbar.contactUs': 'Enquiry Now',
  'navbar.researchReports': 'Research Reports',
  // Accessibility
  'navbar.accessibility.title': 'Accessibility',
  'navbar.accessibility.statement': 'Accessibility Statement',
  'navbar.accessibility.feedback': 'Accessibility Feedback',
  'navbar.accessibility.search': 'Search',
  'navbar.accessibility.media': 'Media',
  // Explicit category titles for Services mega menu
  'navbar.services.cash.title': 'Cash',
  'navbar.services.option.title': 'Option',
  'navbar.services.specialization.title': 'Specialization',
  'navbar.services.index.title': 'Index',
  'navbar.services.mcx.title': 'MCX',
  'navbar.more': 'More',
  'navbar.more.disclaimer': 'Disclaimer',
  'navbar.more.disclosure': 'Disclosure',
  'navbar.more.privacy': 'Privacy Policy',
  'navbar.more.refund': 'Refund Policy',
  'navbar.more.complaintBox': 'Complaint Box',
  'navbar.more.complaintData': 'Complaint Data',
  'navbar.more.terms': 'Terms and Conditions',
};

const servicesMenu = [
  {
    labelKey: 'navbar.services.cash.title',
    items: [
      { path: '/EvaluationStockCash', labelKey: 'navbar.services.cash.evaluationStockCash' },
      { path: '/SmartCash', labelKey: 'navbar.services.cash.smartCash' },

    ],
  },
  {
    labelKey: 'navbar.services.option.title',
    items: [
      { path: '/EvaluationStockOption', labelKey: 'navbar.services.option.evaluationStockOption' },
      { path: '/ImpulseOption', labelKey: 'navbar.services.option.impulseOption' },
      { path: '/SmartFuture', labelKey: 'navbar.services.option.smartFuture' },
      { path: '/SmartOptions', labelKey: 'navbar.services.option.smartOptions' },
    ],
  },
  {
    labelKey: 'navbar.services.specialization.title',
    items: [
      { path: '/InfinityClub', labelKey: 'navbar.services.specialization.infinityClub' },
     
      { path: '/UniversalCash', labelKey: 'navbar.services.specialization.universalCash' },
    ],
  },
  {
    labelKey: 'navbar.services.index.title',
    items: [
      { path: '/EvaluationIndexOptions', labelKey: 'navbar.services.index.evaluationIndexOptions' },
      { path: '/ImpulseIndexOptions', labelKey: 'navbar.services.index.impulseIndexOptions' },
      { path: '/services/smart-index-option', labelKey: 'navbar.services.index.smartIndexOption' },
  
    ],
  },
  {
    labelKey: 'navbar.services.mcx.title',
    items: [
      { path: '/MCXSupreme', labelKey: 'navbar.services.specialization.mcxSupreme' },
      { path: '/GalaxyMCX', labelKey: 'navbar.services.specialization.galaxyMCX' },
    ],
  },
];

const dropdownLinks = {
  company: {
    labelKey: 'navbar.company.title',
    items: [
      { path: '/about', labelKey: 'navbar.company.aboutUs' },
      { path: '/vision', labelKey: 'navbar.company.visionMission' },
    ]
  },
  hrZone: {
    labelKey: 'navbar.hrZone.title',
    items: [
      { path: '/career', labelKey: 'navbar.hrZone.career' },
    ]
  },
  insights: {
    labelKey: 'navbar.insights.title',
    items: [
      { path: '/blogs', labelKey: 'navbar.insights.blogs' },
      { path: '/market-news', labelKey: 'navbar.insights.marketNews' },
      { path: '/complaint-data', labelKey: 'navbar.insights.complaintData' },
      { path: '/grievance-redressal-process', labelKey: 'navbar.insights.grievanceRedressalProcess' },
    ]
  },
  accessibility: {
    labelKey: 'navbar.accessibility.title',
    items: [
      { path: '/accessibility-statement', labelKey: 'navbar.accessibility.statement' },
      { path: '/accessibility-feedback', labelKey: 'navbar.accessibility.feedback' },
      { path: '/search', labelKey: 'navbar.accessibility.search' },
      { path: '/media', labelKey: 'navbar.accessibility.media' },
    ]
  },
  dashboard: {
    labelKey: 'navbar.dashboard.title',
    items: [
      { path: '/admin', labelKey: 'navbar.dashboard.adminPanel' },
      { path: '/client-panel', labelKey: 'navbar.dashboard.clientPanel' },
  { path: '/client-service-consent-form', labelKey: 'navbar.dashboard.clientServiceConsent' },
      { path: '/investor-chart', labelKey: 'navbar.dashboard.investorChart' },
      { path: '/anti-money-laundering', labelKey: 'navbar.dashboard.antiMoneyLaundering' },
    ]
  },
  more: {
    labelKey: 'navbar.more',
    items: [
      { path: '/legal', labelKey: 'navbar.more.disclaimer' },
      { path: '/disclosure', labelKey: 'navbar.more.disclosure' },
      { path: '/privacy', labelKey: 'navbar.more.privacy' },
      { path: '/refund', labelKey: 'navbar.more.refund' },
  // Removed complaint and complaint-data per request
      { path: '/terms', labelKey: 'navbar.more.terms' },
    ]
  },
};

const navLinks = [
  { path: '/payment', labelKey: 'navbar.payment' },
  { path: '/complaint', labelKey: 'navbar.complaintBox' },
  { path: '/contact', labelKey: 'navbar.contactUs' },
  { path: '/research-reports', labelKey: 'navbar.researchReports' },
];

const MegaMenu = React.memo(({ labelKey, categories, location, textColor, isMobile, mobileOpen, setMobileOpen, closeDrawer, categoryIcon: CategoryIcon, categoryIconColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutId = useRef(null);
  const menuRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timeoutId.current);
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutId.current = setTimeout(() => setIsOpen(false), 300);
    }
  };
  const handleMenuMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timeoutId.current);
      setIsOpen(true);
    }
  };
  const handleClick = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      closeDrawer();
    } else {
      setIsOpen(false);
    }
  };

  if (!isMobile) {
    return (
      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={menuRef}
      >
        <button
          className={`nav-item font-semibold text-sm md:text-base px-2 py-1${location.pathname.startsWith('/services') ? ' active' : ''}`}
          style={{ color: textColor }}
          aria-expanded={isOpen}
          aria-label={`Toggle ${translateWithFallback(null, labelKey)} menu`}
          onClick={handleClick}
        >
          {translateWithFallback(null, labelKey)}
        </button>
        <div
          className={`absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-lg border border-[var(--primary-green)] text-black shadow-lg rounded-xl z-50 flex flex-row p-4 w-[90vw] lg:w-[84vw] max-w-[1000px] transition-opacity duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } animate-slideDown`}
          style={{
            overflowX: 'auto',
            wordBreak: 'break-word',
            minWidth: '250px',
            maxWidth: '1000px',
          }}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.labelKey}>
              <div className="min-w-[180px] max-w-[220px] px-2 break-words">
                <div className="font-semibold text-sm md:text-base mb-2 text-[var(--primary-green)] break-words">
                  {translateWithFallback(null, cat.labelKey)}
                </div>
                <div className="space-y-1 text-xs md:text-sm break-words">
                  {cat.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block hover:text-blue-600 py-1 transition-all duration-300 break-words ${
                        location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
                      }`}
                      onClick={handleLinkClick}
                      style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                    >
                      {/* If item.icon is a React element, render it smaller and colorful */}
                      {translateWithFallback(null, item.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
              {idx !== categories.length - 1 && (
                <div className="border-l border-gray-300 mx-2 h-auto" style={{ minHeight: 60 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Mobile MegaMenu
  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center font-bold text-base py-2 text-[var(--primary-green)] focus:outline-none"
        onClick={handleClick}
        aria-expanded={mobileOpen}
  aria-label={`Toggle ${translateWithFallback(null, labelKey)} menu`}
      >
  {translateWithFallback(null, labelKey)}
        <span className={`ml-2 transition-transform duration-200 ${mobileOpen ? 'rotate-90' : ''}`}>▶</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[1000px] py-2' : 'max-h-0 py-0'}`}>
        {categories.map((cat) => (
          <div key={cat.labelKey} className="pl-2">
            <div className="font-semibold text-sm mt-2 mb-1 text-[var(--primary-green)]">{translateWithFallback(null, cat.labelKey)}</div>
            {cat.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-item block py-1 pl-2 text-gray-800 flex items-center gap-2"
                onClick={handleLinkClick}
              >
                      {item.icon ? (
                        <span style={{ display: 'inline-flex', width: 16, height: 16, color: '#000' }}>
                          {React.cloneElement(item.icon, { style: { width: 16, height: 16, color: 'inherit' } })}
                        </span>
                      ) : null}
                      {translateWithFallback(null, item.labelKey)}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

function TopContactBar() {
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients?.[theme] || gradients.default;
  // Ensure icons aren't visually clipped by aligning to middle and nudging slightly down
  const iconStyle = { display: 'block', verticalAlign: 'middle', position: 'relative', top: 0, marginRight: 6, overflow: 'visible' };

  return (
    <div style={{ backgroundImage: background, color: textColor }} className="text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1" style={{ minHeight: 24, lineHeight: 1 }}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hover:text-[var(--primary-green)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)] rounded px-1 inline-flex items-center gap-2 h-6"
            aria-label={`Email: ${CONTACT.email}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img" aria-label="Email" style={iconStyle} className="w-6 h-6">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5-8-5V6h16v1.2zM4 18V9.6l7.4 4.63a1 1 0 001.2 0L20 9.6V18H4z" />
            </svg>
            {CONTACT.email}
          </a>
          <span className="hidden sm:inline opacity-60 mx-2" aria-hidden>│</span>
          <a
            href={`tel:${CONTACT.phone}`}
            className="hover:text-[var(--primary-green)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)] rounded px-1 inline-flex items-center gap-2 h-6"
            aria-label={`Call: ${CONTACT.phone}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img" aria-label="Phone" style={iconStyle} className="w-6 h-6">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.4 22 2 13.6 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.2 2.2z" />
            </svg>
            {CONTACT.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(CONTACT.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${key} profile`}
              className="hover:text-[var(--primary-green)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)] rounded p-0.5"
              style={{ color: textColor }}
            >
              <SocialIcon type={key} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [mobileDropdownsOpen, setMobileDropdownsOpen] = useState({});
  const location = useLocation();
  const drawerRef = useRef();
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients?.[theme] || gradients.default;
  const navRef = useRef(null);

  // Ensure the navbar isn't see-through by adding a solid base color under the gradient.
  // We pick a light or dark surface based on the theme's text color for contrast.
  const getBaseSurface = (tc) => {
    try {
      if (!tc || typeof tc !== 'string') return 'rgba(10,15,20,0.98)';
      let hex = tc.trim();
      if (hex.startsWith('#')) hex = hex.slice(1);
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; // 0..1
      // If text is dark (low luminance), use a near-white surface; otherwise use a dark surface.
      return luminance < 0.5 ? 'rgba(255,255,255,0.98)' : 'rgba(10,15,20,0.98)';
    } catch (e) {
      return 'rgba(10,15,20,0.98)';
    }
  };
  const baseSurfaceColor = getBaseSurface(textColor);
  const hoverTint = (() => {
    try {
      let hex = (textColor || '').trim().replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.slice(0,2), 16), g = parseInt(hex.slice(2,4), 16), b = parseInt(hex.slice(4,6), 16);
      const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
      // If text is dark => light background; use subtle dark hover, else use subtle light hover
      return luminance < 0.5 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
    } catch {
      return 'rgba(255,255,255,0.08)';
    }
  })();

  // Semi-transparent surface based on theme text color luminance
  const getTranslucentSurface = (tc, alpha = 0.5) => {
    try {
      let hex = (tc || '').trim().replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.slice(0,2), 16), g = parseInt(hex.slice(2,4), 16), b = parseInt(hex.slice(4,6), 16);
      const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
      // If text is dark => use light translucent surface; else use dark translucent surface
      return luminance < 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(10,15,20,${alpha})`;
    } catch {
      return `rgba(10,15,20,${alpha})`;
    }
  };

  // Colorful icon palette for mobile drawer
  const iconColors = {
    home: '#3b82f6', // blue-500
    services: '#22c55e', // green-500
    company: '#8b5cf6', // violet-500
    hrZone: '#06b6d4', // cyan-500
    insights: '#f59e0b', // amber-500
    accessibility: '#10b981', // emerald-500
    dashboard: '#6366f1', // indigo-500
    more: '#64748b', // slate-500
    payment: '#22c55e',
    complaint: '#ef4444', // red-500
    contact: '#06b6d4',
    reports: '#f59e0b',
  };

  const closeDrawer = () => {
    startTransition(() => {
      setDrawerOpen(false);
      setServicesMobileOpen(false);
      setMobileDropdownsOpen({});
    });
  };

  const toggleMobileDropdown = (key) => {
    startTransition(() => {
      setMobileDropdownsOpen(prev => ({ ...prev, [key]: !prev[key] }));
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeDrawer();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeDrawer();
      }
    };
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // set initial focus into the drawer for accessibility
      setTimeout(() => {
        const focusables = drawerRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusables && focusables.length) {
          firstFocusableRef.current = focusables[0];
          lastFocusableRef.current = focusables[focusables.length - 1];
          firstFocusableRef.current.focus();
        }
      }, 0);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  // When Google Translate injects its top banner (usually an iframe with
  // class `goog-te-banner-frame` or an iframe whose src contains `translate`),
  // move the fixed navbar down so it doesn't overlap. This keeps behavior
  // responsive and works on mobile.
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return undefined;

  // Smooth transition for top changes
  navEl.style.transition = navEl.style.transition || 'top 0.18s ease';

    const getBannerHeight = () => {
      // Common selectors for Google Translate UI
      const iframeByClass = document.querySelector('iframe.goog-te-banner-frame');
      if (iframeByClass) return Math.round(iframeByClass.getBoundingClientRect().height) || 0;

      // Fallback: any iframe that looks like a translate banner
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const f of iframes) {
        try {
          const src = f.getAttribute('src') || '';
          if (/translate|googlesyndication|translate.googleusercontent/.test(src)) {
            const h = Math.round(f.getBoundingClientRect().height);
            if (h > 0) return h;
          }
        } catch (e) {
          // ignore cross-origin access errors
        }
      }

      // Another possible element is the banner wrapper div
      const bannerDiv = document.querySelector('.goog-te-banner-frame') || document.querySelector('.goog-te-banner');
      if (bannerDiv) return Math.round(bannerDiv.getBoundingClientRect().height) || 0;

      return 0;
    };

    // Apply by setting a CSS variable on the root element. The navbar
    // and mobile drawer read `--nav-offset` so the layout updates
    // responsively (desktop and mobile) without fighting utility classes.
    const apply = () => {
      const h = getBannerHeight();
      const docEl = document.documentElement;
      if (h) {
        docEl.style.setProperty('--nav-offset', `${h}px`);
      } else {
        docEl.style.setProperty('--nav-offset', '0px');
      }
    };

    // Observe DOM changes since translate banner is injected dynamically
    const mo = new MutationObserver(() => apply());
    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // Also apply immediately and on resize
    apply();
    const onResize = () => apply();
    window.addEventListener('resize', onResize);

    return () => {
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      const docEl = document.documentElement;
      if (docEl) docEl.style.setProperty('--nav-offset', '0px');
      if (navEl) navEl.style.top = '';
    };
  }, [navRef]);

  const mobileDrawerStyles = {
  position: 'fixed',
  top: 'var(--nav-offset, 0px)',
  right: 0,
  height: 'calc(100vh - var(--nav-offset, 0px))',
    width: 'max(50vw, 300px)',
    maxWidth: '80vw',
  // Theme-aware, semi-transparent background: show current theme gradient with a translucent surface overlay
    backgroundImage: background,
    backgroundColor: getTranslucentSurface(textColor, 0.5),
    backgroundBlendMode: 'overlay',
    // Avoid applying expensive blur during the initial open; apply only when open
    backdropFilter: drawerOpen ? 'blur(8px)' : 'none',
    WebkitBackdropFilter: drawerOpen ? 'blur(8px)' : 'none',
    color: 'var(--text-color)',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    zIndex: 9999,
    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    overflowY: 'auto',
    display: 'block',
    willChange: 'transform',
    contain: 'content'
  };

  return (
    <>
    <nav
        role="navigation"
        ref={navRef}
  // Use gradient + an opaque base color to block underlying content
  style={{ backgroundImage: background, backgroundColor: baseSurfaceColor, color: textColor }}
        className="fixed w-full z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-b-xl"
      >
  {/* Top contact/info bar */}
  <TopContactBar />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center rotate-logo">
            <div className="rounded-full p-1 border-2 border-[var(--primary-green)] bg-white">
              <img
                src={wiseLogo}
                alt="Wise Logo"
                className="h-10 sm:h-12 md:h-14 w-auto rounded-full logo-hover"
                loading="auto"
                decoding="async"
                fetchpriority="low"
                width="56"
                height="56"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu hidden lg:block font-medium flex-grow">
            <div className="nav-scroll w-full flex items-center justify-center gap-4 xl:gap-6">
              <Link
                to="/"
                className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${location.pathname==='/' ? ' active' : ''}`}
                style={{ color: textColor }}
              >
                {translateWithFallback(null, 'navbar.home')}
              </Link>

              <MegaMenu labelKey="navbar.services.title" categories={servicesMenu} location={location} textColor={textColor} isMobile={false} closeDrawer={closeDrawer} />

            {Object.entries(dropdownLinks).map(([key, dropdown]) => (
              <div className="relative group" key={key}>
                <button
                  className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${dropdown.items.some(item => location.pathname.startsWith(item.path)) ? ' active' : ''}`}
                  style={{ color: textColor }}
          aria-label={`Toggle ${translateWithFallback(null, dropdown.labelKey)} menu`}
          aria-haspopup="true"
                    aria-expanded={undefined}
                    onKeyDown={(e) => {
                      const menu = e.currentTarget.nextElementSibling;
                      if (!menu) return;
                      const items = menu.querySelectorAll('a');
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        items[0]?.focus();
                      }
                    }}
                >
                    {translateWithFallback(null, dropdown.labelKey)}
                </button>
                <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md border border-[var(--primary-green)] text-black shadow-md rounded-md z-50 group-hover:flex flex-col min-w-[180px] xl:min-w-[200px] p-2 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible animate-slideDown" role="menu" onKeyDown={(e) => {
                  const links = e.currentTarget.querySelectorAll('a');
                  const first = links[0];
                  const last = links[links.length - 1];
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (document.activeElement === last) first?.focus(); else {
                      const i = Array.from(links).indexOf(document.activeElement);
                      links[i + 1]?.focus();
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (document.activeElement === first) last?.focus(); else {
                      const i = Array.from(links).indexOf(document.activeElement);
                      links[i - 1]?.focus();
                    }
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    e.currentTarget.previousElementSibling?.focus();
                  }
                }}>
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 xl:px-4 py-2 hover:bg-gray-200 text-xs xl:text-sm flex items-center gap-2 transition-all duration-300 ${
                        location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
                      }`}
            role="menuitem"
                      tabIndex={-1}
                    >
                      {translateWithFallback(null, item.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

      {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${location.pathname===link.path ? ' active' : ''}`}
                style={{ color: textColor }}
              >
  {translateWithFallback(null, link.labelKey)}
              </Link>
      ))}
            </div>
          </div>

          {/* Mobile Hamburger */}
            <button
              className="lg:hidden z-[10000] drawer-toggle"
              onClick={() => startTransition(() => setDrawerOpen(prev => !prev))}
              aria-label="Toggle mobile menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
            >
            {drawerOpen ? (
              <span className="mobile-close-btn" style={{ color: textColor }}>Close</span>
            ) : (
              <div className={`hamburger ${drawerOpen ? 'open' : ''}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay to close on outside click */}
      {drawerOpen && (
        <div
          onClick={closeDrawer}
          aria-hidden
          style={{
            position: 'fixed',
            top: 'var(--nav-offset, 0px)',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - var(--nav-offset, 0px))',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 9998,
            opacity: drawerOpen ? 1 : 0,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Mobile Menu with Inline Styles */}
  <div style={mobileDrawerStyles} ref={drawerRef} className={`mobile-menu ${drawerOpen ? 'open' : ''}`} id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
        <div className={`mobile-menu-items mobile-stagger`} style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 id="mobile-menu-title" className="sr-only">Main menu</h2>
          {/* Primary links with icons */}
          <Link to="/" className="nav-item font-semibold py-1" onClick={closeDrawer} tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 10, padding: '10px 12px', background: 'transparent', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <FiHome size={18} style={{ flexShrink: 0, color: iconColors.home }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{translateWithFallback(null, 'navbar.home')}</span>
          </Link>

          <hr style={{ border: 'none', height: 1, background: 'rgba(128,128,128,0.2)', margin: '10px 0' }} />

          <MegaMenu 
            labelKey="navbar.services.title" 
            categories={servicesMenu} 
            location={location} 
            isMobile={true} 
            mobileOpen={servicesMobileOpen} 
            setMobileOpen={setServicesMobileOpen} 
            closeDrawer={closeDrawer} 
          />

          {Object.entries(dropdownLinks).map(([key, dropdown]) => (
            <div key={key}>
              <button
                className="w-full flex justify-between items-center font-bold text-base py-2 text-[var(--primary-green)] focus:outline-none"
                onClick={() => toggleMobileDropdown(key)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {key === 'company' && <FiUsers size={18} style={{ color: iconColors.company }} />}
                  {key === 'hrZone' && <FiUsers size={18} style={{ color: iconColors.hrZone }} />}
                  {key === 'insights' && <FiBarChart2 size={18} style={{ color: iconColors.insights }} />}
                  {key === 'accessibility' && <FiAlertCircle size={18} style={{ color: iconColors.accessibility }} />}
                  {key === 'dashboard' && <FiGrid size={18} style={{ color: iconColors.dashboard }} />}
                  {key === 'more' && <FiFileText size={18} style={{ color: iconColors.more }} />}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{translateWithFallback(null, dropdown.labelKey)}</span>
                </span>
                <FiChevronRight size={18} className={`ml-2 transition-transform duration-200 ${mobileDropdownsOpen[key] ? 'rotate-90' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdownsOpen[key] ? 'max-h-96' : 'max-h-0'}`}>
                {dropdown.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="nav-item block py-1 pl-2"
                        onClick={closeDrawer}
                        tabIndex={drawerOpen ? 0 : -1}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 8, padding: '8px 10px', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = hoverTint)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
      <FiChevronRight size={16} style={{ opacity: 0.6, flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{translateWithFallback(null, item.labelKey)}</span>
                      </Link>
                    ))}
              </div>
            </div>
          ))}

            {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item block py-1${location.pathname===link.path ? ' active' : ''}`}
              onClick={closeDrawer}
              style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 10, padding: '10px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = hoverTint)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {link.path === '/payment' && <FiCreditCard size={18} style={{ color: iconColors.payment, flexShrink: 0 }} />}
              {link.path === '/complaint' && <FiAlertCircle size={18} style={{ color: iconColors.complaint, flexShrink: 0 }} />}
              {link.path === '/contact' && <FiPhone size={18} style={{ color: iconColors.contact, flexShrink: 0 }} />}
              {link.path === '/research-reports' && <FiFileText size={18} style={{ color: iconColors.reports, flexShrink: 0 }} />}
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{translateWithFallback(null, link.labelKey)}</span>
            </Link>
          ))}

            {/* Mobile back button to close drawer */}
            <button
              type="button"
              className="nav-item mobile-back-btn"
              onClick={closeDrawer}
              aria-label="Close mobile menu"
              onKeyDown={(e) => {
                if (e.key === 'Escape') closeDrawer();
                if (e.key === 'Tab') {
                  const focusables = drawerRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                  if (!focusables || !focusables.length) return;
                  const first = focusables[0];
                  const last = focusables[focusables.length - 1];
                  if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                  } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                  }
                }
              }}
            >
              Back
            </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;