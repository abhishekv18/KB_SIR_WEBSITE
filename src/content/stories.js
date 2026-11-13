/**
 * Success stories — DEMONSTRATION CASE STUDIES.
 * These are illustrative examples to show the page design. They do not describe real clients,
 * and every page that shows them carries a visible "Demonstration case study" notice.
 */
export const stories = [
  {
    slug: 'example-manufacturing',
    status: 'demo',
    title: 'From owner-dependent to a team that runs the floor',
    sector: 'Manufacturing (illustrative)',
    size: 'Example: 20–50 people',
    service: 'one-to-one',
    image: 'G38',
    challenge: 'Illustrative example — the owner made every production and hiring decision personally, which slowed everything down and left no time to grow the business.',
    approach: 'Illustrative example — together they mapped every decision that reached the owner, agreed which ones others could own, and set a weekly review rhythm.',
    outcome: 'Illustrative example — describe the real, client-approved outcome here. Only verified results will be published.',
    quote: 'Demo pull quote — a client’s own words will appear here once approved.',
  },
  {
    slug: 'example-restaurant',
    status: 'demo',
    title: 'Bringing structure to a busy family restaurant',
    sector: 'Hospitality (illustrative)',
    size: 'Example: single site',
    service: 'face-to-face',
    image: 'G39',
    challenge: 'Illustrative example — long hours, unclear roles and no time to plan beyond the next service.',
    approach: 'Illustrative example — in-person working days to define roles, simplify the menu plan and set a monthly numbers review.',
    outcome: 'Illustrative example — replace with the real, approved outcome.',
    quote: 'Demo pull quote — awaiting an approved client quote.',
  },
  {
    slug: 'example-design-studio',
    status: 'demo',
    title: 'A design studio learns to say no to the wrong work',
    sector: 'Creative services (illustrative)',
    size: 'Example: 8–15 people',
    service: 'group',
    image: 'G40',
    challenge: 'Illustrative example — the studio took every project offered and struggled with margins and burnout.',
    approach: 'Illustrative example — through a group programme the founders defined their ideal client and pricing rules.',
    outcome: 'Illustrative example — replace with the real, approved outcome.',
    quote: 'Demo pull quote — awaiting an approved client quote.',
  },
  {
    slug: 'example-logistics',
    status: 'demo',
    title: 'Aligning a leadership team behind one plan',
    sector: 'Logistics (illustrative)',
    size: 'Example: 50–100 people',
    service: 'executive',
    image: 'G41',
    challenge: 'Illustrative example — senior managers worked hard but toward different priorities.',
    approach: 'Illustrative example — executive coaching for the managing director plus a leadership alignment session.',
    outcome: 'Illustrative example — replace with the real, approved outcome.',
    quote: 'Demo pull quote — awaiting an approved client quote.',
  },
]

export const getStory = (slug) => stories.find((s) => s.slug === slug)
