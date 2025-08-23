/**
 * Reports.js
 * Component for displaying and managing research reports with password-protected downloads.
 * Features day-based filtering, category selection, search, pagination, and animations.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Trans } from '../i18nShim';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiLock, FiEye } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';

// Constants
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(79, 70, 229, 0.4)' },
  tap: { scale: 0.95 },
};

// Loading spinner component
const LoadingSpinner = () => (
  <motion.div
    className="flex justify-center items-center py-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </motion.div>
);

// Controlled confirmation modal for password verification
const PasswordModal = ({ isOpen, onClose, onConfirm, report }) => {
  const [passwordInput, setPasswordInput] = useState('');
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200/20 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Verify Password for {report?.title}
            </h3>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit password"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              aria-label={`Password for ${report?.title}`}
            />
            <div className="flex justify-end gap-4">
              <motion.button
                onClick={() => {
                  onConfirm(passwordInput, report);
                  setPasswordInput('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              ><Trans i18nKey="pages.Reports.verify">Verify</Trans></motion.button>
              <motion.button
                onClick={() => {
                  setPasswordInput('');
                  onClose();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              ><Trans i18nKey="pages.Reports.cancel">Cancel</Trans></motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  report: PropTypes.shape({
    title: PropTypes.string,
    password: PropTypes.string,
  }),
};

// Report preview modal with embedded PDF view
const ReportPreviewModal = ({ isOpen, onClose, report = null, onDownload = null }) => (
  <AnimatePresence>
    {isOpen && report && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-gray-200/20 max-w-full sm:max-w-xl md:max-w-3xl w-full h-[90vh] sm:h-[80vh] mx-2 sm:mx-auto flex flex-col overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white truncate">{report?.title}</h3>
            <motion.button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Close preview"
            ><Trans i18nKey="pages.Reports.close">Close</Trans></motion.button>
          </div>
          <div className="bg-white h-full rounded-md overflow-hidden flex flex-col">
            <div className="flex-1 min-h-0">
              <iframe
                src={report?.file || report?.fileData}
                title={report?.title}
                className="w-full h-full"
              />
            </div>
            <div className="p-3 border-t border-gray-200/10 bg-gray-50/5 flex justify-end gap-3">
              {onDownload && (
                <motion.button
                  onClick={() => onDownload(report)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Trans i18nKey="pages.Reports.download">Download</Trans>
                </motion.button>
              )}
              <motion.button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Trans i18nKey="pages.Reports.close">Close</Trans>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Defensive: ensure no .defaultProps exist on this function component
// (some toolchains or HOCs may add it; React warns about defaultProps on
// function components in future releases). We delete it proactively.
if (ReportPreviewModal.defaultProps) {
  try {
    delete ReportPreviewModal.defaultProps;
  } catch (e) {
    /* ignore — defensive */
  }
}

ReportPreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // report may be null when modal is toggled; not required
  report: PropTypes.shape({ title: PropTypes.string }),
  onDownload: PropTypes.func,
};

// Day selector component
const DaySelector = ({ activeDay, setActiveDay }) => (
  <motion.div
    className="mb-8"
    variants={itemVariants}
    data-aos="fade-up"
  >
    <div className="flex overflow-x-auto no-scrollbar px-2">
      <div className="inline-flex rounded-md shadow-sm space-x-2">
        {WEEK_DAYS.map((day) => (
          <motion.button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`min-w-[80px] px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeDay === day
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            } ${day === 'Monday' ? 'rounded-l-lg' : ''} ${
              day === 'Friday' ? 'rounded-r-lg' : ''
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Select ${day}`}
          >
            {day}
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

DaySelector.propTypes = {
  activeDay: PropTypes.string.isRequired,
  setActiveDay: PropTypes.func.isRequired,
};

// Search and filter component
const SearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => (
  <motion.div
    className="mb-6 flex flex-col md:flex-row gap-4"
    variants={itemVariants}
    data-aos="fade-up"
  >
    <div className="relative flex-grow">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search reports..."
        className="pl-10 pr-4 py-3 w-full rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition-all duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search reports"
      />
    </div>
    <select
      className="px-4 py-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition-all duration-300"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      aria-label="Select report category"
    >
      <option value="All"><Trans i18nKey="pages.Reports.all-categories">All Categories</Trans></option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat} className="bg-gray-800">
          {cat}
        </option>
      ))}
    </select>
  </motion.div>
);

SearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

// Report card component
const ReportCard = ({ report, isSelected, onVerify, onPreview }) => (
  <motion.li
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 bg-white/5 backdrop-blur-lg border border-gray-200/10 ${
      isSelected ? 'bg-indigo-500/20 border-indigo-200/20' : 'hover:bg-gray-700/50'
    }`}
    data-aos="fade-up"
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium text-white">{report.title}</h4>
        <p className="text-sm text-gray-300 mt-1">{report.description}</p>
      </div>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {report.size}
      </span>
    </div>
    <div className="mt-2">
      <span className="inline-block text-xs font-medium text-indigo-400">
        {report.category}
      </span>
    </div>
    <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
      <motion.button
        onClick={() => onVerify(report)}
        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Verify password for ${report.title}`}
      >
        <FiLock /><Trans i18nKey="pages.Reports.verify">Verify</Trans>
      </motion.button>
      <motion.button
        onClick={() => onPreview && onPreview(report)}
        className="w-full sm:w-auto px-4 py-2 bg-white/10 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Preview ${report.title}`}
      >
        <FiEye /><Trans i18nKey="pages.Reports.preview">Preview</Trans>
      </motion.button>
    </div>
  </motion.li>
);

ReportCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired,
};

// Pagination component
const Pagination = ({ totalPages, currentPage, paginate }) => (
  <motion.div
    className="mt-6 flex justify-center gap-3"
    variants={itemVariants}
    data-aos="fade-up"
  >
    {Array.from({ length: totalPages }, (_, i) => (
      <motion.button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
          currentPage === i + 1
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Go to page ${i + 1}`}
      >
        {i + 1}
      </motion.button>
    ))}
  </motion.div>
);

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

/**
 * Main Reports component
 * @returns {JSX.Element} Reports page UI
 */
function Reports() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [pdfPreview, setPdfPreview] = useState(null);
  const [reports, setReports] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');


  // Fetch reports
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setIsLoading(true);
    const reportsRef = ref(db, 'reports');
    const unsubscribe = onValue(
      reportsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const reportList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          const groupedReports = WEEK_DAYS.reduce((acc, day) => {
            acc[day] = reportList.filter((report) => report.day === day);
            return acc;
          }, {});
          setReports(groupedReports);
          toast.success('Reports loaded successfully.', { position: 'top-center', autoClose: 2000 });
        } else {
          setReports(WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
          toast.info('No reports found.', { position: 'top-center', autoClose: 2000 });
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching reports:', error);
        toast.error('Failed to load reports: ' + error.message, { position: 'top-center' });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Reset preview when day changes
  useEffect(() => {
    setPdfPreview(null);
    setSelectedReport(null);
    setCurrentPage(1);
  }, [activeDay]);

  // Handle password verification
  const handleVerifyPassword = useCallback((password, report) => {
    if (!password) {
      toast.error('Please enter a password.', { position: 'top-center' });
      return;
    }
    if (password === report.password) {
      setPdfPreview(report);
      setSelectedReport(report);
      setIsPasswordModalOpen(false);
      toast.success('Password verified successfully.', { position: 'top-center' });
    } else {
      toast.error('Incorrect password.', { position: 'top-center' });
    }
  }, []);

  // Handle report preview
  const handlePreviewReport = (report) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  // Handle download
  const handleDownload = (report) => {
    if (!selectedReport || selectedReport.id !== report.id) {
      toast.error('Please verify the password first.', { position: 'top-center' });
      return;
    }
    try {
      const base64String = report.file.split(',')[1];
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = report.filename || `${report.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Report downloaded successfully.', { position: 'top-center' });
      setIsPreviewOpen(false);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report: ' + error.message, { position: 'top-center' });
    }
  };

  // Filter and sort reports
  const currentDayReports = reports[activeDay] || [];
  const filteredReports = currentDayReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'size') {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8 pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          data-aos="fade-up"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"><Trans i18nKey="pages.Reports.research-reports">Research Reports</Trans></h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-white"><Trans i18nKey="pages.Reports.daily-analysis-and-insights">Daily analysis and insights</Trans></p>
        </motion.div>

        {/* Day Selector */}
        <DaySelector activeDay={activeDay} setActiveDay={setActiveDay} />

        {/* Search & Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Sort Controls */}
        <motion.div
          className="mb-6 flex justify-end gap-4"
          variants={itemVariants}
          data-aos="fade-up"
        >
          <select
            className="px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition-all duration-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort reports by"
          >
            <option value="title"><Trans i18nKey="pages.Reports.sort-by-title">Sort by Title</Trans></option>
            <option value="size"><Trans i18nKey="pages.Reports.sort-by-size">Sort by Size</Trans></option>
          </select>
          <motion.button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortOrder === 'asc' ? 'Sort ↓' : 'Sort ↑'}
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden"
          variants={itemVariants}
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row">
            {/* Report List */}
            <div className="w-full md:w-1/3 border-r border-gray-200/20">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">{activeDay}</h3>
                {isLoading ? (
                  <LoadingSpinner />
                ) : paginatedReports.length > 0 ? (
                  <ul className="space-y-4">
                    {paginatedReports.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        isSelected={pdfPreview?.id === report.id}
                        onVerify={() => {
                          setSelectedReport(report);
                          setIsPasswordModalOpen(true);
                        }}
                        onPreview={handlePreviewReport}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 text-sm"><Trans i18nKey="pages.Reports.no-reports-found">No reports found.</Trans></p>
                )}
              </div>
            </div>

            {/* PDF Preview */}
            <div className="w-full md:w-2/3 bg-gray-900/50">
              <div className="p-6 h-full">
                {pdfPreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-lg shadow-sm rounded-lg overflow-hidden h-full flex flex-col"
                    data-aos="fade-up"
                  >
                    <div className="px-6 py-4 border-b border-gray-200/20">
                      <h3 className="text-lg font-medium text-white">{pdfPreview.title}</h3>
                      <p className="text-sm text-gray-300 mt-1">{pdfPreview.description}</p>
                    </div>
                    <div className="flex-grow p-6 flex items-center justify-center bg-gray-800/50">
                      <div className="text-center">
                        <div className="mb-4 p-4 bg-white/10 rounded-lg shadow-inner">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                            alt="PDF Thumbnail"
                            className="w-32 h-32 object-contain mx-auto"
                          />
                        </div>
                        <motion.button
                          onClick={() => setIsPreviewOpen(true)}
                          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          aria-label="View report"
                        >
                          <FiEye /><Trans i18nKey="pages.Reports.view-report">View Report</Trans></motion.button>
                        <p className="mt-2 text-sm text-gray-300">
                          {pdfPreview.title} ({pdfPreview.size})
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200/20 bg-gray-900/50 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><Trans i18nKey="pages.Reports.available-for-download-only">Available for download only</Trans></span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-white"><Trans i18nKey="pages.Reports.no-report-selected">No report selected</Trans></h3>
                      <p className="mt-1 text-sm text-gray-300"><Trans i18nKey="pages.Reports.click-on-a-report-and-verify-the-passwor"><Trans i18nKey="pages.Reports.click-on-a-report-and-verify-the-passwor-1">Click on a report and verify the password to preview it</Trans></Trans></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>

      {/* Password Verification Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handleVerifyPassword}
        report={selectedReport}
      />

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedReport(null);
        }}
        report={selectedReport}
  onDownload={handleDownload}
      />
    </motion.div>
  );
}

export default Reports;