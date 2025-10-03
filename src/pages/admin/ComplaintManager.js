import React, { useState, useEffect } from 'react';
import { Trans } from '../../i18nShim';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';
import PropTypes from 'prop-types';


import LoadingSpinner from '../../components/admin/LoadingSpinner';

// ------- Module-scope helpers to keep useEffect deps stable -------
const toNum = (v) => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

export const computeMonthlyGrandTotal = (rows) => {
  return rows.reduce(
    (acc, r) => {
      acc.carried += toNum(r.carried);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      return acc;
    },
    { carried: 0, received: 0, resolved: 0, pending: 0 }
  );
};

export const computeComplaintGrandTotal = (rows) => {
  const totals = rows.reduce(
    (acc, r) => {
      acc.pendingLastMonth += toNum(r.pendingLastMonth);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      acc.pending3Months += toNum(r.pending3Months);
      const art = Number(r.avgResolutionTime);
      if (!isNaN(art)) {
        acc._avgSum += art;
        acc._avgCount += 1;
      }
      return acc;
    },
    { pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, _avgSum: 0, _avgCount: 0 }
  );
  const avgResolutionTime = totals._avgCount > 0 ? (totals._avgSum / totals._avgCount).toFixed(2) : 0;
  return {
    pendingLastMonth: totals.pendingLastMonth,
    received: totals.received,
    resolved: totals.resolved,
    pending: totals.pending,
    pending3Months: totals.pending3Months,
    avgResolutionTime,
  };
};

// Framer-motion variants used across this component
const buttonVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.98 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

// Annual totals calculation (same shape as monthly)
export const computeAnnualGrandTotal = (rows) => {
  return rows.reduce(
    (acc, r) => {
      acc.carried += toNum(r.carried);
      acc.received += toNum(r.received);
      acc.resolved += toNum(r.resolved);
      acc.pending += toNum(r.pending);
      return acc;
    },
    { carried: 0, received: 0, resolved: 0, pending: 0 }
  );
};

