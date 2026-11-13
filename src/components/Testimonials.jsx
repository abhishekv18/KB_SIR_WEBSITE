import CardRow from './CardRow'

const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/**
 * Testimonial card — quote mark, quote, hairline, then the person: photo when an approved
 * client photo exists (`t.photo`), otherwise a gold-ringed monogram. Demo quotes carry a visible tag.
 */
export function TestimonialCard({ t, className = 'w-[86vw] max-w-[25rem] sm:w-[24rem]' }) {
  return (
    <figure data-card className={`group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[18px] bg-white p-7 shadow-[0_1px_0_rgb(36_48_63/.04),0_24px_50px_-40px_rgb(36_48_63/.4)] ring-1 ring-line transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_40px_60px_-40px_rgb(36_48_63/.45)] sm:p-8 ${className}`}>
      {/* reference: small brand mark top-left, large faded quote glyph top-right */}
      <div className="flex items-start justify-between">
        <img src="/assets/brand/kb-monogram.png" alt="" width="347" height="277" className="h-6 w-auto opacity-80" loading="lazy" />
        <span aria-hidden className="-mr-1 -mt-3 select-none font-serif text-[5.5rem] font-bold leading-none text-navy/[0.06] transition-colors duration-500 group-hover:text-gold/25">”</span>
      </div>
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-[1.75] text-navy/85">{t.quote}</blockquote>
      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
        {t.photo ? (
          <img src={t.photo} alt="" width="44" height="44" loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/50 ring-offset-2 ring-offset-white" />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#34414F,#151C26)] text-[0.78rem] font-semibold tracking-[0.06em] text-gold ring-2 ring-gold/40 ring-offset-2 ring-offset-white" aria-hidden>{initials(t.name)}</span>
        )}
        <span className="min-w-0">
          <span className="block text-[0.95rem] font-semibold leading-tight">{t.name}</span>
          <span className="mt-0.5 block text-[0.78rem] text-ink-muted">{t.role}{t.city ? ` · ${t.city}` : ''}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Three cards visible on desktop, centred arrows below (reference). */
export function TestimonialSlider({ items }) {
  return (
    <div className="shell">
      <CardRow label="testimonials" bleed={false} controls="center">
        {items.map((t, i) => <TestimonialCard key={i} t={t} className="w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]" />)}
      </CardRow>
    </div>
  )
}
