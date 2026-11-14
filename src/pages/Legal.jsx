import { useRef } from 'react'
import { Link } from 'react-router'
import Seo from '../components/Seo'
import { Accent, Breadcrumbs, DemoTag } from '../components/ui'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/**
 * Privacy policy and terms. PLACEHOLDER text: Kunal must supply reviewed legal wording before launch.
 * The "what this site does today" section describes the site as built (no accounts, no server storage,
 * mailto form, YouTube loaded on click) and is accurate.
 */
const copy = {
  privacy: {
    label: 'Privacy policy',
    title: 'Privacy *policy*',
    intro: 'How this website handles your information. A full, reviewed policy will be published here before the site goes live.',
    sections: [
      ['Placeholder', 'This privacy policy has not been written yet. Kunal Bhardwaj will publish a reviewed policy here before the website goes live.'],
      ['What this site does today', 'This website has no user accounts and stores no personal data on a server. The contact form opens a pre-filled email in your own email app; nothing is sent until you send that email yourself. Embedded videos load from YouTube only after you press play.'],
      ['Questions', `For any privacy question, email ${site.email}.`],
    ],
  },
  terms: {
    label: 'Terms & conditions',
    title: 'Terms & *conditions*',
    intro: 'The terms for using this website. Reviewed terms will be published here before the site goes live.',
    sections: [
      ['Placeholder', 'These terms have not been written yet. Kunal Bhardwaj will publish reviewed terms here before the website goes live.'],
      ['Content on this site', 'Some content on this site is temporary demonstration material and is clearly marked as such.'],
      ['Questions', `For any question about these terms, email ${site.email}.`],
    ],
  },
}

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function Legal({ kind }) {
  const ref = useRef(null)
  useScrollReveals(ref, [kind])
  usePageIntro(ref, [kind])
  const c = copy[kind]
  const other = kind === 'privacy' ? { to: '/terms', label: 'Terms & conditions' } : { to: '/privacy', label: 'Privacy policy' }

  return (
    <div ref={ref} key={kind}>
      <Seo title={c.label} description="Legal information for kunalbharadwaj.com." path={`/${kind}`} noindex />

      <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-28 lg:pb-14 lg:pt-32" aria-labelledby="legal-title">
        <div aria-hidden className="pointer-events-none absolute -right-48 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.14),transparent)]" />
        <div className="shell relative">
          <div data-intro><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: c.label }]} dark={false} /></div>
          <p className="mt-7 hero-eyebrow" data-intro>
            <span className="h-[2px] w-8 bg-gold" aria-hidden />Legal
          </p>
          <h1 id="legal-title" className="mt-4 hero-title"><Accent text={c.title} /></h1>
          <p className="lede mt-4 max-w-[52ch]" data-intro>{c.intro}</p>
          <div data-intro><DemoTag className="mt-4" always>Placeholder text, to be replaced before launch</DemoTag></div>
        </div>
      </section>

      <section className="section" aria-label={c.label}>
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">On this page</p>
              <ol className="mt-3 border-l border-navy/12">
                {c.sections.map(([h]) => (
                  <li key={h}><a href={`#${slugify(h)}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.84rem] text-navy/65 transition-colors duration-300 hover:border-gold hover:text-navy">{h}</a></li>
                ))}
              </ol>
              <Link to={other.to} className="link-line mt-6 inline-block text-[0.84rem] font-semibold">{other.label}</Link>
            </div>
          </aside>
          <div className="prose-kb max-w-[42rem] lg:col-span-8 lg:col-start-5">
            {c.sections.map(([h, t]) => (
              <div key={h}><h2 id={slugify(h)} className="scroll-mt-28">{h}</h2><p>{t}</p></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
