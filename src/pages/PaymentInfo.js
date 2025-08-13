import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import qrImage from '../assets/images/QR.png'; // Ensure this image exists

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const PaymentInfo = () => {
  return (
    <motion.div
      className="relative min-h-screen py-20 px-4 text-white overflow-hidden bg-transparent backdrop-blur-none"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={fadeInUp}
        custom={0}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-md mb-10 underline decoration-[#64ed37] underline-offset-8"
          variants={fadeInUp}
          custom={1}
        >
          Payment Information
        </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        variants={fadeInUp}
        custom={2}
      >
        {/* QR Payment Block - IDFC FIRST Bank */}
        <motion.div
          className="bg-white/30 border border-white/30 p-4 sm:p-6 rounded-xl shadow-2xl backdrop-blur-xl hover:scale-105 transition duration-300 animate-float"
          variants={fadeInUp}
          custom={3}
        >
          <div className="bg-red-600 text-white font-semibold text-base sm:text-lg py-2 px-3 sm:px-4 rounded mx-auto mb-4 shadow text-center w-fit">
            IDFC FIRST Bank
          </div>
          <h3 className="font-semibold text-white mb-3 text-center text-base sm:text-lg">
            Scan & Pay
          </h3>
          <div className="w-full flex justify-center items-center mb-4">
            <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-lg border border-white shadow-inner overflow-hidden">
              <img
                src={qrImage}
                alt="QR Code"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* QR Payment Block - HDFC BANK */}
        <motion.div
          className="bg-white/30 border border-white/30 p-4 sm:p-6 rounded-xl shadow-2xl backdrop-blur-xl hover:scale-105 transition duration-300 animate-float"
          variants={fadeInUp}
          custom={3.5}
        >
          <div className="bg-blue-600 text-white font-semibold text-base sm:text-lg py-2 px-3 sm:px-4 rounded mx-auto mb-4 shadow text-center w-fit">
            HDFC BANK
          </div>
          <h3 className="font-semibold text-white mb-3 text-center text-base sm:text-lg">
            Scan & Pay
          </h3>
          <div className="w-full flex justify-center items-center mb-4">
            <img
              src={require('../assets/images/Hdfc1.png')}
              alt="HDFC QR Code"
              className="w-40 h-40 sm:w-60 sm:h-60 rounded-lg border border-white shadow-inner object-contain"
            />
          </div>
        </motion.div>

        {/* Bank Details Inline Section */}
        <motion.div
          className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch mt-4 md:mt-6"
          variants={fadeInUp}
          custom={3.8}
        >
          {/* HDFC BANK Details */}
          <div className="flex-1 bg-blue-100/20 border border-blue-400/30 rounded-xl p-3 sm:p-4 text-white shadow-md mx-0 md:mx-2 mb-3 md:mb-0">
            <div className="font-bold text-blue-400 text-base sm:text-lg mb-2 text-center">HDFC BANK</div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-xs sm:text-sm">
              <span><strong>Account Holder:</strong> Wise Global Research Services Pvt Ltd</span>
              <span><strong>Account Number:</strong> 50200098347178</span>
              <span><strong>IFSC Code:</strong> HDFC0008125</span>
              <span><strong>Account Type:</strong> Current</span>
              <span><strong>Branch:</strong> AB Road, Indore</span>
            </div>
          </div>
          {/* IDFC FIRST BANK Details */}
          <div className="flex-1 bg-red-100/20 border border-red-400/30 rounded-xl p-3 sm:p-4 text-white shadow-md mx-0 md:mx-2">
            <div className="font-bold text-red-400 text-base sm:text-lg mb-2 text-center">IDFC FIRST BANK</div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-xs sm:text-sm">
              <span><strong>Account Holder:</strong> Wise Global Research Services Pvt Ltd</span>
              <span><strong>Account Number:</strong> 80123123121</span>
              <span><strong>IFSC Code:</strong> IDFB0041269</span>
              <span><strong>Account Type:</strong> Current</span>
              <span><strong>Branch:</strong> Vijay Nagar, Indore</span>
            </div>
          </div>
        </motion.div>

          {/* ...existing code... */}
        </motion.div>

        {/* Payment Gateway Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center mt-10"
          variants={fadeInUp}
          custom={5}
        >
          <a
            href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/wise-global-research-services-pvt-ltd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.07, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-green-500/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-lg border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition duration-300"
            >
              <FaMoneyCheckAlt className="text-white text-xl" />
              Pay via CCAvenue
            </motion.button>
          </a>

          <a
            href="https://u.payu.in/hr313T3SHfRR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.07, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-yellow-500/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-lg border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition duration-300"
            >
              <FaMoneyCheckAlt className="text-white text-xl" />
              Pay via PayU
            </motion.button>
          </a>
        </motion.div>

        {/* Payment Note */}
        <motion.p
          className="text-center text-sm text-yellow-200 font-semibold mt-12"
          variants={fadeInUp}
          custom={6}
        >
          ⚠️ <strong>Note:</strong> We accept payments only through the details listed above. Do not pay to any personal account.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};


export default PaymentInfo;
