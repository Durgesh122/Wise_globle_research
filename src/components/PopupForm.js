import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImg from '../assets/images/wiseglobalresearch_4.png';

// Simplified image-only popup. Shows image and a close button.
const PopupForm = ({ onClose, forceShow = false }) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let timer;
    if (forceShow) {
      setVisible(true);
      return () => clearTimeout(timer);
    }

    if (location.pathname === '/') {
      setVisible(false);
      timer = setTimeout(() => setVisible(true), 1000);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timer);
  }, [location.pathname, forceShow]);

  // Close on Escape for accessibility. Use a ref to avoid effect dependency on `onClose`.
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setVisible(false);
        if (onCloseRef.current) onCloseRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (onCloseRef.current) onCloseRef.current();
  };

  if (!visible) return null;

  const popupContent = (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 right-0 bottom-0 z-[99999] flex items-center justify-center bg-black/50 p-4"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden mx-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.975, y: 12, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.975, y: 12, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          style={{
            width: '100%',
            /* Reduce maxWidth so popup appears smaller on desktop */
            maxWidth: 'min(800px, 92vw)',
            /* Limit height more strictly to keep image clear and not too large */
            maxHeight: '80vh',
            padding: 0,
            margin: '0 auto'
          }}
          role="dialog"
          aria-modal="true"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img
              src={HeroImg}
              alt="wiseglobalresearch"
              decoding="async"
              loading="lazy"
              /* Improve clarity: cap height, use cover to fill framed area, and enable crisp rendering */
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 'calc(80vh - 48px)',
                objectFit: 'contain',
                display: 'block',
                imageRendering: 'auto',
                WebkitFontSmoothing: 'antialiased'
              }}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/1100x700?text=wiseglobalresearch_4.png'; }}
            />
          </div>

          <button
            onClick={handleClose}
            aria-label="Close popup"
            title="Close popup"
            className="absolute right-3 top-3 bg-white/95 rounded-full p-2 text-gray-800 hover:bg-white"
            style={{ backdropFilter: 'blur(6px)', boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>✕</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Render into document.body to avoid stacking context problems (navbars, transforms)
  if (typeof document !== 'undefined') {
    return createPortal(popupContent, document.body);
  }

  return popupContent;
};

export default PopupForm;