import { useRef } from 'react'
import { Navigate, useParams } from 'react-router'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import ArticleCard from '../components/ArticleCard'
import CTABanner from '../components/CTABanner'
import { DemoTag, Pill, SocialIcon } from '../components/ui'
import { formatDate, getPost, posts } from '../content/posts'
import { site } from '../content/site'
import { images } from '../content/images'
import { useScrollReveals } from '../animations/useScrollReveals'
import { gsap, useGSAP } from '../animations/gsap'

function Block({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>
  if (b.type === 'quote') return <blockquote>{b.text}</blockquote>
  return <p>{b.text}</p>
}

export default function Article() {
  const { slug } = useParams()
  const post = getPost(slug)
  const ref = useRef(null)
  const bar = useRef(null)
  useScrollReveals(ref, [slug])
  useGSAP(() => {
    if (!bar.current) return
    gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '[data-article-body]', start: 'top 30%', end: 'bottom 70%', scrub: true } })
  }, { scope: ref, dependencies: [slug], revertOnUpdate: true })

  if (!post) return <Navigate to="/insights" replace />
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const url = `${site.url}/insights/${post.slug}`
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, datePublished: post.date, author: { '@type': 'Person', name: 'Kunal Bhardwaj' }, publisher: { '@type': 'Person', name: 'Kunal Bhardwaj' }, mainEntityOfPage: url }

  return (
    <div ref={ref} key={slug}>
      <Seo title={post.title} description={post.excerpt} path={`/insights/${post.slug}`} jsonLd={post.status === 'verified' ? jsonLd : undefined} noindex={post.status === 'demo'} />
      <div ref={bar} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gold" aria-hidden />

      <PageHero variant="editorial" crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: post.category }]} title={post.title}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
          <span className="font-medium text-gold-ink">{post.category}</span><span className="h-px w-3 bg-gold" aria-hidden />
          <time dateTime={post.date}>{formatDate(post.date)}</time><span className="h-px w-3 bg-gold" aria-hidden />
          <span>{post.readingTime} min read</span>
          {post.status === 'demo' && <DemoTag>Demo article</DemoTag>}
        </p>
      </PageHero>

      <div className="shell">
        {["real", "generated", "stock"].includes(images[post.image]?.status) ? <div className="overflow-hidden rounded-[16px]" data-reveal="clip"><Img id={post.image} ratio="21 / 9" sizes="100vw" priority /></div> : null}
      </div>

      <article className="section" aria-label="Article">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <img src="/assets/portraits/kb-cafe-tall-640.webp" alt="" width="640" height="963" className="h-14 w-14 rounded-full object-cover object-[50%_15%]" />
                <div><p className="font-medium">Kunal Bhardwaj</p><p className="text-sm text-ink-muted">Business coach &amp; consultant</p></div>
              </div>
              <p className="mt-8 text-sm text-ink-muted">Share this article</p>
              <div className="mt-3 flex gap-2">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn (opens in a new tab)" className="icon-btn"><SocialIcon id="linkedin" size={16} /></a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`} aria-label="Share by email" className="icon-btn text-xs font-medium">@</a>
              </div>
            </div>
          </aside>
          <div data-article-body className="prose-kb order-1 max-w-[68ch] lg:order-2 lg:col-span-7 lg:col-start-5">
            {post.body.map((b, i) => <Block key={i} b={b} />)}
            <div className="!mt-10 rounded-[var(--radius-card)] bg-ivory-deep p-7">
              <p className="font-display text-2xl text-navy">Want help applying this to your business?</p>
              <div className="mt-5"><Pill to={site.cta.to} variant="navy">{site.cta.label}</Pill></div>
            </div>
          </div>
        </div>
      </article>

      <section className="wash section" aria-labelledby="related-title">
        <div className="shell">
          <h2 id="related-title" className="display-md" data-split>Related <em>reading</em></h2>
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3" data-stagger>
            {related.map((p) => <li key={p.slug}><ArticleCard post={p} /></li>)}
          </ul>
        </div>
      </section>
      <CTABanner image="G14" text="Tell me where your business is today and where you want it to be." />
    </div>
  )
}
