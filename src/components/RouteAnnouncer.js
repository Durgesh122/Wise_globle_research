import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaVolumeUp, FaPause, FaPlay, FaStop, FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

// --- CONSTANTS ---
const ROUTE_ANNOUNCEMENT_DELAY = 150;
const LANGUAGE_AUTO_OVERRIDE_COOLDOWN = 5000;
const SPEECH_SYNTHESIS_ERROR_COOLDOWN = 10000;
const SPEECH_SYNTHESIS_MAX_ERRORS = 3;
const GOOGLE_TRANSLATE_POLL_INTERVAL = 1000;
const SPEECH_QUEUE_INTERVAL = 80;
const READ_ALL_START_DELAY = 500;
const BEEP_OSC_FREQUENCY = 880;
const BEEP_DURATION = 0.2;
const BEEP_VOLUME_RAMP_UP_TIME = 0.01;
const BEEP_VOLUME_RAMP_DOWN_TIME = 0.18;
const BEEP_DISABLE_DELAY = 120;


// --- HELPER HOOKS ---

/**
 * A custom hook to manage state that is persisted in localStorage.
 * @param {string} key The localStorage key.
 * @param {*} defaultValue The default value if the key is not in localStorage.
 * @returns {[*, function]} A state and a function to update it.
 */
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * A custom hook to encapsulate speech synthesis logic.
 */
function useSpeechSynthesis({ lang, rate, pitch, voiceName, synthErrorCountRef, lastSynthErrorAtRef }) {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text, { onstart, onend, onerror } = {}) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (synthErrorCountRef.current > SPEECH_SYNTHESIS_MAX_ERRORS && (Date.now() - (lastSynthErrorAtRef.current || 0)) < SPEECH_SYNTHESIS_ERROR_COOLDOWN) {
      console.warn('Skipping speak due to recent speech synthesis errors.');
      if (typeof onerror === 'function') onerror(new Error('speech-synthesis-cooldown'));
      return;
    }
    try {
      const languageCode = lang === 'hi' ? 'hi-IN' : 'en-US';
      
      if (voices.length > 0) {
        const hasVoiceForLang = voices.some(v => v.lang === languageCode || v.lang.startsWith(`${lang}-`));
        if (!hasVoiceForLang) {
          console.warn(`No speech synthesis voice available for language: ${lang}. Please install a voice for this language in your system settings.`);
          if (typeof onerror === 'function') onerror(new Error('language-unavailable'));
          return;
        }
      }

      const utter = new SpeechSynthesisUtterance(text);

      const cleanup = () => {
        utteranceRef.current = utteranceRef.current.filter(u => u !== utter);
      };

      utter.lang = languageCode;
      utter.rate = rate;
      utter.pitch = pitch;

      let voiceToUse = voices.find(v => v.name === voiceName);

      if (!voiceToUse && voiceName === '') {
        if (lang === 'hi') {
            voiceToUse = voices.find(v => v.lang === 'hi-IN' && v.name.includes('Swara')) || 
                         voices.find(v => v.lang === 'hi-IN' && v.name.includes('Online')) ||
                         voices.find(v => v.lang === 'hi-IN');
        }
      }
      
      if (voiceToUse) {
        utter.voice = voiceToUse;
      }

      utter.onstart = (e) => {
        setIsSpeaking(true);
        setIsPaused(false);
        if (typeof onstart === 'function') onstart(e);
      };
      utter.onend = (e) => {
        setIsSpeaking(false);
        setIsPaused(false);
        cleanup();
        if (typeof onend === 'function') onend(e);
      };
      utter.onerror = (e) => {
        setIsSpeaking(false);
        setIsPaused(false);
        if (e.error) {
            console.error(`An error occurred during speech synthesis: ${e.error}`, e);
        } else {
            console.error('An error occurred during speech synthesis.', e);
        }
        synthErrorCountRef.current = (synthErrorCountRef.current || 0) + 1;
        lastSynthErrorAtRef.current = Date.now();
        if (synthErrorCountRef.current > SPEECH_SYNTHESIS_MAX_ERRORS && (Date.now() - lastSynthErrorAtRef.current) < SPEECH_SYNTHESIS_ERROR_COOLDOWN) {
          console.warn('Multiple speech synthesis errors detected; pausing announcements temporarily.');
        }
        cleanup();
        if (typeof onerror === 'function') onerror(e);
      };
      
      utteranceRef.current.push(utter);
      window.speechSynthesis.speak(utter);

      return utter;
    } catch (err) {
      console.error('speak() failed', err);
      if (typeof onerror === 'function') onerror(err);
    }
  }, [lang, rate, pitch, voiceName, voices, synthErrorCountRef, lastSynthErrorAtRef]);

  const pause = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const cancel = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return { speak, pause, resume, cancel, voices, isSpeaking, isPaused };
}

