// src/components/AlertBar.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const AlertBar = () => {
  const { t, i18n } = useTranslation();
  const alertMessage = t(`home.alertBar.${i18n.language}`);

  // Map language codes to "Note" translations
  const noteTranslations = {
    hi: 'कृपया ध्यान दें –',
    mr: 'कृपया लक्षात घ्या –', // Marathi
    ta: 'கவனிக்கவும்:', // Tamil
    en: 'Note:',
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 mt-8">
      <div className="container mx-auto px-4">
        <div
          className="animate-scroll whitespace-normal break-words text-sm md:text-base text-center flex items-center justify-center gap-2"
          role="status"
          aria-live="polite"
        >
          <strong className="flex-shrink-0">{noteTranslations[i18n.language] || noteTranslations.en}</strong>
          <span className="max-w-full">{alertMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertBar;