import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, remove, push, update } from 'firebase/database';
import { db, auth } from '../firebase';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiTrash2, FiUpload, FiSearch, FiEye, FiEdit } from 'react-icons/fi';
import Papa from 'papaparse';
import PropTypes from 'prop-types';

// Constants for weekdays and report categories
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const REPORT_CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

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

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
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

// Modal component for deletion confirmation
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => (
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
          <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <motion.button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Confirm
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

// Report preview modal component
const ReportPreviewModal = ({ isOpen, onClose, report }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200/20 max-w-lg w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">{report?.title || 'No Title'}</h3>
          <p className="text-gray-300 mb-4">{report?.description || 'No Description'}</p>
          <p className="text-sm text-gray-400 mb-2">Category: {report?.category || 'N/A'}</p>
          <p className="text-sm text-gray-400 mb-4">Size: {report?.size || 'N/A'}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            alt="PDF Thumbnail"
            className="w-32 h-32 object-contain mx-auto mb-4"
          />
          <div className="flex justify-end">
            <motion.button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

ReportPreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  report: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    size: PropTypes.string,
  }),
};

// Search bar component
const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <motion.div
    className="relative w-full max-w-md"
    variants={itemVariants}
    data-aos="fade-up"
  >
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search submissions..."
      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition-all duration-300"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      aria-label="Search submissions"
    />
  </motion.div>
);

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

