import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { marketSymbols, generateChartData } from '../utils/chartUtils';
import { itemVariants, cardVariants } from '../utils/animationVariants';
import AnimatedChart from './AnimatedChart';

const MarketOverview = () => {
  // removed react-i18next for this component per request
  // ...existing code...
  const [marketData, setMarketData] = useState(
    marketSymbols.map((symbol) => ({
      ...symbol,
      value: generateChartData(symbol.symbol).values[6]?.toFixed(2) || '0.00',
      change: '+0.00 (0.00%)',
      isUp: true,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const change = Math.random() * 200 - 100;
          const newValue = parseFloat(item.value) + change;
          const percentChange = (change / parseFloat(item.value)) * 100;
          return {
            ...item,
            value: newValue.toFixed(2),
            change: `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${percentChange.toFixed(2)}%)`,
            isUp: change >= 0,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ...existing code...
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Market Overview
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {marketData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-md border-2 border-white/30 hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base sm:text-lg">{item.name}</h3>
                <FaChartLine className={`text-xl sm:text-2xl ${item.isUp ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <div className="mt-4">
                <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
                <p className={`text-xs sm:text-sm ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {marketSymbols.slice(0, 6).map((symbol, index) => (
            <motion.div
              key={index}
              className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/20"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">{symbol.name} Trend</h3>
              <div className="h-48 sm:h-64 w-full">
                <AnimatedChart symbol={symbol.symbol} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;