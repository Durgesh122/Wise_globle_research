import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';

import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide4 from '../assets/images/slide4.png';

// slide3 was causing a module resolution error in some build environments.
// Use slide4 (available in the assets) instead to ensure the slider works.
const sliderImages = [slide1, slide2, slide4];

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section
      className="relative pt-16 flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => {
              e.target.src = '/logo192.png';
              console.warn(`Failed to load image: ${image}`);
            }}
          />
        ))}
        <button
          onClick={prevSlide}
          aria-label={t('hero.previousSlide', 'Previous slide')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          aria-label={t('hero.nextSlide', 'Next slide')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* FIX: Wrap the content inside a motion.div */}
      <motion.div
        className="text-center px-2 sm:px-4 w-full max-w-3xl z-10 rounded-xl p-4 sm:p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
          width: '100%',
          overflow: 'hidden',
        }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1
          className="font-bold mb-4 animate-float break-words overflow-wrap break-word min-w-0 w-full"
          style={{
            fontSize: 'clamp(1.5rem, 6vw, 2.8rem)',
            wordBreak: 'break-all',
            overflow: 'hidden',
            textWrap: 'balance',
            width: '100%',
            lineHeight: 1.2,
            fontFamily: 'Noto Sans, Mangal, Arial, sans-serif',
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {t('hero.title')}
          </span>
        </h1>
        <motion.button
          onClick={() => navigate('/services')}
          className="shine-hover px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base sm:text-lg font-bold break-words overflow-wrap break-word min-w-0 whitespace-normal w-full max-w-xs"
          style={{
            wordBreak: 'break-all',
            overflow: 'hidden',
            minWidth: 0,
            width: '100%',
            maxWidth: '320px',
          }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('hero.getStarted')} <FaArrowRight className="inline ml-2" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
