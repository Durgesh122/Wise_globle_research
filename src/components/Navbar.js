import React, { useState, useEffect, useRef, useContext } from 'react';
// useTranslation removed from this file to rely on translateWithFallback helper
import { Link, useLocation } from 'react-router-dom';
// Removed react-icons usage per requirement to have no icons in the navbar
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

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

  const closeDrawer = () => {
    setDrawerOpen(false);
    setServicesMobileOpen(false);
    setMobileDropdownsOpen({});
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdownsOpen(prev => ({ ...prev, [key]: !prev[key] }));
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
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
  // Make mobile drawer opaque so page text doesn't show through
  background: baseSurfaceColor,
    backdropFilter: 'blur(12px)',
    color: 'var(--text-color)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    zIndex: 9999,
    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    overflowY: 'auto',
    display: 'block'
  };

  return (
    <>
      <nav
        role="navigation"
        ref={navRef}
  // Use gradient + an opaque base color to block underlying content
  style={{ background, backgroundColor: baseSurfaceColor, color: textColor }}
        className="fixed w-full z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-b-xl"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center rotate-logo">
            <div className="rounded-full p-1 border-2 border-[var(--primary-green)] bg-white">
              <img
                src={wiseLogo}
                alt="Wise Logo"
                className="h-10 sm:h-12 md:h-14 w-auto rounded-full logo-hover"
                loading="eager"
                decoding="sync"
                fetchpriority="high"
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
              onClick={() => setDrawerOpen(!drawerOpen)}
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

      {/* Mobile Menu with Inline Styles */}
  <div style={mobileDrawerStyles} ref={drawerRef} className={`mobile-menu ${drawerOpen ? 'open' : ''}`} id="mobile-menu" role="dialog" aria-modal="true">
        <div className={`mobile-menu-items mobile-stagger`} style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            className="nav-item font-semibold py-1"
            onClick={closeDrawer}
    tabIndex={0}
          >
            {translateWithFallback(null, 'navbar.home')}
          </Link>

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
                {translateWithFallback(null, dropdown.labelKey)}
                <span className={`ml-2 transition-transform duration-200 ${mobileDropdownsOpen[key] ? 'rotate-90' : ''}`}>▶</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdownsOpen[key] ? 'max-h-96' : 'max-h-0'}`}>
                {dropdown.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="nav-item block py-1 pl-2"
                        onClick={closeDrawer}
                        tabIndex={drawerOpen ? 0 : -1}
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
              className={`nav-item block py-1${location.pathname===link.path ? ' active' : ''}`}
              onClick={closeDrawer}
            >
  {translateWithFallback(null, link.labelKey)}
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