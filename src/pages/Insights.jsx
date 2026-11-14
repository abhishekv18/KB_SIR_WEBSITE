import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Compass, Megaphone, Timer, Users } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import CTABanner from '../components/CTABanner'
import ShortsRow from '../components/ShortsRow'
import { Accent, Breadcrumbs, DemoTag, IconCircle, Pill, SocialIcon } from '../components/ui'
import { formatDate, posts } from '../content/posts'
import { home, site } from '../content/site'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * Insights page. Same vocabulary as the homepage, About and Services: light hero with the gold-framed
 * photograph, labels and display headings, the homepage article cards, white icon cards and the
 * closing banner. Sample posts appear in development only; the live list shows Kunal's real writing.
 */

const visible = import.meta.env.DEV ? posts : posts.filter((p) => p.status === 'verified')

// DRAFT one-line descriptions of the topics Kunal writes about
const TOPICS = [
  { name: 'Brand', Icon: Megaphone, text: 'How people see, remember and choose your business.' },
  { name: 'Strategy', Icon: Compass, text: 'Choosing what matters and turning it into a plan you keep.' },
  { name: 'Leadership', Icon: Users, text: 'Leading people so the business does not depend on you alone.' },
  { name: 'Productivity', Icon: Timer, text: 'Protecting time for the work that actually moves things.' },
]

function Meta({ post, className = '' }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.78rem] text-ink-muted ${className}`}>
      <span className="font-semibold text-gold-ink">{post.category}</span>
      <span className="h-px w-3 bg-gold" aria-hidden />
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="h-px w-3 bg-gold" aria-hidden />
      <span>{post.readingTime} min read</span>
    </p>
  )
}

/* 1 · hero: copy left, an editorial photograph in the gold-framed treatment right (no article here) */
function InsightsHero() {
  const intro = home.insightsIntro
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="insights-hero">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.15),transparent)]" />
      <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6 lg:pr-4">
          <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} dark={false} /></div>
          <p className="hero-eyebrow lg:mt-6" data-intro>
            <span className="h-[2px] w-8 bg-gold" aria-hidden />{intro.label}
          </p>
          <h1 id="insights-hero" className="mt-4 hero-title">
            <Accent text={intro.title} />
          </h1>
          <p className="lede mt-4 max-w-[46ch]" data-intro>Practical thinking on strategy, brand and running a business, written for owners who would rather build something lasting than chase the next quick fix.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
            <Pill size="sm" href="#articles" variant="navy">Read the articles</Pill>
            <Link to={site.cta.to} className="link-line inline-block py-2 text-[0.9rem] font-medium">{site.cta.label}</Link>
          </div>
          <div className="mt-9 border-t border-navy/12 pt-4" data-intro>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">Topics</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <li key={t.name}><a href="#topics" className="inline-flex items-center rounded-full border border-navy/12 bg-white px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory">{t.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-[31rem] lg:ml-auto lg:mr-0">
            <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/45 sm:block" />
            {/* floating note: what the articles are like */}
            <div className="absolute -left-16 top-10 z-10 hidden w-56 rounded-[16px] bg-white p-4 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line lg:block" data-intro>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 text-gold-ink" aria-hidden><Timer size={16} strokeWidth={1.6} /></span>
              <p className="mt-3 font-display text-[0.98rem] font-semibold leading-snug">Short, practical reads</p>
              <p className="mt-1 text-[0.76rem] leading-snug text-ink-muted">Plain-language articles you can finish in a few minutes.</p>
            </div>
            <div className="relative overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media>
              <Img id="G47" ratio="auto" priority className="aspect-[4/3.3]" sizes="(min-width:1024px) 31rem, 92vw" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.4),transparent_40%)]" />
            </div>
            <div className="relative -mt-8 ml-auto mr-3 w-[72%] max-w-[15rem] rounded-[14px] bg-white p-4 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line sm:absolute sm:-bottom-7 sm:-left-7 sm:m-0 sm:w-56" data-intro>
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-gold-ink"><span className="h-px w-4 bg-gold" />Written by</span>
              <img src="/assets/brand/kb-signature-colour.png" alt="Kunal Bhardwaj" width="500" height="200" className="mt-1 h-auto w-28" />
              <p className="mt-1 text-[0.74rem] leading-snug text-ink-muted">Notes on strategy, brand and running a business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 2 · all articles: an editorial spread (lead story, two side stories, then a numbered index) */
function Tag({ post }) {
  return post.status === 'demo' ? <DemoTag className="ml-1 !py-0 !text-[0.66rem]">Sample</DemoTag> : null
}

function LeadStory({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-[20px]"><Img id={post.image} ratio="auto" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" sizes="(min-width:1024px) 40rem, 100vw" /></div>
      <div className="mt-5 flex flex-wrap items-center gap-2"><Meta post={post} /><Tag post={post} /></div>
      <h3 className="mt-3 max-w-[30ch] font-display text-[clamp(1.35rem,2.1vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.01em] transition-colors duration-300 group-hover:text-gold-ink">{post.title}</h3>
      <p className="body-copy mt-3 max-w-[56ch]">{post.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-semibold">Read the article<span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-ivory transition-transform duration-500 group-hover:-rotate-45" aria-hidden><ArrowUpRight size={15} strokeWidth={1.8} /></span></span>
    </Link>
  )
}

function SideStory({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="group grid grid-cols-[8.5rem_1fr] items-start gap-5 border-b border-navy/12 py-6 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_1fr]">
      <div className="overflow-hidden rounded-[14px]"><Img id={post.image} ratio="auto" className="aspect-[4/3.2]" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" sizes="11rem" /></div>
      <div>
        <div className="flex flex-wrap items-center gap-1.5"><Meta post={post} /></div>
        <h3 className="mt-2 card-title transition-colors duration-300 group-hover:text-gold-ink sm:text-[1.1rem]">{post.title}</h3>
        <p className="card-text mt-1.5 line-clamp-2 hidden sm:block">{post.excerpt}</p>
        <Tag post={post} />
      </div>
    </Link>
  )
}

function IndexRow({ post, n }) {
  return (
    <li className="border-b border-navy/12">
      <Link to={`/insights/${post.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[3.5rem_1fr_12rem_auto] sm:gap-6">
        <span className="font-display text-[1.4rem] font-light tabular-nums text-navy/30 transition-colors duration-300 group-hover:text-gold-heading">{String(n).padStart(2, '0')}</span>
        <span>
          <span className="block font-display text-[1rem] font-semibold leading-snug transition-colors duration-300 group-hover:text-gold-ink sm:text-[1.1rem]">{post.title}</span>
          <span className="mt-1 block text-[0.78rem] text-ink-muted sm:hidden">{post.category} · {formatDate(post.date)}</span>
        </span>
        <span className="hidden text-[0.8rem] text-ink-muted sm:block"><span className="font-semibold text-gold-ink">{post.category}</span> · {formatDate(post.date)}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 transition-[background-color,border-color,color,transform] duration-500 group-hover:-rotate-45 group-hover:border-navy group-hover:bg-navy group-hover:text-ivory" aria-hidden><ArrowUpRight size={15} strokeWidth={1.7} /></span>
      </Link>
    </li>
  )
}

