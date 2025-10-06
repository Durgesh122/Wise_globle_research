import React, { useState, useEffect, useRef, useId } from 'react';
import { FaTimes, FaUser, FaCity, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { db } from '../firebase';
import { ref as dbRef, push, set, update } from 'firebase/database';
import { services } from '../pages/Services';

// Chat badge icon (uses FaRobot) — replaces the earlier SVG robot with a simpler badge
const ChatLogo = ({ className = 'w-6 h-6', animated = false }) => {
  const reduceMotion = useReducedMotion();
  const id = useId();
  const groupAnimate = !reduceMotion && animated ? { y: [0, -3, 0], scale: [1, 1.06, 1] } : undefined;
  return (
    <motion.div
      className={`${className} rounded-[10px] flex items-center justify-center bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white`}
      aria-hidden="true"
      initial={animated ? { rotate: 0 } : false}
      animate={animated ? { rotate: [0, -3, 3, -1.5, 0] } : undefined}
      transition={animated ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      {/* Inline widgetIcon1.svg (converted to JSX) animated via framer-motion */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* animated background blob */}
          <motion.span
            className="absolute inset-0 rounded-[10px]"
            aria-hidden="true"
            animate={!reduceMotion ? { scale: [1, 1.06, 1], rotate: [0, 2, -1, 0] } : undefined}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(90deg, rgba(201, 157, 36, 0.98), rgba(103, 140, 18, 0.88))' }}
          />
          <motion.svg viewBox="0 0 40 9.684" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-3/4 h-3/4 relative z-10" aria-hidden="true">
            <defs>
              <clipPath id={`chatlogoClip-${id}`}><path fill="#fff" d="M0 0h40v9.684H0z" /></clipPath>
            </defs>
            <motion.g clipPath={`url(#chatlogoClip-${id})`} fill="#000" animate={groupAnimate} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <path d="M.361 4.842C.361 2.316 2.409.268 4.935.268s4.574 2.048 4.574 4.574-2.048 4.574-4.574 4.574S.361 7.368.361 4.842zm30.377 0c0-2.526 2.048-4.574 4.574-4.574s4.574 2.048 4.574 4.574-2.048 4.574-4.574 4.574-4.574-2.048-4.574-4.574zm-5.868 0a4.57 4.57 0 0 1-.348 1.75 4.59 4.59 0 0 1-.991 1.484c-.424.425-.929.762-1.484.992a4.57 4.57 0 0 1-3.5 0c-.555-.23-1.059-.567-1.484-.992s-.762-.929-.991-1.484a4.59 4.59 0 0 1-.348-1.75h9.147z" />
            </motion.g>
          </motion.svg>
        </div>
    </motion.div>
  );
};

// Autonomous chatbot (English-only). No data collection or external JSON used.
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('greeting');
  const [formData, setFormData] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Periodic teaser when closed
  const [errorText, setErrorText] = useState('');
  const [invalidPulse] = useState(false);
  const messagesEndRef = useRef(null);
  const introSentRef = useRef(false);
  const inputRef = useRef(null);
  const [pendingSubmissionKey, setPendingSubmissionKey] = useState(null);
  // Teaser popup state and timers
  const [showTeaser, setShowTeaser] = useState(false);
  const teaserTimerRef = useRef(null);
  const teaserAutoHideRef = useRef(null);
  // Topic / service UI state
  const [showTopicOptions, setShowTopicOptions] = useState(false);
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Track unread messages received while the widget is closed
  const [unreadCount, setUnreadCount] = useState(0);
  const origFaviconRef = useRef(null);

  // Helper: set favicon href (creates link if missing)
  const setFaviconHref = (href) => {
    if (typeof document === 'undefined') return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  };

  // Create a small red badge favicon (canvas) with count (or dot)
  const makeRedDotFavicon = (count) => {
    if (typeof document === 'undefined') return '';
    const size = 64;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    // transparent background
    ctx.clearRect(0, 0, size, size);
    // red circle
    ctx.fillStyle = '#ef4444'; // red-500
    const cx = size - 16;
    const cy = 16;
    const r = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    // white count text
    ctx.fillStyle = '#0e0e0eff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const label = count > 99 ? '99+' : String(count);
    // If too long, just show dot
    if (label.length <= 3) ctx.fillText(label, cx, cy + 1);
    return c.toDataURL('image/png');
  };

  // (Removed system desktop notifications) — we only show in-tab badge, favicon and title updates.

  // Inject small keyframes for bobbing animation once
  useEffect(() => {
    try {
      const ID = 'chat-widget-animations';
      if (document.getElementById(ID)) return;
      const style = document.createElement('style');
      style.id = ID;
    style.textContent = `
  /* damru-tilt: small alternating rotations resembling a damru drum shake */
  @keyframes damru-tilt { 0% { transform: rotate(0deg);} 10% { transform: rotate(-12deg);} 20% { transform: rotate(10deg);} 30% { transform: rotate(-8deg);} 40% { transform: rotate(6deg);} 50% { transform: rotate(-4deg);} 60% { transform: rotate(4deg);} 70% { transform: rotate(-2deg);} 80% { transform: rotate(2deg);} 100% { transform: rotate(0deg);} } 
  @keyframes chat-shake { 0% { transform: translateX(0) rotate(0deg);} 20% { transform: translateX(-2px) rotate(-2deg);} 40% { transform: translateX(2px) rotate(2deg);} 60% { transform: translateX(-1px) rotate(-1deg);} 80% { transform: translateX(1px) rotate(1deg);} 100% { transform: translateX(0) rotate(0deg);} } 

  /* Zigzag / half-round animated border for launcher */
  @keyframes zigzag-move {
    0% { background-position: 0% 50%; } 
    25% { background-position: 25% 60%; } 
    50% { background-position: 50% 40%; } 
    75% { background-position: 75% 60%; } 
    100% { background-position: 100% 50%; } 
  }

  .chat-launcher-animated-border {
    position: relative;
    overflow: visible;
  }

  /* using a pseudo-element simulated via an inner span to create a half-round zigzag border */
  .chat-launcher-animated-border .border-effect {
    pointer-events: none;
    position: absolute;
    inset: -6px -6px auto -6px; /* top/bottom/left/right offsets: show around top half */
    height: 36px; /* controls visible band height for half-round */
    border-radius: 14px; /* rounded look */
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0.06) 11%, rgba(255,255,255,0) 12%);
    z-index: 30;
    mix-blend-mode: screen;
    background-size: 200% 200%;
    transform-origin: center;
    animation: zigzag-move 3.2s linear infinite;
    -webkit-mask-image: radial-gradient(closest-side at 50% 100%, black 40%, transparent 100%);
    mask-image: radial-gradient(closest-side at 50% 100%, black 40%, transparent 100%);
  }

  /* stronger colored zigzag overlay using repeating-linear-gradient */
  .chat-launcher-animated-border .border-effect::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: repeating-linear-gradient(90deg, rgba(255,255,255,0) 0 6px, rgba(255,255,255,0.12) 6px 12px);
    mix-blend-mode: screen;
    filter: blur(6px);
    opacity: 0.95;
    transform: translateZ(0);
  }

  /* alternative colorful stroke around top edges */
  .chat-launcher-animated-border.hovered .border-effect {
    background: linear-gradient(90deg, rgba(37,211,102,0.95) 0%, rgba(18,140,126,0.95) 50%, rgba(99,102,241,0.95) 100%);
    background-size: 300% 100%;
    animation: zigzag-move 2.6s linear infinite;
    filter: drop-shadow(0 6px 12px rgba(18,140,126,0.12));
  }

  @media (prefers-reduced-motion: reduce) {
    .chat-bob, .chat-shake, .chat-launcher-animated-border .border-effect { animation: none !important; }
  }
  /* when there are unread messages, slightly intensify the damru tilt and shake */
  .chat-launcher-unread { animation: damru-tilt 1.2s ease-in-out infinite, chat-shake 2s ease-in-out 0s infinite !important; }
  .chat-launcher-unread .border-effect { filter: drop-shadow(0 8px 18px rgba(37,211,102,0.18)); transform: translateZ(0) scale(1.03); }
      `;
      document.head.appendChild(style);
    } catch (e) {
      // ignore
    }
  }, [messages.length]);

  // To make the chatbot more intelligent, you can replace getLocalResponse 
  // with a function that calls an AI service like Gemini or ChatGPT.
  // For now, it uses a predefined set of questions and answers.

  // Derive topic options and services mapping from exported `services` in Services.js
  // Use service.category as topic and map service entries under each category
  const topicOptions = Array.from(new Set(services.map((s) => s.category))).filter(Boolean);

  const servicesByTopic = topicOptions.reduce((acc, topic) => {
    acc[topic] = services
      .filter((s) => s.category === topic)
      .map((s, i) => ({ id: `${topic.toLowerCase().replace(/\s+/g, '-')}-${i}`, title: s.name, desc: s.description }));
    return acc;
  }, {});

  // Track user activity minimally (message count and last interaction)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].fromUser) {
      // update last interaction/time in local state if needed later
      // kept minimal to avoid unused variable warnings
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

  // Keep the input focused when step changes or widget opens so user can continue typing
  useEffect(() => {
    if (!isOpen) return;
    // small delay to allow input to mount
    const t = setTimeout(() => {
      try { inputRef.current?.focus(); } catch (e) {}
    }, 60);
    return () => clearTimeout(t);
  }, [step, isOpen]);

  // Listen for a custom event so mobile tray can open the chat
  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener('open-chat-widget', handler);
    // Also listen on window as some environments dispatch there
    window.addEventListener && window.addEventListener('open-chat-widget', handler);
    // Expose a global fallback function
    try {
      window.openChatWidget = handler;
    } catch (e) {}
    return () => {
      document.removeEventListener('open-chat-widget', handler);
      window.removeEventListener && window.removeEventListener('open-chat-widget', handler);
      try { if (window.openChatWidget === handler) delete window.openChatWidget; } catch (e) {}
    };
  }, []);


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

  // Increment unread counter when a bot message arrives while the widget is closed
  useEffect(() => {
    if (typeof document !== 'undefined' && origFaviconRef.current === null) {
      const link = document.querySelector("link[rel~='icon']");
      origFaviconRef.current = link ? link.href : null;
    }

    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last && !last.fromUser) {
        setUnreadCount((c) => {
          const next = c + 1;
          // show in-tab notification: favicon/title/badge already handled below
          // update favicon to red badge
          try {
            const faviconData = makeRedDotFavicon(next);
            if (faviconData) setFaviconHref(faviconData);
          } catch (e) {}
          return next;
        });
      }
    }
  }, [messages, isOpen]);

  // Clear unread count whenever user opens the widget and start the conversation
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (messages.length === 0 && !introSentRef.current) {
        setIsTyping(true);
        const _id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setTimeout(() => {
          setMessages((prev) => [...prev, { fromUser: false, text: "Hello! To help you better, let's start with a few details. What is your name?", id: _id }]);
          setIsTyping(false);
        }, 400);
        setStep('askName');
        introSentRef.current = true;
      }
    }
  }, [isOpen, messages.length]);

  // Show unread count in the browser tab title when widget is closed
  useEffect(() => {
    if (typeof document === 'undefined') return;
    // remember original title once
    let original = document.title || '';
    let stored = document.body.getAttribute('data-chat-original-title');
    if (!stored) document.body.setAttribute('data-chat-original-title', original);

    if (!isOpen && unreadCount > 0) {
      document.title = `(${unreadCount}) ${original}`;
    } else {
      // restore
      const orig = document.body.getAttribute('data-chat-original-title') || original;
      document.title = orig;
    }

    // cleanup on unmount: restore original
    return () => {
      const orig = document.body.getAttribute('data-chat-original-title') || original;
      document.title = orig;
    };
  }, [unreadCount, isOpen]);

  // Restore favicon when unread cleared or widget opened; restore on unmount
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen || unreadCount === 0) {
      // restore original favicon
      try {
        if (origFaviconRef.current) setFaviconHref(origFaviconRef.current);
      } catch (e) {}
    }

    return () => {
      try {
        if (origFaviconRef.current) setFaviconHref(origFaviconRef.current);
      } catch (e) {}
    };
  }, [isOpen, unreadCount]);

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
    const topic = formData.service || 'the topic you mentioned';

    // Greeting handling: reply and prompt for name
    if (/^\s*(hi|hello|hey|namaste|hii)\b/i.test(userMessage)) {
      return `Hello! To get started, may I have your full name?`;
    }

    // Fallback responses for common topics (English)
    if (/data|dataset|report|csv|excel/i.test(userMessage)) {
      return `We can prepare datasets and a research brief for you — please tell me the timeline and key metrics you need.`;
    }
    if (/intraday/i.test(userMessage)) {
      return `Intraday trading means buying and selling within the same trading day. Key points: use stop-losses, manage position size, prefer liquid stocks, and avoid excessive leverage. This is educational information, not financial advice.`;
    }
    if (/swing|delivery|positional/i.test(userMessage)) {
      return `Swing or positional trading holds positions for days to weeks. Focus on trend analysis, fundamental triggers and risk management. Consider diversification and position sizing.`;
    }
    if (/how to pick|stock pick|select stock|best stocks/i.test(userMessage)) {
      return `To pick stocks consider consistent revenue/earnings, reasonable valuation, sector momentum and liquidity. Use a combination of quantitative screening and qualitative analysis. This is educational only.`;
    }
    if (/indicator|rsi|macd|moving average|sma|ema/i.test(userMessage)) {
      return `Indicators like RSI, MACD and moving averages help identify momentum and trend. Combine indicators with price action and volume; avoid relying on a single signal and backtest before using live.`;
    }
    if (/what is (wise global|your company)|sebi|registered/i.test(userMessage.toLowerCase())) {
      return `We are a SEBI-registered research services firm providing market research, reports and analytics. We are located in Indore and offer research products — not personalised investment advice.`;
    }

    // Generic fallback (English)
    return `Thanks for your message. How can I help you with ${topic}? If you'd like, type 'topics' or 'services' to see what we offer.`;
  };

  // Validation helpers
  const invalidNameTokens = ['abc', 'xyz', 'test', 'aaa', 'bbb', 'abcd'];
  const isValidName = (name) => {
    if (!name) return false;
    const cleaned = name.trim().toLowerCase();
    if (cleaned.length < 3) return false;
    // reject obvious junk tokens or single-letter names
    if (invalidNameTokens.includes(cleaned)) return false;
    // require at least one letter and allow spaces, dots, hyphens
    if (!/[a-zA-Z]/.test(cleaned)) return false;
    // avoid names that are just greetings
    if (/^\s*(hi|hello|hey|namaste|hii)\b/i.test(name)) return false;
    return true;
  };

  const isValidCity = (city) => {
    if (!city) return false;
    const cleaned = city.trim();
    if (cleaned.length < 2 || cleaned.length > 40) return false;
    // reject any digits in city
    if (/\d/.test(cleaned)) return false;
    // allow up to 3 words (e.g., 'New Delhi') each with letters, hyphens or dots
    const words = cleaned.split(/\s+/);
    if (words.length > 3) return false;
    for (const w of words) {
      if (!/^[A-Za-z\u00C0-\u024F.-]+$/.test(w)) return false;
    }
    return true;
  };

  const isValidAddress = (addr) => {
    if (!addr) return false;
    const cleaned = addr.trim();
    // require at least 5 characters and do not allow standalone digits-only addresses
    if (cleaned.length < 5) return false;
    // address shouldn't be just numbers; require at least one alphabetic character
    if (!/[A-Za-z\u00C0-\u024F]/.test(cleaned)) return false;
    return true;
  };

  const isValidMobile = (m) => {
    if (!m) return false;
    const digits = m.replace(/\D/g, '');
    // Normalize to plain digits and check patterns
    // Accept 10-digit, or with country code 91 (e.g., 919876543210 or +919876543210), or leading 0
    let d = digits;
    // strip leading country/zeros for validation
    if (/^91\d{10}$/.test(d)) d = d.slice(2);
    if (/^0\d{10}$/.test(d)) d = d.slice(1);
    if (!/^\d{10}$/.test(d)) return false;
    // Indian mobile numbers must start with 6-9
    if (!/^[6-9]/.test(d)) return false;
    // reject trivial repeats like all digits same
    if (/^(\d)\1{9}$/.test(d)) return false;
    // reject common sequential substrings (e.g., 012345, 123456, 234567, ...)
    const badSeqs = ['012345', '123456', '234567', '345678', '456789', '567890'];
    for (const seq of badSeqs) {
      if (d.includes(seq)) return false;
    }
    return true;
  };

  const normalizeMobile = (m) => {
    if (!m) return null;
    let digits = m.replace(/\D/g, '');
    // handle leading 0 or country prefix 91
    if (digits.length === 13 && digits.startsWith('091')) {
      digits = digits.slice(3);
    }
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    }
    if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits.length === 10 ? digits : null;
  };

