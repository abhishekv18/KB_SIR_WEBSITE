import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowUpRight, Link2 } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import { Breadcrumbs, DemoTag, Pill, SocialIcon } from '../components/ui'
import { formatDate, getPost, posts } from '../content/posts'
import { site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'
import { gsap, useGSAP } from '../animations/gsap'

/*
 * Article page. Same vocabulary as the other inner pages: light hero with the gold-framed photograph,
 * a calm reading column with a sticky side rail (contents, author, share), an author note and the
 * closing banner. The article text itself is Kunal's own, unchanged.
 */

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Block({ b }) {
  if (b.type === 'h2') return <h2 id={slugify(b.text)} className="scroll-mt-28">{b.text}</h2>
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>
  if (b.type === 'quote') return <blockquote>{b.text}</blockquote>
  return <p>{b.text}</p>
}

function Share({ post, url }) {
  return (
    <div className="flex gap-2">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn (opens in a new tab)" className="icon-btn"><SocialIcon id="linkedin" size={15} /></a>
      <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`} aria-label="Share by email" className="icon-btn"><Link2 size={15} strokeWidth={1.7} /></a>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams()
  const post = getPost(slug)
  const ref = useRef(null)
  const bar = useRef(null)
  useScrollReveals(ref, [slug])
  usePageIntro(ref, [slug])
  useGSAP(() => {
    if (!bar.current) return
    gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '[data-article-body]', start: 'top 30%', end: 'bottom 70%', scrub: true } })
  }, { scope: ref, dependencies: [slug], revertOnUpdate: true })

  if (!post || (post.status === 'demo' && !import.meta.env.DEV)) return <Navigate to="/insights" replace />

  const headings = post.body.filter((b) => b.type === 'h2')
  const related = posts.filter((p) => p.slug !== post.slug && p.status === 'verified').slice(0, 2) // real articles only
  const url = `${site.url}/insights/${post.slug}`
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, datePublished: post.date, author: { '@type': 'Person', name: 'Kunal Bhardwaj' }, publisher: { '@type': 'Person', name: 'Kunal Bhardwaj' }, mainEntityOfPage: url }

  return (
    <div ref={ref} key={slug}>
      <Seo title={post.title} description={post.excerpt} path={`/insights/${post.slug}`} jsonLd={post.status === 'verified' ? jsonLd : undefined} noindex={post.status === 'demo'} />
      <div ref={bar} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gold" aria-hidden />

      {/* 1 · hero: title and author left, the article photograph framed right */}
      <header className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28">
        <div aria-hidden className="pointer-events-none absolute -right-48 -top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.15),transparent)]" />
        <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6 lg:pr-4">
            <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: post.category }]} dark={false} /></div>
            <p className="hero-eyebrow lg:mt-6" data-intro>
              <span className="h-[2px] w-8 bg-gold" aria-hidden />{post.category} · {post.readingTime} min read
            </p>
            <h1 className="hero-title mt-4 !text-[clamp(1.75rem,3.2vw,2.6rem)] !leading-[1.15]">{post.title}</h1>
            <p className="lede mt-4 max-w-[48ch]" data-intro>{post.excerpt}</p>
            {post.status === 'demo' && <div data-intro><DemoTag className="mt-3">Sample article</DemoTag></div>}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-navy/12 pt-4" data-intro>
              <div className="flex items-center gap-3">
                <Img id="R3" ratio="1 / 1" position="58% 30%" className="w-11 shrink-0 rounded-full" sizes="44px" />
                <div>
                  <p className="text-[0.88rem] font-semibold">Kunal Bhardwaj</p>
                  <p className="text-[0.76rem] text-ink-muted"><time dateTime={post.date}>{formatDate(post.date)}</time></p>
                </div>
              </div>
              <Share post={post} url={url} />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[29rem] lg:ml-auto lg:mr-0">
              <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/45 sm:block" />
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media>
                <Img id={post.image} ratio="auto" priority className="aspect-[4/3.3]" sizes="(min-width:1024px) 29rem, 92vw" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2 · the article: side rail + reading column */}
      <article className="section" aria-label="Article">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-28">
              {headings.length > 1 && (
                <nav aria-label="In this article" className="hidden lg:block">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">In this article</p>
                  <ol className="mt-3 border-l border-navy/12">
                    {headings.map((h) => (
                      <li key={h.text}><a href={`#${slugify(h.text)}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.82rem] leading-snug text-navy/65 transition-colors duration-300 hover:border-gold hover:text-navy">{h.text.replace(/^\d+\.\s*/, '')}</a></li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="rounded-[16px] bg-[#FAF7F1] p-5 ring-1 ring-line">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">Written by</p>
                <img src="/assets/brand/kb-signature-colour.png" alt="Kunal Bhardwaj" width="500" height="200" className="mt-2 h-auto w-32" />
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-muted">{site.role}, Minding Business.</p>
                <Link to="/about" className="link-line mt-3 inline-block text-[0.8rem] font-semibold">About Kunal</Link>
              </div>
            </div>
          </aside>

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-8 lg:col-start-5">
            <div data-article-body className="prose-kb max-w-[42rem]">
              {post.body.map((b, i) => <Block key={i} b={b} />)}
            </div>

            <div className="mt-12 flex max-w-[42rem] flex-wrap items-center justify-between gap-4 border-y border-navy/12 py-5">
              <p className="text-[0.8rem] font-medium text-ink-muted">Found this useful? Share it.</p>
              <Share post={post} url={url} />
            </div>

            <div className="mt-8 flex max-w-[42rem] flex-col gap-5 rounded-[20px] bg-ivory-deep/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7" data-reveal="up">
              <div>
                <p className="font-display text-[1.15rem] font-semibold leading-snug">Want help applying this to your business?</p>
                <p className="body-muted mt-1 text-[0.85rem]">Let’s talk about where your business is today.</p>
              </div>
              <Pill to={site.cta.to} variant="navy" size="sm">{site.cta.label}</Pill>
            </div>

            <Link to="/insights" className="mt-8 inline-flex items-center gap-2 text-[0.88rem] font-medium"><ArrowUpRight size={16} strokeWidth={1.7} className="-rotate-[135deg] text-gold-ink" /><span className="link-line">All articles</span></Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-ivory-deep/55" aria-labelledby="related-title">
          <div className="shell">
            <p className="label" data-reveal="up">Keep reading</p>
            <h2 id="related-title" className="display-lg mt-4" data-split>More from <em>Insights</em></h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2" data-stagger>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/insights/${p.slug}`} className="group grid grid-cols-[8rem_1fr] items-center gap-5 rounded-[16px] bg-white p-3 ring-1 ring-line">
                    <div className="overflow-hidden rounded-[12px]"><Img id={p.image} ratio="4 / 3" sizes="8rem" /></div>
                    <div className="pr-3">
                      <p className="text-[0.75rem] text-ink-muted">{p.category} · {formatDate(p.date)}</p>
                      <p className="mt-1 font-display text-[1rem] font-semibold leading-snug group-hover:text-gold-ink">{p.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABanner title="Let’s talk *business.*" text="Tell me where your business is today and where you want it to be. We’ll work out the next step together." image="R13" />
    </div>
  )
}
