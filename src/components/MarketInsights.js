import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaSignal, FaBolt, FaGlobeAmericas } from 'react-icons/fa';
import { itemVariants, cardVariants } from '../utils/animationVariants';

// Heading and richer insights content
const heading = 'Market Insights — Today';

const insights = [
  {
    title: 'Market Sentiment',
    desc: 'Measure bullish vs bearish flows, positioning and short-term risk appetite across major markets.',
    icon: FaSignal,
    color: 'text-rose-400',
  },
  {
    title: 'Top Movers',
    desc: 'Daily leaders and laggards with on-chain and volume context to spot momentum trades.',
    icon: FaBolt,
    color: 'text-amber-400',
  },
  {
    title: 'Sector Watch',
    desc: 'Sector rotation insights and which industries are leading the market this session.',
    icon: FaChartLine,
    color: 'text-violet-400',
  },
  {
    title: 'Macro Trends',
    desc: 'Key macro indicators and events shaping risk — rates, inflation, and central bank cues.',
    icon: FaGlobeAmericas,
    color: 'text-teal-300',
  },
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
          {insights.map((insight) => (
            <motion.article
              key={insight.title}
              className="bg-white/30 dark:bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm border border-white/10 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -6 }}
            >
              <div className="w-full h-36 sm:h-40 rounded-lg mb-4 flex items-center justify-center"
                   style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))' }}>
                <motion.div
                  className={`p-3 rounded-full bg-white/6 ${insight.color}`}
                  initial={{ scale: 0.98, opacity: 0.95 }}
                  animate={{ scale: [0.98, 1.04, 0.98] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {(() => {
                    const Icon = insight.icon || FaChartLine;
                    return <Icon size={44} aria-hidden="true" />;
                  })()}
                </motion.div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{insight.title}</h3>
              <p className="text-sm sm:text-base text-gray-200 dark:text-gray-300">{insight.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;