


import React from 'react';

import ComplaintTable from '../components/ComplaintTable';
import MonthlyDisposalTable from '../components/MonthlyDisposalTable';
import AnnualDisposalTable from '../components/AnnualDisposalTable';


function ContactDataPage() {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ComplaintTable />
      <MonthlyDisposalTable />
      <AnnualDisposalTable />
    </div>
  );
}

export default ContactDataPage;
