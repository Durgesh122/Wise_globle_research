import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaExclamationCircle, FaComments, FaBriefcase, FaChartBar } from 'react-icons/fa';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import DashboardCard from './DashboardCard'; // Using the new DashboardCard component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const useDatabaseCount = (path) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dbRef = ref(db, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setCount(Object.keys(snapshot.val()).length);
      } else {
        setCount(0);
      }
    });
    return () => unsubscribe();
  }, [path]);
  return count;
};

const Dashboard = () => {
  const contactCount = useDatabaseCount('contacts');
  // removed popupCount (popups page deleted)
  const complaintCount = useDatabaseCount('complaint-box');
  const chatbotDataCount = useDatabaseCount('chatbot-data');
  const jobCount = useDatabaseCount('jobs');
  const homeContactCount = useDatabaseCount('homePageContactSubmissions');
  const reportsCount = useDatabaseCount('reports');

  const cards = [
    { title: 'Contact Submissions', value: contactCount, icon: <FaEnvelope />, color: 'blue', to: '/admin/contacts' },
  { title: 'Home Page Contacts', value: homeContactCount, icon: <FaEnvelope />, color: 'cyan', to: '/admin/home-contacts' },
  // { title: 'Popup Submissions', value: popupCount, icon: <FaBullhorn />, color: 'purple', to: '/admin/popups' },
    { title: 'Complaint Box', value: complaintCount, icon: <FaExclamationCircle />, color: 'red', to: '/admin/complaint-box' },
  { title: 'Complaint Manager', value: complaintCount, icon: <FaExclamationCircle />, color: 'rose', to: '/admin/complaints' },
  { title: 'Report Manager', value: reportsCount, icon: <FaChartBar />, color: 'emerald', to: '/admin/reports' },
    { title: 'Chatbot Data', value: chatbotDataCount, icon: <FaComments />, color: 'yellow', to: '/admin/chatbot-data' },
    { title: 'Job Postings', value: jobCount, icon: <FaBriefcase />, color: 'indigo', to: '/admin/jobs' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="px-2 sm:px-4 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-adaptive">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Overview of recent activity and quick links.</p>
        </div>
        <div className="admin-cards-grid">
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              color={card.color}
              to={card.to}
            />
          ))}
        </div>
      </div>

      {/* You can add more sections here, for example, charts or recent activity feeds */}
    </motion.div>
  );
};

export default Dashboard;
