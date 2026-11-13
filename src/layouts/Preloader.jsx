import { useEffect, useState } from 'react'

/**
 * Preloader — shown on every full page load or refresh (skipped under reduced motion).
 * First visit in a session plays the full version; later loads a shorter one.
 * Slate screen → Kunal's signature is written in from left to right → a gold hairline
 * fills as the page actually loads (fonts + window load, hard cap 3.2s) → the panel lifts
 * away with the signature still on it (never an empty slate moment), revealing the page.
 *
 * Built on CSS transitions + timers (not an exit animation) so it can never get stuck on
 * screen — e.g. if the tab is in the background while it finishes. Hero listens for
 * 'kb:loader-done' or reads window.__kbLoaderDone.
 */

const KEY = 'kb-loaded'
const FIRST_MIN_MS = 1400
const REPEAT_MIN_MS = 900
const MAX_MS = 3200
const LIFT_MS = 800

const shouldShow = () => {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

/** Read once at startup so the hero knows to wait. */
export const loaderHolding = shouldShow()

const announceDone = () => {
  if (window.__kbLoaderDone) return
  window.__kbLoaderDone = true
  document.documentElement.style.overflow = ''
  window.dispatchEvent(new Event('kb:loader-done'))
}

export default function Preloader() {
  // 'in' → signature writes in · 'leaving' → content fades, panel lifts · 'gone' → unmounted
  const [phase, setPhase] = useState(loaderHolding ? 'start' : 'gone')
  const [progress, setProgress] = useState(0.08)

  useEffect(() => {
    // the static cover from index.html has done its job once React has painted
    document.getElementById('boot')?.remove()
    if (!loaderHolding) return
    const start = performance.now()
    let repeat = false
    try { repeat = sessionStorage.getItem(KEY) === '1' } catch { /* ignore */ }
    const MIN_MS = repeat ? REPEAT_MIN_MS : FIRST_MIN_MS
    const timers = []
    let pageReady = false
    let finished = false

    document.documentElement.style.overflow = 'hidden'
    timers.push(setTimeout(() => setPhase('in'), 30)) // let the first frame paint, then start the write-in

    const finish = () => {
      if (finished) return
      finished = true
      clearInterval(tick)
      setProgress(1)
      try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
      // start the page's own intro the moment the panel begins to lift, so the area it
      // reveals is already coming to life (no dark gap between loader and hero)
      timers.push(setTimeout(() => { setPhase('leaving'); announceDone() }, 220))
      timers.push(setTimeout(() => { setPhase('gone'); announceDone() }, 220 + LIFT_MS + 40))
    }

    // progress eases toward 90% while loading and completes once the page is ready
    const tick = setInterval(() => {
      const t = performance.now() - start
      setProgress((p) => (pageReady && t >= MIN_MS ? 1 : Math.min(0.9, p + (0.9 - p) * 0.08)))
      if ((pageReady && t >= MIN_MS + 300) || t >= MAX_MS) finish()
    }, 60)

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true })),
    ]).then(() => { pageReady = true })

    // absolute safety net: whatever happens, never leave the screen covered
    timers.push(setTimeout(() => { finish() }, MAX_MS + 500))
    timers.push(setTimeout(() => { setPhase('gone'); announceDone() }, MAX_MS + 2500))

    return () => {
      clearInterval(tick)
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (phase === 'gone') return null
  const writing = phase !== 'start'
  const leaving = phase === 'leaving'

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[90] grid place-items-center bg-navy-950 transition-transform duration-[800ms] ease-[cubic-bezier(.76,0,.24,1)] ${leaving ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* faint warm glow, like the gold-lit office in the photography */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_55%,rgb(210_171_116/.10),transparent_70%)]" />

      <div className={`relative flex flex-col items-center transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.76,0,.24,1)] ${leaving ? 'translate-y-10 opacity-60' : 'translate-y-0 opacity-100'}`}>
        {/* signature written in left → right */}
        <img
          src="/assets/brand/kb-signature-white.png"
          alt=""
          width="500"
          height="200"
          className="h-auto w-[min(15rem,60vw)] opacity-95 transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.45,0,.2,1)]"
          style={{ clipPath: writing ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        />

        {/* load progress — a single gold hairline */}
        <div className="relative mt-7 h-px w-40 overflow-hidden bg-white/12" aria-hidden>
          <span className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300 ease-out" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <p className={`mt-5 text-[0.62rem] font-medium uppercase tracking-[0.42em] text-white/50 transition-opacity delay-500 duration-700 ${writing ? 'opacity-100' : 'opacity-0'}`}>
          Minding Business
        </p>
      </div>
    </div>
  )
}
