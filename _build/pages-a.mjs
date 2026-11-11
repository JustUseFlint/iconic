import { esc, img, arrow, page, stateList } from './shell.mjs';
import { cases, services, stats, news, region, regionLong } from './data.mjs';

const fmtDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export { fmtDate };
const svcName = s => services.find(x => x.slug === s).short;
const count = (m) => `<span data-count="${m.v}" data-dec="${m.dec || 0}" data-prefix="${m.prefix || ''}" data-suffix="${esc(m.suffix || '')}"${m.plain ? ' data-plain' : ''}>${m.prefix || ''}${m.dec ? m.v.toFixed(m.dec) : m.plain ? m.v : m.v.toLocaleString('en-US')}${m.suffix || ''}</span>`;
export { count };


export const brandWall = (root, big = false) => `<div class="bw-wrap${big ? ' bw-big' : ''}"><ul class="bw">${cases.map((c, i) => `<li class="bw-i bw-${c.slug}" data-reveal><a href="${root}work/${c.slug}/" data-cursor="Case">
    <span class="bw-logo"><span class="mono bw-k">${String(i + 1).padStart(2, '0')}</span><img src="${root}assets/img/logo-${c.slug}.webp" alt="${esc(c.client)}" loading="lazy" decoding="async"></span>
    <span class="bw-meta"><span class="bw-n">${c.client}</span><span class="mono bw-s">${c.sector} · ${c.town}</span><span class="mono bw-go">Case study ${arrow}</span></span>
  </a></li>`).join('')}</ul>
  <a class="bw-cta" href="${root}contact/" data-cursor="Start" data-reveal><span class="bw-plus" aria-hidden="true"><span>+</span></span><span class="bw-ct"><span class="bw-cn">Your business next</span><span class="mono bw-cs">${String(cases.length + 1).padStart(2, '0')} · Monthly memberships for local businesses, from $100 a month</span></span><span class="btn bw-cb"><span>Start a project</span></span></a>
</div>`;

