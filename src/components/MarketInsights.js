import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, cardVariants } from '../utils/animationVariants';
// Images for each insight (scroll-framed)
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide4 from '../assets/images/slide4.png';
import slide5 from '../assets/images/slide5.png';

// Heading and richer insights content
const heading = 'Market Insights — Today';

const insights = [
  {
    title: 'Market Sentiment',
    desc: 'Measure bullish vs bearish flows, positioning and short-term risk appetite across major markets.',
    img: slide1,
  },
  {
    title: 'Top Movers',
    desc: 'Daily leaders and laggards with on-chain and volume context to spot momentum trades.',
    img: slide2,
  },
  {
    title: 'Sector Watch',
    desc: 'Sector rotation insights and which industries are leading the market this session.',
    img: slide4,
  },
  {
    title: 'Macro Trends',
    desc: 'Key macro indicators and events shaping risk — rates, inflation, and central bank cues.',
    img: slide5,
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
              {/* Scroll-shaped image frame */}
              <div className="relative w-full h-36 sm:h-40 mb-4 select-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-[88%] h-[80%] bg-[#f5efe4] dark:bg-[#efe7d7] border border-amber-200/70 rounded-md shadow-inner overflow-hidden"
                    initial={{ scale: 0.98, opacity: 0.95 }}
                    animate={{ scale: [0.98, 1, 0.98] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img src={insight.img} alt={insight.title} className="w-full h-full object-cover" />
                    {/* Scroll rolls */}
                    <span className="absolute -top-2 left-6 w-12 h-4 bg-[#e9dcc5] border border-amber-200/70 rounded-full shadow-sm" />
                    <span className="absolute -bottom-2 right-6 w-12 h-4 bg-[#e9dcc5] border border-amber-200/70 rounded-full shadow-sm" />
                  </motion.div>
                </div>
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