// src/pages/Services.js
import React, { useState } from 'react';
import { Trans, useTranslation } from '../i18nShim';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaChartLine, FaRegLightbulb, FaStar, FaShieldAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

// Services data reflecting a SEBI Registered Research Analyst firm
export const services = [
  {
    category: 'Equity Cash',
    name: 'Smart Cash',
    description: 'In-depth research and analysis for intraday and positional trading opportunities in the cash segment.',
    icon: <FaChartLine className="text-blue-500" />
  },
  {
    category: 'Equity Cash',
    name: 'Evaluation Stock Cash',
    description: 'Fundamental analysis and research reports on quality stocks for long-term investment.',
    icon: <FaChartLine className="text-blue-500" />
  },
  {
    category: 'Derivatives',
    name: 'Smart Options',
    description: 'Data-driven research on high-probability options strategies to help you navigate the derivatives market.',
    icon: <FaRegLightbulb className="text-green-500" />
  },
  {
    category: 'Derivatives',
    name: 'Impulse Option',
    description: 'Momentum-based research for agile traders looking to capitalize on short-term market movements in options.',
    icon: <FaRegLightbulb className="text-green-500" />
  },
  {
    category: 'Derivatives',
    name: 'Smart Future',
    description: 'Strategic research and analysis for futures trading, focusing on risk management and potential opportunities.',
    icon: <FaRegLightbulb className="text-green-500" />
  },
  {
    category: 'Derivatives',
    name: 'Evaluation Stock Option',
    description: 'A synergistic approach combining fundamental stock analysis with strategic options research for balanced growth.',
    icon: <FaRegLightbulb className="text-green-500" />
  },
  {
    category: 'Index',
    name: 'Evaluation Index Options',
    description: 'Specialized research on major indices like Nifty and Bank Nifty to identify strategic option trades.',
    icon: <FaStar className="text-yellow-500" />
  },
  {
    category: 'Index',
    name: 'Impulse Index Options',
    description: 'Harness market volatility with our timely research on high-impact trading opportunities in index options.',
    icon: <FaStar className="text-yellow-500" />
  },
  {
    category: 'Index',
    name: 'Smart Index Option',
    description: 'Consistent and stable research strategies for navigating the complexities of the index options market.',
    icon: <FaStar className="text-yellow-500" />
  },
  {
    category: 'Commodities',
    name: 'MCX Supreme',
    description: 'Premium research and analysis on the commodities market to give you a competitive edge in MCX.',
    icon: <FaShieldAlt className="text-red-500" />
  },
  {
    category: 'Commodities',
    name: 'Galaxy MCX',
    description: 'Diversified research reports covering a broad spectrum of commodities.',
    icon: <FaShieldAlt className="text-red-500" />
  },
  {
    category: 'Customized',
    name: 'Universal Cash',
    description: 'Flexible and adaptive research plans for the cash market, tailored to various trading styles and risk profiles.',
    icon: <FaShieldAlt className="text-red-500" />
  },
  {
    category: 'Premium',
    name: 'Infinity Club',
    description: 'Exclusive access to our most premium research, in-depth market reports, and direct analyst support.',
    icon: <FaShieldAlt className="text-purple-500" />
  },
];

// Helper to map service names to specific routes
const getServicePath = (name) => {
  const routeName = name.toLowerCase().replace(/\s+/g, '-');
  switch (name) {
    case 'MCX Supreme':
  return '/MCXSupreme';
    case 'Galaxy MCX':
      return '/galaxymcx';
    default:
      return `/services/${routeName}`;
  }
};

