# Flint — agency website

Website for **Flint** (Flint Marketing, Just Use Flint), an independent brand and marketing company founded in 2026,
serving Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties in Indiana.

**Live:** https://justuseflint.github.io/iconic/

- Vanilla HTML/CSS/JS, no build step needed to serve. GSAP 3 + ScrollTrigger + Lenis are vendored in `assets/vendor/`.
- Pages are generated from `_build/data.mjs` with `node _build/build.mjs` (output is committed).
- Navigation is a floating "island" menu (bottom of the screen) that appears on scroll and morphs open; the top bar is not sticky.
- The Start a project flow (`/contact/`) is a one-question-per-screen form that always fits the viewport; the page never scrolls.
- To deliver enquiries somewhere, set `data-endpoint="https://…"` on the `<form data-form>` in `_build/pages-b.mjs`
  (any JSON form endpoint such as Formspree); the flow will POST the answers there.
- Motion honours `prefers-reduced-motion`; content stays visible if scripts fail.
- Aerial Hunter imagery is real screenshots of https://justuseflint.github.io/aerial-hunter/.
