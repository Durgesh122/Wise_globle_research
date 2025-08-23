import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  FaUser, FaUserTie, FaIdCard, FaEnvelope, FaCalendarAlt,
  FaAddressCard, FaRegAddressCard, FaArrowRight, FaUpload, FaFilePdf, FaFileImage, FaTimesCircle
} from 'react-icons/fa';
import { ref, push, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Added for Storage
import { toast } from 'react-toastify';
import { db, storage } from '../firebase'; // Import storage
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  // Handle file upload to Firebase Storage and get download URL
  const uploadFileToStorage = async (file, path) => {
    if (!file) return null;
    const fileRef = storageRef(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload files to Firebase Storage
      const timestamp = Date.now();
      const [panUrl, aadhaarUrl, signatureUrl] = await Promise.all([
        uploadFileToStorage(panFile, `clientServiceConsent/pan/${timestamp}_${panFile?.name || 'pan'}`),
        uploadFileToStorage(aadhaarFile, `clientServiceConsent/aadhaar/${timestamp}_${aadhaarFile?.name || 'aadhaar'}`),
        uploadFileToStorage(signatureFile, `clientServiceConsent/signature/${timestamp}_${signatureFile?.name || 'signature'}`),
      ]);

      // Prepare submission payload
      const submissionData = {
        ...data,
        panUrl: panUrl || null,
        aadhaarUrl: aadhaarUrl || null,
        signatureUrl: signatureUrl || null,
        timestamp,
      };

      // Save to Firebase Realtime Database
      const newRef = push(ref(db, 'clientServiceConsentForms'));
      await set(newRef, submissionData);
      // After saving locally, attempt to create sign request via (server-side) Digio proxy
      // Note: do NOT put API keys in frontend. Configure REACT_APP_DIGIO_PROXY_URL to point to
      // a backend endpoint that performs the actual call to Digio with your credentials.
      const digioPayload = createDigioPayload(submissionData);
      try {
        const digioResp = await sendDigioRequest(digioPayload);
        // digioResp is expected to be an object parsed from JSON by the proxy
        if (digioResp && digioResp.success) {
          toast.success('Form submitted and sign request sent. Please check your email.');
        } else {
          // If proxy returns success:false, show returned message if any
          const msg = digioResp && digioResp.message ? digioResp.message : 'Sign request could not be created';
          toast.warn(msg);
        }
      } catch (e) {
        // Proxy failed — log and show a clearer message so developer/user can debug
        console.error('Digio request failed', e);
        const msg = (e && e.message) ? e.message : 'Unknown error while sending sign request';
        // Show message but avoid exposing sensitive headers/credentials
        toast.error(`Sign request failed: ${msg}`);
        // Optional: keep a friendly message as well
        console.info('If this persists, check your Digio proxy server, DIGIO credentials, and network/CORS settings.');
      }

      // Reset form and files
      toast.success('Form submitted successfully!');
      reset();
      setPanFile(null);
      setAadhaarFile(null);
      setSignatureFile(null);
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Submission failed: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build Digio-compatible payload from form data. Matches PHP example structure.
  const createDigioPayload = (submissionData) => {
    const templateKey = process.env.REACT_APP_DIGIO_TEMPLATE_KEY || 'TMP250409085749067X19LUJRRQRYTGK';
    return {
      signers: [
        {
          identifier: submissionData.email,
          name: submissionData.clientName,
          sign_type: 'aadhaar',
        },
      ],
      expire_in_days: 10,
      send_sign_link: true,
      notify_signers: true,
      will_self_sign: false,
      display_on_page: 'custom',
      file_name: `${submissionData.clientName || 'document'}.pdf`,
      templates: [
        {
          template_key: templateKey,
          template_values: {
            'client full name': submissionData.clientName || '',
            clientId: submissionData.clientId || 'NA',
            address: submissionData.address || '',
            dob: submissionData.dob || '',
            pan: submissionData.pan || '',
            email: submissionData.email || '',
          },
        },
      ],
    };
  };

  // Send payload to a server-side proxy which will call Digio API with proper auth.
  // Configure the proxy URL with REACT_APP_DIGIO_PROXY_URL. Default: '/api/digio'.
  const sendDigioRequest = async (payload) => {
  const proxyUrl = process.env.REACT_APP_DIGIO_PROXY_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001/api/digio' : '/api/digio');
    const resp = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Proxy request failed: ${resp.status} ${text}`);
    }
    return await resp.json();
  };

  // Render input field with icon
  const renderInput = (id, label, icon, type = 'text', validation, note) => (
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
          type={type}
          {...register(id, validation)}
          placeholder={`Enter your ${label.replace('*', '').toLowerCase()}`}
          className={`w-full pl-11 pr-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            errors[id] ? 'border-red-500 ring-red-500/50' : 'border-gray-300/50'
          }`}
        />
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

  // Render file input with preview and remove option
  const renderFileInput = (id, label, icon, setFile, file, accept) => (
    <motion.div variants={itemVariants} className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
          errors[id] ? 'border-red-500' : 'border-gray-300/50 hover:border-blue-500'
        } ${isSubmitting ? 'opacity-50' : ''}`}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...register(id, {
            validate: {
              fileSize: (fileList) => !fileList?.[0] || fileList[0].size <= 10_000_000 || 'File size must be less than 10MB',
              fileType: (fileList) => {
                if (!fileList?.[0]) return true;
                const validTypes = accept.split(',').map((type) => type.trim());
                return (
                  validTypes.some((type) => fileList[0].type.includes(type)) ||
                  'Invalid file type. Accepted: PDF, JPG, PNG'
                );
              },
            },
          })}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          disabled={isSubmitting}
        />
        {!file ? (
          <div className="flex flex-col items-center justify-center text-white/70">
            {icon}
            <p className="mt-2 text-sm"><Trans i18nKey="pages.ClientServiceConsent.click-or-drag-file-to-upload"><Trans i18nKey="pages.ClientServiceConsent.click-or-drag-file-to-upload-1">Click or drag file to upload</Trans></Trans></p>
            <p className="text-xs text-gray-400 mt-1"><Trans i18nKey="pages.ClientServiceConsent.pdf-jpg-png-max-10mb"><Trans i18nKey="pages.ClientServiceConsent.pdf-jpg-png-max-10mb-1">PDF, JPG, PNG (Max 10MB)</Trans></Trans></p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {file.type.includes('pdf') ? (
                <FaFilePdf className="text-red-400 text-2xl" />
              ) : (
                <FaFileImage className="text-blue-400 text-2xl" />
              )}
              <span className="text-sm font-medium truncate overflow-hidden">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
              aria-label="Remove file"
              disabled={isSubmitting}
            >
              <FaTimesCircle size={20} />
            </button>
          </div>
        )}
      </div>
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

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
            <p className="mt-2 text-gray-300"><Trans i18nKey="pages.ClientServiceConsent.please-fill-out-the-form-below-and-uploa"><Trans i18nKey="pages.ClientServiceConsent.please-fill-out-the-form-below-and-uploa-1">Please fill out the form below and upload required documents.</Trans></Trans></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {
                    required: 'Client name is required',
                    minLength: {
                      value: 2,
                      message: 'Client name must be at least 2 characters',
                    },
                  }
                )}
                {renderInput(
                  'fatherName',
                  "Father's Name*",
                  <FaUserTie />,
                  'text',
                  {
                    required: "Father's name is required",
                    minLength: {
                      value: 2,
                      message: "Father's name must be at least 2 characters",
                    },
                  }
                )}
                {renderInput(
                  'clientId',
                  'Client ID*',
                  <FaIdCard />,
                  'text',
                  {
                    required: 'Client ID is required',
                    pattern: {
                      value: /^[A-Za-z0-9]{4,}$/,
                      message: 'Client ID must be alphanumeric and at least 4 characters',
                    },
                  },
                  'Ask your representative for the client ID.'
                )}
                {renderInput(
                  'email',
                  'Email ID*',
                  <FaEnvelope />,
                  'email',
                  {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }
                )}
                {renderInput(
                  'dob',
                  'Date Of Birth*',
                  <FaCalendarAlt />,
                  'date',
                  {
                    required: 'Date of birth is required',
                    validate: {
                      pastDate: (value) => {
                        const today = new Date();
                        const inputDate = new Date(value);
                        return inputDate < today || 'Date of birth must be in the past';
                      },
                    },
                  }
                )}
                {renderInput(
                  'pan',
                  'PAN*',
                  <FaAddressCard />,
                  'text',
                  {
                    required: 'PAN is required',
                    pattern: {
                      value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                      message: 'Invalid PAN format',
                    },
                    minLength: { value: 10, message: 'PAN must be 10 characters' },
                    maxLength: { value: 10, message: 'PAN must be 10 characters' },
                  }
                )}
                {renderInput(
                  'aadhaar',
                  'Aadhaar*',
                  <FaRegAddressCard />,
                  'text',
                  {
                    required: 'Aadhaar is required',
                    pattern: {
                      value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                      message: 'Invalid Aadhaar format',
                    },
                    minLength: { value: 12, message: 'Aadhaar must be 12 digits' },
                    maxLength: { value: 12, message: 'Aadhaar must be 12 digits' },
                  }
                )}
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-6"><Trans i18nKey="pages.ClientServiceConsent.document-uploads">Document Uploads</Trans></h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderFileInput(
                  'panFile',
                  'PAN Card Upload (optional)',
                  <FaUpload size={24} />,
                  setPanFile,
                  panFile,
                  'image/jpeg,image/png,application/pdf'
                )}
                {renderFileInput(
                  'aadhaarFile',
                  'Aadhaar Card Upload (optional)',
                  <FaUpload size={24} />,
                  setAadhaarFile,
                  aadhaarFile,
                  'image/jpeg,image/png,application/pdf'
                )}
                {renderFileInput(
                  'signatureFile',
                  'Signature Upload (optional)',
                  <FaUpload size={24} />,
                  setSignatureFile,
                  signatureFile,
                  'image/jpeg,image/png,application/pdf'
                )}
              </div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white mb-2"
                ><Trans i18nKey="pages.ClientServiceConsent.address">Address*</Trans></label>
                <textarea
                  id="address"
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 10,
                      message: 'Address must be at least 10 characters',
                    },
                  })}
                  rows="4"
                  placeholder="Enter Full Address"
                  className={`w-full px-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    errors.address ? 'border-red-500' : 'border-gray-300/50'
                  }`}
                ></textarea>
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </motion.div>
            </motion.div>

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