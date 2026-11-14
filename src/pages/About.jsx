import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Compass, ListChecks, MessagesSquare } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import Signature from '../components/Signature'
import CTABanner from '../components/CTABanner'
import { Accent, Breadcrumbs, DemoTag, IconCircle, Pill } from '../components/ui'
import { iconMap } from '../components/icons'
import YouTubeBand from '../components/YouTubeBand'
import { about } from '../content/about'
import { home, site } from '../content/site'
import { services } from '../content/services'
import { formatDate, getPost } from '../content/posts'
import { useScrollReveals } from '../animations/useScrollReveals'
import { usePageIntro } from '../animations/usePageIntro'

/*
 * About page. Same vocabulary as the homepage (labels, display headings, pill buttons, framed photographs
 * with a floating card, white icon cards, the numbers band and the closing banner), only the homepage's
 * photographs, and sections of its own: who Kunal works with, a personal note and his own writing.
 */

const PRINCIPLE_ICONS = [Compass, ListChecks, MessagesSquare]

/** Development-only marker for content Kunal still has to supply. Never shown on the live site. */
function Needed({ children }) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="mt-6 rounded-[14px] border border-dashed border-gold/60 bg-[#FAF7F1] p-4 text-[0.82rem] leading-relaxed">
      <p className="font-semibold text-gold-ink">Content needed from Kunal</p>
      <p className="mt-1 text-ink-muted">{children}</p>
    </div>
  )
}

