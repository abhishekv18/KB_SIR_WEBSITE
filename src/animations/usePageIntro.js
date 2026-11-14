import { gsap, SplitText, useGSAP } from './gsap'

/**
 * Inner-page entrance, matching the homepage hero: media settles, the h1 rises
 * line by line through masks, then [data-intro] elements fade up in order.
 * Mark the hero media with [data-intro-media]. Skipped under reduced motion.
 */
export function usePageIntro(scope, deps = []) {
  useGSAP(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const h1 = root.querySelector('h1')
      const split = h1 ? SplitText.create(h1, { type: 'lines', mask: 'lines', linesClass: 'split-line' }) : null
      const tl = gsap.timeline({ delay: window.__kbLoaderDone ? 0.15 : 0.6, defaults: { ease: 'expo.out' } })
      if (root.querySelector('[data-intro-media]')) tl.from(root.querySelectorAll('[data-intro-media]'), { autoAlpha: 0, scale: 1.06, duration: 1.5, stagger: 0.12, ease: 'power3.out' }, 0)
      if (split) tl.from(split.lines, { yPercent: 105, duration: 1.1, stagger: 0.08 }, 0.15)
      if (root.querySelector('[data-intro]')) tl.from(root.querySelectorAll('[data-intro]'), { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, 0.45)
      return () => split?.revert()
    })
  }, { scope, dependencies: deps, revertOnUpdate: true })
}
