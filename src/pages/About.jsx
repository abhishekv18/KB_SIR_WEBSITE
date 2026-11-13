import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Signature from '../components/Signature'
import CardRow from '../components/CardRow'
import CTABanner from '../components/CTABanner'
import { Accent, DemoTag, Pill, SectionHeading } from '../components/ui'
import { about } from '../content/about'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'

export default function About() {
  const ref = useRef(null)
  useScrollReveals(ref)
  const [tab, setTab] = useState(0)
  const ex = about.expertise[tab]

  return (
    <div ref={ref}>
      <Seo title="About" description="About Kunal Bhardwaj — business coach and consultant behind Minding Business." path="/about" />
      <PageHero
        variant="photo"
        image="R3"
        position="62% 30%"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        title={about.hero.title}
        text={about.hero.text}
      >
        <Pill to={site.cta.to} variant="gold">{site.cta.label}</Pill>
      </PageHero>

      {/* Introduction */}
      <section className="section" aria-label="Introduction">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="label" data-reveal="up">Introduction</p>
            <DemoTag className="mt-4">Demo copy</DemoTag>
          </div>
          <div className="lg:col-span-9">
            <p className="font-display text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.15]" data-split>{about.intro}</p>
            <Signature className="mt-10 w-56" />
          </div>
        </div>
      </section>

      {/* Biography — sticky photo + text */}
      <section className="wash section" aria-labelledby="bio-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[16px]" data-reveal="clip">
                <Img id="R4" ratio="4 / 5" position="72% 35%" sizes="(min-width:1024px) 38vw, 100vw" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label" data-reveal="up">Biography</p>
            <h2 id="bio-title" className="display-lg mt-4" data-split>From running businesses to <em>minding</em> them</h2>
            <div className="mt-8 space-y-6">
              {about.bio.map((p, i) => <p key={i} className="body-muted text-[1.0625rem] leading-[1.8]" data-reveal="up">{p}</p>)}
            </div>
            <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2" data-stagger>
              {[['Role', 'Business coach & consultant'], ['Brand', 'Minding Business'], ['Works with', 'Demo — client types'], ['Based in', 'Demo — city, country']].map(([k, v]) => (
                <div key={k}><dt className="text-sm text-ink-muted">{k}</dt><dd className="mt-1 font-display text-2xl">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Expertise — tabs with image */}
      <section className="section" aria-labelledby="expertise-title">
        <div className="shell">
          <SectionHeading id="expertise-title" label="Experience & expertise" title="Where I can *help most*" text="Demo — four areas of expertise. Replace with the areas Kunal actually works in." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div role="tablist" aria-label="Areas of expertise" className="flex flex-col gap-2">
                {about.expertise.map((e, i) => (
                  <button key={e.id} role="tab" id={`tab-${e.id}`} aria-selected={tab === i} aria-controls="expertise-panel" tabIndex={tab === i ? 0 : -1}
                    onClick={() => setTab(i)}
                    onKeyDown={(ev) => { if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') { ev.preventDefault(); setTab((tab + 1) % about.expertise.length) } if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') { ev.preventDefault(); setTab((tab - 1 + about.expertise.length) % about.expertise.length) } }}
                    className={`flex items-center justify-between rounded-[var(--radius-card)] px-6 py-5 text-left transition-colors duration-500 ${tab === i ? 'bg-navy text-ivory' : 'bg-white hover:bg-ivory-deep'}`}>
                    <span className="font-display text-[1.7rem]">{e.title}</span>
                    <span className={`h-2 w-2 rounded-full ${tab === i ? 'bg-gold' : 'bg-navy/15'}`} aria-hidden />
                  </button>
                ))}
              </div>
            </div>
            <div id="expertise-panel" role="tabpanel" aria-labelledby={`tab-${ex.id}`} className="lg:col-span-6 lg:col-start-7">
              <AnimatePresence mode="wait">
                <motion.div key={ex.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                  <Img id={ex.image} ratio="3 / 2" className="rounded-[16px]" sizes="(min-width:1024px) 45vw, 100vw" />
                  <p className="body-muted mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed">{ex.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — navy band */}
      <section className="on-dark section bg-navy text-white" aria-labelledby="philosophy-title">
        <div className="shell">
          <p className="label" data-reveal="up">Coaching philosophy</p>
          <h2 id="philosophy-title" className="sr-only">Coaching philosophy</h2>
          <blockquote className="mt-8 max-w-5xl font-serif text-[clamp(2.2rem,4.6vw,4.4rem)] italic leading-[1.08] text-white" data-split>“{about.philosophy.quote}”</blockquote>
          <ul className="mt-12 grid gap-6 md:grid-cols-3" data-stagger>
            {about.philosophy.principles.map((p, i) => (
              <li key={p.title} className="rounded-[var(--radius-card)] border border-white/12 p-7">
                <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-display text-[1.8rem] leading-tight">{p.title}</h3>
                <p className="body-muted mt-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey — horizontal timeline */}
      <section className="section overflow-hidden" aria-labelledby="journey-title">
        <div className="shell">
          <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">Professional journey</p><DemoTag>Demo milestones</DemoTag></div>
          <h2 id="journey-title" className="display-lg mt-4 max-w-2xl" data-split><Accent text="The road to *Minding Business*" /></h2>
        </div>
        <div className="mt-12">
          <CardRow label="career milestones">
            {about.journey.map((m, i) => (
              <article key={i} data-card className="relative w-[80vw] max-w-[24rem] shrink-0 snap-start sm:w-[23rem]">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${i === about.journey.length - 1 ? 'bg-gold' : 'border border-gold bg-ivory'}`} aria-hidden />
                  <span className="h-px flex-1 bg-gold/40" aria-hidden />
                </div>
                <p className="mt-5 font-display text-3xl text-gold-ink">{m.year}</p>
                <h3 className="mt-2 text-lg font-medium">{m.title}</h3>
                <p className="body-muted mt-2 min-h-[3.4em] text-[0.95rem]">{m.text}</p>
                <Img id={m.image} ratio="4 / 3" className="mt-5 rounded-[var(--radius-img)]" sizes="360px" />
              </article>
            ))}
          </CardRow>
        </div>
      </section>

      {/* Photo strip — real photographs */}
      <section className="pb-8" aria-label="Photographs of Kunal">
        <div className="shell grid grid-cols-12 gap-4">
          <div className="col-span-12 overflow-hidden rounded-[16px] md:col-span-7" data-reveal="clip"><Img id="R1" ratio="16 / 10" position="64% 30%" sizes="(min-width:768px) 58vw, 100vw" /></div>
          <div className="col-span-6 overflow-hidden rounded-[16px] md:col-span-2 md:mt-24" data-reveal="clip" data-delay="0.15"><Img id="R2" ratio="3 / 5" position="50% 20%" sizes="(min-width:768px) 17vw, 50vw" /></div>
          <div className="col-span-6 overflow-hidden rounded-[16px] md:col-span-3 md:mt-10" data-reveal="clip" data-delay="0.3"><Img id="R5" ratio="4 / 5" position="45% 40%" sizes="(min-width:768px) 25vw, 50vw" /></div>
        </div>
      </section>

      <CTABanner title="Ready to *mind the business* together?" text="Demo — a short invitation to start a conversation." image="G14" />
    </div>
  )
}
