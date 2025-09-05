import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaTimes, FaUser, FaCity, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';

// Proper chatbot icon: circular badge + robot head with antenna and blinking eyes
const ChatLogo = ({ className = 'w-6 h-6', animated = false }) => (
  <motion.svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    initial={animated ? { rotate: 0 } : false}
    animate={animated ? { rotate: [0, -2.5, 2.5, -1.5, 0] } : undefined}
    transition={animated ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
  >
    <defs>
      <linearGradient id="wg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8fa1f07a" />
        <stop offset="100%" stopColor="#2263c4c2" />
      </linearGradient>
    </defs>
    {/* Outer circular badge */}
    <circle cx="32" cy="32" r="28" fill="url(#wg-gradient)" />
    {/* Chat tail */}
    <path d="M24 50 L28 46 L30 52 Z" fill="#4f46e5" opacity="0.85" />
  {/* Robot head (scaled up around center without changing outer circle) */}
  <g transform="translate(32 32) scale(1.3) translate(-32 -32)">
      <rect x="19" y="22" width="26" height="20" rx="8" fill="#ffffff" opacity="0.96" />
      {/* Ears */}
      <rect x="16" y="27" width="4" height="10" rx="2" fill="#e9d5ff" />
      <rect x="45" y="27" width="4" height="10" rx="2" fill="#e9d5ff" />
      {/* Antenna */}
      <line x1="32" y1="20" x2="32" y2="22" stroke="#ffffff" strokeWidth="2" />
      <motion.circle cx="32" cy="18" r="2.6" fill="#ffffff"
        initial={{ y: 0, scale: 1, opacity: 0.95 }}
        animate={animated ? { y: [-1.5, 0, -1.5], scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Eyes */}
      <motion.circle cx="26" cy="32" r="2.6" fill="#111827"
        initial={{ scaleY: 1 }}
        animate={animated ? { scaleY: [1, 0.15, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.05, 1], delay: 0.2 }}
        style={{ transformOrigin: '26px 32px' }}
      />
      <motion.circle cx="38" cy="32" r="2.6" fill="#111827"
        initial={{ scaleY: 1 }}
        animate={animated ? { scaleY: [1, 0.15, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.05, 1], delay: 0.35 }}
        style={{ transformOrigin: '38px 32px' }}
      />
      {/* Mouth */}
      <motion.rect x="27" y="37" width="10" height="3" rx="1.5" fill="#4b5563"
        initial={{ width: 10 }}
        animate={animated ? { width: [8, 12, 8] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  </motion.svg>
);

// Service buttons removed — chat now only collects name, city and mobile.

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('greeting');
  const [formData, setFormData] = useState({ 
    name: '', 
    city: '', 
    address: '',
    mobile: '', 
    service: '', 
    extra: {} 
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Periodic teaser when closed
  const [errorText, setErrorText] = useState('');
  const [invalidPulse, setInvalidPulse] = useState(false);
  const messagesEndRef = useRef(null);
  const introSentRef = useRef(false);
  // Teaser popup state and timers
  const [showTeaser, setShowTeaser] = useState(false);
  const teaserTimerRef = useRef(null);
  const teaserAutoHideRef = useRef(null);
  const [userActivity, setUserActivity] = useState({
    lastInteraction: null,
    messageCount: 0,
    sessionStart: new Date()
  });

  // Curated Q&A for site-specific FAQs
  const qaPairs = useMemo(() => [
    { q: /(services|aap kya karte|kya-kya|offer|provide|kaam)/i, a: 'We provide market research, competitive analysis, investment research reports, and data-driven insights tailored to your business needs.' },
    { q: /(sebi|registered|license|ra number)/i, a: 'Wise Global Research Services operates with strict compliance. We provide research and analytics. Investment decisions remain your responsibility.' },
    { q: /(subscription|plan|charges|pricing|fees|kitna)/i, a: 'We offer flexible plans for brief, standard, and comprehensive research. Share your scope and timeline for an exact quote.' },
    { q: /(report|sample|demo|preview)/i, a: 'You can preview reports on the Reports page and request a customized sample based on your sector/market.' },
    { q: /(data|source|methodology|approach|how)/i, a: 'We combine secondary research, public filings, paid databases, and expert interviews. Methods vary by project scope.' },
    { q: /(time|delivery|timeline|kab tak)/i, a: 'Typical timelines: brief 2-3 days, standard 5-7 days, comprehensive 10-15 days, depending on complexity.' },
    { q: /(support|contact|help|hours|timing)/i, a: 'Support hours 9:30AM–6:30PM IST, Mon–Sat. Share your details here and our team will contact you.' },
    { q: /(refund|privacy|security)/i, a: 'We follow a transparent scope sign-off before billing. Data is handled per our privacy policy. Refunds are case-based on scope adherence.' }
  ], []);

  // Validations per step
  const validators = {
    askName: (v) => {
      const s = v.trim();
      if (s.length < 3) return 'Please enter your full name (min 3 characters).';
  // Using ASCII-safe pattern for wider build compatibility (no Unicode property escapes)
  if (!/^[A-Za-z][A-Za-z .'-]{2,48}$/.test(s)) return 'Name can only contain letters, spaces, dots, hyphens and apostrophes.';
      return '';
    },
    askCity: (v) => {
      const s = v.trim();
      if (s.length < 2) return 'Please enter a valid city name.';
  // Using ASCII-safe pattern for wider build compatibility (no Unicode property escapes)
  if (!/^[A-Za-z][A-Za-z .'-]{1,48}$/.test(s)) return 'City can only contain letters and spaces.';
      return '';
    },
    askAddress: (v) => {
      const s = v.trim();
      if (s.length < 10) return 'Address seems too short. Add house/street, area and pincode.';
      if (!/\b\d{6}\b/.test(s)) return 'Please include a valid 6-digit pincode.';
      return '';
    },
    askMobile: (v) => {
      const digits = v.replace(/\D/g, '');
      if (digits.length !== 10) return 'Enter a 10-digit mobile number.';
      if (!/^[6-9]/.test(digits)) return 'Mobile should start with 6/7/8/9.';
      return '';
    }
  };

  const triggerInvalid = (msg) => {
    setErrorText(msg);
    setInvalidPulse(true);
    setTimeout(() => setInvalidPulse(false), 450);
  };

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      setUserActivity(prev => ({
        ...prev,
        lastInteraction: new Date(),
        messageCount: prev.messageCount + 1
      }));
    };

    if (messages.length > 0 && messages[messages.length - 1].fromUser) {
      updateActivity();
    }
  }, [messages]);

  const closeWithFade = (duration = 350, callback) => {
    setTimeout(() => {
      setIsOpen(false);
      if (typeof callback === 'function') callback();
    }, duration);
  };

  // Auto-open on page load disabled to avoid opening the chat after refresh.
  // Chat now opens only when the user clicks the widget button.

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  // (removed) previous one-time nudge logic in favor of lively launcher effects

  // Repeating teaser popup every 10 seconds when the widget is closed
  useEffect(() => {
    // Start interval only when closed
    const start = () => {
      if (teaserTimerRef.current) return;
      teaserTimerRef.current = setInterval(() => {
        // Only show teaser if chat is closed
        if (!isOpen) {
          setShowTeaser(true);
        }
      }, 10000);
    };

    if (!isOpen) start();

    // Clear on open/unmount
    return () => {
      if (teaserTimerRef.current) {
        clearInterval(teaserTimerRef.current);
        teaserTimerRef.current = null;
      }
    };
  }, [isOpen]);

  // Auto-hide teaser after a short duration
  useEffect(() => {
    if (showTeaser) {
      if (teaserAutoHideRef.current) clearTimeout(teaserAutoHideRef.current);
      teaserAutoHideRef.current = setTimeout(() => setShowTeaser(false), 4000);
    }
    return () => {
      if (teaserAutoHideRef.current) {
        clearTimeout(teaserAutoHideRef.current);
        teaserAutoHideRef.current = null;
      }
    };
  }, [showTeaser]);

  useEffect(() => {
    // When widget opens first time, introduce the assistant 'Dudu' and offer a short suggestion.
    if (isOpen && messages.length === 0 && !introSentRef.current) {
      sendBotMessage("Hi 👋, I'm Dudu. I just need your full name, city, address, and mobile number to connect you. What's your full name?", 400);
      setStep('askName');
      introSentRef.current = true;
    }
  }, [isOpen, messages.length]);

  const sendBotMessage = (content, delay = 1000) => {
    setIsTyping(true);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    setTimeout(() => {
      setMessages((prev) => [...prev, { fromUser: false, text: content, id }]);
      setIsTyping(false);
    }, delay);
  };

  // All input validations removed per request — flow proceeds on any input.

  const getLocalResponse = async (userMessage) => {
    await new Promise((r) => setTimeout(r, 250));
  const topic = formData.service || 'the topic you provided';
  const pair = qaPairs.find((p) => p.q.test(userMessage));
  if (pair) return pair.a;
    
    if (/data|dataset|report|csv|excel/i.test(userMessage)) {
      return `We can prepare datasets and a research brief — please tell me the timeframe and key metrics you need.`;
    }
    if (/price|cost|fee|pricing|quote/i.test(userMessage)) {
      return `Pricing depends on scope. For "${topic}", please share desired depth (brief/standard/comprehensive) and timeline for a tailored quote.`;
    }
    if (/methodology|how|approach/i.test(userMessage)) {
      return `Our typical methodology for "${topic}" includes secondary research, expert interviews, and data analysis — tell me which you'd like to prioritise.`;
    }
    if (/what is (wise global|your company)|kya aap sebi/i.test(userMessage.toLowerCase())) {
      return `We are a SEBI-registered research analyst firm providing market research, stock insights and research reports. Established in 2024 and based in Indore, MP. We provide general research and analysis — not personalised investment advice or portfolio management; final investment decisions are your responsibility.`;
    }
    if (/charges|price|pricing|fees|charge/i.test(userMessage.toLowerCase())) {
      return `We have different subscription plans. Exact charges depend on the scope — would you like subscription details?`;
    }
    if (/thank|thanks|dhanyavad|shukriya/i.test(userMessage.toLowerCase())) {
      return `You're welcome! Is there anything else I can help you with?`;
    }
    if (/bye|goodbye|see you|exit|close/i.test(userMessage.toLowerCase())) {
      return `Thank you for chatting with us. Have a great day! Our team will contact you shortly.`;
    }
    
    return `Thanks for your message. How else can I assist you with "${formData.service || 'our services'}"?`;
  };

// Service selection flow removed — minimal capture only.

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = input.trim();
    const userMsgId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    if (validators[step]) {
      const err = validators[step](userMessage);
      if (err) {
        triggerInvalid(err);
        return;
      }
    }
    setMessages((prev) => [...prev, { fromUser: true, text: userMessage, id: userMsgId }]);
    setInput('');
    setErrorText('');
    
    // Flow: askName -> askCity -> askMobile -> askService -> deep questions -> conversion
    if (step === 'askName') {
      setFormData((prev) => ({ ...prev, name: userMessage.trim() }));
      sendBotMessage(`Nice to meet you, ${userMessage.trim()}. Please tell us your city.`, 600);
      setStep('askCity');
      return;
    }

    if (step === 'askCity') {
      setFormData((prev) => ({ ...prev, city: userMessage.trim() }));
      sendBotMessage(`Thanks. Please share your full address (house/street, area, pincode).`, 600);
      setStep('askAddress');
      return;
    }

    if (step === 'askAddress') {
      setFormData((prev) => ({ ...prev, address: userMessage.trim() }));
      sendBotMessage(`Got it. Please share your mobile number so we can contact you.`, 600);
      setStep('askMobile');
      return;
    }

    if (step === 'askMobile') {
      const rawMobile = userMessage.trim();
      const digitsOnly = rawMobile.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: digitsOnly }));

      // submit collected details and finish the conversation
      const submissionData = {
        ...formData,
        address: formData.address || '',
        mobile: digitsOnly,
        message: `Inquiry via Chat: ${formData.name || 'Unknown'} | ${formData.city || 'Unknown City'} | ${digitsOnly}`,
        honeypot: '',
        // server will set timestamp
        status: 'New',
        userActivity: {
          lastInteraction: userActivity.lastInteraction instanceof Date ? userActivity.lastInteraction.getTime() : null,
          messageCount: userActivity.messageCount,
          sessionStart: userActivity.sessionStart instanceof Date ? userActivity.sessionStart.getTime() : null
        }
      };

  api.post('/chatbot-submissions', submissionData)
        .then((res) => {
          if (!res.ok) throw new Error('Server rejected');
          sendBotMessage(`Thank you, ${formData.name || ''}! We've received your details. Our team will contact you shortly on ${digitsOnly}.`, 700);
          // close and reset after a short delay so user can read message
          setTimeout(() => {
            closeWithFade(500, () => {
              setMessages([]);
              setFormData({ name: '', city: '', address: '', mobile: '', service: '', extra: {} });
              setStep('greeting');
              introSentRef.current = false;
            });
          }, 2200);
        })
        .catch((error) => {
          console.error('Error saving data to Firebase: ', error);
          sendBotMessage('Sorry, a technical problem occurred while saving your details. Please try again later.', 700);
        });

      return;
    }

    if (step === 'askService') {
      // Service selection is now handled by the ServiceButtons component and handleServiceSelection function
      // We can leave this block empty or add a fallback message
      sendBotMessage('Please select a service from the options above.', 600);
      return;
    }

    // Deep question flows
    if (step === 'stock-period') {
      // record preference
      setFormData((prev) => ({ ...prev, extra: { ...prev.extra, stockPeriod: userMessage } }));
      sendBotMessage('Are you a beginner or do you already have experience?', 600);
      setStep('stock-experience');
      return;
    }

    if (step === 'stock-experience') {
      setFormData((prev) => ({ ...prev, extra: { ...prev.extra, experience: userMessage } }));
      sendBotMessage('Thank you — our team will prepare personalized tips for you. Would you like us to send you FREE demo tips on WhatsApp?', 800);
      setStep('conversion');
      return;
    }

    if (step === 'investment-details') {
      setFormData((prev) => ({ ...prev, extra: { ...prev.extra, investmentPrefs: userMessage } }));
      sendBotMessage('Understood. Our team will contact you. Would you like to receive FREE demo tips on WhatsApp?', 800);
      setStep('conversion');
      return;
    }

    if (step === 'intraday-details') {
      setFormData((prev) => ({ ...prev, extra: { ...prev.extra, intradayPrefs: userMessage } }));
      sendBotMessage('Thanks — our trading desk will contact you. Would you like to receive FREE demo tips on WhatsApp?', 800);
      setStep('conversion');
      return;
    }

  if (step === 'conversion') {
      // capture opt-in yes/no
      if (/yes|haan|h|yep|sure|1|ok|okay/i.test(userMessage.toLowerCase())) {
    // Details already saved after mobile; just confirm
    sendBotMessage('Great! Our team will contact you to send FREE demo tips on WhatsApp. Thank you 🙏', 700);
    // explicit follow-up confirmation
    sendBotMessage('Our team will contact you shortly on the mobile number you provided — please be available.', 1200);
    // final thank you and keep chat open
    setStep('chatting');
    // close and reset the widget shortly after messages are delivered
    setTimeout(() => {
      closeWithFade(400, () => {
      // clear messages and reset form so next open is fresh
      setMessages([]);
      setFormData({ name: '', city: '', address: '', mobile: '', service: '', extra: {} });
      setStep('greeting');
      // allow intro to be sent again if needed in later sessions
      introSentRef.current = false;
      });
    }, 2600);
        return;
      }
      if (/no|nah|nahi|0|not now|later/i.test(userMessage.toLowerCase())) {
        sendBotMessage('Okay — we are always here if you ever need us. Our team will still contact you for the inquiry.', 700);
        setStep('chatting');
        return;
      }
      // otherwise treat as general chat
      setIsTyping(true);
      try {
        const aiResponse = await getLocalResponse(userMessage);
        sendBotMessage(aiResponse, 600);
      } catch (err) {
        sendBotMessage('Sorry, something went wrong. Please try again later.');
      } finally {
        setIsTyping(false);
      }
      return;
    }

    if (step === 'chatting') {
      setIsTyping(true);
      try {
        const aiResponse = await getLocalResponse(userMessage);
        sendBotMessage(aiResponse, 600);
      } catch (err) {
        sendBotMessage('Sorry, something went wrong. Please try again later.');
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Input placeholder based on step
  const getInputPlaceholder = () => {
    switch(step) {
  case 'askName': return 'Your full name';
  case 'askCity': return 'Your city';
  case 'askAddress': return 'Your full address with pincode';
  case 'askMobile': return 'Your mobile number';
      default: return 'Type a message...';
    }
  };

  // Input type based on step
  const getInputType = () => {
    switch(step) {
      case 'askMobile': return 'tel';
      default: return 'text';
    }
  };

  // No input pattern — validations removed

  const StepIndicator = () => {
    const stepContent = {
      askName: { icon: FaUser, label: 'Name', color: 'text-blue-500' },
      askCity: { icon: FaCity, label: 'City', color: 'text-green-500' },
  askAddress: { icon: FaMapMarkerAlt, label: 'Address', color: 'text-rose-500' },
      askMobile: { icon: FaPhone, label: 'Mobile', color: 'text-purple-500' },
    };

    const currentStep = stepContent[step];
    if (!currentStep) return null;

    const Icon = currentStep.icon;

    return (
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 ${currentStep.color}`}
          >
            <Icon />
            <span>{currentStep.label}</span>
          </motion.div>
        </AnimatePresence>
        <div className="flex-1 h-px bg-gray-200 ml-1"></div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-widget"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-80 mr-16 h-[28rem] bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden relative z-40"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-full">
                  <ChatLogo className="w-6 h-6" animated />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold">Dudu</span>
                  <div className="flex items-center gap-1 text-[11px] text-white/90">
                    <motion.span
                      className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                    {isTyping ? (
                      <div className="flex items-center gap-1">
                        <span className="opacity-90">Typing</span>
                        <motion.span className="w-1 h-1 bg-white rounded-full" animate={{ y: [0, -2, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }} />
                        <motion.span className="w-1 h-1 bg-white rounded-full" animate={{ y: [0, -2, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }} />
                        <motion.span className="w-1 h-1 bg-white rounded-full" animate={{ y: [0, -2, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.36 }} />
                      </div>
                    ) : (
                      <span className="opacity-90">Online</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    closeWithFade(300, () => {
                      setMessages([]);
                      setFormData({ name: '', city: '', address: '', mobile: '', service: '', extra: {} });
                      setStep('greeting');
                      introSentRef.current = false;
                    })
                  }
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                >
                  End Chat
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gradient-to-b from-indigo-50/70 to-white/80">
              {messages.length === 0 ? (
                <div className="text-center mt-8">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-gradient-to-r from-indigo-600 to-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ChatLogo className="w-8 h-8" animated />
                  </motion.div>
                  <p className="text-gray-700 mt-4 font-medium">Welcome to Wise Global Research Services</p>
                  <p className="text-gray-600 text-xs mt-2">Ask about research services, pricing, timelines, or request a sample report.</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}>
                      <motion.div layout className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.fromUser ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none' : 'bg-white/90 backdrop-blur text-gray-800 rounded-bl-none shadow-sm border border-gray-100'}`} whileTap={{ scale: 0.98 }}>
                        {typeof msg.text === 'string' ? msg.text : msg.text}
                      </motion.div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/90 backdrop-blur text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                          <motion.div className="relative px-3 py-2 rounded-2xl bg-white shadow border border-gray-100" initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: [0.6, 1, 0.6], y: [6, 0, -4, 0, 6], scale: [0.95, 1, 0.98, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} aria-live="polite">
                            <div className="text-[11px] text-gray-700 whitespace-nowrap">I’m Dudu — how can I assist you?</div>
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full border border-gray-100"></span>
                            <span className="absolute -bottom-3 -left-2 w-1.5 h-1.5 bg-white rounded-full border border-gray-100"></span>
                          </motion.div>
                          <div className="flex items-center gap-1">
                            <motion.span className="w-2 h-2 bg-gray-400 rounded-full inline-block" animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }} />
                            <motion.span className="w-2 h-2 bg-gray-400 rounded-full inline-block" animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }} />
                            <motion.span className="w-2 h-2 bg-gray-400 rounded-full inline-block" animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.36 }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 bg-white">
              {step !== 'chatting' && step !== 'askService' && <StepIndicator />}
              <motion.div animate={invalidPulse ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }} transition={{ duration: 0.45 }} className="flex items-center gap-2">
                <input
                  type={getInputType()}
                  placeholder={getInputPlaceholder()}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-white/90 backdrop-blur"
                  disabled={step === 'askService'}
                />
                <motion.button onClick={handleSend} disabled={input.trim() === '' || step === 'askService'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </motion.div>
              {errorText && <div className="mt-2 text-xs text-rose-600 font-medium">{errorText}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button - always visible, fixed position */}
      <div className="relative z-50 mt-2">
        <AnimatePresence>
          {showTeaser && !isOpen && (
            <motion.div
              key="chat-teaser"
              initial={{ opacity: 0, x: 8, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute right-full mr-3 top-1/3-translate-y-[60%] bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-lg border border-gray-100 text-xs text-gray-800 max-w-[240px] cursor-pointer"
              role="status"
              aria-live="polite"
              onClick={() => {
                setIsOpen(true);
                setShowTeaser(false);
              }}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                </div>
                <div className="flex-1">Hii, I’m Dudu.</div>
                <button onClick={() => setShowTeaser(false)} className="ml-1 text-gray-400 hover:text-gray-600" aria-label="Dismiss chat teaser">
                  <FaTimes size={10} />
                </button>
              </div>
              <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" aria-hidden="true"></span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          key="chat-open-button"
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          onClick={() => {
            setIsOpen(true);
            setShowTeaser(false);
          }}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-14 h-14 p-0 rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center"
          aria-label="Open Dudu chat"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0.95, rotate: 0, y: 0 }}
            animate={{ scale: [0.96, 1, 0.96], opacity: 1, rotate: [-3, 3, -2, 2, 0], y: [0, -1.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-9 h-9 relative"
          >
            <ChatLogo className="w-9 h-9" animated />
            <motion.span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/90" initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-white/70" initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;