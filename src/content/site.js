/**
 * Site-wide content.
 * Status legend used across src/content:
 *   'verified' — genuine, from kunalbharadwaj.com or supplied by the owner
 *   'demo'     — TEMPORARY mock content for layout review. Replace before launch.
 * Run `npm run content:report` to list every demo entry.
 */

export const site = {
  name: 'Kunal Bhardwaj', // verified (logo spelling)
  tagline: 'Minding Business', // verified
  role: 'Business coach & consultant', // verified
  url: 'https://kunalbharadwaj.com',
  email: 'info@kunalbharadwaj.com', // verified
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhardwaj-kunal/' }, // verified
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCnYh33veGusUmJWAa74lldg' }, // verified
  ],
  nav: [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Success Stories', to: '/success-stories' },
    { label: 'Insights', to: '/insights' },
  ],
  footerNav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Methodology', to: '/methodology' },
    { label: 'Success Stories', to: '/success-stories' },
    { label: 'Insights', to: '/insights' },
    { label: 'Contact', to: '/contact' },
  ],
  cta: { label: 'Book a consultation', to: '/contact' },
  /** Floating WhatsApp button. Set `number` to Kunal's WhatsApp number in international format,
   *  digits only (e.g. '919876543210'). While it is null the button shows only in development. */
  whatsapp: { number: null, message: 'Hi Kunal, I found your website and would like to talk about my business.' },

  /** Form + newsletter providers. No backend exists — see docs/PROJECT_ARCHITECTURE.md.
   *  formEndpoint: set to a Formspree / Web3Forms URL once chosen; until then the form
   *  hands off to the visitor's email app (and says so on the button). */
  formEndpoint: null,
  newsletterEnabled: false, // footer newsletter is hidden until a real provider is configured
}

