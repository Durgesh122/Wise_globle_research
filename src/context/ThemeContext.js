import React, { createContext, useState, useEffect } from 'react';

// Define an extensive set of vibrant, sexy gradients (restored) + premium dark themes
const gradients = {
  default: {
    // Techy indigo-to-periwinkle gradient
    background: 'linear-gradient(-225deg, #2db2ff7e 0%, #b5b3ff77 48%, #b4bcee46 100%)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  // ...removed two top colors (fire, purpleDream) per user request
  greenGlow: {
    background: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  rainbowSky: {
    background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
    textColor: '#000000',
    transition: 'background 0.5s ease-in-out',
  },
  // New Sexy Gradients

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
    background: 'linear-gradient(90deg, #071029 0%, #0e1833 50%, #12203f 100%)',
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

  // Apply theme transition to body for smooth gradient changes
  useEffect(() => {
    document.body.style.transition = 'background 0.5s ease-in-out';
    document.body.style.background = previewTheme ? gradients[previewTheme].background : gradients[theme].background;
    document.body.style.color = previewTheme ? gradients[previewTheme].textColor : gradients[theme].textColor;
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