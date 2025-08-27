// src/pages/Comex.js
import React, { useState, useEffect, useMemo } from 'react';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import Contact from './Contact';


// Mock data for Indian stock market (NIFTY 500 inspired)
const mockStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3050.25, change: 2.5, sector: 'Oil & Gas', volume: 7500000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4200.75, change: -1.2, sector: 'IT', volume: 3200000 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1600.50, change: 0.8, sector: 'Banking', volume: 8900000 },
  { symbol: 'INFY', name: 'Infosys', price: 1800.30, change: 1.5, sector: 'IT', volume: 4500000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1200.10, change: -0.5, sector: 'Banking', volume: 6700000 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 850.40, change: 1.8, sector: 'Banking', volume: 12000000 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1450.65, change: 3.2, sector: 'Telecom', volume: 5600000 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 3200.90, change: -2.0, sector: 'Conglomerate', volume: 2300000 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 12476.00, change: 0.9, sector: 'Automotive', volume: 890000 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 12495.00, change: 1.1, sector: 'Cement', volume: 450000 },
  // Add more mock stocks to simulate NIFTY 500
  ...Array.from({ length: 20 }, (_, i) => ({
    symbol: `STOCK${i + 1}`,
    name: `Stock ${i + 1} India`,
    price: Math.random() * 5000 + 100,
    change: (Math.random() * 10 - 5).toFixed(2),
    sector: ['IT', 'Banking', 'Pharma', 'Automotive', 'FMCG'][Math.floor(Math.random() * 5)],
    volume: Math.floor(Math.random() * 10000000),
  })),
];


