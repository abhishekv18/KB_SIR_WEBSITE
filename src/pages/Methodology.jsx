import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { Accent, Breadcrumbs, DemoTag, Pill } from '../components/ui'
import { home, site } from '../content/site'
import { method } from '../content/method'
import { services } from '../content/services'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * Methodology page. The four steps are the homepage's "Simple steps to success" (step titles from the
 * original site; descriptions are draft). Same vocabulary as the other inner pages and only homepage
 * photographs (the four step photos and the service photos).
 */

const TINTS = ['bg-cream', 'bg-mist', 'bg-sage', 'bg-ivory-deep']

export default function Methodology() {
  const ref = useRef(null)
  useScrollReveals(ref)
  usePageIntro(ref)
  const m = home.methodIntro
  const steps = m.steps.map((s, i) => ({ ...s, ...method.steps[i] }))

  return (
    <div ref={ref}>
      <Seo title="How it works" description="The four simple steps of coaching with Kunal Bhardwaj." path="/methodology" />

      {/* 1 · hero */}
      <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="method-hero">
        <div aria-hidden className="pointer-events-none absolute -left-48 -top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.15),transparent)]" />
        <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6 lg:pr-4">
            <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'How it works' }]} dark={false} /></div>
            <p className="hero-eyebrow lg:mt-6" data-intro>
              <span className="h-[2px] w-8 bg-gold" aria-hidden />{m.label}
            </p>
            <h1 id="method-hero" className="mt-4 hero-title">
              <Accent text={m.title} />
            </h1>
            <p className="lede mt-4 max-w-[46ch]" data-intro>{m.lead} {m.text}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
              <Pill size="sm" to={site.cta.to} variant="navy">{site.cta.label}</Pill>
              <a href="#steps" className="link-line inline-block py-2 text-[0.9rem] font-medium">See the four steps</a>
            </div>
            <ol className="mt-7 grid grid-cols-1 border-t border-navy/12 sm:grid-cols-2 sm:gap-x-6" data-intro>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <a href={`#step-${i + 1}`} className="group flex items-center justify-between gap-3 border-b border-navy/10 py-3">
                    <span className="flex items-baseline gap-2.5">
                      <span className="text-[0.7rem] font-semibold tabular-nums text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[0.88rem] font-semibold transition-colors duration-300 group-hover:text-gold-ink">{s.title}</span>
                    </span>
                    <ArrowDownRight size={15} strokeWidth={1.7} className="shrink-0 text-navy/30 transition-[transform,color] duration-500 group-hover:translate-y-0.5 group-hover:text-gold-ink" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[29rem] lg:ml-auto lg:mr-0">
              <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/45 sm:block" />
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media>
                <Img id="S04" ratio="auto" priority className="aspect-[4/3.3]" sizes="(min-width:1024px) 29rem, 92vw" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.4),transparent_40%)]" />
              </div>
              <div className="relative -mt-8 ml-auto mr-3 w-[74%] max-w-[15rem] rounded-[14px] bg-white p-4 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line sm:absolute sm:-bottom-7 sm:-left-7 sm:m-0 sm:w-56" data-intro>
                <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-gold-ink"><span className="h-px w-4 bg-gold" />Four steps</span>
                <p className="mt-1.5 font-display text-[1rem] font-semibold leading-snug">From first decision to lasting change</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · the four steps: a gold timeline of tinted step cards */}
      <section id="steps" className="section scroll-mt-24" aria-labelledby="steps-title">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">The process</p><DemoTag>Draft step text</DemoTag></div>
              <h2 id="steps-title" className="display-lg mt-4" data-split>One step <em>at a time</em></h2>
            </div>
            <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">Each step builds on the last. Whichever format you choose, the work follows the same path.</p>
          </div>

          <ol className="relative mt-12 space-y-5 sm:space-y-6 lg:pl-24">
            {/* the gold line that ties the steps together (desktop) */}
            <span aria-hidden className="absolute bottom-16 left-[1.9rem] top-16 hidden w-px bg-[linear-gradient(180deg,transparent,rgb(210_171_116/.7)_8%,rgb(210_171_116/.7)_92%,transparent)] lg:block" />
            {steps.map((s, i) => {
              const flip = i % 2 === 1
              return (
                <li key={s.title} id={`step-${i + 1}`} className="relative scroll-mt-28" data-reveal="up">
                  <span className="absolute -left-24 top-10 hidden h-[3.8rem] w-[3.8rem] place-items-center rounded-full bg-navy font-display text-[1.2rem] font-light tabular-nums text-gold shadow-[0_0_0_8px_#fff] lg:grid" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <div className={`grid items-stretch gap-3 overflow-hidden rounded-[24px] p-3 md:grid-cols-12 md:gap-4 ${TINTS[i % TINTS.length]}`}>
                    <div className={`relative overflow-hidden rounded-[16px] md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
                      <Img id={s.image} ratio="auto" className="aspect-[16/10] h-full md:aspect-auto md:min-h-[19rem]" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.04]" sizes="(min-width:768px) 26rem, 92vw" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-navy backdrop-blur-md">{s.focus}</span>
                    </div>
                    <div className={`flex flex-col rounded-[16px] bg-white p-5 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] sm:p-7 md:col-span-7 ${flip ? 'md:order-1' : ''}`}>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">Step {String(i + 1).padStart(2, '0')} <span className="text-navy/30">/ {String(steps.length).padStart(2, '0')}</span></p>
                        <span className="font-display text-[2.2rem] font-light leading-none tabular-nums text-gold-heading/80 lg:hidden" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="mt-2 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.01em]">{s.title}</h3>
                      <p className="body-copy mt-2.5 max-w-[52ch]">{s.text}</p>
                      <div className="mt-6 grid flex-1 gap-5 border-t border-navy/10 pt-5 sm:grid-cols-2 sm:gap-6">
                        <div>
                          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">What happens</p>
                          <ul className="mt-3 space-y-2">
                            {s.happens.map((h) => (
                              <li key={h} className="flex items-start gap-2.5 text-[0.86rem] leading-snug">
                                <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />{h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`self-start rounded-[14px] p-4 ${TINTS[i % TINTS.length]}`}>
                          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold-ink">You leave with</p>
                          <p className="mt-1.5 font-display text-[1rem] font-semibold leading-snug">{s.gives}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:pl-24" data-reveal="up">
            <p className="body-muted text-[0.92rem]">Every journey starts with step one: a single decision to change something.</p>
            <Pill to={site.cta.to} variant="navy" size="sm">Take the first step</Pill>
          </div>
        </div>
      </section>

      {/* 3 · every format follows the same steps */}
      <section className="section bg-sage" aria-labelledby="formats-title">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label" data-reveal="up">Every format</p>
              <h2 id="formats-title" className="display-lg mt-4" data-split>Same steps, <em>four formats</em></h2>
            </div>
            <Link to="/services" className="link-line self-start py-2 text-[0.9rem] font-medium sm:self-auto" data-reveal="up">See all services</Link>
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stagger>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="group relative block overflow-hidden rounded-[16px]">
                  <Img id={s.cardImage} ratio="auto" className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/4.4]" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" sizes="(min-width:1024px) 18rem, 48vw" />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.88)_0%,rgb(21_28_38/.2)_48%,transparent_70%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 text-white sm:p-4">
                    <div>
                      <p className="text-[0.68rem] font-medium text-white/70">{s.pill}</p>
                      <p className="mt-0.5 font-display text-[0.95rem] font-semibold leading-snug sm:text-[1.05rem]">{s.title}</p>
                    </div>
                    <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-white/90 text-navy transition-transform duration-500 group-hover:-rotate-45 sm:grid" aria-hidden><ArrowUpRight size={15} strokeWidth={1.8} /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner title={m.ready.title} text={m.ready.text} image="R13" />
    </div>
  )
}
