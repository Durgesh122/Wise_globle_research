import React, { Suspense, useState, useContext } from 'react';
import { Trans } from '../../i18nShim';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaEnvelope, FaExclamationCircle, FaChartBar, FaSignOutAlt, FaBullhorn, FaComments, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useAdmin } from '../../hooks/useAdmin';
import AdminHeader from './AdminHeader.js';
import { ThemeContext } from '../../context/ThemeContext';

const AdminLayout = () => {
  const { background, textColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isSupport, isHrOnly, checking } = useAdmin();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const idleTimeoutRef = React.useRef();

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/user-login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  const handleLogout = React.useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuthenticated');
        toast.success('Logged out successfully.', { position: 'top-center' });
        navigate('/user-login');
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`, { position: 'top-center' });
      });
  }, [navigate]);

  const handleGoHome = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, { position: 'top-center' });
      });
  };

  React.useEffect(() => {
    if (checking || (!isAdmin && !isHrOnly)) return;
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const resetTimer = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => handleLogout(), 5 * 60 * 1000);
    };
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [checking, isAdmin, isHrOnly, handleLogout]);

  const getPageTitle = () => {
    const path = location.pathname;
    const item = allNav.find(navItem => navItem.path === path);
    return item ? item.label : 'Dashboard';
  };

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const allNav = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/contacts', label: 'Contact Submissions', icon: <FaEnvelope /> },
    { path: '/admin/home-contacts', label: 'Home Page Contacts', icon: <FaEnvelope /> },
    { path: '/admin/popups', label: 'Popup Submissions', icon: <FaBullhorn /> },
    { path: '/admin/complaint-box', label: 'Complaint Box Submission', icon: <FaExclamationCircle /> },
    { path: '/admin/complaints', label: 'Complaint Manager', icon: <FaExclamationCircle /> },
    { path: '/admin/reports', label: 'Report Manager', icon: <FaChartBar /> },
    { path: '/admin/chatbot-data', label: 'Chatbot Data', icon: <FaComments /> },
    { path: '/admin/a11y-feedback', label: 'A11y Feedback', icon: <FaComments /> },
    { path: '/admin/jobs', label: 'Jobs', icon: <FaComments /> },
  ];

  const supportNav = allNav.filter(item => ['/admin/reports', '/admin/complaint-box', '/admin/complaints'].includes(item.path));
  const hrNav = allNav.filter(item => item.path === '/admin/jobs');
  const navItems = isAdmin ? allNav : isHrOnly ? hrNav : isSupport ? supportNav : [];

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const Sidebar = () => (
    <motion.aside
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="absolute top-0 left-0 h-full w-64 p-4 flex flex-col z-20 md:relative md:translate-x-0"
      style={{ background: '#ffffff4d', backdropFilter: 'blur(8px)', borderRight: '1px solid rgba(0,0,0,0.06)' }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-adaptive">
        <Trans i18nKey="pages.admin_AdminLayout.admin-panel">Admin Panel</Trans>
      </h2>
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-600 text-adaptive shadow-lg' : 'hover:bg-gray-200/60 text-adaptive/90'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <motion.button
        onClick={handleGoHome}
        className="mt-4 mb-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
        style={{ background: 'linear-gradient(90deg,#2eed1c,#1fbf18)', color: '#000' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHome />
        <span><Trans i18nKey="pages.admin_AdminLayout.home">Home</Trans></span>
      </motion.button>
      <motion.button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg transition-colors"
        style={{ background: 'rgba(255,99,71,0.08)', color: 'var(--text-body, #111827)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt />
        <span><Trans i18nKey="pages.admin_AdminLayout.logout">Logout</Trans></span>
      </motion.button>
    </motion.aside>
  );

  return (
    <div
      className="flex min-h-screen font-sans"
      style={{ background: background, color: textColor, transition: 'background 0.5s ease-in-out, color 0.5s ease-in-out' }}
    >
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-10 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            <Sidebar />
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col text-adaptive">
        <AdminHeader 
          pageTitle={getPageTitle()} 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))' }}>
          <Suspense fallback={
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;