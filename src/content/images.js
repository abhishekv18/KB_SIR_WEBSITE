/**
 * Image registry. Every image on the site is referenced by ID.
 *  - status "real":    genuine photograph of Kunal / brand asset (from kunalbharadwaj.com)
 *  - status "generated": AI-generated image approved by the owner (fictional people — never Kunal,
 *                      never presented as clients or real events). Source log: docs/IMAGE_PLAN.md
 *  - status "stock":   real photograph from Unsplash (free licence), graded to the site palette.
 *                      Context only, never presented as Kunal, his clients or real events.
 *  - status "pending": generated image planned in docs/IMAGE_PLAN.md, not yet approved.
 *                      Renders as a labelled placeholder frame until `src` is filled in.
 * To add an approved image: drop `<name>-640.webp`, `-1024.webp`, `-1600.webp` into
 * /public/assets/<folder>/ and set `src: '/assets/<folder>/<name>'` + `widths`.
 */
const P = '/assets/portraits'
const G = '/assets/images/generated'
const S = '/assets/images/stock' // real photographs, Unsplash free licence (see docs/IMAGE_PLAN.md)

export const images = {
  S02: { status: 'real', src: `${P}/kb-step-decision`, widths: [640, 1024], w: 1024, h: 683, pos: '52% 30%', label: 'Making a decision', alt: 'Kunal Bhardwaj at his desk, hand at his chin, thinking over a decision' },
  S03: { status: 'real', src: `${P}/kb-step-meeting`, widths: [640, 1024], w: 1024, h: 683, pos: '45% 35%', label: 'Schedule a meeting', alt: 'Kunal Bhardwaj smiling as he shakes hands with a client across the table' },
  S04: { status: 'real', src: `${P}/kb-step-commitment`, widths: [640, 1024], w: 1024, h: 576, pos: '48% 35%', label: 'Show commitment', alt: 'Kunal Bhardwaj working through a plan with a small team around a table' },
  S05: { status: 'real', src: `${P}/kb-step-transformation`, widths: [640, 1024], w: 1024, h: 690, pos: '62% 45%', label: 'Transformation completed', alt: 'A man in a dark suit looking out over the city skyline at sunset' },
  S01: { status: 'stock', src: `${S}/stats-city-night`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Office towers lit at night', alt: '' },
  // ---------------- Real photographs (R) ----------------
  R1: { status: 'real', src: `${P}/kb-cafe-wide`, widths: [640, 1024, 1600], w: 1600, h: 1063, alt: 'Kunal Bhardwaj in a dark suit, standing in a warmly lit café' },
  R2: { status: 'real', src: `${P}/kb-cafe-tall`, widths: [640, 848], w: 848, h: 1276, alt: 'Portrait of Kunal Bhardwaj in a dark suit and white shirt' },
  R3: { status: 'real', src: `${P}/kb-cafe-wide-2`, widths: [640, 1024, 1600], w: 1600, h: 1063, alt: 'Kunal Bhardwaj in a café interior, smiling slightly' },
  R4: { status: 'real', src: `${P}/kb-desk`, widths: [640, 1024, 1600], w: 1600, h: 868, alt: 'Kunal Bhardwaj seated at his desk in a bright office' },
  R9: { status: 'real', src: `${P}/kb-coaching-one-to-one`, widths: [640, 1024], w: 1024, h: 683, pos: '62% 28%', alt: 'Kunal Bhardwaj in a one-to-one coaching conversation across his desk' },
  R10: { status: 'real', src: `${P}/kb-speaking-fireside`, widths: [640, 1024], w: 1024, h: 683, pos: '45% 28%', alt: 'Kunal Bhardwaj speaking in person at a fireside session, microphone in hand' },
  R11: { status: 'real', src: `${P}/kb-coaching-group`, widths: [640, 1024], w: 1024, h: 576, pos: '48% 35%', alt: 'Kunal Bhardwaj leading a group coaching session around a boardroom table' },
  R12: { status: 'real', src: `${P}/kb-coaching-executive`, widths: [640, 1024], w: 1024, h: 576, pos: '52% 38%', alt: 'Kunal Bhardwaj in a confidential discussion with two senior executives' },
  R8: { status: 'real', src: `${P}/kb-presenting-hd`, widths: [640, 1060], w: 1060, h: 1356, alt: 'Kunal Bhardwaj presenting at a business event, microphone in one hand, holding up a card with the other' },
  R13: { status: 'real', src: `${P}/kb-cta`, widths: [1024, 1742], w: 1742, h: 903, pos: '78% 30%', alt: 'Kunal Bhardwaj seated in his office against a dark wall with gold-lit hexagonal panels' },
  R7: { status: 'real', src: `${P}/kb-speaking-hd`, widths: [640, 1080], w: 1080, h: 1173, alt: 'Kunal Bhardwaj speaking to an audience with a microphone at a business event' },
  R6: { status: 'real', src: `${P}/kb-podcast-hd`, widths: [640, 1254], w: 1254, h: 1254, pos: '50% 32%', alt: 'Kunal Bhardwaj recording at his microphone, making a point' },
  R5: { status: 'real', src: `${P}/kb-podcast`, widths: [640, 1080], w: 1080, h: 1080, alt: 'Kunal Bhardwaj speaking into a podcast microphone' },

  // ---------------- Generated images (G) ----------------
  G01: { status: 'stock', src: `${S}/challenges`, widths: [640, 1024, 1600], w: 1600, h: 1068, label: 'Owner under pressure, thinking late', alt: 'A man at his desk late in the evening, hand at his chin, thinking over his laptop' },
  G02: { status: 'stock', src: `${S}/coaching-one-to-one`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: '1:1 coaching conversation in a café', alt: 'A man and a woman in conversation over coffee at a café table' },
  G03: { status: 'stock', src: `${S}/coaching-face-to-face`, widths: [640, 1024, 1600], w: 1600, h: 1069, label: 'Face-to-face conversation across a table', alt: 'A woman talking with a client across a table' },
  G04: { status: 'stock', src: `${S}/coaching-group`, widths: [640, 1024, 1600], w: 1600, h: 900, label: 'Small group talking around a table', alt: 'A small group of people in conversation around a wooden table' },
  G05: { status: 'stock', src: `${S}/coaching-executive`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Two executives in a focused discussion', alt: 'Two executives in suits in a focused, serious discussion' },
  G06: { status: 'pending', label: 'Mapping the business on sticky notes', w: 4, h: 3 },
  G07: { status: 'pending', label: 'A one-page plan with priorities', w: 4, h: 3 },
  G08: { status: 'pending', label: 'Team member presenting progress', w: 4, h: 3 },
  G09: { status: 'pending', label: 'Reviewing a growth chart together', w: 4, h: 3 },
  G10: { status: 'pending', label: 'Video thumbnail — warmly lit workshop room', w: 16, h: 9 },
  G11: { status: 'stock', src: `${S}/blog-five-decisions-2`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'A small team deciding together', alt: 'A small team leaning over a table, reviewing papers and deciding together' },
  G12: { status: 'stock', src: `${S}/blog-one-page-plan`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Open notebook and pen on a wooden desk', alt: 'An open notebook with a pen on a wooden desk' },
  G13: { status: 'stock', src: `${S}/blog-business-vs-brand`, widths: [640, 1024, 1600], w: 1600, h: 1187, label: 'A parcel finished with a wax seal', alt: 'A paper parcel closed with a wax seal on a dark wooden table' },
  G14: { status: 'pending', label: 'Empty meeting room at golden hour', w: 21, h: 9 },
  G15: { status: 'pending', label: 'Whiteboard quarterly roadmap', w: 3, h: 2 },
  G16: { status: 'pending', label: 'Manager listening one-to-one', w: 3, h: 2 },
  G17: { status: 'pending', label: 'Organised back office with tablet', w: 3, h: 2 },
  G18: { status: 'pending', label: 'Reviewing packaging samples', w: 3, h: 2 },
  G19: { status: 'pending', label: 'Morning light across an empty desk', w: 21, h: 9 },
  G20: { status: 'pending', label: 'Small shopfront at dusk', w: 4, h: 3 },
  G21: { status: 'pending', label: 'Co-working space', w: 4, h: 3 },
  G22: { status: 'pending', label: 'Seminar room with projector', w: 4, h: 3 },
  G23: { status: 'pending', label: 'Quiet home office at night', w: 4, h: 3 },
  G24: { status: 'pending', label: 'Group coaching session in a bright loft', w: 21, h: 9 },
  G25: { status: 'pending', label: 'Two people at a window table', w: 3, h: 2 },
  G26: { status: 'pending', label: 'Café meeting seen through the window', w: 21, h: 9 },
  G27: { status: 'pending', label: 'Top-down view of a busy workshop table', w: 21, h: 9 },
  G28: { status: 'pending', label: 'Executive at a window over the city', w: 21, h: 9 },
  G29: { status: 'pending', label: '1:1 detail — notebook and hands', w: 4, h: 5 },
  G30: { status: 'pending', label: '1:1 detail — listening', w: 4, h: 5 },
  G31: { status: 'pending', label: 'Face-to-face detail', w: 4, h: 5 },
  G32: { status: 'pending', label: 'Face-to-face detail — café', w: 4, h: 5 },
  G33: { status: 'pending', label: 'Group detail — discussion', w: 4, h: 5 },
  G34: { status: 'pending', label: 'Group detail — whiteboard', w: 4, h: 5 },
  G35: { status: 'pending', label: 'Executive detail — boardroom', w: 4, h: 5 },
  G36: { status: 'pending', label: 'Executive detail — notes', w: 4, h: 5 },
  G37: { status: 'pending', label: 'Index cards arranged into columns', w: 21, h: 9 },
  G38: { status: 'pending', label: 'Workshop owner among products (demo case)', w: 16, h: 9 },
  G39: { status: 'pending', label: 'Restaurant kitchen pass (demo case)', w: 4, h: 3 },
  G40: { status: 'pending', label: 'Design studio meeting (demo case)', w: 4, h: 3 },
  G41: { status: 'pending', label: 'Logistics planning board (demo case)', w: 4, h: 3 },
  G42: { status: 'stock', src: `${S}/blog-time-to-think`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Hourglass with falling sand', alt: 'An hourglass with sand falling, against a soft blurred background' },
  G43: { status: 'stock', src: `${S}/blog-hard-conversation`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Quiet meeting room set for a conversation', alt: 'A quiet, warmly lit meeting room with a wooden table and chairs' },
  G44: { status: 'stock', src: `${S}/blog-know-your-numbers`, widths: [640, 1024, 1600], w: 1600, h: 1067, label: 'Reviewing figures with a calculator', alt: 'Hands reviewing printed figures beside a calculator and laptop' },
  // Insights hero. Unsplash License, photo by Amiel Gross: unsplash.com/photos/bOfROsjzrNs
  G47: { status: 'stock', src: `${S}/insights-writing`, widths: [640, 1024, 1600], w: 1600, h: 1067, pos: '60% 50%', label: 'Writing at a desk', alt: 'A person in a dark suit writing in a leather notebook at a wooden desk' },
  G45: { status: 'pending', label: 'Still life — seedling in a brass pot', w: 16, h: 9 },
  G46: { status: 'pending', label: 'Phone calendar beside a notebook', w: 4, h: 5 },
}

export const img = (id) => ({ id, ...images[id] })
