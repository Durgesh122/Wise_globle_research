import React, { useState, useEffect, useRef, useContext } from 'react';
// useTranslation removed from this file to rely on translateWithFallback helper
import { Link, useLocation } from 'react-router-dom';
import {
  FaTimes, FaBuilding, FaBriefcase, FaNewspaper, FaUserShield,
  FaChartLine, FaCoins, FaGlobe, FaUniversity, FaFileAlt, FaShieldAlt
} from 'react-icons/fa';
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
  'navbar.contactUs': 'Contact Us',
  'navbar.researchReports': 'Research Reports',
  // Explicit category titles for Services mega menu
  'navbar.services.cash.title': 'Cash',
  'navbar.services.option.title': 'Option',
  'navbar.services.specialization.title': 'Specialization',
  'navbar.services.index.title': 'Index',
  'navbar.services.mcx.title': 'MCX',
};

const servicesMenu = [
  {
    labelKey: 'navbar.services.cash.title',
    items: [
      { path: '/EvaluationStockCash', labelKey: 'navbar.services.cash.evaluationStockCash' },
      { path: '/SmartCash', labelKey: 'navbar.services.cash.smartCash' },
      { path: '/services/equity/cash', labelKey: 'navbar.services.cash.cash' },
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
      { path: '/MCXSupreme', labelKey: 'navbar.services.specialization.mcxSupreme' },
      { path: '/GalaxyMCX', labelKey: 'navbar.services.specialization.galaxyMCX' },
      { path: '/UniversalCash', labelKey: 'navbar.services.specialization.universalCash' },
    ],
  },
  {
    labelKey: 'navbar.services.index.title',
    items: [
      { path: '/EvaluationIndexOptions', labelKey: 'navbar.services.index.evaluationIndexOptions' },
      { path: '/ImpulseIndexOptions', labelKey: 'navbar.services.index.impulseIndexOptions' },
      { path: '/services/smart-index-option', labelKey: 'navbar.services.index.smartIndexOption' },
      { path: '/services/equity/index', labelKey: 'navbar.services.index.index' },
    ],
  },
  {
    labelKey: 'navbar.services.mcx.title',
    items: [
      { path: '/mcx', labelKey: 'navbar.services.mcx.mcx' },
      { path: '/services/mcx/bullions', labelKey: 'navbar.services.mcx.bullions' },
      { path: '/services/mcx/energy', labelKey: 'navbar.services.mcx.energy' },
      { path: '/services/mcx/metal', labelKey: 'navbar.services.mcx.metal' },
      { path: '/services/mcx/mcx-option', labelKey: 'navbar.services.mcx.mcxOption' },
    ],
  },
];

const dropdownLinks = {
  company: {
    labelKey: 'navbar.company.title',
    items: [
      { path: '/about', labelKey: 'navbar.company.aboutUs', icon: <FaBuilding /> },
      { path: '/team', labelKey: 'navbar.company.ourTeam', icon: <FaUserShield /> },
      { path: '/vision', labelKey: 'navbar.company.visionMission', icon: <FaChartLine /> },
    ]
  },
  hrZone: {
    labelKey: 'navbar.hrZone.title',
    items: [
      { path: '/career', labelKey: 'navbar.hrZone.career', icon: <FaBriefcase /> },
      { path: '/training', labelKey: 'navbar.hrZone.training', icon: <FaUniversity /> },
    ]
  },
  insights: {
    labelKey: 'navbar.insights.title',
    items: [
      { path: '/blogs', labelKey: 'navbar.insights.blogs', icon: <FaNewspaper /> },
      { path: '/market-news', labelKey: 'navbar.insights.marketNews', icon: <FaGlobe /> },
      { path: '/complaint-data', labelKey: 'navbar.insights.complaintData', icon: <FaUserShield /> },
      { path: '/grievance-redressal-process', labelKey: 'navbar.insights.grievanceRedressalProcess', icon: <FaFileAlt /> },
    ]
  },
  dashboard: {
    labelKey: 'navbar.dashboard.title',
    items: [
      { path: '/admin', labelKey: 'navbar.dashboard.adminPanel', icon: <FaUserShield /> },
      { path: '/client-panel', labelKey: 'navbar.dashboard.clientPanel', icon: <FaCoins /> },
      { path: '/client-service-consent', labelKey: 'navbar.dashboard.clientServiceConsent', icon: <FaFileAlt /> },
      { path: '/investor-chart', labelKey: 'navbar.dashboard.investorChart', icon: <FaChartLine /> },
      { path: '/anti-money-laundering', labelKey: 'navbar.dashboard.antiMoneyLaundering', icon: <FaShieldAlt /> },
    ]
  },
};

const navLinks = [
  { path: '/payment', labelKey: 'navbar.payment' },
  { path: '/complaint', labelKey: 'navbar.complaintBox' },
  { path: '/contact', labelKey: 'navbar.contactUs' },
  { path: '/reports', labelKey: 'navbar.researchReports' },
];

const MegaMenu = React.memo(({ labelKey, categories, location, textColor, isMobile, mobileOpen, setMobileOpen, closeDrawer }) => {
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
          className={`absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-lg border border-[var(--primary-green)] text-black shadow-lg rounded-xl z-50 flex flex-row p-4 w-[90vw] md:w-[80vw] max-w-[900px] transition-opacity duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } animate-slideDown`}
          style={{
            overflowX: 'auto',
            wordBreak: 'break-word',
            minWidth: '250px',
            maxWidth: '900px',
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
                className="nav-item block py-1 pl-2 text-gray-800"
                onClick={handleLinkClick}
              >
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
  // useTranslation was previously used; translateWithFallback provides fallbacks so
  // we don't need to reference `t` directly here which removes an ESLint unused-var warning.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [mobileDropdownsOpen, setMobileDropdownsOpen] = useState({});
  const location = useLocation();
  const drawerRef = useRef();
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients?.[theme] || gradients.default;
  const navRef = useRef(null);

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
    width: '80%',
    maxWidth: '320px',
    minWidth: '260px',
    background: 'var(--bg-opacity)',
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
        ref={navRef}
        style={{ background, color: textColor }}
        className="fixed w-full z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-b-xl"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center rotate-logo">
            <div className="rounded-full p-1 border-2 border-[var(--primary-green)]">
              <img
                src={wiseLogo}
                alt="Wise Logo"
                className="h-10 sm:h-12 md:h-14 w-auto rounded-xl logo-hover"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu hidden lg:flex lg:flex-wrap lg:justify-end space-x-2 xl:space-x-4 items-center font-medium">
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
                >
                    {translateWithFallback(null, dropdown.labelKey)}
                </button>
                <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md border border-[var(--primary-green)] text-black shadow-md rounded-md z-50 group-hover:flex flex-col min-w-[180px] xl:min-w-[200px] p-2 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible animate-slideDown">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 xl:px-4 py-2 hover:bg-gray-200 text-xs xl:text-sm flex items-center gap-2 transition-all duration-300 ${
                        location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
                      }`}
                    >
                      {item.icon} {translateWithFallback(null, item.labelKey)}
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

          {/* Mobile Hamburger */}
            <button
              className="lg:hidden z-[10000] drawer-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle mobile menu"
            >
            {drawerOpen ? (
              <FaTimes size={24} color={textColor} className="mobile-close-btn" />
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
      <div style={mobileDrawerStyles} ref={drawerRef}>
        <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            className="nav-item font-semibold py-1"
            onClick={closeDrawer}
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
                    className="nav-item block py-1 pl-2 flex items-center gap-2"
                    onClick={closeDrawer}
                  >
  {item.icon} {translateWithFallback(null, item.labelKey)}
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
        </div>
      </div>
    </>
  );
}

export default Navbar;