function Articles({ featured }) {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...TOPICS.map((t) => t.name).filter((c) => visible.some((p) => p.category === c))]
  // the featured article leads the list; the rest follow by date order in the content file
  const ordered = useMemo(() => (featured ? [featured, ...visible.filter((p) => p !== featured)] : visible), [featured])
  const list = useMemo(() => ordered.filter((p) => cat === 'All' || p.category === cat), [cat, ordered])
  if (!visible.length) return null
  const [lead, ...rest] = list
  const side = rest.slice(0, 2)
  const index = rest.slice(2)
  return (
    <section id="articles" className="section scroll-mt-24" aria-labelledby="articles-title">
      <div className="shell">
        <div className="flex flex-col gap-6 border-b border-navy/12 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label" data-reveal="up">Latest writing</p>
            <h2 id="articles-title" className="display-lg mt-4" data-split>All <em>articles</em></h2>
          </div>
          {cats.length > 2 && (
            <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2" data-reveal="up">
              {cats.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                  className={`min-h-10 rounded-full border px-4 text-[0.8rem] font-medium transition-colors duration-300 ${cat === c ? 'border-navy bg-navy text-ivory' : 'border-navy/15 bg-white hover:border-navy/40'}`}>{c}</button>
              ))}
            </div>
          )}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} articles shown</p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            {list.length === 0 ? (
              <p className="body-muted mt-10 text-[0.9rem]">No articles on this topic yet.</p>
            ) : (
              <>
                <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className={side.length ? 'lg:col-span-7' : 'lg:col-span-8'}><LeadStory post={lead} /></div>
                  {side.length > 0 && <div className="lg:col-span-5 lg:border-l lg:border-navy/12 lg:pl-10">{side.map((p) => <SideStory key={p.slug} post={p} />)}</div>}
                </div>
                {index.length > 0 && (
                  <div className="mt-14">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">Also worth reading</p>
                    <ol className="mt-3 border-t border-navy/12">{index.map((p, i) => <IndexRow key={p.slug} post={p} n={i + 1} />)}</ol>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* 3 · topics: the homepage's white icon cards */
function Topics() {
  return (
    <section id="topics" className="section scroll-mt-24 bg-mist" aria-labelledby="topics-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">What I write about</p><DemoTag>Draft</DemoTag></div>
            <h2 id="topics-title" className="display-lg mt-4" data-split>Four themes, <em>one business</em></h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">Every article comes back to the same question: what helps an owner build a business that runs well?</p>
        </div>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4" data-stagger>
          {TOPICS.map((t) => {
            const count = visible.filter((p) => p.category === t.name).length
            return (
              <li key={t.name} className="group relative overflow-hidden rounded-[14px] bg-white p-5 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line transition-transform duration-700 ease-[var(--ease-out-expo)] sm:p-6 [@media(hover:hover)]:hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-6" />
                <div className="flex items-start justify-between">
                  <IconCircle Icon={t.Icon} size="sm" />
                  <span className="text-[0.72rem] font-semibold tabular-nums text-gold-ink/70">{count} {count === 1 ? 'article' : 'articles'}</span>
                </div>
                <h3 className="mt-4 card-title">{t.name}</h3>
                <p className="card-text mt-1.5">{t.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* 4 · five ideas, taken word for word from Kunal's real article */
function KeyIdeas() {
  const post = posts.find((p) => p.slug === 'business-vs-brand')
  if (!post) return null
  const ideas = []
  post.body.forEach((b, i) => {
    if (b.type !== 'h2') return
    const next = post.body.slice(i + 1).find((x) => x.type === 'p')
    ideas.push({ title: b.text.replace(/^\d+\.\s*/, ''), text: next ? next.text.split(/(?<=\.)\s/)[0] : '' })
  })
  const quote = post.body.find((b) => b.type === 'quote')
  return (
    <section className="section" aria-labelledby="ideas-title">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label" data-reveal="up">From the latest article</p>
            <h2 id="ideas-title" className="display-lg mt-4" data-split>Five ideas from <em>Business vs. Brand</em></h2>
            <p className="body-copy mt-4 max-w-[42ch]" data-reveal="up">The short version of what turns a business into a brand people remember.</p>
            {quote && (
              <figure className="mt-8 border-l-2 border-gold pl-5" data-reveal="up">
                <blockquote className="font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold leading-snug">“{quote.text}”</blockquote>
                <figcaption className="mt-2 text-[0.78rem] text-ink-muted">Kunal Bhardwaj</figcaption>
              </figure>
            )}
            <div className="mt-8" data-reveal="up"><Pill to={`/insights/${post.slug}`} variant="navy" size="sm">Read the full article</Pill></div>
          </div>
        </div>
        <ol className="border-t border-navy/12 lg:col-span-7" data-stagger>
          {ideas.map((it, i) => (
            <li key={it.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-navy/12 py-6 sm:grid-cols-[4rem_1fr] sm:py-7">
              <span className="font-display text-[1.6rem] font-light leading-none tabular-nums text-gold-heading">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="card-title">{it.title}</h3>
                <p className="card-text mt-1.5 max-w-[56ch]">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 6 · prefer to watch: Kunal's real YouTube Shorts on the same themes */
function Watch() {
  const v = home.video
  return (
    <section className="section" aria-labelledby="watch-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label" data-reveal="up">Prefer to watch?</p>
            <h2 id="watch-title" className="display-lg mt-4" data-split>The same ideas, <em>in a minute</em></h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">
            <p className="lede">Short lessons on brand and business from Kunal’s YouTube channel.</p>
            <a href={v.channelUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[0.88rem] font-medium shadow-[0_10px_30px_-18px_rgb(36_48_63/.5)] ring-1 ring-line transition-transform duration-500 hover:-translate-y-0.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0000] text-white" aria-hidden><SocialIcon id="youtube" size={14} /></span>
              Subscribe on YouTube<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="mt-9"><ShortsRow shorts={v.shorts} channelUrl={v.channelUrl} /></div>
      </div>
    </section>
  )
}

export default function Insights() {
  const ref = useRef(null)
  useScrollReveals(ref)
  usePageIntro(ref)
  const featured = visible.find((p) => p.featured) ?? visible[0]
  return (
    <div ref={ref}>
      <Seo title="Insights" description="Articles by Kunal Bhardwaj on strategy, brand, leadership and running a business." path="/insights" />
      <InsightsHero />
      <Articles featured={featured} />
      <KeyIdeas />
      <Topics />
      <Watch />
      <CTABanner title="Want to talk it *through?*" text="If an article raised a question about your own business, let’s discuss it." image="R13" />
    </div>
  )
}
