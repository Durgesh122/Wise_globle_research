import React, { useState, useEffect, useRef, useContext, startTransition } from 'react';
// useTranslation removed from this file to rely on translateWithFallback helper
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Removed react-icons usage per requirement to have no icons in the navbar
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';
import TradingViewTicker from './TradingViewTicker';
import AlertBar from './AlertBar';
// Prefer react-icons when available for crisp, scalable icons in the mobile drawer.
// Keep existing inline SVG fallbacks (IconHome, IconClose, etc.) in case react-icons
// cannot be resolved by the bundler for any reason.
import { MdClose, MdHome, MdChevronRight, MdSearch, MdCreditCard, MdMiscellaneousServices, MdBusiness, MdGroup, MdArticle, MdAccessibility, MdDashboard, MdMoreHoriz, MdReport, MdContactMail, MdLibraryBooks } from 'react-icons/md';

// Contact info for top header bar (update with real company details)
const CONTACT = {
  email: 'support@wiseglobalresearch.com',
  phone: '+91-9977909494',
  socials: {
    facebook: 'https://www.facebook.com/wiseglobalresearch/',
    twitter: 'https://x.com/research221711',
    instagram: 'https://www.instagram.com/wiseglobalresearch/',
    linkedin: 'https://www.linkedin.com/in/wise-global-research-services-63b535317/',
    youtube: 'https://www.youtube.com/@WiseGlobalResearchService',
  },
};

// Styling for social icons: pale-blue background and per-network icon colors
const SOCIAL_ICON_BG = '#D4E3FF';
const SOCIAL_ICON_COLORS = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E1306C',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
};

// Lightweight inline social icons (no extra deps)
function SocialIcon({ type, className = 'w-6 h-6' }) {
  // Use em-based sizing so the icon scales with font-size and container rules
  const common = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  switch (type) {
    case 'facebook':
      return (
        <svg {...common} className={`${className} social-icon`} role="img" aria-label="Facebook icon">
          <path d="M22 12.06C22 6.49 17.52 2 11.94 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.98v-7.06H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34v7.06C18.34 21.24 22 17.08 22 12.06z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...common} className={`${className} social-icon`} role="img" aria-label="X (Twitter) icon">
          <path d="M18.244 2H21l-6.5 7.432L22 22h-6.875l-4.8-6.223L4.83 22H2l7.033-8.04L2 2h6.953l4.36 5.73L18.244 2zm-1.203 18h1.884L7.04 4H5.044l11.997 16z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} className={`${className} social-icon`} role="img" aria-label="Instagram icon">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1.2 1.2 0 11-1.2-1.2A1.2 1.2 0 0118 6.2z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} className={`${className} social-icon`} role="img" aria-label="LinkedIn icon">
          <path d="M6.94 21.5H3.56V9.25H6.94V21.5zM5.25 7.79A1.85 1.85 0 115.24 4.1a1.85 1.85 0 01.01 3.69zM21.5 21.5h-3.37v-6.3c0-1.5-.53-2.52-1.85-2.52-1.01 0-1.62.68-1.89 1.34-.1.25-.13.6-.13.95v6.53h-3.37s.04-10.6 0-11.7h3.37v1.66c.45-.69 1.25-1.67 3.05-1.67 2.22 0 3.89 1.45 3.89 4.58v7.13z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common} className={`${className} social-icon`} role="img" aria-label="YouTube icon">
          <path d="M23.5 7.5s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1C16.97 3.75 12 3.75 12 3.75h-.01s-4.97 0-8.2.39c-.46.05-1.46.05-2.36 1C.73 5.86.5 7.5.5 7.5S.25 9.4.25 11.3v1.4c0 1.9.25 3.8.25 3.8s.23 1.64.94 2.36c.9.95 2.08.92 2.61 1.02 1.9.18 8 .38 8 .38s4.97 0 8.2-.39c.46-.05 1.46-.05 2.36-1 .71-.72.94-2.36.94-2.36s.25-1.9.25-3.8v-1.4c0-1.9-.25-3.8-.25-3.8zM9.75 14.62V7.99l6.25 3.31-6.25 3.32z"/>
        </svg>
      );
    default:
      return null;
  }
}

