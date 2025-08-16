import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import ta from './locales/ta.json';
import mr from './locales/mr.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  gu: { translation: gu },
  ta: { translation: ta },
  mr: { translation: mr },
};

i18n
  // detect user language (from localStorage, navigator, etc.) and cache in localStorage
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      // order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      // keys or params to lookup language from
      caches: ['localStorage'],
      // optional localStorage key
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
