import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap'

/**
 * Kunal's real signature (PNG from the original site), written on with a left-to-right
 * pen-speed wipe. `play="scroll"` draws when it enters view; `play="manual"` lets a parent
 * timeline animate `[data-signature]`.
 */
export default function Signature({ tone = 'navy', className = '', play = 'scroll' }) {
  const ref = useRef(null)
  const src = tone === 'white' ? '/assets/brand/kb-signature-white.png' : '/assets/brand/kb-signature-colour.png'

  useGSAP(() => {
    if (play !== 'scroll') return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current, { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref} data-signature className={className}>
      <img src={src} alt="Kunal Bhardwaj signature" width="500" height="200" className="h-auto w-full" loading="lazy" />
    </div>
  )
}
