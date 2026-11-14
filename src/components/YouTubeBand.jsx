import { Play } from 'lucide-react'
import VideoFrame from './VideoFrame'
import { Accent, SocialIcon } from './ui'
import { home } from '../content/site'

/**
 * Slate YouTube band shared by the inner pages: the featured lesson beside a short playlist of
 * Kunal's real Shorts and a subscribe button. `flip` puts the video on the left.
 */
export default function YouTubeBand({ id = 'yt-title', label = 'On YouTube', title = 'Lessons from *the channel*', text, flip = false }) {
  const v = home.video
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-[clamp(3rem,5.5vw,5rem)] text-white" aria-labelledby={id}>
      <div aria-hidden className={`pointer-events-none absolute -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.14),transparent)] ${flip ? '-right-40' : '-left-40'}`} />
      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
          <p className="label" data-reveal="up">{label}</p>
          <h2 id={id} className="display-lg mt-4" data-split><Accent text={title} /></h2>
          <p className="mt-4 max-w-[44ch] text-[0.95rem] leading-relaxed text-white/70" data-reveal="up">{text || v.text}</p>
          <ol className="mt-7 border-t border-white/10" data-stagger>
            {v.shorts.map((sh, i) => (
              <li key={sh.id} className="border-b border-white/10">
                <a href={`https://www.youtube.com/shorts/${sh.id}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-3.5">
                  <span className="w-6 text-[0.72rem] font-semibold tabular-nums text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[0.92rem] font-medium text-white/90 transition-colors duration-300 group-hover:text-gold">{sh.title}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-navy" aria-hidden><Play size={12} strokeWidth={2} className="ml-0.5 fill-current" /></span>
                  <span className="sr-only"> (YouTube Short, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
          <a href={v.channelUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[0.88rem] font-medium text-navy transition-transform duration-500 hover:-translate-y-0.5" data-reveal="up">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0000] text-white" aria-hidden><SocialIcon id="youtube" size={14} /></span>
            Subscribe on YouTube<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <div className="overflow-hidden rounded-[18px] shadow-[0_50px_90px_-50px_rgb(0_0_0/.8)] ring-1 ring-white/10" data-reveal="grow">
            <VideoFrame url={v.url} thumbnail={v.thumbnail} meta={v.meta} caption={v.caption} position="50% 32%" title={v.caption} />
          </div>
        </div>
      </div>
    </section>
  )
}
