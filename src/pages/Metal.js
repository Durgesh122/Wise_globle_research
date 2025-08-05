import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import GlobalLayout from '../components/GlobalLayout';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaArrowRight, FaCoins, FaChartLine, FaShieldAlt } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Sample data for charts
const metalPriceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Gold Price (₹/10g)',
      data: [65000, 65500, 67000, 66500, 68000, 69000],
      borderColor: '#FBBF24',
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Silver Price (₹/kg)',
      data: [72000, 73000, 72500, 74000, 75000, 76000],
      borderColor: '#D1D5DB',
      backgroundColor: 'rgba(209, 213, 219, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const tradingVolumeData = {
  labels: ['Gold', 'Silver', 'Copper', 'Aluminum'],
  datasets: [
    {
      label: 'Trading Volume (Lots)',
      data: [3000, 2500, 1800, 1200],
      backgroundColor: ['#FBBF24', '#D1D5DB', '#B91C1C', '#6B7280'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Metal = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      title: 'Metal Trading',
      description: 'Trade gold, silver, copper, and more on the MCX with competitive rates.',
      icon: FaCoins,
    },
    {
      title: 'Market Insights',
      description: 'Real-time price updates and technical analysis for metal commodities.',
      icon: FaChartLine,
    },
    {
      title: 'Hedging Solutions',
      description: 'Protect your investments with tailored hedging strategies.',
      icon: FaShieldAlt,
    },
  ];

  const faqs = [
    {
      question: 'What is MCX metal trading?',
      answer:
        'MCX metal trading involves buying and selling metal commodities like gold, silver, copper, and aluminum on the Multi Commodity Exchange of India.',
    },
    {
      question: 'How do I start trading metals?',
      answer:
        'Select a plan, open an MCX trading account, and use our platform to start trading with guided support.',
    },
    {
      question: 'What are the risks in metal trading?',
      answer:
        'Metal trading involves risks like price volatility, but our hedging tools and market insights help manage these risks.',
    },
    {
      question: 'Can I trade metals internationally?',
      answer:
        'Our platform focuses on MCX, but we provide insights and tools for global metal market trends.',
    },
  ];

  return (
    <GlobalLayout>
      <div className="px-4 sm:px-6 lg:px-8">
       {/* Hero Section */}
       <motion.section className="text-center mb-16 mt-12" variants={itemVariants}>
         <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
           MCX Metal Services
         </h1>
         <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto">
           Trade precious and base metals on the Multi Commodity Exchange with our
           expert tools and insights.
         </p>
         <motion.button
           onClick={() => navigate('/contact')}
           className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition flex items-center justify-center mx-auto"
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
         >
           Start Trading <FaArrowRight className="ml-2" />
         </motion.button>
       </motion.section>

       {/* Services Section */}
       <motion.section className="mb-16" variants={itemVariants}>
         <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
           Our Metal Trading Services
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((service, index) => {
             const IconComponent = service.icon;
             return (
               <motion.div
                 key={index}
                 className="bg-white/40 rounded-lg shadow-lg text-center p-6"
                 variants={itemVariants}
                 whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
               >
                 <IconComponent className="text-4xl mb-4 mx-auto text-white" />
                 <h3 className="text-xl font-semibold text-white mb-2">
                   {service.title}
                 </h3>
                 <p className="text-white">{service.description}</p>
               </motion.div>
             );
           })}
         </div>
       </motion.section>

       {/* Charts Section */}
       <motion.section className="mb-16" variants={itemVariants}>
         <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
           Metal Market Insights
         </h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <motion.div
             className="bg-white/20 rounded-lg shadow-lg"
             variants={itemVariants}
           >
             <h3 className="text-xl font-semibold text-white mb-4">
               Gold & Silver Price Trends
             </h3>
             <Line
               data={metalPriceData}
               options={{
                 responsive: true,
                 plugins: {
                   legend: { position: 'top' },
                   title: { display: true, text: 'Gold & Silver Price Trends (₹)' },
                 },
                 scales: {
                   y: {
                     beginAtZero: false,
                     title: { display: true, text: 'Price (₹)' },
                   },
                 },
               }}
             />
           </motion.div>
           <motion.div
             className="bg-white/20 rounded-lg shadow-lg p-6"
             variants={itemVariants}
           >
             <h3 className="text-xl font-semibold text-white mb-4">
               Trading Volume by Metal
             </h3>
             {/* Small fixed-size container for Doughnut chart */}
             <div className="mx-auto" style={{ width: '250px', height: '250px' }}>
               <Doughnut
                 data={tradingVolumeData}
                 options={{
                   responsive: true,
                   maintainAspectRatio: false,
                   plugins: {
                     legend: { position: 'top' },
                     title: { display: true, text: 'Metal Trading Volume (Lots)' },
                   },
                 }}
               />
             </div>
           </motion.div>
         </div>
       </motion.section>

       {/* FAQ Section */}
       <motion.section className="mb-16" variants={itemVariants}>
         <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
           Frequently Asked Questions
         </h2>
         <div className="max-w-3xl mx-auto">
           {faqs.map((faq, index) => (
             <motion.div
               key={index}
               className="bg-white/40 rounded-lg shadow-md mb-4"
               variants={itemVariants}
             >
               <button
                 className="w-full text-left text-lg font-semibold text-white flex justify-between items-center px-4 py-3"
                 onClick={() => setActiveFaq(activeFaq === index ? null : index)}
               >
                 {faq.question}
                 {activeFaq === index ? <FaMinus /> : <FaPlus />}
               </button>
               <AnimatePresence>
                 {activeFaq === index && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="text-white mt-2 px-4 pb-4"
                   >
                     {faq.answer}
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
           ))}
         </div>
       </motion.section>

       {/* Market Snapshot Section */}
       <motion.section className="mb-16" variants={itemVariants}>
         <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
           Market Snapshot
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { metal: 'Gold', price: '₹69,000/10g', change: '+1.2%' },
             { metal: 'Silver', price: '₹76,000/kg', change: '+0.8%' },
             { metal: 'Copper', price: '₹850/kg', change: '-0.5%' },
             { metal: 'Aluminum', price: '₹220/kg', change: '+0.3%' },
           ].map((item, index) => (
             <motion.div
               key={index}
               className="bg-white/40 rounded-lg shadow-md text-center"
               variants={itemVariants}
             >
               <h3 className="text-lg font-semibold text-white">{item.metal}</h3>
               <p className="text-xl font-bold text-amber-600">{item.price}</p>
               <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                 {item.change}
               </p>
             </motion.div>
           ))}
         </div>
       </motion.section>

       {/* CTA Section */}
       <motion.section className="text-center mb-16" variants={itemVariants}>
         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
           Ready to Trade Metals?
         </h2>
         <p className="text-lg text-white mb-6">
           Join our MCX platform and start trading metals with confidence.
         </p>
         <motion.button
           onClick={() => navigate('/contact')}
           className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition flex items-center justify-center mx-auto"
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
         >
           Start Trading Now <FaArrowRight className="ml-2" />
         </motion.button>
       </motion.section>
      </div>
    </GlobalLayout>
  );
};

export default Metal;