import React, { useState, useEffect } from 'react';
import { Trans } from '../i18nShim';
import { FiClock, FiBookmark, FiShare2 } from 'react-icons/fi';
import { BsArrowUpRight, BsDot } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarked, setBookmarked] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handleChange);
    
    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  // NewsAPI integration
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
  // Use server-side proxy to avoid exposing API keys in client bundle
  const proxyUrl = process.env.REACT_APP_NEWS_PROXY_URL || '/api/news?q=stock+market+OR+nifty+OR+sensex+OR+sebi';
  const response = await fetch(proxyUrl);
  const data = await response.json();
        
  if (data && data.articles) {
          const processedNews = data.articles.slice(0, 10).map((article, index) => ({
            id: index,
            title: article.title,
            source: article.source.name,
            time: new Date(article.publishedAt).toLocaleTimeString(),
            category: getCategory(article.title),
            impact: getImpact(article.title),
            summary: article.description || article.content?.substring(0, 150) + '...',
            image: article.urlToImage || 'https://via.placeholder.com/150',
            url: article.url
          }));
          setNews(processedNews);
          setLastUpdated(new Date().toLocaleTimeString());
        }
  } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to mock data if API fails
        setNews(getMockData());
      } finally {
        setLoading(false);
      }
    };

    // Helper functions
    const getCategory = (title) => {
      if (/nifty|sensex|stock market|bse|nse/i.test(title)) return 'markets';
      if (/tcs|reliance|hdfc|infosys|itc|stock/i.test(title)) return 'stocks';
      if (/rbi|economy|gdp|inflation/i.test(title)) return 'economy';
      if (/gold|silver|oil|commodity/i.test(title)) return 'commodities';
      if (/sebi|regulation|law/i.test(title)) return 'regulations';
      return 'general';
    };

    const getImpact = (title) => {
      return /rate cut|rbi|sebi|regulation|surge|plunge|crisis/i.test(title) 
        ? 'high' 
        : 'medium';
    };

    const getMockData = () => {
      return [
        {
          id: 1,
          title: 'RBI keeps repo rate unchanged at 6.5% for seventh consecutive time',
          source: 'Economic Times',
          time: '2 hours ago',
          category: 'economy',
          impact: 'high',
          summary: 'The Reserve Bank of India maintained the repo rate at 6.5% in its bi-monthly monetary policy meeting today, in line with market expectations.',
          image: 'https://via.placeholder.com/150',
          url: '#'
        },
        {
          id: 2,
          title: 'Nifty 50 hits new all-time high of 22,500 led by banking stocks',
          source: 'Moneycontrol',
          time: '4 hours ago',
          category: 'markets',
          impact: 'medium',
          summary: 'The Nifty 50 index crossed the 22,500 mark for the first time ever as banking stocks surged after RBI policy announcement.',
          image: 'https://via.placeholder.com/150',
          url: '#'
        }
      ];
    };

    fetchNews();
    
    // Set up refresh interval (every 15 minutes to stay within API limits)
    const interval = setInterval(fetchNews, 900000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'markets', name: 'Market Trends' },
    { id: 'stocks', name: 'Stocks' },
    { id: 'economy', name: 'Economy' },
    { id: 'commodities', name: 'Commodities' },
    { id: 'regulations', name: 'Regulations' }
  ];

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(item => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  // Color scheme that works well in both light and dark modes
  const colors = {
    primary: isDarkMode ? '#60a5fa' : '#2563eb',
    secondary: isDarkMode ? '#a78bfa' : '#7c3aed',
    background: 'transparent',
    cardBg: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    textPrimary: isDarkMode ? '#f3f4f6' : '#111827',
    textSecondary: isDarkMode ? '#d1d5db' : '#4b5563',
    border: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
    highImpact: '#ef4444',
    mediumImpact: '#f59e0b'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold"
            style={{ color: colors.textPrimary }}
          ><Trans i18nKey="pages.MarketNews.live-market-news">Live Market News</Trans><motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="ml-2 text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.1)',
                color: colors.primary
              }}
            ><Trans i18nKey="pages.MarketNews.real-time">REAL-TIME</Trans></motion.span>
          </motion.h1>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 md:mt-0 flex items-center"
        >
          <FiClock className="mr-2" style={{ color: colors.textSecondary }} />
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            Last updated: {lastUpdated}
          </span>
        </motion.div>
      </div>

      {/* Categories Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
            className={`px-4 py-2 mr-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
            }`}
            style={{
              backgroundColor: activeCategory === category.id 
                ? colors.primary 
                : isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)'
            }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* News List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg p-4 h-32"
              style={{ 
                backgroundColor: colors.cardBg,
                backdropFilter: 'blur(10px)'
              }}
            />
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {filteredNews.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                className="rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  borderWidth: '1px',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: isDarkMode 
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.25)' 
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <motion.span 
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: 'easeInOut'
                          }}
                          className="inline-block w-2 h-2 rounded-full mr-2"
                          style={{ 
                            backgroundColor: item.impact === 'high' 
                              ? colors.highImpact 
                              : colors.mediumImpact
                          }}
                        ></motion.span>
                        <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                          {item.source}
                        </span>
                        <BsDot className="mx-1" style={{ color: colors.textSecondary }} />
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          {item.time}
                        </span>
                      </div>
                      <motion.h3 
                        whileHover={{ color: colors.primary }}
                        className="text-lg md:text-xl font-semibold mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        className="mb-4"
                        style={{ color: colors.textSecondary }}
                      >
                        {item.summary}
                      </motion.p>
                    </div>
                    {item.image && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="ml-4 hidden md:block"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => { e.currentTarget.onerror = null; }}
                        />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-4" style={{ borderColor: colors.border, borderTopWidth: '1px' }}>
                    <div className="flex space-x-2">
                      <motion.button 
                        onClick={() => toggleBookmark(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full"
                        style={{ color: bookmarked.includes(item.id) ? colors.secondary : colors.textSecondary }}
                      >
                        <FiBookmark className={bookmarked.includes(item.id) ? 'fill-current' : ''} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiShare2 />
                      </motion.button>
                    </div>
                    <motion.a 
                      href={item.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center text-sm font-medium"
                      style={{ color: colors.primary }}
                    ><Trans i18nKey="pages.MarketNews.read-full-story">Read full story</Trans><BsArrowUpRight className="ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default MarketNews;