import { useRef } from 'react'
import { Mail } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import FAQ from '../components/FAQ'
import { DemoTag, SocialIcon } from '../components/ui'
import { site } from '../content/site'
import { contactPage } from '../content/about'
import { useScrollReveals } from '../animations/useScrollReveals'

export default function Contact() {
  const ref = useRef(null)
  useScrollReveals(ref)
  return (
    <div ref={ref}>
      <Seo title="Book a consultation" description="Contact Kunal Bhardwaj to talk about business coaching and consulting." path="/contact" />
      <PageHero
        variant="split"
        image="R3"
        position="60% 25%"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Let’s talk *business.*"
        text="Tell me where your business is today and what you’d like to change. I’ll reply by email to arrange a conversation."
        floating={<><p className="text-sm text-ink-muted">Prefer email?</p><a href={`mailto:${site.email}`} className="mt-1 block break-all font-display text-xl">{site.email}</a></>}
      />

      <section className="section" aria-labelledby="form-title">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-[24px] border border-line bg-white p-6 sm:p-10" data-reveal="up">
              <h2 id="form-title" className="display-sm">Send an enquiry</h2>
              <p className="body-muted mt-2 mb-8">Fields marked * are required.</p>
              <ContactForm />
            </div>
          </div>
          <div className="min-w-0 lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div data-reveal="up">
                <p className="label">Contact details</p>
                <a href={`mailto:${site.email}`} className="mt-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 text-gold-ink"><Mail size={18} strokeWidth={1.5} aria-hidden /></span>
                  <span className="link-line break-all">{site.email}</span>
                </a>
                <div className="mt-5 flex flex-wrap gap-3">
                  {site.socials.map((s) => (
                    <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="pill pill-outline min-h-11 gap-2 px-4 text-sm"><SocialIcon id={s.id} size={15} />{s.label}</a>
                  ))}
                </div>
              </div>
              <div data-reveal="up">
                <div className="flex flex-wrap items-center gap-3"><p className="label">What happens next</p><DemoTag>Demo steps</DemoTag></div>
                <ol className="mt-6 space-y-6 border-l border-gold/50 pl-7">
                  {contactPage.steps.map((s, i) => (
                    <li key={s.title} className="relative">
                      <span className="absolute -left-[2.2rem] grid h-6 w-6 place-items-center rounded-full bg-navy text-[0.7rem] text-gold" aria-hidden>{i + 1}</span>
                      <p className="font-medium">{s.title}</p>
                      <p className="body-muted mt-1 text-[0.95rem]">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wash section" aria-labelledby="cfaq-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="label" data-reveal="up">Questions</p><h2 id="cfaq-title" className="display-md mt-4" data-split>Before you <em>get in touch</em></h2></div>
          <div className="lg:col-span-7 lg:col-start-6"><FAQ items={contactPage.faq} /></div>
        </div>
      </section>
    </div>
  )
}
