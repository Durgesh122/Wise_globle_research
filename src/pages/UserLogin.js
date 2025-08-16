import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import logo from "../assets/images/w.png"; // Verify this path is correct

const UserLogin = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
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
      if (currentUser) {
        navigate(location.state?.from?.pathname || "/admin", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = t("login.email_required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("login.email_invalid");
      isValid = false;
    }

    if (!password) {
      newErrors.password = t("login.password_required");
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t("login.password_length");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = t("login.password_uppercase");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = t("login.password_lowercase");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = t("login.password_number");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = t("login.password_special");
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
      await signInWithEmailAndPassword(auth, email, password);
  toast.success(t("login.success"), { position: "top-center" });
      // onAuthStateChanged will handle the navigation automatically
    } catch (error) {
      let errorMessage = t("login.failed");
      if (error.code === "auth/user-not-found") {
        errorMessage = t("login.user_not_found");
      } else if (error.code === "auth/wrong-password") {
        errorMessage = t("login.incorrect_password");
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = t("login.too_many_attempts");
      }
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-md"
        role="region"
        aria-label="Admin login form"
      >
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
          <img
            src={logo}
            alt="Company Logo"
            className="w-20 h-20 object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(234, 179, 8, 0.4))" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80?text=Logo"; // Fallback image
              console.error("Failed to load logo at ../assets/images/w.png");
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl text-white font-semibold text-center mb-6"
          animate={textControls}
          onHoverStart={handleTextHover}
          onHoverEnd={handleTextHoverEnd}
          aria-label={t("login.title")}
        >
          {t("login.title")}
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="relative">
            <motion.input
              type="email"
              placeholder={t("login.email_placeholder")}
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              aria-label={t("login.email_label")}
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
              placeholder={t("login.password_placeholder")}
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              aria-label={t("login.password_label")}
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
            className={`bg-yellow-500 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            variants={buttonVariants}
            whileHover={isLoading ? {} : "hover"}
            whileTap={isLoading ? {} : "tap"}
            aria-label={t("login.submit_label")}
          >
            {isLoading ? t("login.logging_in") : t("login.login_button")}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserLogin;