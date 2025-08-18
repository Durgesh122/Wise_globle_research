import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import wImg from '../assets/images/w.png';

// Investment experience levels are loaded from i18n keys
import { useTranslation } from 'react-i18next';


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

const ContactForm = ({ onClose }) => {
  const { t } = useTranslation();

  // State management
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    city: '',
    experience: '',
    newsletter: false,
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
    if (touched.name && (!form.name.trim() || form.name.trim().split(' ').length < 2)) {
      errs.name = 'Please enter your full name (first and last)';
    }
    if (touched.mobile && !/^\d{10}$/.test(form.mobile)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (touched.city && !form.city.trim()) {
      errs.city = 'Please enter your city';
    }
    if (touched.experience && !form.experience) {
      errs.experience = 'Please select your investment experience';
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
    if (!form.name.trim() || form.name.trim().split(' ').length < 2) {
      errs.name = 'Please enter your full name (first and last)';
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!form.city.trim()) {
      errs.city = 'Please enter your city';
    }
    if (!form.experience) {
      errs.experience = 'Please select your investment experience';
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
    setTouched({ name: true, mobile: true, city: true, experience: true });

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // ⬇️ push into "popoForms" instead of "contactEntries"
      await push(
        ref(db, 'popoForms'),
        {
          ...form,
          timestamp: new Date().toISOString(),
        }
      );
      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
  setSuccessMessage(t('home.popupForm.success'));
      setForm({
        name: '',
        mobile: '',
        city: '',
        experience: '',
        newsletter: false,
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
  const experienceLevelsI18n = t('home.popupForm.experienceLevels', { returnObjects: true });
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(0,0,0,0.8)' }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 to-blue-900 bg-opacity-80 backdrop-blur-xl rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-2xl shadow-2xl overflow-auto max-h-[90vh] mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Header with Company Name */}
  <h2 className="text-2xl font-bold text-white text-center mb-4">{t('home.popupForm.brand')}</h2>
  <h3 className="text-lg font-semibold text-blue-300 text-center mb-6">{t('home.popupForm.subtitle')}</h3>

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
            initial={{ scale: 0.5 }}
            animate={{ scale: isLogoHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
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
          {successMessage && (
            <motion.div
              className="mb-4 p-4 bg-green-600 bg-opacity-80 rounded-lg text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6 px-4 sm:px-0 text-white">
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
            <label className="block text-sm font-medium mb-1">{t('home.popupForm.labels.name')}</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('home.popupForm.placeholders.name')}
              className={`w-full px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              required
            />
            {errors.name && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium mb-1">{t('home.popupForm.labels.mobile')}</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder={t('home.popupForm.placeholders.mobile')}
              className={`w-full px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.mobile ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              required
            />
            {errors.mobile && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.mobile}
              </motion.p>
            )}
          </div>

          {/* City Input */}
          <div>
            <label className="block text-sm font-medium mb-1">{t('home.popupForm.labels.city')}</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder={t('home.popupForm.placeholders.city')}
              className={`w-full px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              required
            />
            {errors.city && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.city}
              </motion.p>
            )}
          </div>

          {/* Investment Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">{t('home.popupForm.labels.experience')}</label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.experience ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              required
            >
              <option value="">{t('home.popupForm.placeholders.select')}</option>
              {experienceLevelsI18n.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experience && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.experience}
              </motion.p>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-500 rounded"
            />
            <label className="ml-2 text-sm font-medium">{t('home.popupForm.labels.newsletter')}</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
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
              t('home.popupForm.buttons.submit')
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
          className="absolute top-4 right-4 text-white hover:text-blue-300"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;