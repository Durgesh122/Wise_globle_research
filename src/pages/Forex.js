import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Pie } from 'react-chartjs-2';
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
  Filler,
} from 'chart.js';
import { FaBook, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

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

const currencyTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sample Currency Trend (Educational)',
      data: [1.12, 1.15, 1.13, 1.17, 1.16, 1.18],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const tradingVolumeData = {
  labels: ['Example A', 'Example B', 'Example C', 'Example D'],
  datasets: [
    {
      label: 'Volume Distribution (Simulated)',
      data: [5000, 3500, 2000, 1500],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Forex = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const topics = [
    {
      title: 'Currency Education',
      description: 'Learn about the basics of currency systems and macroeconomic connections.',
      icon: <FaBook />,
    },
    {
      title: 'Market Awareness',
      description: 'Understand macro trends, global movements, and currency impacts.',
      icon: <FaChartBar />,
    },
    {
      title: 'Risk Understanding',
      description: 'Become aware of the potential risks involved in currency markets.',
      icon: <FaExclamationTriangle />,
    },
  ];

  const faqs = [
    {
      question: 'Is this content about trading?',
      answer:
        'No. This content is strictly educational and aims to improve financial literacy in alignment with SEBI guidelines. It is not related to trading or investment advice.',
    },
    {
      question: 'Can I get real-time trading signals here?',
      answer:
        'No. We do not provide or support any trading signals, strategies, or accounts. All content is for public knowledge only.',
    },
    {
      question: 'Why discuss currency topics?',
      answer:
        'Currency markets affect global economies. Our aim is to enhance understanding of economic behavior and responsible finance.',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4"><Trans i18nKey="pages.Forex.forex-market-awareness">Forex Market Awareness</Trans></h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto"><Trans i18nKey="pages.Forex.educational-insights-into-global-currenc"><Trans i18nKey="pages.Forex.educational-insights-into-global-currenc-1">Educational insights into global currency behavior, economic influence, and financial systems.</Trans></Trans><br />
          <strong><Trans i18nKey="pages.Forex.we-do-not-support-or-promote-any-kind-of"><Trans i18nKey="pages.Forex.we-do-not-support-or-promote-any-kind-of-1">*We do not support or promote any kind of currency or forex trading.*</Trans></Trans></strong>
        </p>
        <Link to="/contact">
          <motion.button
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ><Trans i18nKey="pages.Forex.learn-more">Learn More</Trans></motion.button>
        </Link>
      </motion.section>

      {/* Educational Topics */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8"><Trans i18nKey="pages.Forex.what-you-can-learn">What You Can Learn</Trans></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/20 p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <motion.div
                className="mb-4 text-4xl text-teal-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Charts Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8"><Trans i18nKey="pages.Forex.sample-market-charts-educational-only"><Trans i18nKey="pages.Forex.sample-market-charts-educational-only-1">Sample Market Charts (Educational Only)</Trans></Trans></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white/20 p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white mb-4"><Trans i18nKey="pages.Forex.currency-trend-sample">Currency Trend Sample</Trans></h3>
            <Line
              data={currencyTrendData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Sample Exchange Rate Trend' },
                },
              }}
            />
          </motion.div>
          <motion.div className="bg-white/20 p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white mb-4"><Trans i18nKey="pages.Forex.simulated-volume-distribution">Simulated Volume Distribution</Trans></h3>
            <Pie
              data={tradingVolumeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Example Volume Share' },
                },
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8"><Trans i18nKey="pages.Forex.frequently-asked-questions">Frequently Asked Questions</Trans></h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-4 rounded-lg shadow-md mb-4"
              variants={itemVariants}
            >
              <button
                className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                {faq.question}
                <span>{activeFaq === index ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-white mt-2"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="text-center" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white mb-4"><Trans i18nKey="pages.Forex.want-to-learn-more">Want to Learn More?</Trans></h2>
        <p className="text-lg text-white mb-6"><Trans i18nKey="pages.Forex.get-in-touch-with-us-for-more-educationa"><Trans i18nKey="pages.Forex.get-in-touch-with-us-for-more-educationa-1">Get in touch with us for more educational resources on finance.</Trans></Trans></p>
        <Link to="/contact">
          <motion.button
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ><Trans i18nKey="pages.Forex.learn-more">Learn More</Trans></motion.button>
        </Link>
      </motion.section>

      {/* Disclaimer */}
      <motion.section className="text-center mt-12" variants={itemVariants}>
        <p className="text-sm text-white/80 max-w-xl mx-auto"><Trans i18nKey="pages.Forex.disclaimer-this-page-is-solely-for-educa"><Trans i18nKey="pages.Forex.disclaimer-this-page-is-solely-for-educa-1">Disclaimer: This page is solely for educational and awareness purposes.</Trans></Trans><br /><Trans i18nKey="pages.Forex.we-do-not-offer-currency-or-forex-tradin"><Trans i18nKey="pages.Forex.we-do-not-offer-currency-or-forex-tradin-1">We do not offer currency or forex trading services, financial advice, or brokerage support.</Trans></Trans><br /><Trans i18nKey="pages.Forex.please-consult-a-sebi-registered-financi"><Trans i18nKey="pages.Forex.please-consult-a-sebi-registered-financi-1">Please consult a SEBI-registered financial advisor before making any financial decisions.</Trans></Trans></p>
      </motion.section>
    </motion.div>
  );
};

export default Forex;
