
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ref, push } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { itemVariants } from '../utils/animationVariants';
import blog01 from '../assets/images/blog01.png';

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
      // Push analytics event (works with GTM dataLayer helper)
      try {
        if (window.analyticsPush) {
          window.analyticsPush('contact_form_submit', { formId: 'contactForm' });
        }
      } catch (e) { /* ignore */ }

  toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      reset();
      // Send an email copy to server (best-effort, non-blocking)
    (async () => {
        try {
      const apiBase = 'https://wise-global-contact-systems.onrender.com';
      const endpoint = `${apiBase.replace(/\/$/, '')}/send-email`;
      await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email || '',
              mobile: formData.phone || '',
              city: '',
              interest: formData.interest || 'Contact Form',
              message: formData.message || '',
              source: 'ContactFormSection'
            })
          });
        } catch (e) {
      console.warn('Failed to send email copy for contact form:', e);
        }
      })();
    } catch (error) {
      console.error('Error submitting form:', error);
  const errorMessage = error.message ? error.message : String(error);
  toast.error(`Failed to submit form: ${errorMessage}`, { position: 'top-center' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <section ref={contactFormRef} className="py-12 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl md:rounded-3xl lg:rounded-3xl shadow-2xl">
      <div className="container max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img src={blog01} alt="Contact Us" className="rounded-xl shadow-lg max-h-96 object-cover border-2 border-black" style={{ background: '#fff' }} />
        </div>
        {/* Form section */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: '#fff', border: '2px solid #111', color: '#111' }}>
            <div className="px-6 py-8">
              <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-center mb-8 tracking-tight"
                style={{ color: '#111' }}
                variants={itemVariants}
                id="contact-form-heading"
              >
                Get in Touch
              </motion.h2>
              <form id="contactForm" data-gtm-event="contact_form_submit" onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-7" aria-labelledby="contact-form-heading">
                <hr className="mb-6 border-t border-gray-200/60" />
                {/* Honeypot field for bots */}
                <input
                  id="contact-honeypot"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  name="honeypot"
                  autoComplete="off"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="hidden"
                />
                <div>
                  <label className="block text-sm font-semibold mb-1 text-black" htmlFor="name">Name</label>
                  <input
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    type="text"
                    autoComplete="name"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-700 bg-white text-black ${errors.name ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-black" htmlFor="email">Email</label>
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
                      autoComplete="email"
                      className={`w-full px-4 py-2 rounded-lg border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-700 bg-white text-black ${errors.email ? 'border-red-500' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-black" htmlFor="phone">Phone</label>
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
                      autoComplete="tel"
                      className={`w-full px-4 py-2 rounded-lg border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-700 bg-white text-black ${errors.phone ? 'border-red-500' : ''}`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && <p id="phone-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-black" htmlFor="interest">Area of Interest</label>
                  <select
                    id="interest"
                    {...register('interest', { required: 'Please select an area of interest' })}
                    className={`w-full px-4 py-2 rounded-lg border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-700 bg-white text-black ${errors.interest ? 'border-red-500' : ''}`}
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
                  <label className="block text-sm font-semibold mb-1 text-black" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    rows={4}
                    autoComplete="off"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-700 bg-white text-black ${errors.message ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  ></textarea>
                  {errors.message && <p id="message-error" className="text-red-500 text-xs sm:text-sm mt-1">{errors.message.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className={`shine-hover w-full py-3 rounded-lg shadow-md text-base font-semibold ${submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white text-adaptive`}
                  whileHover={{ scale: submitting ? 1 : 1.02, rotateY: submitting ? 0 : 10 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;