// Submission table component
const SubmissionTable = ({ submissions, handleDeleteSubmission, handleSortToggle, sortOrder }) => (
  <motion.div
    className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto mb-8"
    variants={tableVariants}
    initial="hidden"
    animate="visible"
    data-aos="fade-up"
  >
    <table className="w-full text-white">
      <thead className="bg-gray-700/50">
        <tr>
          <th className="p-4 text-left text-sm font-semibold">Name</th>
          <th className="p-4 text-left text-sm font-semibold">Email</th>
          <th className="p-4 text-left text-sm font-semibold">Phone</th>
          <th className="p-4 text-left text-sm font-semibold">Interest</th>
          <th className="p-4 text-left text-sm font-semibold">Message</th>
          <th className="p-4 text-left text-sm font-semibold">
            <button
              onClick={handleSortToggle}
              className="hover:text-indigo-400 transition-colors"
              aria-label={`Sort by date ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
            >
              Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </th>
          <th className="p-4 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, index) => (
          <motion.tr
            key={submission.id}
            className="border-b border-gray-200/20 hover:bg-gray-700/20 transition-colors duration-200"
            variants={rowVariants}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <td className="p-4">{submission.name || 'N/A'}</td>
            <td className="p-4">{submission.email || 'N/A'}</td>
            <td className="p-4">{submission.phone || 'N/A'}</td>
            <td className="p-4">{submission.interest || 'N/A'}</td>
            <td className="p-4">{submission.message || 'N/A'}</td>
            <td className="p-4">
              {submission.timestamp
                ? new Date(submission.timestamp).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'N/A'}
            </td>
            <td className="p-4">
              <motion.button
                onClick={() => handleDeleteSubmission(submission.id)}
                className="text-red-500 hover:text-red-700"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={`Delete submission ${submission.name || 'N/A'}`}
              >
                <FiTrash2 size={16} />
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

SubmissionTable.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      interest: PropTypes.string,
      message: PropTypes.string,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  handleDeleteSubmission: PropTypes.func.isRequired,
  handleSortToggle: PropTypes.func.isRequired,
  sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

// New component for Consent Submissions Table
const ConsentSubmissionTable = ({ submissions, handleDelete }) => (
  <motion.div
    className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto mb-8"
    variants={tableVariants}
    initial="hidden"
    animate="visible"
    data-aos="fade-up"
  >
    <table className="w-full text-white">
      <thead className="bg-gray-700/50">
        <tr>
          <th className="p-4 text-left text-sm font-semibold">Client Name</th>
          <th className="p-4 text-left text-sm font-semibold">Father's Name</th>
          <th className="p-4 text-left text-sm font-semibold">Client ID</th>
          <th className="p-4 text-left text-sm font-semibold">Email</th>
          <th className="p-4 text-left text-sm font-semibold">DOB</th>
          <th className="p-4 text-left text-sm font-semibold">PAN</th>
          <th className="p-4 text-left text-sm font-semibold">Aadhaar</th>
          <th className="p-4 text-left text-sm font-semibold">Address</th>
          <th className="p-4 text-left text-sm font-semibold">PAN Card</th>
          <th className="p-4 text-left text-sm font-semibold">Aadhaar Card</th>
          <th className="p-4 text-left text-sm font-semibold">Signature</th>
          <th className="p-4 text-left text-sm font-semibold">Timestamp</th>
          <th className="p-4 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, index) => (
          <motion.tr
            key={submission.id}
            className="border-b border-gray-200/20 hover:bg-gray-700/20 transition-colors duration-200"
            variants={rowVariants}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <td className="p-4">{submission.clientName || 'N/A'}</td>
            <td className="p-4">{submission.fatherName || 'N/A'}</td>
            <td className="p-4">{submission.clientId || 'N/A'}</td>
            <td className="p-4">{submission.email || 'N/A'}</td>
            <td className="p-4">{submission.dob || 'N/A'}</td>
            <td className="p-4">{submission.pan || 'N/A'}</td>
            <td className="p-4">{submission.aadhaar || 'N/A'}</td>
            <td className="p-4 max-w-xs truncate">{submission.address || 'N/A'}</td>
            <td className="p-4">
              {submission.panDataUrl ? (
                <a href={submission.panDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a>
              ) : 'N/A'}
            </td>
            <td className="p-4">
              {submission.aadhaarDataUrl ? (
                <a href={submission.aadhaarDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a>
              ) : 'N/A'}
            </td>
            <td className="p-4">
              {submission.signatureDataUrl ? (
                <a href={submission.signatureDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a>
              ) : 'N/A'}
            </td>
            <td className="p-4">
              {submission.timestamp ? new Date(submission.timestamp).toLocaleString('en-IN') : 'N/A'}
            </td>
            <td className="p-4">
              <motion.button
                onClick={() => handleDelete(submission.id)}
                className="text-red-500 hover:text-red-700"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={`Delete submission for ${submission.clientName || 'N/A'}`}
              >
                <FiTrash2 size={16} />
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

ConsentSubmissionTable.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      clientName: PropTypes.string,
      fatherName: PropTypes.string,
      clientId: PropTypes.string,
      email: PropTypes.string,
      dob: PropTypes.string,
      pan: PropTypes.string,
      aadhaar: PropTypes.string,
      address: PropTypes.string,
      panDataUrl: PropTypes.string,
      aadhaarDataUrl: PropTypes.string,
      signatureDataUrl: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

// Complaint table component with edit functionality
const ComplaintTable = ({ tableData, setTableData, handleEditTableRow, handleDeleteTableRow }) => {
  // Ensure tableData is an array, fallback to empty array if not
  const dataToMap = Array.isArray(tableData) ? tableData : Object.values(tableData || {});
  
  return (
    <motion.div
      className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto mb-8"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      data-aos="fade-up"
    >
      <table className="w-full text-white">
        <thead className="bg-gray-700/50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold">Sr. No.</th>
            <th className="p-4 text-left text-sm font-semibold">Received from</th>
            <th className="p-4 text-left text-sm font-semibold">Pending at the end of last month</th>
            <th className="p-4 text-left text-sm font-semibold">Received</th>
            <th className="p-4 text-left text-sm font-semibold">Resolved</th>
            <th className="p-4 text-left text-sm font-semibold">Pending</th>
            <th className="p-4 text-left text-sm font-semibold">Pending Complaints 3 Months</th>
            <th className="p-4 text-left text-sm font-semibold">Average Resolution time (in days)</th>
            <th className="p-4 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataToMap.map((row) => (
            <motion.tr
              key={row.srNo}
              className="border-b border-gray-200/20 hover:bg-gray-700/20 transition-colors duration-200"
              variants={rowVariants}
              data-aos="fade-up"
            >
              <td className="p-4">{row.srNo}</td>
              <td className="p-4">{row.source || 'N/A'}</td>
              <td className="p-4">{row.pendingLastMonth || 0}</td>
              <td className="p-4">{row.received || 0}</td>
              <td className="p-4">{row.resolved || 0}</td>
              <td className="p-4">{row.pending || 0}</td>
              <td className="p-4">{row.pending3Months || 0}</td>
              <td className="p-4">{row.avgResolutionTime || 0}</td>
              <td className="p-4 flex gap-2">
                <motion.button
                  onClick={() => handleEditTableRow(row)}
                  className="text-blue-500 hover:text-blue-700"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label={`Edit row ${row.srNo}`}
                >
                  <FiEdit size={16} />
                </motion.button>
                {row.srNo !== 'Grand Total' && (
                  <motion.button
                    onClick={() => handleDeleteTableRow(row.srNo)}
                    className="text-red-500 hover:text-red-700"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`Delete row ${row.srNo}`}
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

ComplaintTable.propTypes = {
  tableData: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        srNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        source: PropTypes.string,
        pendingLastMonth: PropTypes.number,
        received: PropTypes.number,
        resolved: PropTypes.number,
        pending: PropTypes.number,
        pending3Months: PropTypes.number,
        avgResolutionTime: PropTypes.number,
      })
    ),
    PropTypes.object,
  ]).isRequired,
  setTableData: PropTypes.func.isRequired,
  handleEditTableRow: PropTypes.func.isRequired,
  handleDeleteTableRow: PropTypes.func.isRequired,
};

// Edit modal component
const EditModal = ({ isOpen, onClose, rowData, onSave }) => {
  const [editedRow, setEditedRow] = useState(rowData || {});

  useEffect(() => {
    setEditedRow(rowData || {});
  }, [rowData]);

  const handleSave = () => {
    if (!editedRow.srNo) {
      toast.error('Invalid row data. Please try again.', { position: 'top-center' });
      return;
    }
    onSave(editedRow);
    onClose();
  };

  if (!isOpen) return null;

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
              Edit Row {rowData?.srNo || 'Unknown'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editedRow.source || ''}
                onChange={(e) => setEditedRow({ ...editedRow, source: e.target.value })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Received from"
                disabled={rowData?.srNo === 'Grand Total'}
              />
              <input
                type="number"
                value={editedRow.pendingLastMonth || 0}
                onChange={(e) => setEditedRow({ ...editedRow, pendingLastMonth: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Pending last month"
              />
              <input
                type="number"
                value={editedRow.received || 0}
                onChange={(e) => setEditedRow({ ...editedRow, received: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Received"
              />
              <input
                type="number"
                value={editedRow.resolved || 0}
                onChange={(e) => setEditedRow({ ...editedRow, resolved: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Resolved"
              />
              <input
                type="number"
                value={editedRow.pending || 0}
                onChange={(e) => setEditedRow({ ...editedRow, pending: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Pending"
              />
              <input
                type="number"
                value={editedRow.pending3Months || 0}
                onChange={(e) => setEditedRow({ ...editedRow, pending3Months: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Pending > 3 Months"
              />
              <input
                type="number"
                value={editedRow.avgResolutionTime || 0}
                onChange={(e) => setEditedRow({ ...editedRow, avgResolutionTime: Number(e.target.value) || 0 })}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Avg Resolution Time"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <motion.button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rowData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

// Report upload card component
const ReportUploadCard = ({
  day,
  newReport,
  setNewReport,
  handleUploadReport,
  uploading,
  passwords,
  reports,
  handleDeleteReport,
  handlePreviewReport,
}) => (
  <motion.div
    className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200/10 hover:shadow-2xl transition-all duration-300"
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    data-aos="fade-up"
  >
    <h4 className="text-lg font-medium text-white mb-3">{day}</h4>
    <div className="mb-4 space-y-3">
      <input
        type="text"
        placeholder="Report Title"
        className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-300"
        value={newReport.day === day ? newReport.title : ''}
        onChange={(e) => setNewReport({ ...newReport, title: e.target.value, day })}
        aria-label={`Report title for ${day}`}
      />
      <textarea
        placeholder="Report Description"
        className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-300"
        rows="3"
        value={newReport.day === day ? newReport.description : ''}
        onChange={(e) => setNewReport({ ...newReport, description: e.target.value, day })}
        aria-label={`Report description for ${day}`}
      />
      <select
        className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-300"
        value={newReport.day === day ? newReport.category : 'Market'}
        onChange={(e) => setNewReport({ ...newReport, category: e.target.value, day })}
        aria-label={`Report category for ${day}`}
      >
        {REPORT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat} className="bg-gray-800">
            {cat}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept=".pdf"
        className="w-full p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-indigo-600 file:text-white file:border-0 file:hover:bg-indigo-700"
        onChange={(e) => setNewReport({ ...newReport, file: e.target.files[0], day })}
        aria-label={`Upload report file for ${day}`}
      />
      <motion.button
        onClick={() => handleUploadReport(day)}
        disabled={uploading[day]}
        className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Upload report for ${day}`}
      >
        <FiUpload /> {uploading[day] ? 'Uploading...' : 'Upload'}
      </motion.button>
      {passwords[day] && (
        <p className="mt-2 text-sm text-gray-300">
          Password for {day}'s report: <strong>{passwords[day]}</strong>
        </p>
      )}
    </div>
    <div>
      <h5 className="text-sm font-medium text-gray-300 mb-2">Uploaded Reports</h5>
      {reports[day]?.length > 0 ? (
        <ul className="space-y-2">
          {reports[day].map((report) => (
            <motion.li
              key={report.id}
              className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg hover:bg-gray-600/20 transition-colors duration-200"
              variants={itemVariants}
            >
              <div>
                <p className="text-sm text-white font-medium">{report.title}</p>
                <p className="text-xs text-gray-400">{report.category}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handlePreviewReport(report)}
                  className="text-indigo-500 hover:text-indigo-700"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label={`Preview report ${report.title}`}
                >
                  <FiEye size={16} />
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteReport(report.id)}
                  className="text-red-500 hover:text-red-700"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label={`Delete report ${report.title}`}
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No reports uploaded.</p>
      )}
    </div>
  </motion.div>
);

ReportUploadCard.propTypes = {
  day: PropTypes.string.isRequired,
  newReport: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    file: PropTypes.any,
    day: PropTypes.string,
  }).isRequired,
  setNewReport: PropTypes.func.isRequired,
  handleUploadReport: PropTypes.func.isRequired,
  uploading: PropTypes.object.isRequired,
  passwords: PropTypes.object.isRequired,
  reports: PropTypes.object.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
  handlePreviewReport: PropTypes.func.isRequired,
};

