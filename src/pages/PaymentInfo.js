import React, { useContext } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt, FaUniversity } from 'react-icons/fa';
import qrImage from '../assets/images/QR.png';
import hdfcQrImage from '../assets/images/Hdfc1.png';
import hdfcLogo from '../assets/images/hdfc.png';
import idfcLogo from '../assets/images/idfc.png';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut"
    },
  }),
};

const PaymentInfo = () => {
  const { textColor } = useContext(ThemeContext);
  const bankDetails = [
    {
      bankName: "HDFC BANK",
      logo: hdfcLogo,
      details: [
        { label: "Account Holder", value: "Wise Global Research Services Pvt Ltd" },
        { label: "Account Number", value: "50200098347178" },
        { label: "IFSC Code", value: "HDFC0008125" },
        { label: "Account Type", value: "Current" },
        { label: "Branch", value: "AB Road, Indore" },
      ],
      theme: "blue"
    },
    {
      bankName: "IDFC FIRST BANK",
      logo: idfcLogo,
      details: [
        { label: "Account Holder", value: "Wise Global Research Services Pvt Ltd" },
        { label: "Account Number", value: "80123123121" },
        { label: "IFSC Code", value: "IDFB0041269" },
        { label: "Account Type", value: "Current" },
        { label: "Branch", value: "Vijay Nagar, Indore" },
      ],
      theme: "red"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Payment Info - Wise Global Research</title>
        <meta name="description" content="Payment information for Wise Global Research services. Pay via QR code, bank transfer, or payment gateways." />
        <link rel="canonical" href="https://wiseglobalresearch.com/paymentinfo" />
      </Helmet>

      <motion.section
        className="relative py-8 sm:py-10 lg:py-14 px-4 sm:px-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="container max-w-4xl mx-auto relative z-10">
          <motion.div
            className="mb-6 rounded-2xl p-4 sm:p-6 shadow-2xl"
            style={{
              background: '#fff',
              border: '2px solid #6366f1',
              boxShadow: '0 8px 32px 0 rgba(60,60,120,0.18), 0 1.5px 8px 0 rgba(99,102,241,0.10)'
            }}
          >
            <div style={{ color: textColor || '#0b1220' }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: '#6366f1' }}><Trans i18nKey="pages.PaymentInfo.payment-information">Payment Information</Trans></h1>
              <div className="space-y-5 text-sm sm:text-base leading-relaxed" style={{ color: textColor || '#0b1220' }}>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  style={{ color: '#000000' }}
                  className="text-center mx-auto max-w-2xl text-sm sm:text-base"
                >
                  <Trans i18nKey="pages.PaymentInfo.payment-intro">Choose your preferred method to complete the payment. We accept payments via QR Code, Bank Transfer, and popular payment gateways.</Trans>
                </motion.p>

                {/* QR / Bank panels */}
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                  {bankDetails.map((bank, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-4 xs:p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-indigo-50"
                      variants={fadeInUp}
                      custom={2 + index * 0.5}
                    >
                      <img
                        src={bank.logo}
                        alt={`${bank.bankName} Logo`}
                        className="h-14 xs:h-16 sm:h-20 mb-3 sm:mb-4 object-contain"
                        loading="lazy"
                      />
                      <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2"><Trans i18nKey="pages.PaymentInfo.scan-pay">Scan & Pay</Trans></h3>
                      <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 p-2 rounded-lg">
                        <div
                          className="rounded-md p-2 w-full h-full flex items-center justify-center shadow-inner"
                          style={{ backgroundColor: '#ffffff', border: `1px solid ${textColor || '#c7d2fe'}` }}
                        >
                          <img
                            src={bank.bankName === 'HDFC BANK' ? hdfcQrImage : qrImage}
                            alt="QR Code"
                            className="max-w-full max-h-full object-contain filter contrast-125"
                            style={{ imageRendering: 'auto' }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="mb-8 sm:mb-12">
                  <h2 className="text-2xl xs:text-3xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-5 sm:mb-8">
                    <Trans i18nKey="pages.PaymentInfo.bank-transfer-details">Bank Transfer Details</Trans>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {bankDetails.map((bank, index) => (
                      <motion.div
                        key={index}
                        className={`bg-white p-4 xs:p-5 sm:p-6 rounded-2xl shadow-lg border-t-4`}
                        style={{ borderTopColor: bank.theme === 'blue' ? '#4f46e5' : '#ef4444' }}
                        variants={fadeInUp}
                        custom={4 + index * 0.5}
                      >
                        <div className="flex items-center mb-3 sm:mb-4">
                          <FaUniversity className={`text-2xl xs:text-3xl mr-3 sm:mr-4`} style={{ color: bank.theme === 'blue' ? '#4f46e5' : '#ef4444' }} />
                          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{bank.bankName}</h3>
                        </div>
                        <ul className="space-y-2 xs:space-y-3">
                          {bank.details.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex flex-col xs:flex-row justify-between xs:items-center text-xs xs:text-sm">
                              <strong className="text-gray-600 dark:text-gray-400 mb-1 xs:mb-0"><Trans i18nKey={`pages.PaymentInfo.${item.label.toLowerCase().replace(/ /g, '-')}`}>{item.label}:</Trans></strong>
                              <span className="text-gray-800 dark:text-gray-200 font-medium text-right">{item.value}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl xs:text-3xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-5 sm:mb-8">
                    <Trans i18nKey="pages.PaymentInfo.payment-gateways">Payment Gateways</Trans>
                  </h2>
                  <div className="flex flex-col xs:flex-row items-center justify-center gap-4 xs:gap-6">
                    <motion.a
                      href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/wise-global-research-services-pvt-ltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(79,70,229,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 xs:gap-3 w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-all duration-300 text-sm xs:text-base"
                    >
                      <FaMoneyCheckAlt className="text-xl xs:text-2xl" />
                      <span><Trans i18nKey="pages.PaymentInfo.pay-via-ccavenue">Pay via CCAvenue</Trans></span>
                    </motion.a>
                    <motion.a
                      href="https://u.payu.in/hr313T3SHfRR"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(79,70,229,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 xs:gap-3 w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-indigo-50 text-indigo-700 font-semibold rounded-xl shadow-sm hover:bg-indigo-100 transition-all duration-300 text-sm xs:text-base border border-indigo-100"
                    >
                      <FaMoneyCheckAlt className="text-xl xs:text-2xl text-indigo-700" />
                      <span><Trans i18nKey="pages.PaymentInfo.pay-via-payu">Pay via PayU</Trans></span>
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div className="max-w-3xl mx-auto bg-white border border-indigo-100 p-4 xs:p-5 rounded-lg shadow-sm">
                  <p className="font-semibold text-sm text-indigo-700">
                    <strong><Trans i18nKey="pages.PaymentInfo.note">Note:</Trans></strong>
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <Trans i18nKey="pages.PaymentInfo.payment-warning">We accept payments only through the details listed above. Do not transfer to any personal account to avoid fraud.</Trans>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default PaymentInfo;