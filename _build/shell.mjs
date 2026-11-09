import { areas, areaOrder, TZ, services, cases } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LAND = /hero|studio$|-map$|-palettes$|-deer$/;
export const DIM = n => LAND.test(n) ? [1024, 576] : n === 'studio-2' ? [1024, 768] : [768, 1024];
export const img = (root, n, alt = '', cls = '', extra = '') => { const [w, h] = DIM(n); return `<img src="${root}assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}${extra ? ' ' + extra : ''}>`; };
export const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
// Wordmark: "Flint" with the accent square riding on the dotless i
export const logo = (big = false) => `<span class="wm${big ? ' wm-big' : ''}" aria-label="Flint"><span aria-hidden="true">Fl</span><span class="wm-i" aria-hidden="true">ı<i></i></span><span aria-hidden="true">nt</span></span>`;
export const countyList = areaOrder.map(c => `${c} County`);

const NAV = [['Work', 'work/', cases.length], ['Services', 'services/', services.length], ['About', 'about/'], ['Clients', 'clients/'], ['News', 'news/']];
// Island preview slab: one image + line per destination
const SLAB = { 'work/': ['aerial-hunter-hero', 'Case studies, including Aerial Hunter'], 'services/': ['kettle-hero', 'Six practices, one team'], 'about/': ['studio', 'Founded 2026 in west-central Indiana'], 'clients/': ['norrow-hero', 'Who we work with'], 'news/': ['studio-2', 'News and thinking'], 'contact/': ['halden-hero', 'Start a project with us'] };

export function header(root, path) {
  const cur = p => p && path.startsWith(p) ? ' aria-current="page"' : '';
  const links = [['Home', ''], ...NAV, ['Contact', 'contact/']];
  return `<a class="skip" href="#main">Skip to content</a>
<header class="tb" data-tb>
  <div class="tb-in">
    <a class="tb-logo" href="${root}" aria-label="Flint home">${logo()}</a>
    <nav class="tb-nav" aria-label="Primary">${NAV.map(([t, h, n]) => `<a href="${root}${h}"${cur(h)} class="ul">${t}${n ? `<sup>${String(n).padStart(2, '0')}</sup>` : ''}</a>`).join('')}</nav>
    <div class="tb-r">
      <span class="tb-clock mono" data-clock="${TZ}" data-label="Indiana">Indiana —:—</span>
      <a class="btn btn-sm tb-cta" href="${root}contact/" data-magnetic><span>Start a project</span></a>
      <button class="tb-menu" type="button" aria-expanded="false" aria-controls="isl-panel" data-isl-open><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="6" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span>Menu</span></button>
    </div>
  </div>
</header>
<div class="isl" data-isl>
  <div class="isl-body" data-isl-body>
    <div class="isl-panel" id="isl-panel" data-isl-panel aria-hidden="true" inert>
      <nav class="isl-nav" aria-label="Site menu">${links.map(([t, h], i) => `<a class="isl-link${h === 'contact/' ? ' isl-link-sm' : ''}" href="${root}${h}"${cur(h)} data-isl-key="${h || 'home'}"><span class="mono">0${i + 1}</span>${t}</a>`).join('')}</nav>
      <div class="isl-slab" aria-hidden="true">
        <span class="isl-media">${img(root, 'aerial-hunter-hero', '', 'on', 'data-isl-img="home"')}${Object.entries(SLAB).map(([k, [n]]) => img(root, n, '', '', `data-isl-img="${k}"`)).join('')}</span>
        <span class="isl-cap"><span class="mono" data-isl-idx>Flint</span><span data-isl-txt>Brand &amp; marketing, west-central Indiana</span></span>
        <span hidden data-isl-captions='${esc(JSON.stringify(Object.fromEntries(Object.entries(SLAB).map(([k, v]) => [k, v[1]]))))}'></span>
      </div>
    </div>
    <div class="isl-row">
      <a class="isl-brand" href="${root}" aria-label="Flint home">${logo()}</a>
      <button class="isl-trig" type="button" aria-expanded="false" aria-controls="isl-panel" aria-label="Open menu" data-isl-trig>
        <svg class="isl-mark" viewBox="0 0 20 20" aria-hidden="true"><rect data-isl-cap x="2" y="6" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        <span class="isl-roll" aria-hidden="true"><span class="isl-roll-in"><span>Menu</span><span>Close</span></span></span>
      </button>
      <a class="isl-cta" href="${root}contact/">Start a project</a>
    </div>
  </div>
</div>`;
}

