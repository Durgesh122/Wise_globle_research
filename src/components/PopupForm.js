import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

// A curated set of premium gradients for the popup background.
// One is chosen at random on each page load for a fresh look.
const POPUP_GRADIENTS = [
  // Light, airy pastels
  'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
  'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
  'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
];

// Inject keyframes once for animated gradient shift
let __popupKeyframesInjected = false;

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
  const [bgGradient, setBgGradient] = useState(POPUP_GRADIENTS[0]);

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

  // Choose a random background gradient per refresh and inject keyframes once
  useEffect(() => {
    const next = POPUP_GRADIENTS[Math.floor(Math.random() * POPUP_GRADIENTS.length)];
    setBgGradient(next);
    const styleId = 'popup-anim-keyframes';
    const existing = document.getElementById(styleId);
    const css = `
      @keyframes halo-drift { 0% { transform: translate(0, 0) } 100% { transform: translate(15%, 15%) } }
      @keyframes glow-pulse { 0%,100% { opacity: 0.10 } 50% { opacity: 0.18 } }
    `;
    if (existing) {
      existing.innerHTML = css;
    } else if (!__popupKeyframesInjected) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = css;
      document.head.appendChild(style);
      __popupKeyframesInjected = true;
    }
  }, []);

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
      // Determine API base URL: prefer REACT_APP_API_URL. In development use localhost:3002.
      // In production when REACT_APP_API_URL is not provided, default to the Render server
      // where the backend is hosted so the popup can reach the API.
      const apiBase =
        process.env.REACT_APP_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://wise-global-contact-systems.onrender.com');
      const endpoint = apiBase ? `${apiBase.replace(/\/$/, '')}/send-email` : '/send-email';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          city: form.city,
          interest: form.interest,
        }),
      });

      // Some servers (404 HTML responses) will not return JSON; handle that gracefully
      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        // Non-JSON response (likely HTML 404 page). Create a helpful error.
        const text = await res.text().catch(() => 'Non-JSON response from server');
        throw new Error(`Unexpected server response: ${res.status} ${res.statusText} - ${text.substring(0, 200)}`);
      }

      if (!res.ok || !data.success) throw new Error(data.error?.message || 'Server rejected');
      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
  setSuccessMessage('Thank you! Your submission was successful.');
      // Save to Firebase Realtime Database so admin can view submissions
      try {
        const submissionsRef = ref(db, 'popoForms');
        const newRef = push(submissionsRef);
        await set(newRef, {
          name: form.name || '',
          mobile: form.mobile || '',
          city: form.city || '',
          interest: form.interest || '',
          timestamp: new Date().toISOString(),
        });
      } catch (dbErr) {
        // Log DB error but keep the UX successful; show non-blocking console message
        console.error('Failed to save submission to Realtime DB:', dbErr);
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
        className="relative backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 w-full shadow-2xl overflow-auto mx-4 sm:mx-0"
        style={{
          backgroundImage: bgGradient,
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)',
          width: 'min(92vw, 720px)',
          minWidth: 'min(92vw, 320px)',
          maxHeight: '85vh'
        }}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Subtle moving halo glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            width: '140%',
            height: '140%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 20%, transparent 60%)',
            mixBlendMode: 'soft-light',
            animation: 'halo-drift 16s ease-in-out infinite alternate, glow-pulse 7s ease-in-out infinite'
          }}
        />
        {/* Header with Company Name */}
  <h2 className="font-bold text-gray-900 text-center mb-4" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>Wise Global Research Services</h2>
  <h3 className="font-semibold text-blue-700 text-center mb-6" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>Unlock Market Insights & Data-Driven Decisions</h3>

        {/* Logo with Particle Animation */}
        <div
          className="relative mx-auto mb-6"
          style={{ height: 'clamp(64px, 12vw, 96px)', width: 'clamp(64px, 12vw, 96px)' }}
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
