// src/pages/Privacy.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaEye, FaEnvelope, FaSync } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Wise Global Research</title>
        <meta name="description" content="Read the privacy policy of Wise Global Research Services. Learn how we protect your data and privacy as a SEBI registered research analyst." />
        <meta property="og:title" content="Privacy Policy | Wise Global Research" />
        <meta property="og:description" content="Read the privacy policy of Wise Global Research Services. Learn how we protect your data and privacy as a SEBI registered research analyst." />
        <meta property="og:url" content="https://wiseglobalresearch.com/privacy" />
        <meta property="og:image" content="https://wiseglobalresearch.com/og-image.jpg" />
        <meta name="twitter:title" content="Privacy Policy | Wise Global Research" />
        <meta name="twitter:description" content="Read the privacy policy of Wise Global Research Services. Learn how we protect your data and privacy as a SEBI registered research analyst." />
        <meta name="twitter:image" content="https://wiseglobalresearch.com/og-image.jpg" />
      </Helmet>
      <motion.div
      className="container mx-auto py-12 px-4"
      style={{ backgroundColor: 'transparent' }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
    >
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        variants={fadeIn}
      >
        <FaShieldAlt className="inline mr-2" /> Privacy Policy
      </motion.h1>

      <motion.section variants={fadeIn} className="mb-8">
        <p className="text-base leading-relaxed">
          Wise Global Research Services Pvt Ltd. would like to thank you for visiting our website. Respecting the privacy and choices of our online customers and visitors is important for us. We hope that the information provided below will address any questions or concerns you may have about privacy issues.
        </p>
        <p className="text-base leading-relaxed mt-4">
          From time to time, we may request your valuable feedback for the evaluation of the services that Wise Global Research Services Pvt Ltd. provides and changes if you prefer any. We might invite you to actively participate in polls or surveys that may be posted on our website or mailed to you directly. Participation in survey or polls is completely voluntary.
        </p>
      </motion.section>

      <motion.section variants={fadeIn} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Website Visits</h2>
        <p className="text-base leading-relaxed">
          Generally, you may visit <a href="https://wiseglobalresearch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"><FaEye className="inline mr-1"/>https://wiseglobalresearch.com/</a> anonymously and obtain information about our organization and products and services without providing any personal information, such as your phone number or postal or e-mail address.
        </p>
      </motion.section>

      <motion.section variants={fadeIn} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <p className="text-base leading-relaxed">
          In few sections of our Website, we ask you to provide information that will enable us to enhance your site visit or to follow up with you after your visit. It is completely optional for you to participate. For example, we request information from you when you:
        </p>
        <motion.ul className="list-disc pl-5 mt-4" variants={listVariants}>
          <li>Register with <a href="https://wiseglobalresearch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://wiseglobalresearch.com/</a> for filling online registration forms</li>
          <li>Transact on the Site</li>
        </motion.ul>
        <p className="text-base leading-relaxed mt-4">
          In each of the above instances, we may ask for your name, e-mail address, telephone number, address and other personal information that is needed to register or subscribe you to services or offers.
        </p>
      </motion.section>

      <motion.section variants={fadeIn} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use of Personal Information</h2>
        <p className="text-base leading-relaxed">
          The personal information you provide will be kept confidential and used to support our customer relationship with you. We may use the information you provide to inform you of special offers, upgrades and other services that may be of interest to you.
        </p>
      </motion.section>

      <motion.section variants={fadeIn} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to this Policy</h2>
        <p className="text-base leading-relaxed">
          We may from time to time update this Policy. When we do so, we will post notice of any revisions on this site. We encourage you to review our Privacy Policy whenever you visit our Web Site <a href="https://wiseglobalresearch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"><FaSync className="inline mr-1"/>https://wiseglobalresearch.com/.</a>
        </p>
      </motion.section>

      {/* Contact Information */}
      <motion.section variants={fadeIn} className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-base leading-relaxed mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <a href="mailto:support@wiseglobalresearch.com" className="hover:underline">support@wiseglobalresearch.com</a>
          </div>
        </div>
      </motion.section>
    </motion.div>
    </>
  );
}

export default Privacy;
