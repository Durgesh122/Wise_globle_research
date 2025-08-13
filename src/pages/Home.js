import { useRef, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { containerVariants } from '../utils/animationVariants';
import HeroSection from '../components/HeroSection';
import AlertBar from '../components/AlertBar';
import WhyChooseUs from '../components/WhyChooseUs';
import MarketOverview from '../components/MarketOverview';

import MarketInsights from '../components/MarketInsights';
import PerformanceMetrics from '../components/PerformanceMetrics';
import MethodologySection from '../components/MethodologySection';
import TeamSection from '../components/TeamSection';

import TestimonialsSection from '../components/TestimonialsSection';
// import SubscriptionPlans from '../components/SubscriptionPlans';
import CallToAction from '../components/CallToAction';
// import TimelineSection from '../components/TimelineSection';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import ComplaintTable from '../components/ComplaintTable';
import PopupForm from '../components/PopupForm';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const { t } = useTranslation();
  const contactFormRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]); // Dependencies for checkScrollTop


  

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]); // checkScrollTop is now stable


  return (
    <>
      <Helmet>
        <title>{t('home.helmet.title')}</title>
        <meta name="description" content={t('home.helmet.description')} />
        <meta property="og:title" content={t('home.helmet.title')} />
        <meta property="og:description" content={t('home.helmet.ogDescription')} />
        <meta property="og:url" content="https://wiseglobalresearch.com/" />
        <meta property="og:image" content="https://wiseglobalresearch.com/og-image.jpg" />
        <meta name="twitter:title" content={t('home.helmet.title')} />
        <meta name="twitter:description" content={t('home.helmet.twitterDescription')} />
        <meta name="twitter:image" content="https://wiseglobalresearch.com/og-image.jpg" />
      </Helmet>
      <motion.div
        className="min-h-screen bg-transparent text-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
        <AlertBar />
        <HeroSection />
        <WhyChooseUs />
        <MarketOverview />
        {/* <ServicesSection /> removed as per request */}
        <MarketInsights />
        <PerformanceMetrics />
        <MethodologySection />
        <TeamSection />
        <TestimonialsSection />
        {/* <SubscriptionPlans /> */}
        <CallToAction scrollToContactForm={scrollToContactForm} />
        {/* <TimelineSection /> removed as per request */}
        <FAQSection />
        <ContactFormSection contactFormRef={contactFormRef} />
        <ComplaintTable />
        {/* WhatsApp Chat Button on Main Screen */}
        <WhatsAppButton />
      </motion.div>
    </>
  );
};

export default Home;
