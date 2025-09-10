import React from 'react';
import { Trans, useTranslation } from '../i18nShim';
import { Helmet } from 'react-helmet-async';
import {
  FaChartLine, FaShieldAlt, FaRupeeSign, 
  FaPercentage, FaUsers, FaCalendarAlt,
  FaWhatsapp, FaPhoneAlt, FaInfoCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function StockOption() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-transparent">
      <Helmet>
        <title>{t('pages.StockOption.professional-stock-options-trading-wise-', 'Professional Stock Options Trading | Wise Global')}</title>
        <meta name="description" content="SEBI-registered stock options advisory with proven strategies. Get expert calls, risk management techniques, and real-time alerts for maximum returns." />
        <meta name="keywords" content="stock options trading, Nifty options, Bank Nifty options, options strategies, SEBI registered advisor, options trading tips" />
        <link rel="canonical" href="https://wiseglobal.com/stock-options" />
        <meta property="og:title" content="Professional Stock Options Trading | Wise Global" />
        <meta property="og:description" content="Get expert stock options trading calls with risk management from SEBI-registered advisors." />
        <meta property="og:url" content="https://wiseglobal.com/stock-options" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Stock Options Trading | Wise Global" />
        <meta name="twitter:description" content="SEBI-registered stock options advisory with proven strategies and real-time alerts." />
        <meta name="twitter:image" content="https://wiseglobal.com/assets/og-stock-options.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Professional Stock Options Trading',
            'description': 'SEBI-registered stock options advisory offering expert calls, risk management techniques, and real-time alerts.'
          })}
        </script>
        <meta property="og:title" content="Professional Stock Options Trading | Wise Global" />
        <meta property="og:description" content="Get expert stock options trading calls with risk management from SEBI-registered advisors." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"><Trans i18nKey="pages.StockOption.advanced">Advanced</Trans><span className="text-blue-600"><Trans i18nKey="pages.StockOption.stock-options">Stock Options</Trans></span><Trans i18nKey="pages.StockOption.trading">Trading</Trans></h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto"><Trans i18nKey="pages.StockOption.professional-options-strategies-with"><Trans i18nKey="pages.StockOption.professional-options-strategies-with-1">Professional options strategies with</Trans></Trans><span className="font-semibold text-green-600"><Trans i18nKey="pages.StockOption.75-accuracy">75%+ accuracy</Trans></span><Trans i18nKey="pages.StockOption.and-complete-risk-management"><Trans i18nKey="pages.StockOption.and-complete-risk-management-1">and complete risk management</Trans></Trans></p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <FaPercentage className="text-2xl text-green-500" />, value: "75%+", label: "Accuracy Rate" },
            { icon: <FaUsers className="text-2xl text-blue-500" />, value: "5000+", label: "Traders" },
            { icon: <FaCalendarAlt className="text-2xl text-amber-500" />, value: "5+ Years", label: "Experience" },
            { icon: <FaShieldAlt className="text-2xl text-purple-500" />, value: "SEBI", label: "Registered" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-transparent backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-sm flex items-center gap-3"
            >
              <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
              <div>
              <div className="font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white"><Trans i18nKey="pages.StockOption.our">Our</Trans><span className="text-blue-600"><Trans i18nKey="pages.StockOption.options-trading">Options Trading</Trans></span><Trans i18nKey="pages.StockOption.features">Features</Trans></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaChartLine className="text-2xl text-blue-600" />,
              title: "Premium & Discount Strategies",
              desc: "Advanced calls for both premium buying and discount selling strategies"
            },
            {
              icon: <FaShieldAlt className="text-2xl text-green-600" />,
              title: "Risk Management",
              desc: "Strict stop-loss and position sizing rules for capital protection"
            },
            {
              icon: <FaRupeeSign className="text-2xl text-amber-600" />,
              title: "Hedging Techniques",
              desc: "Hedging strategies to protect your investments"
            },
            {
              icon: <FaPercentage className="text-2xl text-purple-600" />,
              title: "Probability Analysis",
              desc: "Data-driven probability assessments for each trade"
            },
            {
              icon: <FaUsers className="text-2xl text-red-500" />,
              title: "Dedicated Support",
              desc: "1-on-1 guidance from options trading experts"
            },
            {
              icon: <FaInfoCircle className="text-2xl text-teal-600" />,
              title: "Educational Resources",
              desc: "Weekly webinars and training materials"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-transparent backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-sm"
            >
              <div className="p-3 bg-blue-50 rounded-lg w-fit mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-transparent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4"><Trans i18nKey="pages.StockOption.start-trading-options-like-a-pro"><Trans i18nKey="pages.StockOption.start-trading-options-like-a-pro-1">Start Trading Options Like a Pro</Trans></Trans></h2>
          <p className="text-white mb-8 max-w-2xl mx-auto"><Trans i18nKey="pages.StockOption.get-your-first-3-options-trading-calls-f"><Trans i18nKey="pages.StockOption.get-your-first-3-options-trading-calls-f-1">Get your first 3 options trading calls free with our SEBI-registered advisory</Trans></Trans></p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold shadow-md min-w-[240px]">
              <FaWhatsapp /><Trans i18nKey="pages.StockOption.chat-on-whatsapp">Chat on WhatsApp</Trans></button>
            <button className="flex items-center justify-center gap-2 bg-transparent text-white border border-white hover:bg-blue-800 px-6 py-3 rounded-full font-semibold shadow-md min-w-[240px]">
              <FaPhoneAlt /><Trans i18nKey="pages.StockOption.call-now">Call Now</Trans></button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="py-6 px-4 bg-transparent text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-start gap-2">
          <FaInfoCircle className="mt-0.5 flex-shrink-0" />
          <div>
            <strong><Trans i18nKey="pages.StockOption.disclaimer">Disclaimer:</Trans></strong><Trans i18nKey="pages.StockOption.trading-in-stock-options-involves-risks-"><Trans i18nKey="pages.StockOption.trading-in-stock-options-involves-risks--1">Trading in stock options involves risks. Past performance is not indicative of future results. Our services are for educational purposes only. Consult your financial advisor before trading.</Trans></Trans></div>
        </div>
      </div>
    </div>
  );
}

export default StockOption;
