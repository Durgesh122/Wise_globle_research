// Rewritten HeroSection: runtime framer-motion loader + responsive picture srcset
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';
import slide1Img from '../assets/images/slide1.png';
import slide2Img from '../assets/images/slide2.png';
import slide4Img from '../assets/images/slide4.png';

// runtime loader for framer-motion (keeps initial bundle smaller)
const useMotionLoader = () => {
  const [motionComponents, setMotionComponents] = useState(null);
  useEffect(() => {
    let mounted = true;
    import('framer-motion')
      .then((mod) => {
        if (!mounted) return;
        setMotionComponents({ MotionDiv: mod.motion.div, MotionButton: mod.motion.button });
      })
      .catch(() => {
        if (!mounted) return;
        setMotionComponents(null);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return motionComponents;
};

const sliderImages = [
  
  { name: 'slide1', original: slide1Img },
  { name: 'slide2', original: slide2Img },
  { name: 'slide4', original: slide4Img },
];

const HeroSection = () => {
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

  const motion = useMotionLoader();
  const MotionDiv = motion?.MotionDiv || 'div';
  const MotionButton = motion?.MotionButton || 'button';

  const motionAvailable = Boolean(motion);
  const motionButtonProps = motionAvailable ? { whileHover: { scale: 1.05, rotateY: 10 }, whileTap: { scale: 0.95 } } : {};
  const motionDivProps = motionAvailable ? { variants: cardVariants, initial: 'hidden', animate: 'visible' } : {};

  return (
    <section className="relative pt-16 flex items-center justify-center overflow-hidden" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={image.original}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === currentSlide ? 'eager' : 'lazy'}
              decoding={index === currentSlide ? 'sync' : 'async'}
              fetchpriority={index === currentSlide ? 'high' : 'low'}
              width="1600"
              height="900"
              onError={(e) => {
                e.currentTarget.src = '/logo192.png';
                console.warn(`Failed to load image: ${image.name}`);
              }}
            />
          </div>
        ))}

        <button onClick={prevSlide} aria-label="Previous slide" className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white">
          <FaChevronLeft />
        </button>
        <button onClick={nextSlide} aria-label="Next slide" className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white">
          <FaChevronRight />
        </button>
      </div>

      <MotionDiv
        className="text-center px-2 sm:px-4 w-full max-w-3xl z-10 rounded-xl p-4 sm:p-6"
        style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', transformStyle: 'preserve-3d', width: '100%', overflow: 'hidden' }}
        {...motionDivProps}
      >
        <h1 className="font-bold mb-4 animate-float break-words overflow-wrap break-word min-w-0 w-full" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.8rem)', wordBreak: 'break-all', overflow: 'hidden', textWrap: 'balance', width: '100%', lineHeight: 1.2, fontFamily: 'Noto Sans, Mangal, Arial, sans-serif' }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Research Analyst</span>
        </h1>
        <MotionButton
          onClick={() => navigate('/services')}
          className="shine-hover px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base sm:text-lg font-bold break-words overflow-wrap break-word min-w-0 whitespace-normal w-full max-w-xs"
          style={{ wordBreak: 'break-all', overflow: 'hidden', minWidth: 0, width: '100%', maxWidth: '320px' }}
          {...motionButtonProps}
        >
          Get Started <FaArrowRight className="inline ml-2" />
        </MotionButton>
      </MotionDiv>
    </section>
  );
};

export default HeroSection;