/* ---------------- Home ---------------- */
export const home = {
  hero: {
    status: 'demo',
    // DEMO: headline + supporting line pending owner copy
    titleLines: ['Grow your business', 'with a *clearer mind.*'],
    text: 'Business coaching and consulting for owners who are ready to stop guessing and start growing.',
    // DEMO: offer facts (not statistics) — confirm before launch
    strip: [
      { icon: 'users', title: '1:1 & group', text: 'Coaching formats' },
      { icon: 'map', title: 'Online & in person', text: 'Session options' },
      { icon: 'briefcase', title: 'Founders & SMEs', text: 'Who I work with' },
      { icon: 'compass', title: 'Strategy & accountability', text: 'How I help' },
    ],
  },
  trust: {
    status: 'verified', // client logos from the current kunalbharadwaj.com — confirmed as real clients by the owner (12 Nov 2026)
    eyebrow: 'Trusted by',
    label: 'Partners and *Clients*',
    // Marquee band under the hero. White logos on transparent PNG; `h` = display height in px (optical balance).
    logos: [
      { src: '/assets/logos/la-coach-base.png', colour: '/assets/logos/la-coach-base-colour.png', alt: 'LA Coach Base', h: 46 },
      { src: '/assets/logos/ariende-garde.png', colour: '/assets/logos/ariende-garde-colour.png', alt: 'Ariende Garde', h: 46 },
      { src: '/assets/logos/undify.png', colour: '/assets/logos/undify-colour.png', alt: 'Undify', h: 44 },
      { src: '/assets/logos/bridgette.png', colour: '/assets/logos/bridgette-colour.png', alt: 'Bridgette', h: 30 },
      { src: '/assets/logos/holp.png', colour: '/assets/logos/holp-colour.png', alt: 'HOLP', h: 30 },
    ],
    // Used only if `logos` is emptied: Kunal's areas of work.
    items: ['Business Strategy', 'Brand Building', 'Leadership', 'Growth Planning', 'Team Alignment', 'Accountability', 'Customer Experience', 'Decision Making'],
  },
  about: {
    status: 'demo',
    label: 'About Kunal',
    title: 'Meet Kunal Bhardwaj, your *business growth partner*',
    text: [
      // DRAFT copy (status: demo) — written from verified facts only; Kunal to review before launch.
      'Kunal works with business owners who are carrying too much: every decision, every fire, every plan that never quite gets started. His job is to help you think clearly, decide what matters and follow through.',
      'Through one-to-one, face-to-face, group and executive coaching, he helps owners build businesses that run on clear priorities rather than constant pressure, and become the best version of themselves along the way.',
    ],
    note: 'Business coach and consultant behind Minding Business.',
    card: { title: 'Minding Business', text: 'Coaching built around how your business actually runs.' },
  },
  challenges: {
    status: 'demo',
    label: 'Sound familiar?',
    title: 'Running the business, or is it *running you?*',
    intro: 'Most owners don’t lack effort. They lack the time and distance to think. These are the problems coaching is built to solve.',
    items: [
      { icon: 'trending', title: 'Growth has stalled', text: 'Revenue has plateaued and more hours aren’t moving it.' },
      { icon: 'layers', title: 'You’re wearing every hat', text: 'Sales, operations and hiring all still run through you.' },
      { icon: 'map', title: 'There’s no clear plan', text: 'Busy every week, without a direction for the year.' },
      { icon: 'users', title: 'The team isn’t aligned', text: 'People work hard but pull in different directions.' },
    ],
    card: { title: 'How I help', text: 'Clear priorities, a simple plan and someone to keep you accountable.' },
  },
  servicesIntro: {
    label: 'Coaching services',
    title: 'Coaching shaped around *your business*',
    text: 'One-to-one, face-to-face, in a group or at leadership level. Choose the format that fits how you work.',
  },
  methodIntro: {
    label: 'How it works',
    // Headings and step titles from the current kunalbharadwaj.com ("Simple Steps to Success").
    // Step descriptions are DEMO copy (the old site had placeholder text) — confirm with Kunal.
    title: 'Simple steps to *success*',
    lead: 'It all starts with a single first step.',
    text: 'Coaching works best when it is simple. You decide to change something, we talk, you commit to the work, and the business starts to look different.',
    steps: [
      { title: 'Make a decision', text: 'Decide that the way things run today is not how they have to run. That choice is the real first step.', image: 'S02' },
      { title: 'Schedule a meeting', text: 'Book a consultation. We talk through where the business is, where you want it to go and what is in the way.', image: 'S03' },
      { title: 'Show commitment', text: 'We agree a plan and a rhythm of sessions. You do the work between them; I keep you focused and accountable.', image: 'S04' },
      { title: 'Transformation completed', text: 'Clearer priorities, better decisions and a business that depends less on you. Results you can see and keep.', image: 'S05' },
    ],
    ready: { title: 'Ready to *start?*', text: 'Tell me where your business is today. We will work out the first step together.', cta: 'Let’s talk' },
  },
  stats: {
    // From the current kunalbharadwaj.com counters — confirmed as real by the owner (12 Nov 2026).
    status: 'verified',
    image: 'S01',
    items: [
      { value: 500, suffix: '+', label: 'Happy clients' },
      { value: 70, suffix: '', label: 'Online courses' },
      { value: 100, suffix: '%', label: 'Satisfaction' },
      { value: 100, suffix: '%', label: 'Support' },
    ],
  },
  video: {
    status: 'verified', // real videos from Kunal's YouTube channel (feed checked 12 Nov 2026)
    label: 'Watch & learn',
    title: 'See how Kunal thinks about *brand and business*',
    text: 'Short, practical lessons from Kunal’s YouTube channel on building a business people remember.',
    // Main video — any YouTube URL. Poster uses Kunal's own photo (the YouTube thumbnail shows third-party celebrities).
    url: 'https://www.youtube.com/watch?v=UIpp44oFm9Y',
    meta: 'Branding 101',
    caption: 'How to build a brand that stands out in a crowded market',
    thumbnail: 'R6', // Kunal at his podcast microphone (graded); the About section uses the speaking photo (R7)
    channelUrl: 'https://www.youtube.com/channel/UCnYh33veGusUmJWAa74lldg',
    // YouTube Shorts from the same channel (titles tidied, hashtags removed)
    shorts: [
      { id: 'C0e7Xxdh3YI', title: 'Build unbreakable brand loyalty' },
      { id: 'wFOyFxUo7VQ', title: 'The power of brand storytelling' },
      { id: 'xyJcjpS0A1g', title: 'A unique brand identity sets you apart' },
      { id: 'JIIOA0qrWyY', title: 'Know your audience, grow your business' },
    ],
  },
  insightsIntro: {
    label: 'Insights',
    title: 'Ideas for building a *stronger business*',
    text: 'Practical thinking on strategy, brand and running a business, written for owners.',
  },
  testimonialsIntro: {
    label: 'Testimonials',
    title: 'What my *clients* are saying',
    text: 'Hear from business owners who now run their companies with clearer plans and steadier decisions.',
  },
  finalCta: {
    status: 'verified-headline',
    title: 'Let’s talk *business.*', // verified ("Let's Talk Business" from the contact page)
    text: 'Tell me where your business is today and where you want it to be. We’ll work out the next step together.', // demo
    image: 'R13', // Kunal in his office (gold-lit hexagon wall)
  },
}
