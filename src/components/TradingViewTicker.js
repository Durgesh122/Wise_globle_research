import React, { useEffect, useState } from 'react';

const TICKER_ZINDEX = 120;

const TradingViewTicker = ({ fixed = true }) => {
  // Inline/top-of-navbar ticker (non-fixed) so it can be rendered inside Navbar
  // containerStyle will be defined later (after widgetHeight is known).

  const DEFAULT_WIDGET_HEIGHT = 46;

  const getHeightForWidth = (w) => {
    if (!w) return DEFAULT_WIDGET_HEIGHT;
    // Increase heights slightly for narrow screens so text doesn't wrap/cut
    if (w <= 360) return 88; // very small phones
    if (w <= 420) return 80; // small phones
    if (w <= 480) return 72; // phablets / narrow landscape
    return DEFAULT_WIDGET_HEIGHT;
  };

  const [widgetHeight, setWidgetHeight] = useState(DEFAULT_WIDGET_HEIGHT);

  useEffect(() => {
    const update = () => setWidgetHeight(getHeightForWidth(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Build the TradingView widget config dynamically so the embedded JSON height
  // matches the iframe height we set above. This prevents internal clipping
  // when the widget tries to render at a different height than the iframe.
  const widgetConfig = {
    symbols: [
      { description: 'NIFTY', proName: 'NSE:NIFTY' },
      { description: 'SENSEX', proName: 'BSE:SENSEX' },
      { description: 'BAJAJAUTO', proName: 'BSE:BAJAJ_AUTO' },
      { description: 'INFY', proName: 'BSE:INFY' },
      { description: 'HINDUNILVR', proName: 'BSE:HINDUNILVR' },
      { description: 'BAJAJFINSV', proName: 'BSE:BAJAJFINSV' },
      { description: 'DRREDDY', proName: 'BSE:DRREDDY' },
      { description: 'TCS', proName: 'BSE:TCS' },
      { description: 'HDFCBANK', proName: 'BSE:HDFCBANK' },
      { description: 'RELIANCE', proName: 'BSE:RELIANCE' },
      { description: 'NESTLEIND', proName: 'BSE:NESTLEIND' },
      { description: 'SUNPHARMA', proName: 'BSE:SUNPHARMA' },
      { description: 'ASIANPAINT', proName: 'BSE:ASIANPAINT' },
      { description: 'HCLTECH', proName: 'BSE:HCLTECH' },
      { description: 'BHARTIARTL', proName: 'BSE:BHARTIARTL' },
      { description: 'ULTRACEMCO', proName: 'BSE:ULTRACEMCO' },
      { description: 'ITC', proName: 'BSE:ITC' },
      { description: 'HDFC', proName: 'BSE:HDFC' },
      { description: 'TECHM', proName: 'BSE:TECHM' },
      { description: 'LT', proName: 'BSE:LT' },
      { description: 'INDUSINDBK', proName: 'BSE:INDUSINDBK' },
      { description: 'ICICIBANK', proName: 'BSE:ICICIBANK' },
      { description: 'KOTAKBANK', proName: 'BSE:KOTAKBANK' },
      { description: 'AXISBANK', proName: 'BSE:AXISBANK' },
    ],
    showSymbolLogo: true,
    colorTheme: 'light',
    isTransparent: false,
    displayMode: 'adaptive',
    width: '100%',
    height: widgetHeight,
    utm_source: 'wiseglobalresearch.com',
    utm_medium: 'widget',
    utm_campaign: 'ticker-tape',
    'page-uri': 'wiseglobalresearch.com/',
  };

  const iframeSrc = `https://s.tradingview.com/embed-widget/ticker-tape/?locale=in#${encodeURIComponent(
    JSON.stringify(widgetConfig),
  )}`;

  // Now that `widgetHeight` is initialized, build the container style.
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: `${widgetHeight}px`,
    background: 'var(--navbar-bg, #ffffff)',
    zIndex: TICKER_ZINDEX,
    boxShadow: '0 2px 6px rgba(12,18,30,0.04)',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
    minWidth: 0,
    boxSizing: 'border-box',
    overflow: 'visible',
    transition: 'min-height 180ms ease',
  };

  return (
    <div
      aria-hidden={false}
      role="region"
      aria-label="Market Ticker"
      style={containerStyle}
    >
      <iframe
        title="TradingView Ticker Tape"
        src={iframeSrc}
        className="w-full"
        style={{ width: '100%', height: `${widgetHeight}px`, border: 'none', display: 'block', minWidth: 0 }}
        loading="lazy"
        aria-hidden={false}
      />
    </div>
  );
};

export default TradingViewTicker;
