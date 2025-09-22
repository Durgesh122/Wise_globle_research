import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { itemVariants } from '../utils/animationVariants';

const ComplaintTable = () => {
  // Dynamic heading (month/year) managed by admin in ComplaintManager
  const [headingMonthYear, setHeadingMonthYear] = useState('July 2025');
  const [tableData, setTableData] = useState([
    { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
  ]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [errorTable, setErrorTable] = useState(null);

  useEffect(() => {
    // Listen for heading (month/year) updates from Firebase
    const headingRef = ref(db, 'complaintHeaderMonthYear');
    const unsubHeader = onValue(
      headingRef,
      (snapshot) => {
        const val = snapshot.val();
        if (typeof val === 'string' && val.trim().length > 0) {
          setHeadingMonthYear(val.trim());
        }
      },
      () => {
        // Ignore heading errors silently; keep default
      }
    );

    const tableRef = ref(db, 'complaintTableData');
    const unsubscribe = onValue(
      tableRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Array.isArray(data) ? data : Object.values(data);
          setTableData(dataArray);
        }
        setLoadingTable(false);
      },
      (error) => {
        console.error('Error fetching table data:', error);
        setErrorTable('Failed to load table data. Please try again later.');
        setLoadingTable(false);
      }
    );

    return () => {
      unsubscribe();
      unsubHeader();
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
  <div className="container max-w-3xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8"
          variants={itemVariants}
        >
          {`Complaint Data for ${headingMonthYear}`}
        </motion.h2>
        {loadingTable ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : errorTable ? (
          <div className="bg-red-500/20 rounded-xl p-6 shadow-lg border border-red-500/30 text-center" style={{ color: '#111' }}>
            {errorTable}
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden" style={{ background: '#fff', border: '1.5px solid #cbd5e1', color: '#111' }}>
            <div className="overflow-x-auto">
              <table
                className="w-full border-separate border-spacing-0 text-left text-xs sm:text-sm border border-gray-300"
                style={{ background: 'transparent' }}
                aria-label={`Complaint Data for ${headingMonthYear}`}
              >
                <caption className="sr-only">Monthly complaint receipt and resolution statistics by source</caption>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[70px]" style={{ color: '#111' }}>Sr. No.</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[160px]" style={{ color: '#111' }}>Received from</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[180px]" style={{ color: '#111' }}>Pending at the end of last month</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Received</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Resolved</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Pending</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[170px]" style={{ color: '#111' }}>Pending Complaints 3 Months</th>
                    <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[210px]" style={{ color: '#111' }}>Average Resolution time (in days)^</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(tableData) &&
                    tableData.map((row) => (
                      <tr
                        key={row.srNo}
                        className="transition-colors hover:bg-gray-100 border-b border-gray-300"
                        style={{ backgroundColor: '#fff' }}
                      >
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[70px]">{row.srNo}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[160px]">{row.source}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[180px]">{row.pendingLastMonth || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.received || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.resolved || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.pending || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[170px]">{row.pending3Months || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[210px]">{row.avgResolutionTime || 0}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
  <p className="mt-4 text-xs sm:text-sm" style={{ color: 'var(--text-body)' }}>
          ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
        </p>
      </div>
    </section>
  );
};

export default ComplaintTable;