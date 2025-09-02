import React from 'react';

// Accessible media placeholder for future Video/Audio with Captions, Transcript and ISL
// Contract:
// - type: 'video' | 'audio'
// - title: string (visible caption)
// - description?: string (short context)
// - src?: string (media URL when available)
// - captionsSrc?: string (WebVTT captions file when available)
// - transcript?: React.ReactNode (transcript content)
// - islSrc?: string (separate ISL interpretation video URL)
// - poster?: string (video poster image)
export default function AccessibleMedia({
  type = 'video',
  title = 'Media placeholder',
  description,
  src,
  captionsSrc,
  transcript,
  islSrc,
  poster,
}) {
  return (
    <section aria-labelledby="media-title" className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
      <h3 id="media-title" className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-white/80 mb-3">{description}</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <figure>
          {type === 'video' ? (
            <video
              controls
              className="w-full rounded-lg"
              aria-describedby="media-caption"
              poster={poster}
            >
              {src ? <source src={src} /> : null}
              {captionsSrc ? (
                <track kind="captions" srcLang="en" src={captionsSrc} label="English captions" default />
              ) : (
                <track kind="captions" src="" label="Captions (placeholder)" />
              )}
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio controls className="w-full" aria-describedby="media-caption">
              {src ? <source src={src} /> : null}
              Your browser does not support the audio element.
            </audio>
          )}
          <figcaption id="media-caption" className="mt-2 text-xs text-white/70">
            Captions and transcript will be provided for all media. ISL interpretation is provided alongside when applicable.
          </figcaption>
        </figure>

        <div className="space-y-3">
          <details className="rounded-md bg-white/10 p-3">
            <summary className="cursor-pointer font-medium">Transcript (placeholder)</summary>
            <div className="mt-2 text-sm text-white/85">
              {transcript || (
                <p>
                  A detailed, time-aligned transcript of the media will appear here, including speaker
                  labels, descriptions of important visuals, and links to referenced resources.
                </p>
              )}
            </div>
          </details>

          <div className="rounded-md bg-white/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">ISL Interpretation (placeholder)</h4>
              <span className="text-[11px] text-white/60">Optional</span>
            </div>
            {islSrc ? (
              <video controls className="w-full rounded-md">
                <source src={islSrc} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-sm text-white/80">
                When available, a separate video with Indian Sign Language interpretation will be provided here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
