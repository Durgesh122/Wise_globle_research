import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaBullhorn, FaFileContract, FaExclamationCircle, FaComments, FaBriefcase, FaChartBar } from 'react-icons/fa';
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
  const popupCount = useDatabaseCount('popups');
  const consentCount = useDatabaseCount('consents');
  const complaintCount = useDatabaseCount('complaint-box');
  const chatbotDataCount = useDatabaseCount('chatbot-data');
  const jobCount = useDatabaseCount('jobs');

  const cards = [
    { title: 'Contact Submissions', value: contactCount, icon: <FaEnvelope />, color: 'blue', to: '/admin/contacts' },
  { title: 'Home Page Contacts', value: 0, icon: <FaEnvelope />, color: 'cyan', to: '/admin/home-contacts' },
    { title: 'Popup Submissions', value: popupCount, icon: <FaBullhorn />, color: 'purple', to: '/admin/popups' },
    { title: 'Consent Submissions', value: consentCount, icon: <FaFileContract />, color: 'green', to: '/admin/consents' },
    { title: 'Complaint Box', value: complaintCount, icon: <FaExclamationCircle />, color: 'red', to: '/admin/complaint-box' },
  { title: 'Complaint Manager', value: 0, icon: <FaExclamationCircle />, color: 'rose', to: '/admin/complaints' },
  { title: 'Report Manager', value: 0, icon: <FaChartBar />, color: 'emerald', to: '/admin/reports' },
    { title: 'Chatbot Data', value: chatbotDataCount, icon: <FaComments />, color: 'yellow', to: '/admin/chatbot-data' },
    { title: 'Job Postings', value: jobCount, icon: <FaBriefcase />, color: 'indigo', to: '/admin/jobs' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* You can add more sections here, for example, charts or recent activity feeds */}
    </motion.div>
  );
};

export default Dashboard;