export function footer(root) {
  return `<section class="cta-band" data-cta>
  <div class="wrap">
    <p class="eyebrow">Have a brief?</p>
    <h2 class="h-xl cta-h" data-split>Let’s strike <em class="serif-i">a spark.</em></h2>
    <div class="cta-row">
      <p class="lead cta-p">Tell us what you are working on. We reply to every enquiry within one business day.</p>
      <a class="btn-circle" href="${root}contact/" data-magnetic data-strength="0.45"><span>Start a<br>project</span></a>
    </div>
  </div>
</section>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-col ftr-news">
        <p class="eyebrow">Flint Marketing</p>
        <p class="ftr-copy">An independent brand and marketing company, founded in 2026 and based in west-central Indiana.</p>
        <a class="btn btn-sm ftr-btn" href="${root}contact/"><span>Start a project</span></a>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Service area</p>
        <ul class="ftr-offices">${areaOrder.map(c => `<li><span>${c} County</span></li>`).join('')}<li class="mono ftr-in"><span>Indiana</span><span data-clock="${TZ}">—:—</span></li></ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Explore</p>
        <ul class="ftr-links">${[['Work', 'work/'], ['Services', 'services/'], ['About', 'about/'], ['Clients', 'clients/'], ['News', 'news/'], ['Contact', 'contact/']].map(([t, h]) => `<li><a class="ul" href="${root}${h}">${t}</a></li>`).join('')}</ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Services</p>
        <ul class="ftr-links">${services.map(s => `<li><a class="ul" href="${root}services/${s.slug}/">${s.name}</a></li>`).join('')}</ul>
      </div>
    </div>
  </div>
  <div class="ftr-wm" data-wm aria-hidden="true"><span>F</span><span>l</span><span class="wm-i">ı<i></i></span><span>n</span><span>t</span></div>
  <div class="wrap ftr-base mono">
    <span>© 2026 Flint Marketing. Just use Flint.</span>
    <span>Est. 2026 · West-central Indiana</span>
    <a href="#top" class="ul" data-top>Back to top ↑</a>
  </div>
</footer>`;
}

export function page({ root, path, title, desc, body, vars = '', fonts = [], cls = '', scripts = [], bare = false }) {
  const fam = ['Schibsted+Grotesk:wght@400..900', 'Instrument+Serif:ital@0;1', 'IBM+Plex+Mono:wght@400;500', ...fonts].map(f => 'family=' + f).join('&');
  return `<!doctype html>
<html lang="en" class="no-js${bare ? ' is-app' : ''}"${vars ? ` style="${vars}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover${bare ? ', interactive-widget=resizes-content' : ''}">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#121211">
<meta name="application-name" content="Flint">
<meta property="og:site_name" content="Flint Marketing">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fam}&display=swap">
<link rel="stylesheet" href="${root}assets/css/site.css">
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('fl-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__flReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>
<body class="${cls}" id="top">
<div class="pt" aria-hidden="true"><div class="pt-in-wm">${logo(true)}</div></div>
${header(root, path)}
<main id="main">
${body}
</main>
${bare ? '' : footer(root)}
<div class="cursor" aria-hidden="true"><span class="cursor-t"></span></div>
<script src="${root}assets/vendor/gsap.min.js" defer></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${root}assets/vendor/lenis.min.js" defer></script>
<script src="${root}assets/js/site.js" defer></script>
${scripts.map(s => `<script src="${root}assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}
