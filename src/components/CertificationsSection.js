import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const images = [
  { src: require('../assets/images/ssl.png') },
  { src: require('../assets/images/Verified.png') },
  { src: require('../assets/images/qva.png') },
  { src: require('../assets/images/nsic.png') },
  { src: require('../assets/images/msme.png') },
  { src: require('../assets/images/ioslogo.jpg') },
  { src: require('../assets/images/gaaf_logo.png') },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 14 } },
  hover: {},
};

const imageVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 0 },
  hover: { rotate: 360, transition: { duration: 0.9, ease: 'easeInOut' } },
};

// (bg rotating text removed - replaced by image highlight on hover/focus)

// overlayVariants removed (unused) — overlay uses CSS group-hover/group-focus instead

const CertificationsSection = () => {
  const { t } = useTranslation();
  const items = t('home.certifications.items', { returnObjects: true });

  // items should be an array with name/short/about per logo; fall back to empty values if not present
  const localized = Array.isArray(items) ? items : [];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          We are Certified By
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start justify-items-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {images.map((img, idx) => {
            const L = localized[idx] || {};
            // resolve src that may be either a module with .default or a string
            const resolvedSrc = img && (img.src && (img.src.default || img.src));
            return (
            <motion.div
              key={idx}
              className="relative w-36 sm:w-40 md:w-44 lg:w-40 p-3 flex flex-col items-center group focus:outline-none"
              variants={item}
              whileHover="hover"
              tabIndex={0}
            >
              {/* rotating background text removed; image will highlight on hover/focus */}

              <motion.div
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white/30 flex items-center justify-center overflow-hidden border border-white/10 p-3 transform transition-all duration-200 ease-out group-hover:scale-105 group-focus:scale-105 group-hover:bg-white/40 group-focus:bg-white/40 group-hover:shadow-xl group-focus:shadow-xl"
                variants={imageVariants}
              >
                {resolvedSrc ? (
                  <motion.img
                    src={resolvedSrc}
                    data-src={resolvedSrc}
                    alt={L.name || ''}
                    loading="lazy"
                    onError={(e) => {
                      // show placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      const ph = document.createElement('div');
                      ph.className = 'text-xs text-white/90 text-center';
                      ph.textContent = L.name || 'logo';
                      e.currentTarget.parentNode.appendChild(ph);
                    }}
                    className="w-3/4 h-3/4 object-contain z-10 transform transition-transform duration-200 ease-out group-hover:scale-110 group-focus:scale-110"
                  />
                ) : (
                  <div className="w-3/4 h-3/4 flex items-center justify-center text-xs text-white/90">{L.name || 'logo'}</div>
                )}
              </motion.div>

              <div className="mt-3 text-center">
                <p className="font-semibold text-sm sm:text-base">{L.name || ''}</p>
                <p className="text-xs text-gray-300 mt-1">{L.short || ''}</p>
              </div>

              {/* Mobile: show about text below (always visible on small screens) */}
              <div className="mt-2 sm:hidden px-2">
                <div className="text-center text-xs text-gray-300">{L.about || ''}</div>
              </div>

              {/* Desktop hover overlay removed - about text stays on mobile only */}
            </motion.div>
            );
          })}
        </motion.div>

  <p className="text-center text-sm sm:text-base text-gray-200 mt-6 max-w-3xl mx-auto">{t('home.certifications.footer')}</p>
      </div>
    </section>
  );
};

export default CertificationsSection;
