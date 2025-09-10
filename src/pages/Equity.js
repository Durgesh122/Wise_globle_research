import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Sample data for charts
const equityPerformanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Equity Growth (%)',
      data: [5, 10, 8, 15, 12, 20],
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const allocationData = {
  labels: ['Stocks', 'Bonds', 'ETFs', 'Mutual Funds'],
  datasets: [
    {
      label: 'Allocation',
      data: [40, 30, 20, 10],
      backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

// Animation variants
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

const Equity = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const services = [
    {
      title: 'Equity Investment',
      description: 'Invest in high-growth stocks with our expert guidance.',
      icon: '📈',
    },
    {
      title: 'Management',
      description: 'Customized strategies tailored to your goals.',
      icon: '📊',
    },
    {
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis for informed decisions.',
      icon: '🛡️',
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$99/month',
      features: ['Basic Equity Analysis', 'Monthly Reports', 'Email Support'],
    },
    {
      name: 'Pro',
      price: '$199/month',
      features: [
        'Advanced Equity Analysis',
        'Weekly Reports',
        'Priority Support',
        'Optimization',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: [
        'Custom Solutions',
        'Dedicated Manager',
        'Real-time Analytics',
        'Full Support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is equity investment?',
      answer:
        'Equity investment involves purchasing shares of a company, giving you ownership in that company proportional to the shares you own.',
    },
    {
      question: 'How do I start with your services?',
      answer:
        'Sign up for a plan, complete the onboarding process, and our team will guide you through the investment options.',
    },
    {
      question: 'What are the risks involved?',
      answer:
        'Equity investments carry risks such as market volatility, but our risk assessment tools help mitigate potential losses.',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Helmet>
        <title>Equity Services & Plans — Wise Global Research</title>
        <meta name="description" content="Equity investment services, portfolio construction, and performance analytics for Indian investors. Plans for individual and institutional clients." />
        <link rel="canonical" href="https://wiseglobalresearch.com/equity" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Equity Services - Wise Global Research",
            "url": "https://wiseglobalresearch.com/equity",
            "description": "Equity investment services, portfolio construction and performance analytics."
          }`}
        </script>
      </Helmet>
      {/* Hero Section */}
      <motion.section className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"><Trans i18nKey="pages.Equity.equity-services">Equity Services</Trans></h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"><Trans i18nKey="pages.Equity.discover-our-comprehensive-equity-relate"><Trans i18nKey="pages.Equity.discover-our-comprehensive-equity-relate-1">Discover our comprehensive equity-related services and plans designed to
          maximize your investment potential.</Trans></Trans></p>
        <motion.button
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        ><Trans i18nKey="pages.Equity.get-started">Get Started</Trans></motion.button>
      </motion.section>

      {/* Services Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8"><Trans i18nKey="pages.Equity.our-services">Our Services</Trans></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <span className="text-4xl mb-4 block">{service.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Charts Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8"><Trans i18nKey="pages.Equity.equity-performance">Equity Performance</Trans></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><Trans i18nKey="pages.Equity.growth-over-time">Growth Over Time</Trans></h3>
            <Line
              data={equityPerformanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Equity Growth Trend' },
                },
              }}
            />
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><Trans i18nKey="pages.Equity.allocation">Allocation</Trans></h3>
            <Bar
              data={allocationData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Asset Allocation' },
                },
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8"><Trans i18nKey="pages.Equity.our-plans">Our Plans</Trans></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-indigo-600 mb-4">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              ><Trans i18nKey="pages.Equity.choose-plan">Choose Plan</Trans></motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8"><Trans i18nKey="pages.Equity.frequently-asked-questions">Frequently Asked Questions</Trans></h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
              variants={itemVariants}
            >
              <button
                className="w-full text-left text-lg font-semibold text-gray-900 flex justify-between items-center"
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
                    className="text-gray-600 mt-2"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4"><Trans i18nKey="pages.Equity.ready-to-invest">Ready to Invest?</Trans></h2>
        <p className="text-lg text-gray-600 mb-6"><Trans i18nKey="pages.Equity.join-thousands-of-investors-who-trust-ou"><Trans i18nKey="pages.Equity.join-thousands-of-investors-who-trust-ou-1">Join thousands of investors who trust our equity services.</Trans></Trans></p>
        <motion.button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        ><Trans i18nKey="pages.Equity.start-investing-now">Start Investing Now</Trans></motion.button>
      </motion.section>
    </motion.div>
  );
};

export default Equity;