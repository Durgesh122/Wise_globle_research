import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const FAQSection = () => {
  const faqs = [
    {
      question: 'Are you SEBI registered research analysts?',
      answer:
        'Yes, Wise Global Research is registered with SEBI as a Research Analyst. Our SEBI Registration Number is INH000016719. You can verify our registration on the official SEBI website (www.sebi.gov.in).',
    },
    {
      question: 'What is SEBI and why is registration important?',
      answer:
        'SEBI (Securities and Exchange Board of India) is the regulator for the securities market in India. Registration ensures that research analysts follow strict compliance, transparency, and investor protection guidelines as mandated by SEBI.',
    },
    {
      question: 'What are the key SEBI rules for research analysts?',
      answer:
        'SEBI requires research analysts to maintain transparency, avoid conflicts of interest, disclose risks, and provide unbiased recommendations. We strictly adhere to all SEBI guidelines and compliance requirements.',
    },
    {
      question: 'How can I verify your SEBI registration?',
      answer:
        'You can visit the SEBI website (www.sebi.gov.in) and search for Wise Global Research or our registration number INH000016719 in the list of registered research analysts.',
    },
    {
      question: 'Is there any SEBI disclaimer I should be aware of?',
      answer:
        'Disclaimer: Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Wise Global Research and its analysts comply with all SEBI regulations. Past performance is not indicative of future results.',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Frequently Asked Questions (SEBI Compliant)
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-sm sm:text-base">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;