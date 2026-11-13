import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType, useNavigate } from 'react-router'
import { ScrollTrigger } from '../animations/gsap'
import { getLenis } from './smoothScroll'

/**
 * One place for all scroll behaviour (mounted once in RootLayout; renders nothing).
 *
 *  - Full refresh            → top of the page (browser + ScrollTrigger scroll memory disabled).
 *  - New route (PUSH/REPLACE)→ top of the new page, or its #hash target if the link has one.
 *  - Back / Forward (POP)    → the position the visitor left that entry at (saved per history key).
 *  - Same-page #anchor links → smooth scroll to the section, offset for the fixed header.
 *  - After every settle      → Lenis is resized and ScrollTrigger refreshed, so reveals start correctly.
 * Works with or without Lenis (Lenis is off on touch devices and under reduced motion).
 */

const STORE = 'kb-scroll-positions'
const HEADER_OFFSET = 96 // fixed glass navbar (≈4.1rem + top gap) plus breathing room
const SETTLE_MS = 700 // page-transition panel has cleared and the new page is laid out

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const readPositions = () => {
  try { return JSON.parse(sessionStorage.getItem(STORE)) || {} } catch { return {} }
}
const writePositions = (p) => {
  try { sessionStorage.setItem(STORE, JSON.stringify(p)) } catch { /* private mode: keep in memory only */ }
}

/** Jump (no animation) — used for route changes and restoration, so there is never a visible slide. */
export function jumpTo(y) {
  const lenis = getLenis()
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(y, { immediate: true, force: true })
  } else {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' })
  }
}

/** Smooth scroll to an element, leaving room for the fixed header; focuses it for keyboard users. */
export function scrollToElement(el, { smooth = true } = {}) {
  if (!el) return
  const lenis = getLenis()
  const animate = smooth && !reduceMotion()
  // Reveal animations and late images can shift the layout while we travel, so re-measure on
  // arrival and settle exactly below the header (a short, barely visible glide at most).
  const settle = () => {
    const drift = el.getBoundingClientRect().top - HEADER_OFFSET
    if (Math.abs(drift) <= 4) return
    if (lenis) lenis.scrollTo(window.scrollY + drift, { duration: 0.45, force: true })
    else window.scrollTo({ top: window.scrollY + drift, behavior: animate ? 'smooth' : 'instant' })
  }
  if (lenis) {
    lenis.resize() // make sure the scroll limit reflects the fully rendered page
    lenis.scrollTo(el, { offset: -HEADER_OFFSET, immediate: !animate, duration: 1.1, force: true, onComplete: settle })
    if (!animate) setTimeout(settle, 60)
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: animate ? 'smooth' : 'instant' })
    setTimeout(settle, animate ? 900 : 50)
  }
  // move keyboard focus without a second scroll (form-error links, skip link, section anchors)
  const focusable = el.matches('a,button,input,select,textarea,[tabindex]')
  if (!focusable) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

const findHashTarget = (hash) => {
  if (!hash || hash === '#') return null
  try { return document.getElementById(decodeURIComponent(hash.slice(1))) } catch { return null }
}

/** Poll briefly (timer-based, so it also works in background tabs) for something the lazy page renders. */
function whenReady(check, done, { timeout = 2500, every = 30 } = {}) {
  const start = performance.now()
  let timer = 0
  const step = () => {
    const result = check()
    if (result || performance.now() - start > timeout) return done(result)
    timer = setTimeout(step, every)
  }
  step()
  return () => clearTimeout(timer)
}

function refreshScrollDependents() {
  getLenis()?.resize()
  ScrollTrigger.refresh()
}

export default function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const navigate = useNavigate()
  const positions = useRef(null)
  const previous = useRef(null) // { pathname, key } of the last settled location
  const activeKey = useRef(null) // only the current entry may write its position
  if (positions.current === null) positions.current = typeof window === 'undefined' ? {} : readPositions()

  // 1 · take over from the browser and from ScrollTrigger's own scroll memory
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    ScrollTrigger.clearScrollMemory('manual')

    // a full refresh always starts at the top of the page
    const nav = performance.getEntriesByType?.('navigation')?.[0]
    if (nav?.type === 'reload') {
      positions.current = {}
      writePositions({})
    }

    // first-load reveals: refresh once fonts and images have settled the layout
    const onLoad = () => refreshScrollDependents()
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // 2 · remember where the visitor is on the current history entry (throttled to one write per frame)
  useEffect(() => {
    const key = location.key
    let raf = 0
    const save = () => {
      raf = 0
      if (activeKey.current !== key) return // a late scroll event from the page we just left
      positions.current[key] = Math.round(window.scrollY)
      writePositions(positions.current)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(save) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', save)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', save)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [location.key])

  // 3 · decide where each location should start
  useLayoutEffect(() => {
    // A repeat run for the same history entry (React StrictMode re-runs effects in development)
    // must make the same decision as the first run, so remember what we compared against.
    const rerun = previous.current?.key === location.key
    const prev = rerun ? previous.current.before : previous.current
    // snapshot where the visitor left the previous entry before anything moves
    if (!rerun && prev && prev.key !== location.key) {
      positions.current[prev.key] = Math.round(window.scrollY)
      writePositions(positions.current)
    }
    previous.current = { pathname: location.pathname, key: location.key, before: prev && { pathname: prev.pathname, key: prev.key } }
    activeKey.current = location.key
    const samePage = !!prev && prev.pathname === location.pathname
    const isFirstLoad = !prev
    const isReload = isFirstLoad && performance.getEntriesByType?.('navigation')?.[0]?.type === 'reload'
    const cancels = []

    if (samePage) {
      // in-page hash change (anchor link, or Back/Forward between anchors)
      if (navType === 'POP' && positions.current[location.key] != null) jumpTo(positions.current[location.key])
      else if (location.hash) scrollToElement(findHashTarget(location.hash))
      else jumpTo(0)
      return
    }

    if (navType === 'POP' && !isFirstLoad) {
      // Back / Forward: restore once the page is tall enough to scroll there
      const y = positions.current[location.key] ?? 0
      jumpTo(0)
      cancels.push(whenReady(
        () => document.documentElement.scrollHeight - window.innerHeight >= y - 2,
        () => jumpTo(y),
      ))
    } else if (location.hash && !isReload) {
      // link (or first visit) to a section on another page: wait for it to render, then jump
      jumpTo(0)
      cancels.push(whenReady(() => findHashTarget(location.hash), (el) => el && scrollToElement(el, { smooth: false })))
    } else {
      // new page, or a full refresh: start at the top
      jumpTo(0)
    }

    // the transition panel has cleared and lazy content is in — recalculate scroll-driven animations
    const t = setTimeout(refreshScrollDependents, isFirstLoad ? 0 : SETTLE_MS)
    return () => { clearTimeout(t); cancels.forEach((c) => c()) }
  }, [location.key, location.pathname, location.hash, navType])

  // 4 · same-page anchor links (<a href="#section">) scroll smoothly instead of jumping
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || a.target === '_blank') return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      const el = findHashTarget(url.hash)
      if (!el) return
      e.preventDefault()
      if (url.hash === window.location.hash) scrollToElement(el) // same hash again: just scroll
      else navigate({ hash: url.hash }) // records history (Back returns), effect 3 scrolls smoothly
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return null
}
