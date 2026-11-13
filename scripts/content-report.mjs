// Lists every demo / placeholder entry in src/content so nothing ships unnoticed.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const dir = new URL('../src/content/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
let total = 0
for (const f of readdirSync(dir)) {
  const lines = readFileSync(join(dir, f), 'utf8').split('\n')
  const hits = lines.map((l, i) => [i + 1, l]).filter(([, l]) => /status: '(demo|pending)'|DEMO|Demo |demo answer|Sample testimonial|Illustrative/i.test(l))
  if (hits.length) { console.log(`\n${f} — ${hits.length}`); hits.slice(0, 40).forEach(([n, l]) => console.log(`  ${n}: ${l.trim().slice(0, 110)}`)); total += hits.length }
}
console.log(`\n${total} demo/pending lines across src/content. Replace or switch off before launch.`)
