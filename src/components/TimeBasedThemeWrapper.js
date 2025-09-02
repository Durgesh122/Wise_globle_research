// src/components/TimeBasedThemeWrapper.js
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import back2 from '../assets/images/daniele1.png';

const TimeBasedThemeWrapper = ({ children }) => {
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients[theme] || gradients.default;

  useEffect(() => {
    document.body.style.background = background;
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
      {/* ✨ Subtle Smooth Texture Overlay - Only show on default theme */}
      {theme === 'default' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${back2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 🧠 Actual Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

export default TimeBasedThemeWrapper;
