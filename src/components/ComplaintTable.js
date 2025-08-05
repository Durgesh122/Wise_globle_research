import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { itemVariants } from '../utils/animationVariants';

const ComplaintTable = () => {
  const [tableData, setTableData] = useState([
    { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
  ]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [errorTable, setErrorTable] = useState(null);

  useEffect(() => {
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

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Complaint Data for July 2025
        </motion.h2>
        {loadingTable ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : errorTable ? (
          <div className="bg-red-500/20 rounded-xl p-6 shadow-lg border border-red-500/30 text-center text-white">
            {errorTable}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200/20 custom-scrollbar">
            <table
              className="w-full border-collapse text-left text-xs sm:text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}
              aria-label="Complaint Data for July 2025"
            >
              <thead>
                <tr className="text-white" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Sr. No.</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Received from</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Pending at the end of last month</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Received</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Resolved</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Pending</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Pending Complaints 3 Months</th>
                  <th className="p-2 sm:p-3 border border-gray-200/30">Average Resolution time (in days)^</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tableData) &&
                  tableData.map((row) => (
                    <tr
                      key={row.srNo}
                      className="transition-colors hover:bg-opacity-25"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.srNo}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.source}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.pendingLastMonth || 0}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.received || 0}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.resolved || 0}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.pending || 0}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.pending3Months || 0}</td>
                      <td className="p-2 sm:p-3 border border-gray-200/30">{row.avgResolutionTime || 0}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-4 text-xs sm:text-sm text-gray-300">
          ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
        </p>
      </div>
    </section>
  );
};

export default ComplaintTable;