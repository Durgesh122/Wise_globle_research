import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaChartLine, FaIndustry, FaGlobe } from 'react-icons/fa';
import { itemVariants, cardVariants } from '../utils/animationVariants';

// Heading and simple insights content
const heading = 'Market Insights';

const insights = [
  { title: 'Market Sentiment', desc: 'A quick snapshot of current market sentiment and key drivers.', icon: FaChartLine, color: 'text-rose-500' },
  { title: 'Top Movers', desc: 'Highlights of the biggest gainers and losers across major indices.', icon: FaReact, color: 'text-blue-500' },
  { title: 'Sector Analysis', desc: 'Deep dive into sector performance and rotation patterns.', icon: FaIndustry, color: 'text-yellow-500' },
  { title: 'Macro Trends', desc: 'Overview of economic indicators influencing markets this week.', icon: FaGlobe, color: 'text-teal-500' },
];

const MarketInsights = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {heading}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              className="bg-white dark:bg-gray-800 custom-box-bg rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100/60 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -6 }}
            >
              <div className="w-full h-36 sm:h-40 rounded-lg mb-4 bg-gradient-to-tr from-blue-50 to-white dark:from-slate-800 dark:to-gray-800 flex items-center justify-center">
                <motion.div
                  className={`dark:opacity-90 ${insight.color}`}
                  initial={{ scale: 0.95, opacity: 0.95 }}
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {(() => {
                    const Icon = insight.icon || FaReact;
                    return <Icon size={48} aria-hidden="true" />;
                  })()}
                </motion.div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{insight.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{insight.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;