const EditModal = ({ isOpen, onClose, rowData, onSave }) => {
  const [editedRow, setEditedRow] = useState(rowData || {});

  useEffect(() => {
    setEditedRow(rowData || {});
  }, [rowData]);

  const handleSave = () => {
    if (!editedRow.srNo) {
      toast.error('Invalid row data.');
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
            className="p-6 rounded-xl shadow-xl border max-w-md w-full"
            style={{ background: '#ffffff4d', border: '1px solid rgba(0,0,0,0.06)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-adaptive">Edit Row {rowData?.srNo}</h3>
            <div className="space-y-4">
              {Object.keys(editedRow).map(key => (
                key !== 'srNo' && (
                  <div key={key}>
                    <label htmlFor={`edit-${key}`} className="capitalize text-sm text-adaptive/70">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      id={`edit-${key}`}
                      name={`edit-${key}`}
                      type={typeof editedRow[key] === 'number' ? 'number' : 'text'}
                      value={editedRow[key] || ''}
                      onChange={(e) => setEditedRow({ ...editedRow, [key]: e.target.value })}
                      className="w-full p-2 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-body, #0b1220)' }}
                      placeholder={key}
                      disabled={key === 'source' && rowData?.srNo === 'Grand Total'}
                    />
                  </div>
                )
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <motion.button onClick={onClose} className="px-4 py-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.06)' }} variants={buttonVariants} whileHover="hover"><Trans i18nKey="pages.admin_ComplaintManager.cancel">Cancel</Trans></motion.button>
              <motion.button onClick={handleSave} className="px-4 py-2 rounded-lg" style={{ background: 'linear-gradient(90deg,#2eed1c,#1fbf18)', color: '#000' }} variants={buttonVariants} whileHover="hover"><Trans i18nKey="pages.admin_ComplaintManager.save">Save</Trans></motion.button>
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

const ComplaintTable = ({ tableData, handleEdit }) => (
  <motion.div className="table-responsive h-scroll custom-scrollbar rounded-lg shadow" variants={itemVariants} style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>
    <table className="min-w-[920px] sm:min-w-full text-sm text-left" style={{ color: 'var(--text-body)' }}>
      <thead className="text-xs uppercase tracking-wider" style={{ background: 'var(--bg-muted)', color: 'var(--text-body)' }}>
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.sr-no">Sr. No.</Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.received-from">Received from</Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.pending-last-month"><Trans i18nKey="pages.admin_ComplaintManager.pending-last-month-1">Pending last month</Trans></Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.received">Received</Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.resolved">Resolved</Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.pending">Pending</Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.pending-3-months"><Trans i18nKey="pages.admin_ComplaintManager.pending-3-months-1">Pending  3 Months</Trans></Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.avg-resolution-time-days"><Trans i18nKey="pages.admin_ComplaintManager.avg-resolution-time-days-1">Avg. Resolution time (days)</Trans></Trans></th>
          <th className="px-6 py-3 text-left font-semibold text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.actions">Actions</Trans></th>
        </tr>
      </thead>
      <tbody>
        {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map(row => (
          <motion.tr key={row.srNo} style={{ borderBottom: '1px solid var(--bg-border)' }} variants={itemVariants}>
            <td data-label="Sr. No." className="px-6 py-4 text-adaptive">{row.srNo}</td>
            <td data-label="Received from" className="px-6 py-4 text-adaptive">{row.source || 'N/A'}</td>
            <td data-label="Pending last month" className="px-6 py-4 text-adaptive">{row.pendingLastMonth || 0}</td>
            <td data-label="Received" className="px-6 py-4 text-adaptive">{row.received || 0}</td>
            <td data-label="Resolved" className="px-6 py-4 text-adaptive">{row.resolved || 0}</td>
            <td data-label="Pending" className="px-6 py-4 text-adaptive">{row.pending || 0}</td>
            <td data-label="Pending > 3 Months" className="px-6 py-4 text-adaptive">{row.pending3Months || 0}</td>
            <td data-label="Avg. Resolution time (days)" className="px-6 py-4 text-adaptive">{row.avgResolutionTime || 0}</td>
            <td data-label="Actions" className="px-6 py-4">
              {row.srNo !== 'Grand Total' && (
                <motion.button type="button" onClick={() => handleEdit(row)} style={{ color: 'var(--accent)' }} variants={buttonVariants} whileHover="hover" title="Edit row" aria-label={`Edit row ${row.srNo}`}>
                  <FiEdit aria-hidden="true" size={16} />
                </motion.button>
              )}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

ComplaintTable.propTypes = {
  tableData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const ComplaintManager = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

  // Public complaints table heading (e.g., "July 2025")
  const [headerMonthYear, setHeaderMonthYear] = useState('July 2025');
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  // Individual Complaints moved to separate ComplaintBox page

  // Monthly Disposal Table State
  const [monthlyData, setMonthlyData] = useState([]);
  const [isMonthlyEditOpen, setIsMonthlyEditOpen] = useState(false);
  const [monthlyEditRow, setMonthlyEditRow] = useState(null);

  // Annual Disposal Table State
  const [annualData, setAnnualData] = useState([]);
  const [isAnnualEditOpen, setIsAnnualEditOpen] = useState(false);
  const [annualEditRow, setAnnualEditRow] = useState(null);

  // Helpers moved to module scope above to avoid useEffect deps

  useEffect(() => {
    // Complaint Table
    const tableRef = ref(db, 'complaintTableData');
    const unsub1 = onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Array.isArray(data) ? [...data] : Object.values(data);
        const rows = arr.filter((r) => r && r.srNo !== 'Grand Total');
        const totals = computeComplaintGrandTotal(rows);
        const grandRow = { srNo: 'Grand Total', source: '', ...totals };
        setTableData([...rows, grandRow]);
      } else {
        const base = [
          { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
        ];
        const totals = computeComplaintGrandTotal(base);
        setTableData([...base, { srNo: 'Grand Total', source: '', ...totals }]);
      }
      setIsLoading(false);
    }, (error) => {
      toast.error('Failed to load complaint data: ' + error.message);
      setIsLoading(false);
    });

  // Monthly Disposal Table
    const monthlyRef = ref(db, 'monthlyDisposalTableData');
    const unsub2 = onValue(monthlyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Array.isArray(data) ? [...data] : Object.values(data);
        const rows = arr.filter((r) => r && r.srNo !== 'Grand Total');
        const totals = computeMonthlyGrandTotal(rows);
        const grandRow = { srNo: 'Grand Total', month: '', ...totals };
        setMonthlyData([...rows, grandRow]);
      } else {
        const seed = [
          { srNo: 1, month: 'April, 2025', carried: 1, received: 0, resolved: 1, pending: 0 },
          { srNo: 2, month: 'May, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 3, month: 'June, 2025', carried: 0, received: 2, resolved: 2, pending: 0 },
          { srNo: 4, month: 'July, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 5, month: 'Aug, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 6, month: 'Sep, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 7, month: 'Oct, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 8, month: 'Nov, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 9, month: 'Dec, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 10, month: 'Jan, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 11, month: 'Feb, 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
          { srNo: 12, month: 'March, 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
        ];
        const totals = computeMonthlyGrandTotal(seed);
        setMonthlyData([...seed, { srNo: 'Grand Total', month: '', ...totals }]);
      }
    }, (error) => {
      toast.error('Failed to load monthly disposal data: ' + error.message);
    });

  // Annual Disposal Table
    const annualRef = ref(db, 'annualDisposalTableData');
    const unsub3 = onValue(annualRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Array.isArray(data) ? [...data] : Object.values(data);
        const rows = arr.filter((r) => r && r.srNo !== 'Grand Total');
        const totals = computeAnnualGrandTotal(rows);
        const grandRow = { srNo: 'Grand Total', year: '', ...totals };
        setAnnualData([...rows, grandRow]);
      } else {
        const base = [
          { srNo: 1, year: '2024 - 2025', carried: 0, received: 8, resolved: 7, pending: 1 },
        ];
        const totals = computeAnnualGrandTotal(base);
        setAnnualData([...base, { srNo: 'Grand Total', year: '', ...totals }]);
      }
    }, (error) => {
      toast.error('Failed to load annual disposal data: ' + error.message);
    });

    // Public complaints heading (month/year)
    const headerRef = ref(db, 'complaintHeaderMonthYear');
    const unsub4 = onValue(headerRef, (snapshot) => {
      const val = snapshot.val();
      if (typeof val === 'string' && val.trim().length > 0) {
        setHeaderMonthYear(val.trim());
      }
    });

  return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
  }, []);

  const handleEdit = (row) => {
    setEditRowData(row);
    setIsEditModalOpen(true);
  };

  const handleSave = async (editedRow) => {
    try {
      const working = (Array.isArray(tableData) ? tableData : Object.values(tableData || {}))
        .filter(r => r.srNo !== 'Grand Total')
        .map(r => (r.srNo === editedRow.srNo ? editedRow : r));
      const totals = computeComplaintGrandTotal(working);
      const finalData = [...working, { srNo: 'Grand Total', source: '', ...totals }];
      await set(ref(db, 'complaintTableData'), finalData);
      setTableData(finalData);
      toast.success('Row updated successfully.');
    } catch (error) {
      toast.error('Failed to update row: ' + error.message);
    }
    setIsEditModalOpen(false);
  };



  // Monthly Disposal Table (admin)
  const handleMonthlyEdit = (row) => {
    setMonthlyEditRow(row);
    setIsMonthlyEditOpen(true);
  };
  const handleMonthlySave = async (editedRow) => {
    try {
      // replace edited row in working set excluding Grand Total
      const working = (Array.isArray(monthlyData) ? monthlyData : Object.values(monthlyData || {}))
        .filter(r => r.srNo !== 'Grand Total')
        .map(r => (r.srNo === editedRow.srNo ? editedRow : r));
      // compute new grand total
      const totals = computeMonthlyGrandTotal(working);
      const finalData = [...working, { srNo: 'Grand Total', month: '', ...totals }];
      await set(ref(db, 'monthlyDisposalTableData'), finalData);
      setMonthlyData(finalData);
      toast.success('Monthly row updated successfully.');
    } catch (error) {
      toast.error('Failed to update monthly row: ' + error.message);
    }
    setIsMonthlyEditOpen(false);
  };

  // Annual Disposal Table (admin)
  const handleAnnualEdit = (row) => {
    setAnnualEditRow(row);
    setIsAnnualEditOpen(true);
  };
  const handleAnnualSave = async (editedRow) => {
    try {
      const working = (Array.isArray(annualData) ? annualData : Object.values(annualData || {}))
        .filter(r => r.srNo !== 'Grand Total')
        .map(r => (r.srNo === editedRow.srNo ? editedRow : r));
      const totals = computeAnnualGrandTotal(working);
      const finalData = [...working, { srNo: 'Grand Total', year: '', ...totals }];
      await set(ref(db, 'annualDisposalTableData'), finalData);
      setAnnualData(finalData);
      toast.success('Annual row updated successfully.');
    } catch (error) {
      toast.error('Failed to update annual row: ' + error.message);
    }
    setIsAnnualEditOpen(false);
  };

  // Save public complaints heading (month/year)
  const handleSaveHeader = async () => {
    try {
      const value = (headerMonthYear || '').trim();
      if (!value) {
        toast.error('Please enter a month and year, e.g., "July 2025".');
        return;
      }
      setIsSavingHeader(true);
      await set(ref(db, 'complaintHeaderMonthYear'), value);
      toast.success('Heading updated successfully.');
    } catch (error) {
      toast.error('Failed to update heading: ' + error.message);
    } finally {
      setIsSavingHeader(false);
    }
  };

  return (
    <motion.div className="admin-section" variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-3xl font-bold text-adaptive mb-6"><Trans i18nKey="pages.admin_ComplaintManager.complaint-manager"><Trans i18nKey="pages.admin_ComplaintManager.complaint-manager-1">Complaint Manager</Trans></Trans></h2>
  {/* Complaint submissions moved to Complaint Box page */}
      {isLoading ? <LoadingSpinner /> : (
        <>
          {/* Public heading controller for ComplaintTable */}
          <motion.div className="mb-6 rounded-lg p-4" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }} variants={itemVariants}>
            <h3 className="text-lg font-semibold text-adaptive mb-3">Public Complaints Heading</h3>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label htmlFor="headerMonthYear" className="text-sm text-adaptive min-w-[180px]">Month & Year (e.g., July 2025)</label>
              <input
                id="headerMonthYear"
                type="text"
                value={headerMonthYear}
                onChange={(e) => setHeaderMonthYear(e.target.value)}
                className="w-full sm:max-w-md p-2 rounded-md"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-body)' }}
                placeholder="July 2025"
              />
              <motion.button
                onClick={handleSaveHeader}
                disabled={isSavingHeader}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSavingHeader ? 'Saving…' : 'Save'}
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-adaptive">This updates the heading shown on the public Complaints table.</p>
          </motion.div>

          <ComplaintTable tableData={tableData} handleEdit={handleEdit} />

          {/* Monthly Disposal Table (admin editable) */}
          <div className="my-8">
            <h2 className="text-xl font-bold text-adaptive mb-4"><Trans i18nKey="pages.admin_ComplaintManager.trend-of-monthly-disposal-of-complaints"><Trans i18nKey="pages.admin_ComplaintManager.trend-of-monthly-disposal-of-complaints-1">Trend Of Monthly Disposal Of Complaints</Trans></Trans></h2>
            <div className="table-responsive rounded-lg shadow custom-scrollbar" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>
              <table className="min-w-full text-sm text-left" style={{ color: 'var(--text-body)' }}>
                <thead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                  <tr>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.sr-no">Sr. No.</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.month">Month</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.carried-forward-from-previous-month"><Trans i18nKey="pages.admin_ComplaintManager.carried-forward-from-previous-month-1">Carried forward from previous month</Trans></Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.received">Received</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.resolved-1">Resolved*</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.pending-2">Pending#</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.actions">Actions</Trans></th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(monthlyData) ? monthlyData : Object.values(monthlyData || {})).map(row => (
                    <tr key={row.srNo} style={{ borderBottom: '1px solid var(--bg-border)' }}>
                      <td className="px-6 py-4 text-adaptive">{row.srNo}</td>
                      <td className="px-6 py-4 text-adaptive">{row.month}</td>
                      <td className="px-6 py-4 text-adaptive">{row.carried}</td>
                      <td className="px-6 py-4 text-adaptive">{row.received}</td>
                      <td className="px-6 py-4 text-adaptive">{row.resolved}</td>
                      <td className="px-6 py-4 text-adaptive">{row.pending}</td>
                      <td className="px-6 py-4">
                        {row.srNo !== 'Grand Total' && (
                          <button type="button" onClick={() => handleMonthlyEdit(row)} style={{ color: 'var(--accent)' }} title="Edit row" aria-label={`Edit row ${row.srNo}`}>
                            <FiEdit aria-hidden="true" size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-of-previous-mont"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-of-previous-mont-1">*Inclusive of complaints of previous months resolved in the current month.</Trans></Trans><br /><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-pending-as-on-th"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-pending-as-on-th-2">#Inclusive of complaints pending as on the last day of the month.</Trans></Trans></p>
          </div>
          {/* Annual Disposal Table (admin editable) */}
          <div className="my-8">
            <h2 className="text-xl font-bold text-adaptive mb-4"><Trans i18nKey="pages.admin_ComplaintManager.trend-of-annual-disposal-of-complaints"><Trans i18nKey="pages.admin_ComplaintManager.trend-of-annual-disposal-of-complaints-1">Trend Of Annual Disposal Of Complaints</Trans></Trans></h2>
            <div className="table-responsive rounded-lg shadow custom-scrollbar" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>
              <table className="min-w-full text-sm text-left" style={{ color: 'var(--text-body)' }}>
                <thead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                  <tr>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.sr-no">Sr. No.</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.year">Year</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.carried-forward-from-previous-year"><Trans i18nKey="pages.admin_ComplaintManager.carried-forward-from-previous-year-1">Carried forward from previous year</Trans></Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.received">Received</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.resolved-1">Resolved*</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.pending-2">Pending#</Trans></th>
                    <th className="px-6 py-3"><Trans i18nKey="pages.admin_ComplaintManager.actions">Actions</Trans></th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(annualData) ? annualData : Object.values(annualData || {})).map(row => (
                    <tr key={row.srNo} style={{ borderBottom: '1px solid var(--bg-border)' }}>
                      <td className="px-6 py-4 text-adaptive">{row.srNo}</td>
                      <td className="px-6 py-4 text-adaptive">{row.year}</td>
                      <td className="px-6 py-4 text-adaptive">{row.carried}</td>
                      <td className="px-6 py-4 text-adaptive">{row.received}</td>
                      <td className="px-6 py-4 text-adaptive">{row.resolved}</td>
                      <td className="px-6 py-4 text-adaptive">{row.pending}</td>
                      <td className="px-6 py-4">
                        {row.srNo !== 'Grand Total' && (
                          <button type="button" onClick={() => handleAnnualEdit(row)} style={{ color: 'var(--accent)' }} title="Edit row" aria-label={`Edit row ${row.srNo}`}>
                            <FiEdit aria-hidden="true" size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-adaptive"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-of-previous-year"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-of-previous-year-1">*Inclusive of complaints of previous years resolved in the current year.</Trans></Trans><br /><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-pending-as-on-th-3"><Trans i18nKey="pages.admin_ComplaintManager.inclusive-of-complaints-pending-as-on-th-1">#Inclusive of complaints pending as on the last day of the year. (as on 31st March)</Trans></Trans></p>
          </div>
        </>
      )}
      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} rowData={editRowData} onSave={handleSave} />
      {/* Monthly Edit Modal */}
      <EditModal isOpen={isMonthlyEditOpen} onClose={() => setIsMonthlyEditOpen(false)} rowData={monthlyEditRow} onSave={handleMonthlySave} />
      {/* Annual Edit Modal */}
      <EditModal isOpen={isAnnualEditOpen} onClose={() => setIsAnnualEditOpen(false)} rowData={annualEditRow} onSave={handleAnnualSave} />
    </motion.div>
  );
};

export default ComplaintManager;
