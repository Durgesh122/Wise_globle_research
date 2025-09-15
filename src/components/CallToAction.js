import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';

const CallToAction = ({ scrollToContactForm }) => (
  <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
    <motion.div
      className="container text-center rounded-xl p-6 sm:p-8 shadow-lg border-2 border-white/30 bg-white/20 backdrop-blur-lg hover:shadow-2xl text-adaptive"
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transformStyle: 'preserve-3d',
      }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Investment Journey Today</h2>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Join thousands of investors who trust our SEBI-registered research for financial success.
      </p>
      <motion.button
        onClick={scrollToContactForm}
        className="shine-hover px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-adaptive rounded-lg text-base sm:text-lg font-bold"
        whileHover={{ scale: 1.05, rotateY: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign Up Now <FaArrowRight className="inline ml-2" />
      </motion.button>
    </motion.div>
  </section>
);

export default CallToAction;