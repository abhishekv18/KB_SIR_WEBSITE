import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Search } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import CTABanner from '../components/CTABanner'
import { categories, posts } from '../content/posts'
import { useScrollReveals } from '../animations/useScrollReveals'

export default function Insights() {
  const ref = useRef(null)
  useScrollReveals(ref)
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(6)
  const featured = posts.find((p) => p.featured) ?? posts[0]

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return posts.filter((p) => p !== featured && (cat === 'All' || p.category === cat) && (!term || `${p.title} ${p.excerpt}`.toLowerCase().includes(term)))
  }, [cat, q, featured])

  return (
    <div ref={ref}>
      <Seo title="Insights" description="Articles by Kunal Bhardwaj on strategy, brand, leadership and running a business." path="/insights" />
      <PageHero variant="editorial" crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} title="Insights for owners who *think ahead*" text="Practical thinking on strategy, brand, leadership and the everyday work of running a business." />

      <section className="pb-20" aria-label="Featured article">
        <div className="shell" data-reveal="up"><ArticleCard post={featured} variant="featured" headingLevel={2} /></div>
      </section>

      <section className="wash section" aria-labelledby="all-title">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="all-title" className="display-md" data-split>All <em>articles</em></h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button key={c} type="button" aria-pressed={cat === c} onClick={() => { setCat(c); setShown(6) }}
                    className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${cat === c ? 'border-navy bg-navy text-ivory' : 'border-navy/15 bg-white hover:border-navy/40'}`}>{c}</button>
                ))}
              </div>
              <label className="relative block">
                <span className="sr-only">Search articles</span>
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="h-11 w-full rounded-full border border-navy/15 bg-white pl-10 pr-4 text-sm outline-none focus:border-navy sm:w-56" />
              </label>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">{list.length} articles shown</p>
          <motion.ul layout className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.slice(0, shown).map((p) => (
                <motion.li key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <ArticleCard post={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {list.length === 0 && (
            <div className="mt-12 rounded-[var(--radius-card)] border border-dashed border-navy/20 p-10 text-center">
              <p className="font-display text-2xl">No articles match that search.</p>
              <button type="button" onClick={() => { setQ(''); setCat('All') }} className="mt-4 text-sm font-medium underline decoration-gold underline-offset-4">Show all articles</button>
            </div>
          )}
          {list.length > shown && (
            <div className="mt-10 flex justify-center"><button type="button" onClick={() => setShown((n) => n + 6)} className="pill pill-outline">Load more articles</button></div>
          )}
        </div>
      </section>

      <CTABanner image="G11" title="Want to talk it *through?*" text="If an article raised a question about your own business, let’s discuss it." />
    </div>
  )
}
