import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('nifty');

  // Detect system color scheme
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handleChange);
    
    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  // Color scheme - using semantic color names that work in both themes
  const colors = {
    primary: isDarkMode ? '#3b82f6' : '#2563eb',
    // Text always white
    textPrimary: '#ffffff',
    textSecondary: '#ffffff',
    bgPrimary: 'transparent',
    bgSecondary: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    gain: '#10b981',
    loss: '#ef4444',
    // Box backgrounds: uniform white at 10% opacity
    cardBg: 'rgba(255, 255, 255, 0.1)',
    mutedBg: 'rgba(255, 255, 255, 0.1)'
  };

  // Updated market data
  const indicesData = {
    nifty: {
      name: "NIFTY 50",
      current: 23465.80,
      change: 185.25,
      percentChange: 0.80,
      high: 23492.15,
      low: 23280.45,
      pe: 23.10,
      pb: 4.05,
      dividendYield: 1.18,
      description: "NIFTY 50 is India's benchmark stock market index representing 50 large-cap stocks across 13 sectors of the Indian economy, covering about 65% of the free float market capitalization.",
      constituents: ["RELIANCE", "HDFCBANK", "ICICIBANK", "INFY", "TCS", "HINDUNILVR", "ITC", "KOTAKBANK", "SBIN", "BHARTIARTL"],
      sectorWeights: ["Financial Services (34.8%)", "IT (14.2%)", "Oil & Gas (12.8%)", "Consumer Goods (10.9%)", "Automobile (7.1%)"],
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN')
    },
    sensex: {
      name: "S&P BSE SENSEX",
      current: 77200.45,
      change: 320.60,
      percentChange: 0.42,
      high: 77285.90,
      low: 76820.15,
      pe: 23.85,
      pb: 3.95,
      dividendYield: 1.12,
  description: "SENSEX is India's oldest stock market index comprising 30 well-established and financially sound companies across key sectors, representing about 45% of the BSE's free float market capitalization.",
  sectorWeights: ["Financial Services (37.8%)", "IT (15.8%)", "Oil & Gas (12.2%)", "Consumer Goods (9.2%)", "Healthcare (6.5%)"],
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN')
    },
    niftyBank: {
  name: "NIFTY BANK",
  current: 50245.60,
      percentChange: 1.38,
      high: 50280.25,
      low: 49520.40,
      pe: 19.45,
      pb: 3.15,
      dividendYield: 1.35,
      description: "NIFTY Bank Index provides investors with a benchmark that captures the capital market performance of Indian bank stocks. The index includes 12 most liquid and large capitalized Indian banking stocks.",
      constituents: ["HDFCBANK", "ICICIBANK", "KOTAKBANK", "AXISBANK", "SBIN", "INDUSINDBK", "PNB", "BANKBARODA", "FEDERALBNK", "IDFCFIRSTB"],
      sectorWeights: ["Private Banks (79.2%)", "Public Sector Banks (20.8%)"],
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN')
    }
  };

  const activeIndex = indicesData[activeTab];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 md:p-8"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-5 mt-5"
          style={{ color: colors.textPrimary }}
        >
          Indian Stock Market Indices
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg"
          style={{ color: colors.textSecondary }}
        >
          Current market performance overview
        </motion.p>
      </div>

      {/* Index Selection Tabs */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex rounded-lg p-1" style={{ backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.7)' : 'rgba(229, 231, 235, 0.7)' }}>
          {Object.keys(indicesData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === key
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              style={{
                backgroundColor: activeTab === key ? colors.primary : 'transparent'
              }}
            >
              {indicesData[key].name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Index Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl p-6 mb-8 shadow-lg backdrop-blur-sm"
        style={{ 
          backgroundColor: colors.cardBg,
          borderColor: colors.border,
          borderWidth: '1px'
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
              {activeIndex.name}
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold mr-3" style={{ color: colors.textPrimary }}>
                {activeIndex.current.toLocaleString('en-IN')}
              </span>
              <span 
                className={`flex items-center text-lg font-medium px-2 py-1 rounded ${
                  activeIndex.change >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}
                style={{ color: activeIndex.change >= 0 ? colors.gain : colors.loss }}
              >
                {activeIndex.change.toLocaleString('en-IN')} ({activeIndex.percentChange}%)
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0" style={{ color: colors.textSecondary }}>
            <span>As of {activeIndex.lastUpdated}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="p-4 rounded-lg backdrop-blur-sm" style={{ backgroundColor: colors.mutedBg }}>
              <div className="mb-2" style={{ color: colors.textSecondary }}>
                <span className="font-medium">Today's Range</span>
              </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>High</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {activeIndex.high.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Low</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {activeIndex.low.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg backdrop-blur-sm" style={{ backgroundColor: colors.mutedBg }}>
            <div className="mb-2" style={{ color: colors.textSecondary }}>
              <span className="font-medium">Valuation Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>P/E Ratio</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {activeIndex.pe}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>P/B Ratio</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {activeIndex.pb}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Dividend Yield</p>
                <p className="font-medium" style={{ color: colors.textPrimary }}>
                  {activeIndex.dividendYield}%
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg backdrop-blur-sm" style={{ backgroundColor: colors.mutedBg }}>
            <div className="mb-2" style={{ color: colors.textSecondary }}>
              <span className="font-medium">Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-sm" style={{ color: colors.textSecondary }}>1D</p>
                <p className={`text-sm font-medium ${activeIndex.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {activeIndex.percentChange}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm" style={{ color: colors.textSecondary }}>1M</p>
                <p className="text-sm font-medium text-green-500">+5.8%</p>
              </div>
              <div className="text-center">
                <p className="text-sm" style={{ color: colors.textSecondary }}>1Y</p>
                <p className="text-sm font-medium text-green-500">+22.4%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Index Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-6 backdrop-blur-sm"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            borderWidth: '1px'
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            About {activeIndex.name}
          </h3>
          <p className="mb-4" style={{ color: colors.textSecondary }}>
            {activeIndex.description}
          </p>
          <div className="mt-6">
            <h4 className="font-bold mb-2" style={{ color: colors.textPrimary }}>Key Characteristics:</h4>
            <ul className="list-disc pl-5 space-y-2" style={{ color: colors.textSecondary }}>
              <li>Market capitalization weighted methodology</li>
              <li>Free float adjusted market capitalization</li>
              <li>Quarterly rebalancing as per SEBI guidelines</li>
              <li>Liquidity screening for constituent selection</li>
              <li>Broad representation of the Indian economy</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl p-6 backdrop-blur-sm"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            borderWidth: '1px'
          }}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>Top Constituent Stocks</h3>
            <div className="flex flex-wrap gap-2">
              {activeIndex.constituents.map((stock, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
                    color: colors.primary
                  }}
                >
                  {stock}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>Sector Allocation</h3>
            <div className="space-y-3">
              {activeIndex.sectorWeights.map((sector, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: colors.textSecondary }}>{sector.split(' (')[0]}</span>
                    <span style={{ color: colors.textSecondary }}>{sector.match(/\((.*?)\)/)[1]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: sector.match(/\((.*?)\)/)[1],
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Regulatory Disclaimer removed as per request */}
    </motion.div>
  );
};

export default Index;