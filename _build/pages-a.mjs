import { esc, img, arrow, page, countyList } from './shell.mjs';
import { cases, services, stats, clients, news, archive } from './data.mjs';

const fmtDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export { fmtDate };
const svcName = s => services.find(x => x.slug === s).short;
const count = (m) => `<span data-count="${m.v}" data-dec="${m.dec || 0}" data-prefix="${m.prefix || ''}" data-suffix="${esc(m.suffix || '')}"${m.plain ? ' data-plain' : ''}>${m.prefix || ''}${m.dec ? m.v.toFixed(m.dec) : m.plain ? m.v : m.v.toLocaleString('en-US')}${m.suffix || ''}</span>`;
export { count };

const quotes = ['norrow', 'halden', 'lumen'].map(s => cases.find(c => c.slug === s).quote);

export function home() {
  const root = '';
  const body = `
<section class="hero wrap">
  <div class="hero-meta mono" data-fade>
    <span>Independent brand &amp; marketing company</span><span>Est. 2026</span><span class="hide-s">West-central Indiana · Seven counties</span>
  </div>
  <h1 class="hero-h" data-split="hero">We make brands <span class="pill" aria-hidden="true">${['aerial-hunter-hero', 'halden-hero', 'volta-hero', 'oree-hero', 'norrow-hero'].map((n, i) => img(root, n, '', i ? '' : 'on', 'loading="eager"')).join('')}</span> impossible <em class="serif-i">to&nbsp;ignore.</em></h1>
  <div class="hero-foot">
    <p class="lead hero-lede" data-fade>Flint helps ambitious companies find the one idea worth repeating, and then makes sure the right people hear it.</p>
    <div class="hero-scroll mono" data-fade><span class="hs-line"></span>Scroll</div>
  </div>
</section>

<section class="reel" data-reel-section>
  <div class="reel-frame" data-expand>
    <div class="reel-media" data-reel-slides>${cases.map((c, i) => img(root, c.slug + '-hero', '', i ? '' : 'on', i < 2 ? 'loading="eager"' : '')).join('')}</div>
    <div class="reel-cap mono"><span>Showreel 2026</span><span data-reel-name data-names="${esc(cases.map(c => c.client).join('|'))}">${cases[0].client}</span></div>
    <button class="reel-play" type="button" data-reel-open data-magnetic data-strength="0.5" data-cursor="Play"><span>Play<br>reel</span></button>
  </div>
</section>

<section class="statement wrap grid">
  <p class="eyebrow st-eb" data-fade>(About Flint)</p>
  <div class="st-body">
    <p class="focus" data-focus>Flint is an independent brand and marketing company, founded in 2026 in west-central Indiana. We bring strategy, identity, campaigns, media, social and websites under one roof for businesses across seven counties, from Lafayette to Greencastle.</p>
    <a class="link-arrow" href="about/">Our story ${arrow}</a>
  </div>
</section>

<section class="sel wrap" aria-labelledby="sel-h">
  <div class="sec-head">
    <h2 id="sel-h" class="h-l" data-split>Selected work</h2>
    <p class="mono sec-meta">(2026)</p>
    <a class="link-arrow sec-link" href="work/">All work <sup>${cases.length + archive.length}</sup> ${arrow}</a>
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
    <div class="num-head"><p class="eyebrow">Flint in numbers</p><p class="num-note">Independent, and based in Indiana.</p></div>
    <div class="num-grid">${stats.map(s => `<div class="num" data-reveal><span class="num-v">${count(s)}</span><span class="num-l">${s.label}</span></div>`).join('')}</div>
    <div class="awards-row mono">${countyList.map(c => `<span>${c}</span>`).join('')}</div>
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

<section class="logos" aria-label="Selected clients">
  <div class="wrap sec-head"><p class="eyebrow">Brands we work with</p><a class="link-arrow sec-link" href="clients/">Clients ${arrow}</a></div>
  <div class="marquee" data-marquee="1"><div class="mq-track">${clients.slice(0, 15).map((c, i) => `<span class="lg lg-${i % 6}">${c}</span>`).join('')}</div></div>
  <div class="marquee" data-marquee="-1"><div class="mq-track">${clients.slice(15).map((c, i) => `<span class="lg lg-${(i + 3) % 6}">${c}</span>`).join('')}</div></div>
</section>

<section class="quotes wrap" data-quotes aria-label="Client testimonials">
  <p class="eyebrow">In their words</p>
  <div class="q-stage">
    ${quotes.map((q, i) => `<figure class="q${i ? '' : ' on'}" aria-hidden="${i ? 'true' : 'false'}"><blockquote class="q-t">“${q[0]}”</blockquote><figcaption class="mono"><b>${q[1]}</b> — ${q[2]}</figcaption></figure>`).join('')}
  </div>
  <div class="q-ctl"><button type="button" class="q-btn" data-q="-1" aria-label="Previous quote">←</button><span class="mono q-count"><span data-q-i>01</span> / 0${quotes.length}</span><button type="button" class="q-btn" data-q="1" aria-label="Next quote">→</button></div>
</section>

<section class="newsrow wrap" aria-labelledby="news-h">
  <div class="sec-head"><h2 id="news-h" class="h-l" data-split>Newsroom</h2><a class="link-arrow sec-link" href="news/">All news ${arrow}</a></div>
  <ul class="nl-list" data-hover-list>
    ${news.slice(0, 4).map(n => `<li data-reveal><a href="news/${n.slug}/" data-img="assets/img/${n.img}.webp" data-cursor="Read"><span class="mono nl-d">${fmtDate(n.date)}</span><span class="mono nl-ty">${n.type}</span><span class="nl-t">${n.title}</span>${arrow}</a></li>`).join('')}
  </ul>
</section>

<div class="reel-modal" data-reel-modal role="dialog" aria-modal="true" aria-label="Showreel" hidden>
  <div class="rm-stage">${cases.map(c => `<figure class="rm-slide">${img(root, c.slug + '-hero', c.client)}<figcaption><span class="mono">${c.client} — ${c.year}</span><span class="rm-t">${c.title}</span></figcaption></figure>`).join('')}</div>
  <div class="rm-bar"><span data-rm-progress></span></div>
  <button class="rm-close mono" type="button" data-reel-close>Close ✕</button>
</div>`;
  return page({ root, path: '', title: 'Flint — Independent brand & marketing company in Indiana', desc: 'Flint (Flint Marketing) is an independent brand and marketing company founded in 2026, serving Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties in Indiana.', body, cls: 'p-home' });
}

