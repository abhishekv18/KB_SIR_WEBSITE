import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Play, X } from 'lucide-react'
import { SocialIcon } from './ui'
import { lockScroll } from '../layouts/smoothScroll'

/**
 * Row of YouTube Shorts (vertical cards) + a channel card. Each Short opens in a
 * 9:16 player overlay (youtube-nocookie, loaded on click). Thumbnails come from YouTube.
 */
export default function ShortsRow({ shorts, channelUrl }) {
  const [active, setActive] = useState(null)
  const lastBtn = useRef(null)

  useEffect(() => {
    if (!active) return
    const trigger = lastBtn.current
    lockScroll(true)
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => { lockScroll(false); window.removeEventListener('keydown', onKey); trigger?.focus() }
  }, [active])

  return (
    <>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0" data-stagger>
        {shorts.map((s) => (
          <li key={s.id} className="w-[62%] max-w-[15rem] shrink-0 snap-start sm:w-[42vw] sm:max-w-[13rem] lg:w-auto lg:max-w-none">
            <button
              type="button"
              onClick={(e) => { lastBtn.current = e.currentTarget; setActive(s) }}
              aria-label={`Play short: ${s.title}`}
              className="group relative block aspect-[9/14] w-full overflow-hidden rounded-[14px] bg-navy text-left"
            >
              <img src={`https://i.ytimg.com/vi/${s.id}/oardefault.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
              <span className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.92)_0%,rgb(21_28_38/.15)_55%,transparent)]" aria-hidden />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-navy">Short</span>
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-gold group-hover:text-navy" aria-hidden>
                <Play size={15} strokeWidth={1.8} className="ml-0.5 fill-current" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-[0.88rem] font-medium leading-snug text-white">{s.title}</span>
            </button>
          </li>
        ))}
        <li className="w-[62%] max-w-[15rem] shrink-0 snap-start sm:w-[42vw] sm:max-w-[13rem] lg:w-auto lg:max-w-none">
          <a href={channelUrl} target="_blank" rel="noreferrer" className="group flex aspect-[9/14] h-full w-full flex-col justify-between rounded-[14px] bg-white p-4 ring-1 ring-line transition-colors duration-500 hover:bg-navy hover:text-ivory">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FF0000] text-white" aria-hidden><SocialIcon id="youtube" size={18} /></span>
            <span>
              <span className="block text-[1.05rem] font-semibold leading-snug">More on the YouTube channel</span>
              <span className="mt-1 block text-[0.82rem] text-ink-muted transition-colors group-hover:text-white/70">Branding and business lessons<span className="sr-only"> (opens in a new tab)</span></span>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-[0.8rem] font-medium text-ivory transition-colors group-hover:bg-gold group-hover:text-navy">Visit channel ↗</span>
            </span>
          </a>
        </li>
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/92 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }} onClick={() => setActive(null)}>
            <motion.div className="relative aspect-[9/16] h-[min(86svh,760px)] max-w-full overflow-hidden rounded-[16px] bg-black"
              initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} exit={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1`} title={active.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            </motion.div>
            <button autoFocus type="button" onClick={() => setActive(null)} aria-label="Close video" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-navy"><X size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
