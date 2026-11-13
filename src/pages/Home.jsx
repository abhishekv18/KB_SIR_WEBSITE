import { useRef } from 'react'
import Seo from '../components/Seo'
import Hero from '../sections/home/Hero'
import { Trust, About, Challenges, Services, Stats, Method, Video, Insights, Testimonials } from '../sections/home/Sections'
import CTABanner from '../components/CTABanner'
import { useScrollReveals } from '../animations/useScrollReveals'
import { home, site } from '../content/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kunal Bhardwaj | Minding Business',
  url: site.url,
  email: site.email,
  image: `${site.url}/og-image.jpg`,
  description: 'Business coaching and consulting.',
  founder: { '@type': 'Person', name: 'Kunal Bhardwaj', jobTitle: 'Business Coach & Consultant', sameAs: site.socials.map((s) => s.href) },
  sameAs: site.socials.map((s) => s.href),
}

export default function Home() {
  const ref = useRef(null)
  useScrollReveals(ref)
  return (
    <div ref={ref}>
      <Seo description="Kunal Bhardwaj is a business coach and consultant. Minding Business offers 1:1, face-to-face, group and executive coaching for business owners." path="/" jsonLd={jsonLd} />
      <Hero />
      <Trust />
      <About />
      <Challenges />
      <Services />
      <Stats />
      <Method />
      <Video />
      <Insights />
      <Testimonials />
      <CTABanner title={home.finalCta.title} text={home.finalCta.text} image={home.finalCta.image} />
    </div>
  )
}
