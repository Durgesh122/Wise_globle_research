import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaTimes, FaUser, FaCity, FaPhone, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

// Service buttons removed — chat now only collects name, city and mobile.

const ValidationMessage = ({ message, isValid }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className={`flex items-center mt-1 text-xs ${isValid ? 'text-green-600' : 'text-red-600'}`}
    >
      {isValid ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
      {message}
    </motion.div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('greeting');
  const [formData, setFormData] = useState({ 
    name: '', 
    city: '', 
    mobile: '', 
    service: '', 
    extra: {} 
  });
  const [validation, setValidation] = useState({
    name: { isValid: false, message: '' },
    city: { isValid: false, message: '' },
    mobile: { isValid: false, message: '' }
  });
  const [messages, setMessages] = useState([]);
  const [recentMsgIds, setRecentMsgIds] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const introSentRef = useRef(false);
  const [userActivity, setUserActivity] = useState({
    lastInteraction: null,
    messageCount: 0,
    sessionStart: new Date()
  });

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

  useEffect(() => {
    // When widget opens first time, introduce the assistant 'Dugu' and offer a short suggestion.
    if (isOpen && messages.length === 0 && !introSentRef.current) {
      sendBotMessage("Hello 👋, I am Dugu — I can suggest services to you. I only need three details to connect you: your full name, your city and your mobile number. Please tell me your full name to get started.", 400);
      setStep('askName');
      introSentRef.current = true;
    }
  }, [isOpen, messages.length]);

  const sendBotMessage = (content, delay = 1000) => {
    setIsTyping(true);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    setTimeout(() => {
      setMessages((prev) => [...prev, { fromUser: false, text: content, id }]);
      // mark as recent for a short animation
      setRecentMsgIds((prev) => [...prev, id]);
      setTimeout(() => setRecentMsgIds((prev) => prev.filter(x => x !== id)), 900);
      setIsTyping(false);
    }, delay);
  };

  const validateName = (name) => {
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Name should be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return { isValid: false, message: 'Name should contain only letters and spaces' };
    }
    return { isValid: true, message: 'Valid name' };
  };

  const validateCity = (city) => {
    if (city.trim().length < 2) {
      return { isValid: false, message: 'Please enter a valid city name' };
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      return { isValid: false, message: 'City name should contain only letters and spaces' };
    }
    return { isValid: true, message: 'Valid city' };
  };

  const validateMobile = (mobile) => {
    const digits = mobile.replace(/\D/g, '');
    if (digits.length < 10) {
      return { isValid: false, message: 'Mobile number should be 10 digits' };
    }
    if (!/^[6-9]\d{9}$/.test(digits)) {
      return { isValid: false, message: 'Please enter a valid Indian mobile number' };
    }
    return { isValid: true, message: 'Valid mobile number' };
  };

  const getLocalResponse = async (userMessage) => {
    await new Promise((r) => setTimeout(r, 250));
    const topic = formData.service || 'the topic you provided';
    
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
  setMessages((prev) => [...prev, { fromUser: true, text: userMessage, id: userMsgId }]);
  setRecentMsgIds((prev) => [...prev, userMsgId]);
  setTimeout(() => setRecentMsgIds((prev) => prev.filter(x => x !== userMsgId)), 900);
    setInput('');
    
    // Flow: askName -> askCity -> askMobile -> askService -> deep questions -> conversion
    if (step === 'askName') {
      const nameValidation = validateName(userMessage);
      setValidation(prev => ({...prev, name: nameValidation}));
      
      if (!nameValidation.isValid) {
        sendBotMessage(nameValidation.message, 600);
        return;
      }
      
      setFormData((prev) => ({ ...prev, name: userMessage.trim() }));
      sendBotMessage(`Nice to meet you, ${userMessage.trim()}. Please tell us your city.`, 600);
      setStep('askCity');
      return;
    }

    if (step === 'askCity') {
      const cityValidation = validateCity(userMessage);
      setValidation(prev => ({...prev, city: cityValidation}));
      
      if (!cityValidation.isValid) {
        sendBotMessage(cityValidation.message, 600);
        return;
      }
      
      setFormData((prev) => ({ ...prev, city: userMessage.trim() }));
      sendBotMessage(`Got it — ${userMessage.trim()}. Please share your mobile number so we can contact you.`, 600);
      setStep('askMobile');
      return;
    }

    if (step === 'askMobile') {
      const mobileValidation = validateMobile(userMessage);
      setValidation(prev => ({...prev, mobile: mobileValidation}));
      
      if (!mobileValidation.isValid) {
        sendBotMessage(mobileValidation.message, 600);
        return;
      }
      
      // accept last 10 digits to be tolerant of country code
      const digits = userMessage.replace(/\D/g, '');
      const mobile10 = digits.slice(-10);
      setFormData((prev) => ({ ...prev, mobile: mobile10 }));

      // submit collected details and finish the conversation
      const submissionData = {
        ...formData,
        mobile: mobile10,
        timestamp: serverTimestamp(),
        status: 'New',
        userActivity: userActivity
      };

      push(ref(db, 'chatbot-submissions'), submissionData)
        .then(() => {
          sendBotMessage(`Thank you, ${formData.name || ''}! We've received your details. Our team will contact you shortly on ${mobile10}.`, 700);
          // close and reset after a short delay so user can read message
          setTimeout(() => {
            closeWithFade(500, () => {
              setMessages([]);
              setFormData({ name: '', city: '', mobile: '', service: '', extra: {} });
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
        const submissionData = {
            ...formData,
            timestamp: serverTimestamp(),
            status: 'New', // Add a default status
            userActivity: userActivity
        };

        push(ref(db, 'chatbot-submissions'), submissionData)
            .then(() => {
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
                    setFormData({ name: '', city: '', mobile: '', service: '', extra: {} });
                    setStep('greeting');
                    // allow intro to be sent again if needed in later sessions
                    introSentRef.current = false;
                    });
                }, 2600);
            })
            .catch((error) => {
                console.error("Error saving data to Firebase: ", error);
                sendBotMessage('Sorry, a technical problem has occurred. Please try again after some time.', 700);
                setStep('chatting');
            });
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
      case 'askName': return 'Your full name (letters only)';
      case 'askCity': return 'Your city (letters only)';
      case 'askMobile': return '10-digit mobile number';
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

  // Input pattern for validation
  const getInputPattern = () => {
    switch(step) {
  case 'askName': return '[A-Za-z ]+';
  case 'askCity': return '[A-Za-z ]+';
      default: return null;
    }
  };

  const StepIndicator = () => {
    const stepContent = {
      askName: { icon: FaUser, label: 'Name', color: 'text-blue-500' },
      askCity: { icon: FaCity, label: 'City', color: 'text-green-500' },
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
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat-widget"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-80 h-[28rem] bg-white/95 backdrop-blur-md shadow-2xl rounded-xl border border-gray-200 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-full">
                  <FaCommentDots />
                </div>
                <span className="font-bold">Dugu — Wise Global</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => closeWithFade(300, () => { 
                    setMessages([]); 
                    setFormData({ name: '', city: '', mobile: '', service: '', extra: {} }); 
                    setStep('greeting'); 
                    introSentRef.current = false; 
                  })} 
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                >
                  End Chat
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gradient-to-b from-blue-50 to-white">
              {messages.length === 0 ? (
                <div className="text-center mt-8">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  >
                    <FaCommentDots className="text-white text-2xl" />
                  </motion.div>
                  <p className="text-gray-700 mt-4 font-medium">Welcome to Wise Global Research Services</p>
                  <p className="text-gray-600 text-xs mt-2">Ask about market research, data requests, product insights or reports — I'll assist.</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => {
                    const isRecent = msg.id && recentMsgIds.includes(msg.id);
                    return (
                      <motion.div 
                        key={msg.id || idx} 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={isRecent ? { opacity: 1, y: 0, scale: [1.06, 0.98, 1], boxShadow: msg.fromUser ? '0 10px 30px rgba(59,130,246,0.18)' : '0 8px 24px rgba(0,0,0,0.06)' } : { opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: isRecent ? 0.5 : 0.3, ease: 'easeOut' }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.fromUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none shadow-sm'}`}>
                          {typeof msg.text === 'string' ? msg.text : msg.text}
                        </div>
                      </motion.div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 bg-white">
              {/* Validation messages */}
              <AnimatePresence>
                {step === 'askName' && validation.name.message && (
                  <ValidationMessage 
                    message={validation.name.message} 
                    isValid={validation.name.isValid} 
                  />
                )}
                {step === 'askCity' && validation.city.message && (
                  <ValidationMessage 
                    message={validation.city.message} 
                    isValid={validation.city.isValid} 
                  />
                )}
                {step === 'askMobile' && validation.mobile.message && (
                  <ValidationMessage 
                    message={validation.mobile.message} 
                    isValid={validation.mobile.isValid} 
                  />
                )}
              </AnimatePresence>

              {/* Step indicator */}
              {step !== 'chatting' && step !== 'askService' && <StepIndicator />}

              <div className="flex items-center gap-2">
                <input
                  type={getInputType()}
                  placeholder={getInputPlaceholder()}
                  pattern={getInputPattern()}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  disabled={step === 'askService'}
                />
                <motion.button 
                  onClick={handleSend} 
                  disabled={input.trim() === '' || step === 'askService'} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            <motion.div
              animate={{
                y: [-8, -28],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut",
              }}
              className="absolute top-0 left-1/2 w-3 h-3 bg-white/80 rounded-full"
              style={{ translateX: '-50%' }}
            />
            <motion.button
              key="chat-open-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-14 h-14 p-0 rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center"
              aria-label="Open Wise Global chat"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="100%"
                height="100%"
                className="w-full h-full"
                initial={{ y: 0 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <g transform="translate(0,8)">
                  <circle cx="32" cy="24" r="14" fill="rgba(255,255,255,0.95)" />
                  <rect x="30" y="6" width="4" height="8" rx="2" fill="rgba(255,255,255,0.95)" />
                  <circle cx="32" cy="6" r="2" fill="rgba(255,255,255,0.95)" />
                  <motion.circle cx="25" cy="23" r="2" fill="#0b3b66"
                    animate={{ scaleY: [1, 0.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.5, 1], ease: 'easeInOut' }}
                  />
                  <motion.circle cx="39" cy="23" r="2" fill="#0b3b66"
                    animate={{ scaleY: [1, 0.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, times: [0.2, 0.7, 1], ease: 'easeInOut' }}
                  />
                  <path d="M25 30 C28 34, 36 34, 39 30" stroke="#0b3b66" strokeWidth="2" fill="transparent" strokeLinecap="round" />
                  <path d="M44 36 L50 40 L46 44" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.95)" />
                </g>
              </motion.svg>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;