// Service selection flow removed — minimal capture only.

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = input.trim();
    const userMsgId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    // Add user's message to chat
    setMessages((prev) => [...prev, { fromUser: true, text: userMessage, id: userMsgId }]);
    setInput('');
    setErrorText('');

    // For autonomous chat, always use the local responder
    setIsTyping(true);
    try {
      const aiResponse = await getLocalResponse(userMessage);
      sendBotMessage(aiResponse, 500);
    } catch (err) {
      sendBotMessage('Sorry, something went wrong. Please try again later.');
    } finally {
      setIsTyping(false);
      // keep focus on the input so user can continue typing
      setTimeout(() => { try { inputRef.current?.focus(); } catch (e) {} }, 80);
    }
  };

  // When user selects a topic from options
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setFormData((f) => ({ ...f, topic }));
    setShowTopicOptions(false);
    setShowServiceOptions(true);
    // bot message: list services
    const id = `${Date.now()}-topic`;
    setMessages((prev) => [...prev, { fromUser: false, text: `Great — you selected: ${topic}. Which of these services interest you?`, id }]);
  };

  const handleSelectService = (service) => {
  // persist chosen service into formData so getLocalResponse/topic logic can use it
    setFormData((f) => ({ ...f, service: service.title }));
    setShowServiceOptions(false);
    // show service details and give confirmation
    const id = `${Date.now()}-service`;
    setMessages((prev) => [...prev, { fromUser: false, text: `${service.title}: ${service.desc}` , id }]);
    setTimeout(async () => {
      const finalId = `${Date.now()}-final`;
      setMessages((prev) => [...prev, { fromUser: false, text: `Thank you for your interest in ${service.title}. Our team will contact you shortly about this service.`, id: finalId }]);
      setStep('chatting'); // End of flow

      // prepare payload and save to Realtime Database
      const payload = {
        name: formData.name || '',
        city: formData.city || '',
        address: formData.address || '',
        mobile: formData.mobile || '',
        service: service.title || '',
  // include a short message to satisfy the DB write rule that requires a 'message' string
  message: `Interested in ${service.title} - ${service.desc || ''}`,
        timestamp: Date.now(),
        status: 'New',
      };

      try {
        if (pendingSubmissionKey) {
          // update existing partial submission
          const targetRef = dbRef(db, `chatbot-submissions/${pendingSubmissionKey}`);
          // ensure partial flag is cleared when updating with final data
          await update(targetRef, { ...payload, partial: false });
          setPendingSubmissionKey(null);
        } else {
          const submissionsRef = dbRef(db, 'chatbot-submissions');
          const newRef = push(submissionsRef);
          await set(newRef, payload);
        }
      } catch (e) {
        console.error('Failed to save chatbot submission', e);
      }

      // Close the widget after a short delay so user can read the final message
      closeWithFade(700, () => {
        setMessages([]);
        setFormData({ name: '', city: '', address: '', mobile: '', service: '', extra: {} });
        setStep('greeting');
        introSentRef.current = false;
      });
    }, 800);
  };

  // Handlers for collecting personal info step-by-step
  const submitName = (name) => {
    if (!name) {
      setErrorText('Please enter your name');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    if (!isValidName(name)) {
      setErrorText('Please enter a valid full name (no test words).');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    setErrorText('');
    setFormData((f) => ({ ...f, name }));
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const botId = `${Date.now()}-askcity`;
    setMessages((prev) => [...prev, { fromUser: true, text: name, id: userId }, { fromUser: false, text: `Thanks ${name}. Which city are you in?`, id: botId }]);
    setStep('askCity');
  };

  const submitCity = (city) => {
    if (!city) {
      setErrorText('Please enter your city');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    if (!isValidCity(city)) {
      setErrorText('Please enter a valid city name');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    setErrorText('');
    setFormData((f) => ({ ...f, city }));
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const botId = `${Date.now()}-askaddr`;
    setMessages((prev) => [...prev, { fromUser: true, text: city, id: userId }, { fromUser: false, text: `Got it — ${city}. Please share your full address.`, id: botId }]);
    setStep('askAddress');
  };

  const submitAddress = (address) => {
    const val = (address || '').trim();
    if (!val) {
      setErrorText('Address is required. Please enter your full address.');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    if (!isValidAddress(val)) {
      setErrorText('Please enter a valid address (at least 5 characters and include street/locality text; no digits-only).');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    setErrorText('');
    setFormData((f) => ({ ...f, address: val }));
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const botId = `${Date.now()}-askmobile`;
    setMessages((prev) => [...prev, { fromUser: true, text: val, id: userId }, { fromUser: false, text: `Thanks. Finally, please share your mobile number so our team can contact you.`, id: botId }]);
    setStep('askMobile');
  };

  const submitMobile = (mobile) => {
    if (!mobile) {
      setErrorText('Please enter your mobile number');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    const normalized = normalizeMobile(mobile);
    if (!isValidMobile(mobile) || !normalized) {
      setErrorText('Please enter a valid Indian mobile number (10 digits, starts with 6/7/8/9; allow +91 or leading 0). Avoid simple sequences like 123456 or repeating digits.');
      try { inputRef.current?.focus(); } catch (e) {}
      return;
    }
    setErrorText('');
    setFormData((f) => ({ ...f, mobile: normalized }));
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const botId = `${Date.now()}-asktopic`;
    setMessages((prev) => [...prev, { fromUser: true, text: normalized, id: userId }, { fromUser: false, text: `Thank you! Saving your contact...`, id: botId }]);

    // Save a partial submission so we can update later when service is selected
    (async () => {
      const payload = {
        name: formData.name || '',
        city: formData.city || '',
        address: formData.address || '',
        mobile: normalized || '',
        service: formData.service || '',
        // partial save marker
        partial: true,
        // include a minimal message so server record is informative
        message: 'Partial submission (mobile received)',
        timestamp: Date.now(),
        status: 'New',
      };

      // POST to server's submit-popup endpoint which uses Admin SDK to persist
      try {
        const resp = await fetch('http://localhost:3002/submit-popup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const json = await resp.json().catch(() => ({}));
        if (resp.ok && json && json.success) {
          setPendingSubmissionKey(json.key || null);
        } else {
          console.error('submit-popup returned error', json);
        }
      } catch (fetchErr) {
        console.error('Failed to POST partial submission to server', fetchErr);
      }

      // After partial save completes (or attempted), prompt user to select topic/services
      const doneId = `${Date.now()}-asktopic2`;
      setMessages((prev) => [...prev, { fromUser: false, text: `Now, let's find the right service for you. Which of these topics are you interested in?`, id: doneId }]);
      setShowTopicOptions(true);
      setStep('selectingTopic');

      // Send final submission to server which will persist it using Admin SDK
      try {
        const resp = await fetch('http://localhost:3002/submit-popup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const json = await resp.json().catch(() => ({}));
        if (resp.ok && json && json.success) {
          // successful server-side save; clear pending key if any
          setPendingSubmissionKey(null);
        } else {
          console.error('/submit-popup returned error', json);
        }
      } catch (fetchErr) {
        console.error('Failed to POST final submission to server', fetchErr);
      }
    })();

  };

  // Input type based on step
  const getInputType = () => {
    switch(step) {
      case 'askMobile': return 'tel';
      default: return 'text';
    }
  };

  // Placeholder text depending on the current step
  const getInputPlaceholder = () => {
    switch (step) {
      case 'askName': return 'Your full name';
      case 'askCity': return 'City (e.g., Indore)';
      case 'askAddress': return "Full address or 'skip'";
      case 'askMobile': return 'Mobile number (10 digits)';
      default: return 'Type a message...';
    }
  };

  // Handle Enter key and adapt behavior by step
  const handleKeyPress = (e) => {
    if (!e) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = (input || '').trim();
      if (!val) return;
      switch (step) {
        case 'askName':
          submitName(val);
          setInput('');
          break;
        case 'askCity':
          submitCity(val);
          setInput('');
          break;
        case 'askAddress':
          submitAddress(val);
          setInput('');
          break;
        case 'askMobile':
          submitMobile(val);
          setInput('');
          break;
        default:
          handleSend();
          break;
      }
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
            className="w-80 mr-16 h-[28rem] bg-white/90 backdrop-blur-xl shadow-2xl rounded-[28px] border border-gray-200 flex flex-col overflow-hidden relative z-40"
          >
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3 flex justify-between items-center rounded-t-[28px]">
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
                  type="button"
                  onClick={() =>
                    closeWithFade(300, () => {
                      setMessages([]);
                      setFormData({ name: '', city: '', address: '', mobile: '', service: '', extra: {} });
                      setStep('greeting');
                      introSentRef.current = false;
                    })
                  }
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                  aria-label="End chat and clear messages"
                >
                  End Chat
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const transcript = messages.map(m => `${m.fromUser ? 'User' : 'Bot'}: ${m.text}`).join('\n');
                      const notify = {
                        name: formData.name || 'Chat user',
                        email: formData.email || '',
                        mobile: formData.mobile || '',
                        interest: 'Chat Transcript',
                        message: transcript || '(no messages)',
                        source: 'ChatWidget',
                        to: 'hemraj8087@gmail.com,wiseglobalresearchservice@gmail.com'
                      };
                      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
                      const endpoint = isLocal ? '/send-email' : 'https://wise-globle-research-2.onrender.com/send-email';
                      await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(notify) });
                      // eslint-disable-next-line no-console
                      console.debug('Chat transcript sent to server');
                    } catch (err) {
                      // eslint-disable-next-line no-console
                      console.warn('Failed to send chat transcript', err);
                    }
                  }}
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                  aria-label="Email chat transcript to support"
                >
                  Email Transcript
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors" aria-label="Close chat">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gradient-to-b from-indigo-50/70 to-white/80">
              {/* Topic/service UI moved below messages to appear above input */}

              {messages.length === 0 ? (
                <div className="text-center mt-8">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-gradient-to-r from-[#25D366] to-[#128C7E] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
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

              {/* Moved Topic/Service options: show just above input area */}
              {(showTopicOptions || (showServiceOptions && selectedTopic)) && (
                <div className="mb-3 px-1">
                  {showTopicOptions && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-black">Which topic are you interested in?</div>
                      <div className="grid grid-cols-1 gap-2">
                        {topicOptions.map((t) => (
                          <button key={t} type="button" onClick={() => handleSelectTopic(t)} className="text-left p-2 bg-white border border-gray-200 rounded-lg hover:shadow transition text-black" aria-label={`Select topic ${t}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {showServiceOptions && selectedTopic && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-black">Select a service for {selectedTopic}:</div>
                      <div className="space-y-2">
                        {servicesByTopic[selectedTopic]?.map((s) => (
                          <div key={s.id} className="p-2 bg-white border border-gray-100 rounded-lg text-black">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-black">{s.title}</div>
                                <div className="text-xs text-gray-700">{s.desc}</div>
                              </div>
                              <div>
                                <button type="button" onClick={() => handleSelectService(s)} className="text-sm text-indigo-600 px-3 py-1 rounded hover:bg-indigo-50" aria-label={`Select service ${s.title}`}>Select</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <motion.div animate={invalidPulse ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }} transition={{ duration: 0.45 }} className="flex items-center gap-2">
                {/* Conditional input UI based on step */}
                {(step === 'chatting') && (
                  <>
                    <input
                      type={getInputType()}
                      placeholder={getInputPlaceholder()}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      ref={inputRef}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-white/90 backdrop-blur"
                      disabled={false}
                    />
                    <motion.button type="button" onClick={handleSend} disabled={input.trim() === ''} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all" aria-label="Send message">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </motion.button>
                  </>
                )}

                {step === 'askName' && (
                  <div className="flex gap-2 w-full">
                    <input type="text" ref={inputRef} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500" placeholder="Your full name" onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => { if (e.key === 'Enter') { submitName(input.trim()); setInput(''); } }} />
                    <button type="button" onClick={() => { submitName(input.trim()); setInput(''); }} disabled={input.trim() === ''} className="px-3 py-2 bg-emerald-500 text-white rounded-full" aria-label="Send name">Send</button>
                  </div>
                )}

                {step === 'askCity' && (
                  <div className="flex gap-2 w-full">
                    <input type="text" ref={inputRef} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500" placeholder="Your city" onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => { if (e.key === 'Enter') { submitCity(input.trim()); setInput(''); } }} />
                    <button type="button" onClick={() => { submitCity(input.trim()); setInput(''); }} disabled={input.trim() === ''} className="px-3 py-2 bg-emerald-500 text-white rounded-full" aria-label="Send city">Send</button>
                  </div>
                )}

                {step === 'askAddress' && (
                  <div className="flex gap-2 w-full">
                    <input type="text" ref={inputRef} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500" placeholder="Full address or 'skip'" onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => { if (e.key === 'Enter') { submitAddress(input.trim()); setInput(''); } }} />
                    <button type="button" onClick={() => { submitAddress(input.trim()); setInput(''); }} disabled={input.trim() === ''} className="px-3 py-2 bg-emerald-500 text-white rounded-full" aria-label="Send address">Send</button>
                  </div>
                )}

                {step === 'askMobile' && (
                  <div className="flex gap-2 w-full">
                    <input type="tel" ref={inputRef} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500" placeholder="Mobile number" onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => { if (e.key === 'Enter') { submitMobile(input.trim()); setInput(''); } }} />
                    <button type="button" onClick={() => { submitMobile(input.trim()); setInput(''); }} disabled={input.trim() === ''} className="px-3 py-2 bg-emerald-500 text-white rounded-full" aria-label="Send mobile number">Send</button>
                  </div>
                )}
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
              // show teaser only on md+ (desktop); mobile uses the MobileActionTray chat button
              className="hidden md:flex absolute right-full mr-3 top-1/3 -translate-y-1/2 bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-lg border border-gray-100 text-xs text-gray-800 max-w-[240px] cursor-pointer"
              role="status"
              aria-live="polite"
              onClick={() => {
                setIsOpen(true);
                setShowTeaser(false);
              }}
            >
              <div className="flex items-start gap-2">
                {/* Mobile: show compact chat icon bubble */}
                <div className="md:hidden flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow">
                    <ChatLogo className="w-5 h-5" animated />
                  </div>
                </div>

                {/* Desktop: keep the original text teaser */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                  </div>
                  <div className="flex-1">Hi, I'm Dudu.</div>
                </div>

                <button onClick={() => setShowTeaser(false)} className="ml-1 text-gray-400 hover:text-gray-600" aria-label="Dismiss chat teaser">
                  <FaTimes size={10} />
                </button>
              </div>
              <span className="absolute top-1/3 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" aria-hidden="true"></span>
            </motion.div>
          )}
        </AnimatePresence>

          <motion.button
          key="chat-open-button"
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          onMouseEnter={(e) => {
            // add hovered class for stronger effect
            e.currentTarget.classList.add('hovered');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove('hovered');
          }}
          onClick={() => {
            setIsOpen(true);
            setShowTeaser(false);
          }}
          aria-label={isOpen ? 'Close chat' : `Open Dudu chat (${unreadCount || 0} new)`}
          aria-live="polite"
          aria-atomic="true"
          // apply combined animations (bob + subtle shake); reduced-motion media query will disable via injected CSS
          // use damru-tilt for primary continuous motion, keep chat-shake as subtle lateral motion
          style={{ animation: 'damru-tilt 1.6s ease-in-out infinite, chat-shake 6s ease-in-out 4s infinite' }}
          // hide the main launcher on small screens; the MobileActionTray provides a compact chat button there
          className={"hidden md:flex chat-launcher-animated-border bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white w-14 h-14 p-0 rounded-lg shadow-xl shadow-[#128C7E]/30 hover:shadow-[#128C7E]/50 transition-all items-center justify-center" + (unreadCount > 0 ? ' chat-launcher-unread' : '')}
        >
            <motion.div
              initial={{ scale: 0.92, opacity: 0.95, y: 0 }}
              animate={{ scale: [0.98, 1, 0.98], opacity: 1, y: [0, -2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-9 h-9 relative"
            >
            <ChatLogo className="w-9 h-9" animated />
            <motion.span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/90" initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-white/70" initial={{ scale: 0.8, opacity: 0.8 }} animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
          </motion.div>
          {/* unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-medium flex items-center justify-center shadow-lg transform translate-x-1 translate-y-[-2px]">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
          {/* border effect element for zigzag/half-round animation */}
          <span aria-hidden="true" className="border-effect" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;