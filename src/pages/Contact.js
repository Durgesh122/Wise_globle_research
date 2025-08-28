// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = {
  // Normalize to satisfy database.rules.json
  name: String(formData.name || ''),
  email: String(formData.email || ''),
  phone: String(formData.phone || ''),
  message: String(formData.message || ''),
  timestamp: Date.now(), // number required by rules
  honeypot: '' // explicitly empty so (!exists || == '') passes
    };

    try {
      // Save to the same location as the Home.js form
      await push(ref(db, 'homeFormSubmissions'), submissionData);
      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }
      toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form to Firebase:', error);
      const msg = (error && error.message) ? error.message : String(error);
      // Surface a friendly hint when rules reject the write
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  if (success) {
    return (
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center bg-transparent px-4 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-green-300 mb-4"><Trans i18nKey="pages.Contact.thank-you">🎉 Thank you!</Trans></h2>
        <p className="text-lg text-center max-w-md"><Trans i18nKey="pages.Contact.your-message-has-been-successfully-submi"><Trans i18nKey="pages.Contact.your-message-has-been-successfully-submi-1">Your message has been successfully submitted. We'll contact you shortly.</Trans></Trans></p>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative min-h-screen py-20 px-4 text-white bg-transparent" initial="hidden" animate="visible">
      {/* ✅ Fully transparent background */}
      <div className="absolute inset-0 bg-transparent z-0" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2 className="text-4xl font-extrabold text-center mb-6" variants={fadeInUp} custom={0}><Trans i18nKey="pages.Contact.let-s-talk">Let's Talk</Trans></motion.h2>

        {/* ✅ Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/30 p-8 rounded-xl backdrop-blur border border-white/30"
          variants={fadeInUp}
          custom={1}
        >
          {/* Name */}
          <motion.div className="flex items-center gap-3 mb-4" variants={fadeInUp} custom={1.1}>
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={formData.name}
              className="flex-1 p-3 bg-transparent border-b border-white outline-none placeholder-white"
            />
          </motion.div>

          {/* Email */}
          <motion.div className="flex items-center gap-3 mb-4" variants={fadeInUp} custom={1.2}>
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              value={formData.email}
              className="flex-1 p-3 bg-transparent border-b border-white outline-none placeholder-white"
            />
          </motion.div>

          {/* Phone */}
          <motion.div className="flex items-center gap-3 mb-4" variants={fadeInUp} custom={1.3}>
            <FaPhone />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              value={formData.phone}
              className="flex-1 p-3 bg-transparent border-b border-white outline-none placeholder-white"
            />
          </motion.div>

          {/* Message */}
          <motion.div className="flex items-start gap-3 mb-4" variants={fadeInUp} custom={1.4}>
            <FaCommentDots className="mt-2" />
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="4"
              required
              onChange={handleChange}
              value={formData.message}
              className="flex-1 p-3 bg-transparent border border-white outline-none rounded placeholder-white"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          {/* ✅ Social Media Icons */}
          <motion.div
            className="flex justify-center gap-6 mt-10"
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: FaFacebookF, color: 'text-blue-500', link: 'https://facebook.com' },
              { icon: FaInstagram, color: 'text-pink-500', link: 'https://instagram.com' },
              { icon: FaTwitter, color: 'text-sky-400', link: 'https://twitter.com' },
              { icon: FaLinkedinIn, color: 'text-blue-700', link: 'https://linkedin.com' },
              { icon: FaYoutube, color: 'text-red-500', link: 'https://youtube.com' },
            ].map(({ icon: Icon, color, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`${color} text-xl hover:text-white transition duration-300`}
                variants={fadeInUp}
                custom={1.5 + i * 0.1}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Contact;