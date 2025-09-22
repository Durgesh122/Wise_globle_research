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
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#111' }}>
          Trend Of Annual Disposal Of Complaints
        </h2>
        <div className="rounded-lg overflow-hidden" style={{ background: '#fff', border: '1.5px solid #cbd5e1', color: '#111' }}>
          <div className="overflow-x-auto">
            <table
              className="w-full border-separate border-spacing-0 text-left text-xs sm:text-sm border border-gray-300"
              style={{ background: 'transparent' }}
              aria-label="Annual disposal trend of complaints with carried, received, resolved and pending counts"
            >
              <caption className="sr-only">Annual disposal trend of complaints with carried, received, resolved and pending counts</caption>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300">
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[70px]" style={{ color: '#111' }}>Sr. No.</th>
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[120px]" style={{ color: '#111' }}>Year</th>
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[180px]" style={{ color: '#111' }}>Carried forward from previous year</th>
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Received</th>
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Resolved*</th>
                  <th scope="col" className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]" style={{ color: '#111' }}>Pending#</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map(row => (
                  <tr key={row.srNo} className="transition-colors hover:bg-gray-100 border-b border-gray-300" style={{ backgroundColor: '#fff' }}>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[70px]">{row.srNo}</td>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[120px]">{row.year}</td>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[180px]">{row.carried}</td>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.received}</td>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.resolved}</td>
                    <td className="p-2 sm:p-3 border border-gray-300 text-center min-w-[90px]">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs sm:text-sm" style={{ color: 'var(--text-body)' }}>
          *Inclusive of complaints of previous years resolved in the current year.<br />
          #Inclusive of complaints pending as on the last day of the year. (as on 31st March)
        </p>
      </div>
    </section>
  );
};

export default AnnualDisposalTable;
