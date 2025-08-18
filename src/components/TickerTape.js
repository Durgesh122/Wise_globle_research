import React from 'react';

// TradingView ticker-tape iframe wrapper. Default embedUrl is the URL provided by the user.
const DEFAULT_EMBED =
  'https://s.tradingview.com/embed-widget/ticker-tape/?locale=in#%7B%22symbols%22%3A%5B%7B%22description%22%3A%22NIFTY%22%2C%22proName%22%3A%22NSE%3ANIFTY%22%7D%2C%7B%22description%22%3A%22SENSEX%22%2C%22proName%22%3A%22BSE%3ASENSEX%22%7D%2C%7B%22description%22%3A%22BAJAJAUTO%22%2C%22proName%22%3A%22BSE%3ABAJAJ_AUTO%22%7D%2C%7B%22description%22%3A%22INFY%22%2C%22proName%22%3A%22BSE%3AINFY%22%7D%2C%7B%22description%22%3A%22HINDUNILVR%22%2C%22proName%22%3A%22BSE%3AHINDUNILVR%22%7D%2C%7B%22description%22%3A%22BAJAJFINSV%22%2C%22proName%22%3A%22BSE%3ABAJAJFINSV%22%7D%2C%7B%22description%22%3A%22DRREDDY%22%2C%22proName%22%3A%22BSE%3ADRREDDY%22%7D%2C%7B%22description%22%3A%22TCS%22%2C%22proName%22%3A%22BSE%3ATCS%22%7D%2C%7B%22description%22%3A%22HDFCBANK%22%2C%22proName%22%3A%22BSE%3AHDFCBANK%22%7D%2C%7B%22description%22%3A%22RELIANCE%22%2C%22proName%22%3A%22BSE%3ARELIANCE%22%7D%2C%7B%22description%22%3A%22NESTLEIND%22%2C%22proName%22%3A%22BSE%3ANESTLEIND%22%7D%2C%7B%22description%22%3A%22SUNPHARMA%22%2C%22proName%22%3A%22BSE%3ASUNPHARMA%22%7D%2C%7B%22description%22%3A%22ASIANPAINT%22%2C%22proName%22%3A%22BSE%3AASIANPAINT%22%7D%2C%7B%22description%22%3A%22HCLTECH%22%2C%22proName%22%3A%22BSE%3AHCLTECH%22%7D%2C%7B%22description%22%3A%22BHARTIARTL%22%2C%22proName%22%3A%22BSE%3ABHARTIARTL%22%7D%2C%7B%22description%22%3A%22ULTRACEMCO%22%2C%22proName%22%3A%22BSE%3AULTRACEMCO%22%7D%2C%7B%22description%22%3A%22ITC%22%2C%22proName%22%3A%22BSE%3AITC%22%7D%2C%7B%22description%22%3A%22HDFC%22%2C%22proName%22%3A%22BSE%3AHDFC%22%7D%2C%7B%22description%22%3A%22TECHM%22%2C%22proName%22%3A%22BSE%3ATECHM%22%7D%2C%7B%22description%22%3A%22LT%22%2C%22proName%22%3A%22BSE%3ALT%22%7D%2C%7B%22description%22%3A%22INDUSINDBK%22%2C%22proName%22%3A%22BSE%3AINDUSINDBK%22%7D%2C%7B%22description%22%3A%22ICICIBANK%22%2C%22proName%22%3A%22BSE%3AICICIBANK%22%7D%2C%7B%22description%22%3A%22KOTAKBANK%22%2C%22proName%22%3A%22BSE%3AKOTAKBANK%22%7D%2C%7B%22description%22%3A%22AXISBANK%22%2C%22proName%22%3A%22BSE%3AAXISBANK%22%7D%2C%7B%22description%22%3A%22MARUTI%22%2C%22proName%22%3A%22BSE%3AMARUTI%22%7D%2C%7B%22description%22%3A%22NTPC%22%2C%22proName%22%3A%22BSE%3ANTPC%22%7D%2C%7B%22description%22%3A%22M%26M%22%2C%22proName%22%3A%22BSE%3AM_M%22%7D%2C%7B%22description%22%3A%22POWERGRID%22%2C%22proName%22%3A%22BSE%3APOWERGRID%22%7D%2C%7B%22description%22%3A%22SBIN%22%2C%22proName%22%3A%22BSE%3ASBIN%22%7D%2C%7B%22description%22%3A%22ONGC%22%2C%22proName%22%3A%22BSE%3AONGC%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A78%2C%22utm_source%22%3A%22www.delightfinancial.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22www.delightfinancial.com%2Findex%3Fpage%3Dcontact_us%22%7D';

const TickerTape = ({ embedUrl = DEFAULT_EMBED }) => {
  return (
    <div className="w-full mt-6 sm:mt-14">
      <div className="w-full">
        <div className="w-full overflow-hidden rounded-none">
          <iframe
            title="TradingView Ticker Tape"
            src={embedUrl}
            className="w-full block"
            style={{ height: 78, border: 'none' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default TickerTape;
