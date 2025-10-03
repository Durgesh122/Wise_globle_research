import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
    // addListener for older browsers, matches and addListener used here to match existing codebase
    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener('change', handleChange);
      return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }
    darkModeMediaQuery.addListener(handleChange);
    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const staticItems = [
      { id: 1, title: 'Nifty holds above 24,000; PSU banks and IT stocks lead gains', source: 'Economic Times', time: 'Just now', category: 'markets', impact: 'medium', summary: 'Benchmark indices trade in a tight range with positive bias as select banking and IT heavyweights see fresh buying interest.', image: 'https://via.placeholder.com/150', url: '#' },
      { id: 2, title: 'RBI seen holding repo rate; focus shifts to liquidity stance', source: 'Moneycontrol', time: '5 min ago', category: 'economy', impact: 'high', summary: 'Analysts expect the central bank to keep rates unchanged while fine-tuning liquidity operations amid stable core inflation.', image: 'https://via.placeholder.com/150', url: '#' },
      { id: 3, title: 'Gold prices steady; rupee movement and global yields in focus', source: 'Business Standard', time: '12 min ago', category: 'commodities', impact: 'medium', summary: 'Bullion trades flat domestically as traders watch US treasury yields and INR trajectory for near-term direction cues.', image: 'https://via.placeholder.com/150', url: '#' },
      { id: 4, title: 'SEBI proposes tighter disclosure norms for large cap IPOs', source: 'Financial Express', time: '20 min ago', category: 'regulations', impact: 'high', summary: 'Draft consultation suggests enhanced risk factor articulation and granular use-of-proceeds reporting for upcoming big-ticket IPOs.', image: 'https://via.placeholder.com/150', url: '#' },
      { id: 5, title: 'IT majors eye margin resilience despite wage hikes', source: 'LiveMint', time: '30 min ago', category: 'stocks', impact: 'medium', summary: 'Tier-1 IT services firms expected to defend operating margins through utilization optimization and pyramid realignment.', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    setNews(staticItems);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
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
    if (bookmarked.includes(id)) setBookmarked(bookmarked.filter(item => item !== id));
    else setBookmarked([...bookmarked, id]);
  };

  const filteredNews = activeCategory === 'all' ? news : news.filter(item => item.category === activeCategory);

  const jsonLdGraph = React.useMemo(() => {
    const org = { '@type': 'Organization', name: 'Wise Global Research', url: 'https://wiseglobalresearch.com/', '@id': 'https://wiseglobalresearch.com/#org' };
    const collection = { '@type': 'CollectionPage', name: 'Live Market News', description: 'Live stock market news and updates covering Nifty, Sensex, stocks, commodities and economic headlines.', url: 'https://wiseglobalresearch.com/market-news', isPartOf: { '@id': 'https://wiseglobalresearch.com/#org' } };

    const parseRelativeTime = (timeStr) => {
      if (!timeStr) return null;
      const m = timeStr.match(/(\d+)\s*min/i);
      if (m) return new Date(Date.now() - parseInt(m[1], 10) * 60000).toISOString();
      if (/just now/i.test(timeStr)) return new Date().toISOString();
      return null;
    };

    const collectionTime = new Date().toISOString();
    const articles = (news || []).map(item => {
      const published = parseRelativeTime(item.time) || collectionTime;
      return {
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.summary,
        datePublished: published,
        dateModified: published,
        author: { '@type': 'Person', name: item.source || 'Wise Global Research' },
        image: item.image ? [item.image] : undefined,
        mainEntityOfPage: { '@type': 'WebPage', '@id': item.url && item.url !== '#' ? item.url : `https://wiseglobalresearch.com/market-news#news-${item.id}` },
        publisher: { '@type': 'Organization', name: 'Wise Global Research', logo: { '@type': 'ImageObject', url: 'https://wiseglobalresearch.com/assets/images/logo.png' } }
      };
    });

    return { '@context': 'https://schema.org', '@graph': [org, collection, ...articles] };
  }, [news]);

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
    <>
      <Helmet>
        <title>Live Market News - Wise Global Research</title>
        <meta name="description" content="Live stock market news, Nifty & Sensex updates, and real-time market headlines from Wise Global Research. Stay informed for better trading decisions." />
        <link rel="canonical" href="https://wiseglobalresearch.com/market-news" />
        {news && news.length > 0 && news[0] && news[0].time && (
          <meta name="article:published_time" content={(news && news[0] && news[0].time) ? (news[0].time.match(/(\d+)\s*min/i) ? new Date(Date.now() - parseInt(news[0].time.match(/(\d+)\s*min/i)[1],10)*60000).toISOString() : ( /just now/i.test(news[0].time) ? new Date().toISOString() : new Date().toISOString() )) : new Date().toISOString()} />
        )}
        <meta property="og:title" content="Live Market News - Wise Global Research" />
        <meta property="og:description" content="Live stock market news, Nifty & Sensex updates, and real-time market headlines from Wise Global Research." />
        <script type="application/ld+json">{JSON.stringify(jsonLdGraph)}</script>
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl md:text-3xl font-bold" style={{ color: colors.textPrimary }}>
              <Trans i18nKey="pages.MarketNews.live-market-news">Live Market News</Trans>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="ml-2 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.1)', color: colors.primary }}>
                <Trans i18nKey="pages.MarketNews.real-time">REAL-TIME</Trans>
              </motion.span>
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 md:mt-0 flex items-center">
            <FiClock className="mr-2" style={{ color: colors.textSecondary }} />
            <span className="text-sm" style={{ color: colors.textSecondary }}>Last updated: {lastUpdated}</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button key={category.id} onClick={() => setActiveCategory(category.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + (index * 0.1) }} className={`px-4 py-2 mr-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} style={{ backgroundColor: activeCategory === category.id ? colors.primary : isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)' }}>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="rounded-lg p-4 h-32" style={{ backgroundColor: colors.cardBg, backdropFilter: 'blur(10px)' }} />)}</div>
        ) : (
          <AnimatePresence>
            <div className="space-y-6">
              {filteredNews.map((item, index) => (
                <motion.div key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }} className="rounded-lg overflow-hidden transition-transform" style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: '1px', backdropFilter: 'blur(10px)', boxShadow: isDarkMode ? '0 2px 6px -1px rgba(0,0,0,0.4)' : '0 2px 6px -1px rgba(0,0,0,0.12)' }} whileHover={{ y: -4 }}>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <motion.span animate={{ scale: [1,1.2,1], opacity: [0.8,1,0.8] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.impact === 'high' ? colors.highImpact : colors.mediumImpact }} />
                          <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>{item.source}</span>
                          <BsDot className="mx-1" style={{ color: colors.textSecondary }} />
                          <span className="text-sm" style={{ color: colors.textSecondary }}>{item.time}</span>
                        </div>
                        <motion.h3 whileHover={{ color: colors.primary }} className="text-lg md:text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>{item.title}</motion.h3>
                        <motion.p initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} className="mb-4" style={{ color: colors.textSecondary }}>{item.summary}</motion.p>
                      </div>
                      {item.image && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="ml-4 hidden md:block">
                          <img src={item.image.startsWith('data:') ? item.image : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="8" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="%236b7280" font-family="Arial">NEWS</text></svg>'} alt={item.title} className="w-24 h-24 object-cover rounded" loading="lazy" decoding="async" />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-4" style={{ borderColor: colors.border, borderTopWidth: '1px' }}>
                      <div className="flex space-x-2">
                        <motion.button type="button" onClick={() => toggleBookmark(item.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full" style={{ color: bookmarked.includes(item.id) ? colors.secondary : colors.textSecondary }} title={bookmarked.includes(item.id) ? 'Remove bookmark' : 'Add bookmark'} aria-label={bookmarked.includes(item.id) ? 'Remove bookmark' : 'Add bookmark'}>
                          <FiBookmark aria-hidden="true" className={bookmarked.includes(item.id) ? 'fill-current' : ''} />
                        </motion.button>
                        <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full" style={{ color: colors.textSecondary }} title="Share news" aria-label="Share news">
                          <FiShare2 aria-hidden="true" />
                        </motion.button>
                      </div>
                      <motion.a href={item.url || '#'} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} className="flex items-center text-sm font-medium" style={{ color: colors.primary }}><Trans i18nKey="pages.MarketNews.read-full-story">Read full story</Trans><BsArrowUpRight className="ml-1" /></motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </>
  );
}

export default MarketNews;