// Minimal inline SVG icons used by the redesigned mobile drawer.
function IconHome(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.width || 20} height={props.height || 20} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.width || 20} height={props.height || 20} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconChevron(props) {
  const rotate = props.rotate ? 'rotate(90 12 12)' : undefined;
  return (
    <svg viewBox="0 0 24 24" width={props.width || 18} height={props.height || 18} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g transform={rotate}>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.width || 18} height={props.height || 18} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCard(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.width || 18} height={props.height || 18} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// Small helper to render a top-nav item: label above icon (desktop)

// Minimal icon map for the top nav: maps logical nav keys to Md icons
const topNavIconMap = {
  home: MdHome,
  services: MdMiscellaneousServices,
  company: MdBusiness,
  hrZone: MdGroup,
  insights: MdArticle,
  accessibility: MdAccessibility,
  dashboard: MdDashboard,
  more: MdMoreHoriz,
  payment: MdCreditCard,
  complaint: MdReport,
  contact: MdContactMail,
  reports: MdLibraryBooks,
  search: MdSearch,
};

// Helper used by desktop nav buttons/links: renders an icon centered above a label
function TopIconLabel({ Icon, label, color }) {
  const iconColor = color || 'currentColor';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span aria-hidden style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
        {Icon ? <Icon size={18} /> : null}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>{label}</span>
    </div>
  );
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
  { path: '/research-reports', labelKey: 'navbar.researchReports' },
];