const Comex = () => {
  // State management
  const [stocks, setStocks] = useState(mockStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [watchlist, setWatchlist] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'desc' });
  const [showContactForm, setShowContactForm] = useState(false);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
          change: (Math.random() * 5 - 2.5).toFixed(2),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter stocks based on search and sector
  const filteredStocks = useMemo(() => {
    let result = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedSector !== 'All') {
      result = result.filter((stock) => stock.sector === selectedSector);
    }

    // Sort stocks
    result.sort((a, b) => {
      if (sortConfig.key === 'price' || sortConfig.key === 'change' || sortConfig.key === 'volume') {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

    return result;
  }, [stocks, searchTerm, selectedSector, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Add/remove from watchlist
  const toggleWatchlist = (stock) => {
    setWatchlist((prev) =>
      prev.some((item) => item.symbol === stock.symbol)
        ? prev.filter((item) => item.symbol !== stock.symbol)
        : [...prev, stock]
    );
  };



  // Sector options for filter
  const sectors = ['All', ...new Set(mockStocks.map((stock) => stock.sector))];

  if (showContactForm) {
    return <Contact />;
  }

  return (
    <motion.div
      className="min-h-screen bg-transparent p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-white text-center mb-8  block px-4 py-2 rounded mx-auto"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        ><Trans i18nKey="pages.Comex.indian-stock-market-comex-dashboard"><Trans i18nKey="pages.Comex.indian-stock-market-comex-dashboard-1">Indian Stock Market - Comex Dashboard</Trans></Trans></motion.h1>

        {/* Note on Data */}


        {/* Search and Filter Section */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks by name or symbol..."
              className="w-full pl-10 pr-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Stock List and Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock List */}
          <motion.div
            className="lg:col-span-2 bg-white/30 backdrop-blur-md rounded-lg p-6"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4"><Trans i18nKey="pages.Comex.stock-list">Stock List</Trans></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('symbol')}>
                      Symbol {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('price')}>
                      Price (INR) {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('change')}>
                      Change (%) {sortConfig.key === 'change' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('sector')}>
                      Sector {sortConfig.key === 'sector' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('volume')}>
                      Volume {sortConfig.key === 'volume' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3"><Trans i18nKey="pages.Comex.action">Action</Trans></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredStocks.map((stock) => (
                      <motion.tr
                        key={stock.symbol}
                        className="border-b border-gray-800 hover:bg-gray-700 cursor-pointer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="p-3">{stock.symbol}</td>
                        <td className="p-3">{stock.name}</td>
                        <td className="p-3">₹{stock.price.toFixed(2)}</td>
                        <td className={`p-3 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change}%
                        </td>
                        <td className="p-3">{stock.sector}</td>
                        <td className="p-3">{stock.volume.toLocaleString()}</td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(stock);
                            }}
                            className="text-blue-500 hover:text-blue-300"
                          >
                            {watchlist.some((item) => item.symbol === stock.symbol) ? (<FaTrash />
                            ) : (
                              <FaPlus />
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Watchlist */}
          <motion.div className="bg-white/30 backdrop-blur-md rounded-lg p-6" initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-semibold text-white mb-4"><Trans i18nKey="pages.Comex.watchlist">Watchlist</Trans></h2>
            {watchlist.length === 0 ? (
              <p className="text-gray-400"><Trans i18nKey="pages.Comex.your-watchlist-is-empty">Your watchlist is empty.</Trans></p>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence>
                  {watchlist.map((stock) => (
                    <motion.li
                      key={stock.symbol}
                      className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-50 rounded"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>
                        {stock.symbol} - ₹{stock.price.toFixed(2)} (
                        <span className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {stock.change}%
                        </span>
                        )
                      </span>
                      <button
                        onClick={() => toggleWatchlist(stock)}
                        className="text-red-500 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </div>

        {/* About COMEX Section */}
        <motion.section className="mt-8 mb-12 p-6 bg-white/30 backdrop-blur-md rounded-lg text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-semibold mb-4"><Trans i18nKey="pages.Comex.what-is-comex">What Is COMEX?</Trans></h2>
          <p className="mb-4">
            The Commodity Exchange (COMEX) is a division of the New York Mercantile Exchange (NYMEX) and one of the world’s most prominent marketplaces for trading metals, including gold, silver, copper, and aluminum. Established in 1933, COMEX was created to standardize contract terms and provide a transparent venue for price discovery and risk management in the commodities sector.
          </p>
          <p className="mb-4">
            COMEX originally began as an exchange for copper futures, with members trading standardized contracts to hedge industrial supply and demand risks. Over time, the exchange expanded to include precious metals, launching silver futures contracts in 1965 and gold futures in 1974. These additions bolstered the exchange’s global influence, establishing benchmark prices used by central banks, jewelers, and investors worldwide.
          </p>
          <p className="mb-4">
            Today, COMEX operates both electronic trading platforms and open outcry pits. The electronic Globex system allows participants to trade futures and options contracts twenty-four hours a day. In parallel, traditional trading floors continue to facilitate price negotiations and order execution during regular market hours, preserving a dynamic bond between human market makers and automated systems.
          </p>
          <p className="mb-4">
            Contracts on COMEX are meticulously defined by contract size, commodity grade, delivery location, and delivery month. For instance, a standard gold futures contract represents 100 troy ounces of 99.5% purity gold, deliverable in New York City. This level of standardization ensures uniformity, enabling market participants to trade large volumes with confidence and clarity.
          </p>
          <p className="mb-4">
            The exchange’s regulatory framework, enforced by the Commodity Futures Trading Commission (CFTC), mandates strict reporting, position limits, and auditing standards. These measures protect against market manipulation, excessive speculation, and systemic risk—safeguarding the integrity of global commodity trading.
          </p>
          <p className="mb-4">
            Participants in COMEX include commercial hedgers, financial institutions, investment firms, and retail traders. Commercial producers and consumers—such as mining companies and jewelry manufacturers—use COMEX contracts to lock in prices for physical supplies. Financial traders and speculators leverage the exchange’s liquidity and margin systems to capitalize on price volatility without owning the physical metal.
          </p>
          <p className="mb-4">
            COMEX prices serve as a global reference. Major financial news outlets, economic reports, and industry publications routinely cite COMEX settlement values as authoritative indicators of market sentiment. For example, the London Bullion Market Association (LBMA) uses COMEX quotes to inform its own price benchmarks.
          </p>
          <p className="mb-4"><Trans i18nKey="pages.Comex.beyond-futures-and-options-comex-offers-"><Trans i18nKey="pages.Comex.beyond-futures-and-options-comex-offers--1">Beyond futures and options, COMEX offers micro-sized contracts and spreads, catering to smaller traders and advanced strategies. Micro gold and micro silver contracts provide one-tenth the size of standard contracts, making precious metals trading more accessible to individual investors.</Trans></Trans></p>
          <p className="mb-4">
            Risk management tools on COMEX include daily price limits, margin requirements, and clearinghouse guarantees. Traders must deposit initial margin—collateral to cover potential losses—and maintain variation margin to meet daily mark-to-market adjustments. The COMEX clearinghouse stands between buyers and sellers, ensuring settlement and mitigating counterparty risk.
          </p>
          <p className="mb-4"><Trans i18nKey="pages.Comex.with-an-average-daily-trading-volume-exc"><Trans i18nKey="pages.Comex.with-an-average-daily-trading-volume-exc-1">With an average daily trading volume exceeding 100,000 contracts, COMEX boasts deep liquidity and tight bid-ask spreads. This high-volume environment attracts global participants and underpins price efficiency, making COMEX a cornerstone of the modern financial system.</Trans></Trans></p>
          {/* CTA Button */}
          <div className="text-center mt-6">
            <motion.button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowContactForm(true)}>Enquiry Now</motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Comex;