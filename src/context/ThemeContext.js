import React, { createContext, useState, useEffect } from 'react';

// Define an extensive set of vibrant, sexy gradients (restored) + premium dark themes
const gradients = {
  default: {
  // Requested light gradient
   background: 'linear-gradient(to right, #4272ff, #365dff)',
    textColor: '#ffffff',
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
  // restore default theme to the original gradient
  const [theme, setTheme] = useState('default');
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
    bodyEl.style.background = active.background;
    if (rootEl) rootEl.style.background = active.background;

    // Text color on body (components still control their own text utilities)
    bodyEl.style.color = active.textColor;
  }, [theme, previewTheme]);

  // Change theme permanently
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setPreviewTheme(null); // Clear preview when applying
  };

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