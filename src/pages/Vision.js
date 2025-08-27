// src/pages/Vision.js
import React from 'react';
import { FaChartLine, FaShieldAlt, FaBookOpen, FaLightbulb, FaBullseye } from 'react-icons/fa';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Vision pillars and core values data (same as before)
const visionPillars = [
  {
    id: 1,
    title: 'Empowering Wealth Creation',
    description: 'We aim to empower Indian traders and investors with strategies to build wealth through NSE, BSE, and MCX markets, focusing on stocks like RELIANCE and commodities like GOLD.',
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 2,
    title: 'Ethical Guidance',
    description: 'Our commitment to SEBI-compliant, transparent advice ensures trust and integrity in every recommendation, from Smart Options to MCX Supreme.',
    icon: <FaShieldAlt className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 3,
    title: 'Education and Insights',
    description: 'We provide regular blogs, webinars, and demos to educate investors on market trends, helping them navigate NIFTY and BANKNIFTY with confidence.',
    icon: <FaBookOpen className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 4,
    title: 'Innovative Technology',
    description: 'Leveraging AI and real-time data, we deliver cutting-edge tools for Indian traders, enhancing profitability in services like Universal Cash and Infinity Club.',
    icon: <FaLightbulb className="text-blue-300 text-4xl mb-4" />,
  },
];

const coreValues = [
  {
    id: 1,
    title: 'Transparency',
    description: 'We provide clear, honest, and SEBI-compliant advice, ensuring clients understand every recommendation and its risks.',
  },
  {
    id: 2,
    title: 'Client-Centric Approach',
  description: 'Our strategies are tailored to the needs of Indian investors all over India, from beginners to seasoned traders.',
  },
  {
    id: 3,
    title: 'Innovation',
    description: 'We use advanced analytics and AI to deliver high-probability trading signals for NSE, BSE, and MCX markets.',
  },
  {
    id: 4,
    title: 'Education',
    description: 'We empower clients with knowledge through workshops, blogs, and market updates, fostering informed decision-making.',
  },
  {
    id: 5,
    title: 'Integrity',
    description: 'Our commitment to ethical practices ensures we prioritize client trust and long-term success over short-term gains.',
  },
  {
    id: 6,
    title: 'Excellence',
    description: 'We strive for excellence in every service, from daily recommendations to personalized support for Indian traders.',
  },
];

const Vision = () => (
  <Layout>
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Vision & Mission</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visionPillars.map(p => (
          <Card key={p.id} className="p-6">
            <div className="text-center mb-4">
              {p.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
            <p className="text-white">{p.description}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className="container mx-auto py-12">
  <h2 className="text-2xl font-bold mb-6 text-center">Core Values</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {coreValues.map(v => (
          <Card key={v.id} className="p-6">
            <div className="text-center mb-4">
              <FaBullseye className="text-green-300 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{v.title}</h3>
            <p className="text-white">{v.description}</p>
          </Card>
        ))}
      </div>
    </section>
  </Layout>
);

export default Vision;