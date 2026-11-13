import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// dev-only handle for visual QA tooling (completing timelines in background tabs)
if (import.meta.env.DEV && typeof window !== 'undefined') window.__kbMotion = { gsap, ScrollTrigger }

/** Shared motion tokens — docs/PROPOSAL.md Step 5 */
export const ease = { out: 'expo.out', soft: 'power3.out', inOut: 'power2.inOut' }
export const dur = { s: 0.45, m: 0.9, l: 1.3 }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
