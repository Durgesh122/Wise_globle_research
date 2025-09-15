import React, { createContext, useState, useEffect } from 'react';

// Define an extensive set of vibrant, sexy gradients (restored) + premium dark themes
const gradients = {
  default: {
  // Default uses a light, subtle gradient (no image)
   background: 'linear-gradient(to right, rgba(212,227,255,1), rgba(212,227,255,0.6))',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  // ...removed two top colors (fire, purpleDream) per user request
  

  cosmicTrade: {
    background: 'linear-gradient(to right, #4b0082, #00b7eb)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  emeraldRush: {
    background: 'linear-gradient(to right, #00c4b4, #7cffcb)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  
  // User-added color palette
  mintLeaf: {
    background: 'linear-gradient(to right, #68ba7f, #5fae73)',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  deepForest: {
    background: 'linear-gradient(to right, #253d2c, #273f2e)',
    textColor: '#e6eef8',
    transition: 'background 0.5s ease-in-out',
  },
  midnightBlueCustom: {
    background: 'linear-gradient(to right, #0f0e47, #12124f)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  springGreen: {
    background: 'linear-gradient(to right, #469110, #3f890f)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  mintPale: {
    background: 'linear-gradient(to right, #badba2, #a8c990)',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  goldenSun: {
    background: 'linear-gradient(to right, #ffb343, #ff9f1a)',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  aquaSky: {
    background: 'linear-gradient(to right, #42eaff, #3bd1f7)',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  // Darker glass-friendly gradients (good behind white/30 glass panels)
  glassNavy: {
    background: 'linear-gradient(to right, #0B1A2A, #1A2F4A)',
    textColor: '#E6EEF8',
    transition: 'background 0.5s ease-in-out',
  },
  deepTealGlass: {
    background: 'linear-gradient(to right, #0C2A2B, #145055)',
    textColor: '#E6FFF7',
    transition: 'background 0.5s ease-in-out',
  },
  royalPlumGlass: {
    background: 'linear-gradient(to right, #2B103B, #452050)',
    textColor: '#F5E9FF',
    transition: 'background 0.5s ease-in-out',
  },
  slateNight: {
    background: 'linear-gradient(to right, #111827, #1F2937)',
    textColor: '#E6EEF8',
    transition: 'background 0.5s ease-in-out',
  },
  spaceAqua: {
    background: 'linear-gradient(to right, #062038, #0E3A55)',
    textColor: '#D6F1FF',
    transition: 'background 0.5s ease-in-out',
  },
  electricRoyal: {
    background: 'linear-gradient(to right, #4272ff, #365dff)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  tealStone: {
    background: 'linear-gradient(to right, #245f73, #1f4f5f)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  warmTaupe: {
    background: 'linear-gradient(to right, #80775c, #6f6752)',
    textColor: '#0b1220',
    transition: 'background 0.5s ease-in-out',
  },
  // Premium dark themes (5 distinct options)
  obsidianMarket: {
    background: 'linear-gradient(90deg, #03051e 0%, #0b1220 50%, #111827 100%)',
    textColor: '#e6eef8',
    transition: 'background 0.5s ease-in-out',
  },
  nocturne: {
    background: 'linear-gradient(90deg, #0a0f1a 0%, #131826 50%, #192233 100%)',
    textColor: '#cfd9ee',
    transition: 'background 0.5s ease-in-out',
  },
  deepGalaxy: {
    background: 'linear-gradient(90deg, #0076a5ff 0%, #aa3e2bff 50%, #61dbe4ff 100%)',
    textColor: '#dbe9ff',
    transition: 'background 0.5s ease-in-out',
  },
  // ...removed two bottom colors (velvetMidnight, carbonEdge) per user request
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Try to read persisted theme lazily (guards SSR / non-browser)
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem('app.theme');
        if (stored && gradients[stored]) return stored;
      } catch (_) { /* ignore */ }
    }
    return 'default';
  };
  const [theme, setTheme] = useState(getInitialTheme);
  const [previewTheme, setPreviewTheme] = useState(null); // For previewing themes

  // Apply theme transition and background to html, body, and #root for full-page consistency
  useEffect(() => {
    const active = previewTheme ? gradients[previewTheme] : gradients[theme];

    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const rootEl = document.getElementById('root');

    // Smooth transitions
    htmlEl.style.transition = active.transition || 'background 0.5s ease-in-out';
    bodyEl.style.transition = active.transition || 'background 0.5s ease-in-out';
    if (rootEl) rootEl.style.transition = active.transition || 'background 0.5s ease-in-out';

    // Synchronize backgrounds across the full document so no fallback peeks through
    htmlEl.style.background = active.background;
    htmlEl.style.backgroundSize = 'cover';
    htmlEl.style.backgroundRepeat = 'no-repeat';
    htmlEl.style.backgroundPosition = 'center center';
    bodyEl.style.background = active.background;
    bodyEl.style.backgroundSize = 'cover';
    bodyEl.style.backgroundRepeat = 'no-repeat';
    bodyEl.style.backgroundPosition = 'center center';
    if (rootEl) {
      rootEl.style.background = active.background;
      rootEl.style.backgroundSize = 'cover';
      rootEl.style.backgroundRepeat = 'no-repeat';
      rootEl.style.backgroundPosition = 'center center';
    }

    // Text color on body (components still control their own text utilities)
    bodyEl.style.color = active.textColor;

    // Also set CSS variables used across the app so components relying on
    // `var(--text-body)` and `var(--bg-surface)` pick up the current theme.
    try {
      // Set background and text CSS vars
      htmlEl.style.setProperty('--bg-surface', active.background);
      htmlEl.style.setProperty('--text-body', active.textColor);

      // Simple heuristic to decide if the theme is light or dark based on text color
      const hex = (active.textColor || '#ffffff').replace('#', '');
      const hex6 = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
      const r = parseInt(hex6.substring(0,2), 16);
      const g = parseInt(hex6.substring(2,4), 16);
      const b = parseInt(hex6.substring(4,6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      const isTextLight = brightness > 200; // if text color is very light, treat as light-on-dark

      if (isTextLight) {
        // Keep dark-style muted variables for high contrast on dark backgrounds
        htmlEl.style.setProperty('--bg-muted', 'rgba(255, 255, 255, 0.06)');
        htmlEl.style.setProperty('--navbar-border', 'rgba(255, 255, 255, 0.08)');
        htmlEl.style.setProperty('--card-shadow', '0 8px 24px rgba(0, 0, 0, 0.3)');
        htmlEl.style.setProperty('--accent', '#22c55e');
  // Transparent surface and border for overlays on dark themes
  htmlEl.style.setProperty('--bg-transparent', 'rgba(255, 255, 255, 0.06)');
  htmlEl.style.setProperty('--bg-border', 'rgba(255, 255, 255, 0.08)');
        // mark html as dark-theme (so light text remains as-is)
        htmlEl.setAttribute('data-theme-light', 'false');
      } else {
        // Light theme variables (dark text on light backgrounds)
        htmlEl.style.setProperty('--bg-muted', 'rgba(11, 18, 32, 0.04)');
        htmlEl.style.setProperty('--navbar-border', 'rgba(11, 18, 32, 0.06)');
        htmlEl.style.setProperty('--card-shadow', '0 8px 24px rgba(11, 18, 32, 0.06)');
        htmlEl.style.setProperty('--accent', '#0b6b4a');
  // Use white/30 for translucent surfaces and white/30 border tint per request
  htmlEl.style.setProperty('--bg-transparent', 'rgba(255, 255, 255, 0.30)');
  htmlEl.style.setProperty('--bg-border', 'rgba(255, 255, 255, 0.30)');
        // mark html as light-theme so CSS fallbacks can flip white text
        htmlEl.setAttribute('data-theme-light', 'true');
      }
    } catch (e) {
      // Ignore failures when running in non-browser environments
    }
  }, [theme, previewTheme]);

  // Change theme permanently
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setPreviewTheme(null); // Clear preview when applying
  };

  // Persist theme whenever it changes
  useEffect(() => {
    try { window.localStorage.setItem('app.theme', theme); } catch(_) { /* ignore */ }
  }, [theme]);

  // Preview a theme temporarily
  const previewThemeFunc = (themeName) => {
    setPreviewTheme(themeName);
    setTimeout(() => setPreviewTheme(null), 3000); // Revert after 3 seconds
  };

  const currentTheme = previewTheme ? gradients[previewTheme] : gradients[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        previewTheme: previewThemeFunc,
        gradients,
        background: currentTheme.background,
        textColor: currentTheme.textColor,
        transition: currentTheme.transition,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};