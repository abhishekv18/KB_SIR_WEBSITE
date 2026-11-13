import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { DemoTag, Pill, SectionHeading } from '../components/ui'
import { method } from '../content/method'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsap'

/** Sticky image + long step column. The gold line draws with scroll; the image follows the step in view. */
function StepStory({ steps }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-thread]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } })
    })
    gsap.utils.toArray('[data-step]', ref.current).forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 60%', onToggle: (self) => self.isActive && setActive(i) })
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-[16px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
                <Img id={steps[active].image} ratio="4 / 4.4" sizes="45vw" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute left-5 top-5 rounded-full bg-ivory px-3.5 py-1.5 text-sm font-medium" aria-live="polite">Step {active + 1} of {steps.length}</p>
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 lg:col-start-8" data-steps>
        <div className="absolute bottom-0 left-[0.55rem] top-2 w-px bg-navy/12" aria-hidden><div data-thread className="absolute inset-0 origin-top bg-gold" /></div>
        <ol className="space-y-16 pl-12 lg:space-y-0">
          {steps.map((s, i) => (
            <li key={s.title} data-step className="relative lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center">
              <span className={`absolute -left-12 top-1.5 h-[1.15rem] w-[1.15rem] rounded-full border-2 transition-colors duration-500 lg:top-auto ${i <= active ? 'border-gold bg-gold' : 'border-navy/25 bg-ivory'}`} aria-hidden />
              <p className="font-display text-2xl text-gold-ink">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="display-md mt-3">{s.title}</h3>
              <p className="body-muted mt-5 text-[1.05rem] leading-relaxed">{s.text}</p>
              <p className="mt-5 inline-flex rounded-full bg-ivory-deep px-4 py-2 text-sm font-medium">You get: {s.gives}</p>
              <Img id={s.image} ratio="4 / 3" className="mt-8 rounded-[var(--radius-img)] lg:hidden" sizes="90vw" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function Methodology() {
  const ref = useRef(null)
  useScrollReveals(ref)
  const steps = method.steps
  return (
    <div ref={ref}>
      <Seo title="Coaching methodology" description="How coaching with Kunal Bhardwaj works, step by step." path="/methodology" />
      <PageHero variant="photo" image="G37" crumbs={[{ label: 'Home', to: '/' }, { label: 'Methodology' }]} title="A clear process for *real progress*" text={`${steps.length} stages, from understanding where your business is to growing it with confidence.`}
        aside={<DemoTag className="bg-ivory/90">Demo methodology — awaiting Kunal’s real process</DemoTag>}>
        <Pill to={site.cta.to} variant="gold">{site.cta.label}</Pill>
      </PageHero>

      {/* Overview map — connected nodes */}
      <section className="section" aria-labelledby="map-title">
        <div className="shell">
          <SectionHeading id="map-title" label="At a glance" title="The journey in *four stages*" />
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4" data-stagger>
            <span className="absolute left-0 right-0 top-6 hidden h-px bg-gold/50 md:block" aria-hidden />
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-gold bg-ivory font-display text-xl text-gold-ink">{i + 1}</span>
                <h3 className="mt-6 font-display text-[1.65rem] leading-tight">{s.title}</h3>
                <p className="body-muted mt-2 text-[0.95rem]">{s.gives}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wash section" aria-labelledby="detail-title">
        <div className="shell">
          <SectionHeading id="detail-title" label="Step by step" title="How each stage *works*" />
          <div className="mt-12"><StepStory steps={steps} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="outputs-title">
        <div className="shell">
          <SectionHeading id="outputs-title" label="What you get" title="Something useful at *every stage*" />
          <div className="mt-12 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white" data-reveal="up">
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">What clients receive at each stage</caption>
              <thead><tr className="border-b border-line text-sm text-ink-muted"><th scope="col" className="p-5 font-medium">Stage</th><th scope="col" className="p-5 font-medium">Focus</th><th scope="col" className="p-5 font-medium">You get</th></tr></thead>
              <tbody>
                {steps.map((s, i) => (
                  <tr key={s.title} className="border-b border-line last:border-0">
                    <th scope="row" className="p-5 font-display text-xl font-normal text-gold-ink">{String(i + 1).padStart(2, '0')}</th>
                    <td className="p-5 font-medium">{s.title}</td>
                    <td className="p-5 text-ink-muted">{s.gives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTABanner title="Take the *first step*" text="The process starts with one conversation about where your business is today." image="G06" />
    </div>
  )
}
