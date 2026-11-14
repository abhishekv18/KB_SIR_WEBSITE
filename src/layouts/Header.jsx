import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Mail } from 'lucide-react'
import { site } from '../content/site'
import { Pill, SocialIcon } from '../components/ui'
import { lockScroll } from './smoothScroll'

const LIGHT_HERO = [/^\/insights/, /^\/privacy/, /^\/terms/, /^\/services/, /^\/about/, /^\/methodology/]
export const isLightHero = (path) => LIGHT_HERO.some((r) => r.test(path))

const spring = { type: 'spring', stiffness: 420, damping: 36, mass: 0.7 }

/**
 * Reference-style navigation.
 * Over a dark hero: transparent bar — logo left, links centred in a frosted capsule, light CTA pill right.
 * After scrolling: the whole bar condenses into a floating white capsule with a soft shadow.
 * A pill highlight slides between links on hover and rests on the active page.
 */
export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const hidden = false // header no longer hides on scroll
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const last = useRef(0)
  const menuBtn = useRef(null)
  const lightHero = isLightHero(pathname)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // the bar stays in place while scrolling (owner request); it only hides behind the open menu
      last.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setHover(null) }, [pathname])
  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const activeIndex = site.nav.findIndex((n) => (n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)))
  const marker = hover ?? (activeIndex >= 0 ? activeIndex : null)

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] ${hidden && !open ? '-translate-y-[130%]' : 'translate-y-0'}`}
      >
        {/* reference style: one dark frosted-glass bar, inset from the edges, on every page */}
        <div className="mx-auto max-w-[1320px] px-3 pt-3 sm:px-5 sm:pt-4">
          <div
            className={`relative flex h-[4.1rem] items-center gap-6 rounded-full border pl-5 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-700 ease-[var(--ease-out-expo)] sm:pl-7 ${
              scrolled || lightHero
                ? 'border-white/10 bg-[rgb(21_28_38/.82)] shadow-[0_20px_50px_-24px_rgb(21_28_38/.6)]'
                : 'border-white/[0.09] bg-[rgb(21_28_38/.38)] shadow-[inset_0_1px_0_rgb(255_255_255/.06)]'
            }`}
          >
            <Link to="/" className="shrink-0" aria-label="Kunal Bhardwaj — home">
              <img src="/assets/brand/kb-signature-white.png" alt="Kunal Bhardwaj" width="500" height="200" className="h-auto w-[7.4rem] lg:w-[8rem]" />
            </Link>

            <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <ul onMouseLeave={() => setHover(null)} className="flex items-center gap-1 font-[family-name:var(--font-nav)] text-[0.92rem]">
                {site.nav.map((item, i) => (
                  <li key={item.to} className="relative">
                    {marker === i && (
                      <motion.span layoutId="nav-marker" transition={spring} className="absolute inset-0 rounded-full bg-white/[0.08]" aria-hidden />
                    )}
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      className={({ isActive }) => `relative block whitespace-nowrap rounded-full px-4 py-2 transition-colors duration-300 ${isActive ? 'font-medium text-white' : 'text-white/70 hover:text-white'}`}
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && <span className="absolute bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-gold" aria-hidden />}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              to={site.cta.to}
              className="ml-auto hidden items-center rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-[0.88rem] font-medium text-white transition-[background-color,color,border-color] duration-300 hover:border-white hover:bg-white hover:text-navy lg:inline-flex"
            >
              {site.cta.label}
            </Link>

            <button
              ref={menuBtn}
              type="button"
              className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <Menu size={19} strokeWidth={1.7} />
            </button>

          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-[#FAF7F1] bg-[radial-gradient(90%_55%_at_100%_0%,rgb(210_171_116/.14),transparent_70%)] text-navy"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.6rem) 2.6rem)', transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)', transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          >
            <div className="shell flex h-[4.75rem] items-center">
              <img src="/assets/brand/kb-signature-colour.png" alt="" width="500" height="200" className="h-auto w-[8.25rem]" />
              <button autoFocus type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-navy text-ivory">
                <X size={19} strokeWidth={1.7} />
              </button>
            </div>
            <nav aria-label="Mobile" className="shell mt-6 flex-1 overflow-y-auto">
              <ul className="divide-y divide-navy/10 border-y border-navy/10">
                {[...site.nav, { label: 'Contact', to: '/contact' }].map((item, i) => (
                  <motion.li key={item.to} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}>
                    <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `flex items-center justify-between py-3.5 font-[family-name:var(--font-nav)] text-[1.9rem] font-medium leading-tight ${isActive ? 'text-gold-ink' : 'text-navy'}`}>
                      {item.label}
                      <span className="text-sm tracking-normal text-gold-ink/60">{String(i + 1).padStart(2, '0')}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div className="shell space-y-6 pb-10 pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }}>
              <Pill to={site.cta.to} variant="gold" className="w-full justify-between">{site.cta.label}</Pill>
              <div className="flex items-center justify-between gap-4 text-sm text-navy/70">
                <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-2 py-2"><Mail size={16} strokeWidth={1.5} className="shrink-0" /> <span className="truncate">{site.email}</span></a>
                <div className="flex gap-3">
                  {site.socials.map((s) => (<a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white/70 text-navy"><SocialIcon id={s.id} size={16} /></a>))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
