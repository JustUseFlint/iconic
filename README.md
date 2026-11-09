# Iconic — agency website (concept)

A multi-page marketing site for **Iconic**, a fictional independent brand & marketing company. All brands, people, figures and press are invented.

**Live:** https://justuseflint.github.io/iconic/

- Vanilla HTML/CSS/JS, no build step needed to serve. GSAP 3 + ScrollTrigger + Lenis are vendored in `assets/vendor/`.
- Pages are generated from `_build/data.mjs` with `node _build/build.mjs` (output is committed).
- Motion honours `prefers-reduced-motion`; content stays visible if scripts fail.
- The contact flow is a front-end demo; nothing is submitted.
