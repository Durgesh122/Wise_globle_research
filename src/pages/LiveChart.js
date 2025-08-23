import React from 'react';

import { Trans } from '../i18nShim';
function LiveChart() {
  return (
    <div className="min-h-screen pt-20 px-4 bg-[#0f172a] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center"><Trans i18nKey="pages.LiveChart.live-market-chart">📊 Live Market Chart</Trans></h1>
      <div className="w-full h-[600px] rounded-xl overflow-hidden">
        <iframe
          title="TradingView Live Chart"
          src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_abc123&symbol=NSE:NIFTY&interval=1&hidesidetoolbar=1&theme=dark&style=1&locale=en&utm_source=wiseglobal.com&utm_medium=widget&utm_campaign=chart"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default LiveChart;
