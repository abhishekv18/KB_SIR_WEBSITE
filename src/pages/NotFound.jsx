import { Mail } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import { Pill } from '../components/ui'
import { site } from '../content/site'

/** 404 · Kunal's office photograph, faded deep into slate, with one clear way back. */
export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-16 pt-32 text-white" aria-labelledby="nf-title">
      <Seo title="Page not found" description="This page could not be found." noindex />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-45">
        <Img id="R13" ratio="auto" tone="dark" className="h-full w-full" position="78% 30%" sizes="100vw" alt="" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#151C26_0%,rgb(21_28_38/.92)_45%,rgb(21_28_38/.55)_100%)]" />
      <div className="shell">
        <p className="label">Page not found</p>
        <p aria-hidden className="mt-4 font-display text-[clamp(5.5rem,16vw,11rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white/90">4<span className="text-gold">0</span>4</p>
        <h1 id="nf-title" className="mt-6 max-w-[18ch] hero-title">This page <em>isn’t here.</em></h1>
        <p className="lede mt-4 max-w-[46ch]">The link may be old, or the page may have moved. Head back to the home page, or write to me directly.</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Pill size="sm" to="/" variant="gold">Back to the home page</Pill>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 py-2 text-[0.875rem] font-medium text-white"><Mail size={16} strokeWidth={1.6} className="text-gold" /><span className="link-line">{site.email}</span></a>
        </div>
      </div>
    </section>
  )
}
