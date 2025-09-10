// Rewritten HeroSection: runtime framer-motion loader + responsive picture srcset
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';
// Use placeholder/fallback PNG only if modern formats fail; dynamic responsive sources built from naming convention
import '../assets/images/slide1.png';
import '../assets/images/slide2.png';
import '../assets/images/slide4.png';
import { pictureSources, largest, buildPlaceholder } from '../utils/imageSources';

// framer-motion loaded after first hero image completes to avoid main-thread contention before LCP

const sliderImages = ['slide1','slide2','slide4'];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [motion, setMotion] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [backName, setBackName] = useState(sliderImages[0]);
  const [frontName, setFrontName] = useState(sliderImages[0]);
  const rafRef = useRef(null);

  // Reduced motion preference
  const prefersReduced = useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, []);

  useEffect(() => {
    if (prefersReduced) return undefined;
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [nextSlide, prefersReduced]);

  // Preload handled via Helmet tag below to avoid duplicates

  // Load framer-motion after first hero image is loaded
  useEffect(() => {
    if (!firstLoaded) return;
    let mounted = true;
    import('framer-motion')
      .then((mod) => {
        if (!mounted) return;
        setMotion({ MotionDiv: mod.motion.div, MotionButton: mod.motion.button });
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [firstLoaded]);

  const MotionDiv = motion?.MotionDiv || 'div';
  const MotionButton = motion?.MotionButton || 'button';

  const motionAvailable = Boolean(motion);
  const motionButtonProps = motionAvailable ? { whileHover: { scale: 1.05, rotateY: 10 }, whileTap: { scale: 0.95 } } : {};
  const motionDivProps = motionAvailable ? { variants: cardVariants, initial: 'hidden', animate: 'visible' } : {};

  // Prefetch adjacent slides to keep transitions smooth without lazy-loading intervention
  useEffect(() => {
    if (!sliderImages?.length) return;
    const preload = (idx) => {
      const name = sliderImages[idx];
      if (!name) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = largest(name, 'webp');
    };
    const next = (currentSlide + 1) % sliderImages.length;
    const prev = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
    preload(next);
    preload(prev);
  }, [currentSlide]);

  // On slide change, decode next image then crossfade front->back for smoothness
  useEffect(() => {
    const nextIdx = currentSlide;
  const nextName = sliderImages[nextIdx];
  if (!nextName) return;

    // If already showing, nothing to do
  if (frontName === nextName) return;

    let canceled = false;
    const img = new Image();
    img.decoding = 'async';
  img.src = largest(nextName, 'webp');
    const swap = () => {
      if (canceled) return;
      // Back layer becomes current
  setBackName(frontName);
  setFrontName(nextName);
      // Trigger crossfade
      setIsFading(true);
      // Ensure fade ends even if transitionend doesn’t fire
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTimeout(() => setIsFading(false), 550);
      });
    };
    if (img.decode) {
      img.decode().then(swap).catch(swap);
    } else {
      img.onload = swap;
      img.onerror = swap;
    }
    return () => {
      canceled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentSlide, frontName]);

  return (
    <section className="relative pt-0 flex items-center justify-center overflow-hidden" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <Helmet>
  <link rel="preload" as="image" href={largest(sliderImages[0], 'webp')} imagesrcset={`${largest(sliderImages[0], 'webp')} 1600w`} />
      </Helmet>
      <div className="absolute inset-0 z-0">
        {/* Double-buffered crossfade: back (fading out) and front (fading in) */}
        <div className="absolute inset-0 w-full h-full will-change-transform" style={{contain:'strict'}}>
      {/* Back layer (decorative) */}
      <picture>
            <source type="image/avif" srcSet={pictureSources(backName).avif} sizes="100vw" />
            <source type="image/webp" srcSet={pictureSources(backName).webp} sizes="100vw" />
            <img
        src={pictureSources(backName).fallback}
        alt=""
              className="w-full h-full object-cover pointer-events-none select-none"
              decoding="async"
              width="1600"
              height="900"
              sizes="100vw"
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translateZ(0)',
                opacity: isFading && !prefersReduced ? 0 : 1,
                transition: prefersReduced ? 'none' : 'opacity 500ms ease',
              }}
            />
          </picture>
          {/* Front layer (primary visual) */}
          <picture>
            <source type="image/avif" srcSet={pictureSources(frontName).avif} sizes="100vw" />
            <source type="image/webp" srcSet={pictureSources(frontName).webp} sizes="100vw" />
            <img
              src={pictureSources(frontName).fallback}
              alt="Research analytics visual"
              className="w-full h-full object-cover"
              decoding="async"
              fetchpriority="high"
              width="1600"
              height="900"
              sizes="100vw"
              importance="high"
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translateZ(0)',
                opacity: 1,
                transition: prefersReduced ? 'none' : 'opacity 500ms ease',
              }}
              onLoad={() => {
                if (currentSlide === 0 && !firstLoaded) setFirstLoaded(true);
              }}
              onError={(e) => {
                e.currentTarget.src = buildPlaceholder(frontName, 'webp');
                console.warn('Failed to load slide');
              }}
            />
          </picture>
        </div>

        <button onClick={prevSlide} aria-label="Previous slide" className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white">
          <FaChevronLeft />
        </button>
        <button onClick={nextSlide} aria-label="Next slide" className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl p-2 bg-black/50 rounded-full transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white">
          <FaChevronRight />
        </button>
      </div>

      <MotionDiv
        className="text-center px-2 sm:px-4 w-full max-w-3xl z-10 rounded-xl p-4 sm:p-6"
        style={{ background: firstLoaded ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255,255,255,0.12)', backdropFilter: firstLoaded ? 'blur(20px)' : 'none', WebkitBackdropFilter: firstLoaded ? 'blur(20px)' : 'none', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: firstLoaded ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none', transformStyle: 'preserve-3d', width: '100%', overflow: 'hidden' }}
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
