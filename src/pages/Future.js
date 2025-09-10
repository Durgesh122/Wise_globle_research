import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedChart from '../components/AnimatedChart';

const Future = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [marketData, setMarketData] = useState(null);
  const [timeframe, setTimeframe] = useState('1d');
  const [expandedCard, setExpandedCard] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setMarketData({
        indices: [
          { name: 'NIFTY 50', value: 19556.25, change: 1.23 },
          { name: 'BANK NIFTY', value: 44231.45, change: 0.87 },
          { name: 'FIN NIFTY', value: 19845.32, change: -0.45 }
        ],
        futures: [
          { symbol: 'NIFTYJUL23', last: 19585.50, oi: 12563200, change: 1.45 },
          { symbol: 'BANKNIFTYJUL23', last: 44310.25, oi: 8452100, change: 0.92 },
          { symbol: 'FINNIFTYJUL23', last: 19860.75, oi: 3562100, change: -0.32 }
        ],
        news: [
          { id: 1, title: 'Global markets rally on positive economic data', source: 'Economic Times', time: '2h ago' },
          { id: 2, title: 'FIIs increase positions in index futures', source: 'Business Standard', time: '4h ago' },
          { id: 3, title: 'RBI governor comments on market volatility', source: 'Moneycontrol', time: '6h ago' }
        ]
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const timeframes = [
    { id: '1d', label: '1D' },
    { id: '1w', label: '1W' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '1y', label: '1Y' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'futures', label: 'Futures' },
    { id: 'options', label: 'Options' },
    { id: 'strategies', label: 'Strategies' },
    { id: 'news', label: 'News' }
  ];

  return (
    <div 
      className="min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8 text-white"
    >
      <Helmet>
        <title>Equity Futures Dashboard & Analytics | Wise Global</title>
        <meta name="description" content="Equity futures dashboard with comprehensive analytics, live charts, and trading tools for NIFTY, Bank NIFTY and stock futures. Stay informed with market insights and strategies." />
        <meta name="keywords" content="equity futures, futures dashboard, NIFTY futures, Bank NIFTY futures, futures analytics, futures trading tools" />
        <link rel="canonical" href="https://wiseglobal.com/future" />
        <meta property="og:title" content="Equity Futures Dashboard & Analytics | Wise Global" />
        <meta property="og:description" content="Real-time futures analytics, strategies and market insights for NIFTY, Bank NIFTY and stock futures." />
        <meta property="og:url" content="https://wiseglobal.com/future" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Equity Futures Dashboard & Analytics',
            'description': 'Real-time futures analytics and trading tools for NIFTY, Bank NIFTY and stock futures provided by Wise Global.'
          })}
        </script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-4"><Trans i18nKey="pages.Future.equity-futures-dashboard">Equity Futures Dashboard</Trans></h1>
          <p className="text-xl max-w-3xl mx-auto"><Trans i18nKey="pages.Future.comprehensive-analytics-and-trading-tool"><Trans i18nKey="pages.Future.comprehensive-analytics-and-trading-tool-1">Comprehensive analytics and trading tools for index and stock futures</Trans></Trans></p>
        </header>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm bg-white bg-opacity-10 p-1 text-white">
            {timeframes.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === tf.id
                    ? 'bg-blue-600 text-white'
                    : 'text-white hover:bg-gray-200 hover:bg-opacity-50'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white bg-opacity-10 rounded-xl shadow-xl overflow-hidden mb-8 text-white" style={{ backdropFilter: 'blur(5px)' }}>
          {/* Tabs */}
          <div className="border-b border-gray-300 border-opacity-50">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-white'
                      : 'border-transparent text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {marketData?.indices.map((index, i) => (
                        <motion.div
                          key={index.name}
                          whileHover={{ y: -5 }}
                          className="bg-white bg-opacity-10 rounded-lg shadow-md p-6 cursor-pointer"
                          onClick={() => handleCardExpand(`index-${i}`)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{index.name}</h3>
                              <p className="text-2xl font-bold mt-2">{index.value.toLocaleString()}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-sm font-medium ${
                                index.change >= 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {index.change >= 0 ? '+' : ''}
                              {index.change}%
                            </span>
                          </div>
                          {expandedCard === `index-${i}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t border-gray-300 border-opacity-50"
                            >
                              <div className="flex justify-between text-sm">
                                <span><Trans i18nKey="pages.Future.open-interest">Open Interest</Trans></span>
                                <span className="font-medium"><Trans i18nKey="pages.Future.12-5m">12.5M</Trans></span>
                              </div>
                              <div className="flex justify-between text-sm mt-2">
                                <span><Trans i18nKey="pages.Future.volume">Volume</Trans></span>
                                <span className="font-medium"><Trans i18nKey="pages.Future.8-2m">8.2M</Trans></span>
                              </div>
                              <div className="mt-3">
                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"><Trans i18nKey="pages.Future.view-chart">View Chart</Trans></button>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'futures' && marketData && (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 divide-opacity-50">
                          <thead className="bg-gray-100 bg-opacity-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"><Trans i18nKey="pages.Future.symbol">Symbol</Trans></th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"><Trans i18nKey="pages.Future.last-price">Last Price</Trans></th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"><Trans i18nKey="pages.Future.change">Change</Trans></th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"><Trans i18nKey="pages.Future.open-interest">Open Interest</Trans></th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"><Trans i18nKey="pages.Future.action">Action</Trans></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white bg-opacity-30 divide-y divide-gray-300 divide-opacity-50">
                            {marketData.futures.map((future, i) => (
                              <tr key={future.symbol}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{future.symbol}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{future.last.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      future.change >= 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {future.change >= 0 ? '+' : ''}
                                    {future.change}%
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {(future.oi / 1000000).toFixed(1)}M
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  <button className="text-blue-600 hover:text-blue-800 mr-3"><Trans i18nKey="pages.Future.buy">Buy</Trans></button>
                                  <button className="text-red-600 hover:text-red-800"><Trans i18nKey="pages.Future.sell">Sell</Trans></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'news' && marketData && (
                    <div className="space-y-4">
                      {marketData.news.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.01 }}
                          className="bg-white bg-opacity-40 rounded-lg shadow p-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <div className="flex justify-between text-sm">
                            <span>{item.source}</span>
                            <span>{item.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'strategies' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          name: 'Bull Call Spread',
                          description: 'Buy lower strike call, sell higher strike call',
                          risk: 'Limited',
                          reward: 'Limited'
                        },
                        {
                          name: 'Bear Put Spread',
                          description: 'Buy higher strike put, sell lower strike put',
                          risk: 'Limited',
                          reward: 'Limited'
                        },
                        {
                          name: 'Long Straddle',
                          description: 'Buy both call and put at same strike',
                          risk: 'Limited',
                          reward: 'Unlimited'
                        },
                        {
                          name: 'Iron Condor',
                          description: 'Combination of bull put and bear call spreads',
                          risk: 'Limited',
                          reward: 'Limited'
                        }
                      ].map((strategy, i) => (
                        <motion.div
                          key={strategy.name}
                          whileHover={{ y: -3 }}
                          className="bg-white bg-opacity-40 rounded-lg shadow-md p-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{strategy.name}</h3>
                          <p className="text-gray-700 mb-4">{strategy.description}</p>
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="text-gray-600"><Trans i18nKey="pages.Future.risk">Risk:</Trans></span>{' '}
                              <span className="font-medium">{strategy.risk}</span>
                            </div>
                            <div>
                              <span className="text-gray-600"><Trans i18nKey="pages.Future.reward">Reward:</Trans></span>{' '}
                              <span className="font-medium">{strategy.reward}</span>
                            </div>
                          </div>
                          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"><Trans i18nKey="pages.Future.analyze-strategy">Analyze Strategy</Trans></button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white bg-opacity-30 rounded-xl shadow-xl p-6 mb-8" style={{ backdropFilter: 'blur(5px)' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6"><Trans i18nKey="pages.Future.market-overview">Market Overview</Trans></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2"><Trans i18nKey="pages.Future.nifty-50">NIFTY 50</Trans></h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">19,556.25</span>
                <span className="text-green-700 font-medium">+1.23%</span>
              </div>
              <div className="h-40 mt-4">
                <AnimatedChart symbol="NSE:NIFTY" />
              </div>
            </div>
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2"><Trans i18nKey="pages.Future.sensex">SENSEX</Trans></h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">65,656.25</span>
                <span className="text-green-700 font-medium">+1.05%</span>
              </div>
              <div className="h-40 mt-4">
                <AnimatedChart symbol="BSE:SENSEX" />
              </div>
            </div>
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2"><Trans i18nKey="pages.Future.sector-performance">Sector Performance</Trans></h3>
              <div className="space-y-3">
                {[
                  { sector: 'IT', performance: '+2.3%' },
                  { sector: 'Banking', performance: '+1.8%' },
                  { sector: 'Auto', performance: '+0.7%' },
                  { sector: 'Pharma', performance: '-0.4%' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-800">
                    <span>{item.sector}</span>
                    <span className={item.performance.startsWith('+') ? 'text-green-700' : 'text-red-700'}>
                      {item.performance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Future;