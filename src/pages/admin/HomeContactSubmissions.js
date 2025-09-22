import React, { useState, useEffect, useCallback } from 'react';
import { Trans } from '../../i18nShim';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import Papa from 'papaparse';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/admin/LoadingSpinner';
import SearchBar from '../../components/admin/SearchBar';
import Pagination from '../../components/admin/Pagination';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const SubmissionTable = ({ submissions, handleDelete, sortOrder, handleSortToggle }) => (
  <motion.div
    className="table-responsive rounded-xl shadow-lg p-2"
    style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}
    variants={itemVariants}
  >
  <div>
  <table className="min-w-full table-auto text-xs sm:text-sm" style={{ color: 'var(--text-body)' }}>
      <thead className="bg-gray-100 dark:bg-gray-700/30">
        <tr>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Name</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Email</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Phone</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Interest</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Message</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">
            <button onClick={handleSortToggle} className="hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
              Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold text-adaptive">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <motion.tr
            key={submission.id}
            className="border-b hover:bg-opacity-5 transition-colors"
            style={{ borderColor: 'var(--bg-border)' }}
            variants={itemVariants}
          >
            <td className="p-4 break-words">{submission.name || 'N/A'}</td>
            <td className="p-4 break-words">{submission.email || 'N/A'}</td>
            <td className="p-4 break-words">{submission.phone || 'N/A'}</td>
            <td className="p-4 break-words">{submission.interest || 'N/A'}</td>
            <td className="p-4 max-w-[10rem] sm:max-w-xs truncate break-words">{submission.message || 'N/A'}</td>
            <td className="p-4 whitespace-nowrap">{submission.timestamp ? new Date(submission.timestamp).toLocaleString('en-IN') : 'N/A'}</td>
            <td className="p-4">
              <motion.button
                onClick={() => handleDelete(submission.id)}
                className="text-red-600 hover:text-red-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiTrash2 size={16} />
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
  </table>
  </div>
  </motion.div>
);

SubmissionTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleSortToggle: PropTypes.func.isRequired,
};

const HomeContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const submissionsRef = ref(db, 'homePageContactSubmissions');
    const unsubscribe = onValue(
      submissionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const cutoff = Date.now() - 72 * 60 * 60 * 1000; // 72 hours
          const entries = Object.entries(data);
          const toDelete = [];
          const keep = [];
          for (const [key, value] of entries) {
            const ts = value?.timestamp ? (typeof value.timestamp === 'number' ? value.timestamp : new Date(value.timestamp).getTime()) : 0;
            if (ts && ts < cutoff) toDelete.push(key);
            else keep.push({ id: key, ...value });
          }
          if (toDelete.length > 0) {
            toDelete.forEach((id) => remove(ref(db, `homePageContactSubmissions/${id}`)).catch(() => null));
            toast.info(`${toDelete.length} old contact submission(s) auto-deleted`);
          }
          setSubmissions(keep);
        } else {
          setSubmissions([]);
        }
        setIsLoading(false);
      },
      (error) => {
        toast.error('Failed to load submissions: ' + error.message);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSearchAndSort = useCallback(() => {
    let processed = [...submissions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      processed = processed.filter((s) =>
        ['name', 'email', 'phone', 'interest', 'message'].some((k) => String(s[k] || '').toLowerCase().includes(q))
      );
    }
    processed.sort((a, b) => (sortOrder === 'desc' ? (b.timestamp || 0) - (a.timestamp || 0) : (a.timestamp || 0) - (b.timestamp || 0)));
    setFilteredSubmissions(processed);
    setCurrentPage(1);
  }, [searchQuery, submissions, sortOrder]);

  useEffect(() => {
    handleSearchAndSort();
  }, [handleSearchAndSort]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await remove(ref(db, `homePageContactSubmissions/${itemToDelete}`));
        toast.success('Submission deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete submission: ' + error.message);
      }
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredSubmissions.map((s) => ({
      Name: s.name,
      Email: s.email,
      Phone: s.phone,
      Interest: s.interest,
      Message: s.message,
      Timestamp: s.timestamp ? new Date(s.timestamp).toLocaleString('en-IN') : '',
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'home_page_contact_submissions.csv');
    document.body.appendChild(link);
    link.click();
  if (link && link.parentNode) link.parentNode.removeChild(link);
    toast.success('Submissions exported to CSV.');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  return (
    <motion.div className="admin-section" variants={containerVariants} initial="hidden" animate="visible">
  <h2 className="text-3xl font-bold text-adaptive mb-6">
        <Trans i18nKey="pages.admin_HomeContactSubmissions.heading">Home Page Contact Submissions</Trans>
      </h2>
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search home page contacts..."
        />
        <motion.button
          onClick={handleExportCSV}
          className="bg-green-500/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-green-600/90 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
        >
          <FiDownload />
          <Trans i18nKey="pages.admin_HomeContactSubmissions.exportCsv">Export CSV</Trans>
        </motion.button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Desktop/table view for sm+ */}
          <div className="hidden sm:block">
            <SubmissionTable
              submissions={currentSubmissions}
              handleDelete={handleDeleteClick}
              sortOrder={sortOrder}
              handleSortToggle={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            />
          </div>

          {/* Mobile stacked cards for small screens */}
          <div className="sm:hidden space-y-3">
            {currentSubmissions.length === 0 ? (
              <div className="rounded-xl p-4 text-sm text-adaptive" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>No submissions found.</div>
            ) : (
              currentSubmissions.map((s) => (
                <motion.div key={s.id} variants={itemVariants} className="rounded-xl p-4 shadow-sm" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-adaptive">{s.name || 'N/A'}</div>
                    <div className="text-xs text-adaptive">{s.timestamp ? new Date(s.timestamp).toLocaleString('en-IN') : 'N/A'}</div>
                  </div>
                  <div className="text-sm text-adaptive mb-1"><strong>Email:</strong> {s.email || 'N/A'}</div>
                  <div className="text-sm text-adaptive mb-1"><strong>Phone:</strong> {s.phone || 'N/A'}</div>
                  <div className="text-sm text-adaptive mb-2"><strong>Interest:</strong> {s.interest || 'N/A'}</div>
                  <div className="text-sm text-adaptive mb-3"><strong>Message:</strong> {s.message || 'N/A'}</div>
                  <div className="flex justify-end">
                    <motion.button onClick={() => handleDeleteClick(s.id)} className="text-red-600 hover:text-red-500 text-xs flex items-center gap-2" variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <FiTrash2 /> Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} paginate={setCurrentPage} />
          )}
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this submission?"
      />
    </motion.div>
  );
};

export default HomeContactSubmissions;
