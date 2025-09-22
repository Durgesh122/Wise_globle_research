import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';

const CallToAction = ({ scrollToContactForm }) => (
  <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
  <div className="container max-w-3xl mx-auto">
      <motion.div
        className="rounded-lg overflow-hidden"
        style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', color: '#111' }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-4 py-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#111' }}>Start Your Investment Journey Today</h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: '#111' }}>
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
        </div>
      </motion.div>
    </div>
  </section>
);

export default CallToAction;