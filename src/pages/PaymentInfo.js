import React from 'react';
import { Trans } from '../i18nShim';
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
        ><Trans i18nKey="pages.PaymentInfo.payment-information">Payment Information</Trans></motion.h2>

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
          <div className="bg-red-600 text-white font-semibold text-base sm:text-lg py-2 px-3 sm:px-4 rounded mx-auto mb-4 shadow text-center w-fit"><Trans i18nKey="pages.PaymentInfo.idfc-first-bank">IDFC FIRST Bank</Trans></div>
          <h3 className="font-semibold text-white mb-3 text-center text-base sm:text-lg"><Trans i18nKey="pages.PaymentInfo.scan-pay">Scan & Pay</Trans></h3>
          <div className="w-full flex justify-center items-center mb-4">
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-lg border border-white shadow-inner overflow-hidden">
              <img
                src={qrImage}
                alt="QR Code"
                className="w-full h-full object-cover"
                decoding="async"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; }}
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
          <div className="bg-blue-600 text-white font-semibold text-base sm:text-lg py-2 px-3 sm:px-4 rounded mx-auto mb-4 shadow text-center w-fit"><Trans i18nKey="pages.PaymentInfo.hdfc-bank">HDFC BANK</Trans></div>
          <h3 className="font-semibold text-white mb-3 text-center text-base sm:text-lg"><Trans i18nKey="pages.PaymentInfo.scan-pay">Scan & Pay</Trans></h3>
            <div className="w-full flex justify-center items-center mb-4">
            <img
              src={require('../assets/images/Hdfc1.png')}
              alt="HDFC QR Code"
              className="w-40 h-40 sm:w-60 sm:h-60 rounded-lg border border-white shadow-inner object-contain"
              decoding="async"
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; }}
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
            <div className="font-bold text-blue-400 text-base sm:text-lg mb-2 text-center"><Trans i18nKey="pages.PaymentInfo.hdfc-bank">HDFC BANK</Trans></div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-xs sm:text-sm">
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-holder">Account Holder:</Trans></strong><Trans i18nKey="pages.PaymentInfo.wise-global-research-services-pvt-ltd"><Trans i18nKey="pages.PaymentInfo.wise-global-research-services-pvt-ltd-2">Wise Global Research Services Pvt Ltd</Trans></Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-number">Account Number:</Trans></strong> 50200098347178</span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.ifsc-code">IFSC Code:</Trans></strong><Trans i18nKey="pages.PaymentInfo.hdfc0008125">HDFC0008125</Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-type">Account Type:</Trans></strong><Trans i18nKey="pages.PaymentInfo.current">Current</Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.branch">Branch:</Trans></strong><Trans i18nKey="pages.PaymentInfo.ab-road-indore">AB Road, Indore</Trans></span>
            </div>
          </div>
          {/* IDFC FIRST BANK Details */}
          <div className="flex-1 bg-red-100/20 border border-red-400/30 rounded-xl p-3 sm:p-4 text-white shadow-md mx-0 md:mx-2">
            <div className="font-bold text-red-400 text-base sm:text-lg mb-2 text-center"><Trans i18nKey="pages.PaymentInfo.idfc-first-bank-1">IDFC FIRST BANK</Trans></div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-xs sm:text-sm">
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-holder">Account Holder:</Trans></strong><Trans i18nKey="pages.PaymentInfo.wise-global-research-services-pvt-ltd"><Trans i18nKey="pages.PaymentInfo.wise-global-research-services-pvt-ltd-1">Wise Global Research Services Pvt Ltd</Trans></Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-number">Account Number:</Trans></strong> 80123123121</span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.ifsc-code">IFSC Code:</Trans></strong><Trans i18nKey="pages.PaymentInfo.idfb0041269">IDFB0041269</Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.account-type">Account Type:</Trans></strong><Trans i18nKey="pages.PaymentInfo.current">Current</Trans></span>
              <span><strong><Trans i18nKey="pages.PaymentInfo.branch">Branch:</Trans></strong><Trans i18nKey="pages.PaymentInfo.vijay-nagar-indore">Vijay Nagar, Indore</Trans></span>
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
              <FaMoneyCheckAlt className="text-white text-xl" /><Trans i18nKey="pages.PaymentInfo.pay-via-ccavenue">Pay via CCAvenue</Trans></motion.button>
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
              <FaMoneyCheckAlt className="text-white text-xl" /><Trans i18nKey="pages.PaymentInfo.pay-via-payu">Pay via PayU</Trans></motion.button>
          </a>
        </motion.div>

        {/* Payment Note */}
        <motion.p
          className="text-center text-sm text-yellow-200 font-semibold mt-12"
          variants={fadeInUp}
          custom={6}
        >
          ⚠️ <strong><Trans i18nKey="pages.PaymentInfo.note">Note:</Trans></strong><Trans i18nKey="pages.PaymentInfo.we-accept-payments-only-through-the-deta"><Trans i18nKey="pages.PaymentInfo.we-accept-payments-only-through-the-deta-1">We accept payments only through the details listed above. Do not pay to any personal account.</Trans></Trans></motion.p>
      </motion.div>
    </motion.div>
  );
};


export default PaymentInfo;
