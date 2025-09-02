import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

// Basic catalog of site pages to search through
const pages = [
  { path: '/', label: 'Home', description: 'Return to the main page.', category: 'General' },
  { path: '/about', label: 'About Us', description: 'Learn more about our company and team.', category: 'General' },
  { path: '/services', label: 'Services', description: 'Discover the financial services we offer.', category: 'General' },
  { path: '/contact', label: 'Contact', description: 'Get in touch with our support team.', category: 'General' },
  { path: '/payment', label: 'Payment', description: 'Make a payment for our services.', category: 'General' },
  { path: '/research-reports', label: 'Research Reports', description: 'Read our latest market analysis and reports.', category: 'Content' },
  { path: '/blogs', label: 'Blogs', description: 'Articles and insights from our experts.', category: 'Content' },
  { path: '/market-news', label: 'Market News', description: 'Stay updated with the latest market news.', category: 'Content' },
  { path: '/career', label: 'Careers', description: 'Explore job opportunities with us.', category: 'General' },
  { path: '/complaint', label: 'Complaint Box', description: 'File a complaint or provide feedback.', category: 'Support' },
  { path: '/complaint-data', label: 'Complaint Data', description: 'View historical complaint data.', category: 'Support' },
  { path: '/grievance-redressal-process', label: 'Grievance Redressal Process', description: 'Understand our grievance process.', category: 'Support' },
  { path: '/privacy', label: 'Privacy Policy', description: 'Read our privacy policy.', category: 'Legal' },
  { path: '/refund', label: 'Refund Policy', description: 'Information about our refund policy.', category: 'Legal' },
  { path: '/terms', label: 'Terms & Conditions', description: 'Read our terms and conditions.', category: 'Legal' },
  { path: '/accessibility-statement', label: 'Accessibility Statement', description: 'Our commitment to accessibility.', category: 'Accessibility' },
  { path: '/accessibility-feedback', label: 'Accessibility Feedback', description: 'Provide feedback on accessibility.', category: 'Accessibility' },
  // Services (sample subset)
  { path: '/SmartCash', label: 'Smart Cash', description: 'A smart way to manage your cash.', category: 'Services' },
  { path: '/EvaluationIndexOptions', label: 'Evaluation Index Options', description: 'Options for index evaluation.', category: 'Services' },
  { path: '/EvaluationStockCash', label: 'Evaluation Stock Cash', description: 'Cash options for stock evaluation.', category: 'Services' },
  { path: '/EvaluationStockOption', label: 'Evaluation Stock Option', description: 'Stock options for evaluation.', category: 'Services' },
  { path: '/SmartFuture', label: 'Smart Future', description: 'Plan for a smart financial future.', category: 'Services' },
  { path: '/SmartOptions', label: 'Smart Options', description: 'Smart investment options.', category: 'Services' },
  { path: '/ImpulseIndexOptions', label: 'Impulse Index Options', description: 'Index options based on market impulse.', category: 'Services' },
  { path: '/ImpulseOption', label: 'Impulse Option', description: 'Options based on market impulse.', category: 'Services' },
  { path: '/MCXSupreme', label: 'MCX Supreme', description: 'Supreme services for MCX.', category: 'Services' },
  { path: '/GalaxyMCX', label: 'Galaxy MCX', description: 'A galaxy of options for MCX.', category: 'Services' },
  { path: '/UniversalCash', label: 'Universal Cash', description: 'Universal cash management solutions.', category: 'Services' },
  { path: '/InfinityClub', label: 'Infinity Club', description: 'Join our exclusive Infinity Club.', category: 'Services' },
];

const ALL_CATEGORIES = ['All', 'General', 'Content', 'Support', 'Legal', 'Accessibility', 'Services'];

// Utility: split query into terms
function termsFromQuery(q) {
  return q
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

// Utility: simple ranking
function scorePage(p, terms) {
  if (terms.length === 0) return 0;
  const label = p.label.toLowerCase();
  const path = p.path.toLowerCase();
  const desc = (p.description || '').toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (label.includes(t)) score += 10;
    if (label.startsWith(t)) score += 5;
    if (path.includes(t)) score += 4;
    if (desc.includes(t)) score += 2;
  }
  return score;
}

