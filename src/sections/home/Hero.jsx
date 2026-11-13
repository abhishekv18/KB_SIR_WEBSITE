import { useRef } from 'react'
import { home, site } from '../../content/site'
import { Accent, Pill, IconCircle } from '../../components/ui'
import { iconMap } from '../../components/icons'
import { gsap, useGSAP } from '../../animations/gsap'
import { loaderHolding } from '../../layouts/Preloader'

/**
 * Home hero — reference composition: full-bleed photograph of Kunal at his desk (from the
 * current kunalbharadwaj.com), headline on the left, CTA with a short line beside it, and a
 * four-item fact bar along the bottom. Opening: photo settles → headline lines → CTA → facts.
 * Full version once per session, short after; any wheel / key / touch skips to the end.
 */
export default function Hero() {
  const ref = useRef(null)
  const { hero } = home

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(pointer: fine) and (min-width: 1024px)' }, (ctx) => {
      if (!ctx.conditions.motion) return
      const seen = sessionStorage.getItem('kb-intro') === '1'
      sessionStorage.setItem('kb-intro', '1')
      const k = seen ? 0.5 : 1

      // on a first visit the preloader is still up: hold the intro until it lifts
      let holding = loaderHolding && !window.__kbLoaderDone
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: seen ? 0.35 : 0.1, paused: holding })
      const release = () => { window.__kbLoaderDone = true; holding = false; tl.delay(0); tl.play(0) }
      if (holding) window.addEventListener('kb:loader-done', release, { once: true })
      tl.from('[data-photo]', { scale: 1.1, autoAlpha: 0, duration: 1.8 * k, ease: 'power2.out' }, 0)
        .from('[data-grade]', { autoAlpha: 0, duration: 1.2 * k }, 0.2 * k)
        .from(document.querySelector('[data-site-header]'), { yPercent: -100, autoAlpha: 0, duration: 0.9 }, 0.7 * k)
        .from('[data-hero-eyebrow]', { autoAlpha: 0, y: 12, duration: 0.7 }, 0.8 * k)
        .from('[data-hero-line] > span', { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'expo.out' }, 0.9 * k)
        .from('[data-hero-fade]', { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.12 }, 1.35 * k)
        .fromTo('[data-hero-rule]', { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'power2.inOut' }, 1.45 * k)
        .from('[data-strip]', { autoAlpha: 0, y: 30, duration: 0.9 }, 1.5 * k)
        .from('[data-strip-item]', { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 }, 1.65 * k)

      const skip = () => !holding && tl.progress() < 1 && tl.timeScale(6)
      const opts = { once: true, passive: true }
      window.addEventListener('wheel', skip, opts)
      window.addEventListener('keydown', skip, { once: true })
      window.addEventListener('touchstart', skip, opts)

      // scrolling away: photo drifts slower than the page, copy lifts
      gsap.to('[data-media]', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-copy]', { yPercent: -14, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: '70% top', scrub: true } })

      // desktop: a slight depth shift with the pointer
      let onMove
      const el = ref.current
      if (ctx.conditions.fine) {
        const px = gsap.quickTo('[data-photo]', 'x', { duration: 1.4, ease: 'power3.out' })
        const py = gsap.quickTo('[data-photo]', 'y', { duration: 1.4, ease: 'power3.out' })
        onMove = (e) => { px((e.clientX / window.innerWidth - 0.5) * -14); py((e.clientY / window.innerHeight - 0.5) * -8) }
        el.addEventListener('pointermove', onMove)
      }

      return () => {
        window.removeEventListener('wheel', skip)
        window.removeEventListener('kb:loader-done', release)
        window.removeEventListener('keydown', skip)
        window.removeEventListener('touchstart', skip)
        if (onMove) el?.removeEventListener('pointermove', onMove)
        gsap.set(document.querySelector('[data-site-header]'), { clearProps: 'transform,opacity,visibility' })
      }
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white" aria-label="Introduction">
      {/* photograph — Kunal at his desk */}
      <div data-media className="absolute inset-0 -z-10 max-lg:bottom-auto max-lg:h-[80%] max-sm:h-[132vw] max-lg:[mask-image:linear-gradient(180deg,#000_62%,transparent_100%)]" aria-hidden>
        <picture>
          <source media="(max-width: 1023px)" srcSet="/assets/portraits/kb-studio-tall-640.webp 640w, /assets/portraits/kb-studio-tall-820.webp 820w" sizes="100vw" />
          <img
            data-photo
            src="/assets/portraits/kb-studio-1600.webp"
            srcSet="/assets/portraits/kb-studio-1024.webp 1024w, /assets/portraits/kb-studio-1600.webp 1600w"
            sizes="100vw"
            alt=""
            width="1600"
            height="900"
            fetchPriority="high"
            className="absolute inset-[-2%] h-[104%] w-[104%] max-w-none object-cover object-[50%_0%] [filter:brightness(.95)_contrast(1.04)] lg:object-[74%_32%]"
          />
        </picture>
        {/* grade: deep slate from the left (old-site treatment), dark crown and floor for the nav and fact bar */}
        <div
          data-grade
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.9)_0%,rgb(21_28_38/.55)_28%,rgb(21_28_38/.05)_55%,rgb(21_28_38/.1)_85%,rgb(21_28_38/.6)_100%)] lg:bg-[linear-gradient(100deg,rgb(21_28_38/.97)_0%,rgb(21_28_38/.9)_30%,rgb(21_28_38/.55)_48%,rgb(21_28_38/.12)_64%,transparent_76%),linear-gradient(180deg,rgb(21_28_38/.65)_0%,transparent_22%),linear-gradient(0deg,rgb(21_28_38/.95)_0%,rgb(21_28_38/.55)_16%,transparent_34%),radial-gradient(60%_70%_at_95%_10%,rgb(21_28_38/.45),transparent_70%)]"
        />
      </div>

      {/* copy */}
      <div data-hero-copy className="shell relative flex flex-1 flex-col justify-end pb-0 pt-28 max-sm:pt-[80vw] lg:block lg:pb-0 lg:pt-[clamp(9rem,22.5vh,12.75rem)]">
        <div className="max-w-[36rem]">
          <p data-hero-eyebrow className="mb-4 inline-flex lg:mb-5 items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/75">
            <span className="h-[2px] w-8 bg-gold" aria-hidden />
            {site.role}
          </p>
          <h1 className="text-[clamp(2.15rem,4.3vw,3.35rem)] font-semibold leading-[1.1] tracking-[-0.02em] [&_em]:not-italic [&_em]:text-gold">
            {hero.titleLines.map((l, i) => (
              <span key={i} data-hero-line className="split-line"><span className="block"><Accent text={l} /></span></span>
            ))}
          </h1>
          <div className="mt-5 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:gap-6 lg:mt-7">
            <div data-hero-fade><Pill to={site.cta.to} variant="light" size="sm">{site.cta.label}</Pill></div>
            <span data-hero-rule aria-hidden className="hidden h-9 w-px origin-top bg-white/25 sm:block" />
            <p data-hero-fade className="max-w-[30ch] text-[0.85rem] leading-relaxed text-white/70">{hero.text}</p>
          </div>
        </div>
      </div>

      {/* soft frosted floor behind the fact bar (reference): blur fades out upward */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[13rem] backdrop-blur-[7px] [mask-image:linear-gradient(0deg,#000_40%,transparent)] max-lg:hidden" />
      {/* fact bar — facts, not statistics */}
      <div className="shell relative mt-8 pb-7 lg:mt-0 lg:pb-8">
        <ul data-strip className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/12 pt-5 sm:grid-cols-4 sm:gap-x-3 lg:gap-0 lg:border-0 lg:py-8">
          {hero.strip.map((s, i) => {
            const Icon = iconMap[s.icon]
            return (
              <li key={s.title} data-strip-item className={`flex items-center gap-2.5 lg:gap-4 ${i > 0 ? 'lg:pl-8' : ''}`}>
                <IconCircle Icon={Icon} dark size="sm" />
                <div>
                  <p className="text-[0.8rem] font-semibold leading-tight lg:text-[0.95rem]">{s.title}</p>
                  <p className="mt-0.5 text-[0.74rem] text-white/60 lg:text-[0.78rem]">{s.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
