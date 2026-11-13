import { useState } from 'react'
import { Play } from 'lucide-react'
import Img from './Img'

/** Extract a YouTube video ID from any common URL form. */
export function youtubeId(url) {
  if (!url) return null
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : null
}

/**
 * Video frame — replaceable `thumbnail` (image ID) and `url` (YouTube).
 * Pressing play swaps the poster for the YouTube player in place (privacy-enhanced
 * youtube-nocookie.com, loaded only on click). With no URL the frame says "Video coming soon".
 */
export default function VideoFrame({ url, thumbnail = 'G10', caption, meta, title = 'Featured video', position }) {
  const [playing, setPlaying] = useState(false)
  const id = youtubeId(url)

  if (playing && id) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[inherit] bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-[inherit]">
      <Img id={thumbnail} ratio="auto" className="aspect-[4/4.2] sm:aspect-video" tone="dark" position={position} sizes="(min-width:1024px) 80vw, 100vw" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.88)_0%,rgb(21_28_38/.25)_45%,rgb(21_28_38/.15)_100%)]" />

      {id ? (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="absolute inset-0 grid place-items-center">
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white text-navy shadow-[0_20px_50px_-15px_rgb(0_0_0/.6)] transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-gold sm:h-24 sm:w-24">
            <span className="absolute inset-0 rounded-full border border-white/70 motion-safe:animate-[ring_2.4s_ease-out_infinite]" aria-hidden />
            <span className="absolute inset-0 rounded-full border border-white/50 motion-safe:animate-[ring_2.4s_ease-out_1.2s_infinite]" aria-hidden />
            <Play size={28} strokeWidth={1.6} className="relative ml-1 fill-current" />
          </span>
        </button>
      ) : (
        <span className="absolute inset-0 grid place-items-center" aria-hidden>
          <span className="grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-white/10 text-white/85 backdrop-blur-md sm:h-24 sm:w-24"><Play size={24} strokeWidth={1.5} className="ml-1" /></span>
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="max-w-2xl">
          {meta && <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">{meta}</p>}
          <p className="text-lg font-semibold leading-snug sm:text-2xl">{caption}</p>
          {!id && <p className="mt-1 text-sm text-white/70">Video coming soon</p>}
        </div>
        {id && <p className="shrink-0 text-[0.8rem] text-white/70 max-sm:hidden">Plays here · via YouTube</p>}
      </div>
    </div>
  )
}
