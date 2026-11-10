# Flint — agency website

Website for **Flint** (Flint Marketing, Just Use Flint), an independent brand and marketing company founded in 2026,
serving Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties in Indiana.

**Live:** https://justuseflint.github.io/iconic/

- Vanilla HTML/CSS/JS, no build step needed to serve. GSAP 3 + ScrollTrigger + Lenis are vendored in `assets/vendor/`.
- Pages are generated from `_build/data.mjs` with `node _build/build.mjs` (output is committed).
- Navigation is a floating "island" menu (bottom of the screen) that appears on scroll and morphs open; the top bar is not sticky.
- The Start a project flow (`/contact/`) is a one-question-per-screen form that always fits the viewport; the page never scrolls.
- Inquiries are emailed to support@justuseflint.com through FormSubmit (free): the form POSTs JSON to
  `https://formsubmit.co/ajax/support@justuseflint.com` (`data-endpoint` on `<form data-form>` in `_build/pages-b.mjs`).
  The first submission sends FormSubmit's one-time "Activate Form" email to that inbox; nothing is delivered until it is clicked.
  To switch to Web3Forms, add `data-w3f-key="<access key>"` to the same form. Subject: `New Flint inquiry: <type> from <name>`; hidden honeypot `_honey`.
- Images: `python3 _build/images.py` turns the source images into responsive webp sets and writes `_build/img.json`, which `img()` uses for `srcset`.
- Motion honours `prefers-reduced-motion`; content stays visible if scripts fail.
- Aerial Hunter imagery is real screenshots of https://justuseflint.github.io/aerial-hunter/.
