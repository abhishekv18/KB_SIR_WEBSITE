import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { DemoTag } from './ui'

export default function FAQ({ items, demo = true }) {
  const [open, setOpen] = useState(0)
  const uid = useId()
  return (
    <div>
      {demo && <DemoTag className="mb-6">Demo questions and answers</DemoTag>}
      <ul className="divide-y divide-line border-y border-line" data-stagger>
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-6 py-6 text-left">
                  <span className="flex-1 font-display text-[1.45rem] leading-tight sm:text-[1.65rem]">{f.q}</span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color] duration-500 ${isOpen ? 'rotate-45 border-navy bg-navy text-ivory' : 'border-navy/20'}`} aria-hidden><Plus size={18} strokeWidth={1.6} /></span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`${uid}-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }} exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }} className="overflow-hidden">
                    <p className="body-muted max-w-[65ch] pb-7 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
