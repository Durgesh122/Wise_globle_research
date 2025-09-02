import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ref, push } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { itemVariants } from '../utils/animationVariants';

const ContactForm = ({ contactFormRef }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message,
        timestamp: Date.now(),
        honeypot: honeypot || ''
      };
  await push(ref(db, 'homePageContactSubmissions'), formData);

      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {'send_to': 'AW-1137180109/aoxKCJGg_4EbEIqvo6pA'});
      }

  toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
  const errorMessage = error.message ? error.message : String(error);
  toast.error(`Failed to submit form: ${errorMessage}`, { position: 'top-center' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={contactFormRef} className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div
        className="container max-w-2xl rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200/20"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
          variants={itemVariants}
          id="contact-form-heading"
        >
          Get in Touch
        </motion.h2>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" aria-labelledby="contact-form-heading">
          {/* Honeypot field for bots */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            name="honeypot"
            autoComplete="off"
            tabIndex="-1"
            className="hidden"
          />
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="name">Name</label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
              type="text"
              className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : ''
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-white" htmlFor="email">Email</label>
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : ''
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white" htmlFor="phone">Phone</label>
              <input
                id="phone"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9',
                  },
                })}
                type="tel"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <p id="phone-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="interest">Area of Interest</label>
            <select
              id="interest"
              {...register('interest', { required: 'Please select an area of interest' })}
              className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.interest ? 'border-red-500' : ''
              }`}
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? 'interest-error' : undefined}
            >
              <option value="" className="text-black">Select an option</option>
              <option value="equity" className="text-black">Equity</option>
              <option value="derivatives" className="text-black">Derivatives</option>
              <option value="commodity" className="text-black">Commodity</option>
            </select>
            {errors.interest && <p id="interest-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.interest.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
              rows={4}
              className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.message ? 'border-red-500' : ''
              }`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            ></textarea>
            {errors.message && <p id="message-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.message.message}</p>}
          </div>
          <motion.button
            type="submit"
            disabled={submitting}
            className={`shine-hover w-full py-2 sm:py-3 rounded-lg shadow-md text-sm sm:text-base ${
              submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
            } text-white`}
            whileHover={{ scale: submitting ? 1 : 1.02, rotateY: submitting ? 0 : 10 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;