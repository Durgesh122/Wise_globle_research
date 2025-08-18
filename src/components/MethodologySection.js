import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import step1 from '../assets/images/imgStep01.png';
import step2 from '../assets/images/imgStep02.png';
import step3 from '../assets/images/imgStep03.png';

const MethodologySection = () => {
  const { t } = useTranslation();
  const rawSteps = t('home.methodologySection.steps', { returnObjects: true });
  const steps = Array.isArray(rawSteps)
    ? rawSteps
    : (rawSteps && typeof rawSteps === 'object')
      ? Object.values(rawSteps)
      : [];
  const images = [step1, step2, step3];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('home.methodologySection.heading')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-md border-2 border-white/30 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src={images[idx] || images[0]} alt={step.title || ''} className="w-20 h-20 mb-4 object-contain" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-100">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;