export function home() {
  const root = '';
  const body = `
<section class="hero wrap">
  <h1 class="hero-h" data-split="hero">We make brands <span class="pill" aria-hidden="true">${img(root, 'hero-pill', '', 'on', 'loading="eager" fetchpriority="high" sizes="240px"')}</span> impossible <em class="serif-i">to&nbsp;ignore.</em></h1>
  <div class="hero-foot">
    <p class="lead hero-lede" data-fade>Flint helps ambitious companies find the one idea worth repeating, and then makes sure the right people hear it.</p>
    <div class="hero-scroll mono" data-fade><span class="hs-line"></span>Scroll</div>
  </div>
</section>

<section class="lx wrap" aria-labelledby="lx-h">
  <div class="sec-head"><h2 id="lx-h" class="h-l" data-split>Launched this year</h2><p class="mono sec-meta">(${String(cases.length).padStart(2, '0')} sites)</p><a class="link-arrow sec-link" href="work/">All work ${arrow}</a></div>
  <ul class="lx-grid">
    ${cases.map((c, i) => `<li class="lx-i" data-reveal><a href="work/${c.slug}/" data-cursor="View">
      <span class="lx-m" style="--lx-bg:${c.theme.bg}">${img(root, c.slug + '-hero', c.client + ': ' + c.title, '', `sizes="(min-width:900px) 50vw, 100vw"${i < 2 ? ' loading="eager"' : ''}`)}</span>
      <span class="lx-txt"><span class="mono lx-k">${String(i + 1).padStart(2, '0')} · ${c.sector}</span><span class="lx-c">${c.client}</span><span class="lx-d">${c.lede.split('. ')[0].replace(/\.$/, '')}.</span><span class="mono lx-tags">${c.disc.join(' · ')} ${arrow}</span></span>
    </a></li>`).join('')}
  </ul>
</section>

<section class="statement wrap grid">
  <p class="eyebrow st-eb" data-fade>(About Flint)</p>
  <div class="st-body">
    <p class="focus" data-focus>Flint is an independent brand and marketing company, founded in 2026 in Indiana. We bring strategy, identity, campaigns, media, social and websites under one roof for businesses across Indiana and the surrounding states: Illinois, Michigan, Kentucky, Tennessee and Ohio.</p>
    <a class="link-arrow" href="about/">Our story ${arrow}</a>
  </div>
</section>

<section class="sel wrap" aria-labelledby="sel-h">
  <div class="sec-head">
    <h2 id="sel-h" class="h-l" data-split>Selected work</h2>
    <p class="mono sec-meta">(2026)</p>
    <a class="link-arrow sec-link" href="work/">All work <sup>${String(cases.length).padStart(2, '0')}</sup> ${arrow}</a>
  </div>
  <ol class="wl" data-hover-list>
    ${cases.map((c, i) => `<li class="wl-row" data-reveal>
      <a href="work/${c.slug}/" data-img="assets/img/${c.slug}-hero.webp" data-cursor="View">
        <span class="wl-thumb">${img(root, c.slug + '-hero', c.client + ' — ' + c.title)}</span>
        <span class="wl-n mono">${String(i + 1).padStart(2, '0')}</span>
        <span class="wl-c">${c.client}</span>
        <span class="wl-t">${c.title}</span>
        <span class="wl-d mono">${c.disc.slice(0, 2).join(', ')}</span>
        <span class="wl-y mono">${c.year}</span>
      </a></li>`).join('')}
  </ol>
</section>

<section class="numbers" aria-label="Flint in numbers">
  <div class="wrap">
    <div class="num-head"><p class="eyebrow">Flint in numbers</p><p class="num-note">Independent, based in Indiana, working across the region.</p></div>
    <div class="num-grid">${stats.map(s => `<div class="num" data-reveal><span class="num-v">${count(s)}</span><span class="num-l">${s.label}</span></div>`).join('')}</div>
    <div class="awards-row mono">${stateList.map(c => `<span>${c}</span>`).join('')}</div>
  </div>
</section>

<section class="svc-stack wrap" aria-labelledby="svc-h">
  <div class="sec-head">
    <h2 id="svc-h" class="h-l" data-split>What we do</h2>
    <a class="link-arrow sec-link" href="services/">All services ${arrow}</a>
  </div>
  <div class="stack" data-stack>
    ${services.map((s, i) => `<article class="stack-card sc-${i}" style="top:calc(var(--stick) + ${i * 14}px)">
      <a href="services/${s.slug}/" class="sc-in">
        <span class="sc-n mono">${s.n} / 0${services.length}</span>
        <h3 class="sc-h">${s.name}</h3>
        <p class="sc-l">${s.lede}</p>
        <ul class="sc-caps mono">${s.caps.slice(0, 4).map(c => `<li>${c}</li>`).join('')}</ul>
        <span class="sc-go">Explore ${arrow}</span>
      </a></article>`).join('')}
  </div>
</section>

<section class="logos" aria-label="Brands we work with">
  <div class="wrap sec-head"><p class="eyebrow">Brands we work with</p><a class="link-arrow sec-link" href="clients/">Clients ${arrow}</a></div>
  ${[cases, [...cases.slice(2), ...cases.slice(0, 2)]].map((row, r) => `<div class="marquee" data-marquee="${r ? -1 : 1}"><div class="mq-track">${[0, 1, 2].map(rep => row.map((c, i) => `<span class="lg lg-${(i + r * 3 + rep) % 6}"${rep ? ' aria-hidden="true"' : ''}>${c.client}</span>`).join('')).join('')}</div></div>`).join('\n  ')}
</section>

<section class="newsrow wrap" aria-labelledby="news-h">
  <div class="sec-head"><h2 id="news-h" class="h-l" data-split>Newsroom</h2><a class="link-arrow sec-link" href="news/">All news ${arrow}</a></div>
  <ul class="nl-list" data-hover-list>
    ${news.slice(0, 4).map(n => `<li data-reveal><a href="news/${n.slug}/" data-img="assets/img/${n.img}.webp" data-cursor="Read"><span class="mono nl-d">${fmtDate(n.date)}</span><span class="mono nl-ty">${n.type}</span><span class="nl-t">${n.title}</span>${arrow}</a></li>`).join('')}
  </ul>
</section>

`;
  return page({ root, path: '', title: 'Flint — Independent brand & marketing company in Indiana', desc: `Flint (Flint Marketing) is an independent brand and marketing company founded in 2026, serving businesses across ${regionLong}.`, body, cls: 'p-home' });
}

