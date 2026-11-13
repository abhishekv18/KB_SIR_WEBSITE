import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'
import { DemoTag, Pill, SectionHeading } from '../components/ui'
import { services, serviceFaq } from '../content/services'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'

/* Front-end only selector: nothing is stored or sent. */
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

export default function Services() {
  const ref = useRef(null)
  useScrollReveals(ref)
  const [answers, setAnswers] = useState({})
  const done = questions.every((q) => answers[q.id])
  const rec = useMemo(() => services.find((s) => s.slug === recommend(answers)), [answers])

  return (
    <div ref={ref}>
      <Seo title="Coaching services" description="1:1, face-to-face, group and executive coaching with Kunal Bhardwaj." path="/services" />
      <PageHero
        variant="photo"
        image="G24"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title="Coaching shaped around *your business*"
        text="Four ways to work together. Choose the one that fits how you think, learn and lead."
      >
        <ul className="flex flex-wrap gap-2.5">
          {services.map((s) => (
            <li key={s.slug}><a href={`#${s.slug}`} className="pill pill-outline-light min-h-11 text-sm">{s.title}</a></li>
          ))}
        </ul>
      </PageHero>

      {/* Selector */}
      <section className="wash section" aria-labelledby="fit-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label" data-reveal="up">Not sure where to start?</p>
            <h2 id="fit-title" className="display-md mt-4" data-split>Which coaching <em>fits you?</em></h2>
            <p className="body-muted mt-5" data-reveal="up">Answer three quick questions for a suggestion. Nothing you choose here is stored or sent.</p>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:col-start-6">
            {questions.map((q, qi) => (
              <fieldset key={q.id} className="rounded-[var(--radius-card)] border border-line bg-white p-6" data-reveal="up">
                <legend className="sr-only">{q.q}</legend>
                <p aria-hidden className="flex items-center gap-3 font-medium"><span className="font-display text-xl text-gold-ink">{qi + 1}</span>{q.q}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {q.options.map(([val, label]) => {
                    const on = answers[q.id] === val
                    return (
                      <label key={val} className={`cursor-pointer rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${on ? 'border-navy bg-navy text-ivory' : 'border-navy/15 hover:border-navy/40'}`}>
                        <input type="radio" className="sr-only" name={q.id} value={val} checked={on} onChange={() => setAnswers((a) => ({ ...a, [q.id]: val }))} />
                        {label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}
            <div aria-live="polite">
              <AnimatePresence>
                {done && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0 }}
                    className="on-dark flex flex-col gap-5 rounded-[var(--radius-card)] bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-white/65">Suggested for you</p>
                      <p className="mt-1 font-display text-3xl text-gold">{rec.title}</p>
                      <p className="mt-1 text-sm text-white/70">{rec.short}</p>
                    </div>
                    <Pill to={`/services/${rec.slug}`} variant="gold">View details</Pill>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Service bands — alternating image side */}
      <section className="section" aria-label="All services">
        <div className="shell space-y-24 lg:space-y-32">
          {services.map((s, i) => (
            <article id={s.slug} key={s.slug} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center">
              <div className={`relative lg:col-span-6 ${i % 2 ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <div className="overflow-hidden rounded-[16px]" data-reveal="clip"><Img id={s.cardImage} ratio="5 / 4" sizes="(min-width:1024px) 48vw, 100vw" /></div>
                <span className="absolute left-4 top-4 rounded-full bg-ivory px-3.5 py-1.5 text-xs font-medium">{s.pill}</span>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : 'lg:col-start-8'}`}>
                <div className="flex items-center gap-3" data-reveal="up"><span className="font-display text-2xl text-gold-ink">{String(i + 1).padStart(2, '0')}</span><DemoTag>Demo description</DemoTag></div>
                <h2 className="display-md mt-4" data-split>{s.title}</h2>
                <p className="body-muted mt-5 text-[1.05rem] leading-relaxed" data-reveal="up">{s.summary}</p>
                <ul className="mt-7 space-y-3" data-stagger>
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ivory-deep text-gold-ink" aria-hidden><Check size={14} strokeWidth={2} /></span>{d}</li>
                  ))}
                </ul>
                <div className="mt-9" data-reveal="up"><Pill to={`/services/${s.slug}`} variant="navy">Explore {s.title}</Pill></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="wash section" aria-labelledby="compare-title">
        <div className="shell">
          <SectionHeading id="compare-title" label="Compare" title="Side by side" text="Formats, lengths and rhythms below are demo values until confirmed." />
          <div className="mt-12 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white" data-reveal="up">
            <table className="w-full min-w-[46rem] text-left text-[0.9375rem]">
              <caption className="sr-only">Comparison of coaching services</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-5 font-medium text-ink-muted">Service</th>
                  {services[0].facts.map((f) => <th key={f.label} scope="col" className="p-5 font-medium text-ink-muted">{f.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.slug} className="border-b border-line last:border-0">
                    <th scope="row" className="p-5"><Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 font-display text-xl hover:text-gold-ink">{s.title}<ArrowUpRight size={15} aria-hidden /></Link></th>
                    {s.facts.map((f) => <td key={f.label} className="p-5 text-ink-muted">{f.value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label" data-reveal="up">Questions</p>
            <h2 id="faq-title" className="display-md mt-4" data-split>Frequently <em>asked</em></h2>
            <div className="mt-8" data-reveal="up"><Pill to={site.cta.to} variant="outline" icon={false}>Ask your own question</Pill></div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><FAQ items={serviceFaq} /></div>
        </div>
      </section>

      <CTABanner title="Find the right *format* together" text="Book a consultation and we’ll work out which coaching suits your business." image="G04" />
    </div>
  )
}
