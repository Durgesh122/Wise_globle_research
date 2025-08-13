import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiBell, FiBarChart2, FiDollarSign, FiPieChart, FiSearch } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

// Main MCX component
const Mcx = () => {
  // State management for various UI components
  const [activeTab, setActiveTab] = useState('dashboard');
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1d');
  const [alerts, setAlerts] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({ commodity: 'Gold', condition: 'above', price: '' });
  // eslint-disable-next-line no-unused-vars
  const [infoView, setInfoView] = useState('supreme'); // Toggle between info sections

  // Mock data fetch for commodities, news, and technicals
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = {
        commodities: [
          { 
            id: 1, 
            name: 'Gold', 
            symbol: 'GOLD24JULFUT', 
            price: 58320, 
            change: 1.25, 
            oi: 12563,
            volume: 8542,
            support: 58000,
            resistance: 58500,
            history: [
              { time: '10:00', price: 58200 },
              { time: '10:15', price: 58250 },
              { time: '10:30', price: 58320 },
            ]
          },
          { 
            id: 2, 
            name: 'Silver', 
            symbol: 'SILVER24JULFUT', 
            price: 75240, 
            change: -0.75, 
            oi: 8452,
            volume: 6215,
            support: 74800,
            resistance: 75500,
            history: [
              { time: '10:00', price: 75100 },
              { time: '10:15', price: 75200 },
              { time: '10:30', price: 75240 },
            ]
          },
          { 
            id: 3, 
            name: 'Crude Oil', 
            symbol: 'CRUDEOIL24JULFUT', 
            price: 5425, 
            change: 2.1, 
            oi: 15632,
            volume: 12458,
            support: 5380,
            resistance: 5450,
            history: [
              { time: '10:00', price: 5400 },
              { time: '10:15', price: 5410 },
              { time: '10:30', price: 5425 },
            ]
          },
          { 
            id: 4, 
            name: 'Copper', 
            symbol: 'COPPER24JULFUT', 
            price: 685.4, 
            change: 0.45, 
            oi: 7451,
            volume: 3256,
            support: 682,
            resistance: 688,
            history: [
              { time: '10:00', price: 684 },
              { time: '10:15', price: 684.8 },
              { time: '10:30', price: 685.4 }
            ]
          },
          { id: 5, name: 'Aluminium', symbol: 'ALUMINIUM24JULFUT', price: 220, change: 0.5, oi: 8000, volume: 4500, support: 218, resistance: 222, history: [ { time: '10:00', price: 219 }, { time: '10:15', price: 219.5 }, { time: '10:30', price: 220 } ] },
          { id: 6, name: 'Zinc', symbol: 'ZINC24JULFUT', price: 230, change: -0.25, oi: 6000, volume: 3500, support: 228, resistance: 232, history: [ { time: '10:00', price: 232 }, { time: '10:15', price: 231 }, { time: '10:30', price: 230 } ] },
          { id: 7, name: 'Lead', symbol: 'LEAD24JULFUT', price: 160, change: 0.75, oi: 4000, volume: 2500, support: 158, resistance: 162, history: [ { time: '10:00', price: 159 }, { time: '10:15', price: 159.5 }, { time: '10:30', price: 160 } ] },
          { id: 8, name: 'Nickel', symbol: 'NICKEL24JULFUT', price: 950, change: -1.1, oi: 3000, volume: 1800, support: 945, resistance: 960, history: [ { time: '10:00', price: 955 }, { time: '10:15', price: 952 }, { time: '10:30', price: 950 } ] },
          { id: 9, name: 'Natural Gas', symbol: 'NATGAS24JULFUT', price: 220, change: 2.0, oi: 7000, volume: 5000, support: 218, resistance: 225, history: [ { time: '10:00', price: 218 }, { time: '10:15', price: 219 }, { time: '10:30', price: 220 } ] }
        ],
        news: [
          { id: 1, title: 'Gold prices hit 3-month high on weak dollar', source: 'Economic Times', timestamp: '2 hours ago', impact: 'high' },
          { id: 2, title: 'Crude oil inventories show unexpected draw', source: 'Reuters', timestamp: '4 hours ago', impact: 'medium' },
          { id: 3, title: 'Industrial metals demand outlook weakens', source: 'Bloomberg', timestamp: '6 hours ago', impact: 'low' }
        ],
        technicals: { gold: 'Strong Buy', silver: 'Neutral', crude: 'Buy', copper: 'Sell' }
      };

      setMarketData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Generate sample alerts
  useEffect(() => {
    setAlerts([
      { id: 1, message: 'Gold approaching resistance at 58500', severity: 'medium', timestamp: '10:45 AM' },
      { id: 2, message: 'Silver breaks support at 75000', severity: 'high', timestamp: '09:30 AM' },
      { id: 3, message: 'Crude oil volume spike detected', severity: 'low', timestamp: 'Yesterday' }
    ]);
  }, []);

  // Tabs configuration for navigation
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
    { id: 'commodities', label: 'Commodities', icon: <FiDollarSign /> },
    { id: 'analytics', label: 'Analytics', icon: <FiPieChart /> },
    { id: 'alerts', label: 'Alerts', icon: <FiBell /> }
  ];

  // Timeframes for data filtering
  const timeframes = [
    { id: '1d', label: '1D' },
    { id: '1w', label: '1W' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '1y', label: '1Y' }
  ];

  // Format currency for Indian Rupees
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Filter commodities based on search query
  const filteredCommodities = marketData?.commodities.filter(commodity =>
    commodity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commodity.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent text-white pt-24">
      {/* Enhanced Navbar with Gradient and Lower Positioning */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-transparent shadow-lg rounded-b-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Branding with Gradient */}
          <div className="flex items-center space-x-3">
            <FiTrendingUp className="text-3xl text-white" />
            <h1 className="text-3xl font-extrabold text-white">
              MCX Service
            </h1>
          </div>
          {/* Navigation Tabs */}
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#A1C4FD] bg-gradient-to-r from-[#A1C4FD]/20 to-[#D4A1FD]/20 border-b-2 border-[#A1C4FD]'
                    : darkMode
                    ? 'text-[#E5E7EB] hover:text-[#D4A1FD] hover:bg-gray-700'
                    : 'text-[#1F2937] hover:text-[#A1C4FD] hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </nav>
          {/* Dark Mode Toggle and Alerts Bell */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-md font-medium ${darkMode ? 'bg-gray-700 text-[#E5E7EB]' : 'bg-gray-200 text-[#1F2937]'}`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </motion.button>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
            >
              <FiBell className={`text-xl ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`} />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <div className="inline-flex rounded-md shadow-sm bg-white/20 p-1">
            {timeframes.map((tf) => (
              <motion.button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === tf.id
                    ? 'bg-gradient-to-r from-[#A1C4FD] to-[#D4A1FD] text-white'
                    : darkMode
                    ? 'text-[#E5E7EB] hover:bg-gray-600'
                    : 'text-[#1F2937] hover:bg-gray-100'
                }`}
              >
                {tf.label}
              </motion.button>
            ))}
          </div>
          <div className="text-sm text-white">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A1C4FD]"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Market Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                  >
                    <div className="p-6 sm:p-8">
                      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                        Market Overview
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {marketData?.commodities.map((commodity) => (
                          <motion.div
                            key={commodity.id}
                            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                            className={`p-6 rounded-xl bg-white/30 border cursor-pointer`}
                            onClick={() => setExpandedCard(expandedCard === commodity.id ? null : commodity.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`text-lg font-semibold ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {commodity.name}
                                </h3>
                                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-[#A1C4FD]' : 'text-[#1F2937]'}`}>
                                  {formatCurrency(commodity.price)}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-sm font-medium ${
                                  commodity.change >= 0
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {commodity.change >= 0 ? '+' : ''}{commodity.change}%
                              </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">OI:</span>{' '}
                                <span className={`font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {(commodity.oi / 1000).toFixed(1)}K
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Volume:</span>{' '}
                                <span className={`font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {(commodity.volume / 1000).toFixed(1)}K
                                </span>
                              </div>
                            </div>
                            {/* Expanded Content */}
                            {expandedCard === commodity.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4"
                              >
                                <div className="border-t pt-4">
                                  <h4 className={`text-sm font-semibold ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                    Additional Details
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                    <div>
                                      <span className="text-gray-500">Support:</span>{' '}
                                      <span className={`font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                        {formatCurrency(commodity.support)}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">Resistance:</span>{' '}
                                      <span className={`font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                        {formatCurrency(commodity.resistance)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <LineChart width={300} height={100} data={commodity.history}>
                                      <Line type="monotone" dataKey="price" stroke="#A1C4FD" />
                                      <XAxis dataKey="time" stroke={darkMode ? '#E5E7EB' : '#1F2937'} />
                                      <YAxis stroke={darkMode ? '#E5E7EB' : '#1F2937'} />
                                      <Tooltip
                                        contentStyle={{
                                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                                          color: darkMode ? '#E5E7EB' : '#1F2937',
                                          borderRadius: '8px',
                                          border: 'none'
                                        }}
                                      />
                                    </LineChart>
                                  </div>
                                </div>
                  </motion.div>
                )}
              {/* Service Toggle Buttons */}
              {activeTab === 'dashboard' && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-md shadow-sm bg-white/20 p-1 mb-6 w-full">
                  <Link to="/mcxsupreme">
                    <button
                      className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md ${infoView === 'supreme' ? 'bg-gradient-to-r from-[#A1C4FD] to-[#D4A1FD] text-white' : 'text-white hover:bg-white/30'}`}
                    >MCX Supreme</button>
                  </Link>
                  <button
                    onClick={() => setInfoView('galaxy')}
                    className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md ${infoView === 'galaxy' ? 'bg-gradient-to-r from-[#A1C4FD] to-[#D4A1FD] text-white' : 'text-white hover:bg-white/30'}`}
                  >Galaxy MCX</button>
                </div>
              )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Charts and Analytics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                  >
                    <div className="p-6 sm:p-8">
                      <h2 className="text-2xl font-bold mb-6 text-white">
                        Technical Analysis
                      </h2>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="col-span-1 lg:col-span-2">
                          <LineChart
                            width={Math.min(window.innerWidth - 40, 600)}
                            height={300}
                            data={marketData?.commodities.map(c => ({
                              name: c.name,
                              price: c.price,
                            }))}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                            <XAxis dataKey="name" stroke={darkMode ? '#E5E7EB' : '#1F2937'} />
                            <YAxis stroke={darkMode ? '#E5E7EB' : '#1F2937'} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                                color: darkMode ? '#E5E7EB' : '#1F2937',
                                borderRadius: '8px',
                                border: 'none'
                              }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#A1C4FD" name="Price" />
                          </LineChart>
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                            Recommendations
                          </h3>
                          <div className="space-y-3">
                            {Object.entries(marketData?.technicals || {}).map(([commodity, recommendation]) => (
                              <motion.div
                                key={commodity}
                                whileHover={{ scale: 1.02 }}
                                className={`p-3 rounded-lg ${
                                  recommendation === 'Strong Buy' ? 'bg-green-100 text-green-800' :
                                  recommendation === 'Buy' ? 'bg-blue-100 text-blue-800' :
                                  recommendation === 'Sell' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="capitalize font-medium">{commodity}</span>
                                  <span className="font-bold">{recommendation}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* News Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                  >
                    <div className="p-6 sm:p-8">
                      <h2 className="text-2xl font-bold mb-6 text-white">
                        Market News
                      </h2>
                      <div className="space-y-4">
                        {marketData?.news.map((item) => (
                          <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 rounded-lg ${
                              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                            } border`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`font-semibold ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{item.source} • {item.timestamp}</p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  item.impact === 'high' ? 'bg-red-100 text-red-800' :
                                  item.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}
                              >
                                {item.impact.toUpperCase()}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* MCX Supreme Info */}
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                >
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">MCX Supreme</h2>
                    <p className="mb-4 text-white/80">
                      MCX Supreme is designed and destined to deliver recommendations with good market moves. It’s unique blend of technical and fundamentals research makes it most exciting and rewarding product. It provides you 1-2 intraday recommendations. The recommendations are given in Bullions, Base Metals and energy traded in MCX. Our timely generated technical recommendations provide adequate time to enter in trades. Our recommendations are supreme blend of Technical and globally covered fundamental research.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-white">MCX Supreme Features:</h3>
                    <ul className="list-disc list-inside mb-4 text-white/80 space-y-1">
                      <li>We provide 1-2 Intraday/Positional recommendations in Bullions, Base Metals and energy traded in MCX (as per market conditions).</li>
                      <li>All recommendations have 2 TGT with proper Stop loss.</li>
                      <li>Timely Follow Ups of all the trade signals.</li>
                      <li>Proper time for entry & exit in recommendations.</li>
                      <li>Nifty and Bank Nifty Trend and Support and resistance.</li>
                      <li>Carefully Analysis Market direction.</li>
                      <li>Concise information of Domestic & World Market.</li>
                      <li>Recommendations are provided through SMS.</li>
                      <li>Swift real time customer support between (09:00 AM to 06:00 PM).</li>
                      <li>Trading rules that every trader must studious follow.</li>
                      <li>Do not over trade.</li>
                      <li>Only follow SMS research recommendations.</li>
                      <li>Have to trade on each Recommendation with same quantity according to Research Team.</li>
                      <li>Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</li>
                      <li>Never be emotional.</li>
                      <li>Beware of overnight risk.</li>
                      <li>Always trade with a stop loss.</li>
                      <li>Don’t look back and rue trades.</li>
                      <li>Don’t over leverage in a volatile market.</li>
                      <li>Costs matter a lot when you are a trader.</li>
                      <li>Trading begins with protecting your capital.</li>
                      <li>Not doing anything is also a trading strategy.</li>
                      <li>Profit is what is booked; all else is book profits.</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-2 text-white">Pricing Plan For MCX Supreme:</h3>
                    <div className="flex justify-center">
                      <Link to="/mcxsupreme">
                        <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2 mb-2">MCX Supreme Pricing & Payment</button>
                      </Link>
                    </div>
                    <p className="text-sm text-white/70">Note: Pricing are excluding GST (18%)</p>
                  </div>
                </motion.div>
              )}

              {/* Galaxy MCX Info */}
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                >
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">Galaxy MCX</h2>
                    <p className="mb-4 text-white/80">
                      Our MCX Commodity Service provides real-time trading insights, research-backed recommendations, and expert research recommendations for F&O commodities such as gold, silver, crude oil, natural gas, and base metals. Designed for both beginners and experienced traders, whether you’re trading for short-term profits or long-term investments, our MCX Commodity Service is your reliable partner in navigating the Indian commodities market with confidence.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-white">Galaxy MCX Features:</h3>
                    <ul className="list-disc list-inside mb-4 text-white/80 space-y-1">
                      <li>We provide 1-2 Intraday/Positional recommendations in Bullions, Base Metals and energy traded in MCX F&O (as per market conditions).</li>
                      <li>All recommendations have 2 TGT with proper Stop loss.</li>
                      <li>Timely Follow Ups of all the trade signals.</li>
                      <li>Proper time for entry & exit in recommendations.</li>
                      <li>Carefully Analysis Market direction.</li>
                      <li>Concise information of Domestic & World Market.</li>
                      <li>Recommendations are provided through SMS.</li>
                      <li>Swift real time customer support between (09:00 AM to 06:00 PM).</li>
                      <li>Trading rules that every trader must studious follow.</li>
                      <li>Do not over trade.</li>
                      <li>Only follow SMS research recommendations.</li>
                      <li>Have to trade on each Recommendation with same quantity according to Research Team.</li>
                      <li>Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</li>
                      <li>Never be emotional.</li>
                      <li>Beware of overnight risk.</li>
                      <li>Always trade with a stop loss.</li>
                      <li>Don’t look back and rue trades.</li>
                      <li>Don’t over leverage in a volatile market.</li>
                      <li>Costs matter a lot when you are a trader.</li>
                      <li>Trading begins with protecting your capital.</li>
                      <li>Not doing anything is also a trading strategy.</li>
                      <li>Profit is what is booked; all else is book profits.</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-2 text-white">Sample Calls:</h3>
                    <p className="mb-4 text-white/80">BUY CRUDE OIL 5800 CE ABOVE 181 TARGET 204 226 STOPLOSS 154</p>
                    <h3 className="text-xl font-semibold mb-2 text-white">Pricing Plan For Galaxy MCX:</h3>
                    <table className="min-w-full divide-y divide-gray-200 mb-4">
                      <thead className="bg-white/20">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-white">Plan</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-white">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white/20">
                          <td className="px-4 py-2 text-white">Galaxy MCX</td>
                          <td className="px-4 py-2 text-white">₹1,51,000 / Quarterly</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-sm text-white/70">Note: Pricing are excluding GST (18%)</p>
                  </div>
                </motion.div>
              )}

              {/* Commodities Tab */}
              {activeTab === 'commodities' && marketData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                >
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">
                      Commodities
                    </h2>
                    {/* Search Bar */}
                    <div className="mb-6">
                      <div className="relative">
                        <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`} />
                        <input
                          type="text"
                          placeholder="Search commodities..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-[#E5E7EB]' : 'bg-white border-gray-200 text-[#1F2937]'}`}
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white/20">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              Commodity
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              Price
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              Change
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              OI
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              Volume
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                              Support/Resistance
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                          {filteredCommodities?.map((commodity) => (
                            <motion.tr
                              key={commodity.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white/20 hover:bg-white/30"
                            >
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                      commodity.name === 'Gold' ? 'bg-amber-100 text-amber-800' :
                                      commodity.name === 'Silver' ? 'bg-gray-100 text-gray-800' :
                                      commodity.name === 'Crude Oil' ? 'bg-green-100 text-green-800' :
                                      'bg-orange-100 text-orange-800'
                                    }`}>
                                      {commodity.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">
                                      {commodity.name}
                                    </div>
                                    <div className="text-sm text-white/70">{commodity.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className={`text-sm font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {formatCurrency(commodity.price)}
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className={`flex items-center ${commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {commodity.change >= 0 ? (
                                    <FiTrendingUp className="mr-1" />
                                  ) : (
                                    <FiTrendingDown className="mr-1" />
                                  )}
                                  <span>{commodity.change >= 0 ? '+' : ''}{commodity.change}%</span>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className={`text-sm ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {(commodity.oi / 1000).toFixed(1)}K
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className={`text-sm ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  {(commodity.volume / 1000).toFixed(1)}K
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                <div className={`text-sm ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                                  <div>S: {formatCurrency(commodity.support)}</div>
                                  <div>R: {formatCurrency(commodity.resistance)}</div>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                >
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">
                      Analytics
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                          <tr>
                            <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                              Commodity
                            </th>
                            <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                              Current Price
                            </th>
                            <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                              Day Range
                            </th>
                            <th className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                              Avg Volume
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                          {marketData?.commodities.map((commodity) => (
                            <motion.tr
                              key={commodity.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white/20 hover:bg-white/30"
                            >
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                {commodity.name}
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                {formatCurrency(commodity.price)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                {formatCurrency(commodity.support)} - {formatCurrency(commodity.resistance)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">
                                {(commodity.volume / 1000).toFixed(1)}K
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white/20"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                        Alerts
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAlertForm(!showAlertForm)}
                        className="px-4 py-2 bg-gradient-to-r from-[#A1C4FD] to-[#D4A1FD] text-white rounded-md text-sm font-medium"
                      >
                        {showAlertForm ? 'Cancel' : 'Create Alert'}
                      </motion.button>
                    </div>
                    {/* Alert Creation Form */}
                    {showAlertForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-lg bg-white/20"
                      >
                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-[#E5E7EB]' : 'text-[#1F2937]'}`}>
                          Create New Alert
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <select
                            value={newAlert.commodity}
                            onChange={(e) => setNewAlert({ ...newAlert, commodity: e.target.value })}
                            className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-[#E5E7EB]' : 'bg-white border-gray-200 text-[#1F2937]'}`}
                          >
                            {marketData?.commodities.map((c) => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                          <select
                            value={newAlert.condition}
                            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                            className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-[#E5E7EB]' : 'bg-white border-gray-200 text-[#1F2937]'}`}
                          >
                            <option value="above">Price Above</option>
                            <option value="below">Price Below</option>
                          </select>
                          <input
                            type="number"
                            placeholder="Enter price"
                            value={newAlert.price}
                            onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
                            className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-[#E5E7EB]' : 'bg-white border-gray-200 text-[#1F2937]'}`}
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setAlerts([
                              ...alerts,
                              {
                                id: alerts.length + 1,
                                message: `${newAlert.commodity} price ${newAlert.condition} ${formatCurrency(newAlert.price)}`,
                                severity: 'medium',
                                timestamp: new Date().toLocaleTimeString(),
                              },
                            ]);
                            setNewAlert({ commodity: 'Gold', condition: 'above', price: '' });
                            setShowAlertForm(false);
                          }}
                          className="mt-4 px-4 py-2 bg-gradient-to-r from-[#A1C4FD] to-[#D4A1FD] text-white rounded-md text-sm font-medium"
                        >
                          Save Alert
                        </motion.button>
                      </motion.div>
                    )}
                    <div className="space-y-4 mt-6">
                      {alerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg bg-white/20 border-l-4 ${
                            alert.severity === 'high' ? 'border-red-500' :
                            alert.severity === 'medium' ? 'border-yellow-500' :
                            'border-blue-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">
                                {alert.message}
                              </p>
                              <p className="text-sm text-white/70 mt-1">{alert.timestamp}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
                              className="text-white/70 hover:text-white"
                            >
                              ×
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    
    </div>
  );
};

export default Mcx;