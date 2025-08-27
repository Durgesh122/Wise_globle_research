import { useRef, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
// i18n removed: using static English strings in this page
import { containerVariants } from '../utils/animationVariants';
import HeroSection from '../components/HeroSection';
import AlertBar from '../components/AlertBar';
import WhyChooseUs from '../components/WhyChooseUs';
import MarketOverview from '../components/MarketOverview';
import EconomicCalendar from '../components/EconomicCalendar';

import MarketInsights from '../components/MarketInsights';
import MethodologySection from '../components/MethodologySection';
// import TeamSection from '../components/TeamSection'; // Temporarily disabled on Home page
import TradingViewTicker from './TradingViewTicker';

// ...TestimonialsSection removed from home page
// import SubscriptionPlans from '../components/SubscriptionPlans';
import CallToAction from '../components/CallToAction';
// import TimelineSection from '../components/TimelineSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactFormSection from '../components/ContactFormSection';
import ComplaintTable from '../components/ComplaintTable';
import PopupForm from '../components/PopupForm';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  // translations removed; using static English text below
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
        <title>Wise Global Research Services — Market Research & Insights</title>
        <meta name="description" content="Wise Global Research Services delivers market research, analytics, and data-driven insights to help businesses make informed decisions." />
        <meta property="og:title" content="Wise Global Research Services — Market Research & Insights" />
        <meta property="og:description" content="Market research, analytics, and strategic insights from Wise Global Research Services." />
        <meta property="og:url" content="https://wiseglobalresearch.com/" />
        <meta property="og:image" content="https://wiseglobalresearch.com/og-image.jpg" />
        <meta name="twitter:title" content="Wise Global Research Services — Market Research & Insights" />
        <meta name="twitter:description" content="Wise Global Research Services delivers market research, analytics, and data-driven insights to help businesses make informed decisions." />
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
       <TradingViewTicker />
        <HeroSection />
        <WhyChooseUs />
        <MarketOverview />
        <EconomicCalendar embedUrl="https://widget.myfxbook.com/widget/calendar.html" />
        {/* <ServicesSection /> removed as per request */}
        <MarketInsights />
        <MethodologySection />
  {/* <TeamSection />  // Temporarily disabled on Home page */}
        <CallToAction scrollToContactForm={scrollToContactForm} />
         {/* <TimelineSection /> removed as per request */}
        <CertificationsSection />
        <ContactFormSection contactFormRef={contactFormRef} />
        <ComplaintTable />
        {/* WhatsApp Chat Button on Main Screen */}
        <WhatsAppButton />
      </motion.div>
    </>
  );
};

export default Home;
