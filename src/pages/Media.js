import React, { useState } from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function Media() {
  const [ytUrl, setYtUrl] = useState('https://www.youtube.com/watch?v=ERN3abYzriw');
  return (
    <section className="space-y-6">
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
            aria-describedby="yt-help"
            inputMode="url"
          />
        </div>
        <YouTubeEmbed url={ytUrl} title="Education: Topic Introduction" />
      </section>

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