// --- HELPER FUNCTIONS ---

const deriveFromPath = (p) => {
  let clean = p || '';
  while (clean.startsWith('/')) clean = clean.slice(1);
  while (clean.endsWith('/')) clean = clean.slice(0, -1);
  if (!clean) return 'Home';
  return clean
    .split('/')
    .map((seg) => seg.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join(' · ');
};

const getAnnouncementMessage = (lang, pathname) => {
  const title = (typeof document !== 'undefined' && document.title) ? document.title : '';
  const baseLabel = title || `${deriveFromPath(pathname)} page`;
  if (lang === 'hi') return `आप अभी ${baseLabel} पर हैं।`;
  return `You are now on ${baseLabel}.`;
};


// --- MAIN COMPONENT ---

export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  // Admin path detection: don't show floating controls on any admin pages
  const isAdminPath = (() => {
    if (!pathname) return false;
    const p = pathname.toLowerCase();
    return p === '/admin' || p.startsWith('/admin/') || p.includes('/admin-panel') || p.includes('/wp-admin');
  })();
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [adaptiveLight, setAdaptiveLight] = useState(false);

  const [lang, setLang] = useLocalStorage('route.lang', 'en');
  const [voiceEnabled, setVoiceEnabled] = useLocalStorage('route.voice', false);
  const [beepEnabled, setBeepEnabled] = useLocalStorage('route.beep', false);
  const [manualLangSelection, setManualLangSelection] = useLocalStorage('route.langManual', false);
  const [rate, setRate] = useLocalStorage('route.rate', 1);
  const [pitch, setPitch] = useLocalStorage('route.pitch', 1);
  const [voiceName, setVoiceName] = useLocalStorage('route.voiceName', '');

  const synthErrorCountRef = useRef(0);
  const lastSynthErrorAtRef = useRef(0);
  const manualLangChangeAtRef = useRef(0);

  const voiceEnabledRef = useRef(voiceEnabled);
  useEffect(() => { voiceEnabledRef.current = voiceEnabled; }, [voiceEnabled]);

  const beepEnabledRef = useRef(beepEnabled);
  useEffect(() => { beepEnabledRef.current = beepEnabled; }, [beepEnabled]);

  const { speak, pause, resume, cancel, isSpeaking, isPaused, voices } = useSpeechSynthesis({ lang, rate, pitch, voiceName, synthErrorCountRef, lastSynthErrorAtRef });

  const immediateSpeak = useCallback((text, utterLang, voice = null) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (synthErrorCountRef.current > SPEECH_SYNTHESIS_MAX_ERRORS && (Date.now() - (lastSynthErrorAtRef.current || 0)) < SPEECH_SYNTHESIS_ERROR_COOLDOWN) {
      return;
    }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = utterLang === 'hi' ? 'hi-IN' : 'en-US';
      u.rate = rate || 1;
      u.pitch = pitch || 1;
      if (voice) {
        u.voice = voice;
      }
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.error('immediateSpeak failed', e);
    }
  }, [rate, pitch]);

  const readGoogleTranslateCookie = useCallback(() => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split(';').map(c => c.trim());
    const raw = cookies.find(c => c.startsWith('googtrans=')) || cookies.find(c => c.startsWith('_googtrans='));
    if (!raw) return null;
    const val = decodeURIComponent((raw.split('=')[1] || '').trim());
    const parts = val.split('/').filter(Boolean);
    const last = parts.length ? parts[parts.length - 1] : (val || '').trim();
    if (!last) return null;
    return last;
  }, []);

  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mapToSimple = (g) => {
      if (!g) return null;
      const code = g.toLowerCase();
      if (code.includes('hi')) return 'hi';
      if (code.includes('en')) return 'en';
      return null;
    };

    const check = () => {
      const g = readGoogleTranslateCookie();
      if (!g) return;
      const mapped = mapToSimple(g);
      if (mapped && mapped !== langRef.current) {
        if (manualLangSelection) return;
        const sinceManual = Date.now() - (manualLangChangeAtRef.current || 0);
        if (sinceManual < LANGUAGE_AUTO_OVERRIDE_COOLDOWN) return;
        setLang(mapped);
        langRef.current = mapped;
        if (voiceEnabledRef.current) {
          if (mapped === 'hi') immediateSpeak('भाषा अब हिंदी पर है', 'hi');
          else immediateSpeak('Language switched to English', 'en');
        }
      }
    };

    const id = setInterval(check, GOOGLE_TRANSLATE_POLL_INTERVAL);
    check();
    return () => clearInterval(id);
  }, [readGoogleTranslateCookie, immediateSpeak, setLang, manualLangSelection]);

  const readingQueueRef = useRef([]);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const beepCtxRef = useRef(null);
  const userGestureRef = useRef(false);
  const beepPendingRef = useRef(false);

  const playBeep = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      if (!beepCtxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        try {
          beepCtxRef.current = new AC();
        } catch (err) {
          console.warn('AudioContext creation blocked', err);
          beepPendingRef.current = true;
          return;
        }
      }
      const ctx = beepCtxRef.current;
      if (ctx.state === 'suspended' && !userGestureRef.current) {
        beepPendingRef.current = true;
        return;
      }
      if (ctx.state === 'suspended' && userGestureRef.current) {
        try { ctx.resume(); } catch(_) {}
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = BEEP_OSC_FREQUENCY;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + BEEP_VOLUME_RAMP_UP_TIME);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + BEEP_VOLUME_RAMP_DOWN_TIME);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + BEEP_DURATION);
    } catch(e) {
      console.error("Beep failed.", e);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const finalMsg = getAnnouncementMessage(lang, pathname);
      setMessage(finalMsg);

      if (voiceEnabledRef.current) {
        speak(finalMsg);
      }

      if (beepEnabledRef.current) {
        playBeep();
      }
    }, ROUTE_ANNOUNCEMENT_DELAY);

    return () => clearTimeout(timer);
  }, [pathname, lang, speak, playBeep]);

  const playNextInQueue = useCallback(() => {
    if (readingQueueRef.current.length === 0) {
      setIsReadingAll(false);
      return;
    }
    const nextText = readingQueueRef.current.shift();
    speak(nextText, {
      onend: () => {
        if (readingQueueRef.current.length > 0) {
          setTimeout(playNextInQueue, SPEECH_QUEUE_INTERVAL);
        } else {
          setIsReadingAll(false);
        }
      },
      onerror: () => {
        console.error('Error in playNextInQueue, stopping.');
        setIsReadingAll(false);
      }
    });
  }, [speak]);

  const startReading = useCallback(() => {
    if (typeof document === 'undefined') return;
    cancel(); 
    const selectors = ['main', '[role="main"]', 'article', 'section'];
    const container = selectors.map(s => document.querySelector(s)).find(el => el) || document.body;
    const texts = (container.innerText || container.textContent || '').trim();
    const items = texts.split(/\r?\n|[.?!]+/).map(s => s.trim()).filter(s => s.length > 3);
    if (items.length === 0) return;

    readingQueueRef.current = items;
    setIsReadingAll(true);

    const startMsg = lang === 'hi' ? 'पेज पढ़ना शुरू हो रहा है।' : 'Starting to read the page.';
    speak(startMsg, { onend: () => setTimeout(playNextInQueue, READ_ALL_START_DELAY) });

  }, [playNextInQueue, speak, cancel, lang]);

  const stopReading = useCallback(() => {
    readingQueueRef.current = [];
    cancel();
    setIsReadingAll(false);
  }, [cancel]);

  const markUserGestureAndFlush = useCallback(() => {
    userGestureRef.current = true;
    try {
      const ctx = beepCtxRef.current;
      if (ctx && ctx.state === 'suspended') try { ctx.resume(); } catch(_) {}
      if (beepPendingRef.current) {
        try { playBeep(); } catch(_) {}
        beepPendingRef.current = false;
      }
    } catch(_) {}
  }, [playBeep]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const cs = window.getComputedStyle(document.body);
      const bg = cs.backgroundColor;
      if (bg && /^rgb/.test(bg)) {
        const [r,g,b] = bg.match(/\d+/g).map(Number);
        const L = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        setAdaptiveLight(L > 0.7);
      }
    } catch(_) {}
  }, [pathname]);

  const visuallyHiddenStyle = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 };
  const floatingButtonStyle = {
  position: 'fixed',
  // Match AccessibilityMenu's placement (Tailwind bottom-40 => 160px, right-6 => 24px)
  // Stack this button directly above the accessibility button (same right offset)
  // Accessibility button bottom = 160px; place speaker above it with ~64px gap
  bottom: '224px',
  right: '24px',
  zIndex: 9000,
  width: '56px',
  height: '56px',
  borderRadius: '9999px',
  // Use the same green as AccessibilityMenu (tailwind green-500)
  background: '#10b981',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    outline: 'none',
  };
  const baseButtonStyle = {
    padding: '0.5rem 0.75rem',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid transparent',
    background: adaptiveLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s, border-color 0.2s',
  };

  const handleFloatingButtonClick = () => {
    markUserGestureAndFlush();
    setMenuOpen(m => !m);
  };

  return (
    <>
      <div aria-live="polite" aria-atomic="true" style={visuallyHiddenStyle}>{message}</div>
      {/* Do not render floating controls on admin pages */}
      {isAdminPath ? null : (
      <>
      <button
        aria-label={lang==='hi' ? 'स्पीकर मेनू खोलें' : 'Open speaker menu'}
        aria-expanded={menuOpen}
        style={floatingButtonStyle}
        onClick={handleFloatingButtonClick}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <FaVolumeUp aria-hidden="true" size={36} />
      </button>

      {menuOpen && (
        <div
          role="dialog"
          aria-label={lang==='hi' ? 'स्पीकर आइकन पैनल' : 'Speaker icon panel'}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            // place panel above the button and aligned with accessibility panel
            bottom: '288px',
            right: '24px',
            zIndex: 9001,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '0.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            alignItems: 'center',
            background: adaptiveLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            minWidth: '220px',
          }}
        >
          <button
            type="button"
            aria-pressed={voiceEnabled}
            onClick={() => {
              markUserGestureAndFlush();
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (next) {
                speak(lang === 'hi' ? 'आवाज़ चालू हो गई' : 'Voice turned on');
              } else {
                cancel();
              }
            }}
            title={lang==='hi' ? (voiceEnabled ? 'आवाज़ बंद करें' : 'आवाज़ चालू करें') : (voiceEnabled ? 'Voice Off' : 'Voice On')}
            style={{...baseButtonStyle, width: '44px', height: '44px', borderRadius: '8px', justifyContent: 'center'}}
            onMouseEnter={(e)=> e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e)=> e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaVolumeUp aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-pressed={beepEnabled}
            onClick={() => {
              markUserGestureAndFlush();
              const next = !beepEnabled;
              setBeepEnabled(next);
              if (next) {
                try { playBeep(); } catch(_) {}
              } else {
                try { playBeep(); setTimeout(playBeep, BEEP_DISABLE_DELAY); } catch(_) {}
              }
            }}
            title={lang==='hi' ? (beepEnabled ? 'बीप बंद करें' : 'बीप चालू करें') : (beepEnabled ? 'Beep Off' : 'Beep On')}
            style={{...baseButtonStyle, width: '44px', height: '44px', borderRadius: '8px', justifyContent: 'center'}}
            onMouseEnter={(e)=> e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e)=> e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaBell aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={()=> isReadingAll ? stopReading() : startReading()}
            title={lang==='hi' ? (isReadingAll ? 'रोकें' : 'पूरा पढ़ें') : (isReadingAll ? 'Stop' : 'Read All')}
            style={{...baseButtonStyle, width: '44px', height: '44px', borderRadius: '8px', justifyContent: 'center'}}
            onMouseEnter={(e)=> e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e)=> e.currentTarget.style.transform = 'scale(1)'}
          >
            {isReadingAll ? <FaStop /> : <FaPlay />}
          </button>

          <button
            type="button"
            onClick={() => { markUserGestureAndFlush(); pause(); }}
            disabled={!isSpeaking || isPaused}
            title={lang==='hi' ? 'ठहरें' : 'Pause'}
            style={{...baseButtonStyle, width: '44px', height: '44px', borderRadius: '8px', justifyContent: 'center'}}
          >
            <FaPause />
          </button>

          <button
            type="button"
            onClick={() => { markUserGestureAndFlush(); resume(); }}
            disabled={!isSpeaking || !isPaused}
            title={lang==='hi' ? 'जारी रखें' : 'Resume'}
            style={{...baseButtonStyle, width: '44px', height: '44px', borderRadius: '8px', justifyContent: 'center'}}
          >
            <FaPlay />
          </button>

          <div style={{width: '100%', padding: '0 0.5rem', boxSizing: 'border-box'}}>
            <label htmlFor="voice-select" style={{fontSize: '12px', display: 'block', marginBottom: '4px', textAlign: 'center'}}>{lang === 'hi' ? 'आवाज़' : 'Voice'}</label>
            <select
              id="voice-select"
              value={voiceName}
              onChange={(e) => {
                const newVoiceName = e.target.value;
                setVoiceName(newVoiceName);
                const selectedVoice = voices.find(v => v.name === newVoiceName);
                if (selectedVoice) {
                  const sampleUtter = new SpeechSynthesisUtterance(lang === 'hi' ? 'यह नई आवाज़ है।' : 'This is the new voice.');
                  sampleUtter.voice = selectedVoice;
                  sampleUtter.lang = selectedVoice.lang;
                  sampleUtter.rate = rate;
                  sampleUtter.pitch = pitch;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(sampleUtter);
                }
              }}
              style={{
                ...baseButtonStyle,
                width: '100%',
                padding: '0.5rem',
                color: adaptiveLight ? '#000' : '#FFF',
                backgroundColor: adaptiveLight ? '#F0F0F0' : '#222'
              }}
            >
              <option value="">{lang === 'hi' ? 'डिफ़ॉल्ट' : 'Default'}</option>
              {voices
                .filter(v => v.lang.startsWith(lang))
                .map(voice => (
                  <option key={voice.name} value={voice.name} style={{color: adaptiveLight ? '#000' : '#FFF', backgroundColor: adaptiveLight ? '#FFF' : '#333'}}>
                    {voice.name.length > 25 ? `${voice.name.substring(0,22)}...` : voice.name}
                  </option>
                ))}
            </select>
          </div>

          <div style={{width: '100%', padding: '0.5rem', boxSizing: 'border-box'}}>
              <label htmlFor="rate-slider" style={{fontSize: '12px', display: 'block', marginBottom: '4px', textAlign: 'center'}}>{lang === 'hi' ? 'गति' : 'Rate'}: {rate.toFixed(1)}</label>
              <input
                type="range"
                id="rate-slider"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                style={{width: '100%'}}
              />
          </div>

          <div style={{width: '100%', padding: '0.5rem', boxSizing: 'border-box'}}>
              <label htmlFor="pitch-slider" style={{fontSize: '12px', display: 'block', marginBottom: '4px', textAlign: 'center'}}>{lang === 'hi' ? 'पिच' : 'Pitch'}: {pitch.toFixed(1)}</label>
              <input
                type="range"
                id="pitch-slider"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                style={{width: '100%'}}
              />
          </div>

          <button
            type="button"
            onClick={() => {
              markUserGestureAndFlush();
              const nextLang = lang === 'hi' ? 'en' : 'hi';
              setLang(nextLang);
              setManualLangSelection(true);
              manualLangChangeAtRef.current = Date.now();
              if (voiceEnabled) {
                if (nextLang === 'hi') {
                  immediateSpeak('भाषा अब हिंदी पर है', 'hi');
                } else {
                  immediateSpeak('Language switched to English', 'en');
                }
              }
            }}
            title={lang==='hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            style={{...baseButtonStyle, padding: '0.4rem 0.6rem', borderRadius: '8px'}}
          >
            {lang === 'hi' ? 'EN' : 'हिंदी'}
          </button>

        </div>
  )}
  </>
  )}
    </>
  );
}
