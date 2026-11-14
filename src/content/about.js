/**
 * About page.
 * VERIFIED: role, the Minding Business name, and the positioning line from the old site
 * ("I help individuals to become their best version").
 * DRAFT (status: 'demo'): hero line, audiences, principles and the personal note. They describe the
 * coaching formats in plain terms only, with no qualifications, years, employers, results or numbers.
 * NEEDED FROM KUNAL: biography (bio), and his own wording for the note.
 */
export const about = {
  status: 'demo',
  hero: {
    title: 'The person behind *Minding Business*',
    text: 'I work with business owners who want a clearer way to run and grow their business, and the space to think before they act.',
  },
  positioning: 'I help individuals to become their *best version.*', // verified (old site)
  bio: null, // NEEDED: 2 to 4 short paragraphs in Kunal's own words
  audiences: [
    { icon: 'briefcase', title: 'Founders', text: 'Building something of their own and carrying most of the decisions.' },
    { icon: 'layers', title: 'Owner-managers', text: 'Running a business that still depends on them for almost everything.' },
    { icon: 'users', title: 'Growing teams', text: 'Moving from a few people doing everything to a team that can lead itself.' },
    { icon: 'target', title: 'Senior leaders', text: 'Leading people and results through change or growth.' },
  ],
  principles: [
    { title: 'Clarity before effort', text: 'Decide what matters first, so the work that follows counts.' },
    { title: 'Small steps, kept', text: 'Progress comes from actions you actually take, reviewed regularly.' },
    { title: 'Honest conversations', text: 'Straight questions and straight answers, in confidence.' },
  ],
  note: [
    'Most owners I meet are not short of effort. They are short of time to step back, look at the whole business and decide what deserves their attention next.',
    'That is the space coaching gives you. We look honestly at where things stand, choose a few priorities and keep them moving, session by session.',
  ],
}

/** Contact page. DRAFT: the "what happens next" steps describe the form, not a promised timeline. */
export const contactPage = {
  status: 'demo',
  steps: [
    { title: 'Send a short note', text: 'Tell me where your business is today and what you would like to change.' },
    { title: 'I reply by email', text: 'With a few questions, or a suggested time to talk.' },
    { title: 'We talk it through', text: 'An honest conversation about what is in the way and where to start.' },
  ],
}
