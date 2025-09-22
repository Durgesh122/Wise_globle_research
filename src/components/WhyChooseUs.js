import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock, FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    q: 'What is Wise Global Research Services?',
    a: `Wise Global Research Services, a premier SEBI registered research analyst, offers Indian stock market research recommendations. Our profound analysis and expertise ensure client success. We uphold core values and principles consistently..`,
  },
  {
    q: 'Is Wise Global Research services registered with SEBI?',
    a: `Wise Global Research Services is a SEBI registered analyst company dedicated to empowering you with straightforward, meaningful, and actionable recommendations and solutions.`,
  },
  {
    q: 'How can I join Wise Global Research services?',
    a: `You can join our services by selecting appropriate package from our website, Selection of package depends upon number of research recommendations you need in a week or month. You can select package as per your capital availability and requirements. Our team is always ready to provide all kind of support in all services. Firstly you need to sign Client Service Concerned Form before subscribing to any of our services from website, you can inform us via an email, call or what's-app, we will complete your onboarding process and start your services..`,
  },
  {
    q: 'Do you provide sureshot calls, operator calls or jackpot calls?',
    a: `Our research and analysis are effective and beneficial for traders but we don't use words like sureshot, operator base call or jackpot calls. we suggest you don't believe on such words because stock market investments are subject to market risk.`,
  },
];

const itemVariants = {
  closed: { height: 0, opacity: 0 },
  open: { height: 'auto', opacity: 1 },
};

const WhyChooseUs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [locks, setLocks] = useState(() => faqs.map(() => false));

  const toggle = (i) => {
    if (locks[i]) return; // locked, don't toggle
    setOpenIndex(openIndex === i ? null : i);
  };

  const toggleLock = (i) => {
    setLocks((prev) => {
      const copy = [...prev];
      copy[i] = !copy[i];
      return copy;
    });
    // if locking an item, also expand it for visibility
    if (!locks[i]) setOpenIndex(i);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container max-w-3xl mx-auto text-white text-adaptive">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            const isLocked = locks[i];
            return (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                style={{ background: '#ffffffff', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none`}
                  style={isLocked ? { background: '#ffffffff' } : {}}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex-1 text-left flex items-center gap-3"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="text-lg font-semibold text-black">{f.q}</span>
                  </button>

                  <div className="flex items-center gap-3 ml-4">
                    <button
                      aria-pressed={isLocked}
                      onClick={() => toggleLock(i)}
                      className="text-sm p-2 rounded hover:bg-black/5"
                      title={isLocked ? 'Unlock' : 'Lock'}
                      style={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {isLocked ? <FiLock /> : <FiUnlock />}
                    </button>
                    <button
                      onClick={() => toggle(i)}
                      className={`p-2 rounded transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={itemVariants}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="px-4 pt-0 pb-4 text-adaptive"
                      style={{ color: 'rgba(0,0,0,0.8)' }}
                    >
                      <div className="overflow-hidden">
                        <p>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;