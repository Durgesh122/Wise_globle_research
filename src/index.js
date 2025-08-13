import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);