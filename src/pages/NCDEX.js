import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import Contact from './Contact';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Reusable Section Component
const Section = ({ title, children }) => (
  <section className="py-12 px-6 md:px-16 bg-white/30 backdrop-blur-md text-white rounded-lg mb-8">
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

// Chart Config
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Agri Commodity Price Index',
      data: [120, 130, 125, 140, 135, 145],
      fill: true,
      backgroundColor: 'rgba(213, 113, 91, 0.2)',
      borderColor: 'rgba(213, 113, 91, 1)'
    }
  ]
};

const pieData = {
  labels: ['Wheat', 'Chana', 'Soybean', 'Mustard', 'Guar'],
  datasets: [
    {
      label: 'Top Traded Commodities',
      data: [25, 20, 15, 30, 10],
      backgroundColor: [
        'rgba(213, 113, 91, 0.6)',
        'rgba(248, 197, 105, 0.6)',
        'rgba(144, 190, 109, 0.6)',
        'rgba(107, 131, 202, 0.6)',
        'rgba(255, 138, 128, 0.6)'
      ]
    }
  ]
};

const NCDEXPage = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  if (showContactForm) {
    return <Contact />;
  }
  return (
    <main className="bg-transparent text-white">
      {/* Hero Section */}
      <section className="py-20 px-8 text-center bg-white/30 backdrop-blur-md rounded-lg mx-auto max-w-6xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        ><Trans i18nKey="pages.NCDEX.empowering-bharat-through-ncdex">Empowering Bharat Through NCDEX</Trans></motion.h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto"><Trans i18nKey="pages.NCDEX.learn-understand-and-participate-in-the-"><Trans i18nKey="pages.NCDEX.learn-understand-and-participate-in-the--1">Learn, understand and participate in the agri-commodity ecosystem through regulated, transparent markets.</Trans></Trans></p>
      </section>

      {/* Why NCDEX */}
      <div className="mt-12">
        <Section title="Why NCDEX?">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2"><Trans i18nKey="pages.NCDEX.india-s-agri-futures-market">India’s Agri Futures Market</Trans></h3>
              <p><Trans i18nKey="pages.NCDEX.ncdex-provides-a-robust-transparent-and-"><Trans i18nKey="pages.NCDEX.ncdex-provides-a-robust-transparent-and--1">NCDEX provides a robust, transparent and regulated platform to trade agri commodities – enabling better price discovery and risk management.</Trans></Trans></p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2"><Trans i18nKey="pages.NCDEX.support-for-farmers">Support for Farmers</Trans></h3>
              <p><Trans i18nKey="pages.NCDEX.through-farmer-producer-organizations-fp"><Trans i18nKey="pages.NCDEX.through-farmer-producer-organizations-fp-1">Through Farmer Producer Organizations (FPOs), NCDEX connects grassroots participants to national markets.</Trans></Trans></p>
            </div>
          </div>
        </Section>
      </div>

      {/* Why Choose Us */}
      <Section title="Why Choose Us?">
        <div className="space-y-4">
          <p><Trans i18nKey="pages.NCDEX.we-aim-to-spread-awareness-and-education"><Trans i18nKey="pages.NCDEX.we-aim-to-spread-awareness-and-education-1">We aim to spread awareness and education around the Indian agri-commodity ecosystem through NCDEX. Our goal is to empower farmers, agri-startups, and commodity enthusiasts with transparent market knowledge and digital tools.</Trans></Trans></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><Trans i18nKey="pages.NCDEX.sebi-compliant-knowledge-driven-content"><Trans i18nKey="pages.NCDEX.sebi-compliant-knowledge-driven-content-1">SEBI-compliant, knowledge-driven content</Trans></Trans></li>
            <li><Trans i18nKey="pages.NCDEX.educational-material-for-farmers-and-rur"><Trans i18nKey="pages.NCDEX.educational-material-for-farmers-and-rur-1">Educational material for farmers and rural cooperatives</Trans></Trans></li>
            <li><Trans i18nKey="pages.NCDEX.workshops-and-webinars-on-commodity-mark"><Trans i18nKey="pages.NCDEX.workshops-and-webinars-on-commodity-mark-1">Workshops and webinars on commodity markets</Trans></Trans></li>
            <li><Trans i18nKey="pages.NCDEX.market-research-and-academic-resources"><Trans i18nKey="pages.NCDEX.market-research-and-academic-resources-1">Market research and academic resources</Trans></Trans></li>
            <li><Trans i18nKey="pages.NCDEX.mobile-dashboards-for-commodity-tracking"><Trans i18nKey="pages.NCDEX.mobile-dashboards-for-commodity-tracking-1">Mobile dashboards for commodity tracking</Trans></Trans></li>
            <li><Trans i18nKey="pages.NCDEX.collaborations-with-agri-tech-platforms"><Trans i18nKey="pages.NCDEX.collaborations-with-agri-tech-platforms-1">Collaborations with agri-tech platforms</Trans></Trans></li>
          </ul>
        </div>
      </Section>

      {/* Commodity Insights */}
      <Section title="Commodity Insights">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-4">
            <Line data={lineData} />
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-4">
            <Pie data={pieData} />
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6 bg-white/30 backdrop-blur-md rounded-lg mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl font-bold mb-4 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ><Trans i18nKey="pages.NCDEX.ready-to-learn-more">Ready to Learn More?</Trans></motion.h2>
        <p className="text-white mb-6"><Trans i18nKey="pages.NCDEX.explore-our-knowledge-hub-and-stay-updat"><Trans i18nKey="pages.NCDEX.explore-our-knowledge-hub-and-stay-updat-1">Explore our knowledge hub and stay updated on India's agricultural market evolution.</Trans></Trans></p>
        <button
          onClick={() => setShowContactForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition inline-block"
        ><Trans i18nKey="pages.NCDEX.contact-us">Contact Us</Trans></button>
      </section>
    </main>
  );
};

export default NCDEXPage;
