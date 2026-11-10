import { areas, areaOrder, TZ, services, cases, news } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
import { readFileSync } from 'node:fs';
const MAN = JSON.parse(readFileSync(new URL('./img.json', import.meta.url), 'utf8'));
const LAND = /hero|studio$|-map$|-palettes$|-deer$/;
export const DIM = n => MAN[n] ? [MAN[n].w, MAN[n].h] : LAND.test(n) ? [1024, 576] : n === 'studio-2' ? [1024, 768] : [768, 1024];
// Responsive <img>: every image in img.json gets a webp srcset; pass sizes="..." in extra to override the default.
export const img = (root, n, alt = '', cls = '', extra = '') => {
  const [w, h] = DIM(n); const m = MAN[n];
  const set = m ? ` srcset="${m.ws.map(x => `${root}assets/img/${n}-${x}.webp ${x}w`).join(', ')}"${/sizes=/.test(extra) ? '' : ' sizes="100vw"'}` : '';
  return `<img src="${root}assets/img/${n}.webp"${set} alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}${extra ? ' ' + extra : ''}>`;
};
export const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
// Wordmark: "Flint" with the accent square riding on the dotless i
export const logo = (big = false) => `<span class="wm${big ? ' wm-big' : ''}" aria-label="Flint"><span aria-hidden="true">Fl</span><span class="wm-i" aria-hidden="true">ı<i></i></span><span aria-hidden="true">nt</span></span>`;
export const countyList = areaOrder.map(c => `${c} County`);

const NAV = [['Work', 'work/', cases.length], ['Services', 'services/', services.length], ['About', 'about/'], ['Clients', 'clients/'], ['News', 'news/']];
// Island preview slab: one image + line per destination
const SLAB = { 'work/': ['aerial-hunter-hero', 'Four sites shipped in 2026'], 'services/': ['casa-fresca-how', 'Six practices, one team'], 'about/': ['studio', 'Founded 2026 in west-central Indiana'], 'clients/': ['bertrams-hero', 'Aerial Hunter, Casa Fresca, Conexus, Bertram’s'], 'news/': ['conexus-design-hero', 'Launches and news'], 'contact/': ['hero-pill', 'Start a project with us'] };

// Accordion menu (opened from the header's dot-grid button): four rows, one opens at a time to show its links over an image.
const dots = `<span class="dots" aria-hidden="true">${Array.from({ length: 9 }, (_, k) => `<i class="d${k}"></i>`).join('')}</span>`;
function accMenu(root, path) {
  const cur = h => h && path.startsWith(h) ? ' aria-current="page"' : '';
  const L = (t, h, ext) => `<a href="${ext ? h : root + h}"${ext ? '' : cur(h)}>${t}</a>`;
  const rows = [
    ['Work', 'aerial-hunter-hero', [['Case studies', cases.map(c => L(c.short || c.client, `work/${c.slug}/`))], ['Browse', [L('All work', 'work/'), L('Clients', 'clients/')]]]],
    ['Services', 'casa-fresca-how', [['Practices', services.slice(0, 3).map(x => L(x.name, `services/${x.slug}/`))], ['', services.slice(3).map(x => L(x.name, `services/${x.slug}/`))], ['Overview', [L('All services', 'services/')]]]],
    ['Studio', 'studio', [['Flint', [L('About', 'about/'), L('Clients', 'clients/'), L('News', 'news/')]], ['Latest', news.slice(0, 2).map(n => L(n.title, `news/${n.slug}/`))]]],
    ['Contact', 'studio-2', [['New project', [L('Start a project', 'contact/'), L('support@justuseflint.com', 'mailto:support@justuseflint.com', true)]], ['Service area', [`<span>Seven counties in west-central Indiana</span>`]]]],
  ];
  return `<div class="acm" id="acm" data-acm role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true" inert>
  <div class="acm-top"><a class="acm-logo" href="${root}" aria-label="Flint home">${logo()}</a><div class="acm-tr"><a class="btn btn-sm acm-cta" href="${root}contact/"><span>Start a project</span></a><button class="acm-x" type="button" aria-label="Close menu" data-acm-close>${dots}</button></div></div>
  <ul class="acm-list">${rows.map(([t, im, cols], k) => `<li class="acm-row" data-acm-row>
    <button class="acm-h" type="button" aria-expanded="false" aria-controls="acm-p${k}" id="acm-h${k}"><span class="mono acm-n">0${k + 1}</span><span class="acm-t"><span>${t}</span></span><span class="acm-pm" aria-hidden="true"></span></button>
    <div class="acm-p" id="acm-p${k}" role="region" aria-labelledby="acm-h${k}" inert><span class="acm-bg" aria-hidden="true">${img(root, im, '', '', 'sizes="100vw"')}</span>
      <div class="acm-sub">${cols.map(([h, ls]) => `<div class="acm-col"><p class="mono acm-ch">${h || '&nbsp;'}</p>${ls.join('')}</div>`).join('')}</div></div>
  </li>`).join('')}</ul>
  <div class="acm-foot mono"><a href="mailto:support@justuseflint.com">support@justuseflint.com</a><span class="acm-fm">Flint Marketing — Est. 2026</span><span class="acm-fr">${L('Home', '')}${L('News', 'news/')}${L('Contact', 'contact/')}</span></div>
</div>`;
}

export function header(root, path) {
  const cur = p => p && path.startsWith(p) ? ' aria-current="page"' : '';
  const links = [['Home', ''], ...NAV, ['Contact', 'contact/']];
  return `<a class="skip" href="#main">Skip to content</a>
<header class="tb" data-tb>
  <div class="tb-in">
    <a class="tb-logo" href="${root}" aria-label="Flint home">${logo()}</a>
    <div class="tb-r">
      <a class="btn btn-sm tb-cta" href="${root}contact/" data-magnetic><span>Start a project</span></a>
      <button class="tb-menu" type="button" aria-expanded="false" aria-controls="acm" aria-label="Open menu" data-acm-open>${dots}</button>
    </div>
  </div>
</header>
${accMenu(root, path)}
<div class="isl" data-isl>
  <div class="isl-body" data-isl-body>
    <div class="isl-panel" id="isl-panel" data-isl-panel aria-hidden="true" inert>
      <nav class="isl-nav" aria-label="Site menu">${links.map(([t, h], i) => `<a class="isl-link${h === 'contact/' ? ' isl-link-sm' : ''}" href="${root}${h}"${cur(h)} data-isl-key="${h || 'home'}"><span class="mono">0${i + 1}</span>${t}</a>`).join('')}</nav>
      <div class="isl-slab" aria-hidden="true">
        <span class="isl-media">${img(root, 'aerial-hunter-hero', '', 'on', 'data-isl-img="home" sizes="360px"')}${Object.entries(SLAB).map(([k, [n]]) => img(root, n, '', '', `data-isl-img="${k}" sizes="360px"`)).join('')}</span>
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
