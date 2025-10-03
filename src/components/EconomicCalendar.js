import React, { useRef, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

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
  const [visible, setVisible] = useState(!requireClickToLoad); // show immediately unless click-to-load requested
  const [failed, setFailed] = useState(false);
  const { background, textColor } = useContext(ThemeContext);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6" ref={containerRef}>
      <div className="container max-w-3xl mx-auto text-adaptive" style={{ color: textColor }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Economic Calendar</h2>
        <div className="space-y-4">
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: background, border: `1px solid ${textColor}` }}
          >
            <div className="px-4 py-3">
              <CalendarBoundary>
                {failed ? (
                  <div className="p-4 text-sm text-red-100 bg-red-800/60 rounded-md">
                    Calendar is temporarily unavailable. Please try again later.
                  </div>
                ) : visible ? (
                  <>
                    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${textColor}` }}>
                      <iframe
                        title="Economic Calendar Widget"
                        src={embedUrl}
                        className="block w-full h-[50vh] sm:h-[55vh] min-h-[220px] sm:min-h-[280px] border-0"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        // loading eager so navigation-ready widgets start quickly when visible
                        loading="eager"
                        referrerPolicy="no-referrer"
                        aria-label="Embedded economic calendar"
                        onLoad={() => {
                          setFailed(false);
                        }}
                        onError={() => setFailed(true)}
                      />
                    </div>
                    <div className="mt-2 text-right">
                      <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: textColor }}>Open calendar in a new tab</a>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[220px] sm:h-[260px] text-adaptive">
                    {requireClickToLoad ? (
                      <div className="text-center">
                        <p className="mb-2">Third-party calendar is available but requires your consent to load.</p>
                        <button
                          type="button"
                          onClick={() => setVisible(true)}
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                          Load calendar
                        </button>
                      </div>
                    ) : (
                      'Loading calendar…'
                    )}
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