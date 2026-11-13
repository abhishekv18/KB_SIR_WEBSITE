import { useRef } from 'react'
import Img from './Img'
import { Accent, Breadcrumbs } from './ui'
import { gsap, SplitText, useGSAP } from '../animations/gsap'

/**
 * Inner-page hero. Variants:
 *  photo     — full-bleed photograph, navy grade, copy bottom-left (reference hero language)
 *  split     — navy field, copy left, rounded photo right with an optional floating card
 *  editorial — light ivory, oversized title, optional aside
 * Plays a short entrance: image settles, title lines rise, then copy.
 */
export default function PageHero({ variant = 'photo', title, text, image, crumbs, children, aside, floating, position, imageTone = 'dark' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ delay: 0.55, defaults: { ease: 'expo.out' } })
      const split = SplitText.create(ref.current.querySelector('h1'), { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      tl.from('[data-hero-media]', { scale: 1.08, autoAlpha: 0, duration: 1.6, ease: 'power3.out' }, 0)
        .from(split.lines, { yPercent: 105, duration: 1.1, stagger: 0.09 }, 0.25)
        .from('[data-hero-fade]', { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.6)
      return () => split.revert()
    })
  }, { scope: ref })

  if (variant === 'editorial') {
    return (
      <section ref={ref} className="wash pb-14 pt-32 lg:pb-20 lg:pt-44">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {crumbs && <div data-hero-fade><Breadcrumbs items={crumbs} dark={false} /></div>}
            <h1 className="display-xl mt-6"><Accent text={title} /></h1>
            {text && <p className="lede mt-6 max-w-[52ch]" data-hero-fade>{text}</p>}
            {children && <div className="mt-8" data-hero-fade>{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5" data-hero-fade>{aside}</div>}
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section ref={ref} className="on-dark relative overflow-hidden bg-navy pb-16 pt-32 text-white lg:pb-24 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.18),transparent)]" />
        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            {crumbs && <div data-hero-fade><Breadcrumbs items={crumbs} /></div>}
            <h1 className="display-xl mt-6"><Accent text={title} /></h1>
            {text && <p className="lede mt-6 max-w-[46ch]" data-hero-fade>{text}</p>}
            {children && <div className="mt-9" data-hero-fade>{children}</div>}
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div data-hero-media className="overflow-hidden rounded-[16px]">
              <Img id={image} priority tone="dark" ratio="4 / 5" position={position} sizes="(min-width:1024px) 40vw, 100vw" />
            </div>
            {floating && (
              <div data-hero-fade className="absolute -bottom-6 left-4 right-4 rounded-[var(--radius-card)] bg-ivory p-5 text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/.5)] sm:left-auto sm:right-[-1.5rem] sm:w-72 lg:-left-16 lg:right-auto">
                {floating}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // photo
  return (
    <section ref={ref} className="on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden bg-navy-950 pb-14 pt-36 text-white lg:min-h-[82svh] lg:pb-20">
      <div data-hero-media className="absolute inset-0 -z-10" aria-hidden>
        <Img id={image} priority tone={imageTone} ratio="auto" className="h-full w-full" position={position} sizes="100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(21_28_38/.92)_0%,rgb(36_48_63/.7)_38%,rgb(36_48_63/.18)_70%),linear-gradient(0deg,rgb(14_19_26/.85)_0%,transparent_45%)]" />
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {crumbs && <div data-hero-fade><Breadcrumbs items={crumbs} /></div>}
          <h1 className="display-xl mt-6"><Accent text={title} /></h1>
          {text && <p className="lede mt-6 max-w-[50ch]" data-hero-fade>{text}</p>}
          {children && <div className="mt-9" data-hero-fade>{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4" data-hero-fade>{aside}</div>}
      </div>
    </section>
  )
}