// Helper to map labelKey to topNavIconMap key for standalone navLinks
function navLinkToIconKey(labelKey) {
  if (!labelKey) return null;
  if (labelKey.includes('payment')) return 'payment';
  if (labelKey.includes('complaint')) return 'complaint';
  if (labelKey.includes('research') || labelKey.includes('reports')) return 'reports';
  // fallback: use last segment
  const parts = labelKey.split('.');
  return parts[parts.length - 1];
}

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
          style={{ color: `var(--navbar-color, var(--text-color, ${textColor || "'#0b1220'"}))` }}
          aria-expanded={isOpen}
          aria-label={`Toggle ${translateWithFallback(null, labelKey)} menu`}
          onClick={handleClick}
        >
          <TopIconLabel Icon={topNavIconMap.services} label={translateWithFallback(null, labelKey)} />
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
                className="nav-item block py-1 pl-2 flex items-center gap-2"
                onClick={handleLinkClick}
                style={{ color: 'var(--text-color)' }}
              >
                {item.icon ? (
                  <span style={{ display: 'inline-flex', width: 16, height: 16, color: 'currentColor' }}>
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
  const currentTheme = gradients?.[theme] || gradients.default;
  const topTheme = currentTheme.topContactBar || currentTheme;
  const background = topTheme.background;
  // Prefer CSS variable overrides when present (ThemeContext may force --navbar-color)
  let textColor = topTheme.textColor;
  try {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      const cssNav = rootStyles.getPropertyValue('--navbar-color').trim();
      const cssText = rootStyles.getPropertyValue('--text-color').trim();
      if (cssNav) textColor = cssNav;
      else if (cssText) textColor = cssText;
    }
  } catch (e) {
    // ignore and fall back to theme value
  }
  // Normalize a CSS-friendly fallback color that prefers CSS vars first
  const linkColor = (typeof window !== 'undefined')
    ? (getComputedStyle(document.documentElement).getPropertyValue('--navbar-color').trim() || textColor || 'var(--text-color, #0b1220)')
    : (textColor || 'var(--text-color, #0b1220)');
  // Ensure icons aren't visually clipped by aligning to middle and nudging slightly down
  const iconStyle = { display: 'block', verticalAlign: 'middle', position: 'relative', top: 0, marginRight: 6, overflow: 'visible' };

  return (
    <div
      style={{ backgroundImage: `var(--navbar-bg, ${background})`, color: textColor }}
      className="text-[11px] sm:text-xs w-full"
    >
      <div
        className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2"
        style={{ minHeight: 24, lineHeight: 1 }}
      >
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 min-w-0 w-full sm:w-auto overflow-x-auto" style={{ minHeight: 24 }}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hover:text-[var(--primary-green)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)] rounded px-1 inline-flex items-center gap-2 h-6 whitespace-nowrap"
            aria-label={`Email: ${CONTACT.email}`}
            style={{ color: linkColor, fontWeight: 'bold', letterSpacing: '0.5px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img" aria-label="Email" style={iconStyle} className="w-6 h-6">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5-8-5V6h16v1.2zM4 18V9.6l7.4 4.63a1 1 0 001.2 0L20 9.6V18H4z" />
            </svg>
            <span className="truncate">{CONTACT.email}</span>
          </a>
          <span className="hidden sm:inline mx-2" aria-hidden style={{ color: linkColor, fontWeight: 'bold' }}>│</span>
          <a
            href={`tel:${CONTACT.phone}`}
            className="hover:text-[var(--primary-green)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-green)] rounded px-1 inline-flex items-center gap-2 h-6 whitespace-nowrap"
            aria-label={`Call: ${CONTACT.phone}`}
            style={{ color: linkColor, fontWeight: 'bold', letterSpacing: '0.5px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img" aria-label="Phone" style={iconStyle} className="w-6 h-6">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.4 22 2 13.6 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.2 2.2z" />
            </svg>
            <span className="truncate">{CONTACT.phone}</span>
          </a>
          <span className="hidden sm:inline mx-2" aria-hidden style={{ color: linkColor, fontWeight: 'bold' }}>│</span>
          {/* Search removed by request - contact info only */}
          <div className="flex items-center gap-2 top-contact-socials min-w-0 ml-2">
            {Object.entries(CONTACT.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${key} profile`}
                className="focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] rounded p-1"
                style={{ background: SOCIAL_ICON_BG, color: SOCIAL_ICON_COLORS[key] || linkColor, borderRadius: 8 }}
              >
                <SocialIcon type={key} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  // mobileDropdownsOpen removed — redesigned drawer uses native details/summary and grouped lists
  const location = useLocation();
  const drawerRef = useRef();
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  const { theme, gradients } = useContext(ThemeContext);
  const currentTheme = gradients?.[theme] || gradients.default;
  let { background, textColor } = currentTheme.navbar || currentTheme;
  const navColorFallback = (textColor && textColor.replace?.("'", '')) || '#0b1220';
  const navRef = useRef(null);
  // Split dropdowns so we can render 'more' after the primary nav links
  const dropdownEntriesWithoutMore = Object.entries(dropdownLinks).filter(([k]) => k !== 'more');
  const moreDropdown = dropdownLinks.more || null;
  // Prefer CSS variable overrides when present (ThemeContext may force --navbar-color)
  try {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      const cssNav = rootStyles.getPropertyValue('--navbar-color').trim();
      const cssText = rootStyles.getPropertyValue('--text-color').trim();
      if (cssNav) textColor = cssNav;
      else if (cssText) textColor = cssText;
    }
  } catch (e) {
    // ignore and continue with theme's textColor
  }

  // Mobile drawer should use black text when the app `default` theme is selected.
  // Otherwise prefer the CSS variable so ThemeContext continues to control color.
  const mobileDrawerTextColor = theme === 'default' ? '#0b1220' : 'var(--text-color)';

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
      // mobileDropdownsOpen state removed in refactor
    });
  };

  // Build search index (label -> path) from nav structures
  const buildIndex = () => {
    const entries = [];
    // navLinks
    navLinks.forEach(l => entries.push({ label: translateWithFallback(null, l.labelKey).toLowerCase(), path: l.path }));
    // dropdownLinks
    Object.values(dropdownLinks).forEach(dd => {
      entries.push({ label: translateWithFallback(null, dd.labelKey).toLowerCase(), path: '#' });
      dd.items.forEach(it => entries.push({ label: translateWithFallback(null, it.labelKey).toLowerCase(), path: it.path }));
    });
    // servicesMenu
    servicesMenu.forEach(cat => {
      entries.push({ label: translateWithFallback(null, cat.labelKey).toLowerCase(), path: '#' });
      cat.items.forEach(it => entries.push({ label: translateWithFallback(null, it.labelKey).toLowerCase(), path: it.path }));
    });
    // Also include common labels
    entries.push({ label: translateWithFallback(null, 'navbar.home').toLowerCase(), path: '/' });
    return entries;
  };
  React.useMemo(() => buildIndex(), []);

  // toggleMobileDropdown removed (no longer used)

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
    const handleKeydown = (e) => {
      if (!drawerOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
      } else if (e.key === 'Tab') {
        // Basic focus trap within drawer
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
    };
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [drawerOpen]);

  // Close the drawer automatically on route change (mobile navigation)
  useEffect(() => {
    if (drawerOpen) closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Prevent background scroll when the drawer is open (mobile)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.touchAction = originalTouchAction || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.touchAction = originalTouchAction || '';
    };
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

  // Apply by setting CSS variables on the root element. The navbar
  // and mobile drawer read `--nav-offset` and `--nav-height` so the
  // layout updates responsively (desktop and mobile) without fighting utility classes.
    // Throttle layout reads (getBoundingClientRect) to once per frame
    let rafId = null;
    let pending = false;
    const apply = () => {
      if (pending) return; // already scheduled
      pending = true;
      rafId = requestAnimationFrame(() => {
        pending = false;
          const h = getBannerHeight();
          const docEl = document.documentElement;
          // Preserve any existing offset (for example from a fixed top ticker).
          // Use the larger of the currently-set --nav-offset and the banner height
          // so we don't accidentally move the navbar under the ticker.
          try {
            const existingOffsetStr = getComputedStyle(docEl).getPropertyValue('--nav-offset') || '0px';
            const existingOffset = parseInt(existingOffsetStr, 10) || 0;
            const finalOffset = Math.max(existingOffset, h || 0);
            docEl.style.setProperty('--nav-offset', `${finalOffset}px`);
          } catch (e) {
            // Fallback to banner height if computed style cannot be read
            if (h) {
              docEl.style.setProperty('--nav-offset', `${h}px`);
            } else {
              docEl.style.setProperty('--nav-offset', '0px');
            }
          }
        try {
          const navH = Math.round(navEl.getBoundingClientRect().height) || 0;
          docEl.style.setProperty('--nav-height', `${navH}px`);
        } catch (e) {
          docEl.style.setProperty('--nav-height', '0px');
        }
      });
    };

    // Observe DOM changes since translate banner is injected dynamically
  const mo = new MutationObserver(() => apply());
    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // Also apply immediately and on resize
    apply();
    const onResize = () => apply();
  window.addEventListener('resize', onResize, { passive: true });
    // Track whether this effect wrote nav variables so cleanup doesn't clear
    // offsets set by other components (e.g., the fixed ticker).
    let didWriteNavVars = false;
    const originalApply = apply;
    const wrappedApply = () => {
      originalApply();
      didWriteNavVars = true;
    };

    // Replace listeners to use the wrapped apply
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', wrappedApply, { passive: true });

    return () => {
      mo.disconnect();
      window.removeEventListener('resize', wrappedApply);
      if (rafId) cancelAnimationFrame(rafId);
      const docEl = document.documentElement;
      if (docEl) {
        if (didWriteNavVars) {
          // Only clear values if this effect wrote them
          docEl.style.setProperty('--nav-offset', '0px');
          docEl.style.setProperty('--nav-height', '0px');
        }
      }
      if (navEl) navEl.style.top = '';
    };
  }, [navRef]);

  const mobileDrawerStyles = {
  position: 'fixed',
  top: 'calc(var(--nav-offset, 0px) + env(safe-area-inset-top, 0px))',
  left: 0,
  height: 'calc(100dvh - var(--nav-offset, 0px) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
    width: 'min(80vw, 350px)', // Adjusted for better mobile responsiveness
    maxWidth: '100vw',
  // Theme-aware, semi-transparent background: show current theme gradient with a translucent surface overlay
    backgroundImage: currentTheme.background,
    backgroundColor: getTranslucentSurface(currentTheme.textColor, 0.5),
    backgroundBlendMode: 'overlay',
    // Avoid applying expensive blur during the initial open; apply only when open
    backdropFilter: drawerOpen ? 'blur(8px)' : 'none',
    WebkitBackdropFilter: drawerOpen ? 'blur(8px)' : 'none',
  // Ensure drawer text follows our computed mobile color. When the
  // `default` theme is active ThemeContext forces `--text-color` to
  // white; override it here by setting both the `color` and the CSS
  // variable so all children using `var(--text-color)` get the value.
  color: mobileDrawerTextColor,
  '--text-color': mobileDrawerTextColor,
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    zIndex: 9999,
  // Slide in from the left: when closed translateX(-100%) moves it off-canvas to the left
  transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    overflowY: 'auto',
    display: 'block',
    willChange: 'transform',
    contain: 'content',
    overscrollBehavior: 'contain'
  };

  return (
    <>

      <nav
    role="navigation"
    ref={navRef}
  // Use gradient + an opaque base color to block underlying content
  style={{
      backgroundImage: `var(--navbar-bg, ${background})`,
      backgroundColor: baseSurfaceColor,
  top: `var(--nav-offset, 0px)`,
      zIndex: 110,
    }}
    className="fixed w-full z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-none"
  >
  <TradingViewTicker />
  <TopContactBar />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
            <Link to="/" className="flex items-center rotate-logo" style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}>
              <div className="rounded-full p-1 border-2 border-[var(--primary-green)] bg-white">
                <img
                  src={wiseLogo}
                  alt="Wise Logo"
                  className="wise-logo h-10 sm:h-12 md:h-14 w-auto rounded-full logo-hover"
                  loading="auto"
                  decoding="async"
                  fetchpriority="low"
                />
              </div>
            </Link>

          {/* Desktop Menu */}
      <div className="desktop-menu hidden lg:block font-medium flex-grow animate-fadeIn">
        <div className="nav-scroll w-full flex items-center justify-center gap-4 xl:gap-6" style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}>
                <Link
                      to="/"
                      className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${location.pathname==='/' ? ' active' : ''}`}
                    >
                      <TopIconLabel Icon={topNavIconMap.home} label={translateWithFallback(null, 'navbar.home')} />
                    </Link>

              <MegaMenu labelKey="navbar.services.title" categories={servicesMenu} location={location} textColor={textColor} isMobile={false} closeDrawer={closeDrawer} />

            {dropdownEntriesWithoutMore.map(([key, dropdown]) => (
              <div className="relative group" key={key}>
                <button
                  className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${dropdown.items.some(item => location.pathname.startsWith(item.path)) ? ' active' : ''}`}
                    style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}
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
                  <TopIconLabel Icon={topNavIconMap[key]} label={translateWithFallback(null, dropdown.labelKey)} />
                </button>
                <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md border border-[var(--primary-green)] text-black shadow-md z-50 group-hover:flex flex-col min-w-[180px] xl:min-w-[200px] p-2 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible animate-slideDown" role="menu" onKeyDown={(e) => {
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
              {/* If this is the Company dropdown, render a Search link beside it for quick access */}
              {key === 'company' && (
                <Link
                  to="/search"
                  className={`nav-item font-semibold text-xs xl:text-base px-2 py-1 ml-2`}
                          style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}
                >
                  <TopIconLabel Icon={topNavIconMap.search} label={translateWithFallback(null, 'navbar.accessibility.search')} />
                </Link>
              )}
              </div>
            ))}

      {navLinks.map((link) => (
                    <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${location.pathname===link.path ? ' active' : ''}`}
                    style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}
                  >
      <TopIconLabel Icon={topNavIconMap[navLinkToIconKey(link.labelKey)]} label={translateWithFallback(null, link.labelKey)} />
                  </Link>
          ))}

          {/* Render 'more' dropdown last on desktop */}
            {moreDropdown && (
            <div className="relative group" key="more">
              <button
                className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${moreDropdown.items.some(item => location.pathname.startsWith(item.path)) ? ' active' : ''}`}
                style={{ color: `var(--navbar-color, var(--text-color, ${navColorFallback}))` }}
                aria-label={`Toggle ${translateWithFallback(null, moreDropdown.labelKey)} menu`}
                aria-haspopup="true"
              >
                <TopIconLabel Icon={topNavIconMap.more} label={translateWithFallback(null, moreDropdown.labelKey)} />
              </button>
              <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md border border-[var(--primary-green)] text-black shadow-md z-50 group-hover:flex flex-col min-w-[180px] xl:min-w-[200px] p-2 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible animate-slideDown" role="menu">
                {moreDropdown.items.map((item) => (
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
          )}
            </div>
          </div>
            <button
              className="lg:hidden z-[10000] drawer-toggle"
              onClick={() => startTransition(() => setDrawerOpen(prev => !prev))}
              aria-label={drawerOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
            >
                <div className={`drawer-toggle ${drawerOpen ? 'open' : ''}`} aria-hidden>
                  {/* When closed show hamburger, when open show close icon (animated via CSS) */}
                  {!drawerOpen ? (
                    <div className={`hamburger ${drawerOpen ? 'open' : ''}`} style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
                      <div className="bar" />
                      <div className="bar" />
                      <div className="bar" />
                    </div>
                  ) : (
                    <span className="toggle-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {typeof MdClose === 'function' ? <MdClose size={20} /> : <IconClose width={20} height={20} />}
                    </span>
                  )}
                </div>
          </button>
        </div>
      </nav>

  {/* Attached alert bar: sticks below the navbar when present */}
  <AlertBar variant="attached" />

      {/* Mobile overlay to close on outside click */}
      {drawerOpen && (
        <div
          onClick={closeDrawer}
          aria-hidden
          style={{
              position: 'fixed',
              // start the overlay below the navbar so the navbar remains interactive
              top: 'calc(var(--nav-offset, 0px) + var(--nav-height, 0px))',
              left: 0,
              width: '100vw',
              height: 'calc(100vh - var(--nav-offset, 0px) - var(--nav-height, 0px))',
              background: 'rgba(0,0,0,0.4)',
              zIndex: 9998,
              opacity: drawerOpen ? 1 : 0,
              transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Redesigned Mobile Menu */}
  <div style={mobileDrawerStyles} ref={drawerRef} className={`mobile-menu ${drawerOpen ? 'open' : ''}`} id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header: logo + title + close */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={wiseLogo} alt="Wise" style={{ width: 36, height: 36, objectFit: 'cover' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-color)' }}>Menu</div>
        </div>
        <button aria-label="Close menu" onClick={closeDrawer} style={{ background: 'transparent', border: 'none', padding: 8, color: 'var(--text-color)' }}>
          {/* Use react-icons where possible; fall back to inline IconClose when necessary */}
          {typeof MdClose === 'function' ? <MdClose size={20} /> : <IconClose width={20} height={20} />}
        </button>
      </div>

      {/* Content: scrollable lists */}
      <div style={{ padding: 12, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Home */}
        <button onClick={() => { closeDrawer(); navigate('/'); }} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 10, background: 'transparent', border: 'none', color: 'var(--text-color)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}>
            {typeof MdHome === 'function' ? <MdHome size={18} style={{ color: iconColors.home }} /> : <IconHome width={18} height={18} style={{ color: iconColors.home }} />}
          </div>
          <div style={{ fontWeight: 600 }}>{translateWithFallback(null, 'navbar.home')}</div>
        </button>

        <div style={{ height: 1, background: 'rgba(128,128,128,0.12)', borderRadius: 2 }} />

        {/* Services collapsible */}
        <div>
          <details open={servicesMobileOpen} onToggle={(e) => setServicesMobileOpen(e.target.open)}>
              <summary style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', listStyle: 'none', color: 'var(--primary-green)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8v-10h-8v10zm0-18v6h8V3h-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ fontWeight: 700 }}>Services</div>
              <span style={{ marginLeft: 'auto' }}>{typeof MdChevronRight === 'function' ? <MdChevronRight size={18} style={{ transform: servicesMobileOpen ? 'rotate(90deg)' : 'none', transition: 'transform .18s' }} /> : <IconChevron rotate={servicesMobileOpen} />}</span>
            </summary>
            <div style={{ paddingLeft: 8, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {servicesMenu.map((cat) => (
                <div key={cat.labelKey}>
                  <div style={{ fontWeight: 700, color: 'var(--primary-green)', padding: '6px 8px', fontSize: 13 }}>{translateWithFallback(null, cat.labelKey)}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {cat.items.map(item => (
                      <Link key={item.path} to={item.path} onClick={closeDrawer} style={{ padding: '8px 10px', borderRadius: 8, color: 'var(--text-color)', textDecoration: 'none', display: 'block' }}>{translateWithFallback(null, item.labelKey)}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Other dropdowns rendered as grouped links */}
        {dropdownEntriesWithoutMore.map(([key, dropdown]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontWeight: 700, padding: '6px 8px', color: 'var(--primary-green)' }}>{translateWithFallback(null, dropdown.labelKey)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {dropdown.items.map(item => (
                <Link key={item.path} to={item.path} onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: 'var(--text-color)', textDecoration: 'none' }}>{translateWithFallback(null, item.labelKey)}</Link>
              ))}
            </div>
          </div>
        ))}

        {/* Quick actions: search + contact + navLinks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
          <Link to="/search" onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: 'var(--text-color)', textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}>
              {typeof MdSearch === 'function' ? <MdSearch size={18} /> : <IconSearch />}
            </div>
            <div>{translateWithFallback(null, 'navbar.accessibility.search')}</div>
          </Link>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: 'var(--text-color)', textDecoration: 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}>{link.path === '/payment' ? (typeof MdCreditCard === 'function' ? <MdCreditCard size={18} /> : <IconCard />) : (typeof MdChevronRight === 'function' ? <MdChevronRight size={18} /> : <IconChevron />)}</div>
              <div>{translateWithFallback(null, link.labelKey)}</div>
            </Link>
          ))}
        </div>

        {/* Social row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {Object.entries(CONTACT.socials).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" style={{ background: SOCIAL_ICON_BG, color: SOCIAL_ICON_COLORS[key] || mobileDrawerTextColor, borderRadius: 8, padding: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <SocialIcon type={key} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
    </>
  );
}

export default Navbar;