// src/components/TimeBasedThemeWrapper.js
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const TimeBasedThemeWrapper = ({ children }) => {
  const { theme, gradients } = useContext(ThemeContext);
  const { background: themeBackground, textColor } = gradients[theme] || gradients.default;

  // default background image path (served from `public/assets/images/pick6.png`)
  const defaultBackgroundImage = "url('/assets/images/pick6.png')";

  // If theme provides a background, use it; otherwise use the default image with a dark overlay color fallback
  const background = themeBackground || `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), ${defaultBackgroundImage}`;

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