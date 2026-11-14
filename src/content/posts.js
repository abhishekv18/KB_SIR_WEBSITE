/**
 * Insights / blog posts.
 * "Business vs. Brand" is VERIFIED — Kunal's real article (22 Aug 2024), lightly formatted.
 * All other posts are DEMO titles and excerpts to show the layout; their bodies say so.
 */
const demoBody = (topic) => [
  { type: 'p', text: `Demo article. This is a sample post about ${topic}, included so the article layout, reading width and typography can be reviewed. It will be replaced by Kunal’s own writing.` },
  { type: 'h2', text: 'A sample section heading' },
  { type: 'p', text: 'Body copy is set at a comfortable reading width with generous line height. Paragraphs, headings, lists and pull quotes all have their own treatment so long articles stay easy to read.' },
  { type: 'ul', items: ['A sample list item', 'Another sample point', 'A third point to show spacing'] },
  { type: 'quote', text: 'A pull quote highlights one idea from the article.' },
  { type: 'p', text: 'Replace this demo post, or remove it, before the site goes live.' },
]

export const posts = [
  {
    slug: 'business-vs-brand',
    status: 'verified',
    title: 'Business vs. Brand: Understanding the Key Differences and Building a Strong Identity',
    excerpt: 'A business sells products or services. A brand is the perception, identity and emotional connection people have with it. Here’s how to build one.',
    category: 'Brand',
    date: '2024-08-22',
    readingTime: 4,
    image: 'G13',
    featured: true,
    body: [
      { type: 'p', text: 'In the ever-evolving world of business, distinguishing between a business and a brand is crucial. While a business refers to the operational aspect of selling products or services, a brand embodies the perception, identity, and emotional connection with its audience. Let’s look at how you can build a strong brand identity and understand the key differences between a business and a brand.' },
      { type: 'h2', text: '1. Create a brand story' },
      { type: 'p', text: 'A compelling brand story is foundational to transforming a business into a brand. Consider Nike, which crafted an iconic brand story with the release of the Air Jordans. By highlighting the journey and achievements of Michael Jordan, Nike created a narrative that resonates deeply with consumers. This storytelling approach doesn’t just sell a product; it turns it into a legacy. Crafting your unique story is vital in defining your brand and building one that people connect with.' },
      { type: 'h2', text: '2. Consumer trust' },
      { type: 'p', text: 'Trust is the bedrock of any successful brand. When consumers trust a brand, they become loyal advocates. Establishing trust involves consistency, transparency, and delivering on promises. This trust not only enhances brand perception but also strengthens the importance of branding in the marketplace.' },
      { type: 'h2', text: '3. Different from competitors' },
      { type: 'p', text: 'One hallmark of a strong brand is its ability to stand out from the competition. Take Apple, for instance. Apple’s focus on innovation and design sets it apart, making it synonymous with premium quality and user-friendly interfaces. This differentiation is not just about being different; it’s about being better in ways that matter to your audience.' },
      { type: 'quote', text: 'Differentiation is not just about being different; it’s about being better in ways that matter to your audience.' },
      { type: 'h2', text: '4. Quality of products' },
      { type: 'p', text: 'The quality of your products is a direct reflection of your brand. Apple is renowned for its product quality, which has helped it lead the smartphone market. High quality fosters positive brand perception, and the brand comes to be seen as a symbol of excellence and reliability.' },
      { type: 'h2', text: '5. After sales' },
      { type: 'p', text: 'A brand’s relationship with its customers doesn’t end at the sale. Exceptional after-sales service is a hallmark of a strong brand. Brands like Apple excel in this area by offering robust customer support, warranties, and service options, ensuring customer satisfaction and fostering long-term loyalty.' },
      { type: 'p', text: 'By focusing on these elements, you can transform a business into a strong, recognisable brand that stands the test of time.' },
    ],
  },
  { slug: 'demo-five-decisions', status: 'demo', title: 'Five decisions every owner should stop making alone', excerpt: 'Some decisions only feel like yours to make. Here is how to spot the ones your team should own, and how to hand them over without losing control.', category: 'Leadership', date: '2026-10-28', readingTime: 6, image: 'G11', body: demoBody('decision-making') },
  { slug: 'demo-one-page-plan', status: 'demo', title: 'Why a one-page plan beats a fifty-page strategy', excerpt: 'Long strategy documents rarely survive the first busy week. A single page of priorities, owners and dates usually does.', category: 'Strategy', date: '2026-10-10', readingTime: 5, image: 'G12', body: demoBody('planning') },
  { slug: 'demo-time-for-thinking', status: 'demo', title: 'Making time to think when the business never stops', excerpt: 'If every hour goes to running the business, no hour goes to steering it. Simple ways to protect time for real thinking.', category: 'Productivity', date: '2026-09-18', readingTime: 4, image: 'G42', body: demoBody('time management') },
  { slug: 'demo-hard-conversations', status: 'demo', title: 'The conversation you keep postponing', excerpt: 'The talk you keep delaying is usually the one that would change the most. How to prepare for it and start it well.', category: 'Leadership', date: '2026-08-30', readingTime: 7, image: 'G43', body: demoBody('difficult conversations') },
  { slug: 'demo-know-your-numbers', status: 'demo', title: 'Know your numbers without becoming an accountant', excerpt: 'You do not need to be an accountant to run a healthy business. You just need to watch the few figures that tell you the truth.', category: 'Strategy', date: '2026-08-12', readingTime: 5, image: 'G44', body: demoBody('business numbers') },
]

export const categories = ['All', ...new Set(posts.map((p) => p.category))]
export const getPost = (slug) => posts.find((p) => p.slug === slug)
export const formatDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
