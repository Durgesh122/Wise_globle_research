import React from 'react';
import '../styles/Recommendation.css';
import { motion } from 'framer-motion';
import { FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Recommendation = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <motion.div
      className="min-h-screen recommendation-bg recommendation-white-text"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-gray-800 to-gray-900 text-center py-20 lg:py-24 recommendation-bg recommendation-white-text"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" variants={itemVariants}>
            Market Research Insights
          </motion.h1>
          <motion.p className="text-lg md:text-xl max-w-3xl mx-auto" variants={itemVariants}>
            Explore our expert-curated market research and analysis. Please read all disclaimers and risk disclosures before considering any insights.
          </motion.p>
        </div>
      </motion.section>

      {/* SEBI Disclaimer Section */}
      <motion.section className="py-12 recommendation-bg recommendation-white-text" variants={itemVariants}>
        <div className="container mx-auto px-4">
          <div className="recommendation-box p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><FiAlertTriangle className="mr-3 text-yellow-400" /> Important Disclaimer</h2>
            <p className="text-md mb-4">
              Wise Global Research is a SEBI Registered Research Analyst (INH000016719). Investment in the securities market is subject to market risks. Read all the related documents carefully before investing. The information provided herein is for educational purposes only and should not be construed as investment advice. We are not responsible for any losses incurred on the basis of these research insights.
            </p>
            <p className="text-md">
              The securities discussed are for illustrative and research purposes only and are not direct recommendations to buy or sell. Past performance is not indicative of future results. Please consult your financial advisor before making any investment decisions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Market Insights Section */}
      <motion.section className="py-20 recommendation-bg recommendation-white-text" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            Market Insights & Highlights
          </motion.h2>
          <motion.div className="recommendation-box p-6 shadow-lg text-lg leading-relaxed" variants={itemVariants}>
            <ul className="list-disc list-inside space-y-4">
              <li>Indian stock markets have shown resilience in the first half of the year, with Nifty and Sensex reaching new highs.</li>
              <li>IT and Pharma sectors have outperformed, while Banking and Auto sectors have seen healthy corrections and renewed buying interest.</li>
              <li>Global cues, including US Fed policy and crude oil prices, continue to influence short-term market sentiment.</li>
              {/* Portfolio-related content removed as per request */}
              <li>Midcap and smallcap stocks have delivered strong returns, but risk management remains crucial for sustainable growth.</li>
              <li>Stay updated with our research for actionable insights and timely updates on market trends.</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Risk Disclosure Section */}
      <motion.section className="py-12 recommendation-bg recommendation-white-text" variants={itemVariants}>
        <div className="container mx-auto px-4">
          <div className="recommendation-box p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><FiInfo className="mr-3 text-blue-400" /> Risk Disclosure</h2>
            <p className="text-md mb-4">
              All investments involve risk, and the past performance of a security, industry, sector, market, or financial product does not guarantee future results or returns. As an investor, you should be aware of the risks associated with any investment and consider them carefully before making any decisions.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>The value of investments can go up as well as down.</li>
              <li>You may not get back the amount you originally invested.</li>
              <li>Changes in exchange rates may have an adverse effect on the value, price or income of an investment.</li>
              <li>Options and futures are complex instruments and are not suitable for all investors.</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section className="py-20 text-center recommendation-bg recommendation-white-text" variants={itemVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            Ready for In-depth Research?
          </motion.h2>
          <motion.p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" variants={itemVariants}>
            Subscribe to our premium research services for comprehensive market analysis and insights.
          </motion.p>
          <motion.button
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            onClick={handleContactClick}
          >
            Explore Premium Research
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Recommendation;