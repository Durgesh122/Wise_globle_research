import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import YouTubeEmbed from '../components/YouTubeEmbed';
import AccessibleMedia from '../components/AccessibleMedia';

// Minimal YouTube ID extractor (keeps iframe hidden until valid)
function extractYouTubeId(input = '') {
  if (!input) return '';
  // If only an ID is passed
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    const v = url.searchParams.get('v');
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    const shortId = url.hostname.includes('youtu.be') ? url.pathname.slice(1) : '';
    if (shortId && /^[a-zA-Z0-9_-]{11}$/.test(shortId)) return shortId;
    const parts = url.pathname.split('/');
    const embedIndex = parts.indexOf('embed');
    if (embedIndex !== -1 && parts[embedIndex + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[embedIndex + 1])) {
      return parts[embedIndex + 1];
    }
  } catch {
    // ignore parse errors
  }
  return '';
}

export default function Media() {
  const [ytUrl, setYtUrl] = useState('https://www.youtube.com/watch?v=ERN3abYzriw');
  const ytId = useMemo(() => extractYouTubeId(ytUrl), [ytUrl]);
  const isValidYt = ytUrl ? Boolean(ytId) : true; // empty allowed, else must be valid
  return (
    <section className="space-y-6">
      <Helmet>
        <title>Media & Educational Videos - Wise Global Research</title>
        <meta name="description" content="Educational videos and accessible media from Wise Global Research. Video embeds, captions, and transcripts for financial literacy." />
        <link rel="canonical" href="https://wiseglobalresearch.com/media" />
      </Helmet>
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Education: Video / Audio</h1>
        <p className="text-white/80 text-sm md:text-base">
          This page is for educational purposes only. It is not investment advice. Please consult a registered
          adviser before making any investment decision. For SEBI compliance, no performance/return claims are made.
        </p>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 space-y-3">
        <h2 className="text-lg font-semibold">YouTube (privacy‑enhanced) embed</h2>
        <p id="yt-help" className="text-sm text-white/80">
          Paste your YouTube link below. We use youtube-nocookie.com. You can turn on CC (captions) from the YouTube player.
        </p>
        <label htmlFor="yt-url" className="sr-only">YouTube video URL</label>
        <div className="flex gap-2 items-center">
          <input
            id="yt-url"
            type="url"
            className="flex-1 rounded-md bg-white/10 border border-white/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            placeholder="https://www.youtube.com/watch?v=..."
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
            aria-describedby={isValidYt ? 'yt-help' : 'yt-help yt-error'}
            aria-invalid={!isValidYt}
            inputMode="url"
            required
          />
        </div>
        {!isValidYt && ytUrl ? (
          <p id="yt-error" role="alert" aria-live="polite" className="text-sm text-red-300">
            Please enter a valid YouTube URL.
          </p>
        ) : null}
        {isValidYt && ytUrl ? (
          <YouTubeEmbed url={ytUrl} title="Education: Topic Introduction" />
        ) : null}
      </section>

      {/* Demonstration of accessible media wrapper with placeholders for captions/transcript/ISL */}
      <AccessibleMedia
        type="video"
        title="Sample training clip (placeholder)"
        description="Demo component showing where captions, transcript and ISL interpretation would appear."
        poster={undefined}
        downloads={[
          { label: 'MP4 720p', href: '#', size: '50 MB' },
          { label: 'MP3 128 kbps', href: '#', size: '10 MB' },
        ]}
        chapters={[
          { time: '00:00', label: 'Intro' },
          { time: '01:30', label: 'Key concept' },
          { time: '03:45', label: 'Summary' },
        ]}
      />

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 space-y-2">
        <h2 className="text-lg font-semibold">Accessibility guidelines</h2>
        <ul className="list-disc ml-5 text-sm space-y-1">
          <li>Provide captions for all videos (YouTube CC or your own .vtt captions).</li>
          <li>Provide a transcript where possible. Briefly describe key visual content.</li>
          <li>Offer Indian Sign Language (ISL) interpretation where required.</li>
          <li>Avoid rapid flashing/flicker; playback must be operable by keyboard (play/pause).</li>
          <li>For feedback, see the <a className="underline" href="/accessibility-feedback">Accessibility Feedback</a> page.</li>
        </ul>
      </section>
    </section>
  );
}