// Main Services Page Component
const ServicesPage = () => {
  const { t } = useTranslation();
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.Services.our-services-wise-global-research', 'Our Services | Wise Global Research')}</title>
        <meta name="description" content="Explore Wise Global Research's SEBI registered research services: equity, derivatives, MCX, Nifty, Sensex, and more. Trusted by thousands of investors and traders in India." />
        <meta property="og:title" content="Our Services | Wise Global Research" />
        <meta property="og:description" content="SEBI registered research services: equity, derivatives, MCX, Nifty, Sensex, and more. Trusted by thousands of investors and traders in India." />
        <meta property="og:url" content="https://wiseglobalresearch.com/services" />
        <meta property="og:image" content="https://wiseglobalresearch.com/og-image.jpg" />
        <meta name="twitter:title" content="Our Services | Wise Global Research" />
        <meta name="twitter:description" content="SEBI registered research services: equity, derivatives, MCX, Nifty, Sensex, and more. Trusted by thousands of investors and traders in India." />
        <meta name="twitter:image" content="https://wiseglobalresearch.com/og-image.jpg" />
      </Helmet>
      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl mx-auto"><Trans i18nKey="pages.Services.our-research-services">Our Research Services</Trans></h1>
            <p className="mt-4 text-base sm:text-lg text-white max-w-3xl mx-auto px-2 sm:px-0"><Trans i18nKey="pages.Services.wise-global-research-services-is-a-sebi-"><Trans i18nKey="pages.Services.wise-global-research-services-is-a-sebi--1">Wise Global Research Services is a SEBI Registered Research Analyst firm, committed to providing unbiased, data-driven insights to empower your financial decisions.</Trans></Trans></p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out text-white w-full"
                style={{ background: '#D4e3ff', border: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(4px)' }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-3">{service.icon}</div>
                    <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800">{service.name}</h2>
                  </div>
                  <p className="text-white mb-6 flex-grow text-sm sm:text-base">{service.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      to={getServicePath(service.name)}
                      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                    ><Trans i18nKey="pages.Services.view-plan">View Plan</Trans></Link>
                    <button
                      onClick={() => toggleService(index)}
                      className="flex items-center text-white hover:text-gray-200 font-semibold transition-colors duration-300 text-sm"
                    >
                      {expandedService === index ? <FaMinus className="mr-2" /> : <FaPlus className="mr-2" />}
                      Details
                    </button>
                  </div>
                  {expandedService === index && (
                    <div className="mt-6 border-t border-white/50 pt-4">
                      <p className="text-sm text-white"><Trans i18nKey="pages.Services.this-research-service-falls-under-the"><Trans i18nKey="pages.Services.this-research-service-falls-under-the-1">This research service falls under the</Trans></Trans> <span className="font-semibold">{service.category}</span> <Trans i18nKey="pages.Services.category-our-analysis-is-based-on-rigoro"><Trans i18nKey="pages.Services.category-our-analysis-is-based-on-rigoro-1">category. Our analysis is based on rigorous methodologies and market data.</Trans></Trans></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SEBI Disclaimer Section */}
          <div className="text-center p-6 sm:p-8 text-white rounded-2xl shadow-inner" style={{ background: '#D4e3ff', border: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(4px)' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4"><Trans i18nKey="pages.Services.important-disclosures">Important Disclosures</Trans></h3>
            <div className="max-w-4xl mx-auto text-sm sm:text-base space-y-2 px-2 sm:px-0">
              <p>
                <span className="font-semibold"><Trans i18nKey="pages.Services.wise-global-research-services"><Trans i18nKey="pages.Services.wise-global-research-services-1">Wise Global Research Services</Trans></Trans></span><Trans i18nKey="pages.Services.is-a-sebi-registered-research-analyst"><Trans i18nKey="pages.Services.is-a-sebi-registered-research-analyst-1">is a SEBI Registered Research Analyst.</Trans></Trans><strong className="block mt-1"><Trans i18nKey="pages.Services.sebi-registration-no-inh000016719"><Trans i18nKey="pages.Services.sebi-registration-no-inh000016719-1">SEBI Registration No:INH000016719</Trans></Trans></strong>
              </p>
              <p><Trans i18nKey="pages.Services.the-content-and-research-reports-provide"><Trans i18nKey="pages.Services.the-content-and-research-reports-provide-1">The content and research reports provided are for informational purposes only and do not constitute investment advice. Investments in the securities market are subject to market risks. Please read all related documents carefully before investing.</Trans></Trans></p>
              <p><Trans i18nKey="pages.Services.the-securities-quoted-are-for-illustrati"><Trans i18nKey="pages.Services.the-securities-quoted-are-for-illustrati-1">The securities quoted are for illustration only and are not recommendatory. Past performance is not indicative of future results.</Trans></Trans></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;