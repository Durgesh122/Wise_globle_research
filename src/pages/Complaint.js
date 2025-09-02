import React, { useState } from 'react';
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
    } catch (error) {
      console.error('Error saving complaint:', error);
      toast.error('Failed to submit complaint: ' + error.message);
      setCurrentStep(3); // return to review so user can retry
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-red-100 text-red-600 p-3 rounded-full mb-4"
          >
            <RiCustomerService2Fill className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white mb-3"><Trans i18nKey="pages.Complaint.investor">Investor</Trans><span className="text-white"><Trans i18nKey="pages.Complaint.grievance">Grievance</Trans></span><Trans i18nKey="pages.Complaint.portal">Portal</Trans></h1>
          <p className="text-lg text-white-600 dark:text-white-300 max-w-2xl mx-auto"><Trans i18nKey="pages.Complaint.your-concerns-are-our-priority-we-re-seb"><Trans i18nKey="pages.Complaint.your-concerns-are-our-priority-we-re-seb-1">Your concerns are our priority. We're SEBI-committed to resolving complaints within</Trans></Trans><span className="font-semibold"><Trans i18nKey="pages.Complaint.7-working-days">7 working days</Trans></span>.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex justify-between relative">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center z-10 ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step === 4 ? <FaCheckCircle className="text-xl" /> : <span className="font-bold">{step}</span>}
                </div>
                <span className="mt-2 text-sm font-medium">
                  {['Details', 'Complaint', 'Review', 'Submit'][step - 1]}
                </span>
              </motion.div>
            ))}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-1">
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
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaUserTie className="text-blue-500" /><Trans i18nKey="pages.Complaint.your-information">Your Information</Trans></h2>
                  <div className="space-y-5">
                    {["name", "email", "mobile"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                          {field === "email" ? "Client ID / Email" : field.replace(/^\w/, c => c.toUpperCase())} *
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                      disabled={!formData.name || !formData.email || !formData.mobile}
                    ><Trans i18nKey="pages.Complaint.next-complaint-details">Next: Complaint Details</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" /><Trans i18nKey="pages.Complaint.complaint-details">Complaint Details</Trans></h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.nature-of-complaint">Nature of Complaint *</Trans></label>
                      <select
                        name="complaintType"
                        value={formData.complaintType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Trans i18nKey="pages.Complaint.preferred-resolution">Preferred Resolution</Trans></label>
                      <input
                        type="text"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.complaintType || !formData.description}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    ><Trans i18nKey="pages.Complaint.next-review">Next: Review</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaRegClock className="text-yellow-500" /><Trans i18nKey="pages.Complaint.review-your-complaint">Review Your Complaint</Trans></h2>
                  <div className="space-y-3 text-gray-700 dark:text-gray-200 text-sm">
                    <p><strong><Trans i18nKey="pages.Complaint.name">Name:</Trans></strong> {formData.name}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.email-client-id">Email / Client ID:</Trans></strong> {formData.email}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.mobile">Mobile:</Trans></strong> {formData.mobile}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.complaint-type">Complaint Type:</Trans></strong> {formData.complaintType}</p>
                    <p><strong><Trans i18nKey="pages.Complaint.description-1">Description:</Trans></strong> {formData.description}</p>
                    {formData.resolution && (
                      <p><strong><Trans i18nKey="pages.Complaint.preferred-resolution-2">Preferred Resolution:</Trans></strong> {formData.resolution}</p>
                    )}
                  </div>
                  <div className="mt-6 flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <input type="checkbox" required className="mr-2 mt-1" />
                    <label><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and-"><Trans i18nKey="pages.Complaint.i-confirm-this-complaint-is-genuine-and--1">I confirm this complaint is genuine and understand it will be registered as per SEBI compliance.</Trans></Trans></label>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    ><Trans i18nKey="pages.Complaint.back">Back</Trans></button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    ><Trans i18nKey="pages.Complaint.submit-complaint">Submit Complaint</Trans></button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                <motion.div className="p-8 text-center">
                  <FaPaperPlane className="text-blue-500 text-4xl mb-4 animate-bounce" />
                  <p className="text-lg text-gray-700 dark:text-white"><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait"><Trans i18nKey="pages.Complaint.submitting-your-complaint-please-wait-1">Submitting your complaint, please wait...</Trans></Trans></p>
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl text-center p-12">
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white"><Trans i18nKey="pages.Complaint.complaint-registered-successfully"><Trans i18nKey="pages.Complaint.complaint-registered-successfully-1">Complaint Registered Successfully!</Trans></Trans></h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              ><Trans i18nKey="pages.Complaint.submit-another-complaint">Submit Another Complaint</Trans></button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default Complaint;
