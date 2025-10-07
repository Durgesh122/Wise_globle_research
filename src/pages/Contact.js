// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaPhone, FaCommentDots,
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube
} from 'react-icons/fa';
import { ref, push } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) {
      console.log("Bot submission detected");
      return;
    }
    setLoading(true);

    const submissionData = {
      name: String(formData.name || ''),
      email: String(formData.email || ''),
      phone: String(formData.phone || ''),
      message: String(formData.message || ''),
      timestamp: Date.now(),
      honeypot: ''
    };

    try {
      try {
        await push(ref(db, 'homeFormSubmissions'), submissionData);
      } catch (dbErr) {
        console.warn('Contact page: RTDB push failed', dbErr);
        // If permission denied, best-effort fallback to server email
        if (dbErr && (dbErr.code === 'PERMISSION_DENIED' || /permission_denied/i.test(dbErr.message || ''))) {
          try {
            // Only use relative '/send-email' when running from API server port 3001
            const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const port = (typeof window !== 'undefined' && window.location.port) ? window.location.port : '';
            const useRelative = (process.env.REACT_APP_USE_LOCAL_SEND_EMAIL === 'true') || (isLocalhost && port === '3001');
            const endpoint = useRelative ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
            await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: submissionData.name,
                email: submissionData.email || '',
                mobile: submissionData.phone || '',
                city: '',
                interest: 'Contact Page (fallback)',
                message: submissionData.message || '',
                source: 'ContactPage-fallback'
              })
            });
            toast.success('Form submitted (email fallback used). We will contact you soon.', { position: 'top-center' });
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
          } catch (fallbackErr) {
            console.warn('Contact page: fallback /send-email failed', fallbackErr);
            throw fallbackErr;
          }
        } else {
          throw dbErr;
        }
      }
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
      toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      (async () => {
        try {
          const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
          const port = (typeof window !== 'undefined' && window.location.port) ? window.location.port : '';
          const useRelative = (process.env.REACT_APP_USE_LOCAL_SEND_EMAIL === 'true') || (isLocalhost && port === '3001');
          const endpoint = useRelative ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: submissionData.name,
              email: submissionData.email || '',
              mobile: submissionData.phone || '',
              city: '',
              interest: 'Contact Page',
              message: submissionData.message || '',
              source: 'ContactPage'
            })
          });
        } catch (err) {
          console.warn('Failed to POST to /send-email from Contact page:', err);
        }
      })();
    } catch (error) {
      console.error('Error submitting form to Firebase:', error);
      const msg = (error && error.message) ? error.message : String(error);
      const hint = /permission_denied/i.test(msg)
        ? ' Permission denied by database rules. Ensure email is provided and timestamp is numeric.'
        : '';
      toast.error(`Failed to submit form: ${msg}${hint}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const title = "Let's Talk";

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-transparent">
      {/* Transparent (page-controlled) background + very subtle accents */}
      <div className="absolute inset-0 -z-10" aria-hidden="true" />
      {/* softer decorative blurred blobs (subtle, translucent) */}
      <div className="absolute -left-12 -top-12 w-72 h-72 bg-white/6 rounded-full filter blur-3xl opacity-20 animate-[float_12s_ease-in-out_infinite]" />
      <div className="absolute -right-8 bottom-6 w-56 h-56 bg-white/5 rounded-full filter blur-2xl opacity-16 animate-[float_10s_ease-in-out_infinite]" />
      <Helmet>
        <title>Contact — Wise Global Research Services</title>
        <meta name="description" content="Contact Wise Global Research Services for enquiries, research subscriptions and support." />
      </Helmet>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="sr-only">Contact Wise Global Research Services</h1>
        <AnimatePresence>
          {success ? (
            <motion.div
              key="success"
              className="min-h-screen flex flex-col justify-center items-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-5xl font-bold text-green-500 mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              >
                <Trans i18nKey="pages.Contact.thank-you">🎉 Thank you!</Trans>
              </motion.h2>
              <motion.p
                className="text-xl text-center max-w-md text-gray-600"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
              >
                <Trans i18nKey="pages.Contact.your-message-has-been-successfully-submi">Your message has been successfully submitted. We'll contact you shortly.</Trans>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xl mx-auto"
            >
              <motion.h2 id="contact-title" className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-gray-800 drop-shadow-lg" variants={itemVariants}>
                {title.split("").map((char, index) => (
                  <motion.span key={index} custom={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.form
                onSubmit={handleSubmit}
                variants={itemVariants}
                aria-labelledby="contact-title"
              >
                {/* Honeypot field - keep hidden visually and from AT */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                
                <motion.div className="relative mb-4 sm:mb-6" variants={itemVariants}>
                  <label htmlFor="contact-name" className="sr-only">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" aria-hidden="true" />
                    </div>
                    <motion.input
                      id="contact-name"
                      type="text" name="name" placeholder="Full Name" required
                      onChange={handleChange} value={formData.name}
                      aria-describedby="help-name"
                      autoComplete="name"
                      className="w-full p-3 pl-10 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-900 outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <p id="help-name" className="mt-2 text-xs text-gray-500">Write your full name as on documents so we can address you properly.</p>
                </motion.div>

                <motion.div className="relative mb-4 sm:mb-6" variants={itemVariants}>
                  <label htmlFor="contact-email" className="sr-only">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" aria-hidden="true" />
                    </div>
                    <motion.input
                      id="contact-email"
                      type="email" name="email" placeholder="Email Address" required
                      onChange={handleChange} value={formData.email}
                      aria-describedby="help-email"
                      autoComplete="email"
                      className="w-full p-3 pl-10 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-900 outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <p id="help-email" className="mt-2 text-xs text-gray-500">Enter a valid email so we can respond — e.g., name@example.com</p>
                </motion.div>

                <motion.div className="relative mb-4 sm:mb-6" variants={itemVariants}>
                  <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" aria-hidden="true" />
                    </div>
                    <motion.input
                      id="contact-phone"
                      type="tel" name="phone" placeholder="Phone Number" required
                      onChange={handleChange} value={formData.phone}
                      aria-describedby="help-phone"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="^[0-9+()\\s-]{7,20}$"
                      className="w-full p-3 pl-10 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-900 outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <p id="help-phone" className="mt-2 text-xs text-gray-500">Provide a phone number including country code if outside your country — e.g., +91 98765 43210</p>
                </motion.div>

                <motion.div className="relative mb-4 sm:mb-6" variants={itemVariants}>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3 flex items-start pointer-events-none">
                      <FaCommentDots className="text-gray-400" aria-hidden="true" />
                    </div>
                    <motion.textarea
                      id="contact-message"
                      name="message" placeholder="Your Message..." rows="4" required
                      onChange={handleChange} value={formData.message}
                      aria-describedby="help-message"
                      className="w-full p-3 pl-10 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-900 outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <p id="help-message" className="mt-2 text-xs text-gray-500">Tell us briefly what you need — we'll respond with options and pricing.</p>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-gray-900 font-bold rounded-lg shadow-xl hover:brightness-105 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>

                <motion.div className="flex justify-center gap-4 mt-10" variants={itemVariants}>
                  {[ 
                    { icon: FaFacebookF, bg: 'bg-blue-600', link: 'https://facebook.com', label: 'Facebook' },
                    { icon: FaInstagram, bg: 'bg-pink-500', link: 'https://instagram.com', label: 'Instagram' },
                    { icon: FaTwitter, bg: 'bg-sky-500', link: 'https://twitter.com', label: 'Twitter' },
                    { icon: FaLinkedinIn, bg: 'bg-blue-800', link: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: FaYoutube, bg: 'bg-red-600', link: 'https://youtube.com', label: 'YouTube' },
                  ].map(({ icon: Icon, bg, link, label }, i) => (
                      <motion.a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-11 h-11 inline-flex items-center justify-center rounded-full text-white ${bg} shadow-lg hover:scale-105 transition-transform duration-200`}
                        variants={iconVariants}
                        whileHover="hover"
                        aria-label={label}
                      >
                        <Icon aria-hidden="true" />
                        <span className="sr-only">{label}</span>
                      </motion.a>
                  ))}
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Contact;