import { ImageIcon } from 'lucide-react'
import { images } from '../content/images'

/**
 * Responsive image by registry ID (see content/images.js).
 * Pending (not yet generated/approved) images render as a labelled placeholder frame
 * with the same aspect ratio, so layouts are final and nothing shifts later.
 */
export default function Img({ id, className = '', imgClassName = '', sizes = '100vw', priority = false, ratio, alt, position, tone = 'light', ...rest }) {
  const data = images[id]
  if (!data) return null
  // ratio="auto" means the caller sizes the frame with classes (aspect-*, h-*) — don't override them inline
  const aspect = ratio === 'auto' ? undefined : ratio ?? `${data.w} / ${data.h}`
  const frameStyle = aspect ? { aspectRatio: aspect } : undefined

  const ready = ['real', 'generated', 'stock'].includes(data.status)
  if (!ready || !data.src) {
    return (
      <div
        className={`relative overflow-hidden ${tone === 'dark' ? 'bg-navy-800 text-white/55' : 'bg-ivory-deep text-ink-muted'} ${className}`}
        style={frameStyle}
        role="img"
        aria-label={`Image placeholder: ${data.label}`}
        data-placeholder="pending-image"
        {...rest}
      >
        <div data-inner className={`absolute inset-0 ${tone === 'dark'
          ? 'bg-[radial-gradient(120%_90%_at_20%_10%,rgb(210_171_116/.22),transparent_60%),linear-gradient(160deg,#34414F,#151C26)]'
          : 'bg-[radial-gradient(120%_90%_at_20%_10%,rgb(210_171_116/.18),transparent_60%),linear-gradient(160deg,#F2EBDE,#E9E1D0)]'}`} />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 p-4 text-[0.72rem] leading-snug">
          <ImageIcon aria-hidden size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
          <span><span className="font-medium">{id}</span> · {data.label}<br /><span className="opacity-70">Image pending approval</span></span>
        </div>
      </div>
    )
  }

  const srcSet = data.widths.map((w) => `${data.src}-${w}.webp ${w}w`).join(', ')
  const fallback = `${data.src}-${data.widths[data.widths.length - 1]}.webp`
  return (
    <div className={`relative overflow-hidden ${className}`} style={frameStyle} {...rest}>
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt ?? data.alt}
        width={data.w}
        height={data.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        style={position || data.pos ? { objectPosition: position || data.pos } : undefined}
      />
    </div>
  )
}
