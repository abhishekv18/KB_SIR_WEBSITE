import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { home, site } from '../../content/site'
import { services } from '../../content/services'
import { posts } from '../../content/posts'
import { testimonials } from '../../content/testimonials'
import Img from '../../components/Img'
import ServiceCard from '../../components/ServiceCard'
import ProcessSteps from '../../components/ProcessSteps'
import VideoFrame from '../../components/VideoFrame'
import ShortsRow from '../../components/ShortsRow'
import ArticleCard from '../../components/ArticleCard'
import { TestimonialSlider } from '../../components/Testimonials'
import { Accent, DemoTag, IconCircle, Pill, SectionHeading, SocialIcon } from '../../components/ui'
import { iconMap } from '../../components/icons'
import { gsap, useGSAP } from '../../animations/gsap'

/* ---------------- 2 · Partners and clients (reference: pale band, centred title, logos on white tiles, two marquee rows) ---------------- */
function LogoTiles({ logos, hidden }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {logos.map((l, i) => (
        <li key={i} className="grid h-[4.75rem] w-[12.5rem] place-items-center rounded-[14px] bg-white shadow-[0_1px_0_rgb(36_48_63/.05),0_12px_30px_-22px_rgb(36_48_63/.35)] ring-1 ring-line transition-transform duration-500 hover:-translate-y-1">
          <img src={l.colour || l.src} alt={hidden ? '' : l.alt} style={{ height: Math.round(l.h * 0.72) }} className="w-auto max-w-[9.5rem] object-contain" loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  )
}

export function Trust() {
  const { trust } = home
  const row = [...trust.logos, ...trust.logos]
  const row2 = [...trust.logos.slice(2), ...trust.logos.slice(0, 2), ...trust.logos.slice(2), ...trust.logos.slice(0, 2)]
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-mist)_0%,#FFFFFF_100%)] py-[clamp(2.5rem,4vw,3.5rem)]" aria-labelledby="trust-title">
      <div className="shell text-center">
        <p className="label justify-center" data-reveal="up">{trust.eyebrow}</p>
        <h2 id="trust-title" className="display-md mt-3" data-split><Accent text={trust.label} /></h2>
      </div>
      <div className="group mt-9 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex">
          <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <LogoTiles logos={row} /><LogoTiles logos={row} hidden />
          </div>
        </div>
        <div className="flex">
          <div className="flex animate-[marquee-rev_46s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <LogoTiles logos={row2} hidden /><LogoTiles logos={row2} hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 3 · About (reference: copy left; wide photo right with overlapping card + floating note) ---------------- */
export function About() {
  const { about } = home
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="shell grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">{about.label}</p><DemoTag>Demo bio</DemoTag></div>
          <h2 id="about-title" className="display-lg mt-5" data-split><Accent text={about.title} /></h2>
          {about.text.map((t, i) => <p key={i} className="body-muted mt-5 text-[0.98rem] leading-relaxed" data-reveal="up">{t}</p>)}
          <div className="mt-9 flex flex-wrap items-center gap-5" data-reveal="up">
            <Pill to="/about" variant="navy">Read my story</Pill>
            <Link to="/contact" className="link-line inline-block py-2 text-[0.95rem] font-medium">Book a call</Link>
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:pl-6">
          {/* floating note (reference: small dot + line of text above the image) */}
          <div className="mb-5 ml-auto flex max-w-[17rem] items-start gap-3 text-[0.82rem] leading-snug text-ink-muted" data-reveal="up" data-delay="0.2">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
            {about.note}
          </div>
          <div className="relative ml-auto max-w-[36rem] sm:pl-10">
            {/* thin gold frame offset behind the photo */}
            <span aria-hidden className="absolute -right-3 -top-3 bottom-6 left-7 rounded-[28px] border border-gold/45 sm:left-14" />
            <div className="relative overflow-hidden rounded-[24px] shadow-[0_50px_90px_-55px_rgb(21_28_38/.75)]" data-reveal="clip">
              <div data-parallax="4" className="scale-[1.08]">
                <Img id="R7" ratio="4 / 4.2" position="45% 20%" sizes="(min-width:1024px) 40vw, 100vw" />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.35),transparent_40%)]" />
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.75rem] font-medium text-navy backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />Kunal Bhardwaj · On stage
              </span>
            </div>
            <div className="relative -mt-12 mr-auto w-[90%] max-w-[21rem] rounded-[16px] bg-white p-3 shadow-[0_40px_70px_-35px_rgb(36_48_63/.6)] ring-1 ring-line sm:absolute sm:-bottom-10 sm:left-0 sm:mt-0 lg:-left-10" data-reveal="up" data-delay="0.4">
              <div className="flex items-center gap-4">
                <Img id="R3" ratio="1 / 1" className="w-24 shrink-0 rounded-[12px]" position="58% 30%" sizes="96px" />
                <div className="pr-2">
                  <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-gold-ink"><span className="h-px w-4 bg-gold" />My approach</span>
                  <p className="mt-1 font-display text-[1.05rem] font-medium leading-tight">{about.card.title}</p>
                  <p className="mt-1 text-[0.8rem] leading-snug text-ink-muted">{about.card.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 4 · Business challenges ---------------- */
export function Challenges() {
  const c = home.challenges
  return (
    <section className="section pt-0 lg:pt-4" aria-labelledby="challenges-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* phones/tablets: copy first, photo after the cards, so it never sits right under the About photo */}
          <div className="relative order-last lg:order-none lg:col-span-5">
            <div className="overflow-hidden rounded-[16px]" data-reveal="clip">
              <div data-parallax="5" className="scale-[1.1]">
                <Img id="R8" ratio="auto" className="aspect-[4/3.4] sm:aspect-[16/10] lg:aspect-[4/4.8]" position="50% 30%" sizes="(min-width:1024px) 38vw, 100vw" />
              </div>
            </div>
            <div className="on-dark relative -mt-12 ml-auto mr-3 w-[72%] rounded-[12px] bg-navy px-4 py-3.5 text-white shadow-[0_30px_50px_-30px_rgb(21_28_38/.8)] sm:absolute sm:-bottom-6 sm:-right-6 sm:m-0 sm:w-56 sm:rounded-[14px] sm:p-[1.1rem]" data-reveal="up" data-delay="0.3">
              <p className="font-display text-[0.95rem] font-semibold sm:text-[1.04rem]">{c.card.title}</p>
              <p className="mt-1 text-[0.76rem] leading-relaxed text-white/70 sm:mt-1.5 sm:text-[0.8rem]">{c.card.text}</p>
              <Link to="/methodology" className="mt-2 inline-flex items-center gap-1.5 py-1 text-[0.76rem] font-medium text-gold sm:mt-2.5 sm:text-[0.8rem]">See the process <ArrowUpRight size={13} strokeWidth={1.8} /></Link>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="label" data-reveal="up">{c.label}</p>
            <h2 id="challenges-title" className="display-lg mt-5" data-split><Accent text={c.title} /></h2>
            <p className="lede mt-5 max-w-[54ch]" data-reveal="up">{c.intro}</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4" data-stagger>
              {c.items.map((it, i) => {
                const Icon = iconMap[it.icon]
                return (
                  <li key={it.title} className="group relative flex flex-col overflow-hidden rounded-[14px] bg-white p-4 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_30px_50px_-36px_rgb(36_48_63/.5)] sm:p-6">
                    <span aria-hidden className="absolute inset-x-4 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-6" />
                    <div className="flex items-start justify-between">
                      <span className="origin-top-left scale-[0.85] sm:scale-100"><IconCircle Icon={Icon} /></span>
                      <span className="text-[0.74rem] font-semibold tabular-nums tracking-[0.12em] text-gold-ink/70">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[0.98rem] font-semibold leading-snug sm:mt-5 sm:text-[1.2rem] sm:font-medium">{it.title}</h3>
                    <p className="body-muted mt-1.5 text-[0.8rem] leading-relaxed sm:mt-2 sm:text-[0.92rem]">{it.text}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 5 · Services (reference: four cards in a row, first active; active card widens) ---------------- */
export function Services() {
  const s = home.servicesIntro
  const [active, setActive] = useState(0)
  return (
    <section className="section overflow-hidden" aria-labelledby="services-title">
      <div className="shell">
        <SectionHeading id="services-title" label={s.label} title={s.title} text={s.text} />
        <div
          className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] py-3 [scroll-padding-inline:clamp(1.25rem,4vw,3.5rem)] lg:mx-0 lg:overflow-visible lg:px-0"
          role="region"
          aria-label="Coaching services"
          tabIndex={0}
          data-stagger
        >
          {services.map((svc, i) => <ServiceCard key={svc.slug} service={svc} flex tint={i} active={i === active} onActivate={() => setActive(i)} />)}
        </div>
        <div className="mt-12 flex justify-center" data-reveal="up">
          <Pill to={site.cta.to} variant="navy">{site.cta.label}</Pill>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 5b · Stats band (old-site counters, restyled: photo under slate, thin numerals, tracked labels) ---------------- */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  useGSAP(() => {
    const el = ref.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const o = { n: 0 }
      gsap.to(o, { n: value, duration: 2.2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.n) },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
  }, { scope: ref })
  return <><span ref={ref}>{value}</span><span className="text-gold">{suffix}</span></>
}

export function Stats() {
  const st = home.stats
  return (
    <section className="section-tight !pt-0" aria-label="Results in numbers">
      <div className="shell">
        <div className="on-dark relative isolate overflow-hidden rounded-[18px] bg-navy text-white">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-[-8%]" data-parallax="6"><Img id={st.image} ratio="auto" className="h-full w-full" tone="dark" sizes="100vw" alt="" /></div>
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(21_28_38/.92)_0%,rgb(36_48_63/.82)_55%,rgb(36_48_63/.7)_100%)]" />
          </div>
          <ul className="grid grid-cols-2 gap-y-10 px-6 py-12 sm:px-10 lg:grid-cols-4 lg:py-16" data-stagger>
            {st.items.map((it, i) => (
              <li key={it.label} className={`text-center ${i > 0 ? 'lg:border-l lg:border-white/12' : ''}`}>
                <p className="text-[clamp(2.8rem,5.4vw,4.6rem)] font-extralight leading-none tracking-[-0.03em] tabular-nums"><Counter value={it.value} suffix={it.suffix} /></p>
                <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/75 sm:tracking-[0.3em]">{it.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 6 · How it works (reference: heading + Learn more; step accordion left, matching photo right) ---------------- */
export function Method() {
  const m = home.methodIntro
  return (
    <section className="wash section" aria-labelledby="method-title">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">{m.label}</p><DemoTag>Demo copy</DemoTag></div>
            <h2 id="method-title" className="display-lg mt-5" data-split><Accent text={m.title} /></h2>
            <p className="body-muted mt-3 max-w-[48ch] text-[0.95rem]" data-reveal="up">{m.lead} {m.text}</p>
          </div>
          <div className="shrink-0" data-reveal="up"><Pill to="/methodology" variant="navy" size="sm">Learn more</Pill></div>
        </div>
        <div className="mt-10"><ProcessSteps steps={m.steps} compact /></div>
      </div>
    </section>
  )
}

/* ---------------- 7 · Video (Kunal's YouTube: main video plays in place + Shorts row) ---------------- */
export function Video() {
  const v = home.video
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(55%_60%_at_15%_0%,rgb(207_234_240/.55),transparent_70%),radial-gradient(45%_50%_at_95%_35%,rgb(242_235_222/.7),transparent_70%),linear-gradient(180deg,#F3F8FA_0%,#FAF8F4_55%,#FFFFFF_100%)] pb-[clamp(3.5rem,6vw,5.5rem)]" aria-labelledby="video-title">
      <div className="shell relative pt-[clamp(3rem,5vw,4.5rem)]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label" data-reveal="up">{v.label}</p>
            <h2 id="video-title" className="display-lg mt-4" data-split><Accent text={v.title} /></h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal="up">
            <p className="lede">{v.text}</p>
            <a href={v.channelUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[0.92rem] font-medium shadow-[0_10px_30px_-18px_rgb(36_48_63/.5)] transition-colors hover:bg-navy hover:text-ivory">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FF0000] text-white" aria-hidden><SocialIcon id="youtube" size={16} /></span>
              Subscribe on YouTube<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="-mx-2 mt-8 overflow-hidden rounded-[16px] shadow-[0_50px_90px_-55px_rgb(21_28_38/.85)] sm:mx-auto sm:mt-10 sm:max-w-[1080px] sm:rounded-[18px]" data-reveal="grow">
          <VideoFrame url={v.url} thumbnail={v.thumbnail} meta={v.meta} caption={v.caption} position="50% 32%" title={v.caption} />
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <h3 className="text-[1.15rem] font-semibold">Short takes <span className="font-normal text-ink-muted">· one idea in under a minute</span></h3>
        </div>
        <div className="mt-6"><ShortsRow shorts={v.shorts} channelUrl={v.channelUrl} /></div>
      </div>
    </section>
  )
}

/* ---------------- 8 · Insights (reference: three equal blog cards) ---------------- */
export function Insights() {
  const i = home.insightsIntro
  return (
    <section className="section pt-0" aria-labelledby="insights-title">
      <div className="shell">
        <SectionHeading id="insights-title" align="center" label={i.label} title={i.title} text={i.text} />
        <ul className="mt-10 grid gap-x-6 gap-y-9 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {posts.slice(0, 3).map((p) => <li key={p.slug}><ArticleCard post={p} /></li>)}
        </ul>
        <div className="mt-10 flex justify-center" data-reveal="up"><Pill to="/insights" variant="navy">See all articles</Pill></div>
      </div>
    </section>
  )
}

/* ---------------- 9 · Testimonials ---------------- */
export function Testimonials() {
  const t = home.testimonialsIntro
  return (
    <section className="sage section overflow-hidden" aria-labelledby="testimonials-title">
      <div className="shell">
        <SectionHeading id="testimonials-title" align="center" label={t.label} title={t.title} text={t.text} />
        {testimonials.some((x) => x.status === 'demo') && (
          <div className="mt-4 flex justify-center" data-reveal="up"><DemoTag always>Sample quotes · real testimonials coming soon</DemoTag></div>
        )}
      </div>
      <div className="mt-10"><TestimonialSlider items={testimonials} /></div>
    </section>
  )
}
