import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaChartBar, FaTools, FaChartLine, FaShieldAlt, FaListAlt } from 'react-icons/fa';
import Layout from '../components/Layout';

// Register Chart.js components and zoom plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Filler
);

// Sample data for charts
const optionPriceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Gold Call Option (₹/10g)',
      data: [2500, 2600, 2450, 2700, 2650, 2800, 2750, 2850, 2900, 2950],
      borderColor: '#FBBF24',
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Gold Put Option (₹/10g)',
      data: [2400, 2550, 2500, 2650, 2600, 2750, 2700, 2800, 2850, 2900],
      borderColor: '#D97706',
      backgroundColor: 'rgba(217, 119, 6, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const tradingVolumeData = {
  labels: ['Gold Options', 'Silver Options', 'Crude Oil Options', 'Copper Options'],
  datasets: [
    {
      label: 'Trading Volume (Lots)',
      data: [4000, 3000, 2000, 1500],
      backgroundColor: ['#FBBF24', '#D1D5DB', '#1F2937', '#B91C1C'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MCXOption = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [calculatorInput, setCalculatorInput] = useState({
    strikePrice: 70000,
    premium: 2800,
    quantity: 1,
    type: 'call',
  });
  const [payoffResult, setPayoffResult] = useState(null);
  const [error, setError] = useState('');
  const heroRef = React.useRef(null);
  const servicesRef = React.useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Services data
  const services = [
    {
      title: 'Options Trading',
      description: 'Trade call and put options on gold, silver, crude oil, and more on MCX.',
      icon: FaChartBar,
    },
    {
      title: 'Strategy Builder',
      description: 'Design and simulate custom options strategies with advanced tools.',
      icon: FaTools,
    },
    {
      title: 'Market Analysis',
      description: 'Real-time insights and technical analysis for MCX options trading.',
      icon: FaChartLine,
    },
    {
      title: 'Risk Management',
      description: 'Protect your capital with stop-loss and hedging strategies.',
      icon: FaShieldAlt,
    },
    {
      title: 'Options Chain',
      description: 'Access live options chain data for informed trading decisions.',
      icon: FaListAlt,
    },
  ];

  // FAQs data
  const faqs = [
    {
      question: 'What are MCX commodity options?',
      answer:
        'MCX commodity options are derivative contracts allowing you to buy or sell a commodity at a set price before or on a specific date.',
    },
    {
      question: 'How do I start trading options on MCX?',
      answer:
        'Select a plan, open an MCX account, and use our platform with guided onboarding.',
    },
    {
      question: 'What are the risks in options trading?',
      answer:
        'Risks include price volatility and leverage, mitigated by our risk management tools.',
    },
    {
      question: 'Can I trade options on all MCX commodities?',
      answer:
        'Pro and Enterprise plans offer access to options on all MCX commodities.',
    },
    {
      question: 'What strategies can I use for options trading?',
      answer:
        'Use strategies like covered calls, straddles, and spreads with our tools.',
    },
    {
      question: 'How does the options chain work?',
      answer:
        'The options chain lists all available call and put contracts with strike prices, premiums, and open interest.',
    },
    {
      question: 'What is the benefit of the payoff calculator?',
      answer:
        'The payoff calculator estimates potential profits or losses based on your options trade parameters.',
    },
    {
      question: 'Can I download options chain data?',
      answer:
        'Yes, use the "Download as CSV" button in the options chain section to export the data.',
    },
  ];

  // Options chain data
  const optionsChain = [
    { commodity: 'Gold Call', strike: '₹70,000', premium: '₹2,800', oi: 1200, change: '+1.5%' },
    { commodity: 'Gold Put', strike: '₹70,000', premium: '₹2,600', oi: 1100, change: '-0.8%' },
    { commodity: 'Silver Call', strike: '₹78,000', premium: '₹3,200', oi: 900, change: '+1.2%' },
    { commodity: 'Crude Oil Call', strike: '₹5,500', premium: '₹450', oi: 1500, change: '+0.9%' },
    { commodity: 'Copper Call', strike: '₹850', premium: '₹65', oi: 800, change: '+0.5%' },
    { commodity: 'Silver Put', strike: '₹78,000', premium: '₹3,000', oi: 850, change: '-0.6%' },
  ];

  // News ticker data
  const newsTicker = [
    'Gold options rally as global demand surges.',
    'Silver options trading volume hits record high on MCX.',
    'Crude oil options spike amid geopolitical tensions.',
    'Copper options see steady growth in open interest.',
    'MCX introduces new options contracts for base metals.',
  ];

  // Payoff calculator logic
  const calculatePayoff = () => {
    const { strikePrice, premium, quantity, type } = calculatorInput;
    if (!strikePrice || !premium || !quantity) {
      setError('Please fill in all fields.');
      setPayoffResult(null);
      return;
    }
    if (quantity <= 0) {
      setError('Quantity must be greater than 0.');
      setPayoffResult(null);
      return;
    }
    setError('');
    const spotPrice = strikePrice * 1.05; // Sample spot price for demo
    let payoff = 0;
    if (type === 'call') {
      payoff = Math.max(0, spotPrice - strikePrice) - premium;
    } else {
      payoff = Math.max(0, strikePrice - spotPrice) - premium;
    }
    payoff *= quantity;
    setPayoffResult(payoff.toFixed(2));
  };

  // Reset calculator
  const resetCalculator = () => {
    setCalculatorInput({
      strikePrice: 70000,
      premium: 2800,
      quantity: 1,
      type: 'call',
    });
    setPayoffResult(null);
    setError('');
  };

  // Download options chain as CSV
  const downloadOptionsChain = () => {
    const headers = ['Commodity', 'Strike Price', 'Premium', 'Open Interest', 'Change'];
    const csvContent = [
      headers.join(','),
      ...optionsChain.map((item) =>
        [item.commodity, item.strike, item.premium, item.oi, item.change].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcx_options_chain.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Navigation handler for contact page
  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="text-center mb-16"
          variants={itemVariants}
          animate={isHeroInView ? 'visible' : 'hidden'}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            MCX Options Trading
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">
            Master commodity options trading on MCX with our cutting-edge platform, real-time
            data, and powerful trading tools.
          </p>
          <motion.button
            className="mt-6 bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 transition shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNavigateToContact}
            aria-label="Start Trading Options"
          >
            Start Trading Options
          </motion.button>
        </motion.section>

        {/* News Ticker */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Market Updates
          </h2>
          <div className="bg-transparent p-4 rounded-lg shadow-md overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              className="flex space-x-12 whitespace-nowrap"
            >
              {newsTicker.map((news, index) => (
                <span key={index} className="text-white text-lg">
                  {news}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          ref={servicesRef}
          className="mb-16"
          variants={itemVariants}
          animate={isServicesInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Options Trading Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/20 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 15px 25px rgba(0,0,0,0.15)' }}
              >
                {/* ...existing IconComponent import...*/}
                <motion.div className="text-center">
                  <service.icon className="text-4xl mb-4 mx-auto text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Charts Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Options Market Insights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div className="bg-white/20 p-6 rounded-xl shadow-lg" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-4">
                Gold Options Price Trends
              </h3>
              <Line
                data={optionPriceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Gold Call & Put Options (₹)' },
                    zoom: {
                      zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
                      pan: { enabled: true, mode: 'x' },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: { display: true, text: 'Price (₹)' },
                    },
                  },
                }}
              />
            </motion.div>
            <motion.div className="bg-white/20 p-6 rounded-xl shadow-lg" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-4">
                Options Trading Volume
              </h3>
              <Bar
                data={tradingVolumeData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Trading Volume by Commodity (Lots)' },
                  },
                }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Options Payoff Calculator */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Options Payoff Calculator
          </h2>
          <div className="bg-white/20 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 mb-2">Strike Price (₹)</label>
                <input
                  type="number"
                  value={calculatorInput.strikePrice}
                  onChange={(e) =>
                    setCalculatorInput({ ...calculatorInput, strikePrice: parseFloat(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg bg-white text-black focus:ring-2 focus:ring-yellow-500"
                  aria-label="Strike Price"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Premium (₹)</label>
                <input
                  type="number"
                  value={calculatorInput.premium}
                  onChange={(e) =>
                    setCalculatorInput({ ...calculatorInput, premium: parseFloat(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg bg-white text-black focus:ring-2 focus:ring-yellow-500"
                  aria-label="Premium"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Quantity (Lots)</label>
                <input
                  type="number"
                  value={calculatorInput.quantity}
                  onChange={(e) =>
                    setCalculatorInput({ ...calculatorInput, quantity: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg bg-white text-black focus:ring-2 focus:ring-yellow-500"
                  aria-label="Quantity"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Option Type</label>
                <select
                  value={calculatorInput.type}
                  onChange={(e) =>
                    setCalculatorInput({ ...calculatorInput, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg bg-white text-black focus:ring-2 focus:ring-yellow-500"
                  aria-label="Option Type"
                >
                  <option value="call">Call</option>
                  <option value="put">Put</option>
                </select>
              </div>
            </div>
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            <div className="flex space-x-4">
              <motion.button
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={calculatePayoff}
                aria-label="Calculate Payoff"
              >
                Calculate Payoff
              </motion.button>
              <motion.button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCalculator}
                aria-label="Reset Calculator"
              >
                Reset
              </motion.button>
            </div>
            {payoffResult && (
              <motion.p
                className="mt-4 text-lg font-semibold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Estimated Payoff: ₹{payoffResult}
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* Options Chain Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Live Options Chain
          </h2>
          <div className="bg-white/20 p-6 rounded-xl shadow-lg overflow-x-auto">
            <div className="flex justify-end mb-4">
              <motion.button
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadOptionsChain}
                aria-label="Download Options Chain as CSV"
              >
                Download as CSV
              </motion.button>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-transparent">
                  <th className="p-4 font-semibold text-white">Commodity</th>
                  <th className="p-4 font-semibold text-white">Strike Price</th>
                  <th className="p-4 font-semibold text-white">Premium</th>
                  <th className="p-4 font-semibold text-white">Open Interest</th>
                  <th className="p-4 font-semibold text-white">Change</th>
                </tr>
              </thead>
              <tbody>
                {optionsChain.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-t border-gray-200"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <td className="p-4 text-white">{item.commodity}</td>
                    <td className="p-4 text-white">{item.strike}</td>
                    <td className="p-4 text-white">{item.premium}</td>
                    <td className="p-4 text-white">{item.oi}</td>
                    <td className={`p-4 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/20 p-6 rounded-xl shadow-md mb-4"
                variants={itemVariants}
              >
                <button
                  className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  aria-expanded={activeFaq === index}
                  aria-controls={`faq-${index}`}
                >
                  {faq.question}
                  <span className="text-white">{activeFaq === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-white mt-2"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What Our Traders Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Priya Sharma',
                text: 'The strategy builder transformed my options trading approach.',
                role: 'Options Trader',
              },
              {
                name: 'Rahul Mehta',
                text: 'Real-time analytics and options chain data are top-notch.',
                role: 'Commodity Investor',
              },
              {
                name: 'Anita Desai',
                text: 'The payoff calculator is a must-have for planning trades.',
                role: 'Professional Trader',
              },
              {
                name: 'Vikram Singh',
                text: 'The platform’s tools make MCX options trading seamless.',
                role: 'Retail Trader',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/20 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 15px 25px rgba(0,0,0,0.15)' }}
              >
                <p className="text-white mb-4">"{testimonial.text}"</p>
                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-white">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section className="text-center" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Trade MCX Options?
          </h2>
          <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
            Join thousands of traders leveraging our platform for smarter commodity options trading.
          </p>
          <motion.button
            className="bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 transition shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNavigateToContact}
            aria-label="Start Trading Now"
          >
            Start Trading Now
          </motion.button>
        </motion.section>
      </motion.div>
    </Layout>
  );
};

export default MCXOption;