export function workIndex() {
  const root = '../';
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Work — ${cases.length} case studies</p>
  <h1 class="h-xxl" data-split>Work<sup class="phero-sup">(${String(cases.length).padStart(2, '0')})</sup></h1>
  <p class="lead phero-lede" data-fade>Every project we have shipped, told the way it happened: the brief, the insight, the work and what we built.</p>
</section>
<section class="wrap">
  <ul class="wg" data-work-grid data-hover-list>
    ${cases.map((c, i) => `<li class="wg-i wg-${i % 4}" data-tags="${c.svc.map(svcName).join(',')}">
      <a href="${c.slug}/" data-img="${root}assets/img/${c.slug}-hero.webp" data-cursor="View">
        <span class="wg-m" data-img-reveal>${img(root, c.slug + '-hero', c.client + ' — ' + c.title, 'im-l')}${img(root, c.slug + '-2', '', 'im-p')}</span>
        <span class="wg-txt"><span class="wg-c">${c.client}</span><span class="wg-t">${c.title}</span><span class="wg-meta mono">${c.disc.join(' · ')} — ${c.year}</span></span>
      </a></li>`).join('')}
  </ul>
  </section>
`;
  return page({ root, path: 'work/', title: 'Work — Flint', desc: 'Case studies from Flint: websites for Aerial Hunter, Casa Fresca, Conexus Design and Bertram’s Elite Mobile Detailing.', body, cls: 'p-work' });
}

export function caseStudy(c, i) {
  const root = '../../';
  const t = c.theme;
  const next = cases[(i + 1) % cases.length];
  const vars = `--bg:${t.bg};--fg:${t.fg};--accent:${t.accent};--mute:${t.muted};--cs-font:'${t.font}';--cs-w:${t.weight};--cs-tr:${t.track};--cs-tt:${t.upper ? 'uppercase' : 'none'};--cs-st:${t.stretch || '100%'}`;
  const ext = (h, label, cls = 'ul') => `<a class="${cls}" href="${h}" target="_blank" rel="noopener">${label}</a>`;
  const metaRows = [['Client', c.client], ['Year', c.year], ['Sector', c.sector], ['Services', c.disc.join(', ')], ['Serves', c.markets], ['Website', ext(c.site, c.siteLabel + ' ↗')]];
  const meta = `<dl class="cs-meta mono">${metaRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const visit = `<div class="cs-visits" data-fade>${c.links.map(([l, h], k) => `<a class="btn${k ? ' btn-ghost' : ''} cs-visit" href="${h}" target="_blank" rel="noopener"><span>${l} ↗</span></a>`).join('')}</div>`;
  const hero = `<section class="cs-hero csh-center wrap"><p class="eyebrow cs-eb" data-fade><span>Case study ${String(i + 1).padStart(2, '0')}</span><span>${c.client}</span></p><h1 class="cs-title" data-split="hero">${c.title}</h1><p class="lead cs-lede" data-fade>${c.lede}</p>${visit}</section>
    <section class="csh-window" data-window><div class="cw-in">${img(root, c.slug + '-hero', `${c.client}: ${c.title}`, '', 'loading="eager" fetchpriority="high"')}</div></section><section class="wrap cs-metawrap">${meta}</section>`;
  const plates = c.plates.map(n => img(root, n, '', '', 'sizes="(min-width:900px) 50vw, 100vw"'));
  const svcList = `<ul class="cr-list">${c.svc.map(s => { const v = services.find(x => x.slug === s); return `<li data-reveal><a class="ul" href="${root}services/${s}/">${v.name}</a></li>`; }).join('')}</ul>`;
  const half = 'sizes="(min-width:900px) 50vw, 100vw"';
  const body = `
${hero}
<section class="cs-sec wrap grid cs-brief">
  <p class="eyebrow cs-k" data-fade>01 — The brief</p>
  <p class="focus" data-focus>${c.brief}</p>
</section>
<section class="cs-show" aria-labelledby="show-${c.slug}">
  <div class="wrap">
    <div class="sh-head"><p class="eyebrow cs-k" data-fade>At a glance</p><h2 class="cs-h2" id="show-${c.slug}" data-split>${c.client}, on desktop and phone.</h2><a class="link-arrow mono sh-l" href="${c.site}" target="_blank" rel="noopener">${c.site.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a></div>
    <div class="sh-stage">
      <figure class="sh-desk" data-img-reveal>${img(root, c.gallery[0][0], `${c.client}: ${c.gallery[0][1]}`, '', 'sizes="(min-width:900px) 66vw, 100vw"')}<figcaption class="mono">${c.gallery[0][1]}</figcaption></figure>
      <figure class="sh-phone" data-img-reveal>${img(root, c.phones[0][0], `${c.client}: ${c.phones[0][1]}`, '', 'sizes="(min-width:900px) 28vw, 60vw"')}<figcaption class="mono">${c.phones[0][1]}</figcaption></figure>
    </div>
  </div>
</section>
<section class="cs-sec wrap grid cs-insight">
  <p class="eyebrow cs-k" data-fade>02 — The insight</p>
  <div class="ci-body"><h2 class="cs-h2" data-split>${c.insightH}</h2><p class="ci-p" data-fade>${c.insight}</p></div>
</section>
<section class="cs-chapters wrap" data-chapters>
  <div class="cc-media" aria-hidden="true">${plates.map((p, k) => `<div class="cc-plate${k ? '' : ' on'}">${p}</div>`).join('')}<span class="cc-count mono"><span data-cc-i>01</span> / 03</span></div>
  <div class="cc-list">
    <p class="eyebrow cs-k">03 — The work</p>
    ${c.chapters.map((ch, k) => `<article class="cc-ch" data-ch="${k}"><span class="mono cc-n">0${k + 1}</span><h3 class="cs-h3">${ch[0]}</h3><p>${ch[1]}</p><div class="cc-mob">${plates[k]}</div></article>`).join('')}
  </div>
</section>
<section class="cs-sec wrap cs-results cs-built" aria-labelledby="built-${c.slug}">
  <div class="res-head"><p class="eyebrow cs-k">04 — What we built</p><h2 class="cs-h2" id="built-${c.slug}" data-split>A working site, not a brochure.</h2></div>
  <div class="res-grid">${c.built.map(m => `<div class="res-m" data-reveal><span class="res-v">${count(m)}</span><span class="res-l">${m.label}</span></div>`).join('')}</div>
</section>
<section class="cs-sec wrap cs-gallery" aria-labelledby="gal-${c.slug}">
  <div class="res-head"><p class="eyebrow cs-k">05 — The site</p><h2 class="cs-h2" id="gal-${c.slug}" data-split>${c.galleryH}</h2><p class="mono gal-note">${c.galleryNote}</p></div>
  <ul class="gal gal-r4">${c.gallery.slice(1).map(([n, cap], k) => `<li class="gal-i${k === 0 ? ' gal-w' : ''}" data-reveal><a href="${c.site}" target="_blank" rel="noopener" data-cursor="Visit"><span class="gal-m" data-img-reveal>${img(root, n, `${c.client}: ${cap}`, '', k === 0 ? '' : half)}</span><span class="mono gal-c">${cap}</span></a></li>`).join('')}
    ${c.phones.slice(1).map(([n, cap]) => `<li class="gal-i gal-mob gal-solo" data-reveal><a href="${c.site}" target="_blank" rel="noopener" data-cursor="Visit"><span class="gal-m gal-phone" data-img-reveal>${img(root, n, `${c.client}: ${cap}`, '', 'sizes="(min-width:900px) 25vw, 50vw"')}</span><span class="mono gal-c">${cap}</span></a></li>`).join('')}
  </ul>
</section>
<section class="cs-credits wrap grid">
  <div><p class="eyebrow">Built with</p><ul class="cr-list">${c.stack.map(x => `<li data-reveal>${x}</li>`).join('')}</ul></div>
  <div><p class="eyebrow">Services</p>${svcList}</div>
  <div><p class="eyebrow">See it live</p>${c.links.map(([l, h]) => `<a class="link-arrow" href="${h}" target="_blank" rel="noopener">${l} ↗</a>`).join('<br>')}<p class="eyebrow cr-gap">Want a site like this?</p><a class="link-arrow" href="${root}contact/?service=${c.svc[0]}">Start a project ${arrow}</a></div>
</section>
<section class="cs-next">
  <a href="../${next.slug}/" class="cn-a" data-cursor="Next">
    <span class="cn-media">${img(root, next.slug + '-hero', '', '', 'sizes="100vw"')}</span>
    <span class="cn-txt wrap"><span class="mono">Next case — ${String((i + 1) % cases.length + 1).padStart(2, '0')} / ${String(cases.length).padStart(2, '0')}</span><span class="cn-t">${next.client}</span><span class="cn-s">${next.title} ${arrow}</span></span>
  </a>
</section>`;
  return page({ root, path: 'work/', title: `${c.client}: ${c.title} — Flint`, desc: c.lede, body, vars, fonts: t.fam ? [t.fam] : [], cls: `p-case cs-${c.slug} lay-center${t.dark ? ' dark' : ''}` });
}