// Utility: highlight matched terms
function highlightText(text, terms) {
  if (!text) return null;
  if (!terms || terms.length === 0) return text;
  const parts = [];
  const lower = text.toLowerCase();
  let i = 0;
  while (i < text.length) {
    let matchIndex = -1;
    let matchTerm = '';
    for (const t of terms) {
      const idx = lower.indexOf(t, i);
      if (idx !== -1 && (matchIndex === -1 || idx < matchIndex)) {
        matchIndex = idx;
        matchTerm = t;
      }
    }
    if (matchIndex === -1) {
      parts.push(text.slice(i));
      break;
    } else {
      if (matchIndex > i) parts.push(text.slice(i, matchIndex));
      const end = matchIndex + matchTerm.length;
      parts.push(
        <mark key={i} className="bg-yellow-300/70 text-black rounded px-0.5">
          {text.slice(matchIndex, end)}
        </mark>
      );
      i = end;
    }
  }
  return <>{parts}</>;
}

// Utility: Levenshtein distance for "Did you mean" suggestions
function levenshtein(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [debouncedQ, setDebouncedQ] = useState(initialQ);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showRecent, setShowRecent] = useState(false);
  const [recent, setRecent] = useState([]);
  const [category, setCategory] = useState('All');
  const inputRef = useRef(null);

  // Debounce query updates for performance
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q), 200);
    return () => clearTimeout(id);
  }, [q]);

  // Sync URL parameter with debounced query
  useEffect(() => {
    const current = searchParams.get('q') || '';
    if (debouncedQ !== current) {
      const next = new URLSearchParams(searchParams);
      if (debouncedQ) next.set('q', debouncedQ); else next.delete('q');
      setSearchParams(next, { replace: true });
    }
  }, [debouncedQ, searchParams, setSearchParams]);

  // Recent searches in localStorage
  useEffect(() => {
    if (!debouncedQ) return;
    const key = 'recentSearches';
    try {
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      // Put latest first, unique, max 8
      const next = [debouncedQ, ...arr.filter((x) => x !== debouncedQ)].slice(0, 8);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }, [debouncedQ]);

  const terms = useMemo(() => termsFromQuery(debouncedQ), [debouncedQ]);

  const filteredByCategory = useMemo(() => {
    if (category === 'All') return pages;
    return pages.filter((p) => p.category === category);
  }, [category]);

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    const scored = filteredByCategory
      .map((p) => ({ p, score: scorePage(p, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ p }) => p);
    return scored;
  }, [terms, filteredByCategory]);

  const suggestions = useMemo(() => {
    if (terms.length === 0 || results.length > 0) return [];
    const joined = debouncedQ.trim().toLowerCase();
    if (!joined) return [];
    return filteredByCategory
      .map((p) => ({
        p,
        d: Math.min(
          levenshtein(joined, p.label.toLowerCase()),
          levenshtein(joined, p.path.toLowerCase())
        ),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .map(({ p }) => p);
  }, [debouncedQ, terms, results.length, filteredByCategory]);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' && results && results.length > 0) {
      e.preventDefault();
      setActiveIndex((idx) => (idx + 1) % results.length);
    } else if (e.key === 'ArrowUp' && results && results.length > 0) {
      e.preventDefault();
      setActiveIndex((idx) => (idx <= 0 ? results.length - 1 : idx - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex].path);
      } else if (results && results.length > 0) {
        // Open top result when none highlighted
        e.preventDefault();
        navigate(results[0].path);
      }
    } else if (e.key === 'Escape') {
      setActiveIndex(-1);
      setShowRecent(false);
      setQ('');
    }
  };

  // Global shortcuts: '/' or Ctrl/Cmd+K focuses the search input
  useEffect(() => {
    const handler = (e) => {
      const isSlash = e.key === '/';
      const isK = (e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey);
      const target = e.target;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((isSlash || isK) && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Refresh recent searches only when dropdown becomes visible
  useEffect(() => {
    if (!showRecent) return;
    try {
      const arr = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      setRecent(Array.isArray(arr) ? arr : []);
    } catch {
      setRecent([]);
    }
  }, [showRecent]);

  const clearRecent = () => {
    try { localStorage.removeItem('recentSearches'); } catch {}
    setRecent([]);
    setShowRecent(false);
  };

  const expanded = (debouncedQ.trim().length > 0 && (results.length > 0 || suggestions.length > 0)) || (showRecent && debouncedQ.trim().length === 0);

  return (
    <section aria-labelledby="search-title" className="min-h-screen bg-transparent text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 id="search-title" className="text-4xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Search Our Site
          </h1>
          <p className="text-lg text-white/80">Find the information you need, quickly and easily.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full border transition ${category === c ? 'bg-green-500 text-black border-green-400' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative mb-8">
          <label htmlFor="site-search" className="sr-only">Search the site</label>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-white/70" />
          </div>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            role="combobox"
            aria-expanded={expanded}
            aria-controls="search-listbox"
            aria-activedescendant={activeIndex >= 0 && results[activeIndex] ? `search-option-${activeIndex}` : undefined}
            aria-autocomplete="list"
            className="w-full bg-white/30 backdrop-blur-md border-2 border-white/20 rounded-full pr-12 pl-12 py-4 text-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            placeholder="e.g. Privacy, Careers, Smart Cash"
            value={q}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 150)}
            onChange={(e) => { setQ(e.target.value); setActiveIndex(-1); }}
            onKeyDown={onKeyDown}
            autoFocus
          />
          {!!q && (
            <button
              type="button"
              onClick={() => { setQ(''); setActiveIndex(-1); inputRef.current?.focus(); }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/80 hover:text-white"
              aria-label="Clear search"
            >
              <FaTimesCircle />
            </button>
          )}
        </div>

        <div role="region" aria-live="polite" aria-label="Search results" className="transition-all duration-300">
          {debouncedQ.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-white/80">No results found</h2>
              <p className="text-white/60 mt-2">Try a different search term.</p>
              {suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-white/70 mb-2">Did you mean:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((s) => (
                      <button
                        key={s.path}
                        type="button"
                        onClick={() => setQ(s.label)}
                        className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {debouncedQ.trim() && results.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white/80">
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </h2>
              <ul id="search-listbox" role="listbox" className="space-y-4">
                {results.map((r, idx) => (
                  <li
                    id={`search-option-${idx}`}
                    role="option"
                    aria-selected={activeIndex === idx}
                    key={r.path}
                    className={`bg-white/30 backdrop-blur-md rounded-lg shadow-lg border transition-all duration-300 transform ${activeIndex === idx ? 'border-green-400 shadow-green-300/40 -translate-y-1' : 'border-white/20 hover:border-white/40 hover:-translate-y-1 hover:shadow-white/30'}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <Link to={r.path} className="block p-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-black">{r.category}</span>
                        <h3 className="text-xl font-semibold text-green-300">
                          {highlightText(r.label, terms)}
                        </h3>
                      </div>
                      <p className="text-white/80 mt-2">{highlightText(r.description, terms)}</p>
                      <div className="text-sm text-white/60 mt-3">{highlightText(r.path, terms)}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!debouncedQ.trim() && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-white/80">Start typing to search</h2>
              <p className="text-white/60 mt-2">Results will appear here as you type.</p>
            </div>
          )}

          {/* Recent searches dropdown */}
          {showRecent && !debouncedQ.trim() && recent.length > 0 && (
            <div className="max-w-4xl mx-auto mt-2">
              <div className="bg-white/20 backdrop-blur-md rounded-lg border border-white/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white/80 font-medium">Recent searches</h3>
                  <button onClick={clearRecent} className="text-sm text-white/70 hover:text-white">Clear all</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map((item, i) => (
                    <button
                      key={`${item}-${i}`}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setQ(item)}
                      className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}