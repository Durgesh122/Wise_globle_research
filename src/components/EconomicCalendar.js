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
    <section className="py-6 sm:py-8 px-2 sm:px-4" ref={containerRef}>
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Economic Calendar</h2>
        <div className="overflow-hidden bg-white/30 rounded-xl shadow-inner">
          <CalendarBoundary>
            {failed ? (
              <div className="p-4 text-sm text-red-100 bg-red-800/60 rounded-md">
                Calendar is temporarily unavailable. Please try again later.
              </div>
            ) : (visible && consented) ? (
              <iframe
                title="Economic Calendar Widget"
                src={embedUrl}
                className="block w-full h-[65vh] sm:h-[70vh] min-h-[300px] sm:min-h-[360px] border-0"
                // Allow same-origin so the widget can load its assets and use storage; keep other restrictions
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Embedded economic calendar"
                onError={() => setFailed(true)}
              />
            ) : requireClickToLoad ? (
              <div className="flex flex-col items-center justify-center gap-3 h-[260px] sm:h-[320px] text-white/80">
                <p>Click to load the third-party economic calendar.</p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setConsented(true)}
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
              <div className="flex items-center justify-center h-[260px] sm:h-[320px] text-white/80">
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
