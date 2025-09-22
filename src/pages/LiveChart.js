import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Trans } from '../i18nShim';
function LiveChart() {
  return (
    <div className="min-h-screen pt-20 px-4 bg-[#0f172a] text-white">
      <Helmet>
        <title>Live Market Chart — Nifty & Sensex — Wise Global Research</title>
        <meta name="description" content="Live interactive market charts for Nifty, Sensex and major instruments. Real-time charts to help traders spot entry & exit points." />
        <link rel="canonical" href="https://wiseglobalresearch.com/live-chart" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Live Market Chart",
            "url": "https://wiseglobalresearch.com/live-chart",
            "description": "Live interactive market charts for Nifty, Sensex and major instruments."
          }`}
        </script>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center"><Trans i18nKey="pages.LiveChart.live-market-chart">📊 Live Market Chart</Trans></h1>
      <div className="w-full rounded-xl overflow-hidden">
        <div className="responsive-embed rounded-xl overflow-hidden">
          <iframe
            title="TradingView Live Chart"
            src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_abc123&symbol=NSE:NIFTY&interval=1&hidesidetoolbar=1&theme=dark&style=1&locale=en&utm_source=wiseglobal.com&utm_medium=widget&utm_campaign=chart"
            frameBorder="0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default LiveChart;
