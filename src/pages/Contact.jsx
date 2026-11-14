import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Mail } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import ContactForm from '../components/ContactForm'
import { Accent, Breadcrumbs, DemoTag, IconCircle, Pill, SocialIcon } from '../components/ui'
import { iconMap } from '../components/icons'
import { Glyph } from '../components/WhatsAppButton'
import { home, site } from '../content/site'
import { services } from '../content/services'
import { contactPage } from '../content/about'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * Contact page. Same vocabulary as the other inner pages: light hero with the gold-framed photograph,
 * labels and display headings, white cards, the gold step line and homepage photographs only.
 * Wording from the original site: "Ready to start?", "Let's talk business", "Or just fill in the form".
 * Contact details are verified (email, LinkedIn, WhatsApp number supplied by the owner).
 */

export default function Contact() {
  const ref = useRef(null)
  useScrollReveals(ref)
  usePageIntro(ref)
  const linkedin = site.socials.find((s) => s.id === 'linkedin')
  const wa = site.whatsapp?.number
  const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(site.whatsapp.message || '')}` : null
  const youtube = site.socials.find((x) => x.id === 'youtube')
  const channels = [
    waHref && { name: 'WhatsApp', title: 'Message me', text: 'Quick questions, or to find a time to talk.', cta: 'Start a chat', href: waHref, external: true, colour: '#25D366', icon: <Glyph size={20} /> },
    { name: 'Email', title: 'Write to me', text: site.email, cta: 'Send an email', href: `mailto:${site.email}`, colour: 'var(--color-navy)', icon: <Mail size={18} strokeWidth={1.6} /> },
    linkedin && { name: 'LinkedIn', title: 'Connect with me', text: 'Professional updates and new articles.', cta: 'Connect', href: linkedin.href, external: true, colour: '#0A66C2', icon: <SocialIcon id="linkedin" size={16} /> },
    youtube && { name: 'YouTube', title: 'Subscribe to the channel', text: 'Short, practical lessons on brand and business.', cta: 'Subscribe', href: youtube.href, external: true, colour: '#FF0000', icon: <SocialIcon id="youtube" size={17} /> },
  ].filter(Boolean)

  return (
    <div ref={ref}>
      <Seo title="Book a consultation" description="Contact Kunal Bhardwaj to talk about business coaching and consulting." path="/contact" />

      {/* 1 · hero: slate, like the homepage hero */}
      <section className="on-dark relative overflow-hidden bg-navy-950 pb-12 pt-24 text-white sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="contact-title">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.16),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(52_65_79/.6),transparent)]" />
        <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6 lg:pr-4">
            <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} /></div>
            <p className="hero-eyebrow lg:mt-6" data-intro>
              <span className="h-[2px] w-8 bg-gold" aria-hidden />Ready to start?
            </p>
            <h1 id="contact-title" className="mt-4 hero-title">
              <Accent text="Let’s talk *business.*" />
            </h1>
            <p className="lede mt-4 max-w-[46ch]" data-intro>Tell me where your business is today and what you would like to change. Write directly, message me on WhatsApp, or just fill in the form below.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
              <Pill size="sm" href="#message" variant="gold">Send a message</Pill>
              <a href={`mailto:${site.email}`} className="link-line inline-block py-2 text-[0.9rem] font-medium text-white">{site.email}</a>
            </div>
            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/12 pt-6" data-intro>
              {home.hero.strip.map((f) => {
                const Icon = iconMap[f.icon]
                return (
                  <li key={f.title} className="flex items-center gap-3">
                    <IconCircle Icon={Icon} dark size="sm" />
                    <div>
                      <p className="text-[0.82rem] font-semibold leading-tight">{f.title}</p>
                      <p className="mt-0.5 text-[0.74rem] text-white/60">{f.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[29rem] lg:ml-auto lg:mr-0">
              <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/40 sm:block" />
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_50px_90px_-45px_rgb(0_0_0/.85)] ring-1 ring-white/10" data-intro-media>
                <Img id="R13" ratio="auto" priority tone="dark" position="78% 30%" className="aspect-[4/3.3]" sizes="(min-width:1024px) 29rem, 92vw" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.5),transparent_40%)]" />
              </div>
              <div className="relative -mt-8 ml-auto mr-3 w-[74%] max-w-[15rem] rounded-[14px] bg-white p-4 text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/.6)] sm:absolute sm:-bottom-7 sm:-left-7 sm:m-0 sm:w-56" data-intro>
                <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-gold-ink"><span className="h-px w-4 bg-gold" />Minding Business</span>
                <img src="/assets/brand/kb-signature-colour.png" alt="Kunal Bhardwaj" width="500" height="200" className="mt-1 h-auto w-28" />
                <p className="mt-1 text-[0.74rem] leading-snug text-ink-muted">Business coaching and consulting for owners.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · the form and what happens next */}
      <section id="message" className="section scroll-mt-24" aria-labelledby="form-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="label" data-reveal="up">Or just fill in the form</p>
            <h2 id="form-title" className="display-lg mt-4" data-split>Send a <em>message</em></h2>
            <div className="mt-8 rounded-[20px] bg-white p-5 shadow-[0_30px_70px_-50px_rgb(36_48_63/.5)] ring-1 ring-line sm:p-8" data-reveal="up">
              <p className="body-muted mb-6 text-[0.84rem]">Fields marked * are required.</p>
              <ContactForm />
            </div>
          </div>
          <aside className="min-w-0 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-wrap items-center gap-3" data-reveal="up"><p className="label">What happens next</p>{contactPage.status === 'demo' && <DemoTag>Draft</DemoTag>}</div>
              <ol className="mt-7 space-y-6 border-l border-gold/50 pl-8" data-stagger>
                {contactPage.steps.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span className="absolute -left-[2.85rem] grid h-7 w-7 place-items-center rounded-full bg-navy text-[0.7rem] font-semibold tabular-nums text-gold" aria-hidden>{i + 1}</span>
                    <p className="card-title">{s.title}</p>
                    <p className="card-text mt-1">{s.text}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-9 overflow-hidden rounded-[18px] shadow-[0_30px_60px_-45px_rgb(21_28_38/.6)]" data-reveal="clip">
                <Img id="S03" ratio="auto" className="aspect-[16/10]" sizes="(min-width:1024px) 22rem, 100vw" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3 · not sure which format: the four homepage service photographs */}
      <section className="section bg-sage" aria-labelledby="formats-title">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label" data-reveal="up">Not sure where to start?</p>
              <h2 id="formats-title" className="display-lg mt-4" data-split>Four ways to <em>work together</em></h2>
            </div>
            <Link to="/services#finder" className="link-line self-start py-2 text-[0.9rem] font-medium sm:self-auto" data-reveal="up">Help me choose</Link>
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

      {/* 4 · stay connected: every real channel, one card each */}
      <section className="section" aria-labelledby="connect-title">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label" data-reveal="up">Stay connected</p>
              <h2 id="connect-title" className="display-lg mt-4" data-split>Wherever suits you, <em>I’m there</em></h2>
            </div>
            <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">A quick message, a longer email, a professional connection or a short lesson on video.</p>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4" data-stagger>
            {channels.map((c) => (
              <li key={c.name}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})} className="group relative flex h-full flex-col overflow-hidden rounded-[16px] bg-white p-5 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] sm:p-6 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_30px_50px_-36px_rgb(36_48_63/.5)]">
                  <span aria-hidden className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-6" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ background: c.colour }} aria-hidden>{c.icon}</span>
                    <ArrowUpRight size={17} strokeWidth={1.6} className="text-navy/30 transition-[transform,color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" aria-hidden />
                  </div>
                  <p className="mt-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{c.name}</p>
                  <h3 className="mt-1 card-title">{c.title}</h3>
                  <p className="card-text mt-1.5 flex-1">{c.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-navy transition-colors duration-300 group-hover:text-gold-ink">{c.cta}</span>
                  {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
