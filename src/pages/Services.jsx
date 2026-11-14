import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDownRight, Check, MapPin, Play } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { Accent, Breadcrumbs, DemoTag, Pill, SocialIcon } from '../components/ui'
import { services } from '../content/services'
import { home, site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * Services page. Same vocabulary as the homepage and the About page: light hero, labels and display
 * headings, pill buttons, the homepage's pastel service-card tints, white cards with a gold top line,
 * and only photographs the homepage uses (the four service photos and the four step photos).
 */

const TINTS = ['bg-cream', 'bg-mist', 'bg-sage', 'bg-ivory-deep'] // the homepage service-card tints

const ROTATE_MS = 4500 // time each format's photograph stays in the hero

/* 1 · hero: copy and the format list left; one framed photograph right that follows the format you point at */
function ServicesHero() {
  const intro = home.servicesIntro
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [still, setStill] = useState(false)
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  // the photograph moves on to the next format every few seconds; pointing at the list or photo pauses it,
  // and choosing a format restarts the timer from there
  useEffect(() => {
    if (paused || still) return
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), ROTATE_MS)
    return () => clearTimeout(t)
  }, [active, paused, still])
  const cur = services[active]
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="services-hero">
      <div aria-hidden className="pointer-events-none absolute -left-48 -top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.15),transparent)]" />
      <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6 lg:pr-4">
          <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} dark={false} /></div>
          <p className="hero-eyebrow lg:mt-6" data-intro>
            <span className="h-[2px] w-8 bg-gold" aria-hidden />{intro.label}
          </p>
          <h1 id="services-hero" className="mt-4 hero-title">
            <Accent text={intro.title} />
          </h1>
          <p className="lede mt-4 max-w-[46ch]" data-intro>{intro.heroText || intro.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
            <Pill size="sm" to={site.cta.to} variant="navy">{site.cta.label}</Pill>
            <a href="#finder" className="link-line inline-block py-2 text-[0.9rem] font-medium">Help me choose</a>
          </div>

          {/* the four formats: pointing at one shows its photograph; clicking jumps to it */}
          <ul onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="mt-7 grid grid-cols-1 border-t border-navy/12 sm:grid-cols-2 sm:gap-x-6" data-intro>
            {services.map((s, i) => {
              const on = i === active
              return (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative flex items-center justify-between gap-3 border-b border-navy/10 py-3.5">
                    {/* gold line: fills over the rotation interval, or sits full while paused */}
                    {on && (paused || still
                      ? <span aria-hidden className="absolute -bottom-px left-0 h-px w-full bg-gold" />
                      : <span key={active} aria-hidden className="absolute -bottom-px left-0 h-px bg-gold" style={{ animation: `kb-progress ${ROTATE_MS}ms linear forwards` }} />)}
                    <span className="flex items-baseline gap-2.5">
                      <span className={`text-[0.7rem] font-semibold tabular-nums transition-colors duration-300 ${on ? 'text-gold-ink' : 'text-navy/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`text-[0.9rem] font-semibold transition-colors duration-300 ${on ? 'text-navy' : 'text-navy/60 group-hover:text-navy'}`}>{s.title}</span>
                    </span>
                    <ArrowDownRight size={15} strokeWidth={1.7} className={`shrink-0 transition-[transform,color] duration-500 group-hover:translate-y-0.5 ${on ? 'text-gold-ink' : 'text-navy/30'}`} aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative mx-auto max-w-[31rem] lg:ml-auto lg:mr-0">
            <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/45 sm:block" />
            {/* small floating card, as on About and Insights */}
            <div className="absolute -left-14 top-10 z-10 hidden w-52 rounded-[14px] bg-white p-3.5 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line lg:block" data-intro>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/60 text-gold-ink" aria-hidden><MapPin size={14} strokeWidth={1.7} /></span>
                <p className="whitespace-nowrap text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-gold-ink">Online &amp; in person</p>
              </div>
              <p className="mt-2 font-display text-[0.9rem] font-semibold leading-snug">Sessions that fit how you work</p>
            </div>
            <div className="relative overflow-hidden rounded-[24px] bg-navy shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media>
              <div className="relative aspect-[4/3.4] lg:aspect-[4/3.9]">
                {services.map((s, i) => (
                  <div key={s.slug} aria-hidden={i !== active} className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}>
                    <Img id={s.cardImage} ratio="auto" priority className="h-full w-full" tone="dark" sizes="(min-width:1024px) 29rem, 92vw" />
                  </div>
                ))}
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.75)_0%,rgb(21_28_38/.15)_40%,transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6" aria-live="polite">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">{cur.pill}</p>
                  <p className="mt-1.5 font-display text-[1.25rem] font-semibold leading-tight sm:text-[1.4rem]">{cur.title}</p>
                </div>
                <span className="shrink-0 text-[0.75rem] font-semibold tabular-nums text-white/70">{String(active + 1).padStart(2, '0')} <span className="text-white/35">/ {String(services.length).padStart(2, '0')}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 2 · one tinted panel per service, photo side alternating */
function ServiceRow({ s, i }) {
  const flip = i % 2 === 1
  return (
    <article id={s.slug} className="scroll-mt-28">
      <div className={`grid items-center gap-8 overflow-hidden rounded-[24px] p-3 sm:p-4 md:grid-cols-12 md:gap-8 lg:gap-10 ${TINTS[i % TINTS.length]}`} data-reveal="up">
        <div className={`relative md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
          <div className="overflow-hidden rounded-[16px]">
            <Img id={s.cardImage} ratio="auto" className="aspect-[16/11] md:aspect-[4/4.2] lg:aspect-[4/3.4]" sizes="(min-width:1024px) 36rem, 100vw" />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-medium text-navy/80 backdrop-blur-md">{s.pill}</span>
        </div>
        <div className={`px-3 pb-5 sm:px-5 md:col-span-7 md:px-0 md:pb-0 ${flip ? 'md:order-1 md:pl-6 lg:pl-10' : 'md:pr-6 lg:pr-10'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.78rem] font-semibold tabular-nums tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-gold" aria-hidden />
            {s.status === 'demo' && <DemoTag>Draft description</DemoTag>}
          </div>
          <h2 className="display-md mt-3">{s.title}</h2>
          <p className="body-copy mt-3 max-w-[46ch]">{s.summary}</p>
          <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/55">It suits</p>
          <ul className="mt-3 space-y-2">
            {s.whoFor.map((w) => (
              <li key={w} className="flex items-start gap-3 text-[0.9rem]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-gold-ink" aria-hidden><Check size={12} strokeWidth={2.2} /></span>{w}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Pill to={`/services/${s.slug}`} variant="navy" size="sm">Explore {s.title}</Pill>
            <Link to={site.cta.to} className="link-line py-2 text-[0.88rem] font-medium">Book a consultation</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function ServiceRows() {
  return (
    <section className="section" aria-labelledby="formats-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label" data-reveal="up">Four formats</p>
            <h2 id="formats-title" className="display-lg mt-4" data-split>One goal, <em>four ways</em> to get there</h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">Every format works on the same thing: the decisions and habits that move your business forward.</p>
        </div>
        <div className="mt-10 space-y-4 sm:space-y-5">
          {services.map((s, i) => <ServiceRow key={s.slug} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* 3 · how it starts: the four steps from the original site, as photo cards */
function Process() {
  const m = home.methodIntro
  return (
    <section className="section bg-ivory-deep/55" aria-labelledby="process-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">{m.label}</p><DemoTag>Draft step text</DemoTag></div>
            <h2 id="process-title" className="display-lg mt-4" data-split><Accent text={m.title} /></h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">{m.lead} Whichever format you choose, the work follows the same four steps.</p>
        </div>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4" data-stagger>
          {m.steps.map((st, i) => (
            <li key={st.title} className="group relative flex overflow-hidden rounded-[16px] bg-white shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line sm:block">
              <span aria-hidden className="absolute inset-x-5 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <div className="w-28 shrink-0 overflow-hidden sm:w-auto"><Img id={st.image} ratio="auto" className="h-full sm:aspect-[16/10] sm:h-auto" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" sizes="(min-width:1024px) 17rem, (min-width:640px) 45vw, 100vw" /></div>
              <div className="p-4 sm:p-5">
                <span className="text-[0.72rem] font-semibold tabular-nums tracking-[0.12em] text-gold-ink">Step {String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 card-title">{st.title}</h3>
                <p className="card-text mt-1.5">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 4 · format finder (front end only: nothing stored or sent) */
const questions = [
  { id: 'who', q: 'Who is the coaching for?', options: [['me', 'Just me'], ['leader', 'Me as a senior leader'], ['peers', 'Me, alongside other owners']] },
  { id: 'where', q: 'How do you prefer to meet?', options: [['online', 'Online'], ['person', 'In person'], ['either', 'Either works']] },
  { id: 'why', q: 'What matters most right now?', options: [['decisions', 'Better decisions'], ['team', 'Leading my team'], ['structure', 'Structure and peers']] },
]
function recommend(a) {
  if (a.who === 'peers' || a.why === 'structure') return 'group'
  if (a.who === 'leader' || a.why === 'team') return 'executive'
  if (a.where === 'person') return 'face-to-face'
  return 'one-to-one'
}

function Finder() {
  const [answers, setAnswers] = useState({})
  const done = questions.every((q) => answers[q.id])
  const rec = useMemo(() => services.find((s) => s.slug === recommend(answers)), [answers])
  return (
    <section id="finder" className="section scroll-mt-24" aria-labelledby="fit-title">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <p className="label" data-reveal="up">Not sure where to start?</p>
          <h2 id="fit-title" className="display-lg mt-4" data-split>Which format <em>fits you?</em></h2>
          <p className="body-copy mt-4 max-w-[36ch]" data-reveal="up">Three quick questions for a suggestion. Nothing you choose here is stored or sent.</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-navy/10 rounded-[18px] bg-white px-5 shadow-[0_24px_50px_-40px_rgb(36_48_63/.45)] ring-1 ring-line sm:px-7" data-reveal="up">
            {questions.map((q, qi) => (
              <fieldset key={q.id} className="py-5">
                <legend className="flex items-center gap-3 text-[0.92rem] font-semibold"><span className="text-[0.72rem] tabular-nums text-gold-ink">{String(qi + 1).padStart(2, '0')}</span>{q.q}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map(([val, label]) => {
                    const on = answers[q.id] === val
                    return (
                      <label key={val} className={`cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${on ? 'border-navy bg-navy text-ivory' : 'border-navy/15 hover:border-navy/40'}`}>
                        <input type="radio" className="sr-only" name={q.id} value={val} checked={on} onChange={() => setAnswers((a) => ({ ...a, [q.id]: val }))} />
                        {label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
          <div aria-live="polite">
            <AnimatePresence>
              {done && (
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0 }}
                  className="on-dark mt-4 flex flex-col gap-4 rounded-[18px] bg-navy p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div>
                    <p className="text-[0.78rem] text-white/60">A good place to start</p>
                    <p className="mt-1 font-display text-[1.4rem] font-semibold text-gold">{rec.title}</p>
                    <p className="mt-1 max-w-[42ch] text-[0.85rem] text-white/70">{rec.short}</p>
                  </div>
                  <Pill to={`/services/${rec.slug}`} variant="gold" size="sm">See details</Pill>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 4 · YouTube, as a Shorts showcase on pale aqua: different from the slate band on About */
function ShortsShowcase() {
  const v = home.video
  return (
    <section className="section relative overflow-hidden bg-mist" aria-labelledby="svc-yt-title">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.18),transparent)]" />
      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-4">
          <p className="label" data-reveal="up">Watch &amp; learn</p>
          <h2 id="svc-yt-title" className="display-lg mt-4" data-split>A minute of <em>my thinking</em></h2>
          <p className="body-copy mt-4 max-w-[38ch]" data-reveal="up">Short lessons from my YouTube channel on brand and business. A good way to get a feel for how we would work together, before you book.</p>
          <div className="mt-7 flex flex-col items-start gap-4" data-reveal="up">
            <a href={v.channelUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-navy py-1.5 pl-1.5 pr-5 text-[0.88rem] font-medium text-ivory transition-transform duration-500 hover:-translate-y-0.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0000] text-white" aria-hidden><SocialIcon id="youtube" size={14} /></span>
              Subscribe on YouTube<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={v.url} target="_blank" rel="noreferrer" className="link-line py-1 text-[0.88rem] font-medium">Watch the full lesson: {v.caption}<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>

        <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-4" data-stagger>
          {v.shorts.map((sh, i) => (
            <li key={sh.id} className={i % 2 ? 'lg:translate-y-8' : ''}>
              <a href={`https://www.youtube.com/shorts/${sh.id}`} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-[9/15] overflow-hidden rounded-[18px] bg-navy shadow-[0_30px_60px_-40px_rgb(21_28_38/.7)] ring-1 ring-black/5">
                  <img src={`https://i.ytimg.com/vi/${sh.id}/oardefault.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.75)_0%,transparent_45%)]" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-navy">Short</span>
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_25px_-8px_rgb(0_0_0/.5)] transition-transform duration-500 group-hover:scale-110" aria-hidden><Play size={14} strokeWidth={2} className="ml-0.5 fill-current" /></span>
                </div>
                <div className="mt-3 flex gap-2.5 px-0.5">
                  <span className="pt-0.5 text-[0.7rem] font-semibold tabular-nums text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[0.86rem] font-semibold leading-snug transition-colors duration-300 group-hover:text-gold-ink">{sh.title}</p>
                </div>
                <span className="sr-only"> (YouTube Short, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Services() {
  const ref = useRef(null)
  useScrollReveals(ref)
  usePageIntro(ref)
  return (
    <div ref={ref}>
      <Seo title="Coaching services" description="1:1, face-to-face, group and executive coaching with Kunal Bhardwaj." path="/services" />
      <ServicesHero />
      <ServiceRows />
      <Process />
      <ShortsShowcase />
      <Finder />
      <CTABanner title="Find the right *format* together" text="Book a consultation and we’ll work out which coaching suits your business." image="R13" />
    </div>
  )
}
