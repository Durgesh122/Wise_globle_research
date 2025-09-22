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
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6" ref={containerRef}>
      <div className="container max-w-3xl mx-auto text-white text-adaptive">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Economic Calendar</h2>
        <div className="space-y-4">
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: '#ffffffff', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="px-4 py-3">
              <CalendarBoundary>
                {failed ? (
                  <div className="p-4 text-sm text-red-100 bg-red-800/60 rounded-md">
                    Calendar is temporarily unavailable. Please try again later.
                  </div>
                ) : (visible && consented) ? (
                  <>
                    <div className="rounded-lg overflow-hidden border border-black/10">
                      <iframe
                        title="Economic Calendar Widget"
                        src={embedUrl}
                        className="block w-full h-[50vh] sm:h-[55vh] min-h-[220px] sm:min-h-[280px] border-0"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        aria-label="Embedded economic calendar"
                        onLoad={() => {
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
        </div>
      </div>
    </section>
  );
};

export default EconomicCalendar;
