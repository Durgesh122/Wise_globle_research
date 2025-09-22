// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
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
      await push(ref(db, 'homeFormSubmissions'), submissionData);
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
      toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      (async () => {
        try {
          const apiBase = 'https://wise-global-contact-systems.onrender.com';
          const endpoint = `${apiBase.replace(/\$/, '')}/send-email`;
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
    <div className="relative min-h-screen py-20 px-4 bg-white text-gray-800 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
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
            >
              <motion.h2 className="text-5xl font-extrabold text-center mb-12 text-gray-900" variants={itemVariants}>
                {title.split("").map((char, index) => (
                  <motion.span key={index} custom={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200"
                variants={itemVariants}
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                />
                
                <motion.div className="relative mb-6" variants={itemVariants}>
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                  <motion.input
                    type="text" name="name" placeholder="Full Name" required
                    onChange={handleChange} value={formData.name}
                    className="w-full p-3 pl-10 bg-white border-b-2 border-gray-300 text-gray-800 outline-none placeholder-gray-400 focus:border-blue-500 transition-colors"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div className="relative mb-6" variants={itemVariants}>
                  <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                  <motion.input
                    type="email" name="email" placeholder="Email Address" required
                    onChange={handleChange} value={formData.email}
                    className="w-full p-3 pl-10 bg-white border-b-2 border-gray-300 text-gray-800 outline-none placeholder-gray-400 focus:border-blue-500 transition-colors"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div className="relative mb-6" variants={itemVariants}>
                  <FaPhone className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                  <motion.input
                    type="tel" name="phone" placeholder="Phone Number" required
                    onChange={handleChange} value={formData.phone}
                    className="w-full p-3 pl-10 bg-white border-b-2 border-gray-300 text-gray-800 outline-none placeholder-gray-400 focus:border-blue-500 transition-colors"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div className="relative mb-6" variants={itemVariants}>
                  <FaCommentDots className="absolute top-5 left-3 text-gray-400" />
                  <motion.textarea
                    name="message" placeholder="Your Message..." rows="4" required
                    onChange={handleChange} value={formData.message}
                    className="w-full p-3 pl-10 bg-white border-2 border-gray-300 text-gray-800 outline-none rounded-lg placeholder-gray-400 focus:border-blue-500 transition-colors"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>

                <motion.div className="flex justify-center gap-6 mt-10" variants={itemVariants}>
                  {[ 
                    { icon: FaFacebookF, color: 'hover:text-blue-600', link: 'https://facebook.com' },
                    { icon: FaInstagram, color: 'hover:text-pink-500', link: 'https://instagram.com' },
                    { icon: FaTwitter, color: 'hover:text-sky-500', link: 'https://twitter.com' },
                    { icon: FaLinkedinIn, color: 'hover:text-blue-800', link: 'https://linkedin.com' },
                    { icon: FaYoutube, color: 'hover:text-red-600', link: 'https://youtube.com' },
                  ].map(({ icon: Icon, color, link }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xl text-gray-400 ${color} transition-colors duration-300`}
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <Icon />
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