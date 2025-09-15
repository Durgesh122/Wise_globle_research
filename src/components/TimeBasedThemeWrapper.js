// src/components/TimeBasedThemeWrapper.js
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const TimeBasedThemeWrapper = ({ children }) => {
  const { theme, gradients } = useContext(ThemeContext);
  const { background: themeBackground, textColor } = gradients[theme] || gradients.default;

  // default background (light subtle gradient) when no theme background provided
  const defaultBackground = 'linear-gradient(to right, #f7fafc, #eef2f7)';

  // If theme provides a background, use it; otherwise use the default image with a dark overlay color fallback
  const background = themeBackground || defaultBackground;

  useEffect(() => {
    // Apply background with sensible positioning and fallback
    document.body.style.background = background;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.color = textColor;
  }, [background, textColor]);

  return (
    <div
      style={{
        position: 'relative',
        color: textColor,
        transition: '0.6s ease-in-out',
        minHeight: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
  {/* Removed image-based overlay as requested */}

      {/* 🧠 Actual Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

export default TimeBasedThemeWrapper;