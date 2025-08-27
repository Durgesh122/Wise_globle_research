import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';

// ...existing code...

// ...existing code...

// ...existing code...

const AnnualDisposalTable = () => {
  const [tableData, setTableData] = useState([]);
// ...existing code...


  useEffect(() => {
    const tableRef = ref(db, 'annualDisposalTableData');
    const unsubscribe = onValue(
      tableRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTableData(Array.isArray(data) ? data : Object.values(data));
        } else {
          setTableData([
            { srNo: 1, year: '2024 - 2025', carried: 0, received: 8, resolved: 7, pending: 1 },
            { srNo: 'Grand Total', year: '', carried: 0, received: 8, resolved: 7, pending: 1 },
          ]);
        }
      },
      (error) => {
        // If permission denied, fall back silently to default data for public viewing
        if (error && error.code === 'PERMISSION_DENIED') {
          setTableData([
            { srNo: 1, year: '2024 - 2025', carried: 0, received: 8, resolved: 7, pending: 1 },
            { srNo: 'Grand Total', year: '', carried: 0, received: 8, resolved: 7, pending: 1 },
          ]);
        } else {
          toast.error('Failed to load annual disposal data: ' + error.message);
        }
      }
    );
    return () => unsubscribe();
  }, []);

// ...existing code...

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-white mb-4">Trend Of Annual Disposal Of Complaints</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200/20 custom-scrollbar">
        <table className="w-full border-collapse text-left text-xs sm:text-sm" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(15px)' }}>
          <thead>
            <tr className="text-white" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <th className="p-2 sm:p-3 border border-gray-200/30">Sr. No.</th>
              <th className="p-2 sm:p-3 border border-gray-200/30">Year</th>
              <th className="p-2 sm:p-3 border border-gray-200/30">Carried forward from previous year</th>
              <th className="p-2 sm:p-3 border border-gray-200/30">Received</th>
              <th className="p-2 sm:p-3 border border-gray-200/30">Resolved*</th>
              <th className="p-2 sm:p-3 border border-gray-200/30">Pending#</th>
              {/* Actions column removed */}
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map(row => (
              <tr key={row.srNo} className="transition-colors hover:bg-opacity-25" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.srNo}</td>
                <td className="p-2 sm:p-3 border border-gray-200/30">{row.year}</td>
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
        *Inclusive of complaints of previous years resolved in the current year.<br />
        #Inclusive of complaints pending as on the last day of the year. (as on 31st March)
      </p>
      {/* EditModal removed from this page as edit is only allowed from AdminPanel */}
    </div>
  );
};

export default AnnualDisposalTable;
