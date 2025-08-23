
import React from 'react';

const AlertBar = () => {
  // Static bilingual alert message
  const notePrefix = 'कृपया ध्यान दें –';
  const messageHi = 'प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते। Wise Global Research केवल अपने खाते में प्राप्त होने वाली राशियों के लिए सेवाएं प्रदान करने के लिए जिम्मेदार होगा।';
  const messageEn = 'Pay close attention—Dear Client, your payments will be accepted if you use the account information listed on the Wise Global Research website. We do not accept any payment in any other accounts besides Wise Global Research. Wise Global Research will only be liable to provide services for the amounts received in its account.';
  const alertMessage = `${messageHi} Note: ${messageEn}`;

  return (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 mt-5">
      <div className="container mx-auto px-4">
        <div
          className="animate-scroll whitespace-normal break-words text-sm md:text-base text-center flex items-center justify-center gap-2"
          role="status"
          aria-live="polite"
        >
          <strong className="flex-shrink-0">{notePrefix}</strong>
          <span className="max-w-full">{alertMessage}</span>
        </div>
        <div style={{ width: '100%', marginTop: 8 }}>
              <iframe
                title="TradingView Ticker Tape"
                src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=in#%7B%22symbols%22%3A%5B%7B%22description%22%3A%22NIFTY%22%2C%22proName%22%3A%22NSE%3ANIFTY%22%7D%2C%7B%22description%22%3A%22SENSEX%22%2C%22proName%22%3A%22BSE%3ASENSEX%22%7D%2C%7B%22description%22%3A%22BAJAJAUTO%22%2C%22proName%22%3A%22BSE%3ABAJAJ_AUTO%22%7D%2C%7B%22description%22%3A%22INFY%22%2C%22proName%22%3A%22BSE%3AINFY%22%7D%2C%7B%22description%22%3A%22HINDUNILVR%22%2C%22proName%22%3A%22BSE%3AHINDUNILVR%22%7D%2C%7B%22description%22%3A%22BAJAJFINSV%22%2C%22proName%22%3A%22BSE%3ABAJAJFINSV%22%7D%2C%7B%22description%22%3A%22DRREDDY%22%2C%22proName%22%3A%22BSE%3ADRREDDY%22%7D%2C%7B%22description%22%3A%22TCS%22%2C%22proName%22%3A%22BSE%3ATCS%22%7D%2C%7B%22description%22%3A%22HDFCBANK%22%2C%22proName%22%3A%22BSE%3AHDFCBANK%22%7D%2C%7B%22description%22%3A%22RELIANCE%22%2C%22proName%22%3A%22BSE%3ARELIANCE%22%7D%2C%7B%22description%22%3A%22NESTLEIND%22%2C%22proName%22%3A%22BSE%3ANESTLEIND%22%7D%2C%7B%22description%22%3A%22SUNPHARMA%22%2C%22proName%22%3A%22BSE%3ASUNPHARMA%22%7D%2C%7B%22description%22%3A%22ASIANPAINT%22%2C%22proName%22%3A%22BSE%3AASIANPAINT%22%7D%2C%7B%22description%22%3A%22HCLTECH%22%2C%22proName%22%3A%22BSE%3AHCLTECH%22%7D%2C%7B%22description%22%3A%22BHARTIARTL%22%2C%22proName%22%3A%22BSE%3ABHARTIARTL%22%7D%2C%7B%22description%22%3A%22ULTRACEMCO%22%2C%22proName%22%3A%22BSE%3AULTRACEMCO%22%7D%2C%7B%22description%22%3A%22ITC%22%2C%22proName%22%3A%22BSE%3AITC%22%7D%2C%7B%22description%22%3A%22HDFC%22%2C%22proName%22%3A%22BSE%3AHDFC%22%7D%2C%7B%22description%22%3A%22TECHM%22%2C%22proName%22%3A%22BSE%3ATECHM%22%7D%2C%7B%22description%22%3A%22LT%22%2C%22proName%22%3A%22BSE%3ALT%22%7D%2C%7B%22description%22%3A%22INDUSINDBK%22%2C%22proName%22%3A%22BSE%3AINDUSINDBK%22%7D%2C%7B%22description%22%3A%22ICICIBANK%22%2C%22proName%22%3A%22BSE%3AICICIBANK%22%7D%2C%7B%22description%22%3A%22KOTAKBANK%22%2C%22proName%22%3A%22BSE%3AKOTAKBANK%22%7D%2C%7B%22description%22%3A%22AXISBANK%22%2C%22proName%22%3A%22BSE%3AAXISBANK%22%7D%2C%7B%22description%22%3A%22MARUTI%22%2C%22proName%22%3A%22BSE%3AMARUTI%22%7D%2C%7B%22description%22%3A%22NTPC%22%2C%22proName%22%3A%22BSE%3ANTPC%22%7D%2C%7B%22description%22%3A%22M%26M%22%2C%22proName%22%3A%22BSE%3AM_M%22%7D%2C%7B%22description%22%3A%22POWERGRID%22%2C%22proName%22%3A%22BSE%3APOWERGRID%22%7D%2C%7B%22description%22%3A%22SBIN%22%2C%22proName%22%3A%22BSE%3ASBIN%22%7D%2C%7B%22description%22%3A%22ONGC%22%2C%22proName%22%3A%22BSE%3AONGC%22%7D%5D,%22showSymbolLogo%22:true,%22colorTheme%22:%22dark%22,%22isTransparent%22:false,%22displayMode%22:%22adaptive%22,%22width%22:%22100%25%22,%22height%22:150,%22utm_source%22:%22www.delightfinancial.com%22,%22utm_medium%22:%22widget_new%22,%22utm_campaign%22:%22ticker-tape%22,%22page-uri%22:%22www.delightfinancial.com/index?page=contact_us%22}"
                style={{ width: '100%', height: 60, border: 'none', display: 'block' }}
                loading="lazy"
              />
        </div>
      </div>
    </div>
  );
};

export default AlertBar;