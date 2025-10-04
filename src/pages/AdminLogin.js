import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { FaArrowLeft } from 'react-icons/fa';

import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../context/ThemeContext';
const smallLogoName = 'w';
const smallLogoSrcSetAvif = ['/assets/images/w-64.avif 64w','/assets/images/w-96.avif 96w','/assets/images/w-112.avif 112w','/assets/images/w-128.avif 128w','/assets/images/w-256.avif 256w'].join(', ');
const smallLogoSrcSetWebp = ['/assets/images/w-64.webp 64w','/assets/images/w-96.webp 96w','/assets/images/w-112.webp 112w','/assets/images/w-128.webp 128w','/assets/images/w-256.webp 256w'].join(', ');

const AdminLogin = () => {
  const authDebug = (typeof window !== 'undefined') && ((new URLSearchParams(window.location.search).get('debugAuth') === '1') || localStorage.getItem('authDebug') === '1');
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [lastAuthError, setLastAuthError] = useState(null);
  const logoControls = useAnimation();
  const textControls = useAnimation();
  const { textColor } = useContext(ThemeContext);

  useEffect(() => {
    logoControls.start({
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, delay: 0.2 },
    });
  }, [logoControls]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (authDebug) {
        console.log('[AuthDebug] onAuthStateChanged user:', currentUser?.uid, currentUser?.email);
      }
      if (currentUser) {
        navigate(location.state?.from?.pathname || "/admin", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location, authDebug]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      const emailTrimmed = email.trim();
      await signInWithEmailAndPassword(auth, emailTrimmed, password);
      toast.success("Login successful.", { position: "top-center" });
      try{ if (window.analyticsPush) window.analyticsPush('user_login', { email: emailTrimmed }); }catch(e){}
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      let serverMessage = '';
      try {
        const raw = error?.customData?.serverResponse;
        if (raw) {
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
          serverMessage = parsed?.error?.message || '';
        }
      } catch (_) {}
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found.";
      } else if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential" || error.code === "auth/invalid-login-credentials") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This user account is disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many unsuccessful login attempts. Please try again later.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/password sign-in is disabled. Enable it in Firebase Auth > Sign-in method.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "Unauthorized domain. Add your site domain to Firebase Auth > Settings > Authorized domains.";
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = "Invalid Firebase API key. Check src/firebase.js configuration.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Check your connection or Content Security Policy for identitytoolkit.googleapis.com.";
      } else if (serverMessage === 'EMAIL_NOT_FOUND') {
        errorMessage = 'User not found.';
      } else if (serverMessage === 'INVALID_PASSWORD' || serverMessage === 'INVALID_LOGIN_CREDENTIALS') {
        errorMessage = 'Invalid email or password.';
      } else if (serverMessage === 'USER_DISABLED') {
        errorMessage = 'This user account is disabled.';
      }
      const code = error.code || 'unknown';
      errorMessage += ` (code: ${code})`;
      try {
        const raw = error?.customData?.serverResponse;
        if (raw) {
          if (typeof raw === 'string') {
            try {
              const parsed = JSON.parse(raw);
              console.error('[Auth] Login error - serverResponse parsed', parsed);
            } catch (e) {
              console.error('[Auth] Login error - serverResponse (raw string)', raw);
            }
          } else {
            console.error('[Auth] Login error - serverResponse', raw);
          }
        }
      } catch (e) {}

      if (authDebug) {
        console.error('[AuthDebug] Login error', { code: error.code, message: error.message, serverMessage, fullError: error });
        setLastAuthError({ code, message: error.message, serverMessage });
      } else {
        console.error('[Auth] Login error', { code: error.code, message: error.message, serverMessage, fullError: error });
      }
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (isResetting || isLoading) return;
    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      toast.info("Enter your email above to receive a reset link.", { position: "top-center" });
      setErrors((prev) => ({ ...prev, email: "Email is required to reset password." }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      toast.error("Please enter a valid email address.", { position: "top-center" });
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      return;
    }

    try {
      setIsResetting(true);
      await sendPasswordResetEmail(auth, emailTrimmed);
      toast.success("Password reset email sent. Check your inbox.", { position: "top-center" });
      try{ if (window.analyticsPush) window.analyticsPush('password_reset_request', { email: emailTrimmed }); }catch(e){}
    } catch (error) {
      let msg = "Couldn't send reset email. Please try again.";
      if (error.code === "auth/user-not-found") msg = "No user found with this email.";
      else if (error.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (error.code === "auth/too-many-requests") msg = "Too many attempts. Please try later.";
      console.error('[Auth] Password reset error', { code: error.code, message: error.message });
      toast.error(`${msg} (code: ${error.code || 'unknown'})`, { position: "top-center" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleLogoHover = async () => {
    await logoControls.start({
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleLogoHoverEnd = async () => {
    await logoControls.start({
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleTextHover = async () => {
    await textControls.start({
      scale: 1.05,
      color: "#eab308",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleTextHoverEnd = async () => {
    await textControls.start({
      scale: 1,
      color: "#457ffcff",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const inputVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0px 0px 8px rgba(234, 179, 8, 0.3)",
      transition: { duration: 0.2 },
    },
    focus: {
      scale: 1.02,
      borderColor: "#eab308",
      boxShadow: "0px 0px 8px rgba(234, 179, 8, 0.5)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#ca8a04",
      boxShadow: "0px 0px 12px rgba(234, 179, 8, 0.7)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Wise Global Research</title>
        <meta name="description" content="Admin Login page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/adminlogin" />
      </Helmet>
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 px-2 sm:px-0">
  <motion.div
        variants={{
          hidden: { opacity: 0, y: 60, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
        }}
        initial="hidden"
        animate="visible"
        className="relative p-6 rounded-3xl shadow-2xl w-full max-w-[95vw] sm:max-w-md text-adaptive bg-white flex flex-col items-center"
        role="region"
        aria-label="Admin login form"
        style={{ minWidth: 0 }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate('/', { replace: true })}
          className="absolute left-4 top-4 inline-flex items-center justify-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
          aria-label="Go home"
          style={{ color: textColor || undefined, backgroundColor: 'rgba(21, 146, 59, 0.9)' }}
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <svg
              className="animate-spin h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}

        <motion.div
          className="flex justify-center mb-6 md:mb-8"
          animate={logoControls}
          onHoverStart={handleLogoHover}
          onHoverEnd={handleLogoHoverEnd}
          initial={{ y: -50, opacity: 0 }}
        >
          <picture>
            <source type="image/avif" srcSet={smallLogoSrcSetAvif} sizes="64px" />
            <source type="image/webp" srcSet={smallLogoSrcSetWebp} sizes="64px" />
            <img
              src={`/assets/images/${smallLogoName}.png`}
              alt="Company Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              importance="high"
              width={64}
              height={64}
            />
          </picture>
        </motion.div>

          <motion.h2
          className="text-2xl font-semibold text-center mb-6"
          animate={textControls}
          onHoverStart={handleTextHover}
          onHoverEnd={handleTextHoverEnd}
          aria-label={"Admin Login"}
          style={{ color: textColor || undefined }}
        >
          {"Admin Login"}
        </motion.h2>

  <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm mx-auto">
          <div className="relative">
            <label htmlFor="email-input" className="sr-only">Email address</label>
            <motion.input
              id="email-input"
              type="email"
              placeholder={"Email address"}
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 w-full text-sm sm:text-base transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              aria-label={"Email"}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password-input" className="sr-only">Password</label>
            <motion.input
              id="password-input"
              type="password"
              placeholder={"Password"}
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 w-full text-sm sm:text-base transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              aria-label={"Password"}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-2 sm:py-3 rounded-xl transition duration-300 shadow-lg border-2 border-yellow-400/60 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-yellow-500 hover:to-yellow-400"
            }`}
            variants={buttonVariants}
            whileHover={isLoading ? {} : "hover"}
            whileTap={isLoading ? {} : "tap"}
            aria-label={"Submit login"}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {authDebug && lastAuthError && (
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(17,24,39,0.45)' }}>
            <div className="font-semibold mb-1">Auth Debug</div>
            <div className="text-xs text-adaptive"><span className="opacity-70">code:</span> {lastAuthError.code}</div>
            <div className="mt-1 text-xs text-adaptive"><span className="opacity-70">message:</span> {lastAuthError.message}</div>
            {lastAuthError.serverMessage && (
              <div className="mt-1 text-xs text-adaptive"><span className="opacity-70">server:</span> {lastAuthError.serverMessage}</div>
            )}
          </div>
        )}

        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={isResetting || isLoading}
            className={`text-sm underline underline-offset-4 transition-colors ${
              isResetting || isLoading ? "text-adaptive/40" : "text-adaptive/90"
            }`}
            aria-label="Forgot password"
          >
            {isResetting ? "Sending reset link..." : "Forgot password?"}
          </button>
        </div>

      </motion.div>
    </div>
    </>
  );
};

export default AdminLogin;
