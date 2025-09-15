import React, { useState, useEffect } from "react";
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

import { Helmet } from 'react-helmet-async';
const smallLogoName = 'w';
const smallLogoSrcSetAvif = ['/assets/images/w-64.avif 64w','/assets/images/w-96.avif 96w','/assets/images/w-112.avif 112w','/assets/images/w-128.avif 128w','/assets/images/w-256.avif 256w'].join(', ');
const smallLogoSrcSetWebp = ['/assets/images/w-64.webp 64w','/assets/images/w-96.webp 96w','/assets/images/w-112.webp 112w','/assets/images/w-128.webp 128w','/assets/images/w-256.webp 256w'].join(', ');

const UserLogin = () => {
  const authDebug = (typeof window !== 'undefined') && ((new URLSearchParams(window.location.search).get('debugAuth') === '1') || localStorage.getItem('authDebug') === '1');
  // Translations removed; using static English strings
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [lastAuthError, setLastAuthError] = useState(null); // debug surface
  // No MFA state needed since phone/OTP is disabled
  const logoControls = useAnimation();
  const textControls = useAnimation();

  // Animate logo on component mount
  useEffect(() => {
    logoControls.start({
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, delay: 0.2 },
    });
  }, [logoControls]);

  // Redirect if already authenticated
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

  // Form validation
  const validateForm = () => {
    // For login, rely on Firebase Auth to validate credentials.
    // Keep only basic checks to avoid blocking valid passwords.
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

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Limit session to current tab/window (session storage)
  await setPersistence(auth, browserSessionPersistence);
  const emailTrimmed = email.trim();
  await signInWithEmailAndPassword(auth, emailTrimmed, password);
  toast.success("Login successful.", { position: "top-center" });
    try{ if (window.analyticsPush) window.analyticsPush('user_login', { email: emailTrimmed }); }catch(e){}
      // onAuthStateChanged will handle the navigation automatically
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
  // MFA not required; phone/OTP is disabled now
      // Extract server response message if available (helps when error.code is generic)
      let serverMessage = '';
      try {
        const raw = error?.customData?.serverResponse;
        if (raw) {
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
          serverMessage = parsed?.error?.message || '';
        }
      } catch (_) {
        // ignore JSON parse issues
      }
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
      if (authDebug) {
        console.error('[AuthDebug] Login error', { code: error.code, message: error.message, serverMessage });
        setLastAuthError({ code, message: error.message, serverMessage });
      } else {
        // Minimal console for non-debug too, to aid diagnosis if needed
        console.error('[Auth] Login error', { code: error.code, message: error.message });
      }
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (isResetting || isLoading) return;
    const emailTrimmed = email.trim();

    // basic email validation
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

  // No MFA handlers needed

  // Logo hover animation
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

  // Text animation for "Admin Login"
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
      color: "#ffffff",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Input field animation variants
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

  // Button animation variants
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
        <title>User Login - Wise Global Research</title>
        <meta name="description" content="User Login page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/userlogin" />
      </Helmet>
<div className="min-h-screen flex items-center justify-center bg-transparent">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative p-8 rounded-2xl shadow-xl w-full max-w-md text-adaptive"
        role="region"
        aria-label="Admin login form"
        style={{ backdropFilter: 'blur(12px)', background: '#ffffff4d', border: '1px solid rgba(0,0,0,0.06)' }}
      >
  {/* MFA/OTP disabled: no reCAPTCHA used */}
        {authDebug && (
          <div className="absolute -top-8 left-0 text-xs text-yellow-300 opacity-80">
            Debug ON • Host: {typeof window !== 'undefined' ? window.location.origin : ''}
          </div>
        )}
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <svg
              className="animate-spin h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
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

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          animate={logoControls}
          onHoverStart={handleLogoHover}
          onHoverEnd={handleLogoHoverEnd}
          initial={{ y: -50, opacity: 0 }}
        >
          <picture>
            <source type="image/avif" srcSet={smallLogoSrcSetAvif} sizes="80px" />
            <source type="image/webp" srcSet={smallLogoSrcSetWebp} sizes="80px" />
            <img
              src={`/assets/images/${smallLogoName}.png`}
              alt="Company Logo"
              className="w-20 h-20 object-contain"
              loading="eager"
              width={80}
              height={80}
            />
          </picture>
        </motion.div>

        {/* Title */}
          <motion.h2
          className="text-2xl text-adaptive font-semibold text-center mb-6"
          animate={textControls}
          onHoverStart={handleTextHover}
          onHoverEnd={handleTextHoverEnd}
          aria-label={"Admin Login"}
        >
          {"Admin Login"}
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="relative">
            <motion.input
              type="email"
                placeholder={"Email address"}
                className="px-4 py-3 rounded-lg bg-white/5 text-adaptive placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
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
              <p className="text-red-400 text-sm mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <motion.input
              type="password"
                placeholder={"Password"}
                className="px-4 py-3 rounded-lg bg-white/5 text-adaptive placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
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
              <p className="text-red-400 text-sm mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`bg-yellow-500 text-black font-medium py-3 rounded-lg transition duration-300 shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            variants={buttonVariants}
            whileHover={isLoading ? {} : "hover"}
            whileTap={isLoading ? {} : "tap"}
            aria-label={"Submit login"}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Debug details (only when enabled via ?debugAuth=1 or localStorage.authDebug=1) */}
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

        {/* Forgot Password */}
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

  {/* No MFA UI */}
      </motion.div>
    </div>
    </>
  );
};

export default UserLogin;