import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Mail } from 'lucide-react'
import { site } from '../content/site'
import { SocialIcon } from '../components/ui'
import { gsap, SplitText, useGSAP } from '../animations/gsap'

/** Reference footer: links + email row, oversized name that bleeds off the right edge, legal row. */
export default function Footer() {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create('[data-wordmark] span', { type: 'chars' })
      gsap.from(split.chars, {
        yPercent: 90, autoAlpha: 0, duration: 1.2, stagger: 0.035, ease: 'expo.out',
        scrollTrigger: { trigger: '[data-wordmark]', start: 'top 95%', once: true },
      })
      return () => split.revert()
    })
  }, { scope: ref })

  const year = new Date().getFullYear()
  return (
    <footer ref={ref} className="overflow-hidden border-t border-line bg-white pt-12 text-navy lg:pt-14">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.9375rem]">
              {site.footerNav.map((n) => (<li key={n.to}><Link to={n.to} className="link-line inline-block whitespace-nowrap py-1.5 text-navy/75 transition-colors hover:text-navy">{n.label}</Link></li>))}
            </ul>
          </nav>
          <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 self-start rounded-full bg-mist py-1.5 pl-1.5 pr-5 text-[0.9375rem] transition-colors hover:bg-navy hover:text-ivory lg:self-auto">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy"><Mail size={16} strokeWidth={1.6} /></span>
            {site.email}
            <ArrowUpRight size={16} strokeWidth={1.7} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark — centred inside the page margins so the left and right gaps are equal */}
      <div className="shell">
        <div data-wordmark aria-hidden className="mt-10 select-none whitespace-nowrap pb-[0.14em] text-center font-display font-medium leading-[0.82] tracking-[-0.05em] text-navy text-[clamp(3rem,14.2vw,12rem)] max-sm:-mx-2.5 max-sm:text-[15.3vw] max-sm:tracking-[-0.065em]">
          <span>Kunal </span>
          <span className="[mask-image:linear-gradient(90deg,#000_0%,rgb(0_0_0/.55)_45%,rgb(0_0_0/.22)_100%)]">Bhardwaj</span>
        </div>
      </div>

      <div className="shell">
        <div className="mt-6 flex flex-col items-center gap-5 border-t border-line py-7 text-[0.8125rem] text-ink-muted md:flex-row md:justify-between">
          <p className="flex flex-col items-center gap-1 sm:flex-row sm:gap-5"><span>© {year} Kunal Bhardwaj · {site.tagline}</span><span className="inline-block py-1.5">Privacy policy</span></p>
          <div className="flex gap-2.5">
            {site.socials.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid h-10 w-10 place-items-center rounded-full bg-navy text-ivory transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy"><SocialIcon id={s.id} size={15} /></a>
            ))}
          </div>
          <p className="flex gap-5"><span className="py-1.5">Terms &amp; conditions</span><span className="py-1.5">All rights reserved</span></p>
        </div>
      </div>
    </footer>
  )
}
