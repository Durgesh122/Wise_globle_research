// pages/NotFound.js
import React from 'react';
import { Trans } from '../i18nShim';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4"><Trans i18nKey="pages.NotFound.404-page-not-found">404 - Page Not Found</Trans></h1>
      <p className="mb-4"><Trans i18nKey="pages.NotFound.sorry-the-page-you-re-looking-for-doesn-"><Trans i18nKey="pages.NotFound.sorry-the-page-you-re-looking-for-doesn--1">Sorry, the page you're looking for doesn't exist.</Trans></Trans></p>
      <Link to="/" className="text-blue-500 underline"><Trans i18nKey="pages.NotFound.go-to-home">Go to Home</Trans></Link>
    </div>
  );
}

export default NotFound;
