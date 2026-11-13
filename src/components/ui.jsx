import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Fragment } from 'react'

/** Renders "Plain text *accent phrase*" → accent in gold, like the hero (deeper gold on light backgrounds). */
export function Accent({ text }) {
  const parts = String(text).split(/(\*[^*]+\*)/g)
  return parts.map((p, i) =>
    p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : <Fragment key={i}>{p}</Fragment>,
  )
}

/** Pill button / link — reference pattern: pill + arrow circle. */
export function Pill({ to, href, children, variant = 'gold', icon = true, size, className = '', ...rest }) {
  const cls = `pill pill-${variant} ${size === 'sm' ? 'pill-sm' : ''} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon && ['gold', 'navy', 'light'].includes(variant) && (
        <span className="pill-dot" aria-hidden><ArrowUpRight size={17} strokeWidth={1.8} /></span>
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type="button" className={cls} {...rest}>{content}</button>
}

/** Section heading — label / serif title with accent / optional side content. */
export function SectionHeading({ id, label, title, text, side, align = 'left', as: Tag = 'h2', size = 'display-lg', className = '' }) {
  if (align === 'center') {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        {label && <p className="label justify-center" data-reveal="up">{label}</p>}
        <Tag id={id} className={`${size} mt-4`} data-split><Accent text={title} /></Tag>
        {text && <p className="lede mx-auto mt-5 max-w-[56ch]" data-reveal="up">{text}</p>}
      </div>
    )
  }
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        {label && <p className="label" data-reveal="up">{label}</p>}
        <Tag id={id} className={`${size} mt-4`} data-split><Accent text={title} /></Tag>
      </div>
      {(text || side) && (
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-2" data-reveal="up">
          {text && <p className="lede">{text}</p>}
          {side && <div className={text ? 'mt-6' : ''}>{side}</div>}
        </div>
      )}
    </div>
  )
}

/** Visible tag on demonstration content. */
export function DemoTag({ children = 'Demo content', className = '', always = false }) {
  // visible while developing; hidden on the live site (content:report still lists every draft)
  if (!always && !import.meta.env.DEV) return null
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-ivory px-2.5 py-0.5 text-[0.74rem] font-medium text-gold-ink ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </span>
  )
}

export function Breadcrumbs({ items, dark = true }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${dark ? 'text-white/70' : 'text-ink-muted'}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="h-px w-3 bg-gold" />}
            {it.to ? <Link className="link-line inline-block py-1" to={it.to}>{it.label}</Link> : <span aria-current="page" className={dark ? 'text-white' : 'text-navy'}>{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Brand social glyphs (Lucide 1.x ships no brand icons). */
export function SocialIcon({ id, size = 18 }) {
  if (id === 'linkedin')
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.55h-4v-4.92c0-1.17-.02-2.68-1.65-2.68-1.65 0-1.9 1.28-1.9 2.6v5h-4z" /></svg>)
  if (id === 'youtube')
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.75 15.1V8.9L15.5 12z" /></svg>)
  return null
}

/** Circle-outline icon (hero strip, challenges). */
export function IconCircle({ Icon, dark = false, size = 'md' }) {
  const s = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
  return (
    <span className={`grid ${s} shrink-0 place-items-center rounded-full border ${dark ? 'border-gold/60 text-gold' : 'border-gold/70 text-gold-ink'}`} aria-hidden>
      <Icon size={19} strokeWidth={1.5} />
    </span>
  )
}
