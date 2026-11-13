# Kunal Bhardwaj — Minding Business (website)

Frontend-only React 19 + Vite + Tailwind CSS 4 site. No backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/ (deploy to any static host with SPA fallback to index.html)
npm run lint
npm run content:report   # lists every demo / pending item still in src/content
```

## Replacing temporary content

All copy lives in `src/content/`. Anything temporary is marked `status: 'demo'` and/or commented `DEMO`, and shows a visible "Demo …" tag on the page.

| What | File |
|---|---|
| Hero, home sections, final CTA, contact email, socials, nav | `content/site.js` |
| Services (descriptions, facts, deliverables, FAQ) | `content/services.js` |
| Methodology steps | `content/method.js` |
| Bio, expertise, philosophy, journey, contact steps/FAQ | `content/about.js` |
| Testimonials (set `status: 'verified'` once approved) | `content/testimonials.js` |
| Case studies | `content/stories.js` |
| Articles ("Business vs. Brand" is real) | `content/posts.js` |

## Images

`content/images.js` is the registry. `R*` are Kunal's real photos. `G*` are planned images (prompts in `docs/IMAGE_PLAN.md`) and render as labelled placeholder frames until approved.
To add one: save `name-640.webp`, `name-1024.webp`, `name-1600.webp` in `public/assets/<folder>/`, then set `status: 'real'`, `src: '/assets/<folder>/name'`, `widths: [640, 1024, 1600]`, the real `w`/`h`, and `alt`.

## Featured video

`content/site.js → home.video`: set `url` to any YouTube link and `thumbnail` to an image ID. Until `url` is set the frame shows "Video coming soon". The player loads (youtube-nocookie.com) only when a visitor presses play.

## Contact form

No backend exists. With `site.formEndpoint: null` the form validates, then opens a pre-filled email in the visitor's own email app — the button says so. To send directly, create a Formspree / Web3Forms form and set `formEndpoint` to its URL. The footer newsletter stays hidden until `newsletterEnabled` is true and a provider is wired in.
