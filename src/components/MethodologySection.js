import React from 'react';
import { motion } from 'framer-motion';
import step1 from '../assets/images/imgStep01.png';
import step2 from '../assets/images/imgStep02.png';
import step3 from '../assets/images/imgStep03.png';

const steps = [
  {
    img: step1,
    title: 'Customer-Centric Approach',
    desc: 'Prioritize customer needs, preferences, and feedback to tailor products/services, enhancing satisfaction and loyalty, fostering long-term relationships.'
  },
  {
    img: step2,
    title: 'Risk Mitigation',
    desc: 'Identify, assess, and address potential threats to minimize negative impacts on operations, finances, reputation, and stakeholder interests.'
  },
  {
    img: step3,
    title: 'Creative Solutions',
    desc: 'Think innovatively to devise unique, effective answers to challenges, leveraging imagination, resourcefulness, and diverse perspectives for problem-solving success.'
  },
];

const MethodologySection = () => (
  <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
    <div className="container">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Steps We Follow During Work
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
            <img src={step.img} alt={step.title} className="w-20 h-20 mb-4 object-contain" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-sm sm:text-base text-gray-100">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MethodologySection;