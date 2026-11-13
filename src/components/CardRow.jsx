import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * Horizontal card row (reference "services" strip). Native scroll + snap, mouse drag,
 * prev/next buttons and a gold progress bar. No scroll-jacking.
 */
export default function CardRow({ children, label, className = '', bleed = true, controls = 'below', dark = false }) {
  const track = useRef(null)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 1)
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 })
  }, [])

  useEffect(() => {
    update()
    const el = track.current
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const by = (dir) => {
    const el = track.current
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // mouse drag (pointer: fine only — touch uses native swipe)
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => { setTimeout(() => (drag.current = null), 0) }
  const onClickCapture = (e) => { if (drag.current?.moved) { e.preventDefault(); e.stopPropagation() } }

  const Controls = (
    <div className="flex items-center gap-5">
      <div className="flex gap-2.5">
        <button type="button" className="icon-btn" onClick={() => by(-1)} disabled={edges.start} aria-label={`Previous ${label}`}><ArrowLeft size={18} strokeWidth={1.6} /></button>
        <button type="button" className="icon-btn icon-btn-solid" onClick={() => by(1)} disabled={edges.end} aria-label={`Next ${label}`}><ArrowRight size={18} strokeWidth={1.6} /></button>
      </div>
      <div className={`relative h-px w-28 sm:w-40 ${dark ? 'bg-white/20' : 'bg-navy/15'}`} aria-hidden>
        <span className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300" style={{ width: `${Math.max(12, progress * 100)}%`, height: 2, top: -0.5 }} />
      </div>
    </div>
  )

  return (
    <div className={className}>
      {controls === 'above' && <div className="shell mb-8 flex justify-end">{Controls}</div>}
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-3 ${bleed ? 'px-[max(1.25rem,calc((100vw-1320px)/2+3.5rem))] [scroll-padding-inline:max(1.25rem,calc((100vw-1320px)/2+3.5rem))]' : ''} cursor-grab active:cursor-grabbing select-none`}
      >
        {children}
      </div>
      {controls === 'below' && <div className="shell mt-8">{Controls}</div>}
      {controls === 'center' && (
        <div className="mt-10 flex justify-center gap-3">
          <button type="button" className="icon-btn" onClick={() => by(-1)} disabled={edges.start} aria-label={`Previous ${label}`}><ArrowLeft size={18} strokeWidth={1.6} /></button>
          <button type="button" className="icon-btn icon-btn-solid" onClick={() => by(1)} disabled={edges.end} aria-label={`Next ${label}`}><ArrowRight size={18} strokeWidth={1.6} /></button>
        </div>
      )}
    </div>
  )
}
