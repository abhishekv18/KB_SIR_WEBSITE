import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'

/**
 * Service card — reference pattern: chip + arrow circle, title, short text, rounded image at the base.
 * `flex` = used in the home row, where the active card widens (flex-grow) on desktop.
 */
const TINTS = ['bg-cream', 'bg-mist', 'bg-sage', 'bg-ivory-deep'] // old-site pastel cards

export default function ServiceCard({ service, active = false, onActivate, flex = false, tint = 0, className = '' }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      data-card
      onMouseEnter={onActivate}
      onFocus={onActivate}
      draggable={false}
      className={`group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[16px] p-3.5 transition-[background-color,color,box-shadow,flex-grow,transform] duration-700 ease-[var(--ease-out-expo)] ${
        flex ? `w-[86%] max-w-[21rem] sm:w-[20rem] lg:w-auto lg:max-w-none lg:basis-0 ${active ? 'lg:grow-[1.5]' : 'lg:grow'}` : 'w-[82vw] max-w-[22rem] sm:w-[21rem]'
      } ${
        active
          ? 'bg-navy text-ivory shadow-[0_30px_50px_-35px_rgb(36_48_63/.6)]'
          : `${TINTS[tint % TINTS.length]} text-navy hover:-translate-y-1`
      } ${className}`}
    >
      <div className="relative flex items-center justify-between px-1.5 pt-1.5">
        <span className={`rounded-full px-3 py-1 text-[0.72rem] font-medium tracking-[0.01em] transition-colors duration-500 ${active ? 'bg-gold text-navy' : 'bg-white/80 text-navy/80'}`}>{service.pill}</span>
        <span className={`grid h-10 w-10 place-items-center rounded-full transition-[transform,background-color,color] duration-500 group-hover:rotate-45 ${active ? 'bg-white text-navy' : 'bg-white/80'}`} aria-hidden>
          <ArrowUpRight size={18} strokeWidth={1.7} />
        </span>
      </div>
      <h3 className="relative mt-8 px-1.5 font-display text-[1.35rem] font-semibold leading-[1.2]">{service.title}</h3>
      <p className={`relative mt-2.5 line-clamp-3 min-h-[4.6em] px-1.5 text-[0.875rem] leading-relaxed ${active ? 'text-white/70' : 'text-ink-muted'}`}>{service.short}</p>
      <div className="relative mt-5 overflow-hidden rounded-[16px]">
        <Img
          id={service.cardImage}
          ratio="auto"
          sizes="(min-width:1024px) 30vw, 340px"
          tone={active ? 'dark' : 'light'}
          className="aspect-[4/3] rounded-[16px] lg:aspect-auto lg:h-[15.5rem]"
          imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
        />
      </div>
    </Link>
  )
}
