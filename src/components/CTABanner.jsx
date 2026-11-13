import { Mail } from 'lucide-react'
import Img from './Img'
import { Accent, Pill } from './ui'
import { site } from '../content/site'
import { images } from '../content/images'

// DEMO copy — how a first enquiry works; confirm with Kunal before launch
const steps = [
  { n: '01', title: 'Tell me about your business', text: 'Send a short note on where things stand.' },
  { n: '02', title: 'We talk it through', text: 'An honest conversation about what’s in the way.' },
  { n: '03', title: 'Leave with a next step', text: 'A clear idea of what to do first.' },
]

const ready = (id) => ['real', 'generated', 'stock'].includes(images[id]?.status)

/**
 * Closing call to action — Kunal's real photograph behind a slate gradient, two actions,
 * and three short steps so the visitor knows what happens after they get in touch.
 * Pending (not yet generated) images fall back to Kunal's desk photograph.
 */
export default function CTABanner({ title = 'Let’s talk *business.*', text, image = 'R13', cta = site.cta }) {
  const bg = ready(image) ? image : 'R13'
  const isKunal = bg.startsWith('R')
  return (
    <section className="section-tight" aria-label="Book a consultation">
      <div className="shell">
        <div className="on-dark relative isolate overflow-hidden rounded-[18px] bg-navy-950 text-white lg:bg-navy" data-reveal="scale">
          {/* phone / tablet: the photograph sits on top as its own frame, so Kunal is never cropped
              away behind the text; it melts into the panel colour at the bottom */}
          <div className="relative lg:hidden" aria-hidden>
            <Img id={bg} tone="dark" ratio="auto" className="aspect-[4/3.3] sm:aspect-[16/8]" sizes="100vw" position={isKunal ? '100% 28%' : '50% 50%'} alt="" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#151C26_0%,rgb(21_28_38/.85)_18%,rgb(21_28_38/.35)_45%,rgb(21_28_38/.18)_70%,rgb(21_28_38/.3)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(21_28_38/.45)_0%,transparent_55%)]" />
          </div>

          {/* desktop: photograph behind the copy */}
          <div className="absolute inset-0 -z-10 max-lg:hidden" aria-hidden>
            <div className="absolute inset-[-8%]" data-parallax="5">
              <Img id={bg} tone="dark" className="h-full w-full" ratio="auto" sizes="100vw" position={isKunal ? (images[bg]?.pos || '72% 35%') : '50% 50%'} alt="" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(21_28_38/.96)_0%,rgb(21_28_38/.88)_38%,rgb(21_28_38/.52)_70%,rgb(21_28_38/.32)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgb(21_28_38/.9),transparent)]" />
          </div>

          <div className="relative -mt-16 px-6 pb-6 sm:-mt-14 sm:px-12 sm:pb-8 lg:mt-0 lg:px-16 lg:pt-24">
            <div className="max-w-[40rem]">
              <p className="label" data-reveal="up">Let’s talk</p>
              <h2 className="display-lg mt-3 sm:mt-4" data-split><Accent text={title} /></h2>
              {text && <p className="lede mt-4 max-w-[46ch] max-sm:text-[0.95rem] sm:mt-5" data-reveal="up">{text}</p>}
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4" data-reveal="up">
                <Pill to={cta.to} variant="gold" className="max-sm:justify-between">{cta.label}</Pill>
                <a href={`mailto:${site.email}`} className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.04] px-5 py-3 text-[0.92rem] font-medium text-white transition-colors hover:border-gold hover:text-gold">
                  <Mail size={16} strokeWidth={1.7} /> {site.email}
                </a>
              </div>
            </div>

            {/* what happens next */}
            <ol className="mt-8 grid overflow-hidden rounded-[14px] border border-white/10 sm:mt-10 sm:grid-cols-3 sm:gap-px sm:border-0 sm:bg-white/10 lg:mt-20" data-stagger>
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-md [&+&]:border-t sm:block sm:bg-navy-950/55 sm:p-6 sm:[&+&]:border-t-0">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-[0.72rem] font-semibold tracking-[0.06em] text-gold sm:h-auto sm:w-auto sm:place-items-start sm:border-0 sm:text-[0.8rem] sm:tracking-[0.12em]">{s.n}</span>
                  <div>
                    <p className="font-semibold leading-snug max-sm:text-[0.95rem] sm:mt-2">{s.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-white/60 sm:text-[0.86rem] sm:text-white/65">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
