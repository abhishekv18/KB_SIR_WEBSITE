import { useEffect, useState } from 'react'
import { site } from '../content/site'

const Glyph = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
    <path d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.65c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64S26.66 10.13 26.66 16 21.9 26.65 16.04 26.65Zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
  </svg>
)

/**
 * Floating WhatsApp button (bottom right). WhatsApp-green gradient disc, white glyph,
 * soft halo and pulse, and a label that slides out on hover. Appears after the hero; opens WhatsApp with a friendly first line.
 * Hidden in production until `site.whatsapp.number` is set.
 */
export default function WhatsAppButton() {
  const { number, message } = site.whatsapp || {}
  const [shown, setShown] = useState(false)
  // appear only once the visitor has scrolled past the hero (and hide again back at the top)
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  if (!number && !import.meta.env.DEV) return null
  const href = number ? `https://wa.me/${number}?text=${encodeURIComponent(message || '')}` : undefined

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kunal on WhatsApp (opens in a new tab)"
      title={number ? undefined : 'Set site.whatsapp.number in src/content/site.js to activate'}
      className={`group fixed bottom-5 right-5 z-40 flex items-center transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:bottom-7 sm:right-7 ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <span className="mr-3 hidden translate-x-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-[0.85rem] font-medium text-navy opacity-0 shadow-[0_14px_30px_-16px_rgb(36_48_63/.5)] ring-1 ring-line transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        {number ? 'Chat on WhatsApp' : 'WhatsApp number not set yet'}
      </span>
      <span className="relative grid h-[3.25rem] w-[3.25rem] place-items-center">
        {/* soft halo rings */}
        <span className="absolute inset-[-5px] rounded-full bg-[#25D366]/15 ring-1 ring-[#25D366]/25" aria-hidden />
        <span className="absolute inset-0 rounded-full bg-[#25D366]/35 motion-safe:animate-[wa-pulse_2.8s_ease-out_infinite]" aria-hidden />
        {/* button */}
        <span className="relative grid h-full w-full place-items-center rounded-full bg-[linear-gradient(145deg,#3BE07A_0%,#25D366_45%,#1DAA52_100%)] text-white shadow-[0_14px_30px_-10px_rgb(18_140_70/.65),inset_0_1px_0_rgb(255_255_255/.35),inset_0_-2px_6px_rgb(0_0_0/.12)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:scale-[1.06] group-active:scale-95">
          <Glyph size={26} />
        </span>
      </span>
    </a>
  )
}
