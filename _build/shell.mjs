import { offices, services, cases } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const DIM = n => /hero|studio$/.test(n) ? [1024, 576] : n === 'studio-2' ? [1024, 768] : [768, 1024];
export const img = (root, n, alt = '', cls = '', extra = '') => { const [w, h] = DIM(n); return `<img src="${root}assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}${extra ? ' ' + extra : ''}>`; };
export const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
export const logo = (big = false) => `<span class="wm${big ? ' wm-big' : ''}" aria-label="Iconic"><span class="wm-i" aria-hidden="true">ı<i></i></span><span aria-hidden="true">conic</span></span>`;

const NAV = [['Work', 'work/', cases.length], ['Services', 'services/', services.length], ['About', 'about/'], ['Clients', 'clients/'], ['News', 'news/'], ['Careers', 'careers/']];

export function header(root, path) {
  const cur = p => path.startsWith(p) ? ' aria-current="page"' : '';
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="hdr-logo" href="${root}" aria-label="Iconic home">${logo()}</a>
    <nav class="hdr-nav" aria-label="Primary">${NAV.map(([t, h, n]) => `<a href="${root}${h}"${cur(h)} class="ul">${t}${n ? `<sup>${String(n).padStart(2, '0')}</sup>` : ''}</a>`).join('')}</nav>
    <div class="hdr-r">
      <span class="hdr-clock mono" data-clock="America/New_York" data-label="NYC">NYC —:—</span>
      <a class="btn btn-sm hdr-cta" href="${root}contact/" data-magnetic><span>Start a project</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span class="mb-t"><span>Menu</span><span>Close</span></span><span class="mb-i"><i></i><i></i></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-menu aria-hidden="true">
  <nav class="menu-nav" aria-label="Mobile">${[['Home', ''], ...NAV, ['Contact', 'contact/']].map(([t, h], i) => `<a href="${root}${h}"><span class="mono">0${i + 1}</span><span class="mn-t">${t}</span></a>`).join('')}</nav>
  <div class="menu-foot">
    <div><span class="eyebrow">New business</span><a class="ul" href="${root}contact/">Start a project ${arrow}</a></div>
    <div class="menu-offices">${offices.map(o => `<span><b>${o.city}</b> <span class="mono" data-clock="${o.tz}">—:—</span></span>`).join('')}</div>
  </div>
</div>`;
}

export function footer(root) {
  return `<section class="cta-band" data-cta>
  <div class="wrap">
    <p class="eyebrow">Have a brief?</p>
    <h2 class="h-xl cta-h" data-split>Let’s make it <em class="serif-i">iconic.</em></h2>
    <div class="cta-row">
      <p class="lead cta-p">Tell us what you are working on. A partner from the nearest studio will reply within one business day.</p>
      <a class="btn-circle" href="${root}contact/" data-magnetic data-strength="0.45"><span>Start a<br>project</span></a>
    </div>
  </div>
</section>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-col ftr-news">
        <p class="eyebrow">The Iconic Letter</p>
        <p class="ftr-copy">One email a month on brands, culture and effectiveness. Read by 38,000 marketers.</p>
        <form class="nl" data-newsletter novalidate>
          <label class="sr" for="nl-email">Email address</label>
          <input id="nl-email" type="email" placeholder="Your work email" required autocomplete="email">
          <button type="submit" aria-label="Subscribe">${arrow}</button>
          <p class="nl-msg mono" role="status" aria-live="polite"></p>
        </form>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Studios</p>
        <ul class="ftr-offices">${offices.map(o => `<li><span>${o.city}</span><span class="mono" data-clock="${o.tz}">—:—</span></li>`).join('')}</ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Explore</p>
        <ul class="ftr-links">${[['Work', 'work/'], ['Services', 'services/'], ['About', 'about/'], ['Clients', 'clients/'], ['News', 'news/'], ['Careers', 'careers/'], ['Contact', 'contact/']].map(([t, h]) => `<li><a class="ul" href="${root}${h}">${t}</a></li>`).join('')}</ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Services</p>
        <ul class="ftr-links">${services.map(s => `<li><a class="ul" href="${root}services/${s.slug}/">${s.name}</a></li>`).join('')}</ul>
      </div>
    </div>
  </div>
  <div class="ftr-wm" data-wm aria-hidden="true">${'Iconic'.split('').map(c => `<span>${c === 'I' ? 'I' : c}</span>`).join('')}</div>
  <div class="wrap ftr-base mono">
    <span>© 2026 Iconic Group Ltd. Employee-owned since 2020.</span>
    <span>A fictional agency. All brands, people and figures are invented.</span>
    <a href="#top" class="ul" data-top>Back to top ↑</a>
  </div>
</footer>`;
}

export function page({ root, path, title, desc, body, vars = '', fonts = [], cls = '', scripts = [] }) {
  const fam = ['Schibsted+Grotesk:wght@400..900', 'Instrument+Serif:ital@0;1', 'IBM+Plex+Mono:wght@400;500', ...fonts].map(f => 'family=' + f).join('&');
  return `<!doctype html>
<html lang="en" class="no-js"${vars ? ` style="${vars}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#121211">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fam}&display=swap">
<link rel="stylesheet" href="${root}assets/css/site.css">
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('ic-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__icReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>
<body class="${cls}" id="top">
<div class="pt" aria-hidden="true"><div class="pt-in-wm">${logo(true)}</div></div>
${header(root, path)}
<main id="main">
${body}
</main>
${footer(root)}
<div class="cursor" aria-hidden="true"><span class="cursor-t"></span></div>
<script src="${root}assets/vendor/gsap.min.js" defer></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${root}assets/vendor/lenis.min.js" defer></script>
<script src="${root}assets/js/site.js" defer></script>
${scripts.map(s => `<script src="${root}assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}
