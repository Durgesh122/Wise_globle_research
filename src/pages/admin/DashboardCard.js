import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DashboardCard = ({ icon, title, value, color, to, onClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const Content = (
    <motion.div
      className={`bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-700/50 hover:bg-gray-700/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`p-3 rounded-full bg-${color}-500/20 text-${color}-400 text-3xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );

  return to ? (
    <Link to={to} onClick={onClick} aria-label={title} className="block">
      {Content}
    </Link>
  ) : (
    <div onClick={onClick} role="button" aria-label={title} className="block">
      {Content}
    </div>
  );
};

export default DashboardCard;
