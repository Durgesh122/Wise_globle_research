import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';

// ...existing code...

// ...existing code...

// ...existing code...

const MonthlyDisposalTable = () => {
  const [tableData, setTableData] = useState([]);
// ...existing code...

  useEffect(() => {
    const tableRef = ref(db, 'monthlyDisposalTableData');
    const unsubscribe = onValue(
      tableRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTableData(Array.isArray(data) ? data : Object.values(data));
        } else {
          setTableData([
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
            { srNo: 'Grand Total', month: '', carried: 1, received: 2, resolved: 3, pending: 0 },
          ]);
        }
      },
      (error) => {
        if (error && error.code === 'PERMISSION_DENIED') {
          // Silent fallback for public view
          setTableData([
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
            { srNo: 'Grand Total', month: '', carried: 1, received: 2, resolved: 3, pending: 0 },
          ]);
        } else {
          toast.error('Failed to load monthly disposal data: ' + error.message);
        }
      }
    );
    return () => unsubscribe();
  }, []);

// ...existing code...

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-white mb-4">Trend Of Monthly Disposal Of Complaints</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200/20 custom-scrollbar">
        <table className="w-full border-collapse text-left text-xs sm:text-sm" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(15px)' }}>
          <caption className="sr-only">Monthly disposal trend of complaints with carried, received, resolved and pending counts</caption>
          <thead>
            <tr className="text-white" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Sr. No.</th>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Month</th>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Carried forward from previous month</th>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Received</th>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Resolved*</th>
              <th scope="col" className="p-2 sm:p-3 border border-gray-200/30">Pending#</th>
              {/* Actions column removed */}
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map(row => (
              <tr key={row.srNo} className="transition-colors hover:bg-opacity-25" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.srNo}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.month}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.carried}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.received}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.resolved}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.pending}</td>
                {/* Actions cell removed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs sm:text-sm text-gray-300">
        *Inclusive of complaints of previous months resolved in the current month.<br />
        #Inclusive of complaints pending as on the last day of the month.
      </p>
      {/* EditModal removed from this page as edit is only allowed from AdminPanel */}
    </div>
  );
};

export default MonthlyDisposalTable;
