import React from 'react';
import { motion } from 'framer-motion';
import { ALERT_BILINGUAL } from '../constants/alertMessage';

const AlertBar = ({ variant = 'attached' }) => {
  const message = ALERT_BILINGUAL;

  const prefersReduced = React.useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  , []);

  // Animate the container by 50% of its own width. Since the container holds the message twice,
  // this creates a perfect, seamless loop.
  const marqueeAnimate = !prefersReduced ? { x: ['0%', '-50%'] } : { x: 0 };
  const marqueeTransition = !prefersReduced ? { duration: 40, repeat: Infinity, ease: 'linear' } : { duration: 0 };

  const [navHeight, setNavHeight] = React.useState(0);
  React.useEffect(() => {
    if (variant !== 'attached' || typeof window === 'undefined') return;

    let rafId = null;
    const nav = document.querySelector('nav[role="navigation"]');

    const updateNavHeight = () => {
      const h = nav ? Math.round(nav.getBoundingClientRect().height) : 0;
      setNavHeight(h);
      rafId = null;
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateNavHeight);
      }
    };

    scheduleUpdate();

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (nav) {
      resizeObserver.observe(nav);
    }
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', scheduleUpdate);
      if (nav) resizeObserver.unobserve(nav);
    };
  }, [variant]);

  const isAttached = variant === 'attached';
  const alertBackground = '#ff6551f6';
  const alertBorderTop = '#ff6551f6';

  const [shouldRender, setShouldRender] = React.useState(true);
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.getElementById('wise-global-alert') || document.documentElement.dataset.wiseAlert) {
        setShouldRender(false);
      } else {
        document.documentElement.dataset.wiseAlert = 'true';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        delete document.documentElement.dataset.wiseAlert;
      }
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="wise-global-alertbar"
      className="w-screen left-0 right-0 notranslate overflow-hidden"
      translate="no"
      style={{
        position: isAttached ? 'sticky' : 'static',
        top: isAttached ? `calc(var(--nav-offset, 0px) + ${navHeight}px)` : 'auto',
        zIndex: 49,
        backgroundColor: alertBackground,
        borderTop: `4px solid ${alertBorderTop}`,
        color: 'white',
        minHeight: 44,
      }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="inline-flex whitespace-nowrap items-center text-sm md:text-base will-change-transform transform-gpu py-2"
        animate={marqueeAnimate}
        transition={marqueeTransition}
      >
        {/* The message is duplicated with padding to create a seamless loop. */}
        <span className="shrink-0 px-8">{message}</span>
        <span className="shrink-0 px-8" aria-hidden="true">{message}</span>
      </motion.div>
    </div>
  );
};

export default AlertBar;