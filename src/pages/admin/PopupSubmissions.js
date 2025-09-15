import React, { useState, useEffect, useCallback } from 'react';
import { Trans } from '../../i18nShim';
import { db } from '../../firebase';
import { ref, onValue, off, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Pagination from '../../components/admin/Pagination';
import SearchBar from '../../components/admin/SearchBar';

const PopupSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const submissionsRef = ref(db, 'popoForms');
    const listener = onValue(
      submissionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const cutoff = Date.now() - 72 * 60 * 60 * 1000; // 72 hours
          const entries = Object.entries(data);
          const toDelete = [];
          const keep = [];
          for (const [key, value] of entries) {
            const ts = value?.timestamp ? new Date(value.timestamp).getTime() : 0;
            if (ts && ts < cutoff) toDelete.push(key);
            else keep.push({ id: key, ...value });
          }

          // Fire-and-forget deletions of old entries
          if (toDelete.length > 0) {
            toDelete.forEach((id) => remove(ref(db, `popoForms/${id}`)).catch(() => null));
            toast.info(`${toDelete.length} old popup submission(s) auto-deleted`);
          }

          const submissionList = keep.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setSubmissions(submissionList);
        } else {
          setSubmissions([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Firebase read failed: ', error);
        setError('Failed to fetch submissions. Please try again later.');
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      off(submissionsRef, 'value', listener);
    };
  }, []);

  const handleSearchAndSort = useCallback(() => {
    let processedData = [...submissions];

    if (searchQuery) {
      processedData = processedData.filter((s) =>
        Object.values(s).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    processedData.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredSubmissions(processedData);
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
        await remove(ref(db, `popoForms/${itemToDelete}`));
        toast.success('Submission deleted successfully.');
      } catch (error) {
        toast.error(`Failed to delete submission: ${error.message}`);
      }
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      toast.info('No data to export.');
      return;
    }
    const csvData = filteredSubmissions.map((s) => ({
      Timestamp: new Date(s.timestamp).toLocaleString('en-IN'),
      Name: s.name,
      Mobile: s.mobile,
      City: s.city,
      Interest: s.interest,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'popup_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Submissions exported to CSV.');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-sm"
      style={{ background: '#ffffff4d', border: '1px solid rgba(0,0,0,0.06)' }}
    >
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
        <h1 className="text-2xl font-bold text-adaptive"><Trans i18nKey="pages.admin_PopupSubmissions.popup-form-submissions"><Trans i18nKey="pages.admin_PopupSubmissions.popup-form-submissions-1">Popup Form Submissions</Trans></Trans></h1>
        <motion.button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-lg flex items-center gap-2"
          style={{ background: 'linear-gradient(90deg,#2eed1c,#1fbf18)', color: '#000' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDownload />
          <span><Trans i18nKey="pages.admin_PopupSubmissions.export-csv">Export CSV</Trans></span>
        </motion.button>
      </div>
      <div className="mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search submissions..." />
      </div>
      {filteredSubmissions.length === 0 ? (
        <p className="text-gray-600 text-adaptive"><Trans i18nKey="pages.admin_PopupSubmissions.no-submissions-yet"><Trans i18nKey="pages.admin_PopupSubmissions.no-submissions-yet-1">No submissions yet.</Trans></Trans></p>
      ) : (
        <>
          <div className="overflow-x-auto h-scroll custom-scrollbar">
            <table className="min-w-[720px] sm:min-w-full rounded-lg text-xs sm:text-sm text-adaptive">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="hover:text-indigo-600 transition-colors">
                      Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"><Trans i18nKey="pages.admin_PopupSubmissions.name">Name</Trans></th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"><Trans i18nKey="pages.admin_PopupSubmissions.mobile">Mobile</Trans></th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"><Trans i18nKey="pages.admin_PopupSubmissions.city">City</Trans></th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"><Trans i18nKey="pages.admin_PopupSubmissions.actions">Actions</Trans></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-adaptive">{new Date(submission.timestamp).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 break-words text-gray-700 text-adaptive">{submission.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-adaptive">{submission.mobile}</td>
                    <td className="px-6 py-4 break-words text-gray-700 text-adaptive">{submission.city}</td>
                    <td className="px-6 py-4 break-words text-gray-700 text-adaptive">{submission.interest}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <motion.button
                        onClick={() => handleDeleteClick(submission.id)}
                        className="text-red-600 hover:text-red-800"
                        whileHover={{ scale: 1.02 }}
                        aria-label="Delete submission"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredSubmissions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this submission? This action cannot be undone."
      />
    </motion.div>
  );
};

export default PopupSubmissions;