const filters = ['Strategy', 'Identity', 'Campaigns', 'Media', 'Social', 'Digital'];
export function workIndex() {
  const root = '../';
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Work — ${cases.length} case studies</p>
  <h1 class="h-xxl" data-split>Work<sup class="phero-sup">(${String(cases.length).padStart(2, '0')})</sup></h1>
  <p class="lead phero-lede" data-fade>Selected case studies, each told the way it happened: the brief, the insight, the work and what we built.</p>
</section>
<section class="wrap work-tools" data-fade>
  <div class="chips" role="group" aria-label="Filter by service" data-filter>
    <button class="chip on" type="button" data-f="all" aria-pressed="true">All <sup>${cases.length}</sup></button>
    ${filters.map(f => { const n = cases.filter(c => c.svc.map(svcName).includes(f)).length; return `<button class="chip" type="button" data-f="${f}" aria-pressed="false">${f} <sup>${n}</sup></button>`; }).join('')}
  </div>
  <div class="view-tg mono" role="group" aria-label="Layout"><button type="button" class="on" data-view="grid" aria-pressed="true">Grid</button><button type="button" data-view="list" aria-pressed="false">List</button></div>
</section>
<section class="wrap">
  <ul class="wg" data-work-grid data-hover-list>
    ${cases.map((c, i) => `<li class="wg-i wg-${i % 4}" data-tags="${c.svc.map(svcName).join(',')}">
      <a href="${c.slug}/" data-img="${root}assets/img/${c.slug}-hero.webp" data-cursor="View">
        <span class="wg-m" data-img-reveal>${img(root, c.slug + '-hero', c.client + ' — ' + c.title, 'im-l')}${img(root, c.slug + '-2', '', 'im-p')}</span>
        <span class="wg-txt"><span class="wg-c">${c.client}</span><span class="wg-t">${c.title}</span><span class="wg-meta mono">${c.disc.join(' · ')} — ${c.year}</span></span>
      </a></li>`).join('')}
  </ul>
  <p class="wg-empty mono" data-empty hidden>No case studies in this filter yet.</p>
</section>
<section class="wrap archive">
  <div class="sec-head"><h2 class="h-l" data-split>More projects</h2><p class="mono sec-meta">Full case studies available on request</p></div>
  <table class="atab">
    <thead class="mono"><tr><th>Client</th><th>Project</th><th class="hide-s">Discipline</th></tr></thead>
    <tbody>${archive.map(a => `<tr data-reveal><td>${a[0]}</td><td>${a[1]}</td><td class="mono hide-s">${a[2]}</td></tr>`).join('')}</tbody>
  </table>
</section>`;
  return page({ root, path: 'work/', title: 'Work — Flint', desc: 'Selected case studies from Flint: brand, campaign, media, social and website work, including Aerial Hunter.', body, cls: 'p-work' });
}

export function caseStudy(c, i) {
  const root = '../../';
  const t = c.theme;
  const next = cases[(i + 1) % cases.length];
  const vars = `--bg:${t.bg};--fg:${t.fg};--accent:${t.accent};--mute:${t.muted};--cs-font:'${t.font}';--cs-w:${t.weight};--cs-tr:${t.track};--cs-tt:${t.upper ? 'uppercase' : 'none'};--cs-st:${t.stretch || '100%'}`;
  const siteLink = c.site ? `<a class="ul" href="${c.site}" target="_blank" rel="noopener">${c.site.replace(/^https:\/\//, '').replace(/\/$/, '')} ↗</a>` : '';
  const metaRows = c.real
    ? [['Client', c.client], ['Year', c.year], ['Sector', c.sector], ['Services', c.disc.join(', ')], ['Location', c.markets], ['Live site', siteLink]]
    : [['Client', c.client], ['Year', c.year], ['Sector', c.sector], ['Services', c.disc.join(', ')], ['Markets', c.markets], ['Duration', c.duration]];
  const meta = `<dl class="cs-meta mono">${metaRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const title = `<h1 class="cs-title" data-split="hero">${c.title}</h1>`;
  const eb = `<p class="eyebrow cs-eb" data-fade><span>Case study ${String(i + 1).padStart(2, '0')}</span><span>${c.client}</span></p>`;
  const heroAlt = c.real ? `${c.client} website, home page` : c.client;
  let hero;
  if (c.layout === 'full') hero = `<section class="cs-hero csh-full">
    <div class="csh-media" data-hero-media>${img(root, c.slug + '-hero', heroAlt, '', 'loading="eager" fetchpriority="high"')}</div>
    <div class="csh-over wrap">${eb}${title}<p class="lead cs-lede" data-fade>${c.lede}</p></div>
  </section><section class="wrap cs-metawrap">${meta}</section>`;
  else if (c.layout === 'type') hero = `<section class="cs-hero csh-type wrap">${eb}${title}<div class="csh-row"><p class="lead cs-lede" data-fade>${c.lede}</p>${meta}</div></section>
    <section class="csh-expand" data-expand><div class="reel-frame">${img(root, c.slug + '-hero', heroAlt, '', 'loading="eager"')}</div></section>`;
  else if (c.layout === 'split') hero = `<section class="cs-hero csh-split wrap"><div class="css-l">${eb}${title}<p class="lead cs-lede" data-fade>${c.lede}</p>${meta}</div><div class="css-r" data-img-reveal>${img(root, c.slug + '-2', heroAlt, '', 'loading="eager"')}</div></section>`;
  else hero = `<section class="cs-hero csh-center wrap">${eb}${title}<p class="lead cs-lede" data-fade>${c.lede}</p>${c.site ? `<a class="btn cs-visit" href="${c.site}" target="_blank" rel="noopener" data-fade><span>Visit the live site ↗</span></a>` : ''}</section>
    <section class="csh-window" data-window><div class="cw-in">${img(root, c.slug + '-hero', heroAlt, '', 'loading="eager"')}</div></section><section class="wrap cs-metawrap">${meta}</section>`;

  const plates = c.plates
    ? c.plates.map(n => img(root, n, ''))
    : [img(root, c.slug + '-hero', ''), img(root, c.slug + '-2', ''), `<div class="plate"><span class="plate-c">${c.client}</span><span class="plate-t">${c.title}</span><span class="plate-sw">${[t.bg, t.fg, t.accent, t.muted].map(s => `<i style="background:${s}"></i>`).join('')}</span><span class="mono plate-f">${t.font} — ${c.disc.join(' / ')}</span></div>`];

  const intro = `
${hero}
<section class="cs-sec wrap grid cs-brief">
  <p class="eyebrow cs-k" data-fade>01 — The brief</p>
  <p class="focus" data-focus>${c.brief}</p>
</section>
<section class="cs-zoom" data-zoom aria-label="${esc(c.zoom)}"><div class="cz-in"><span class="cz-w">${c.zoom}</span></div></section>
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
</section>`;

  const nextBlock = `<section class="cs-next">
  <a href="../${next.slug}/" class="cn-a" data-cursor="Next">
    <span class="cn-media">${img(root, next.slug + '-hero', '')}</span>
    <span class="cn-txt wrap"><span class="mono">Next case — ${String((i + 1) % cases.length + 1).padStart(2, '0')} / ${String(cases.length).padStart(2, '0')}</span><span class="cn-t">${next.client}</span><span class="cn-s">${next.title} ${arrow}</span></span>
  </a>
</section>`;
  const svcList = `<ul class="cr-list">${c.svc.map(s => { const v = services.find(x => x.slug === s); return `<li data-reveal><a class="ul" href="${root}services/${s}/">${v.name}</a></li>`; }).join('')}</ul>`;

  let rest;
  if (c.real) {
    rest = `
<section class="cs-sec wrap cs-results cs-built" aria-labelledby="built-${c.slug}">
  <div class="res-head"><p class="eyebrow cs-k">04 — What we built</p><h2 class="cs-h2" id="built-${c.slug}" data-split>A working site, not a brochure.</h2></div>
  <div class="res-grid">${c.built.map(m => `<div class="res-m" data-reveal><span class="res-v">${count(m)}</span><span class="res-l">${m.label}</span></div>`).join('')}</div>
</section>
<section class="cs-sec wrap cs-gallery" aria-labelledby="gal-${c.slug}">
  <div class="res-head"><p class="eyebrow cs-k">05 — The site</p><h2 class="cs-h2" id="gal-${c.slug}" data-split>Screens from the live site.</h2></div>
  <ul class="gal">${c.gallery.map(([n, cap], k) => `<li class="gal-i${k === 0 ? ' gal-w' : ''}" data-reveal><a href="${c.site}" target="_blank" rel="noopener" data-cursor="Visit"><span class="gal-m" data-img-reveal>${img(root, n, `${c.client} website: ${cap}`)}</span><span class="mono gal-c">${cap}</span></a></li>`).join('')}
    <li class="gal-i gal-mob" data-reveal><a href="${c.site}" target="_blank" rel="noopener" data-cursor="Visit"><span class="gal-m gal-phone" data-img-reveal>${img(root, c.slug + '-2', `${c.client} website on a phone`)}</span><span class="mono gal-c">On a phone</span></a></li>
    <li class="gal-i gal-mob" data-reveal><a href="${c.site}" target="_blank" rel="noopener" data-cursor="Visit"><span class="gal-m gal-phone" data-img-reveal>${img(root, c.slug + '-area-m', `${c.client} service area page on a phone`)}</span><span class="mono gal-c">Service area, on a phone</span></a></li>
  </ul>
</section>
<section class="cs-credits wrap grid">
  <div><p class="eyebrow">Built with</p><ul class="cr-list">${c.stack.map(x => `<li data-reveal>${x}</li>`).join('')}</ul></div>
  <div><p class="eyebrow">Services</p>${svcList}</div>
  <div><p class="eyebrow">See it live</p><a class="link-arrow" href="${c.site}" target="_blank" rel="noopener">Visit aerial-hunter ↗</a><p class="eyebrow cr-gap">Want a site like this?</p><a class="link-arrow" href="${root}contact/?service=${c.svc[0]}">Start a project ${arrow}</a></div>
</section>
${nextBlock}`;
  } else {
    const met = c.objectives.filter(o => o[4] ? o[2] <= o[1] : o[2] >= o[1]).length;
    const rate = Math.round(met / c.objectives.length * 100);
    const months = parseInt(c.duration, 10) || 6;
    const when = k => `Month ${String(Math.round(1 + k * (months - 1) / Math.max(1, c.timeline.length - 1))).padStart(2, '0')}`;
    const W = 1000, H = 320, max = Math.max(...c.chart.pts) * 1.1, min = Math.min(0, ...c.chart.pts);
    const xy = c.chart.pts.map((p, k) => [Math.round(k / (c.chart.pts.length - 1) * W), Math.round(H - (p - min) / (max - min) * H)]);
    const path = xy.map((p, k) => (k ? 'L' : 'M') + p.join(' ')).join(' ');
    const area = path + ` L ${W} ${H} L 0 ${H} Z`;
    const fmtO = (v, u) => u === 'idx' ? v : `${v}${u === '%' || u === '★' || u === '×' ? (u === '★' ? ' ★' : u) : u ? ' ' + u : ''}`;
    rest = `
<section class="cs-tl" data-hscroll aria-labelledby="tl-h-${c.slug}">
  <div class="tl-head wrap"><p class="eyebrow cs-k">04 — Timeline</p><h2 class="cs-h2" id="tl-h-${c.slug}" data-split>${c.duration}, start to finish.</h2></div>
  <div class="tl-viewport"><ol class="tl-track">
    ${c.timeline.map((s, k) => `<li class="tl-step"><span class="tl-dot"></span><span class="mono tl-w">${when(k)}</span><span class="tl-k mono">Phase ${String(k + 1).padStart(2, '0')}</span><h3 class="tl-t">${s.title}</h3><p>${s.body}</p></li>`).join('')}
  </ol></div>
  <div class="tl-bar wrap" aria-hidden="true"><span data-tl-progress></span></div>
</section>
<section class="cs-sec wrap cs-results" aria-labelledby="res-${c.slug}">
  <div class="res-head"><p class="eyebrow cs-k">05 — Results</p><h2 class="cs-h2" id="res-${c.slug}" data-split>What it did for the business.</h2></div>
  <div class="res-grid">${c.metrics.map(m => `<div class="res-m" data-reveal><span class="res-v">${count(m)}</span><span class="res-l">${m.label}</span></div>`).join('')}</div>
  <div class="srate">
    <div class="sr-ring" data-ring="${rate}">
      <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="sr-bg"/><circle cx="60" cy="60" r="52" class="sr-fg" pathLength="100" style="stroke-dashoffset:${100 - rate}"/></svg>
      <div class="sr-c"><span class="sr-v"><span data-count="${rate}">${rate}</span>%</span><span class="mono">Success rate</span></div>
    </div>
    <div class="sr-side">
      <h3 class="cs-h3">${met} of ${c.objectives.length} objectives met or beaten</h3>
      <p class="sr-note">Every Flint engagement starts with objectives agreed with the client’s finance team. This is how ${c.client} scored the work at the project review.</p>
      <ul class="obj">${c.objectives.map(o => { const [lab, tg, ac, u, low] = o; const ok = low ? ac <= tg : ac >= tg; const scale = Math.max(tg, ac) * 1.12; return `<li class="${ok ? 'ok' : 'miss'}"><div class="obj-top"><span>${lab}</span><span class="mono obj-tag">${ok ? 'Beaten' : 'Missed'}</span></div><div class="obj-bar" data-bar><span class="obj-act" style="--w:${(ac / scale * 100).toFixed(1)}%"></span><span class="obj-tgt" style="left:${(tg / scale * 100).toFixed(1)}%"></span></div><div class="obj-nums mono"><span>Target ${low ? '≤ ' : ''}${fmtO(tg, u)}</span><span>Actual ${fmtO(ac, u)}</span></div></li>`; }).join('')}</ul>
    </div>
  </div>
  <figure class="chart" data-chart>
    <figcaption class="mono"><span>${c.chart.label}</span><span>12 periods</span></figcaption>
    <svg viewBox="-10 -10 ${W + 20} ${H + 20}" preserveAspectRatio="none" role="img" aria-label="${esc(c.chart.label)}: rising from ${c.chart.pts[0]} to ${c.chart.pts.at(-1)}">
      ${[0, 1, 2, 3].map(g => `<line x1="0" x2="${W}" y1="${g * H / 3}" y2="${g * H / 3}" class="ch-grid"/>`).join('')}
      <path d="${area}" class="ch-area"/><path d="${path}" class="ch-line" pathLength="1"/>
      ${xy.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="5" class="ch-pt"/>`).join('')}
    </svg>
    <div class="ch-x mono">${['Launch', 'Q1', 'Q2', 'Q3', 'Q4'].map(x => `<span>${x}</span>`).join('')}</div>
  </figure>
</section>
<section class="cs-quote wrap">
  <blockquote class="cq" data-split>“${c.quote[0]}”</blockquote>
  <p class="mono cq-by" data-fade><b>${c.quote[1]}</b> — ${c.quote[2]}</p>
</section>
<section class="cs-credits wrap grid">
  <div><p class="eyebrow">Disciplines</p><ul class="cr-list">${c.disc.map(a => `<li data-reveal>${a}</li>`).join('')}</ul></div>
  <div><p class="eyebrow">Services</p>${svcList}</div>
  <div><p class="eyebrow">Want results like these?</p><a class="link-arrow" href="${root}contact/?service=${c.svc[0]}">Start a project ${arrow}</a></div>
</section>
${nextBlock}`;
  }
  return page({ root, path: 'work/', title: `${c.client}: ${c.title} — Flint`, desc: c.lede, body: intro + rest, vars, fonts: t.fam ? [t.fam] : [], cls: `p-case cs-${c.slug} lay-${c.layout}${t.dark ? ' dark' : ''}${t.italic ? ' cs-ital' : ''}` });
}
