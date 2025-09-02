import React from 'react';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminHeader = ({ pageTitle, toggleSidebar }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
      {/* Mobile Sidebar Toggle */}
      <button onClick={toggleSidebar} className="md:hidden text-white text-2xl">
        <FaBars />
      </button>

      {/* Page Title */}
      <motion.h1 
        key={pageTitle} // Re-trigger animation on change
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl sm:text-2xl font-semibold text-gray-200"
      >
        {pageTitle}
      </motion.h1>

      {/* Placeholder for other header items like user avatar, notifications etc */}
      <div className="w-8"></div>
    </header>
  );
};

export default AdminHeader;
