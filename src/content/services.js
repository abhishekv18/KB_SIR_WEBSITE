/**
 * Coaching services.
 * VERIFIED: the four service names (old kunalbharadwaj.com).
 * DRAFT (status: 'demo'): every description and list below. It was written to show the layout and
 * describes each format in plain terms only; it makes no promises, prices, durations or results.
 * Kunal to confirm or rewrite before these pages are published.
 * Facts with `value: null` render as "To be confirmed" until Kunal supplies them.
 * Images: only photographs the homepage uses (service cards R9-R12, step photos S02-S05, R7, R8, R13).
 */
export const services = [
  {
    slug: 'one-to-one',
    status: 'demo',
    title: '1:1 Coaching', // verified
    pill: 'Online · One-to-one',
    format: 'Private, one-to-one sessions',
    short: 'Private sessions focused entirely on you, your decisions and your business.',
    intro: 'Private sessions focused entirely on you, your decisions and your business. A thinking partner for the questions you would rather not work through alone.',
    summary: 'A private coaching relationship for owners who want a thinking partner. We work on the decisions in front of you and the habits that will carry the business forward.',
    cardImage: 'R9',
    heroImage: 'R9',
    sideImage: 'S02',
    detailImages: ['S03', 'S03'],
    facts: [
      { label: 'Format', value: 'One-to-one' },
      { label: 'Where', value: 'Online' },
      { label: 'Programme length', value: null },
      { label: 'Session rhythm', value: null },
    ],
    whoFor: ['Owners making big decisions alone', 'Founders moving from doing to leading', 'Anyone who wants honest, private feedback'],
    problems: ['Decisions that keep getting postponed', 'Too many priorities and no order to them', 'Feeling stuck between strategy and daily firefighting'],
    approach: [
      { title: 'Understand where you are', text: 'An honest look at the business today and what you want it to become.' },
      { title: 'Choose what matters most', text: 'A short list of priorities, in order, that you can act on.' },
      { title: 'Act, review and adjust', text: 'Regular sessions to keep the work moving and change course when needed.' },
    ],
  },
  {
    slug: 'face-to-face',
    status: 'demo',
    title: 'Face-to-Face Coaching', // verified
    pill: 'In person · One-to-one',
    format: 'In-person working sessions',
    short: 'Sit down together, in your space or mine, and work through the business in person.',
    intro: 'Sit down together, in your space or mine, and work through the business in person, with the focus and energy that come from being in the same room.',
    summary: 'Some conversations work better across a table. Face-to-face coaching brings the same structure as 1:1 sessions, with the focus and energy of being in the room.',
    cardImage: 'R10',
    heroImage: 'R10',
    sideImage: 'R7',
    detailImages: ['S03', 'S03'],
    facts: [
      { label: 'Format', value: 'One-to-one' },
      { label: 'Where', value: 'In person' },
      { label: 'Location', value: null },
      { label: 'Session length', value: null },
    ],
    whoFor: ['Owners who prefer working in person', 'Businesses facing a big decision or change', 'Leaders who want uninterrupted time to think'],
    problems: ['Online calls that never get deep enough', 'A business that needs to be seen to be understood', 'Plans that stall without momentum'],
    approach: [
      { title: 'Prepare before we meet', text: 'A short brief so the time together goes straight to what matters.' },
      { title: 'Work through it together', text: 'Focused, uninterrupted time on the real questions.' },
      { title: 'Leave with a clear plan', text: 'Agreed next steps you can start on straight away.' },
    ],
  },
  {
    slug: 'group',
    status: 'demo',
    title: 'Group Coaching', // verified
    pill: 'Cohort · Small group',
    format: 'Small-group sessions',
    short: 'Learn alongside other owners facing the same challenges, with structure and accountability.',
    intro: 'Learn alongside other owners facing the same challenges, with a clear structure, fresh perspectives and peers who hold you to what you said you would do.',
    summary: 'A small group of business owners working through the same questions together. You get structure, fresh perspectives and peers who hold you to what you said you would do.',
    cardImage: 'R11',
    heroImage: 'R11',
    sideImage: 'S04',
    detailImages: ['R8', 'R8'],
    facts: [
      { label: 'Format', value: 'Small group' },
      { label: 'Where', value: null },
      { label: 'Group size', value: null },
      { label: 'Programme length', value: null },
    ],
    whoFor: ['Owners who value peer perspective', 'Businesses building their foundations', 'Anyone who wants structure and company along the way'],
    problems: ['No one to sense-check ideas with', 'Good intentions without follow-through', 'Not knowing what good looks like'],
    approach: [
      { title: 'Learn together', text: 'A shared topic and a clear structure for each session.' },
      { title: 'Apply it to your business', text: 'Turn each idea into an action for your own situation.' },
      { title: 'Share, challenge and refine', text: 'Peers who ask the questions you might avoid on your own.' },
    ],
  },
  {
    slug: 'executive',
    status: 'demo',
    title: 'Executive Coaching', // verified
    pill: 'Leadership · Confidential',
    format: 'Confidential leadership sessions',
    short: 'Confidential coaching for senior leaders who need to lead change and grow their teams.',
    intro: 'Confidential coaching for senior leaders who need to lead change, grow their teams and think clearly about the decisions that shape the business.',
    summary: 'For leaders responsible for people, results and direction. A confidential space to think through leadership decisions, difficult conversations and how you show up for your team.',
    cardImage: 'R12',
    heroImage: 'R12',
    sideImage: 'S05',
    detailImages: ['S01', 'S01'],
    facts: [
      { label: 'Format', value: 'One-to-one' },
      { label: 'Where', value: null },
      { label: 'Programme length', value: null },
      { label: 'Session rhythm', value: null },
    ],
    whoFor: ['Senior leaders stepping into bigger roles', 'Leadership teams that need to align', 'Owners handing over day-to-day control'],
    problems: ['Leading through change or growth', 'Difficult conversations that keep getting avoided', 'A team that depends on you for every decision'],
    approach: [
      { title: 'Agree what you want to change', text: 'Clear leadership goals, set together at the start.' },
      { title: 'Coach through real situations', text: 'The decisions and conversations you are facing now.' },
      { title: 'Review the difference', text: 'Regular check-ins on what has changed and what comes next.' },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)

/** DRAFT questions with no answers yet: shown only as a placeholder until Kunal supplies answers. */
export const serviceFaq = [
  { q: 'How do I know which format is right for me?', a: null },
  { q: 'Do you work with businesses in my industry?', a: null },
  { q: 'What does it cost?', a: null },
  { q: 'Can I switch formats later?', a: null },
]
