import React, { useState, useContext } from 'react';
import { Trans } from '../i18nShim';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaCheckCircle,
  FaRegClock,
  FaUserTie
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { ThemeContext } from '../context/ThemeContext';

import { Helmet } from 'react-helmet-async';
const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaintType: '',
    description: '',
    resolution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const complaintTypes = [
    "Service Delay", "Research Quality", "Miscommunication",
    "Refund Request", "Technical Issue", "Billing Problem", "Other"
  ];

  const { theme, gradients } = useContext(ThemeContext);
  const activeTheme = gradients[theme] || gradients['default'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentStep(4);
    // Save complaint to RTDB
    try {
      const newComplaint = {
        ...formData,
        timestamp: Date.now()
      };
      await push(ref(db, 'complaints'), newComplaint);
      setSubmitted(true);
      // Best-effort: also notify server to send an email copy to support
      (async () => {
            try {
            // Use relative endpoint in development (CRA proxy) or production host otherwise
            const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const endpoint = isLocal ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newComplaint.name || '',
              email: newComplaint.email || '',
              mobile: newComplaint.mobile || '',
              city: '',
              interest: 'Complaint Form',
              message: `Type: ${newComplaint.complaintType}\n\nDescription: ${newComplaint.description}\n\nPreferred resolution: ${newComplaint.resolution || ''}`,
              source: 'Complaints'
            })
          });
        } catch (err) {
          console.warn('Failed to POST to /send-email from Complaint page:', err);
        }
      })();
    } catch (error) {
      console.error('Error saving complaint:', error);
      toast.error('Failed to submit complaint: ' + error.message);
      setCurrentStep(3); // return to review so user can retry
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <>
      <Helmet>
        <title>Complaint - Wise Global Research</title>
        <meta name="description" content="Complaint page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/complaint" />
      </Helmet>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  style={{
    minHeight: '100vh',
    background: activeTheme.background,
    color: activeTheme.textColor,
    transition: activeTheme.transition,
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <div
    className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center"
    style={{ padding: 'clamp(12px, 5vw, 32px) clamp(4px, 4vw, 24px)' }}
  >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-red-100 text-red-600 p-3 rounded-full mb-4"
            style={{ background: 'rgba(255,0,0,0.08)' }}
          >
            <RiCustomerService2Fill className="text-3xl" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3" style={{ color: activeTheme.textColor }}>
            <Trans i18nKey="pages.Complaint.investor">Investor</Trans>
            <span className="mx-1"><Trans i18nKey="pages.Complaint.grievance">Grievance</Trans></span>
            <Trans i18nKey="pages.Complaint.portal">Portal</Trans>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: activeTheme.textColor, opacity: 0.85 }}>
            <Trans i18nKey="pages.Complaint.your-concerns-are-our-priority-we-re-seb"><Trans i18nKey="pages.Complaint.your-concerns-are-our-priority-we-re-seb-1">Your concerns are our priority. We're SEBI-committed to resolving complaints within</Trans></Trans>
            <span className="font-semibold"><Trans i18nKey="pages.Complaint.7-working-days">7 working days</Trans></span>.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 sm:mb-10"
        >
          <div className="flex justify-between relative flex-wrap gap-2 sm:gap-0">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center z-10 ${currentStep >= step ? 'text-blue-600' : 'text-gray-400 dark:text-gray-400'}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {step === 4 ? <FaCheckCircle className="text-xl" /> : <span className="font-bold">{step}</span>}
                </div>
                <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium" style={{ color: activeTheme.textColor, opacity: 0.8 }}>
                  {['Details', 'Complaint', 'Review', 'Submit'][step - 1]}
                </span>
              </motion.div>
            ))}
            <div className="absolute top-5 sm:top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-1">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep - 1) * 33.33}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
              style={{
                background: activeTheme.background,
                color: activeTheme.textColor,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                margin: '0 auto',
                width: '100%',
                maxWidth: 500,
                padding: 'clamp(16px, 6vw, 40px)',
                borderRadius: 18,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: activeTheme.textColor }}>
                    <FaUserTie className="text-blue-500" /><Trans i18nKey="pages.Complaint.your-information">Your Information</Trans></h2>
                  <div className="space-y-4 sm:space-y-5">
                    {["name", "email", "mobile"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-2xs xs:text-xs sm:text-sm font-medium mb-1 capitalize" style={{ color: activeTheme.textColor }}>
                          {field === "email" ? "Client ID / Email" : field.replace(/^\w/, c => c.toUpperCase())} *
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          style={{ color: activeTheme.textColor, background: 'rgba(255,255,255,0.95)' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 text-sm sm:text-base"
                      disabled={!formData.name || !formData.email || !formData.mobile}
                    ><Trans i18nKey="pages.Complaint.next-complaint-details">Next: Complaint Details</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: activeTheme.textColor }}>
                    <FaExclamationTriangle className="text-red-500" /><Trans i18nKey="pages.Complaint.complaint-details">Complaint Details</Trans></h2>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.nature-of-complaint">Nature of Complaint *</Trans></label>
                      <select
                        name="complaintType"
                        value={formData.complaintType}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        style={{ color: activeTheme.textColor, background: 'rgba(255,255,255,0.95)' }}
                      >
                        <option value=""><Trans i18nKey="pages.Complaint.select-complaint-type">Select complaint type</Trans></option>
                        {complaintTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.description">Description *</Trans></label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        style={{ color: activeTheme.textColor, background: 'rgba(255,255,255,0.95)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.preferred-resolution">Preferred Resolution</Trans></label>
                      <input
                        type="text"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        style={{ color: activeTheme.textColor, background: 'rgba(255,255,255,0.95)' }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.complaintType || !formData.description}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 text-sm sm:text-base"
                    ><Trans i18nKey="pages.Complaint.next-review">Next: Review</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div className="p-4 sm:p-8">
                  <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: activeTheme.textColor }}>
                    <FaRegClock className="text-yellow-500" /><Trans i18nKey="pages.Complaint.review-your-complaint">Review Your Complaint</Trans></h2>
                  <div className="space-y-3 text-sm" style={{ color: activeTheme.textColor }}>
                    <p><strong><Trans i18nKey="pages.Complaint.name">Name:</Trans></strong> {formData.name}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.email-client-id">Email / Client ID:</Trans></strong> {formData.email}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.mobile">Mobile:</Trans></strong> {formData.mobile}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.complaint-type">Complaint Type:</Trans></strong> {formData.complaintType}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.description-1">Description:</Trans></strong> {formData.description}</p>
                    {formData.resolution && (
                      <p><strong><Trans i18nKey="pages.Complaint.preferred-resolution-2">Preferred Resolution:</Trans></strong> {formData.resolution}</p>
                    )}
                    <div className="mt-3 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      <p>* Inclusive of complaints of previous years resolved in the current year.</p>
                      <p># Inclusive of complaints pending as on the last day of the year. (as on 31st March)</p>
                      <p>* Inclusive of complaints of previous months resolved in the current month.</p>
                      <p># Inclusive of complaints pending as on the last day of the month.</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start text-xs sm:text-sm" style={{ color: activeTheme.textColor, opacity: 0.8 }}>
                    <input id="complaint-confirm" name="complaintConfirm" type="checkbox" required className="mr-2 mt-1" />
                    <label htmlFor="complaint-confirm"><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and-"><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and--1">I confirm this complaint is genuine and understand it will be registered as per SEBI compliance.</Trans></Trans></label>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="submit"
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                    ><Trans i18nKey="pages.Complaint.submit-complaint">Submit Complaint</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                <motion.div className="p-4 sm:p-8 text-center">
                  <FaPaperPlane className="text-blue-500 text-4xl mb-4 animate-bounce" />
                  <p className="text-base sm:text-lg" style={{ color: activeTheme.textColor }}><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait"><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait-1">Submitting your complaint, please wait...</Trans></Trans></p>
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div
              className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl text-center"
              style={{
                background: activeTheme.background,
                color: activeTheme.textColor,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                margin: '0 auto',
                width: '100%',
                maxWidth: 500,
                padding: 'clamp(16px, 6vw, 40px)',
                borderRadius: 18,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h2 className="text-base sm:text-xl font-bold" style={{ color: activeTheme.textColor }}><Trans i18nKey="pages.Complaint.complaint-registered-successfully"><Trans i18nKey="pages.Complaint.complaint-registered-successfully-1">Complaint Registered Successfully!</Trans></Trans></h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              ><Trans i18nKey="pages.Complaint.submit-another-complaint">Submit Another Complaint</Trans></button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
    </>
  );
};

export default Complaint;
