import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';
import wImg from '../assets/images/w.png';

// Particle animation variants for logo hover
const particleVariants = {
  initial: { scale: 0, opacity: 0, x: 0, y: 0 },
  animate: (i) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    transition: { duration: 1, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const PopupForm = ({ onClose }) => {
  // Interest options (replaces previous experienceLevels)
  const interestOptions = [
    'Equity',
    'Derivatives',
    'Commodity'
  ];

  // State management
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    city: '',
    interest: '',
    honeypot: '', // Hidden field for bot detection
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [touched, setTouched] = useState({});
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Real-time validation
  useEffect(() => {
    const errs = {};
    // Name and mobile validations removed as requested
    if (touched.city && !form.city.trim()) {
      errs.city = 'Please enter your city';
    }
    if (touched.interest && !form.interest) {
      errs.interest = 'Please select your interest';
    }
    setErrors(errs);
  }, [form, touched]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  // Form validation
  const validate = () => {
    const errs = {};
    // Name and mobile validations removed as requested
    if (!form.city.trim()) {
      errs.city = 'Please enter your city';
    }
    if (!form.interest) {
      errs.interest = 'Please select your interest';
    }
    // Bot detection: If honeypot is filled, mark as error
    if (form.honeypot) {
      errs.honeypot = 'Bot detected. Please try again.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ city: true, interest: true });

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Submit to backend; backend writes to RTDB
      const res = await api.post('/popup', {
        ...form,
      });
      if (!res.ok) throw new Error('Server rejected');
      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
  setSuccessMessage('Thank you! Your submission was successful.');
      setForm({
        name: '',
        mobile: '',
        city: '',
        interest: '',
        honeypot: '',
      });
      setTouched({});
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error saving to Firebase:', err);
      setErrors({ submit: err.message || 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Visibility state: show only after 3s on home page
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  // Handle closing the form
  const handleClose = () => {
    if (!isSubmitting) {
      setVisible(false);
      onClose();
    }
  };

  // Show popup on home page after 3s delay whenever path is '/'
  useEffect(() => {
    let timer;
    if (location.pathname === '/') {
      setVisible(false);
      timer = setTimeout(() => setVisible(true), 3000);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timer);
  }, [location.pathname]);
  if (!visible) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'transparent' }}
    >
      <motion.div
        className="relative backdrop-blur-xl rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-2xl shadow-2xl overflow-auto max-h-[90vh] mx-4 sm:mx-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, #00000044 0%, #b3ffe6 100%)'
        }}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Header with Company Name */}
  <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Wise Global Research Services</h2>
  <h3 className="text-lg font-semibold text-blue-700 text-center mb-6">Unlock Market Insights & Data-Driven Decisions</h3>

        {/* Logo with Particle Animation */}
        <div
          className="relative mx-auto mb-6 h-24 w-24"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <motion.img
            src={wImg}
            alt="Global Research Services Logo"
            className="h-full w-full object-contain"
            decoding="async"
            loading="lazy"
            initial={{ scale: 0.5 }}
            animate={{ scale: isLogoHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/96?text=Logo'; }}
          />
          {/* Particle Effect stays alive once hovered */}
          {isLogoHovered && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 bg-blue-400 rounded-full"
                  style={{ top: '50%', left: '50%' }}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                />
              ))}
            </>
          )}
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage ? (
            <motion.div
              className="mb-4 p-4 bg-green-100 rounded-lg text-green-800 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {successMessage}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Form */}
  <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6 px-4 sm:px-0 text-gray-900">
          {/* Honeypot Field (Hidden for Bot Detection) */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 bg-white rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
            {/* Name validation removed */}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={(e) => {
                // Allow only digits and cap at 10
                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                setForm((prev) => ({ ...prev, mobile: digitsOnly }));
                setTouched((prev) => ({ ...prev, mobile: true }));
              }}
              placeholder="Enter your 10-digit mobile number"
              inputMode="numeric"
              minLength={10}
              maxLength={10}
              required
              className={`w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
            {/* Mobile validation message removed; input restricted to max 10 digits */}
          </div>

          {/* City Input */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className={`w-full px-4 py-3 bg-white rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              required
            />
            {errors.city && (
              <motion.p
                className="text-red-600 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.city}
              </motion.p>
            )}
          </div>

          {/* Investment Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">Interest</label>
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white rounded-lg border ${errors.interest ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              >
                <option value="">Select your interest</option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <motion.p
                  className="text-red-600 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.interest}
                </motion.p>
              )}
          </div>

          {/* Newsletter checkbox removed as requested */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${ isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block"
              >
                ⏳
              </motion.span>
            ) : (
              'Submit'
            )}
          </button>

          {/* General Error Message */}
          {errors.submit && (
            <motion.p
              className="text-red-400 text-sm mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.submit}
            </motion.p>
          )}
          {errors.honeypot && (
            <motion.p
              className="text-red-400 text-sm mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Bot detected. Please try again.
            </motion.p>
          )}
        </form>

        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-blue-700"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PopupForm;
