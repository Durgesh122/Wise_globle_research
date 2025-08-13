import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTimes, FaBuilding, FaBriefcase, FaNewspaper, FaUserShield,
  FaChartLine, FaCoins, FaGlobe, FaUniversity, FaFileAlt, FaShieldAlt
} from 'react-icons/fa';
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

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
      { path: '/SmartIndexOption', labelKey: 'navbar.services.index.smartIndexOption' },
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

const MegaMenu = React.memo(({ labelKey, categories, location, textColor, isMobile, mobileOpen, setMobileOpen }) => {
  const { t } = useTranslation();
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
          aria-label={`Toggle ${t(labelKey)} menu`}
          onClick={handleClick}
        >
          {t(labelKey)}
        </button>
        <div
          className={`absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-lg border border-[var(--primary-green)] text-black shadow-lg rounded-xl z-50 flex flex-row p-4 w-[90vw] md:w-[80vw] max-w-[900px] transition-opacity duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } animate-slideDown`}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.labelKey}>
              <div className="min-w-[180px] px-2">
                <div className="font-semibold text-sm md:text-base mb-2 text-[var(--primary-green)]">
                  {t(cat.labelKey)}
                </div>
                <div className="space-y-1 text-xs md:text-sm">
                  {cat.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block hover:text-blue-600 py-1 transition-all duration-300 ${
                        location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.labelKey)}
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

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center font-bold text-base py-2 text-[var(--primary-green)] focus:outline-none"
        onClick={handleClick}
        aria-expanded={mobileOpen}
        aria-label={`Toggle ${t(labelKey)} menu`}
        style={{ color: textColor }}
      >
        {t(labelKey)}
        <span className={`ml-2 transition-transform duration-200 ${mobileOpen ? 'rotate-90' : ''}`}>▶</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[1000px] py-2' : 'max-h-0 py-0'}`}>
        {categories.map((cat) => (
          <div key={cat.labelKey} className="pl-2">
            <div className="font-semibold text-sm mt-2 mb-1 text-[var(--primary-green)]">{t(cat.labelKey)}</div>
            {cat.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-item block py-1 pl-2"
                onClick={() => setMobileOpen(false)}
                style={{ color: textColor }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

function Navbar() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef();
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients?.[theme] || gradients.default;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDrawerOpen(false);
        setServicesMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
        setServicesMobileOpen(false);
      }
    };
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  return (
    <>
      <nav
        style={{ background, color: textColor }}
        className="fixed w-full top-0 z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-b-xl"
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
          <div className="desktop-menu hidden lg:flex space-x-2 xl:space-x-4 items-center font-medium">
            <Link
              to="/"
              className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${location.pathname==='/' ? ' active' : ''}`}
              style={{ color: textColor }}
            >
              {t('navbar.home')}
            </Link>

            <MegaMenu labelKey="navbar.services.title" categories={servicesMenu} location={location} textColor={textColor} isMobile={false} />

            {Object.values(dropdownLinks).map((dropdown) => (
              <div className="relative group" key={dropdown.labelKey}>
                <button
                  className={`nav-item font-semibold text-xs xl:text-base px-2 py-1${dropdown.items.some(item => location.pathname.startsWith(item.path)) ? ' active' : ''}`}
                  style={{ color: textColor }}
                  aria-label={`Toggle ${t(dropdown.labelKey)} menu`}
                >
                  {t(dropdown.labelKey)}
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
                      {item.icon} {t(item.labelKey)}
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
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden z-50 drawer-toggle"
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

      {drawerOpen && (
        <div className="mobile-overlay fixed inset-0 bg-black/40 z-40" onClick={() => setDrawerOpen(false)}></div>
      )}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        ref={drawerRef}
        style={{ color: textColor }}
      >
        <div className="flex flex-col space-y-2 text-sm px-4 py-6">
          <Link
            to="/"
            className="nav-item font-semibold py-1"
            onClick={() => setDrawerOpen(false)}
            style={{ color: textColor }}
          >
            {t('navbar.home')}
          </Link>

          {/* Responsive Services Accordion */}
          <MegaMenu labelKey="navbar.services.title" categories={servicesMenu} location={location} textColor={textColor} isMobile={true} mobileOpen={servicesMobileOpen} setMobileOpen={setServicesMobileOpen} />

          {Object.values(dropdownLinks).map((dropdown) => (
            <div key={dropdown.labelKey}>
              <div className="font-bold text-base mt-4 text-[var(--primary-green)]">{t(dropdown.labelKey)}</div>
              {dropdown.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-item block py-1 pl-2 flex items-center gap-2"
                  onClick={() => setDrawerOpen(false)}
                  style={{ color: textColor }}
                >
                  {item.icon} {t(item.labelKey)}
                </Link>
              ))}
            </div>
          ))}

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item block py-1${location.pathname===link.path ? ' active' : ''}`}
              onClick={() => setDrawerOpen(false)}
              style={{ color: textColor }}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
