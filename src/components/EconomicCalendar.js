import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Table-style economic calendar with live countdown and mock live updates.
// Background of the card uses white/30 as requested.

const IMPACT_LABELS = ['NONE', 'LOW', 'MED', 'HIGH'];

// fmtNumber removed - not used by current table implementation

function numericValue(str) {
  if (str == null) return null;
  const num = parseFloat(String(str).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(num) ? num : null;
}

function timeUntilSeconds(iso) {
  return Math.max(0, Math.floor((new Date(iso) - new Date()) / 1000));
}

// formatTimeLeft is used by the Countdown component below
function formatTimeLeft(iso) {
  const s = timeUntilSeconds(iso);
  if (s <= 0) return 'Now';
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem === 0 ? `${h}h` : `${h}h ${rem}m`;
}

const countryEmoji = (code) => ({ IN: '🇮🇳', US: '🇺🇸', EU: '🇪🇺', GB: '🇬🇧', JP: '🇯🇵' }[code] || '🏳️');

const makeMockEvent = (i = 0) => {
  const now = Date.now();
  const time = new Date(now + (i + 1) * (30 + Math.floor(Math.random() * 90)) * 60000).toISOString();
  const impact = Math.ceil(Math.random() * 3); // 1..3
  const prev = (Math.random() * 5).toFixed(1) + '%';
  const consensus = (parseFloat(prev) + (Math.random() * 2 - 1)).toFixed(1) + '%';
  const actualDiff = (Math.random() * 4 - 2).toFixed(1);
  const actual = (parseFloat(consensus) + parseFloat(actualDiff)).toFixed(1) + '%';
  const countries = ['IN', 'US', 'EU', 'GB', 'JP'];
  const titles = ['CPI (YoY)', 'GDP Growth Rate', 'Retail Sales MoM', 'Unemployment Rate', 'Trade Balance'];
  return {
    id: `m-${Date.now()}-${i}`,
    date: new Date(time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    time: new Date(time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    isoTime: time,
    country: countries[i % countries.length],
    title: titles[i % titles.length],
    impact,
    previous: prev,
    consensus,
    actual,
  };
};

const EconomicCalendar = ({ apiUrl, pollInterval = 30000, embedUrl = 'https://widget.myfxbook.com/widget/calendar.html' }) => {
  const [events, setEvents] = useState(() => Array.from({ length: 8 }).map((_, i) => makeMockEvent(i)));
  const mounted = useRef(true);
  const embedRef = useRef(null);
  const tvRef = useRef(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const [forceTable, setForceTable] = useState(false);
  // Track whether the third-party embed failed. Only used to show a small notice.
  const [embedFailed, setEmbedFailed] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [useTradingView, setUseTradingView] = useState(false);

  useEffect(() => {
    mounted.current = true;
    const poll = async () => {
      try {
        let res;
        if (!apiUrl) {
          // call the server proxy which will return mock or whitelisted data
          res = await fetch('/api/economic');
        } else {
          // route external URLs through the server proxy to avoid exposing an open proxy in the client bundle
          // The proxy validates hostnames using ECONOMIC_WHITELIST. We pass the external URL as a query param.
          const encoded = encodeURIComponent(apiUrl);
          res = await fetch(`/api/economic?url=${encoded}`);
        }
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (Array.isArray(data) && mounted.current) setEvents(data.slice(0, 12));
      } catch (err) {
        // keep existing mock events if network fails
      }
    };

    const pTimer = setInterval(poll, pollInterval);
    // initial
    poll();

    return () => {
      mounted.current = false;
      clearInterval(pTimer);
    };
  }, [apiUrl, pollInterval]);

  // lazy-show iframe when near viewport to avoid heavy third-party load
  useEffect(() => {
    if (!embedRef.current || showEmbed) return undefined;
    // Fallback: if IntersectionObserver isn't supported, show the embed immediately
    if (!('IntersectionObserver' in window)) {
      setShowEmbed(true);
      return undefined;
    }
    const ob = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        setShowEmbed(true);
        ob.disconnect();
      }
    }, { rootMargin: '400px' });
    ob.observe(embedRef.current);
    return () => ob.disconnect();
  }, [showEmbed]);

  // If the embed is shown but doesn't load within a timeout, fall back (TradingView -> table)
  useEffect(() => {
    if (!showEmbed || forceTable || useTradingView) return undefined;
    setEmbedLoaded(false);
    setEmbedFailed(false);
    const t = setTimeout(() => {
      if (!embedLoaded) {
        setEmbedFailed(true);
        // Try TradingView widget before giving up to table
        setUseTradingView(true);
      }
    }, 8000);
    return () => clearTimeout(t);
  }, [showEmbed, forceTable, embedLoaded, useTradingView]);

  // Load TradingView Economic Calendar widget dynamically when needed
  useEffect(() => {
    if (!useTradingView || !tvRef.current) return undefined;
    // Reset container and inject the official TradingView embed script with config as innerHTML
    tvRef.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 520,
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      importanceFilter: '-1,0,1,2' // show all
    });
    tvRef.current.appendChild(script);

    // If TradingView doesn't render (network blocked), drop to table
    const fallbackTimer = setTimeout(() => {
      // Heuristic: if no iframe was injected, assume failure
      if (tvRef.current && !tvRef.current.querySelector('iframe')) {
        setForceTable(true);
      }
    }, 9000);
    return () => clearTimeout(fallbackTimer);
  }, [useTradingView]);

  const cellClassFor = (actualStr, consensusStr) => {
    const a = numericValue(actualStr);
    const c = numericValue(consensusStr);
    if (a == null || c == null) return 'bg-white/5';
    return a >= c ? 'bg-emerald-700/50 text-white' : 'bg-rose-600/50 text-white';
  };

  // Countdown is a local memoized component that updates only itself every
  // second, avoiding re-render of the whole EconomicCalendar.
  const Countdown = React.memo(function Countdown({ iso }) {
    const [text, setText] = useState(() => formatTimeLeft(iso));
    useEffect(() => {
      let mounted = true;
      const tick = () => {
        if (!mounted) return;
        setText(formatTimeLeft(iso));
      };
      // update immediately and every second
      tick();
      const id = setInterval(tick, 1000);
      return () => { mounted = false; clearInterval(id); };
    }, [iso]);
    return <span className="text-gray-200">{text}</span>;
  });

  // No i18n hook: use plain strings for this component

  return (
    <section className="py-6 sm:py-8 px-2 sm:px-4">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Economic Calendar</h2>
            <div className="mt-1 text-xs text-gray-300 flex flex-wrap gap-2">
              <div className="bg-white/6 px-2 py-1 rounded">Aug 18 - 20, 2025</div>
              <div className="bg-white/6 px-2 py-1 rounded">{new Date().toLocaleTimeString()} (GMT)</div>
            </div>
          </div>
          {embedUrl && (
            <div className="flex items-center gap-3">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-300 hover:text-blue-200 underline"
              >
                Open full calendar
              </a>
              <button
                type="button"
                onClick={() => { setForceTable(v => !v); setEmbedFailed(false); }}
                className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                title={forceTable ? 'Show embedded provider view' : 'Use built-in table view'}
              >
                {forceTable ? 'Try embed again' : 'Use built-in view'}
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden bg-white/30 rounded-xl shadow-inner">
          {embedUrl && !forceTable ? (
            <div
              className="w-full"
              style={{ minHeight: 320 }}
              ref={embedRef}
            >
              {showEmbed ? (
                useTradingView ? (
                  <div
                    className="tradingview-widget-container"
                    ref={tvRef}
                    // Use widely supported responsive sizing instead of CSS min()
                    style={{ height: '60vh', minHeight: 360, maxHeight: 520 }}
                  />
                ) : (
                  <iframe
                    title="Economic Calendar Widget"
                    src={embedUrl}
                    className="w-full"
                    // Use 60vh with min/max height for better mobile support
                    style={{ height: '60vh', minHeight: 360, maxHeight: 520, border: 'none', display: 'block' }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Embedded economic calendar"
                    onLoad={() => setEmbedLoaded(true)}
                    onError={() => { setEmbedFailed(true); setUseTradingView(true); }}
                  />
                )
              ) : (
                <div className="w-full h-[320px] bg-white/6 flex items-center justify-center text-gray-300">Loading calendar…</div>
              )}
              {embedFailed ? (
                <div className="text-xs text-amber-300 px-2 py-2">Embed failed to load; trying fallback view…</div>
              ) : null}
            </div>
          ) : (
            <>
              {/* Table for medium+ screens */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Time left</th>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Impact</th>
                      <th className="px-4 py-3">Previous</th>
                      <th className="px-4 py-3">Consensus</th>
                      <th className="px-4 py-3">Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {events.map((ev) => (
                        <motion.tr
                          key={ev.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-3 align-middle">{ev.date}</td>
                          <td className="px-4 py-3 align-middle text-gray-200"><Countdown iso={ev.isoTime} /></td>
                          <td className="px-4 py-3 align-middle flex items-center gap-3">
                            <span className="text-lg">{countryEmoji(ev.country)}</span>
                            <div>
                              <div className="font-semibold">{ev.title}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-middle">
                            <span className="px-2 py-1 rounded text-xs bg-white/5">{IMPACT_LABELS[ev.impact]}</span>
                          </td>
                          <td className="px-4 py-3 align-middle text-center text-xs text-gray-200">{ev.previous}</td>
                          <td className={`px-4 py-3 align-middle text-center text-xs ${cellClassFor(ev.actual, ev.consensus)}`}>{ev.consensus}</td>
                          <td className={`px-4 py-3 align-middle text-center text-xs ${cellClassFor(ev.actual, ev.consensus)}`}>{ev.actual}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Card list for small screens */}
              <div className="sm:hidden space-y-3 p-2">
                {events.map((ev) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/6 p-3 rounded-lg border border-white/6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{countryEmoji(ev.country)}</span>
                        <div>
                          <div className="font-semibold">{ev.title}</div>
                          <div className="text-xs text-gray-300">{ev.date} · <Countdown iso={ev.isoTime} /></div>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="px-2 py-1 rounded text-xs bg-white/5 inline-block">{IMPACT_LABELS[ev.impact]}</div>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="text-gray-200">Prev<br/><span className="font-medium">{ev.previous}</span></div>
                      <div className={`rounded ${cellClassFor(ev.actual, ev.consensus)}`}>Cons<br/><span className="font-medium">{ev.consensus}</span></div>
                      <div className={`rounded ${cellClassFor(ev.actual, ev.consensus)}`}>Actual<br/><span className="font-medium">{ev.actual}</span></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

  <p className="text-xs text-gray-300 mt-3">{embedUrl ? 'Embedded calendar (live data)' : 'Live data simulated. Provide apiUrl for production data.'}</p>
      </div>
    </section>
  );
};

export default EconomicCalendar;
