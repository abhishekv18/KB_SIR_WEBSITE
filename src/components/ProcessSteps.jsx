import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Img from './Img'
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsap'

/**
 * Coaching process — reference accordion (steps list + large image) with the approved
 * gold progress line. Desktop: the active step follows scroll position (no pin, no hijack)
 * and the line fills; any step can also be opened by click/keyboard. Mobile: accordion
 * with the image inside the open step.
 */
export default function ProcessSteps({ steps, numbered = true, tall = false, compact = false }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const userPicked = useRef(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-line-fill]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', end: 'bottom 55%', scrub: 0.5,
          onUpdate: (self) => {
            if (userPicked.current) return
            const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))
            setActive(i)
          } },
      })
    })
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-line-fill]', { scaleY: 1 })
    })
    return () => ScrollTrigger.refresh()
  }, { scope: ref })

  const pick = (i) => { userPicked.current = true; setActive(i) }

  return (
    <div ref={ref} className={`grid gap-10 lg:grid-cols-12 lg:gap-14 ${tall ? 'lg:min-h-[120vh]' : ''}`}>
      <div className={`relative ${compact ? 'lg:col-span-7' : 'lg:col-span-6'}`}>
        {/* gold progress line */}
        <div className="absolute bottom-3 left-[1.15rem] top-3 hidden w-px bg-navy/12 lg:block" aria-hidden>
          <div data-line-fill className="absolute inset-0 origin-top bg-gold" />
        </div>
        <ol className="space-y-3 lg:pl-12">
          {steps.map((s, i) => {
            const open = i === active
            return (
              <li key={s.title} className="relative">
                <span className={`absolute -left-12 top-5 hidden h-[0.6rem] w-[0.6rem] translate-x-[0.85rem] rounded-full border transition-colors duration-500 lg:block ${i <= active ? 'border-gold bg-gold' : 'border-navy/25 bg-ivory'}`} aria-hidden />
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`step-${i}`}
                    onClick={() => pick(i)}
                    className={`flex w-full items-center gap-4 rounded-[18px] px-5 py-[1.1rem] text-left transition-[background-color,color,border-radius] duration-500 ${open ? 'rounded-b-none bg-navy text-ivory' : 'bg-ivory/70 ring-1 ring-line hover:bg-mist'}`}
                  >
                    {numbered && <span className={`text-[0.8rem] font-medium tabular-nums ${open ? 'text-gold' : 'text-gold-ink'}`}>{String(i + 1).padStart(2, '0')}</span>}
                    <span className="flex-1 text-[1rem] font-medium tracking-[-0.01em]">{s.title}</span>
                    <span className={`grid h-9 w-9 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ${open ? 'rotate-90 bg-white text-navy' : 'border border-navy/20'}`} aria-hidden><ArrowRight size={16} strokeWidth={1.6} /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`step-${i}`}
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.32 } }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-b-[18px] bg-navy px-5 pb-6 pt-1 text-[0.95rem] text-white/72">
                        <p className="leading-relaxed">{s.text}</p>
                        {s.gives && <p className="mt-3 text-sm text-gold">You get: {s.gives}</p>}
                        <Img id={s.image} tone="dark" className="mt-5 rounded-[var(--radius-img)] lg:hidden" sizes="90vw" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ol>
      </div>
      <div className={`hidden lg:block ${compact ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
        <div className="sticky top-28 overflow-hidden rounded-[16px]" data-reveal="clip">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={active} initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.06 }} animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }} exit={{ opacity: 0.6, transition: { duration: 0.9 } }}>
              <Img id={steps[active].image} sizes="(min-width:1024px) 40vw, 90vw" ratio={compact ? '4 / 3' : '4 / 3.3'} className="rounded-[16px]" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[0.8rem] font-medium text-navy backdrop-blur-md">
            Step {String(active + 1).padStart(2, '0')} · {steps[active].title}
          </span>
        </div>
      </div>
    </div>
  )
}
