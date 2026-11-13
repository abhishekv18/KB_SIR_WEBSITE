import Seo from '../components/Seo'
import { Pill } from '../components/ui'

export default function NotFound() {
  return (
    <section className="on-dark relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-navy px-6 text-center text-white">
      <Seo title="Page not found" description="This page could not be found." noindex />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_40%,rgb(210_171_116/.18),transparent_70%)]" />
      <div>
        <p className="font-display text-[clamp(7rem,22vw,16rem)] leading-none text-gold/80">404</p>
        <h1 className="display-md mt-2">This page <em>isn’t here.</em></h1>
        <p className="lede mx-auto mt-5 max-w-[42ch]">The link may be old, or the page may have moved. Try the home page or get in touch.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Pill to="/" variant="gold">Go to the home page</Pill>
          <Pill to="/contact" variant="outline-light" icon={false}>Contact</Pill>
        </div>
      </div>
    </section>
  )
}
