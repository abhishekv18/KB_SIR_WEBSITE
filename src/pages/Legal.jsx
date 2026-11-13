import { useRef } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'

/** Placeholder legal pages — the owner must supply reviewed text before launch. */
const copy = {
  privacy: {
    title: 'Privacy *policy*',
    sections: [
      ['Placeholder', 'This privacy policy has not been written yet. Kunal Bhardwaj will publish a reviewed policy here before the website goes live.'],
      ['What this site does today', 'This website has no user accounts and stores no personal data on a server. The contact form opens a pre-filled email in your own email app; nothing is sent until you send that email yourself. Embedded videos load from YouTube only after you press play.'],
      ['Questions', `For any privacy question, email ${site.email}.`],
    ],
  },
  terms: {
    title: 'Terms & *conditions*',
    sections: [
      ['Placeholder', 'These terms have not been written yet. Kunal Bhardwaj will publish reviewed terms here before the website goes live.'],
      ['Content on this site', 'Some content on this site is temporary demonstration material and is clearly marked as such.'],
      ['Questions', `For any question about these terms, email ${site.email}.`],
    ],
  },
}

export default function Legal({ kind }) {
  const ref = useRef(null)
  useScrollReveals(ref, [kind])
  const c = copy[kind]
  return (
    <div ref={ref} key={kind}>
      <Seo title={kind === 'privacy' ? 'Privacy policy' : 'Terms & conditions'} description="Legal information for kunalbharadwaj.com." path={`/${kind}`} noindex />
      <PageHero variant="editorial" crumbs={[{ label: 'Home', to: '/' }, { label: kind === 'privacy' ? 'Privacy policy' : 'Terms & conditions' }]} title={c.title} />
      <section className="section pt-10">
        <div className="shell">
          <div className="prose-kb max-w-[68ch]">
            {c.sections.map(([h, t]) => (<div key={h}><h2>{h}</h2><p>{t}</p></div>))}
          </div>
        </div>
      </section>
    </div>
  )
}
