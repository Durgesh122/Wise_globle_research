// src/pages/DailyRecommendation.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaBullseye, FaStopCircle, FaPlus, FaMinus } from 'react-icons/fa';



// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Mock data generator for recommendations based on date
const generateMockRecommendations = () => {
  const today = new Date().toISOString().split('T')[0];
  return [
    {
      id: 1,
      name: 'NIFTY',
      type: 'BUY',
      entry: (23500 + Math.random() * 100).toFixed(2),
      target: (23650 + Math.random() * 100).toFixed(2),
      stopLoss: (23400 + Math.random() * 100).toFixed(2),
      timestamp: `${today} 9:15 AM`,
    },
    {
      id: 2,
      name: 'BANKNIFTY',
      type: 'SELL',
      entry: (50200 + Math.random() * 200).toFixed(2),
      target: (50000 + Math.random() * 200).toFixed(2),
      stopLoss: (50350 + Math.random() * 200).toFixed(2),
      timestamp: `${today} 9:20 AM`,
    },
    {
      id: 3,
      name: 'RELIANCE',
      type: 'BUY',
      entry: (2900 + Math.random() * 50).toFixed(2),
      target: (2950 + Math.random() * 50).toFixed(2),
      stopLoss: (2875 + Math.random() * 50).toFixed(2),
      timestamp: `${today} 9:30 AM`,
    },
    {
      id: 4,
      name: 'GOLD',
      type: 'BUY',
      entry: (72000 + Math.random() * 500).toFixed(2),
      target: (72500 + Math.random() * 500).toFixed(2),
      stopLoss: (71700 + Math.random() * 500).toFixed(2),
      timestamp: `${today} 10:00 AM`,
    },
    {
      id: 5,
      name: 'CRUDEOIL',
      type: 'SELL',
      entry: (6500 + Math.random() * 100).toFixed(2),
      target: (6420 + Math.random() * 100).toFixed(2),
      stopLoss: (6550 + Math.random() * 100).toFixed(2),
      timestamp: `${today} 10:15 AM`,
    },
  ];
};

// Services data
const services = [
  { category: 'Cash', name: 'Smart Cash', count: 4, description: 'Smart Cash offers curated stock picks for intraday and short-term trading.' },
  { category: 'Cash', name: 'Evaluation Stock Cash', count: 7, description: 'Evaluation Stock Cash provides detailed stock analysis for long-term investments.' },
  { category: 'Option', name: 'Smart Options', count: 1, description: 'Smart Options delivers high-probability options trading strategies.' },
  { category: 'Option', name: 'Impulse Option', count: 1, description: 'Impulse Option focuses on aggressive options trading for quick returns.' },
  { category: 'Option', name: 'Smart Future', count: 1, description: 'Smart Future offers futures trading strategies with calculated risks.' },
  { category: 'Option', name: 'Evaluation Stock Option', count: 1, description: 'Evaluation Stock Option combines stock and options for balanced portfolios.' },
  { category: 'Index', name: 'Evaluation Index Options', count: 1, description: 'Evaluation Index Options targets index-based options trading.' },
  { category: 'Index', name: 'Impulse Index Options', count: 1, description: 'Impulse Index Options focuses on high-volatility index trading.' },
  { category: 'Index', name: 'Smart Index Option', count: 1, description: 'Smart Index Option provides stable index options strategies.' },
  { category: 'Specialization', name: 'MCX Supreme', count: 1, description: 'MCX Supreme offers premium commodity trading signals.' },
  { category: 'Specialization', name: 'Galaxy MCX', count: 3, description: 'Galaxy MCX provides diversified commodity trading strategies.' },
  { category: 'Specialization', name: 'Universal Cash', count: 1, description: 'Universal Cash offers flexible cash market trading plans.' },
  { category: 'Specialization', name: 'Infinity Club', count: 1, description: 'Infinity Club provides exclusive trading insights and mentorship.' },
];

const DailyRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  // Force background to solid white and text to black, ignoring theme context
  const background = '#ffffff';
  const textColor = '#000000';

  useEffect(() => {
    // Simulate daily data fetch
    setRecommendations(generateMockRecommendations());
    // Update recommendations daily
    const interval = setInterval(() => {
      setRecommendations(generateMockRecommendations());
    }, 24 * 60 * 60 * 1000); // Every 24 hours
    return () => clearInterval(interval);
  }, []);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <motion.div
      className="container mx-auto py-12 px-4"
  style={{ background, color: textColor, minHeight: '100vh', transition: 'background 0.5s, color 0.5s' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Today's Market Recommendations — Wise Global Research</title>
        <meta name="description" content="Daily market recommendations and trade calls for Nifty, BankNifty, stocks and commodities. Includes entry, target and stop-loss levels." />
        <link rel="canonical" href="https://wiseglobalresearch.com/daily-recommendation" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Today's Market Recommendations",
            "url": "https://wiseglobalresearch.com/daily-recommendation",
            "description": "Daily market recommendations, trade calls, and targets for intraday and positional trades."
          }`}
        </script>
      </Helmet>
      {/* Recommendations Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: textColor }}><Trans i18nKey="pages.DailyRecommendation.today-s-market-recommendations"><Trans i18nKey="pages.DailyRecommendation.today-s-market-recommendations-1">Today's Market Recommendations</Trans></Trans></h1>
        <p className="text-lg" style={{ color: 'var(--text-body, #666)' }}>
          Expert calls for intraday and positional trades. Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        variants={containerVariants}
      >
        {recommendations.map((rec) => (
          <motion.div
            key={rec.id}
            className={`rounded-xl shadow-lg p-6 border-t-4 ${
              rec.type === 'BUY' ? 'border-green-500' : 'border-red-500'
            }`}
            style={{
              background: '#ffffff',
              color: '#000000',
              borderTopColor: rec.type === 'BUY' ? '#22c55e' : '#ef4444',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              transition: 'background 0.5s, color 0.5s',
            }}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold" style={{ color: textColor }}>{rec.name}</h2>
              <span
                className={`px-4 py-1 text-sm font-semibold rounded-full text-white ${
                  rec.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {rec.type}
              </span>
            </div>
            <div className="space-y-3" style={{ color: '#000000' }}>
              <div className="flex items-center">
                {rec.type === 'BUY' ? <FaArrowUp className="mr-3 text-green-500" /> : <FaArrowDown className="mr-3 text-red-500" />}
                <div>
                  <strong><Trans i18nKey="pages.DailyRecommendation.entry-price">Entry Price:</Trans></strong> {rec.entry}
                </div>
              </div>
              <div className="flex items-center">
                <FaBullseye className="mr-3 text-blue-500" />
                <div>
                  <strong><Trans i18nKey="pages.DailyRecommendation.target">Target:</Trans></strong> {rec.target}
                </div>
              </div>
              <div className="flex items-center">
                <FaStopCircle className="mr-3 text-orange-500" />
                <div>
                  <strong><Trans i18nKey="pages.DailyRecommendation.stop-loss">Stop Loss:</Trans></strong> {rec.stopLoss}
                </div>
              </div>
            </div>
            <div className="text-right text-xs mt-4" style={{ color: '#000000' }}>
              {rec.timestamp}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* What We Offer Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: textColor }}><Trans i18nKey="pages.DailyRecommendation.what-we-offer">What We Offer</Trans></h1>
        <p className="text-lg" style={{ color: 'var(--text-body, #666)' }}><Trans i18nKey="pages.DailyRecommendation.great-offer-for-customers"><Trans i18nKey="pages.DailyRecommendation.great-offer-for-customers-1">Great Offer For Customers</Trans></Trans></p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
            style={{
              background: '#ffffff',
              color: '#000000',
              borderTopColor: '#3b82f6',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              transition: 'background 0.5s, color 0.5s',
            }}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: textColor }}>{service.name}</h2>
              <span className="px-3 py-1 text-sm font-semibold rounded-full text-white bg-blue-500">
                {service.count}
              </span>
            </div>
            <p className="mb-4" style={{ color: '#000000' }}>{service.category}</p>
            {expandedService === index && (
              <motion.p
                className="mb-4"
                style={{ color: '#000000' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {service.description}
              </motion.p>
            )}
            <button
              onClick={() => toggleService(index)}
              className="flex items-center text-blue-500 hover:text-blue-700 font-semibold"
            >
              {expandedService === index ? (
                <>
                  <FaMinus className="mr-2" /><Trans i18nKey="pages.DailyRecommendation.hide-details">Hide Details</Trans></>
              ) : (
                <>
                  <FaPlus className="mr-2" /><Trans i18nKey="pages.DailyRecommendation.read-more">Read More</Trans></>
              )}
            </button>
          </motion.div>
        ))}
      </motion.div>

  <motion.div variants={itemVariants} className="text-center mt-12 p-4 rounded-lg" style={{ background: '#fffbe6', color: '#000000' }}>
        <p><strong><Trans i18nKey="pages.DailyRecommendation.disclaimer">Disclaimer:</Trans></strong><Trans i18nKey="pages.DailyRecommendation.investments-in-securities-market-are-sub"><Trans i18nKey="pages.DailyRecommendation.investments-in-securities-market-are-sub-1">Investments in securities market are subject to market risks. Read all the related documents carefully before investing. We are not responsible for any profit or loss that may occur.</Trans></Trans></p>
      </motion.div>
    </motion.div>
  );
};

export default DailyRecommendation;