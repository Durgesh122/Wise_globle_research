import React from 'react';
import { motion } from 'framer-motion';

const AlertBar = ({ variant = 'attached' }) => {
  // Static bilingual alert message
  const notePrefix = 'कृपया ध्यान दें –';
  const messageHi = 'प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते। Wise Global Research केवल अपने खाते में प्राप्त होने वाली राशियों के लिए सेवाएं प्रदान करने के लिए जिम्मेदार होगा।';
  const messageEn = 'Pay close attention—Dear Client, your payments will be accepted if you use the account information listed on the Wise Global Research website. We do not accept any payment in any other accounts besides Wise Global Research. Wise Global Research will only be liable to provide services for the amounts received in its account.';
  const alertMessage = `${messageHi} Note: ${messageEn}`;

  // Do not force scroll on mount; placement should be controlled by caller.

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

  // Dynamically offset below fixed navbar only when attached variant is used
  const [navHeight, setNavHeight] = React.useState(0);
  React.useEffect(() => {
    if (variant !== 'attached') return undefined;
    if (typeof window === 'undefined') return undefined;
    let rafId = null;
    const read = () => {
      const nav = document.querySelector('nav[role="navigation"]');
      const h = nav ? Math.round(nav.getBoundingClientRect().height) : 0;
      setNavHeight(prev => (prev !== h ? h : prev));
    };
    const schedule = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        read();
      });
    };
    schedule();
    const onResize = () => schedule();
    window.addEventListener('resize', onResize, { passive: true });
    let ro;
    const navEl = document.querySelector('nav[role="navigation"]');
    if (navEl && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => schedule());
      ro.observe(navEl);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [variant]);

  const isAttached = variant === 'attached';
  // Alert color tokens (provided)
  const alertBackground = '#ee533fff';
  const alertBorderTop = '#e95b23ff';
  // Prevention of duplicate alerts across the site:
  // - Footer uses id='wise-global-alert' if present (has priority)
  // - We also use a document-level data marker `data-wise-alert` to ensure only
  //   one alert instance renders (covers multiple AlertBar mounts such as
  //   Navbar + Home). This works across client navigation and hydration.
  const [shouldRender, setShouldRender] = React.useState(() => {
    if (typeof document !== 'undefined') {
      // If Footer inserted an alert with id 'wise-global-alert', prefer that one.
      if (document.getElementById('wise-global-alert')) return false;
      // If another AlertBar already mounted and set the marker, don't render.
      if (document.documentElement && document.documentElement.dataset && document.documentElement.dataset.wiseAlert) return false;
      return true;
    }
    // During SSR assume render; client effect will reconcile.
    return true;
  });

  React.useEffect(() => {
    if (typeof document === 'undefined' || !shouldRender) return;
    // If a Footer alert exists after hydration, hide this AlertBar to avoid duplication.
    if (document.getElementById('wise-global-alert')) {
      setShouldRender(false);
      return;
    }
    // If another AlertBar set the marker after hydration, don't render.
    if (document.documentElement && document.documentElement.dataset && document.documentElement.dataset.wiseAlert) {
      setShouldRender(false);
      return;
    }
  }, [shouldRender]);

  // When we do render, mark the document so subsequent mounts won't render.
  React.useEffect(() => {
    if (!shouldRender) return undefined;
    if (typeof document === 'undefined') return undefined;
  const root = document.documentElement;
  root.dataset.wiseAlert = '1';
    return () => {
      // Only remove the marker if we set it (avoid removing footer's marker)
      if (root.dataset.wiseAlert === '1' && !document.getElementById('wise-global-alert')) {
        delete root.dataset.wiseAlert;
      }
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      id="wise-global-alertbar"
      className="w-screen left-0 right-0 notranslate"
      translate="no"
      style={isAttached
        ? { position: 'sticky', top: `calc(var(--nav-offset, 0px) + ${navHeight}px)`, zIndex: 49, backgroundColor: alertBackground, borderTop: `4px solid ${alertBorderTop}` }
        : { position: 'static', zIndex: 10, backgroundColor: alertBackground, borderTop: `4px solid ${alertBorderTop}` }
      }
      role="status"
      aria-live="polite"
      aria-hidden={false}
    >
      {/* Full-bleed track: centered content inside */}
      <div className="overflow-hidden" style={{ minHeight: 44 }}>
        <div className="max-w-[1300px] mx-auto px-4">
          <motion.div
            className="flex whitespace-nowrap items-center text-sm md:text-base will-change-transform transform-gpu text-white px-3 py-2"
            initial={{ x: 0 }}
            animate={marqueeAnimate}
            transition={marqueeTransition}
            style={{ gap: 24 }}
            translate="no"
          >
            {/* Slide 1 */}
            <div className="flex shrink-0 items-center gap-2 pr-8 notranslate" translate="no">
              <strong className="flex-shrink-0 notranslate" translate="no" style={{ color: 'white' }}>{notePrefix}</strong>
              <span className="notranslate" translate="no" style={{ color: 'white' }}>{alertMessage}</span>
            </div>
            {/* Slide 2 (duplicate for seamless loop) */}
            <div className="flex shrink-0 items-center gap-2 pr-8 notranslate" aria-hidden="true" translate="no">
              <strong className="flex-shrink-0 notranslate" translate="no" style={{ color: 'white' }}>{notePrefix}</strong>
              <span className="notranslate" translate="no" style={{ color: 'white' }}>{alertMessage}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AlertBar;