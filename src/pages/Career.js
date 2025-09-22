// src/pages/Career.js
import React, { useEffect, useMemo, useState } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import careersImg from '../assets/images/careers.png';
import { FaBriefcase, FaUpload } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase';
import { ref as dbRef, push, set, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { toast } from 'react-toastify';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, rotateX: 30 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, rotateY: 45 },
  visible: { y: 0, opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateX: 60 },
  visible: { scale: 1, opacity: 1, rotateX: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, rotateY: 10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
};

// Jobs will be loaded dynamically from RTDB /jobs where active === true

const careerImage = careersImg;
const fallbackImage = careersImg;

const Career = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    whyHire: '',
    jobId: '',
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [jobs, setJobs] = useState({});

  useEffect(() => {
    // Load only active jobs
    const q = query(dbRef(db, 'jobs'), orderByChild('active'), equalTo(true));
    const off = onValue(q, (snap) => {
      setJobs(snap.val() || {});
    });
    return () => off();
  }, []);

  const jobList = useMemo(() => Object.entries(jobs).map(([id, j]) => ({ id, ...j })), [jobs]);

  // If there are no active jobs, default to a general application bucket
  useEffect(() => {
    if (jobList.length === 0 && formData.jobId !== 'general') {
      setFormData((prev) => ({ ...prev, jobId: 'general' }));
    }
  }, [jobList.length, formData.jobId]);

  // If active jobs exist, default to the first one when nothing is selected
  useEffect(() => {
    if (jobList.length > 0 && !formData.jobId) {
      setFormData((prev) => ({ ...prev, jobId: jobList[0].id }));
    }
  }, [jobList, formData.jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: 'File size must be less than 5MB' });
        setFileName('No file chosen');
        setFormData({ ...formData, resume: null });
      } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors({ ...errors, resume: 'Only PDF or Word files are allowed' });
        setFileName('No file chosen');
        setFormData({ ...formData, resume: null });
      } else {
        setErrors({ ...errors, resume: '' });
        setFileName(file.name);
        setFormData({ ...formData, resume: file });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.resume) newErrors.resume = 'Resume is required';
  if (!formData.whyHire.trim()) newErrors.whyHire = 'This field is required';
  // Require a job selection only when there are active jobs listed; otherwise default to 'general'
  if (jobList.length > 0 && !formData.jobId) newErrors.jobId = 'Please select a job';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (honeypot) {
      return;
    }
    setLoading(true);
    try {
      // Read resume as Base64 and store entirely in RTDB
      let resumeData = '';
      let resumeMeta = null;
      if (formData.resume) {
        resumeMeta = {
          name: formData.resume.name,
          size: formData.resume.size,
          contentType: formData.resume.type || 'application/octet-stream',
        };
        resumeData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const result = reader.result; // data:*/*;base64,....
              const base64 = typeof result === 'string' ? result.split(',')[1] : '';
              resolve(base64 || '');
            } catch (e) { reject(e); }
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.resume);
        });
      }

  // Save submission to RTDB under jobApplications for clarity
  const node = push(dbRef(db, 'jobApplications'));
      await set(node, {
        source: 'career',
        jobId: String(formData.jobId || ''),
        name: String(formData.name || ''),
        email: String(formData.email || ''),
        phone: String(formData.phone || ''),
        whyHire: String(formData.whyHire || ''),
        resumeMeta,
        resumeData, // base64 content
        timestamp: Date.now(),
        honeypot: '',
      });

      // Also POST to server /send-email so HR receives an email (server will forward to career email)
      try {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobile', formData.phone);
        form.append('city', '');
        form.append('interest', formData.jobId || 'career');
        form.append('message', formData.whyHire || '');
        form.append('source', 'Career');
        if (formData.resume) form.append('resume', formData.resume, formData.resume.name);

  // Use live backend URL for email notifications
  const backendUrl = 'https://wise-global-contact-systems.onrender.com/send-email';
  const resp = await fetch(backendUrl, {
          method: 'POST',
          body: form,
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          console.warn('Server /send-email failed', err);
          toast.warn('Application saved but email notification failed');
        } else {
          toast.info('We have emailed your application to HR');
        }
      } catch (mailErr) {
        console.warn('Failed to POST to /send-email', mailErr);
        toast.warn('Application saved but email notification failed');
      }

      toast.success('Application submitted successfully!', { position: 'top-center' });
  setFormData({ name: '', email: '', phone: '', resume: null, whyHire: '', jobId: '' });
      setFileName('No file chosen');
      setErrors({});
      try{
        if (window.analyticsPush) {
          window.analyticsPush('career_application', { jobId: formData.jobId || 'general' });
        }
      }catch(e){}
    } catch (err) {
      const msg = err?.message || String(err);
      toast.error(`Failed to submit application: ${msg}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <motion.div
      className="container mx-auto py-12 px-4 max-w-5xl bg-blur"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      <Helmet>
        <title>Careers at Wise Global Research</title>
        <meta name="description" content="Join Wise Global Research — open roles, internships and application process for researchers and developers." />
        <link rel="canonical" href="https://wiseglobalresearch.com/career" />
      </Helmet>
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
  <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--text-body)' }}><Trans i18nKey="pages.Career.career-opportunities">Career Opportunities</Trans></h1>
  <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-body)', opacity: 0.9 }}><Trans i18nKey="pages.Career.join">Join</Trans><span className="font-semibold text-blue-300"><Trans i18nKey="pages.Career.wise-global-research">Wise Global Research</Trans></span><Trans i18nKey="pages.Career.and-build-a-rewarding-career-in-india-s-"><Trans i18nKey="pages.Career.and-build-a-rewarding-career-in-india-s--1">and build a rewarding career in India’s financial markets.</Trans></Trans></p>
      </motion.div>

      {/* Introduction Section */}
      <motion.div className="rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d', background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(212,227,255,0.45)' }}>
      <h2 className="text-3xl font-bold mb-4" style={{ color: '#111' }}><Trans i18nKey="pages.Career.wise-global-research-as-a-career"><Trans i18nKey="pages.Career.wise-global-research-as-a-career-1">Wise Global Research as a Career</Trans></Trans></h2>
      <p className="text-lg leading-7 mb-6" style={{ color: '#111' }}><Trans i18nKey="pages.Career.wise-global-research-is-not-just-a-resea"><Trans i18nKey="pages.Career.wise-global-research-is-not-just-a-resea-1">Wise Global Research is not just a Research Analyst company but a vibrant place to grow your career in finance. We value innovation, professionalism, and teamwork, and we’re committed to providing our employees with the resources to succeed.</Trans></Trans></p>
        <img
          src={careerImage}
          alt="Wise Global Research Career"
          className="w-full h-64 object-cover rounded-lg mt-4"
          onError={handleImageError}
        />
      </motion.div>

      {/* Current Openings Section (dynamic) */}
      <motion.div className="mb-12" variants={containerVariants}>
        <h2 className="text-3xl font-bold text-adaptive mb-6 text-center"><Trans i18nKey="pages.Career.current-openings">Current Openings</Trans></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobList.map((job) => (
            <motion.div
              key={job.id}
              className="rounded-xl shadow-lg p-6"
              style={{ 
                background: 'rgba(212,227,255,0.30)', 
                borderTop: '4px solid rgba(66,139,255,0.9)',
                transformStyle: 'preserve-3d'
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <FaBriefcase className="text-blue-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-body)' }}>{job.title}</h3>
              <p className="mb-2" style={{ color: 'var(--text-body)' }}>{job.location}</p>
              <p className="mb-4" style={{ color: 'var(--text-body)' }}>{job.description}</p>
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-body)' }}><Trans i18nKey="pages.Career.requirements">Requirements:</Trans></h4>
              <ul className="list-disc pl-6 text-adaptive space-y-1">
                {Array.isArray(job.requirements)
                  ? job.requirements.map((req, index) => (<li key={index} style={{ color: 'var(--text-body)' }}>{req}</li>))
                  : String(job.requirements || '')
                      .split(/\r?\n|,/)
                      .map((s, i) => s.trim())
                      .filter(Boolean)
                      .map((s, i) => (<li key={i} style={{ color: 'var(--text-body)' }}>{s}</li>))}
              </ul>
            </motion.div>
          ))}
          {jobList.length === 0 && (
            <div className="text-center col-span-1 md:col-span-2" style={{ color: 'var(--text-body)', opacity: 0.8 }}>No openings currently.</div>
          )}
        </div>
      </motion.div>

      {/* Application Form Section */}
    <motion.div className="rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d', background: '#fff', border: '1px solid #cbd5e1', color: '#111' }}>
  <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#111' }}><Trans i18nKey="pages.Career.apply-now">Apply Now</Trans></h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          {/* Select Job */}
      <div>
            <label htmlFor="jobId" className="block font-semibold mb-2" style={{ color: '#111' }}>Select Job</label>
            <select
              id="jobId"
              name="jobId"
              value={formData.jobId}
              onChange={(e)=>setFormData({...formData, jobId: e.target.value})}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#111', background: '#fff', borderColor: '#222' }}
            >
        <option value="" style={{ color: '#111' }}>-- Choose an opening --</option>
        <option value="general" style={{ color: '#111' }}>General Application</option>
              {jobList.map(j => (
                <option key={j.id} value={j.id} style={{ color: '#111' }}>{j.title} — {j.location}</option>
              ))}
            </select>
            {errors.jobId && <p className="text-red-400 text-sm mt-1">{errors.jobId}</p>}
          </div>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
          />
          <div>
            <label htmlFor="name" className="block font-semibold mb-2" style={{ color: '#111' }}><Trans i18nKey="pages.Career.your-name">Your Name</Trans></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#111', background: '#fff', borderColor: '#222' }}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-2" style={{ color: '#111' }}><Trans i18nKey="pages.Career.your-email">Your Email</Trans></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#111', background: '#fff', borderColor: '#222' }}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block font-semibold mb-2" style={{ color: '#111' }}><Trans i18nKey="pages.Career.phone-number">Phone Number</Trans></label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#111', background: '#fff', borderColor: '#222' }}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="resume" className="block font-semibold mb-2" style={{ color: '#111' }}><Trans i18nKey="pages.Career.upload-your-resume">Upload Your Resume</Trans></label>
            <div className="flex items-center">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
              >
                <FaUpload className="mr-2" /><Trans i18nKey="pages.Career.choose-file">Choose File</Trans></label>
              <span className="ml-4" style={{ color: '#111' }}>{fileName}</span>
            </div>
            {errors.resume && <p className="text-red-400 text-sm mt-1">{errors.resume}</p>}
          </div>
          <div>
            <label htmlFor="whyHire" className="block font-semibold mb-2" style={{ color: '#111' }}><Trans i18nKey="pages.Career.why-should-we-hire-you">Why Should We Hire You?</Trans></label>
            <textarea
              id="whyHire"
              name="whyHire"
              value={formData.whyHire}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: '#111', background: '#fff', borderColor: '#222' }}
              rows="5"
              placeholder="Tell us why you’re the right fit for Wise Global Research"
            />
            {errors.whyHire && <p className="text-red-400 text-sm mt-1">{errors.whyHire}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-adaptive px-6 py-3 rounded-full font-semibold transition ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >{loading ? 'Submitting...' : (<Trans i18nKey="pages.Career.submit-application">Submit Application</Trans>)}</button>
        </form>
      </motion.div>

      {/* Call to Action */}
      <motion.div
  className="text-center rounded-xl p-8 mb-12"
  variants={itemVariants}
  style={{ transformStyle: 'preserve-3d', background: '#fff', border: '1px solid #cbd5e1', color: '#111' }}
      >
  <h2 className="text-3xl font-bold mb-4" style={{ color: '#111' }}><Trans i18nKey="pages.Career.join-our-team">Join Our Team</Trans></h2>
  <p className="max-w-2xl mx-auto mb-6" style={{ color: '#111' }}><Trans i18nKey="pages.Career.ready-to-make-an-impact-in-india-s-finan"><Trans i18nKey="pages.Career.ready-to-make-an-impact-in-india-s-finan-1">Ready to make an impact in India’s financial markets? Contact our HR team to learn more about career opportunities at Wise Global Research.</Trans></Trans></p>
  <a
    href="/contact"
    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
    style={{ color: '#111' }}
  ><Trans i18nKey="pages.Career.contact-us">Enquiry Now</Trans></a>
      </motion.div>

    </motion.div>
  );
};

export default Career;