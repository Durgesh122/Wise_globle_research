import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';


import { Helmet } from 'react-helmet-async';
function Topbar() {
  return (
    
      <Helmet>
        <title>Topbar - Wise Global Research</title>
        <meta name="description" content="Topbar page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/topbar" />
      </Helmet>
<div className="bg-[#1a252f] text-white text-sm py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <FaPhoneAlt />
          <a href="tel:+918700123456" className="hover:underline">+91 87001 23456</a>
        </div>
        <div className="flex items-center space-x-1">
          <FaEnvelope />
          <a href="mailto:info@wiseglobalresearch.com" className="hover:underline">info@wiseglobalresearch.com</a>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <a href="https://wa.me/918700123456" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default Topbar;
