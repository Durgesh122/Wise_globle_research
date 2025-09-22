import React from 'react';
import { motion } from 'framer-motion';
// Using static layout and Footer-style logo styling (no framer-motion)

const images = [
  { src: require('../assets/images/ssl1.png') },
  { src: require('../assets/images/qva1.png') },
  { src: require('../assets/images/nsic1.png') },
  { src: require('../assets/images/msme1.png') },
  { src: require('../assets/images/ioslogo1.png') },
  { src: require('../assets/images/gaaf_logo1.png') },
];

const CertificationsSection = () => {
  const localized = [
    { name: 'SSL Certified', short: 'Secure connection', about: 'SSL encryption ensures secure data transmission.' },
    { name: 'QVA', short: 'Quality Verified', about: 'Quality assurance and verification accreditation.' },
    { name: 'NSIC', short: 'NSIC Registered', about: 'Registered with National Small Industries Corporation.' },
    { name: 'MSME', short: 'MSME Registered', about: 'Micro, Small & Medium Enterprises registration.' },
    { name: 'ISO', short: 'ISO Certified', about: 'International Organization for Standardization certification.' },
    { name: 'GAAF', short: 'GAAF Member', about: 'Member of the Global Association for Accredited Firms.' },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">We are Certified By</h2>

        {/* Single-line horizontal scroller for certification logos */}
        <div
          className="flex gap-6 overflow-x-auto py-2 px-2 snap-x snap-mandatory items-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="Certification logos scroll"
        >
          {images.map((img, idx) => {
            const L = localized[idx] || {};
            const resolvedSrc = img && (img.src && (img.src.default || img.src));
            return (
              <motion.div
                key={idx}
                className="cursor-pointer flex-none min-w-[160px] sm:min-w-[180px] p-3 flex flex-col items-center snap-center focus:outline-none"
                tabIndex={0}
                initial={{ y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="relative inline-block w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full p-1">
                  <motion.div
                    className="relative z-10 rounded-full border shadow-xl transition-transform duration-300 transform flex items-center justify-center"
                    style={{ background: '#D4e3ff', borderColor: 'rgba(0,0,0,0.06)', minHeight: '100%', width: '100%', height: '100%', boxSizing: 'border-box' }}
                    whileHover={{ scale: 1.06, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    {resolvedSrc ? (
                      <img
                        src={resolvedSrc}
                        alt={L.name || ''}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const ph = document.createElement('div');
                              ph.className = 'text-xs text-adaptive text-center';
                          ph.textContent = L.name || 'logo';
                  e.currentTarget.parentNode.appendChild(ph);
                        }}
                        className="w-full h-full object-contain block"
                      />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-adaptive rounded-full">{L.name || 'logo'}</div>
                    )}
                  </motion.div>
                </div>

                <div className="mt-3 text-center">
                  <p className="font-semibold text-sm sm:text-base text-adaptive">{L.name || ''}</p>
                  <p className="text-xs text-adaptive/80 mt-1">{L.short || ''}</p>
                </div>

                <div className="mt-2 sm:hidden px-2">
                  <div className="text-center text-xs text-gray-300">{L.about || ''}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm sm:text-base text-adaptive mt-6 max-w-3xl mx-auto">Recognized and certified by industry-leading organizations.</p>
      </div>
    </section>
  );
};

export default CertificationsSection;
