import React from 'react';
import { motion } from 'framer-motion';

const AlertBar = () => {
  // Static bilingual alert message
  const notePrefix = 'कृपया ध्यान दें –';
  const messageHi = 'प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते। Wise Global Research केवल अपने खाते में प्राप्त होने वाली राशियों के लिए सेवाएं प्रदान करने के लिए जिम्मेदार होगा।';
  const messageEn = 'Pay close attention—Dear Client, your payments will be accepted if you use the account information listed on the Wise Global Research website. We do not accept any payment in any other accounts besides Wise Global Research. Wise Global Research will only be liable to provide services for the amounts received in its account.';
  const alertMessage = `${messageHi} Note: ${messageEn}`;

  React.useEffect(() => {
    // Scroll to top to ensure visibility on refresh
    window.scrollTo(0, 0);
  }, []);

  const prefersReduced = React.useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  , []);

  // Seamless marquee using duplicated slides: move the track by 50% of its width
  const marqueeAnimate = (!prefersReduced)
    ? { x: ['0%', '-50%'] }
    : { x: 0 };
  const marqueeTransition = (!prefersReduced)
    ? { duration: 30, repeat: Infinity, ease: 'linear' }
    : { duration: 0 };

  // Dynamically offset below fixed navbar (and any Google Translate banner)
  const [navHeight, setNavHeight] = React.useState(0);
  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const measure = () => {
      const nav = document.querySelector('nav[role="navigation"]');
      const h = nav ? Math.round(nav.getBoundingClientRect().height) : 0;
      setNavHeight(h);
    };
    measure();
    window.addEventListener('resize', measure);
    let ro;
    const navEl = document.querySelector('nav[role="navigation"]');
    if (navEl && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(navEl);
    }
    return () => {
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      className="bg-white/30 backdrop-blur-sm text-white py-2"
      style={{ position: 'sticky', top: `calc(var(--nav-offset, 0px) + ${navHeight}px)`, zIndex: 49 }}
    >
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden" role="status" aria-live="polite">
          {/* Scrolling track */}
          <motion.div
            className="flex whitespace-nowrap items-center text-sm md:text-base will-change-transform transform-gpu"
            initial={{ x: 0 }}
            animate={marqueeAnimate}
            transition={marqueeTransition}
          >
            {/* Slide 1 */}
            <div className="flex shrink-0 items-center gap-2 pr-8">
              <strong className="flex-shrink-0">{notePrefix}</strong>
              <span>{alertMessage}</span>
            </div>
            {/* Slide 2 (duplicate for seamless loop) */}
            <div className="flex shrink-0 items-center gap-2 pr-8" aria-hidden="true">
              <strong className="flex-shrink-0">{notePrefix}</strong>
              <span>{alertMessage}</span>
            </div>
          </motion.div>

          {/* Control removed per request */}
        </div>
      </div>
    </div>
  );
};

export default AlertBar;