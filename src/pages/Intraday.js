import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';

const Intraday = () => (
  <div>
    <Helmet>
      <title>Intraday Trading Services — Wise Global Research</title>
      <meta name="description" content="Intraday trading tips, strategies, and real-time signals for Nifty, Sensex and major stocks — research-backed intraday recommendations." />
      <link rel="canonical" href="https://wiseglobalresearch.com/intraday" />
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Intraday Trading Services - Wise Global Research",
          "url": "https://wiseglobalresearch.com/intraday",
          "description": "Intraday trading tips, strategies and signals for Indian markets."
        }`}
      </script>
    </Helmet>
    <h1 className="text-2xl font-bold mb-4"><Trans i18nKey="pages.Intraday.intraday-services">Intraday Services</Trans></h1>
    <p><Trans i18nKey="pages.Intraday.we-offer-intraday-trading-tips-and-strat"><Trans i18nKey="pages.Intraday.we-offer-intraday-trading-tips-and-strat-1">We offer Intraday trading tips and strategies.</Trans></Trans></p>
  </div>
);

export default Intraday;
