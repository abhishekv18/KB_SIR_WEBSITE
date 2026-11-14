import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowUpRight, Check, Compass, Layers, Target } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { Breadcrumbs, DemoTag, IconCircle, Pill } from '../components/ui'
import { getService, services } from '../content/services'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * Service detail page. Same vocabulary as the homepage, About and Services: light hero with the
 * gold-framed photograph, labels and display headings, white icon cards, a gold step line, photo
 * tiles and the closing banner. Only homepage photographs. Unconfirmed facts read "To be confirmed".
 */

const PROBLEM_ICONS = [Target, Compass, Layers]
const TINTS = ['bg-cream', 'bg-mist', 'bg-sage', 'bg-ivory-deep'] // the homepage service-card tints

function Framed({ id, flip = false, priority = false, caption }) {
  return (
    <div className="relative">
      <span aria-hidden className={`absolute -top-3 bottom-10 hidden rounded-[28px] border border-gold/45 sm:block ${flip ? '-left-3 right-10' : '-right-3 left-10'}`} />
      <div className="relative overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media={priority || undefined} data-reveal={priority ? undefined : 'clip'}>
        <Img id={id} ratio="auto" priority={priority} className="aspect-[4/3.3]" sizes="(min-width:1024px) 29rem, 92vw" />
        {caption && (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.6),transparent_40%)]" />
            <p className="absolute bottom-4 left-5 flex items-center gap-2 text-[0.75rem] font-medium text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />{caption}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  const ref = useRef(null)
  useScrollReveals(ref, [slug])
  usePageIntro(ref, [slug])
  if (!s) return <Navigate to="/services" replace />

  const index = services.indexOf(s)
  const flip = index % 2 === 1
  const others = services.filter((o) => o.slug !== s.slug)
  const draft = s.status === 'demo'

  return (
    <div ref={ref} key={slug}>
      <Seo title={s.title} description={s.short} path={`/services/${s.slug}`} noindex={draft} />

      {/* 1 · hero */}
      <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="svc-title">
        <div aria-hidden className={`pointer-events-none absolute -top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.15),transparent)] ${flip ? '-left-48' : '-right-48'}`} />
        <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:pl-8' : 'lg:pr-4'}`}>
            <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.title }]} dark={false} /></div>
            <p className="hero-eyebrow lg:mt-6" data-intro>
              <span className="h-[2px] w-8 bg-gold" aria-hidden />{s.pill}
            </p>
            <h1 id="svc-title" className="mt-4 hero-title">{s.title}</h1>
            <p className="lede mt-4 max-w-[46ch]" data-intro>{s.intro || s.short}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
              <Pill size="sm" to={site.cta.to} variant="navy">{site.cta.label}</Pill>
              <Link to="/services" className="link-line inline-block py-2 text-[0.9rem] font-medium">All services</Link>
            </div>
            <dl className="mt-7 grid max-w-[30rem] grid-cols-2 gap-y-4 border-t border-navy/12 pt-4" data-intro>
              {s.facts.map((f, i) => (
                <div key={f.label} className={`pr-3 ${i % 2 ? 'border-l border-navy/12 pl-5' : ''}`}>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{f.label}</dt>
                  <dd className={`mt-1.5 text-[0.9rem] font-semibold ${f.value ? 'text-navy' : 'text-navy/35'}`}>{f.value || 'To be confirmed'}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
            <div className={`mx-auto max-w-[29rem] ${flip ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'}`}><Framed id={s.heroImage} flip={flip} priority caption={s.format} /></div>
          </div>
        </div>
      </section>

      {/* 2 · overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className={`lg:col-span-6 ${flip ? 'lg:pr-6' : 'lg:order-2 lg:pl-6'}`}>
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">Overview</p>{draft && <DemoTag>Draft copy</DemoTag>}</div>
            <h2 id="overview-title" className="display-lg mt-4" data-split>What <em>{s.title.toLowerCase()}</em> looks like</h2>
            <p className="body-copy mt-4 max-w-[50ch]" data-reveal="up">{s.summary}</p>
            <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/55" data-reveal="up">It suits</p>
            <ul className="mt-3 space-y-2.5" data-stagger>
              {s.whoFor.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[0.92rem]">
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-gold-ink ${TINTS[index % TINTS.length]}`} aria-hidden><Check size={12} strokeWidth={2.2} /></span>{w}
                </li>
              ))}
            </ul>
          </div>
          <div className={`lg:col-span-6 ${flip ? '' : 'lg:order-1'}`}>
            <div className={`mx-auto max-w-[27rem] ${flip ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'}`}><Framed id={s.sideImage} flip={!flip} /></div>
          </div>
        </div>
      </section>

      {/* 3 · what we often work on: the homepage's white icon cards on the service's own tint */}
      <section className={`section ${TINTS[index % TINTS.length]}`} aria-labelledby="work-title">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">Where it helps</p>{draft && <DemoTag>Draft</DemoTag>}</div>
              <h2 id="work-title" className="display-lg mt-4" data-split>What we often <em>work on</em></h2>
            </div>
            <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">The things that bring most owners to this format.</p>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4" data-stagger>
            {s.problems.map((p, i) => {
              const Icon = PROBLEM_ICONS[i % PROBLEM_ICONS.length]
              return (
                <li key={p} className="group relative overflow-hidden rounded-[14px] bg-white p-5 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line transition-transform duration-700 ease-[var(--ease-out-expo)] sm:p-6 [@media(hover:hover)]:hover:-translate-y-1">
                  <span aria-hidden className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-6" />
                  <div className="flex items-start justify-between">
                    <IconCircle Icon={Icon} size="sm" />
                    <span className="text-[0.74rem] font-semibold tabular-nums tracking-[0.12em] text-gold-ink/70">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-4 card-title">{p}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 4 · how it works: steps on a gold line beside a photograph */}
      <section className="section" aria-labelledby="how-title">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:pl-6' : 'lg:pr-6'}`}>
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">How it works</p>{draft && <DemoTag>Draft</DemoTag>}</div>
            <h2 id="how-title" className="display-lg mt-4" data-split>Three steps, <em>kept simple</em></h2>
            <ol className="mt-8 space-y-6 border-l border-gold/50 pl-8" data-stagger>
              {s.approach.map((a, i) => (
                <li key={a.title} className="relative">
                  <span className="absolute -left-[2.85rem] grid h-7 w-7 place-items-center rounded-full bg-navy text-[0.7rem] font-semibold tabular-nums text-gold" aria-hidden>{i + 1}</span>
                  <p className="card-title">{a.title}</p>
                  <p className="card-text mt-1 max-w-[44ch]">{a.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8" data-reveal="up"><Pill to={site.cta.to} variant="navy" size="sm">Start with a conversation</Pill></div>
          </div>
          <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
            <div className={`mx-auto max-w-[27rem] ${flip ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'}`}><Framed id={s.detailImages[0]} flip={flip} /></div>
          </div>
        </div>
      </section>

      {/* 5 · other formats */}
      <section className="section pt-0" aria-labelledby="others-title">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label" data-reveal="up">Other formats</p>
              <h2 id="others-title" className="display-lg mt-4" data-split>Other ways to <em>work together</em></h2>
            </div>
            <Link to="/services" className="link-line self-start py-2 text-[0.9rem] font-medium sm:self-auto" data-reveal="up">See all services</Link>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4" data-stagger>
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/services/${o.slug}`} className="group relative block overflow-hidden rounded-[16px]">
                  <Img id={o.cardImage} ratio="auto" className="aspect-[16/11] sm:aspect-[4/4.4]" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" sizes="(min-width:640px) 24rem, 100vw" />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.88)_0%,rgb(21_28_38/.2)_48%,transparent_70%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                    <div>
                      <p className="text-[0.68rem] font-medium text-white/70">{o.pill}</p>
                      <p className="mt-0.5 card-title">{o.title}</p>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/90 text-navy transition-transform duration-500 group-hover:-rotate-45" aria-hidden><ArrowUpRight size={15} strokeWidth={1.8} /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner title={`Talk about *${s.title.toLowerCase()}*`} text="Tell me where your business is today and we’ll see whether this format is the right fit." image="R13" />
    </div>
  )
}
