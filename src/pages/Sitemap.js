
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaUniversalAccess,
  FaCommentDots,
  FaMoneyCheckAlt,
  FaBlog,
  FaBriefcase,
  FaUserShield,
  FaHandshake,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaDatabase,
  FaEye,
  FaBalanceScale,
  FaChartPie,
  FaChartBar,
  FaStar,
  FaGavel,
  FaBookOpen,
  FaBolt,
  FaLightbulb,
  FaInfinity,
  FaChartArea,
  FaLandmark,
  FaNewspaper,
  FaCrown,
  FaVideo,
  FaCreditCard,
  FaUserSecret,
  FaThumbsUp,
  FaUndo,
  FaFileAlt,
  FaSearch,
  FaServicestack,
  FaMoneyBillWave,
  FaRocket,
  FaLayerGroup,
  FaCube,
  FaUserLock,
  FaEye as FaEye2
} from 'react-icons/fa';

const pageFiles = [
  { path: '/', name: 'Home', icon: <FaHome style={{ color: '#007bff' }} /> },
  { path: '/about', name: 'About', icon: <FaInfoCircle style={{ color: '#6f42c1' }} /> },
  { path: '/accessibility-statement', name: 'Accessibility Statement', icon: <FaUniversalAccess style={{ color: '#20c997' }} /> },
  { path: '/accessibility-feedback', name: 'Accessibility Feedback', icon: <FaCommentDots style={{ color: '#fd7e14' }} /> },
  { path: '/anti-money-laundering', name: 'Anti Money Laundering', icon: <FaMoneyCheckAlt style={{ color: '#28a745' }} /> },
  { path: '/blogs', name: 'Blogs', icon: <FaBlog style={{ color: '#e83e8c' }} /> },
  { path: '/career', name: 'Career', icon: <FaBriefcase style={{ color: '#343a40' }} /> },
  { path: '/client-panel', name: 'Client Panel', icon: <FaUserShield style={{ color: '#6610f2' }} /> },
  { path: '/client-service-consent-form', name: 'Client Service Consent', icon: <FaHandshake style={{ color: '#fdc107' }} /> },
  { path: '/complaint', name: 'Complaint', icon: <FaExclamationTriangle style={{ color: '#dc3545' }} /> },
  { path: '/complaint-data', name: 'Complaint Data', icon: <FaDatabase style={{ color: '#17a2b8' }} /> },
  { path: '/contact', name: 'Contact', icon: <FaPhoneAlt style={{ color: '#007bff' }} /> },
  { path: '/disclosure', name: 'Disclosure', icon: <FaEye style={{ color: '#e83e8c' }} /> },
  { path: '/EvaluationIndexOptions', name: 'Evaluation Index Options', icon: <FaBalanceScale style={{ color: '#6f42c1' }} /> },
  { path: '/EvaluationStockCash', name: 'Evaluation Stock Cash', icon: <FaChartPie style={{ color: '#20c997' }} /> },
  { path: '/EvaluationStockOption', name: 'Evaluation Stock Option', icon: <FaChartBar style={{ color: '#fd7e14' }} /> },
  { path: '/GalaxyMCX', name: 'Galaxy MCX', icon: <FaStar style={{ color: '#e83e8c' }} /> },
  { path: '/grievance-redressal-process', name: 'Grievance Redressal Process', icon: <FaGavel style={{ color: '#343a40' }} /> },
  { path: '/guide', name: 'Guide For Investing', icon: <FaBookOpen style={{ color: '#6610f2' }} /> },
  { path: '/ImpulseIndexOptions', name: 'Impulse Index Options', icon: <FaBolt style={{ color: '#fdc107' }} /> },
  { path: '/ImpulseOption', name: 'Impulse Option', icon: <FaLightbulb style={{ color: '#dc3545' }} /> },
  { path: '/InfinityClub', name: 'Infinity Club', icon: <FaInfinity style={{ color: '#17a2b8' }} /> },
  { path: '/investor-chart', name: 'Investor Chart', icon: <FaChartArea style={{ color: '#007bff' }} /> },
  { path: '/disclaimer', name: 'Disclaimer', icon: <FaLandmark style={{ color: '#6f42c1' }} /> },
  { path: '/market-news', name: 'Market News', icon: <FaNewspaper style={{ color: '#20c997' }} /> },
  { path: '/MCXSupreme', name: 'MCX Supreme', icon: <FaCrown style={{ color: '#fdc107' }} /> },
  { path: '/media', name: 'Media', icon: <FaVideo style={{ color: '#dc3545' }} /> },
  { path: '/notfound', name: 'Not Found', icon: <FaFileAlt style={{ color: '#dc3545' }} /> },
  { path: '/payment', name: 'Payment Info', icon: <FaCreditCard style={{ color: '#007bff' }} /> },
  { path: '/privacy', name: 'Privacy', icon: <FaUserSecret style={{ color: '#343a40' }} /> },
  { path: '/recommendation', name: 'Recommendation', icon: <FaThumbsUp style={{ color: '#28a745' }} /> },
  { path: '/refund', name: 'Refund', icon: <FaUndo style={{ color: '#fd7e14' }} /> },
  { path: '/research-reports', name: 'Reports', icon: <FaFileAlt style={{ color: '#6f42c1' }} /> },
  { path: '/search', name: 'Search', icon: <FaSearch style={{ color: '#20c997' }} /> },
  { path: '/services', name: 'Services', icon: <FaServicestack style={{ color: '#6610f2' }} /> },
  { path: '/SmartCash', name: 'Smart Cash', icon: <FaMoneyBillWave style={{ color: '#fdc107' }} /> },
  { path: '/SmartFuture', name: 'Smart Future', icon: <FaRocket style={{ color: '#dc3545' }} /> },
  { path: '/services/smart-index-option', name: 'Smart Index Option', icon: <FaLayerGroup style={{ color: '#007bff' }} /> },
  { path: '/SmartOptions', name: 'Smart Options', icon: <FaCube style={{ color: '#6f42c1' }} /> },
  { path: '/terms', name: 'Terms', icon: <FaUserLock style={{ color: '#28a745' }} /> },
  { path: '/UniversalCash', name: 'Universal Cash', icon: <FaMoneyBillWave style={{ color: '#e83e8c' }} /> },
  { path: '/admin-login', name: 'Admin Login', icon: <FaUserSecret style={{ color: '#343a40' }} /> },
  { path: '/vision', name: 'Vision', icon: <FaEye2 style={{ color: '#007bff' }} /> }
];

function Sitemap() {
  const [search, setSearch] = useState('');
  const filteredPages = pageFiles.filter(
    (page) =>
      page.name.toLowerCase().includes(search.toLowerCase()) ||
      page.path.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">Sitemap</h1>
        <div className="flex justify-center mb-6 sm:mb-8 w-full">
        <input
          id="sitemap-search"
          name="sitemap-search"
          type="text"
          placeholder="Search pages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-xs sm:max-w-md md:max-w-lg px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
          aria-label="Search sitemap"
        />
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredPages.map((page, idx) => (
          <Link
            key={idx}
            to={page.path}
            className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/80 rounded-xl shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 border border-gray-200 min-h-[120px] sm:min-h-[150px] w-full"
          >
            <div className="mb-2 sm:mb-3 text-2xl sm:text-3xl text-blue-500">{page.icon || <FaFileAlt />}</div>
            <span className="text-base sm:text-lg font-semibold text-gray-800 text-center break-words">{page.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sitemap;