/* 1 · hero: light; copy and Kunal's verified numbers on the left, the homepage studio photograph wide on the right */
function AboutHero() {
  const nums = home.stats.items.slice(0, 3)
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] pb-12 pt-24 sm:pt-28 lg:pb-14 lg:pt-28" aria-labelledby="about-hero">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_171_116/.16),transparent)]" />
      <div className="shell relative grid gap-8 max-lg:[&>*:last-child]:order-first sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6 lg:pr-4">
          <div data-intro className="max-lg:hidden"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} dark={false} /></div>
          <p className="hero-eyebrow lg:mt-6" data-intro>
            <span className="h-[2px] w-8 bg-gold" aria-hidden />{site.role}
          </p>
          <h1 id="about-hero" className="mt-4 hero-title">
            <Accent text={about.hero.title} />
          </h1>
          <p className="lede mt-4 max-w-[46ch]" data-intro>{about.hero.text}</p>
          {about.status === 'demo' && <div data-intro><DemoTag className="mt-3">Draft line</DemoTag></div>}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" data-intro>
            <Pill size="sm" to={site.cta.to} variant="navy">{site.cta.label}</Pill>
            <a href="#story" className="link-line inline-block py-2 text-[0.9rem] font-medium">Read my story</a>
          </div>

          {/* verified numbers from the original site */}
          <dl className="mt-7 grid grid-cols-3 rounded-[16px] bg-white p-4 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line lg:rounded-none lg:bg-transparent lg:p-0 lg:pt-4 lg:shadow-none lg:ring-0 lg:border-t lg:border-navy/12" data-intro>
            {nums.map((n, i) => (
              <div key={n.label} className={i > 0 ? 'border-l border-navy/12 pl-4 sm:pl-6' : 'pr-4'}>
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-none tracking-[-0.02em] text-navy">{n.value}<span className="text-gold-heading">{n.suffix}</span></span>
                  <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{n.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[33.5rem] lg:ml-auto lg:mr-0">
            <span aria-hidden className="absolute -right-3 -top-3 bottom-10 left-10 hidden rounded-[28px] border border-gold/45 sm:block" />
            {/* floating quote: Kunal's verified line, filling the space between copy and photo */}
            <div className="absolute -left-16 top-10 z-10 hidden w-60 rounded-[16px] bg-white p-4 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line lg:block" data-intro>
              <span className="font-display text-[2rem] leading-none text-gold" aria-hidden>“</span>
              <p className="-mt-2 font-display text-[0.98rem] font-semibold leading-snug [&_em]:not-italic [&_em]:text-gold-heading"><Accent text={about.positioning} /></p>
              <p className="mt-2 text-[0.72rem] text-ink-muted">Kunal Bhardwaj</p>
            </div>
            <div className="relative overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-intro-media>
              <picture>
                <source media="(max-width: 639px)" srcSet="/assets/portraits/kb-studio-tall-640.webp 640w, /assets/portraits/kb-studio-tall-820.webp 820w" sizes="92vw" />
                <img
                  src="/assets/portraits/kb-studio-1600.webp"
                  srcSet="/assets/portraits/kb-studio-1024.webp 1024w, /assets/portraits/kb-studio-1600.webp 1600w"
                  sizes="(min-width:1024px) 36rem, 92vw"
                  alt="Kunal Bhardwaj at his desk in his studio, hands clasped"
                  width="1600"
                  height="900"
                  fetchPriority="high"
                  className="aspect-[4/3.6] w-full object-cover object-[50%_22%] sm:aspect-[4/3.3] sm:object-[70%_30%]"
                />
              </picture>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.45),transparent_40%)]" />
              <p className="absolute bottom-4 right-5 hidden items-center gap-2 text-[0.75rem] font-medium text-white/85 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />Minding Business</p>
            </div>
            <div className="relative -mt-8 ml-auto mr-3 w-[72%] max-w-[14rem] rounded-[14px] bg-white p-3.5 shadow-[0_30px_60px_-30px_rgb(36_48_63/.55)] ring-1 ring-line sm:absolute sm:-bottom-7 sm:-left-7 sm:m-0 sm:w-52" data-intro>
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-gold-ink"><span className="h-px w-4 bg-gold" />Founder</span>
              <img src="/assets/brand/kb-signature-colour.png" alt="Kunal Bhardwaj" width="500" height="200" className="mt-1 h-auto w-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 2 · story */
function Story() {
  return (
    <section id="story" className="section scroll-mt-24" aria-labelledby="story-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">My story</p>{home.about.status === 'demo' && <DemoTag>Draft copy</DemoTag>}</div>
          <h2 id="story-title" className="display-lg mt-4" data-split>Clear thinking for <em>busy owners</em></h2>
          {home.about.text.map((t, i) => <p key={i} className="body-copy mt-4" data-reveal="up">{t}</p>)}
          {(about.bio || []).map((t, i) => <p key={`b${i}`} className="body-copy mt-4" data-reveal="up">{t}</p>)}
          {!about.bio && <Needed>Kunal’s background in his own words: where he started, the kind of businesses he works with, and what led him to coaching (two to four short paragraphs).</Needed>}
          <figure className="mt-8 border-l-2 border-gold pl-5" data-reveal="up">
            <blockquote className="font-display text-[clamp(1.1rem,1.6vw,1.35rem)] font-semibold leading-snug [&_em]:not-italic [&_em]:text-gold-heading"><Accent text={about.positioning} /></blockquote>
            <figcaption className="mt-2 text-[0.78rem] text-ink-muted">Kunal Bhardwaj</figcaption>
          </figure>
        </div>
        <div className="relative lg:col-span-6 lg:pl-10">
          <div className="relative mx-auto max-w-[22rem] sm:max-w-[26rem] lg:mr-0">
            <div className="overflow-hidden rounded-[24px] shadow-[0_44px_80px_-50px_rgb(21_28_38/.75)]" data-reveal="clip">
              <div data-parallax="4" className="scale-[1.08]"><Img id="R8" ratio="4 / 4.4" position="50% 30%" sizes="(min-width:1024px) 26rem, 88vw" /></div>
            </div>
            <div className="relative -mt-8 ml-3 mr-auto w-[74%] max-w-[15rem] rounded-[12px] bg-navy px-4 py-3.5 text-white shadow-[0_30px_50px_-30px_rgb(21_28_38/.8)] sm:absolute sm:-bottom-5 sm:-right-6 sm:m-0 sm:w-56" data-reveal="up" data-delay="0.3">
              <p className="font-display text-[0.98rem] font-semibold">{home.about.card.title}</p>
              <p className="mt-1 text-[0.76rem] leading-relaxed text-white/70">{home.about.card.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3 · who I work with: a hairline-ruled row of four, lighter than cards */
function Audiences() {
  return (
    <section className="section pt-0" aria-labelledby="who-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">Who I work with</p>{about.status === 'demo' && <DemoTag>Draft</DemoTag>}</div>
            <h2 id="who-title" className="display-lg mt-4" data-split>Owners carrying <em>too much</em></h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">Different stages, the same need: room to think and someone honest to think with.</p>
        </div>
        <ul className="mt-7 grid grid-cols-1 border-t border-navy/12 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {about.audiences.map((a, i) => {
            const Icon = iconMap[a.icon]
            return (
              <li key={a.title} className={`flex gap-4 border-b border-navy/12 py-6 sm:py-7 lg:block lg:border-b-0 lg:px-6 lg:py-8 ${i > 0 ? 'lg:border-l' : 'lg:pl-0'} ${i % 2 ? 'sm:border-l sm:pl-6 lg:pl-6' : ''}`}>
                <IconCircle Icon={Icon} size="sm" />
                <div className="lg:mt-5">
                  <h3 className="card-title">{a.title}</h3>
                  <p className="card-text mt-1.5">{a.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* 4 · how I work: the homepage's white icon cards */
function Principles() {
  return (
    <section className="section bg-mist" aria-labelledby="principles-title">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3"><p className="label" data-reveal="up">How I work</p>{about.status === 'demo' && <DemoTag>Draft</DemoTag>}</div>
            <h2 id="principles-title" className="display-lg mt-4" data-split>Three things I <em>hold to</em></h2>
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9 lg:pb-1.5" data-reveal="up">Simple habits that keep every coaching relationship honest and useful.</p>
        </div>
        <ul className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4" data-stagger>
          {about.principles.map((p, i) => {
            const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length]
            return (
              <li key={p.title} className="group relative overflow-hidden rounded-[14px] bg-white p-5 shadow-[0_18px_36px_-30px_rgb(36_48_63/.45)] ring-1 ring-line transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] sm:p-6 [@media(hover:hover)]:hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-6" />
                <div className="flex items-start justify-between">
                  <IconCircle Icon={Icon} size="sm" />
                  <span className="text-[0.74rem] font-semibold tabular-nums tracking-[0.12em] text-gold-ink/70">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 card-title">{p.title}</h3>
                <p className="card-text mt-1.5">{p.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* 6 · a personal note, set like a letter and signed */
function Note() {
  return (
    <section className="section" aria-labelledby="note-title">
      <div className="shell">
        <div className="mx-auto max-w-[42rem]">
          <div className="flex items-center gap-4" data-reveal="up">
            <Img id="R3" ratio="1 / 1" position="58% 30%" className="w-14 shrink-0 rounded-full" sizes="56px" />
            <div>
              <h2 id="note-title" className="label">A note from Kunal</h2>
              {about.status === 'demo' && <DemoTag className="mt-1.5">Draft, for Kunal to rewrite</DemoTag>}
            </div>
          </div>
          <div className="mt-7 space-y-5">
            {about.note.map((t, i) => (
              <p key={i} className="font-display text-[clamp(1.05rem,1.5vw,1.22rem)] font-medium leading-[1.6] text-navy" data-reveal="up">{t}</p>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between gap-6 border-t border-navy/10 pt-6" data-reveal="up">
            <Signature className="w-36" />
            <Link to={site.cta.to} className="link-line py-2 text-[0.9rem] font-medium">Start a conversation</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 7 · ways to work together: the homepage service photographs as tiles */
function Formats() {
  return (
    <section className="section" aria-labelledby="formats-title">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label" data-reveal="up">Working together</p>
            <h2 id="formats-title" className="display-lg mt-4" data-split>Four ways to <em>start</em></h2>
          </div>
          <Link to="/services" className="link-line self-start py-2 text-[0.9rem] font-medium sm:self-auto" data-reveal="up">See all services</Link>
        </div>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stagger>
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`} className="group relative block overflow-hidden rounded-[16px]">
                <Img id={s.cardImage} ratio="auto" className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/4.4]" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" sizes="(min-width:1024px) 18rem, 48vw" />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(21_28_38/.88)_0%,rgb(21_28_38/.2)_48%,transparent_70%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 text-white sm:p-4">
                  <div>
                    <p className="text-[0.68rem] font-medium text-white/70">{s.pill}</p>
                    <p className="mt-0.5 font-display text-[0.95rem] font-semibold leading-snug sm:text-[1.05rem]">{s.title}</p>
                  </div>
                  <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-white/90 text-navy transition-transform duration-500 group-hover:-rotate-45 sm:grid" aria-hidden><ArrowUpRight size={15} strokeWidth={1.8} /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 8 · from my writing: Kunal's real article */
function Writing() {
  const post = getPost('business-vs-brand')
  if (!post) return null
  return (
    <section className="section pt-0" aria-labelledby="writing-title">
      <div className="shell">
        <h2 id="writing-title" className="label" data-reveal="up">From my writing</h2>
        <Link to={`/insights/${post.slug}`} className="group mt-6 grid items-center gap-6 rounded-[20px] bg-[#FAF7F1] p-3 ring-1 ring-line sm:grid-cols-12 sm:gap-8 sm:p-4" data-reveal="up">
          <div className="overflow-hidden rounded-[14px] sm:col-span-5"><Img id={post.image} ratio="auto" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" sizes="(min-width:640px) 30rem, 100vw" /></div>
          <div className="px-2 pb-3 sm:col-span-7 sm:px-0 sm:pb-0 sm:pr-6">
            <p className="flex flex-wrap items-center gap-2.5 text-[0.78rem] text-ink-muted">
              <span className="font-semibold text-gold-ink">{post.category}</span><span className="h-px w-3 bg-gold" aria-hidden /><time dateTime={post.date}>{formatDate(post.date)}</time><span className="h-px w-3 bg-gold" aria-hidden /><span>{post.readingTime} min read</span>
            </p>
            <p className="mt-3 font-display text-[clamp(1.15rem,1.8vw,1.45rem)] font-semibold leading-snug transition-colors duration-300 group-hover:text-gold-ink">{post.title}</p>
            <p className="card-text mt-2.5 line-clamp-2">{post.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-semibold">
              Read the article
              <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-ivory transition-transform duration-500 group-hover:-rotate-45" aria-hidden><ArrowUpRight size={15} strokeWidth={1.8} /></span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default function About() {
  const ref = useRef(null)
  useScrollReveals(ref)
  usePageIntro(ref)

  return (
    <div ref={ref}>
      <Seo title="About" description="About Kunal Bhardwaj, business coach and consultant behind Minding Business." path="/about" />
      <AboutHero />
      <Story />
      <Audiences />
      <Principles />
      <YouTubeBand />
      <Note />
      <Formats />
      <Writing />
      <CTABanner title="Let’s talk *business.*" text="Tell me where your business is today and where you want it to be. We’ll work out the next step together." image="R13" />
    </div>
  )
}
