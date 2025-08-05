import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const hoverEffect = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

function Currency() {
  const navigate = useNavigate();
  return (
  <motion.div
    className="py-16 px-6 bg-transparent text-white min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold font-josefin mb-8 text-center text-white"
          variants={fadeIn}
        >
          Currency Market Awareness & Educational Insights
        </motion.h1>

        <motion.p
          className="text-sm md:text-base leading-relaxed text-white text-center mb-12"
          variants={fadeIn}
        >
          At Wise Global Research Services Pvt. Ltd., we are committed to financial literacy and responsible investing. This section is intended solely for educational purposes to increase public understanding of currency markets — we do not engage in, facilitate, or promote any kind of forex or currency trading.
        </motion.p>

        <motion.p
          className="text-sm md:text-base leading-relaxed text-white text-center mb-8"
          variants={fadeIn}
        >
          Disclaimer: Wise Global Research does not offer or support any form of forex or currency trading. The content on this page is for general awareness and informational purposes only, in compliance with SEBI regulations.
        </motion.p>

        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-white"
            variants={fadeIn}
          >
            Our Commitment to Market Education
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-white mb-4" variants={fadeIn}>
            We aim to empower individuals with knowledge about macroeconomic events, global market movements, and regulatory frameworks. Our content is curated for students, investors, and enthusiasts looking to understand how global currencies can influence broader financial markets — without engaging in any trading activities.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-white" variants={fadeIn}>
            Please consult a SEBI-registered financial advisor before making any investment decisions. We do not provide any trading strategies or investment advice related to forex or foreign currency instruments.
          </motion.p>
        </motion.section>

        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-white"
            variants={fadeIn}
          >
            Educational Resources on Currency Markets
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
            <motion.div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white/20 backdrop-blur-[30px]" variants={fadeIn} whileHover={hoverEffect.hover}>
                <h3 className="text-lg font-semibold font-josefin text-white mb-2">
                Impact of Global Events on Currency
              </h3>
                <p className="text-sm text-white">
                Understand how events like geopolitical tensions, elections, and global economic shifts affect currency valuation.
              </p>
            </motion.div>
            <motion.div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white/20 backdrop-blur-[30px]" variants={fadeIn} whileHover={hoverEffect.hover}>
                <h3 className="text-lg font-semibold font-josefin text-white mb-2">
                Interest Rates & Inflation
              </h3>
                <p className="text-sm text-white">
                Explore how central bank policies, inflation rates, and interest rate changes influence national currencies.
              </p>
            </motion.div>
            <motion.div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white/20 backdrop-blur-[30px]" variants={fadeIn} whileHover={hoverEffect.hover}>
                <h3 className="text-lg font-semibold font-josefin text-white mb-2">
                Rupee and Indian Economy
              </h3>
                <p className="text-sm text-white">
                Learn about the factors that influence the Indian Rupee and how it connects with India's macroeconomic outlook.
              </p>
            </motion.div>
            <motion.div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white/20 backdrop-blur-[30px]" variants={fadeIn} whileHover={hoverEffect.hover}>
                <h3 className="text-lg font-semibold font-josefin text-white mb-2">
                Regulatory Landscape
              </h3>
                <p className="text-sm text-white">
                Stay informed about SEBI guidelines and global financial regulations that impact currency awareness and compliance.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2 className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-white" variants={fadeIn}>
            Disclaimer
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-white mb-4" variants={fadeIn}>
            All information provided here is for general educational purposes only. Wise Global Research does not offer trading advice, guaranteed outcomes, or promote speculative activities.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-white" variants={fadeIn}>
            Note: Wise Global Research does not conduct, advise, or promote currency or forex trading. This content is for general education and awareness only.
          </motion.p>
        </motion.section>
        {/* Call to Action Section */}
        <motion.section className="text-center mb-12" variants={fadeIn}>
          <motion.button
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
          >
            Learn More
          </motion.button>
        </motion.section>
       </div>
     </motion.div>
   );
}

export default Currency;
