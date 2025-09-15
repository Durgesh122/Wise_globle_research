import React, { useEffect, useRef, useState } from 'react';

// Small error boundary to prevent third-party widget errors from breaking the app
class CalendarBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { /* no-op: isolate third-party issues */ }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-sm text-red-100 bg-red-800/60 rounded-md">
          Third-party calendar failed to load. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const EconomicCalendar = ({ embedUrl = 'https://widget.myfxbook.com/widget/calendar.html', requireClickToLoad = false }) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [consented, setConsented] = useState(!requireClickToLoad);

  // Lazy-mount the iframe when the section is in view to avoid eager script exec
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Guard for older browsers or unusual embed contexts
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
          break;
        }
      }
    }, { root: null, threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-4 sm:py-6 px-2 sm:px-4" ref={containerRef}>
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-adaptive">Economic Calendar</h2>
  <div className="overflow-hidden rounded-xl shadow-inner p-3" style={{ background: 'rgba(255,255,244,0.82)', border: '1px solid rgba(255,255,244,0.9)' }}>
          <CalendarBoundary>
            {failed ? (
              <div className="p-4 text-sm text-red-100 bg-red-800/60 rounded-md">
                Calendar is temporarily unavailable. Please try again later.
              </div>
            ) : (visible && consented) ? (
              <>
                <div className="rounded-lg overflow-hidden border border-white/30">
                  <iframe
                    title="Economic Calendar Widget"
                    src={embedUrl}
                    className="block w-full h-[50vh] sm:h-[55vh] min-h-[220px] sm:min-h-[280px] border-0"
                    // Allow same-origin so the widget can access its own storage and resources.
                    // We keep other restrictions to limit capabilities.
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    aria-label="Embedded economic calendar"
                    onLoad={() => {
                      // Iframe loaded — clear any previous failed state.
                      // Do NOT attempt to access iframe.localStorage (cross-origin) as that will throw.
                      setFailed(false);
                    }}
                    onError={() => setFailed(true)}
                  />
                </div>
                <div className="mt-2 text-right">
                  <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline text-blue-500">Open calendar in a new tab</a>
                </div>
              </>
            ) : requireClickToLoad ? (
              <div className="flex flex-col items-center justify-center gap-3 h-[220px] sm:h-[260px] text-adaptive">
                <p>Click to load the third-party economic calendar.</p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => { setConsented(true); setFailed(false); }}
                >
                  Load Calendar
                </button>
                <a
                  className="text-blue-300 underline text-sm"
                  href={embedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open in new tab
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[220px] sm:h-[260px] text-adaptive">
                Loading calendar…
              </div>
            )}
          </CalendarBoundary>
        </div>
      </div>
    </section>
  );
};

export default EconomicCalendar;
