import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { DemoTag } from '../components/ui'
import { DemoNotice } from './SuccessStories'
import { getStory, stories } from '../content/stories'
import { getService } from '../content/services'
import { useScrollReveals } from '../animations/useScrollReveals'

export default function StoryDetail() {
  const { slug } = useParams()
  const story = getStory(slug)
  const ref = useRef(null)
  useScrollReveals(ref, [slug])
  if (!story) return <Navigate to="/success-stories" replace />
  const idx = stories.indexOf(story)
  const next = stories[(idx + 1) % stories.length]
  const service = getService(story.service)

  const sections = [
    ['The challenge', story.challenge],
    ['The approach', story.approach],
    ['The outcome', story.outcome],
  ]

  return (
    <div ref={ref} key={slug}>
      <Seo title={story.title} description={`Demonstration case study: ${story.title}.`} path={`/success-stories/${story.slug}`} noindex />
      <PageHero variant="photo" image={story.image} crumbs={[{ label: 'Home', to: '/' }, { label: 'Success Stories', to: '/success-stories' }, { label: 'Case study' }]} title={story.title}
        aside={<DemoTag className="bg-ivory/95">Demonstration case study</DemoTag>} />

      <section className="section" aria-label="Case study">
        <div className="shell">
          <DemoNotice>This is an illustrative example that demonstrates the case-study layout. It does not describe a real client or real results.</DemoNotice>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <dl className="sticky top-28 rounded-[var(--radius-card)] border border-line bg-white p-6" data-reveal="up">
                {[['Sector', story.sector], ['Business size', story.size], ['Engagement', service?.title]].map(([k, v]) => (
                  <div key={k} className="border-b border-line py-4 first:pt-0 last:border-0 last:pb-0"><dt className="text-sm text-ink-muted">{k}</dt><dd className="mt-1 font-display text-xl">{v}</dd></div>
                ))}
              </dl>
            </aside>
            <div className="lg:col-span-7 lg:col-start-6">
              {sections.map(([h, t], i) => (
                <div key={h} className={i ? 'mt-10' : ''}>
                  <p className="label" data-reveal="up">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="display-md mt-3" data-split>{h}</h2>
                  <p className="body-muted mt-5 text-[1.08rem] leading-[1.8]" data-reveal="up">{t}</p>
                </div>
              ))}
              <blockquote className="mt-12 border-l-2 border-gold pl-6 font-serif text-[clamp(1.7rem,2.8vw,2.5rem)] italic leading-tight" data-reveal="up">“{story.quote}”</blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="wash section-tight" aria-label="Next case study">
        <div className="shell">
          <Link to={`/success-stories/${next.slug}`} className="group grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-sm text-ink-muted">Next case study</p>
              <p className="mt-2 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-tight transition-colors group-hover:text-gold-ink">{next.title}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Read next <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)] md:col-span-5"><Img id={next.image} ratio="16 / 10" sizes="40vw" imgClassName="transition-transform duration-700 group-hover:scale-105" /></div>
          </Link>
        </div>
      </section>

      <CTABanner image="G14" text="Tell me about your business and what you’d like to change." />
    </div>
  )
}
