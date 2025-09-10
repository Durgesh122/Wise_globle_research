// src/pages/Training.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { FaChartLine, FaBookOpen, FaShieldAlt, FaUsers } from 'react-icons/fa';


import { Helmet } from 'react-helmet-async';
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

// Training programs and testimonials data
const trainingPrograms = [
  {
    id: 1,
    title: 'Live Market Training Sessions',
    description: 'Join real-time sessions with experts analyzing NSE and BSE markets, focusing on NIFTY and BANKNIFTY trends.',
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
    details: [
      'Live trading demonstrations.',
      'Interactive Q&A with market experts.',
      'Focus on real-time market movements.',
    ],
  },
  {
    id: 2,
    title: 'Basic to Advanced Technical Analysis',
    description: 'Learn chart patterns, indicators, and strategies for stocks like RELIANCE and MCX commodities like GOLD.',
    icon: <FaBookOpen className="text-blue-300 text-4xl mb-4" />,
    details: [
      'Candlestick patterns and trend analysis.',
      'Use of tools like RSI, MACD, and Bollinger Bands.',
      'Practical case studies from Indian markets.',
    ],
  },
  {
    id: 3,
    title: 'Options & Futures Trading Strategies',
    description: 'Master high-probability strategies for Smart Options and Impulse Index, tailored for Indian derivatives markets.',
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
    details: [
      'Call and put options strategies.',
      'Hedging techniques for futures.',
      'Risk management in volatile markets.',
    ],
  },
  {
    id: 4,
    title: 'SEBI Compliance & Ethical Practices',
    description: 'Understand SEBI regulations and ethical trading practices to ensure compliance in NSE, BSE, and MCX markets.',
    icon: <FaShieldAlt className="text-blue-300 text-4xl mb-4" />,
    details: [
      'Overview of SEBI guidelines.',
      'Ethical decision-making in trading.',
      'Case studies on compliance violations.',
    ],
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma, Mumbai',
    quote: 'The live market sessions at Wise Global transformed my trading approach. I now confidently trade NIFTY options!',
    role: 'Retail Trader',
  },
  {
    id: 2,
    name: 'Priya Nair, Bengaluru',
    quote: 'The technical analysis course was a game-changer. I learned practical strategies for BSE stocks.',
    role: 'Aspiring Financial Analyst',
  },
  {
    id: 3,
    name: 'Vikram Singh, Delhi',
    quote: 'The SEBI compliance training helped me understand regulations, making me a more responsible trader.',
    role: 'Professional Investor',
  },
];

const trainingImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600';
const fallbackImage = 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600';

const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
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
      // Silently ignore bots
      return;
    }
    setLoading(true);
    try {
      const submission = {
        source: 'training',
        name: String(formData.name || ''),
        email: String(formData.email || ''),
        phone: String(formData.phone || ''),
        course: String(formData.course || ''),
        message: String(formData.message || ''),
        timestamp: Date.now(),
        honeypot: '',
      };
      await push(ref(db, 'homeFormSubmissions'), submission);
      toast.success('Registration submitted successfully!', { position: 'top-center' });
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      setErrors({});
    } catch (err) {
      const msg = err?.message || String(err);
      toast.error(`Failed to submit registration: ${msg}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <>
      <Helmet>
        <title>Training - Wise Global Research</title>
        <meta name="description" content="Training page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/training" />
      </Helmet>
<motion.div
      className="container mx-auto py-12 px-4 max-w-5xl bg-blur"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Training & Skill Development</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">At <span className="font-semibold text-blue-300">Wise Global Research</span>, we believe knowledge is the key to financial success. Our training programs empower aspiring traders and professionals in India’s stock markets.</p>
      </motion.div>

      {/* Introduction Section */}
      <motion.div className="bg-white/30 rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
  <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Training?</h2>
  <p className="text-white text-lg leading-7 mb-6">Our programs are designed for beginners and seasoned traders alike, offering practical insights into NSE, BSE, and MCX markets. Learn from industry experts with 5+ years of experience, access recorded sessions, and earn a certificate upon completion.</p>
        <img
          src={trainingImage}
          alt="Wise Global Research Training"
          className="w-full h-64 object-cover rounded-lg mt-4"
          onError={handleImageError}
        />
      </motion.div>

      {/* Training Programs Section */}
      <motion.div className="mb-12" variants={containerVariants}>
  <h2 className="text-3xl font-bold text-white mb-6 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingPrograms.map((program) => (
            <motion.div
              key={program.id}
              className="bg-white/30 rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {program.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{program.title}</h3>
              <p className="text-white mb-4">{program.description}</p>
              <h4 className="text-lg font-semibold text-white mb-2">Details:</h4>
              <ul className="list-disc pl-6 text-white space-y-1">
                {program.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div className="mb-12" variants={itemVariants}>
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Benefits of Our Training</h2>
        <ul className="list-disc pl-6 text-white space-y-2 max-w-2xl mx-auto">
          <motion.li variants={itemVariants}>
      <span className="font-semibold">Expert Trainers:</span> Learn from professionals with 5+ years of experience in Indian markets.</motion.li>
          <motion.li variants={itemVariants}>
      <span className="font-semibold">Interactive Learning:</span> Engage in real-time sessions and Q&A with market experts.</motion.li>
          <motion.li variants={itemVariants}>
      <span className="font-semibold">Comprehensive Resources:</span> Access recorded sessions, study materials, and market guides.</motion.li>
          <motion.li variants={itemVariants}>
      <span className="font-semibold">Certification:</span> Earn a recognized certificate upon course completion.</motion.li>
          <motion.li variants={itemVariants}>
      <span className="font-semibold">Placement Assistance:</span> Get support to kickstart your career in finance with our network.</motion.li>
        </ul>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div className="mb-12" variants={containerVariants}>
  <h2 className="text-3xl font-bold text-white mb-6 text-center">What Our Trainees Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/30 rounded-xl shadow-lg p-6 border-t-4 border-green-500 text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <FaUsers className="text-green-300 text-4xl mb-4 mx-auto" />
              <p className="text-white mb-4">{testimonial.quote}</p>
              <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
              <p className="text-white">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Registration Form Section */}
      <motion.div className="bg-white/30 rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
  <h2 className="text-3xl font-bold text-white mb-6 text-center">Register for Training</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          {/* Honeypot for bots */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
          />
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-blur text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-white font-semibold mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-blur text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-white font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-blur text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="course" className="block text-white font-semibold mb-2">Select Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-blur text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course</option>
              {trainingPrograms.map((program) => (
                <option key={program.id} value={program.title}>
                  {program.title}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-white font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-blur text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Tell us about your interest in our training programs"
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-6 py-3 rounded-full font-semibold transition ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >{loading ? 'Submitting...' : 'Register Now'}</button>
        </form>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center bg-white/30 rounded-xl p-8 mb-12"
        variants={itemVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Join Our Training Programs</h2>
        <p className="text-white max-w-2xl mx-auto mb-6">Take the first step toward financial freedom. Contact our team to learn more about our training programs tailored for Indian markets.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
  >Enquiry Now</a>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        variants={itemVariants}
        className="text-center p-4 bg-white/30 rounded-lg"
      >
        <p className="text-white">
          <strong>Disclaimer:</strong> Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Wise Global Research is not responsible for any profit or loss that may occur.</p>
      </motion.div>
    </motion.div>
    </>
  );
};

export default Training;