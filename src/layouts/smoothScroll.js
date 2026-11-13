import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'

/** Lenis ↔ GSAP ScrollTrigger sync. Desktop pointer devices only; off under reduced motion. */
let lenis = null
let tick = null
let bodyObserver = null
let resizeTimer = 0

export function startSmoothScroll() {
  if (lenis) return lenis
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (reduce || coarse) return null

  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  // Lazy pages, images and fonts change the page height after Lenis measured it. Keep its scroll
  // limit (and ScrollTrigger's start/end points) in step with the real document height.
  bodyObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => { lenis?.resize(); ScrollTrigger.refresh() }, 120)
  })
  bodyObserver.observe(document.body)
  if (import.meta.env.DEV && window.__kbMotion) window.__kbMotion.lenis = lenis
  return lenis
}

export function stopSmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  bodyObserver?.disconnect()
  bodyObserver = null
  clearTimeout(resizeTimer)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

export function lockScroll(locked) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
