import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollManager from './ScrollManager'
import Preloader from './Preloader'
import { site } from '../content/site'
import { startSmoothScroll, stopSmoothScroll } from './smoothScroll'

const panelEase = [0.65, 0, 0.35, 1]

/** Destination name shown in the transition panel. */
const pageLabel = (path) => {
  if (path === '/') return 'Home'
  const match = [...site.footerNav].filter((n) => n.to !== '/' && path.startsWith(n.to)).sort((a, b) => b.to.length - a.to.length)[0]
  return match ? match.label : 'Minding Business'
}

export default function RootLayout() {
  const { pathname } = useLocation()
  const first = useRef(true)
  const mainRef = useRef(null)

  useEffect(() => { startSmoothScroll(); return () => stopSmoothScroll() }, [])

  // scroll position, anchors and ScrollTrigger refresh are handled by <ScrollManager />.
  // Here: after a route change, move keyboard focus to the new page once the transition clears.
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    const t = setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 650)
    return () => clearTimeout(t)
  }, [pathname])

  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <ScrollManager />
      <Preloader />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[100svh] bg-navy" />}>
          <motion.div key={pathname} initial={first.current || reduce ? false : { opacity: 0 }} animate={{ opacity: 1, transition: { duration: reduce ? 0.15 : 0.4, delay: reduce ? 0 : 0.45 } }}>
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Page transition: slate panel rises, the signature is written in above a gold hairline and the
          destination's name, then the panel lifts away. */}
      {/* only on a real page change — never on the initial load or a refresh */}
      {!reduce && !first.current && (
        <AnimatePresence>
          <motion.div
            key={`panel-${pathname}`}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-navy-950"
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '0%', '-100%'], transition: { duration: 1.15, times: [0, 0.4, 0.62, 1], ease: panelEase } }}
          >
            <span className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_55%,rgb(210_171_116/.10),transparent_70%)]" />
            {(
              <div className="relative flex flex-col items-center">
                <motion.img
                  src="/assets/brand/kb-signature-white.png"
                  alt=""
                  width="500"
                  height="200"
                  className="h-auto w-36 opacity-95"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.55, delay: 0.32, ease: [0.45, 0, 0.2, 1] } }}
                />
                <motion.span
                  className="mt-5 block h-px w-24 origin-left bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, transition: { duration: 0.5, delay: 0.42, ease: panelEase } }}
                />
                <motion.span
                  className="mt-4 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-white/55"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5 } }}
                >
                  {pageLabel(pathname)}
                </motion.span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