// Pagination component
const Pagination = ({ totalPages, currentPage, paginate }) => (
  <div className="mt-6 flex justify-center gap-2">
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
  </div>
);

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

/**
 * Main ContactData component
 * @returns {JSX.Element} Admin panel UI
 */
function ContactData() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [reports, setReports] = useState({});
  const [tableData, setTableData] = useState([
    { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
  ]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'Market',
    file: null,
    day: 'Monday',
  });
  const [uploading, setUploading] = useState({});
  const [passwords, setPasswords] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [consentSubmissions, setConsentSubmissions] = useState([]);
  const [loadingConsent, setLoadingConsent] = useState(true);
  const [errorConsent, setErrorConsent] = useState(null);

  // Check authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem('isAuthenticated');
        navigate('/user-login');
        toast.error('Please log in to access this page.', { position: 'top-center' });
      } else {
        localStorage.setItem('isAuthenticated', 'true');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch submissions, reports, and table data
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setIsLoading(true);

    // Fetch contact submissions
    const submissionsRef = ref(db, 'homeFormSubmissions');
    const unsubscribeSubmissions = onValue(
      submissionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const submissionList = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) =>
              sortOrder === 'desc'
                ? b.timestamp - a.timestamp
                : a.timestamp - b.timestamp
            );
          setSubmissions(submissionList);
          setFilteredSubmissions(submissionList);
          toast.success('Submissions loaded successfully.', {
            position: 'top-center',
            autoClose: 2000,
          });
        } else {
          setSubmissions([]);
          setFilteredSubmissions([]);
          toast.info('No submissions found.', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
      },
      (error) => {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions: ' + error.message);
        toast.error('Failed to load submissions: ' + error.message, { position: 'top-center' });
      }
    );

    // Fetch reports
    const reportsRef = ref(db, 'reports');
    const unsubscribeReports = onValue(
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
      },
      (error) => {
        console.error('Error fetching reports:', error);
        setError('Failed to load reports: ' + error.message);
        toast.error('Failed to load reports: ' + error.message, { position: 'top-center' });
      }
    );

    // Fetch complaint table data
    const tableRef = ref(db, 'complaintTableData/data');
    const unsubscribeTable = onValue(
      tableRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert object to array if data is an object
          const dataArray = Array.isArray(data) ? data : Object.values(data);
          setTableData(dataArray);
          toast.success('Complaint table data loaded successfully.', {
            position: 'top-center',
            autoClose: 2000,
          });
        } else {
          setTableData([
            { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
            { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          ]);
          toast.info('No complaint table data found, using default values.', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching complaint table data:', error);
        setTableData([
          { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
        ]);
        setError('Failed to load complaint table data: ' + error.message + ' (Check Firebase rules or authentication)');
        toast.error('Failed to load complaint table data: ' + error.message, { position: 'top-center' });
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribeSubmissions();
      unsubscribeReports();
      unsubscribeTable();
    };
  }, [sortOrder]);

  // Fetch Client Service Consent submissions
  useEffect(() => {
    const consentRef = ref(db, 'clientServiceConsentForms');
    const unsubscribeConsent = onValue(
      consentRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const consentList = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by date desc
          setConsentSubmissions(consentList);
        } else {
          setConsentSubmissions([]);
        }
        setLoadingConsent(false);
      },
      (error) => {
        console.error('Error fetching consent submissions:', error);
        setErrorConsent('Failed to load consent submissions: ' + error.message);
        setLoadingConsent(false);
      }
    );
    return () => unsubscribeConsent();
  }, []);

  // Handle search
  const handleSearch = useCallback(() => {
    const filteredSubs = submissions.filter(
      (submission) =>
        (submission.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (submission.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (submission.interest?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );
    setFilteredSubmissions(filteredSubs);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, submissions]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    auth.signOut();
    navigate('/user-login');
    toast.success('Logged out successfully.', { position: 'top-center' });
  };

  // Delete submission with confirmation
  const handleDeleteSubmission = (id) => {
    setModalAction(() => async () => {
      try {
        await remove(ref(db, `homeFormSubmissions/${id}`));
        toast.success('Submission deleted successfully.', { position: 'top-center' });
      } catch (error) {
        console.error('Error deleting submission:', error);
        toast.error('Failed to delete submission: ' + error.message, { position: 'top-center' });
      }
      setIsModalOpen(false);
    });
    setModalData({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this submission? This action cannot be undone.',
    });
    setIsModalOpen(true);
  };

  // Delete report with confirmation
  const handleDeleteReport = (id) => {
    setModalAction(() => async () => {
      try {
        await remove(ref(db, `reports/${id}`));
        toast.success('Report deleted successfully.', { position: 'top-center' });
      } catch (error) {
        console.error('Error deleting report:', error);
        toast.error('Failed to delete report: ' + error.message, { position: 'top-center' });
      }
      setIsModalOpen(false);
    });
    setModalData({
      title: 'Confirm Report Deletion',
      message: 'Are you sure you want to delete this report? This action cannot be undone.',
    });
    setIsModalOpen(true);
  };

  // Delete consent submission with confirmation
  const handleDeleteConsentSubmission = (id) => {
    setModalAction(() => async () => {
      try {
        await remove(ref(db, `clientServiceConsentForms/${id}`));
        toast.success('Consent submission deleted successfully.', { position: 'top-center' });
      } catch (error) {
        console.error('Error deleting consent submission:', error);
        toast.error('Failed to delete consent submission: ' + error.message, { position: 'top-center' });
      }
      setIsModalOpen(false);
    });
    setModalData({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this consent submission? This action cannot be undone.',
    });
    setIsModalOpen(true);
  };

  // Preview report
  const handlePreviewReport = (report) => {
    setSelectedReport(report || {});
    setIsPreviewOpen(true);
  };

  // Generate 4-digit password
  const generateRandomPassword = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle report upload
  const handleUploadReport = async (day) => {
    if (!newReport.file) {
      toast.error('Please select a file.', { position: 'top-center' });
      return;
    }

    if (!auth.currentUser) {
      toast.error('You must be logged in to upload reports.', { position: 'top-center' });
      navigate('/user-login');
      return;
    }

    if (newReport.file.size > 15 * 1024 * 1024) {
      toast.error('File size exceeds 15MB limit.', { position: 'top-center' });
      return;
    }

    setUploading((prev) => ({ ...prev, [day]: true }));
    try {
      const base64File = await fileToBase64(newReport.file);
      const password = generateRandomPassword();

      const reportData = {
        title: newReport.title || 'Untitled Report',
        description: newReport.description || 'No description',
        category: newReport.category,
        size: `${(newReport.file.size / (1024 * 1024)).toFixed(2)}MB`,
        file: base64File,
        filename: newReport.file.name,
        timestamp: Date.now(),
        day,
        password,
      };

      await push(ref(db, 'reports'), reportData);
      setPasswords((prev) => ({ ...prev, [day]: password }));
      toast.success(
        `Report uploaded for ${day} successfully. Password: ${password}`,
        { position: 'top-center', autoClose: 5000 }
      );
      setNewReport({ title: '', description: '', category: 'Market', file: null, day: 'Monday' });
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error(`Failed to upload report: ${error.message}`, { position: 'top-center' });
    } finally {
      setUploading((prev) => ({ ...prev, [day]: false }));
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const csvData = filteredSubmissions.map((submission) => ({
        Name: submission.name || 'N/A',
        Email: submission.email || 'N/A',
        Phone: submission.phone || 'N/A',
        Interest: submission.interest || 'N/A',
        Message: submission.message || 'N/A',
        Timestamp: submission.timestamp
          ? new Date(submission.timestamp).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          : 'N/A',
      }));

      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'contact_submissions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Submissions exported to CSV.', { position: 'top-center' });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV: ' + error.message, { position: 'top-center' });
    }
  };

  // Handle edit table row
  const handleEditTableRow = (row) => {
    if (!row || typeof row !== 'object' || !row.srNo) {
      console.error('Invalid row data passed to edit modal:', row);
      toast.error('Invalid row data. Please try again.', { position: 'top-center' });
      return;
    }
    setEditRowData(row);
    setIsEditModalOpen(true);
  };

  // Handle save edited row
  const handleSaveEditedRow = async (editedRow) => {
    try {
      const tableRef = ref(db, 'complaintTableData/data');
      // Convert current tableData to object with srNo as keys
      const updatedDataObject = tableData.reduce((obj, row) => {
        obj[row.srNo] = { ...row }; // Create a copy to avoid mutation
        if (row.srNo === editedRow.srNo) {
          obj[row.srNo] = { ...editedRow }; // Update with edited row
        }
        return obj;
      }, {});
      await update(tableRef, updatedDataObject);
      // Convert back to array for state
      setTableData(Object.values(updatedDataObject));
      toast.success(`Row ${editedRow.srNo} updated successfully.`, { position: 'top-center' });
    } catch (error) {
      console.error('Error updating table row:', error);
      toast.error(`Failed to update row: ${error.message}`, { position: 'top-center' });
    }
  };

  // Handle delete table row
  const handleDeleteTableRow = (srNo) => {
    setModalAction(() => async () => {
      try {
        const tableRef = ref(db, 'complaintTableData/data');
        // Filter out the row to delete and reindex
        const updatedData = tableData.filter((row) => row.srNo !== srNo);
        const updatedDataObject = updatedData.reduce((obj, row, index) => {
          obj[index + 1] = { ...row }; // Reindex starting from 1
          return obj;
        }, {});
        await update(tableRef, updatedDataObject);
        setTableData(updatedData); // Set as array
        toast.success(`Row ${srNo} deleted successfully.`, { position: 'top-center' });
      } catch (error) {
        console.error('Error deleting table row:', error);
        toast.error(`Failed to delete row: ${error.message}`, { position: 'top-center' });
      }
      setIsModalOpen(false);
    });
    setModalData({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this row? This action cannot be undone.',
    });
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="p-4 max-w-6xl mx-auto min-h-screen bg-transparent pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Admin Panel - Contact & Reports
        </h2>
        <motion.button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          data-aos="zoom-in"
          aria-label="Logout"
        >
          Logout
        </motion.button>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Sort and Export Buttons */}
      <div className="mb-6 flex justify-end gap-4">
        <motion.button
          onClick={handleSortToggle}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          data-aos="zoom-in"
          aria-label={`Sort by date ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
        >
          Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
        </motion.button>
        <motion.button
          onClick={handleExportCSV}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          data-aos="zoom-in"
          aria-label="Export to CSV"
        >
          <FiDownload /> Export to CSV
        </motion.button>
      </div>

      {/* Contact Submissions */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <motion.div
          className="bg-red-500/20 rounded-xl p-6 shadow-lg border border-red-500/30 text-center text-white"
          variants={itemVariants}
          data-aos="fade-up"
        >
          {error}
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-white mb-4">Contact Submissions</h3>
          {filteredSubmissions.length === 0 ? (
            <motion.div
              className="bg-gray-800/30 rounded-xl p-6 shadow-lg border border-gray-200/20 text-center text-white"
              variants={itemVariants}
              data-aos="fade-up"
            >
              No submissions to display.
            </motion.div>
          ) : (
            <SubmissionTable
              submissions={currentSubmissions}
              handleDeleteSubmission={handleDeleteSubmission}
              handleSortToggle={handleSortToggle}
              sortOrder={sortOrder}
            />
          )}

          {/* Client Service Consent Submissions */}
          <h3 className="text-2xl font-semibold text-white mb-4 mt-12">Client Service Consent Submissions</h3>
          {loadingConsent ? (
            <LoadingSpinner />
          ) : errorConsent ? (
            <motion.div
              className="bg-red-500/20 rounded-xl p-6 shadow-lg border border-red-500/30 text-center text-white"
              variants={itemVariants}
              data-aos="fade-up"
            >
              {errorConsent}
            </motion.div>
          ) : (
            <>
              {consentSubmissions.length === 0 ? (
                <motion.div
                  className="bg-gray-800/30 rounded-xl p-6 shadow-lg border border-gray-200/20 text-center text-white"
                  variants={itemVariants}
                  data-aos="fade-up"
                >
                  No consent submissions to display.
                </motion.div>
              ) : (
                <ConsentSubmissionTable submissions={consentSubmissions} handleDelete={handleDeleteConsentSubmission} />
              )}
            </>
          )}

          {/* Complaint Table */}
          <h3 className="text-2xl font-semibold text-white mb-4">Complaint Table Data</h3>
          <ComplaintTable
            tableData={tableData}
            setTableData={setTableData}
            handleEditTableRow={handleEditTableRow}
            handleDeleteTableRow={handleDeleteTableRow}
          />

          {/* Reports Section */}
          <h3 className="text-2xl font-semibold text-white mb-4">Upload Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEEK_DAYS.map((day) => (
              <ReportUploadCard
                key={day}
                day={day}
                newReport={newReport}
                setNewReport={setNewReport}
                handleUploadReport={handleUploadReport}
                uploading={uploading}
                passwords={passwords}
                reports={reports}
                handleDeleteReport={handleDeleteReport}
                handlePreviewReport={handlePreviewReport}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          )}
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction}
        title={modalData?.title || ''}
        message={modalData?.message || ''}
      />

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        report={selectedReport}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        rowData={editRowData}
        onSave={handleSaveEditedRow}
      />
    </motion.div>
  );
}

export default ContactData;