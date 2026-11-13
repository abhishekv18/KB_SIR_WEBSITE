/**
 * Coaching services.
 * Titles are VERIFIED (from the current site). Everything else is DEMO content
 * written to show the layout — replace with Kunal's real descriptions, formats and terms.
 */
export const services = [
  {
    slug: 'one-to-one',
    status: 'demo',
    title: '1:1 Coaching', // verified
    pill: 'Online · One-to-one',
    short: 'Private sessions focused entirely on you, your decisions and your business.',
    summary: 'A private coaching relationship for owners who want a thinking partner. We work on the decisions in front of you and the habits that will carry the business forward.',
    layout: 'portrait',
    cardImage: 'R9',
    heroImage: 'G25',
    sideImage: 'R4',
    detailImages: ['G29', 'G30'],
    facts: [
      { label: 'Format', value: 'Online video sessions' },
      { label: 'Length', value: 'Demo — e.g. 3 or 6 months' },
      { label: 'Rhythm', value: 'Demo — e.g. fortnightly' },
      { label: 'Best for', value: 'Founders and owner-managers' },
    ],
    whoFor: ['Owners making big decisions alone', 'Founders moving from doing to leading', 'Anyone who wants honest, private feedback'],
    problems: ['Decisions that keep getting postponed', 'Too many priorities and no order to them', 'Feeling stuck between strategy and daily firefighting'],
    deliverables: ['Regular one-to-one sessions', 'A written priority plan, reviewed each month', 'Session notes and agreed actions', 'Accountability between sessions'],
    approach: ['Understand where you are', 'Choose what matters most', 'Act, review and adjust'],
    month: ['Week 1 — deep-dive session', 'Week 2 — actions in motion', 'Week 3 — review session', 'Week 4 — reflect and reset'],
  },
  {
    slug: 'face-to-face',
    status: 'demo',
    title: 'Face-to-Face Coaching', // verified
    pill: 'In person · One-to-one',
    short: 'Sit down together, in your space or mine, and work through the business in person.',
    summary: 'Some conversations work better across a table. Face-to-face coaching brings the same structure as 1:1 sessions, with the focus and energy of being in the room.',
    layout: 'place',
    cardImage: 'R10',
    heroImage: 'G26',
    sideImage: 'R3',
    detailImages: ['G31', 'G32'],
    facts: [
      { label: 'Format', value: 'In-person sessions' },
      { label: 'Location', value: 'Demo — city to be confirmed' },
      { label: 'Length', value: 'Demo — half-day or full-day' },
      { label: 'Best for', value: 'Owners who think best in person' },
    ],
    whoFor: ['Owners who prefer working in person', 'Businesses facing a big decision or change', 'Leaders who want an uninterrupted working day'],
    problems: ['Online calls that never get deep enough', 'A business that needs to be seen to be understood', 'Plans that stall without momentum'],
    deliverables: ['In-person working sessions', 'A visit to your business where useful', 'A written summary and action plan', 'Follow-up check-in'],
    approach: ['Prepare before we meet', 'Work through it together', 'Leave with a clear plan'],
    day: ['Morning — where the business is today', 'Midday — the real constraints', 'Afternoon — decisions and plan', 'Close — next 30 days agreed'],
  },
  {
    slug: 'group',
    status: 'demo',
    title: 'Group Coaching', // verified
    pill: 'Cohort · Small group',
    short: 'Learn alongside other owners facing the same challenges, with structure and accountability.',
    summary: 'A small group of business owners working through the same programme together. You get structure, fresh perspectives and peers who hold you to what you said you would do.',
    layout: 'group',
    cardImage: 'R11',
    heroImage: 'G27',
    sideImage: 'G24',
    detailImages: ['G33', 'G34'],
    facts: [
      { label: 'Format', value: 'Small-group sessions' },
      { label: 'Group size', value: 'Demo — e.g. 6 to 10 owners' },
      { label: 'Length', value: 'Demo — e.g. 8 weeks' },
      { label: 'Best for', value: 'Owners who learn from peers' },
    ],
    whoFor: ['Owners who value peer perspective', 'Early-stage businesses building foundations', 'Anyone who wants structure at a lower cost than 1:1'],
    problems: ['Isolation — no one to sense-check ideas with', 'Good intentions without follow-through', 'Not knowing what “good” looks like'],
    deliverables: ['Weekly group sessions', 'Workbook and templates', 'Peer accountability pairs', 'A closing review session'],
    approach: ['Learn the framework', 'Apply it to your business', 'Share, challenge and refine'],
    weeks: ['Weeks 1–2 · Clarity', 'Weeks 3–4 · Plan', 'Weeks 5–6 · Systems', 'Weeks 7–8 · Growth'],
  },
  {
    slug: 'executive',
    status: 'demo',
    title: 'Executive Coaching', // verified
    pill: 'Leadership · Confidential',
    short: 'Confidential coaching for senior leaders who need to lead change and grow their teams.',
    summary: 'For leaders responsible for people, results and direction. A confidential space to think through leadership decisions, difficult conversations and how you show up for your team.',
    layout: 'boardroom',
    cardImage: 'R12',
    heroImage: 'G28',
    sideImage: 'G35',
    detailImages: ['G35', 'G36'],
    facts: [
      { label: 'Format', value: 'Online or in person' },
      { label: 'Length', value: 'Demo — e.g. 6 months' },
      { label: 'Rhythm', value: 'Demo — e.g. twice a month' },
      { label: 'Best for', value: 'Senior leaders and leadership teams' },
    ],
    whoFor: ['Senior leaders stepping into bigger roles', 'Leadership teams that need to align', 'Owners handing over day-to-day control'],
    problems: ['Leading through change or growth', 'Difficult conversations that keep getting avoided', 'A team that depends on you for every decision'],
    deliverables: ['Confidential one-to-one sessions', 'Leadership goals agreed at the start', 'Optional team alignment session', 'Mid-point and final reviews'],
    approach: ['Agree leadership goals', 'Coach through real situations', 'Review progress and impact'],
    outcomes: ['Clearer decisions', 'Stronger delegation', 'Better conversations', 'A more aligned team'],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)

export const serviceFaq = [
  // DEMO FAQ — replace with real answers
  { q: 'How do I know which format is right for me?', a: 'Demo answer — book a consultation and we’ll talk through where your business is, how you like to work and what you want to change. The right format usually becomes obvious in that conversation.' },
  { q: 'Do you work with businesses in my industry?', a: 'Demo answer — replace with the sectors Kunal works with.' },
  { q: 'What does it cost?', a: 'Demo answer — pricing will be listed here, or confirmed after the first conversation.' },
  { q: 'Can I switch formats later?', a: 'Demo answer — explain how clients can move between formats.' },
]
