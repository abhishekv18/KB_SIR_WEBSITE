import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Info } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { TestimonialCard } from '../components/Testimonials'
import { DemoTag, SectionHeading } from '../components/ui'
import { stories } from '../content/stories'
import { testimonials } from '../content/testimonials'
import { getService } from '../content/services'
import { useScrollReveals } from '../animations/useScrollReveals'

export function DemoNotice({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gold/50 bg-ivory px-5 py-4 text-sm text-navy">
      <Info size={18} className="mt-0.5 shrink-0 text-gold-ink" aria-hidden />
      <p>{children}</p>
    </div>
  )
}

export default function SuccessStories() {
  const ref = useRef(null)
  useScrollReveals(ref)
  const [featured, ...rest] = stories
  return (
    <div ref={ref}>
      <Seo title="Success stories" description="Client stories from Kunal Bhardwaj’s coaching work." path="/success-stories" />
      <PageHero
        variant="editorial"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Success Stories' }]}
        title="Stories of businesses *moving forward*"
        text="Real client stories will be published here with each client’s approval. Until then, the cases below are illustrative examples that show the format."
        aside={
          <Link to={`/success-stories/${featured.slug}`} className="group block overflow-hidden rounded-[16px] bg-white shadow-[0_30px_60px_-35px_rgb(36_48_63/.45)]">
            <Img id={featured.image} ratio="16 / 10" sizes="(min-width:1024px) 40vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-105" />
            <div className="p-6">
              <DemoTag>Demonstration case study</DemoTag>
              <p className="mt-3 text-sm text-ink-muted">{featured.sector}</p>
              <p className="mt-1 font-display text-[1.7rem] leading-tight">{featured.title}</p>
            </div>
          </Link>
        }
      />

      <section className="section pt-12" aria-labelledby="cases-title">
        <div className="shell">
          <DemoNotice>These case studies are demonstrations of the page design. They do not describe real clients, and no results shown here should be read as actual outcomes.</DemoNotice>
          <SectionHeading id="cases-title" className="mt-10" label="Case studies" title="From challenge to *change*" />
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {rest.map((s) => (
              <li key={s.slug}>
                <article className="group relative">
                  <div className="overflow-hidden rounded-[var(--radius-card)]"><Img id={s.image} ratio="4 / 3" sizes="(min-width:1024px) 30vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-muted"><span>{s.sector}</span><span className="h-px w-3 bg-gold" aria-hidden /><span>{getService(s.service)?.title}</span></div>
                  <h3 className="mt-2 font-display text-[1.65rem] leading-tight"><Link to={`/success-stories/${s.slug}`} className="after:absolute after:inset-0">{s.title}</Link></h3>
                  <p className="body-muted mt-2 line-clamp-2">{s.challenge}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">Read the case <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wash section" aria-labelledby="wall-title">
        <div className="shell">
          <SectionHeading id="wall-title" align="center" label="In their words" title="Client *testimonials*" text="Approved client testimonials will appear here. These cards are layout samples." />
          <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:w-full [&>*]:max-w-none [&>*]:break-inside-avoid" data-stagger>
            {[...testimonials, ...testimonials.slice(0, 2)].map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      <CTABanner title="Your business could be the *next story*" text="Start with a conversation about where you are and where you want to be." image="G38" />
    </div>
  )
}
