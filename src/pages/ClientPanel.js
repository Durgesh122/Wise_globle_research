import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp, FaPhone
} from 'react-icons/fa';
// ...existing imports...
import Layout from '../components/Layout';

function ClientPanel() {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ clientId: '', password: '' });

  const [loginError, setLoginError] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { clientId: '', password: '' };
    if (!clientId) newErrors.clientId = 'Client ID is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (!newErrors.clientId && !newErrors.password) {
      // Dummy credential check
      const validId = 'client123';
      const validPass = 'password123';
      if (clientId !== validId || password !== validPass) {
        setLoginError('Wrong ID or password. Please re-enter.');
        return;
      }
      toast.success('Form submitted successfully', { position: 'top-center' });
      setClientId('');
      setPassword('');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-trasprint via-gray-800 to-black px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-lg"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center text-white mb-6 leading-tight break-words max-w-full"
          ><Trans i18nKey="pages.ClientPanel.coming-soon">Coming Soon</Trans></motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-center text-white mb-6"
          ><Trans i18nKey="pages.ClientPanel.enter-your-client-id-and-password-to-acc"><Trans i18nKey="pages.ClientPanel.enter-your-client-id-and-password-to-acc-1">Enter your Client ID and password to access your panel.</Trans></Trans></motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="clientId" className="block text-white mb-1 text-sm"><Trans i18nKey="pages.ClientPanel.client-id">Client ID</Trans></label>
              <input
                id="clientId"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Enter your Client ID"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.clientId && (
                <p className="text-red-400 text-sm mt-1">{errors.clientId}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1 text-sm"><Trans i18nKey="pages.ClientPanel.password">Password</Trans></label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            ><Trans i18nKey="pages.ClientPanel.login">Login</Trans></motion.button>
          </motion.form>

          {/* Error Popup */}
          {loginError && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm text-center"
              >
                <p className="mb-4">{loginError}</p>
                <button
                  onClick={() => setLoginError('')}
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                ><Trans i18nKey="pages.ClientPanel.ok">OK</Trans></button>
              </motion.div>
            </div>
          )}

          {/* Support Popup */}
          {showSupport && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 p-6 rounded-lg shadow-lg text-center text-white max-w-xs"
              >
                <h3 className="text-xl font-bold mb-4"><Trans i18nKey="pages.ClientPanel.contact-support">Contact Support</Trans></h3>
                <div className="flex justify-center gap-4 mb-4 text-2xl">
                  <a href="https://www.facebook.com/people/MRXads/61576945584326/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/mrx_ads?igsh=YndwZjQ0NmF3bGl0" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                    <FaInstagram />
                  </a>
                  <a href="https://x.com/Durgesh31971176" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                    <FaTwitter />
                  </a>
                  <a href="https://www.linkedin.com/in/durgesh-rathor-85b529190/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                    <FaLinkedinIn />
                  </a>
                  <a href="https://www.youtube.com/@Durgesh_122" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                    <FaYoutube />
                  </a>
                  <a href="https://wa.me/+917631657827" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                    <FaWhatsapp />
                  </a>
                  <a href="tel:+917631657827" className="hover:text-yellow-400">
                    <FaPhone />
                  </a>
                </div>
                <button
                  onClick={() => setShowSupport(false)}
                  className="mt-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                ><Trans i18nKey="pages.ClientPanel.close">Close</Trans></button>
              </motion.div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-center text-white mt-6"
          >
            <p><Trans i18nKey="pages.ClientPanel.don-t-have-an-account">Don't have an account?</Trans><span onClick={() => setShowSupport(true)} className="text-green-400 underline cursor-pointer"><Trans i18nKey="pages.ClientPanel.contact-support">Contact Support</Trans></span></p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default ClientPanel;
