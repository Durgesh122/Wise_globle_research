
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BannerBg from '../assets/images/banner_bg.png';
import BannerBgMobile from '../assets/images/banner_bg_003.jpeg';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section 
      className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-screen flex items-center bg-cover bg-center text-black overflow-hidden hero-bg-responsive"
    >
  {/* (Overlay removed per request so background image shows normally) */}

      {/* Animated Blobs - behind the content but above the overlay */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        <motion.div
          className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob"
          style={{ top: '-10%', left: '-10%' }}
        ></motion.div>
        <motion.div
          className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ top: '-10%', right: '-10%' }}
        ></motion.div>
        <motion.div
          className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ bottom: '-10%' }}
        ></motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-black hero-text-white"
              variants={itemVariants}
              style={{ lineHeight: 1.05 }}
            >
              Actionable Research, Measurable Growth
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 hero-text-white"
              variants={itemVariants}
            >
              We turn data and insight into clear strategies and dashboards that lead to faster, measurable results.
            </motion.p>
            <motion.button
              onClick={() => navigate('/services')}
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.04, boxShadow: '0px 10px 30px rgba(59, 130, 246, 0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Talk Results <FaArrowRight className="ml-2 text-black" />
            </motion.button>
          </div>

          {/* Image/Illustration Content (removed by request) */}
          <motion.div className="md:w-1/2 flex justify-center" variants={itemVariants}>
            {/* illustration removed */}
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        .hero-bg-responsive {
          background-image: url(${BannerBg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        @media (max-width: 640px) {
          .hero-bg-responsive {
            background-image: url(${BannerBgMobile});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center 40px;
            width: 80vw;
            max-width: 95vw;
            height: 50vw;
            max-height: 60vw;
            min-height: unset;
            margin-left: auto;
            margin-right: auto;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-text-white {
            color: #fff !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.18);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
