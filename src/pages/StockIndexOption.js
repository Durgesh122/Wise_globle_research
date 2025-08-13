// Import required dependencies
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp, FaArrowRight, FaRupeeSign, FaChartLine,
  FaShieldAlt, FaStar, FaUserTie, FaPhoneAlt,
  FaRegClock, FaHandHoldingUsd, FaUniversity, FaChartBar,
  FaExclamationTriangle, FaBook, FaUsers, FaPercentage,
  FaCalendarAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

// Main StockIndexOption component
const StockIndexOption = () => {
  // State for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState(null);
  // State for WhatsApp button loading
  const [isLoading, setIsLoading] = useState(false);
  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Toggle FAQ accordion
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Handle WhatsApp button click
  const handleWhatsAppClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open('https://wa.me/919977909494', '_blank');
      setIsLoading(false);
    }, 500);
  };

  // Handle Contact button click with toast notification
  const handleContactClick = () => {
    toast.info('Redirecting to Contact page...', { position: 'top-center', autoClose: 2000 });
    setTimeout(() => {
      window.location.href = '/contact';
    }, 1000);
  };

  // Handle testimonial carousel navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Memoized FAQ list for performance optimization
  const faqList = useMemo(() => [
    {
      question: 'What are Stock Index Options?',
      answer:
        'Stock index options are contracts based on indices like Nifty or Bank Nifty, giving the right to buy or sell the index at a specific price within a set period. They offer high leverage and are ideal for volatility trading.',
      icon: <FaChartLine className="text-teal-500 text-xl" />,
    },
    {
      question: 'Why trade index options with Wise Global?',
      answer:
        '• Research-driven Nifty/Bank Nifty calls\n• Real-time WhatsApp alerts\n• Advanced volatility strategies\n• Strict risk management\n• Personalized guidance\n• Weekly webinars',
      icon: <FaShieldAlt className="text-cyan-500 text-xl" />,
    },
    {
      question: 'What is the minimum capital required?',
      answer:
        '• ₹15,000–₹30,000: Start with single lots\n• ₹50,000–₹1.5 Lakh: Balanced hedging strategies\n• ₹3 Lakh+: Multi-strategy approaches\n• No lock-in period',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
    {
      question: 'What strategies do you focus on?',
      answer:
        '• Delta-neutral strategies\n• Volatility spreads (straddles, strangles)\n• Iron condors and butterflies\n• Hedging with futures\n• Greeks-based analysis\n• Tailored to risk appetite',
      icon: <FaChartBar className="text-teal-600 text-xl" />,
    },
    {
      question: 'What is the historical performance?',
      answer:
        '• Average Annual Return (3 Yr): 19.2% CAGR\n• Success Rate: 70% on recommended trades\n• Typical Holding Period: 1–15 days\n• Risk-Reward Ratio: 1:2.8\n• *Past performance is not indicative of future results.*',
      icon: <FaStar className="text-amber-500 text-xl" />,
    },
    {
      question: 'How do I join your advisory service?',
      answer:
        '1. Contact us via WhatsApp\n2. Complete KYC (PAN, Aadhaar)\n3. Explore 3 introductory calls\n4. Select a plan\n5. Access live signals dashboard',
      icon: <FaUserTie className="text-cyan-400 text-xl" />,
    },
    {
      question: 'What support is provided?',
      answer:
        '• Dedicated index options expert\n• 24/7 WhatsApp/email support\n• Weekly strategy reviews\n• Educational webinars\n• Greeks analysis training\n• Daily market updates',
      icon: <FaPhoneAlt className="text-blue-500 text-xl" />,
    },
    {
      question: 'How are fees structured?',
      answer:
        'Plans are customized for index traders. Visit our pricing page or contact us via WhatsApp for transparent fee details.',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
    {
      question: 'What are the risks of index options?',
      answer:
        'Index options carry high risks due to leverage, volatility, and time decay. Losses can exceed initial investments. Always use stop-losses and consult offer documents.',
      icon: <FaExclamationTriangle className="text-red-500 text-xl" />,
    },
    {
      question: 'How do you handle volatile markets?',
      answer:
        'We use volatility-based strategies like straddles and iron condors, combined with strict risk management, to navigate turbulent markets effectively.',
      icon: <FaShieldAlt className="text-cyan-500 text-xl" />,
    },
  ], []);

  // Features data for the features section
  const features = [
    {
      icon: <FaChartLine className="text-3xl text-teal-500" />,
      title: 'Volatility Strategies',
      description: 'Advanced delta-neutral and volatility-based trades for Nifty and Bank Nifty.',
    },
    {
      icon: <FaRegClock className="text-3xl text-cyan-500" />,
      title: 'Instant Alerts',
      description: 'Real-time WhatsApp notifications for precise entry and exit points.',
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl text-yellow-500" />,
      title: 'Hedging Expertise',
      description: 'Protect capital with futures and options-based hedging techniques.',
    },
    {
      icon: <FaUniversity className="text-3xl text-blue-500" />,
      title: 'Learning Hub',
      description: 'Access webinars, tutorials, and Greeks analysis training.',
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-500" />,
      title: 'Risk Control',
      description: 'Robust stop-loss and position sizing to limit losses.',
    },
  ];

  // Performance stats data
  const performanceStats = [
    { metric: '4,500+', label: 'Active Traders', icon: <FaUsers className="text-2xl text-teal-500" /> },
    { metric: '70%', label: 'Trade Success Rate', icon: <FaPercentage className="text-2xl text-cyan-500" /> },
    { metric: '19.2%', label: '3-Yr CAGR', icon: <FaCalendarAlt className="text-2xl text-yellow-500" /> },
    { metric: 'SEBI', label: 'Registered', icon: <FaShieldAlt className="text-2xl text-blue-500" /> },
  ];

  // Testimonials data
  const testimonials = [
    {
      text: 'Their volatility strategies transformed my Nifty trading. The alerts are timely and precise.',
      author: 'Rahul Sharma, Mumbai',
      rating: 5,
    },
    {
      text: 'The Greeks training webinars helped me master index options. Excellent support team!',
      author: 'Neha Patel, Ahmedabad',
      rating: 5,
    },
    {
      text: 'Hedging guidance saved me during market swings. Highly recommend!',
      author: 'Vikram Rao, Bangalore',
      rating: 4,
    },
    {
      text: 'Real-time alerts and risk management have improved my trading discipline.',
      author: 'Anita Desai, Delhi',
      rating: 4,
    },
  ];

  // Market insights data
  const marketInsights = [
    {
      title: 'Nifty Volatility Trends',
      description: 'Analyze VIX and historical volatility to time your index options trades effectively.',
    },
    {
      title: 'Bank Nifty Breakout Strategies',
      description: 'Learn breakout patterns for Bank Nifty options with our research-driven calls.',
    },
    {
      title: 'Greeks-Based Trading',
      description: 'Understand Delta, Gamma, and Theta to optimize your options strategies.',
    },
  ];

  // Regulations data for investor education
  const regulations = [
    {
      title: 'High-Risk Nature',
      description: 'Index options trading involves significant risks due to leverage and volatility. Losses may exceed investments. Review offer documents carefully.',
    },
    {
      title: 'No Assured Returns',
      description: 'SEBI prohibits guaranteed return claims. Historical performance (e.g., 19.2% CAGR) is not indicative of future results.',
    },
    {
      title: 'KYC Requirements',
      description: 'Complete KYC (PAN, Aadhaar) for SEBI compliance, ensuring transparency and security.',
    },
    {
      title: 'Grievance Redressal',
      description: 'Contact us or use SEBI’s SCORES platform at scores.gov.in for prompt complaint resolution.',
    },
  ];

  return (
    <div className="bg-transparent text-white min-h-screen">
      <Helmet>
        <title>Stock Index Options Trading India | Wise Global</title>
        <meta
          name="description"
          content="Wise Global offers SEBI-registered stock index options advisory with research-driven calls, real-time alerts, and advanced strategies for Nifty and Bank Nifty. Start trading confidently."
        />
        <meta
          name="keywords"
          content="stock index options trading, Nifty options, Bank Nifty options, options trading India, SEBI registered advisor, index options strategies, financial advisory India"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Wise Global" />
        <meta property="og:title" content="Stock Index Options Trading India | Wise Global" />
        <meta
          property="og:description"
          content="Join Wise Global for SEBI-registered stock index options advisory with real-time alerts and advanced strategies for Nifty and Bank Nifty."
        />
        <meta property="og:image" content="https://wiseglobal.com/assets/og-index-options.jpg" /> {/* Replace with actual image URL */}
        <meta property="og:url" content="https://wiseglobal.com/stock-index-options" /> {/* Replace with actual URL */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stock Index Options Trading India | Wise Global" />
        <meta
          name="twitter:description"
          content="Discover Wise Global’s SEBI-registered stock index options advisory with real-time alerts and strategies for Nifty and Bank Nifty."
        />
        <meta name="twitter:image" content="https://wiseglobal.com/assets/og-index-options.jpg" /> {/* Replace with actual image URL */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqList.map(faq => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer.replace(/\n/g, '<br>')
              }
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': marketInsights.map((insight, index) => ({
              '@type': 'Article',
              'position': index + 1,
              'name': insight.title,
              'description': insight.description
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto text-center mb-20"
      >
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
 className="inline-block bg-transparent backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
        >
          SEBI-Registered Index Options Advisory
        </motion.span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 mb-6">
          Excel in Stock Index Options Trading
        </h1>
        <p className="text-lg text-white mt-4 max-w-3xl mx-auto">
          Leverage Wise Global’s expertise for research-driven Nifty and Bank Nifty options strategies, real-time alerts, and disciplined risk management.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-white mt-4"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Index options trading carries high risks. Review all offer documents carefully.
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center mt-10 gap-6">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg min-w-[260px] transition-all"
          >
            {isLoading ? 'Connecting…' : (
              <>
                <FaWhatsapp /> Explore 3 Introductory Calls
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
            onClick={handleContactClick}
 className="flex items-center justify-center gap-2 bg-transparent backdrop-blur-md text-white border border-cyan-500 px-8 py-4 rounded-full font-semibold shadow-lg min-w-[260px] transition-all"
          >
            <FaPhoneAlt /> Contact Research Team
          </motion.button>
        </div>
      </motion.section>

      {/* Performance Stats Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Index Options Track Record</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {performanceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' }}
 className="bg-transparent backdrop-blur-lg p-8 rounded-xl text-center border-2 border-white/30 hover:shadow-2xl"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-3">
                {stat.icon}
              </motion.div>
              <div className="text-4xl font-bold text-white mb-3">{stat.metric}</div>
              <div className="text-white text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center text-sm text-white mt-6"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Metrics are historical and not a guarantee of future results.
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Index Options Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
 className="bg-transparent backdrop-blur-lg p-8 rounded-xl border-2 border-white/30 hover:shadow-2xl"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-5">
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Market Insights Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Market Insights for Index Options</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {marketInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
 className="bg-transparent backdrop-blur-lg p-8 rounded-xl border-2 border-white/30 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{insight.title}</h3>
              <p className="text-white text-sm">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section with Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Traders Say</h2>
        <div className="relative">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 backdrop-blur-lg p-8 rounded-xl border-2 border-white/30 hover:shadow-2xl"
          >
            <div className="text-yellow-400 mb-4 flex justify-center">
              {Array(testimonials[currentTestimonial].rating).fill().map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
        <blockquote className="text-white italic mb-4 text-center">{testimonials[currentTestimonial].text}</blockquote>
            <div className="text-white font-medium text-center">{testimonials[currentTestimonial].author}</div>
          </motion.div>
          <div className="flex justify-between mt-6">
            <button onClick={prevTestimonial} className="text-cyan-400 hover:text-cyan-300">
              <FaChevronLeft size={24} />
            </button>
            <button onClick={nextTestimonial} className="text-cyan-400 hover:text-cyan-300">
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-white mt-6"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Testimonials reflect individual experiences and may not represent typical results.
        </motion.div>
      </motion.section>

      {/* Risk Calculator Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Risk Calculator</h2>
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl border-2 border-white/30 hover:shadow-2xl text-center">
          <p className="text-white mb-4">
            Use our risk calculator to estimate potential losses and optimize position sizing for index options trading.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold"
            onClick={() => toast.info('Risk Calculator coming soon!', { position: 'top-center' })}
          >
            Try Risk Calculator
          </motion.button>
          <p className="text-sm text-white mt-4">
            <FaExclamationTriangle className="inline mr-2" />
            Always assess risks before trading. Consult a financial advisor.
          </p>
        </div>
      </motion.section>

      {/* Regulations Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Stock Market Regulations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {regulations.map((regulation, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg p-8 rounded-xl border-2 border-white/30 hover:shadow-2xl"
            >
              <div className="mb-5">
                <FaBook className="text-3xl text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{regulation.title}</h3>
              <p className="text-white text-sm">{regulation.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-5xl mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqList.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
 className="bg-transparent backdrop-blur-lg p-6 rounded-xl border-2 border-white/30 hover:shadow-2xl"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-transparent rounded-lg">{faq.icon}</div>
                  <span className="font-semibold text-left text-white text-base md:text-lg">{faq.question}</span>
                </div>
                <FaArrowRight
                  className={`transition-transform duration-300 ${openFAQ === idx ? 'rotate-90 text-cyan-400' : 'text-white'}`}
                />
              </button>
              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden pt-3 pl-12 text-white text-sm"
                  >
                    {faq.answer.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="max-w-4xl mx-auto text-center mb-16 px-4"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Start Your Index Options Journey</h2>
        <p className="text-white mb-8 text-lg">
          Join Wise Global for SEBI-registered index options advisory with 3 introductory calls. Navigate Nifty and Bank Nifty markets with confidence.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
          onClick={handleWhatsAppClick}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 mx-auto bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg min-w-[280px] transition-all"
        >
          {isLoading ? 'Connecting…' : (
            <>
              <FaWhatsapp /> Explore Introductory Calls
            </>
          )}
        </motion.button>
      </motion.section>

      {/* Compliance Footer */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
 className="container mx-auto text-center px-4 py-8 bg-transparent backdrop-blur-lg rounded-xl border-2 border-white/30 hover:shadow-2xl"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Important Disclosures</h3>
        <p className="text-white text-sm mb-4">
          <FaExclamationTriangle className="inline mr-2" />
          Index options trading involves high risks due to leverage and volatility. Losses may exceed investments. Past performance is not indicative of future results. For subscription fees, visit <a href="https://x.ai/grok" className="text-cyan-400 hover:underline">our pricing page</a>.
        </p>
        <p className="text-white text-sm">
          For grievances, contact us at <a href="mailto:support@wiseglobal.com" className="text-cyan-400 hover:underline">support@wiseglobal.com</a> or file a complaint on SEBI’s SCORES platform at <a href="https://scores.gov.in" className="text-cyan-400 hover:underline">scores.gov.in</a>.
        </p>
      </motion.section>
    </div>
  );
};

export default StockIndexOption;