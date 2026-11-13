import { gsap, ScrollTrigger, SplitText, useGSAP, ease } from './gsap'

/**
 * Declarative scroll reveals for everything inside `scope`.
 * Mark elements in JSX; start states are applied here (JS only), so content
 * is fully visible without JavaScript and under prefers-reduced-motion.
 *
 *   data-split            heading revealed line by line through masks
 *   data-reveal="up"      fade + rise
 *   data-reveal="clip"    rounded image reveal from the bottom, inner image settles from 1.12
 *   data-reveal="scale"   frame grows from 0.92 (banners)
 *   data-reveal="grow"    wide frame scales up from 0.84 and its corners relax (video band)
 *   data-stagger          direct children rise in sequence
 *   data-parallax="8"     yPercent drift while scrolling (desktop only)
 */
export function useScrollReveals(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' },
        (ctx) => {
          if (!ctx.conditions.motion) return
          const q = (s) => Array.from(root.querySelectorAll(s))
          const splits = []

          q('[data-split]').forEach((el) => {
            const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
              onSplit: (self) => gsap.from(self.lines, {
                yPercent: 105, duration: 1.05, stagger: 0.09, ease: ease.out,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
            })
            splits.push(split)
          })

          q('[data-reveal="up"]').forEach((el) => {
            gsap.from(el, { y: 32, autoAlpha: 0, duration: 0.95, ease: ease.soft, delay: Number(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
          })

          q('[data-reveal="clip"]').forEach((el) => {
            const inner = el.querySelector('img, [data-inner]')
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true }, delay: Number(el.dataset.delay || 0) })
            tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' })
            if (inner) tl.from(inner, { scale: 1.12, duration: 1.6, ease: ease.out }, 0)
          })

          q('[data-reveal="scale"]').forEach((el) => {
            gsap.fromTo(el, { scale: 0.92 }, { scale: 1, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: 0.6 } })
          })

          // wide media that opens up as it scrolls into place (video band)
          q('[data-reveal="grow"]').forEach((el) => {
            gsap.fromTo(el, { scale: 0.84, borderRadius: 56 }, { scale: 1, borderRadius: 28, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: 0.8 } })
          })

          q('[data-stagger]').forEach((el) => {
            gsap.from(el.children, { y: 28, autoAlpha: 0, duration: 0.85, stagger: 0.08, ease: ease.soft,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
          })

          if (ctx.conditions.desktop) {
            q('[data-parallax]').forEach((el) => {
              const amt = Number(el.dataset.parallax || 8)
              gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none',
                scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
            })
          }

          // layout may have shifted after fonts load
          document.fonts?.ready.then(() => ScrollTrigger.refresh())
          return () => splits.forEach((s) => s.revert())
        },
      )
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  )
}
