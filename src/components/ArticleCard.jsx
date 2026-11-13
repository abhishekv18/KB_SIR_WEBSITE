import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'
import { DemoTag } from './ui'
import { formatDate } from '../content/posts'
import { images } from '../content/images'

const ready = (id) => ['real', 'generated', 'stock'].includes(images[id]?.status)
const TINTS = {
  Brand: 'bg-ivory-deep text-navy',
  Leadership: 'bg-navy text-ivory',
  Strategy: 'bg-mist-deep text-navy',
  Productivity: 'bg-sage text-navy',
}

/** Typographic cover in the site palette — used until a post's photograph exists. */
function Cover({ post, ratio, big }) {
  const tint = TINTS[post.category] || 'bg-cream text-navy'
  const dark = tint.startsWith('bg-navy')
  return (
    <div className={`relative flex flex-col justify-between overflow-hidden p-6 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${tint}`} style={{ aspectRatio: ratio.replace(/\s/g, '') }} aria-hidden>
      <span className={`absolute -right-10 -top-10 h-44 w-44 rounded-full border ${dark ? 'border-gold/30' : 'border-navy/10'}`} />
      <span className={`absolute -right-2 -top-2 h-28 w-28 rounded-full border ${dark ? 'border-gold/20' : 'border-navy/10'}`} />
      <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.2em] ${dark ? 'text-gold' : 'text-gold-ink'}`}>{post.category}</span>
      <span className={`max-w-[20ch] font-semibold leading-[1.15] tracking-[-0.01em] ${big ? 'text-[clamp(1.4rem,2.4vw,2rem)]' : 'text-[1.25rem]'}`}>{post.title}</span>
      <span className={`flex items-center gap-2 text-[0.75rem] ${dark ? 'text-white/60' : 'text-ink-muted'}`}><span className="h-px w-6 bg-gold" />Minding Business · Insights</span>
    </div>
  )
}

/** Article card — reference blog card (rounded image, date, title, excerpt). */
export default function ArticleCard({ post, variant = 'grid', headingLevel = 3 }) {
  const H = `h${headingLevel}`
  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
      <span className="font-medium text-gold-ink">{post.category}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
      <span>{post.readingTime} min read</span>
      {post.status === 'demo' && <DemoTag>Demo article</DemoTag>}
    </p>
  )

  if (variant === 'horizontal') {
    return (
      <article className="group relative grid grid-cols-[7.5rem_1fr] items-center gap-5 sm:grid-cols-[11rem_1fr]">
        <div className="overflow-hidden rounded-[var(--radius-img)]">
          {ready(post.image)
            ? <Img id={post.image} ratio="4 / 3" sizes="180px" imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
            : <div className={`aspect-[4/3] ${TINTS[post.category] || 'bg-cream'}`} aria-hidden />}
        </div>
        <div>
          {meta}
          <H className="mt-2 font-display text-[1.2rem] font-medium leading-[1.2] sm:text-[1.35rem]">
            <Link to={`/insights/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
          </H>
        </div>
      </article>
    )
  }

  const featured = variant === 'featured'
  return (
    <article className={`group relative flex flex-col ${featured ? '' : 'h-full'}`}>
      <div className="relative overflow-hidden rounded-[16px]">
        {ready(post.image)
          ? <Img id={post.image} ratio="auto" className={featured ? 'aspect-[16/10]' : 'aspect-[16/10] sm:aspect-[4/3]'} sizes={featured ? '(min-width:1024px) 55vw, 100vw' : '(min-width:1024px) 30vw, 100vw'} imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          : <Cover post={post} ratio={featured ? '16 / 10' : '4 / 3'} big={featured} />}
        <span aria-hidden className="absolute right-4 top-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-navy opacity-0 shadow-lg transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} strokeWidth={1.7} />
        </span>
      </div>
      <div className="mt-4 flex-1 px-1 sm:mt-5">
        {meta}
        <H className={`mt-3 font-display font-medium leading-[1.2] ${featured ? 'text-[clamp(1.6rem,2.3vw,2.2rem)]' : 'text-[1.12rem] sm:text-[1.3rem]'}`}>
          <Link to={`/insights/${post.slug}`} className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 after:absolute after:inset-0 group-hover:bg-[length:100%_1px] focus-visible:outline-none">{post.title}</Link>
        </H>
        <p className="body-muted mt-2 line-clamp-2 max-w-[60ch] text-[0.85rem] leading-relaxed sm:mt-2.5 sm:line-clamp-3 sm:text-[0.92rem]">{post.excerpt}</p>
      </div>
    </article>
  )
}
