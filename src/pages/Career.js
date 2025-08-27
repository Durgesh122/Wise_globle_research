// src/pages/Career.js
import React, { useState } from 'react';
import { Trans } from '../i18nShim';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUpload, FaBuilding, FaChartLine } from 'react-icons/fa';

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

// Job openings data (same as before)
const jobOpenings = [
  {
    id: 1,
    title: 'Market Research Analyst',
    location: 'Indore, Madhya Pradesh',
    description: 'Analyze NSE and BSE market trends, provide insights for NIFTY and BANKNIFTY strategies, and contribute to Smart Options reports.',
    requirements: [
      'Bachelor’s degree in Finance, Economics, or related field.',
      '2+ years of experience in market analysis.',
      'Knowledge of SEBI regulations and MCX commodities.',
      'Proficiency in data analysis tools (e.g., Excel, Python).',
    ],
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 2,
    title: 'Research Analyst',
    location: 'Indore, Madhya Pradesh',
    description: 'Guide clients on investment strategies for stocks like RELIANCE and MCX commodities like GOLD, ensuring SEBI-compliant research.',
    requirements: [
      'Certified Financial Planner (CFP) or equivalent.',
      '3+ years in financial research roles.',
      'Strong communication and client management skills.',
      'Familiarity with Indian stock markets.',
    ],
    icon: <FaBriefcase className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 3,
    title: 'Data Scientist',
    location: 'Indore, Madhya Pradesh',
    description: 'Develop AI-driven trading algorithms for services like Universal Cash and Galaxy MCX, using real-time NSE and MCX data.',
    requirements: [
      'Master’s degree in Data Science, Computer Science, or related field.',
      'Expertise in Python, R, and machine learning frameworks.',
      '2+ years in financial data analysis.',
      'Understanding of Indian market dynamics.',
    ],
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 4,
    title: 'Client Success Manager',
    location: 'Indore, Madhya Pradesh',
    description: 'Support clients using Infinity Club and Evaluation Stock Options, ensuring seamless onboarding and satisfaction.',
    requirements: [
      'Bachelor’s degree in Business or related field.',
      '2+ years in customer success or client relations.',
      'Knowledge of Indian financial markets.',
      'Excellent interpersonal skills.',
    ],
    icon: <FaBuilding className="text-blue-300 text-4xl mb-4" />,
  },
];

const careerImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600';
const fallbackImage = 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600';

const Career = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    whyHire: '',
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('No file chosen');

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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form submitted:', formData);
      alert('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', resume: null, whyHire: '' });
      setFileName('No file chosen');
      setErrors({});
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
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4"><Trans i18nKey="pages.Career.career-opportunities">Career Opportunities</Trans></h1>
        <p className="text-lg text-white max-w-2xl mx-auto"><Trans i18nKey="pages.Career.join">Join</Trans><span className="font-semibold text-blue-300"><Trans i18nKey="pages.Career.wise-global-research">Wise Global Research</Trans></span><Trans i18nKey="pages.Career.and-build-a-rewarding-career-in-india-s-"><Trans i18nKey="pages.Career.and-build-a-rewarding-career-in-india-s--1">and build a rewarding career in India’s financial markets.</Trans></Trans></p>
      </motion.div>

      {/* Introduction Section */}
      <motion.div className="bg-white/30 rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
        <h2 className="text-3xl font-bold text-white mb-4"><Trans i18nKey="pages.Career.wise-global-research-as-a-career"><Trans i18nKey="pages.Career.wise-global-research-as-a-career-1">Wise Global Research as a Career</Trans></Trans></h2>
        <p className="text-white text-lg leading-7 mb-6"><Trans i18nKey="pages.Career.wise-global-research-is-not-just-a-resea"><Trans i18nKey="pages.Career.wise-global-research-is-not-just-a-resea-1">Wise Global Research is not just a Research Analyst company but a vibrant place to grow your career in finance. We value innovation, professionalism, and teamwork, and we’re committed to providing our employees with the resources to succeed.</Trans></Trans></p>
        <img
          src={careerImage}
          alt="Wise Global Research Career"
          className="w-full h-64 object-cover rounded-lg mt-4"
          onError={handleImageError}
        />
      </motion.div>

      {/* Current Openings Section */}
      <motion.div className="mb-12" variants={containerVariants}>
        <h2 className="text-3xl font-bold text-white mb-6 text-center"><Trans i18nKey="pages.Career.current-openings">Current Openings</Trans></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job) => (
            <motion.div
              key={job.id}
              className="bg-white/30 rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {job.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
              <p className="text-white mb-2">{job.location}</p>
              <p className="text-white mb-4">{job.description}</p>
              <h4 className="text-lg font-semibold text-white mb-2"><Trans i18nKey="pages.Career.requirements">Requirements:</Trans></h4>
              <ul className="list-disc pl-6 text-white space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Application Form Section */}
      <motion.div className="bg-white/30 rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
        <h2 className="text-3xl font-bold text-white mb-6 text-center"><Trans i18nKey="pages.Career.apply-now">Apply Now</Trans></h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2"><Trans i18nKey="pages.Career.your-name">Your Name</Trans></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-white font-semibold mb-2"><Trans i18nKey="pages.Career.your-email">Your Email</Trans></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-white font-semibold mb-2"><Trans i18nKey="pages.Career.phone-number">Phone Number</Trans></label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="resume" className="block text-white font-semibold mb-2"><Trans i18nKey="pages.Career.upload-your-resume">Upload Your Resume</Trans></label>
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
              <span className="ml-4 text-white">{fileName}</span>
            </div>
            {errors.resume && <p className="text-red-400 text-sm mt-1">{errors.resume}</p>}
          </div>
          <div>
            <label htmlFor="whyHire" className="block text-white font-semibold mb-2"><Trans i18nKey="pages.Career.why-should-we-hire-you">Why Should We Hire You?</Trans></label>
            <textarea
              id="whyHire"
              name="whyHire"
              value={formData.whyHire}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Tell us why you’re the right fit for Wise Global Research"
            />
            {errors.whyHire && <p className="text-red-400 text-sm mt-1">{errors.whyHire}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
          ><Trans i18nKey="pages.Career.submit-application">Submit Application</Trans></button>
        </form>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center bg-white/30 rounded-xl p-8 mb-12"
        variants={itemVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h2 className="text-3xl font-bold text-white mb-4"><Trans i18nKey="pages.Career.join-our-team">Join Our Team</Trans></h2>
        <p className="text-white max-w-2xl mx-auto mb-6"><Trans i18nKey="pages.Career.ready-to-make-an-impact-in-india-s-finan"><Trans i18nKey="pages.Career.ready-to-make-an-impact-in-india-s-finan-1">Ready to make an impact in India’s financial markets? Contact our HR team to learn more about career opportunities at Wise Global Research.</Trans></Trans></p>
        <a
          href="/contact"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
  ><Trans i18nKey="pages.Career.contact-us">Enquiry Now</Trans></a>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        variants={itemVariants}
        className="text-center p-4 bg-white/30 text-white rounded-lg"
      >
        <p>
          <strong><Trans i18nKey="pages.Career.disclaimer">Disclaimer:</Trans></strong><Trans i18nKey="pages.Career.investments-in-the-securities-market-are"><Trans i18nKey="pages.Career.investments-in-the-securities-market-are-1">Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Wise Global Research is not responsible for any profit or loss that may occur.</Trans></Trans></p>
      </motion.div>
    </motion.div>
  );
};

export default Career;