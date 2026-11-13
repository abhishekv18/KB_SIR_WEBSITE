import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { Check, ShieldCheck, MapPin, Users } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'
import CardRow from '../components/CardRow'
import ServiceCard from '../components/ServiceCard'
import { DemoTag, Pill, SectionHeading } from '../components/ui'
import { getService, services, serviceFaq } from '../content/services'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'

/** Signature block that differs per service, so detail pages aren't duplicates. */
function Signature({ s }) {
  if (s.layout === 'portrait') {
    return (
      <section className="section" aria-labelledby="month-title">
        <div className="shell">
          <SectionHeading id="month-title" label="A typical month" title="What working *one-to-one* looks like" text="Demo rhythm — confirm the real session schedule." />
          <ol className="mt-12 grid gap-4 md:grid-cols-4" data-stagger>
            {s.month.map((m, i) => {
              const [w, t] = m.split(' — ')
              return (
                <li key={m} className={`rounded-[var(--radius-card)] p-6 ${i % 2 === 0 ? 'bg-navy text-ivory' : 'border border-line bg-white'}`}>
                  <p className={`text-sm ${i % 2 === 0 ? 'text-gold' : 'text-gold-ink'}`}>{w}</p>
                  <p className="mt-10 font-display text-[1.7rem] leading-tight">{t}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
    )
  }
  if (s.layout === 'place') {
    return (
      <section className="section" aria-labelledby="day-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[16px]" data-reveal="clip"><Img id={s.sideImage} ratio="4 / 5" position="60% 30%" sizes="(min-width:1024px) 40vw, 100vw" /></div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label" data-reveal="up">Where we meet</p>
            <h2 id="day-title" className="display-md mt-4" data-split>A working day, <em>in the room</em></h2>
            <p className="body-muted mt-4 flex items-center gap-2" data-reveal="up"><MapPin size={16} className="text-gold-ink" aria-hidden /> Demo — location and travel arrangements to be confirmed.</p>
            <ol className="relative mt-10 space-y-8 border-l border-gold/50 pl-8" data-stagger>
              {s.day.map((d) => {
                const [when, what] = d.split(' — ')
                return (
                  <li key={d} className="relative">
                    <span className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-ivory" aria-hidden />
                    <p className="text-sm font-medium text-gold-ink">{when}</p>
                    <p className="mt-1 font-display text-[1.6rem] leading-tight">{what}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>
    )
  }
  if (s.layout === 'group') {
    return (
      <section className="section overflow-hidden" aria-labelledby="cohort-title">
        <div className="shell">
          <SectionHeading id="cohort-title" label="The programme" title="An eight-week *cohort*" text="Demo structure — replace with the real programme." />
        </div>
        <div className="mt-12">
          <CardRow label="programme stages">
            {s.weeks.map((w, i) => {
              const [when, theme] = w.split(' · ')
              return (
                <div key={w} data-card className="w-[78vw] max-w-[20rem] shrink-0 snap-start rounded-[var(--radius-card)] border border-line bg-white p-6 sm:w-[19rem]">
                  <div className="flex items-center gap-3"><span className="font-display text-xl text-gold-ink">{String(i + 1).padStart(2, '0')}</span><span className="h-px flex-1 bg-gold/40" aria-hidden /></div>
                  <p className="mt-8 text-sm text-ink-muted">{when}</p>
                  <p className="mt-1 font-display text-[2.2rem] leading-none">{theme}</p>
                </div>
              )
            })}
          </CardRow>
        </div>
        <div className="shell mt-12">
          <p className="label" data-reveal="up">Who’s in the room</p>
          <ul className="mt-6 flex flex-wrap gap-3" data-stagger>
            {['Founders', 'Owner-managers', 'Family businesses', 'Service firms', 'Retail & hospitality', 'Demo — confirm'].map((c) => (
              <li key={c} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[0.9375rem]"><Users size={15} className="text-gold-ink" aria-hidden />{c}</li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  // boardroom
  return (
    <section className="on-dark section bg-navy text-white" aria-labelledby="outcomes-title">
      <div className="shell">
        <SectionHeading id="outcomes-title" label="Leadership outcomes" title="What leaders *work towards*" text="Demo outcomes — goals are agreed with each leader at the start." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {s.outcomes.map((o, i) => (
            <li key={o} className="bg-navy p-8">
              <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-12 font-display text-[1.9rem] leading-tight">{o}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex max-w-2xl items-start gap-3 text-white/72" data-reveal="up"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden />Demo — confidentiality statement. Explain how conversations with leaders are kept private.</p>
      </div>
    </section>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  const ref = useRef(null)
  useScrollReveals(ref, [slug])
  const [active, setActive] = useState(0)
  if (!s) return <Navigate to="/services" replace />
  const related = services.filter((x) => x.slug !== s.slug)
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.title }]

  const factsCard = (
    <div className="rounded-[var(--radius-card)] bg-ivory p-6 text-navy">
      <DemoTag>Demo details</DemoTag>
      <dl className="mt-4 divide-y divide-line">
        {s.facts.map((f) => <div key={f.label} className="flex justify-between gap-6 py-3 text-[0.9375rem]"><dt className="text-ink-muted">{f.label}</dt><dd className="text-right font-medium">{f.value}</dd></div>)}
      </dl>
    </div>
  )

  return (
    <div ref={ref} key={slug}>
      <Seo title={s.title} description={`${s.title} with Kunal Bhardwaj. ${s.short}`} path={`/services/${s.slug}`} />
      {s.layout === 'portrait' ? (
        <PageHero variant="split" image={s.heroImage} crumbs={crumbs} title={s.title} text={s.summary}
          floating={<><p className="font-display text-xl">{s.pill}</p><p className="mt-1 text-sm text-ink-muted">{s.short}</p></>}>
          <Pill to={site.cta.to} variant="gold">{site.cta.label}</Pill>
        </PageHero>
      ) : (
        <PageHero variant="photo" image={s.heroImage} crumbs={crumbs} title={s.title} text={s.summary} aside={s.layout === 'boardroom' ? null : factsCard}>
          <Pill to={site.cta.to} variant="gold">{site.cta.label}</Pill>
        </PageHero>
      )}

      {/* Overview: who it's for + problems */}
      <section className="section" aria-labelledby="overview-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">Overview</p><DemoTag>Demo copy</DemoTag></div>
            <h2 id="overview-title" className="display-lg mt-4" data-split>Is this <em>right for you?</em></h2>
            {(s.layout === 'portrait' || s.layout === 'boardroom') && <div className="mt-10" data-reveal="up">{factsCard}</div>}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-7" data-reveal="up">
              <h3 className="font-display text-[1.7rem]">Who it’s for</h3>
              <ul className="mt-5 space-y-3">{s.whoFor.map((w) => <li key={w} className="flex gap-3 text-[0.98rem]"><Check size={17} className="mt-1 shrink-0 text-gold-ink" aria-hidden />{w}</li>)}</ul>
            </div>
            <div className="on-dark rounded-[var(--radius-card)] bg-navy p-7 text-white" data-reveal="up" data-delay="0.1">
              <h3 className="font-display text-[1.7rem]">Problems it solves</h3>
              <ul className="mt-5 space-y-3">{s.problems.map((p) => <li key={p} className="flex gap-3 text-[0.98rem] text-white/80"><span className="mt-2.5 h-px w-3 shrink-0 bg-gold" aria-hidden />{p}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <Signature s={s} />

      {/* Deliverables + approach */}
      <section className="wash section" aria-labelledby="deliver-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="label" data-reveal="up">Benefits & deliverables</p>
            <h2 id="deliver-title" className="display-md mt-4" data-split>What’s <em>included</em></h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2" data-stagger>
              {s.deliverables.map((d) => (
                <li key={d} className="rounded-[var(--radius-card)] border border-line bg-white p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-ivory-deep text-gold-ink" aria-hidden><Check size={16} /></span><p className="mt-4 font-medium leading-snug">{d}</p></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label" data-reveal="up">Coaching approach</p>
            <ol className="relative mt-8 space-y-8 pl-10" data-stagger>
              <span className="absolute bottom-2 left-[0.7rem] top-2 w-px bg-gold/50" aria-hidden />
              {s.approach.map((a, i) => (
                <li key={a} className="relative">
                  <span className="absolute -left-10 grid h-6 w-6 place-items-center rounded-full bg-navy text-[0.7rem] text-gold" aria-hidden>{i + 1}</span>
                  <p className="font-display text-[1.65rem] leading-tight">{a}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {s.detailImages.map((id, i) => <div key={id + i} className={`overflow-hidden rounded-[var(--radius-img)] ${i ? 'mt-10' : ''}`} data-reveal="clip" data-delay={i * 0.15}><Img id={id} ratio="4 / 5" sizes="20vw" /></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sfaq-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="label" data-reveal="up">Questions</p><h2 id="sfaq-title" className="display-md mt-4" data-split>Before you <em>decide</em></h2></div>
          <div className="lg:col-span-7 lg:col-start-6"><FAQ items={serviceFaq} /></div>
        </div>
      </section>

      <section className="section overflow-hidden pt-0" aria-labelledby="related-title">
        <div className="shell"><SectionHeading id="related-title" label="Related" title="Other ways to *work together*" /></div>
        <div className="mt-12">
          <CardRow label="related services">
            {related.map((r, i) => <ServiceCard key={r.slug} service={r} active={i === active} onActivate={() => setActive(i)} />)}
          </CardRow>
        </div>
      </section>

      <CTABanner title={`Start with a *conversation*`} text={`Talk to Kunal about ${s.title.toLowerCase()} and whether it suits your business.`} image={s.cardImage} />
    </div>
  )
}
