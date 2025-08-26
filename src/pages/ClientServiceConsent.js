import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import {
  FaUser, FaUserTie, FaIdCard, FaEnvelope, FaCalendarAlt,
  FaAddressCard, FaRegAddressCard, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClientServiceConsent = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientId: '',
    fatherName: '',
    email: '',
    dob: '',
    pan: '',
    aadhaar: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  // no file fields: only form inputs

  // No file uploads — form only

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission (posts to local server like the provided ClientForm.jsx)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3001/api/submit-client-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '✅ Please check your mail. Redirecting...' });
        setTimeout(() => {
          window.location.href = 'https://wiseglobalresearch.com/client-service-consent-form/';
        }, 2000);
      } else {
        const errorCode = data.error && data.error.code ? data.error.code : 'UNKNOWN_ERROR';
        const errorMessage = data.error && data.error.message ? data.error.message : 'An unknown error occurred.';
        const errorDetails = data.error && data.error.details ? `Details: ${data.error.details}` : '';
        setMessage({ type: 'error', text: `❌ Error Code: ${errorCode}. Message: ${errorMessage} ${errorDetails}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: `❌ Network error: ${err.message}. कृपया सुनिश्चित करें कि server चल रहा है।` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build Digio-compatible payload from form data. Matches PHP example structure.
  // Render input field with icon (binds to formData and handleChange)
  const renderInput = (id, label, icon, type = 'text', attrs = {}, note) => (
    <motion.div variants={itemVariants} className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/70 text-xl">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          value={formData[id] || ''}
          onChange={handleChange}
          placeholder={attrs.placeholder || `Enter your ${label.replace('*', '').toLowerCase()}`}
          className={`w-full pl-11 pr-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
          {...attrs}
        />
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </motion.div>
  );

  // no file inputs required anymore

  return (
    <div className="py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-sm mb-8" variants={itemVariants}>
          <Link to="/" className="hover:text-blue-400"><Trans i18nKey="pages.ClientServiceConsent.home">Home</Trans></Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400"><Trans i18nKey="pages.ClientServiceConsent.client-service-consent"><Trans i18nKey="pages.ClientServiceConsent.client-service-consent-2">Client Service Consent</Trans></Trans></span>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"><Trans i18nKey="pages.ClientServiceConsent.client-service-consent"><Trans i18nKey="pages.ClientServiceConsent.client-service-consent-1">Client Service Consent</Trans></Trans></h2>
            <p className="mt-2 text-gray-300">Please fill out the form below.</p>
          </div>

    <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={containerVariants}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-6"><Trans i18nKey="pages.ClientServiceConsent.client-information"><Trans i18nKey="pages.ClientServiceConsent.client-information-1">Client Information</Trans></Trans></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput(
                  'clientName',
                  'Client Name*',
                  <FaUser />,
      'text',
      { required: true, placeholder: 'Enter Name' }
                )}
                {renderInput(
                  'fatherName',
                  "Father's Name*",
                  <FaUserTie />,
      'text',
      { required: true, placeholder: "Enter Father's Name" }
                )}
                {renderInput(
                  'clientId',
                  'Client ID*',
                  <FaIdCard />,
      'text',
      { maxLength: 50, placeholder: 'Enter Client Id' },
      'Ask your representative for the client ID.'
                )}
                {renderInput(
                  'email',
                  'Email ID*',
                  <FaEnvelope />,
      'email',
      { required: true, placeholder: 'Enter Email' }
                )}
                {renderInput(
                  'dob',
                  'Date Of Birth*',
                  <FaCalendarAlt />,
      'text',
      { required: true, placeholder: '31-12-2000' }
                )}
                {renderInput(
                  'pan',
                  'PAN*',
                  <FaAddressCard />,
      'text',
      { required: true, maxLength: 10, placeholder: 'Enter PAN' }
                )}
                {renderInput(
                  'aadhaar',
                  'Aadhaar*',
                  <FaRegAddressCard />,
      'text',
      { required: true, maxLength: 12, placeholder: 'Enter Aadhaar' }
                )}
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white mb-2"
                ><Trans i18nKey="pages.ClientServiceConsent.address">Address*</Trans></label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter Full Address"
                  className={`w-full px-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                ></textarea>
              </motion.div>
            </motion.div>
            {message.text && (
              <div className={`mb-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-600/20 border border-green-400' : 'bg-red-600/10 border border-red-400'} text-sm` }>
                {message.text}
                
              </div>
            )}

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full shine-hover py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                {!isSubmitting && <FaArrowRight className="inline ml-2" />}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientServiceConsent;