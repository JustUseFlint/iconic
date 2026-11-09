import { esc, img, arrow, page, logo, countyList } from './shell.mjs';
import { cases, services, clients, clientSectors, news, areas, areaOrder, TZ } from './data.mjs';
import { fmtDate, count } from './pages-a.mjs';

export function servicesIndex() {
  const root = '../';
  const allCaps = services.flatMap(s => s.caps);
  const body = `
<section class="phero wrap svc-hero">
  <p class="eyebrow" data-fade>Services — six practices, one team</p>
  <h1 class="h-xxl roller-h"><span data-split="hero">We do</span> <span class="roller" data-roller aria-label="${services.map(s => s.short).join(', ')}"><span class="roller-in">${services.map(s => `<span>${s.short}.</span>`).join('')}<span>${services[0].short}.</span></span></span></h1>
  <p class="lead phero-lede" data-fade>Most clients start with one practice and stay for three. Every team is led by a partner, staffed across disciplines and measured against the same business objectives you are.</p>
</section>
<section class="wrap svc-acc" aria-label="Services">
  ${services.map((s, i) => `<details class="acc" data-reveal${i ? '' : ' open'}>
    <summary><span class="mono acc-n">${s.n}</span><span class="acc-t">${s.name}</span><span class="acc-l">${s.lede}</span><span class="acc-x" aria-hidden="true"></span></summary>
    <div class="acc-b"><div class="acc-in">
      <p>${s.body}</p>
      <ul class="mono acc-caps">${s.caps.map(c => `<li>${c}</li>`).join('')}</ul>
      <a class="btn" href="${s.slug}/" data-magnetic><span>Explore ${s.name}</span></a>
    </div></div>
  </details>`).join('')}
</section>
<section class="process" data-process aria-labelledby="proc-h">
  <div class="wrap">
    <div class="sec-head"><h2 id="proc-h" class="h-l" data-split>How every project runs</h2><p class="mono sec-meta">Average engagement: 7 months</p></div>
    <ol class="proc">
      ${[['Discover', 'Weeks 1–3', 'We listen before we make anything: stakeholders, customers, data and the category.'], ['Define', 'Weeks 3–6', 'One brief, one objective set, signed off by marketing and finance together.'], ['Design', 'Weeks 6–16', 'Senior teams make the work, test it with real people and refine it fast.'], ['Deliver', 'Week 16 →', 'Launch, measure, optimise. A monthly effectiveness review for the first year.']].map((p, i) => `<li class="proc-s"><span class="proc-dot"><i></i></span><span class="mono">0${i + 1} · ${p[1]}</span><h3>${p[0]}</h3><p>${p[2]}</p></li>`).join('')}
    </ol>
    <div class="proc-line" aria-hidden="true"><span data-proc-line></span></div>
  </div>
</section>
<section class="wrap caps-cloud" aria-labelledby="caps-h">
  <div class="sec-head"><h2 id="caps-h" class="h-l" data-split>Capabilities</h2><p class="mono sec-meta">${allCaps.length} disciplines in-house</p></div>
  <ul class="cloud">${allCaps.map(c => `<li data-magnetic data-strength="0.25">${c}</li>`).join('')}</ul>
</section>
<section class="wrap models grid" aria-labelledby="mod-h">
  <h2 id="mod-h" class="h-m models-h" data-split>Three ways to work with us</h2>
  <div class="models-list">
    ${[['Project', 'A defined scope, a fixed fee and a launch date. Typically 8–20 weeks.', 'Best for rebrands, launches and campaigns.'], ['Retainer', 'A dedicated team on a monthly fee with quarterly objectives.', 'Best for always-on content, media and product.'], ['Embedded', 'Flint strategists, designers or analysts working inside your team.', 'Best for in-house teams that need senior capacity.']].map((m, i) => `<div class="model" data-reveal><span class="mono">0${i + 1}</span><h3>${m[0]}</h3><p>${m[1]}</p><p class="mono model-b">${m[2]}</p></div>`).join('')}
  </div>
</section>`;
  return page({ root, path: 'services/', title: 'Services — Flint', desc: 'Brand strategy, identity, campaigns, performance media, social and digital product from one independent team.', body, cls: 'p-services' });
}

export function servicePage(s, i) {
  const root = '../../';
  const work = s.work.map(slug => cases.find(c => c.slug === slug));
  const body = `
<section class="phero wrap svp-hero">
  <p class="eyebrow" data-fade><a class="ul" href="../">Services</a> / ${s.n} of 0${services.length}</p>
  <h1 class="h-xxl" data-split="hero">${s.name}</h1>
  <div class="svp-row"><p class="lead phero-lede" data-fade>${s.lede}</p><a class="btn" href="${root}contact/?service=${s.slug}" data-magnetic data-fade><span>Start a ${s.short.toLowerCase()} project</span></a></div>
</section>
<section class="wrap grid svp-intro">
  <div class="svp-stat" data-reveal><span class="svp-sv">${s.stat[0]}</span><span class="svp-sl">${s.stat[1]}</span></div>
  <p class="focus" data-focus>${s.body}</p>
</section>
<section class="wrap svp-caps" aria-labelledby="cap-h">
  <div class="sec-head"><h2 id="cap-h" class="h-l" data-split>What’s included</h2></div>
  <ol class="caps-list">${s.caps.map((c, k) => `<li data-reveal><span class="mono">${String(k + 1).padStart(2, '0')}</span>${c}</li>`).join('')}</ol>
</section>
<section class="process" data-process aria-labelledby="ap-h">
  <div class="wrap">
    <div class="sec-head"><h2 id="ap-h" class="h-l" data-split>Our approach</h2></div>
    <ol class="proc">${s.steps.map((p, k) => `<li class="proc-s"><span class="proc-dot"><i></i></span><span class="mono">Step 0${k + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>
    <div class="proc-line" aria-hidden="true"><span data-proc-line></span></div>
  </div>
</section>
<section class="wrap svp-work" aria-labelledby="sw-h">
  <div class="sec-head"><h2 id="sw-h" class="h-l" data-split>Related work</h2><a class="link-arrow sec-link" href="${root}work/">All work ${arrow}</a></div>
  <ul class="rw">${work.map(c => `<li data-reveal><a href="${root}work/${c.slug}/" data-cursor="View"><span class="rw-m" data-img-reveal>${img(root, c.slug + '-2', c.client)}</span><span class="rw-c">${c.client}</span><span class="rw-t">${c.title}</span><span class="mono rw-r">${c.metrics ? `${c.metrics[0].prefix || ''}${c.metrics[0].v}${c.metrics[0].suffix} ${c.metrics[0].label.toLowerCase()}` : `${c.built[0].v} ${c.built[0].label.toLowerCase()}`}</span></a></li>`).join('')}</ul>
</section>
<section class="wrap grid faq" aria-labelledby="faq-h">
  <h2 id="faq-h" class="h-m" data-split>Questions we hear</h2>
  <div>${s.faq.map(f => `<details class="acc acc-sm" data-reveal><summary><span class="acc-t">${f[0]}</span><span class="acc-x" aria-hidden="true"></span></summary><div class="acc-b"><div class="acc-in"><p>${f[1]}</p></div></div></details>`).join('')}</div>
</section>
<section class="wrap other-svc">
  <p class="eyebrow">Other services</p>
  <ul class="os">${services.filter(x => x !== s).map(x => `<li><a href="../${x.slug}/" class="os-a"><span class="mono">${x.n}</span>${x.name} ${arrow}</a></li>`).join('')}</ul>
</section>`;
  return page({ root, path: 'services/', title: `${s.name} — Flint`, desc: s.lede, body, cls: 'p-service' });
}

export function about() {
  const root = '../';
  const cols = Math.max(...areas.map(a => a.grid[0])), rows = Math.max(...areas.map(a => a.grid[1]));
  const body = `
<section class="parting" data-parting aria-label="Independent since 2026">
  <div class="pa-in">
    <h1 class="pa-h"><span class="pa-a">Independent</span><span class="pa-b">since <em class="serif-i">2026</em></span></h1>
    <div class="pa-img">${img(root, 'studio', 'Inside the Flint studio', '', 'loading="eager"')}</div>
  </div>
</section>
<section class="wrap grid statement">
  <p class="eyebrow st-eb">(Who we are)</p>
  <div class="st-body"><p class="focus" data-focus>Flint is an independent brand and marketing company founded in 2026 in west-central Indiana. We work with businesses across seven counties, from Lafayette to Greencastle, and we bring strategy, design, campaigns, media, social and websites under one roof. We believe the best marketing is the kind people choose to pay attention to, and that a local business deserves work as considered as any national brand.</p></div>
</section>
<section class="wrap principles" aria-labelledby="pr-h">
  <div class="sec-head"><h2 id="pr-h" class="h-l" data-split>What we believe</h2></div>
  <ol class="pr">${[['Say one thing.', 'The brands people remember are the ones that edited hardest.'], ['Earn attention.', 'If people would skip it, we have not finished yet.'], ['Measure honestly.', 'We agree objectives up front and tell you plainly how we did.'], ['Stay close.', 'Small senior teams, a named lead and a reply within one business day.']].map((p, i) => `<li data-reveal><span class="mono">0${i + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>
</section>
<section class="wrap offices area" aria-labelledby="of-h">
  <div class="sec-head"><h2 id="of-h" class="h-l" data-split>Where we work</h2><p class="mono sec-meta">Seven counties · Indiana · <span data-clock="${TZ}">—:—</span> local time</p></div>
  <div class="area-grid">
    <figure class="area-map" data-reveal>
      <div class="am" style="--c:${cols};--r:${rows}" role="img" aria-label="Schematic map of the seven Indiana counties Flint serves: ${areas.map(a => a.county).join(', ')}">
        ${areas.map(a => `<span class="am-t" style="grid-column:${a.grid[0]};grid-row:${a.grid[1]}"><b>${a.county}</b><span class="mono">${a.seat}</span></span>`).join('')}
      </div>
      <figcaption class="mono">Schematic, not to scale. North is up.</figcaption>
    </figure>
    <ul class="of">${areaOrder.map(c => areas.find(a => a.county === c)).map(a => `<li data-reveal><span class="of-c">${a.county} County</span><span class="mono of-t">Indiana</span><span class="of-a">County seat: ${a.seat}</span></li>`).join('')}</ul>
  </div>
  <figure class="of-img" data-img-reveal>${img(root, 'studio-2', 'A creative review at Flint')}</figure>
</section>`;
  return page({ root, path: 'about/', title: 'About — Flint', desc: 'Flint is an independent brand and marketing company founded in 2026, serving Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties in Indiana.', body, cls: 'p-about' });
}

export function clientsPage() {
  const root = '../';
  const sectorOf = c => Object.keys(clientSectors).find(k => clientSectors[k].includes(c)) || '';
  const tq = ['kettle', 'volta', 'oree', 'brightwater'].map(sl => cases.find(c => c.slug === sl).quote);
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Clients</p>
  <h1 class="h-xxl" data-split="hero">Long <em class="serif-i">partnerships,</em> not projects.</h1>
  <p class="lead phero-lede" data-fade>We build relationships meant to last, from a thermal drone pilot in Parke County to national consumer brands. Here are some of the companies we work with.</p>
</section>
<section class="wrap">
  <div class="chips" role="group" aria-label="Filter by sector" data-sector-filter>
    <button class="chip on" type="button" data-f="all" aria-pressed="true">All sectors</button>
    ${Object.keys(clientSectors).map(k => `<button class="chip" type="button" data-f="${esc(k)}" aria-pressed="false">${k}</button>`).join('')}
  </div>
  <ul class="lwall">${clients.map((c, i) => { const cs = cases.find(x => x.client === c); return `<li class="lw-i" data-sector="${esc(sectorOf(c))}">${cs ? `<a href="${root}work/${cs.slug}/" data-cursor="Case">` : '<div>'}<span class="lg lg-${i % 6}">${c}</span><span class="mono lw-s">${sectorOf(c)}${cs ? ' · Case study ↗' : ''}</span>${cs ? '</a>' : '</div>'}</li>`; }).join('')}</ul>
</section>
<section class="wrap tq" aria-label="Testimonials">
  <p class="eyebrow">What clients say</p>
  <ul class="tq-list">${tq.map(q => `<li data-reveal><blockquote>“${q[0]}”</blockquote><p class="mono"><b>${q[1]}</b><br>${q[2]}</p></li>`).join('')}</ul>
</section>`;
  return page({ root, path: 'clients/', title: 'Clients — Flint', desc: 'The businesses Flint works with, from a Parke County drone pilot to banks, football clubs, tea makers and fragrance houses.', body, cls: 'p-clients' });
}

export const articles = {
  'introducing-flint': ['Flint is an independent brand and marketing company founded in 2026 and based in west-central Indiana. It serves businesses across Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties.', 'Flint brings six practices under one roof: brand strategy, identity and design, campaigns, performance media, social and content, and digital product, including websites built to turn a visitor into a phone call or an enquiry.', 'q:A business in Crawfordsville or Rockville deserves the same care as any national brand. That is the whole idea.', 'The company also goes by Flint Marketing and Just Use Flint. Its first published case study is the website for Aerial Hunter, a thermal drone search and recovery service based in Parke County.'],
  'aerial-hunter-website-launch': ['Aerial Hunter, a thermal drone search and recovery service based in Parke County, Indiana, now has a website built by Flint at justuseflint.github.io/aerial-hunter.', 'Aerial Hunter is run by an FAA Part 107 certified pilot who flies a DJI Matrice 4T for deer recovery, lost-pet searches, herd counts and land checks across Parke County and the counties around it.', 'q:Someone who has just lost a blood trail or a dog is standing in a field with a phone. Everything on the site works back from that moment.', 'The ten-page site opens on a thermal view you can sweep with a cursor or a finger, shows one scene in four thermal palettes, maps the counties served and keeps tap-to-call and text one thumb away on every page.'],
  'the-case-for-saying-less': ['We reviewed 2,400 pieces of financial services advertising. The average ad contained 38 words. The ones that performed best contained fewer than twelve.', 'This is not a new insight. Effectiveness research has pointed in the same direction for decades: brands grow by being easy to notice and easy to remember. And yet the pressure inside most companies pushes the other way. Every stakeholder wants their message included. Every message dilutes the others.', 'q:Strategy is the art of deciding what not to say. Most briefs fail because nobody was willing to make that decision.', 'At Flint we have a simple test. Before any brief leaves strategy, we ask whether a stranger could repeat the idea after hearing it once. If not, we keep editing.', 'Norrow is the clearest example. The brand has one rule: one idea at a time. It applies to ads, to app screens, to customer emails and to legal disclosures. It is harder to follow than it sounds. It is also the reason the brand is remembered.'],
  'what-shift-workers-taught-us': ['When Lumen Health asked us to help their sleep app stand out, we started by asking who was being left out. The answer was one in five American workers.', 'Over six weeks, 140 shift workers kept sleep diaries for us: nurses, long-haul drivers, warehouse teams and air traffic controllers. Their days started at 7pm. Their advice from sleep apps assumed a 10pm bedtime.', 'q:Design for the edge case and you often discover the real case. Shift workers were not a niche. They were the people who needed sleep help most.', 'We learned to design around rotas rather than routines, to measure success in recovery rather than hours, and to show up in the places shift workers actually are at 3am: break rooms, overnight radio and late-night feeds.', 'The result was a product that doubled day-30 retention and a brand that 38 employers now offer to their staff.'],
};

export function newsIndex() {
  const root = '../';
  const [f, ...rest] = news;
  const types = ['Press release', 'News', 'Insight'];
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Newsroom — press releases, news and thinking</p>
  <h1 class="h-xxl" data-split="hero">Newsroom</h1>
</section>
<section class="wrap">
  <a class="nf" href="${f.slug}/" data-cursor="Read">
    <span class="nf-m" data-img-reveal>${img(root, f.img, '', '', 'loading="eager"')}</span>
    <span class="nf-t"><span class="mono">${f.type} — ${fmtDate(f.date)}</span><span class="nf-h">${f.title}</span><span class="nf-d">${f.dek}</span><span class="link-arrow">Read ${arrow}</span></span>
  </a>
</section>
<section class="wrap">
  <div class="chips" role="group" aria-label="Filter by type" data-news-filter>
    <button class="chip on" type="button" data-f="all" aria-pressed="true">All <sup>${news.length}</sup></button>
    ${types.map(t => `<button class="chip" type="button" data-f="${t}" aria-pressed="false">${t}s <sup>${news.filter(n => n.type === t).length}</sup></button>`).join('')}
  </div>
  <ul class="nl-list nl-full" data-hover-list>${news.map(n => `<li data-type="${n.type}"><a href="${n.slug}/" data-img="${root}assets/img/${n.img}.webp" data-cursor="Read"><span class="mono nl-d">${fmtDate(n.date)}</span><span class="mono nl-ty">${n.type}</span><span class="nl-t">${n.title}<span class="nl-dek">${n.dek}</span></span><span class="mono nl-r">${n.read} min</span>${arrow}</a></li>`).join('')}</ul>
</section>
<section class="wrap grid press-kit">
  <h2 class="h-m" data-split>Press &amp; media</h2>
  <div><p class="lead">For interviews, comment, logos and images, send us a press enquiry. We reply within one business day.</p><a class="btn" href="${root}contact/?service=press" data-magnetic><span>Press enquiry</span></a></div>
</section>`;
  return page({ root, path: 'news/', title: 'Newsroom — Flint', desc: 'Press releases, news and insight from Flint.', body, cls: 'p-news' });
}

export function article(n) {
  const root = '../../';
  const paras = articles[n.slug];
  const pr = n.type === 'Press release';
  const city = 'INDIANA';
  const author = n.type === 'Insight' ? 'Flint' : 'Flint Newsroom';
  const related = news.filter(x => x !== n).slice(0, 3);
  const body = `
<article class="art">
  <header class="wrap art-h">
    <p class="eyebrow" data-fade><a class="ul" href="../">Newsroom</a> / ${n.type}</p>
    <h1 class="h-xl art-t" data-split="hero">${n.title}</h1>
    <p class="lead art-dek" data-fade>${n.dek}</p>
    <div class="art-by mono" data-fade><span>${author}</span><span>${fmtDate(n.date)}</span><span>${n.read} min read</span><button type="button" class="ul" data-copy>Copy link</button></div>
  </header>
  <figure class="wrap art-img" data-img-reveal>${img(root, n.img, '', '', 'loading="eager"')}</figure>
  <div class="wrap art-body">
    ${pr ? `<p class="mono art-rel">For immediate release</p>` : ''}
    ${paras.map((p, k) => p.startsWith('q:') ? `<blockquote class="pull" data-reveal>${p.slice(2).replace(/ — (.+)$/, '<cite class="mono">— $1</cite>')}</blockquote>` : `<p data-reveal>${k === 0 && pr ? `<b class="mono">${city} — ${fmtDate(n.date).toUpperCase()} —</b> ` : ''}${p}</p>`).join('')}
    ${pr ? `<div class="boiler"><h2 class="mono">About Flint</h2><p>Flint (Flint Marketing) is an independent brand and marketing company founded in 2026 in west-central Indiana. It serves businesses across ${countyList.slice(0, -1).join(', ')} and ${countyList.at(-1)}.</p><h2 class="mono">Media contact</h2><p><a class="ul" href="${root}contact/?service=press">Send a press enquiry →</a></p></div>` : ''}
  </div>
</article>
<section class="wrap art-rel-list"><p class="eyebrow">More from the newsroom</p><ul class="nl-list" data-hover-list>${related.map(r => `<li><a href="../${r.slug}/" data-img="${root}assets/img/${r.img}.webp" data-cursor="Read"><span class="mono nl-d">${fmtDate(r.date)}</span><span class="mono nl-ty">${r.type}</span><span class="nl-t">${r.title}</span>${arrow}</a></li>`).join('')}</ul></section>`;
  return page({ root, path: 'news/', title: `${n.title} — Flint`, desc: n.dek, body, cls: 'p-article' });
}

export function contact() {
  const root = '../';
  const body = `
<section class="ct" data-contact>
  <aside class="ct-side">
    <p class="eyebrow">Start a project</p>
    <h1 class="ct-h">Tell us what you’re working on.</h1>
    <ol class="ct-steps mono" data-steps></ol>
    <div class="ct-help"><p>We reply to every enquiry within one business day.</p><p class="mono">Serving ${areaOrder.join(' · ')} counties, Indiana</p></div>
  </aside>
  <div class="ct-main">
    <div class="ct-prog" aria-hidden="true"><span data-prog></span></div>
    <form class="ct-form" data-form novalidate autocomplete="on">
      <div class="ct-stage" data-stage aria-live="polite"></div>
      <div class="ct-nav" data-nav>
        <button type="button" class="btn btn-ghost" data-back><span>← Back</span></button>
        <span class="ct-count mono" data-count-step></span>
        <button type="submit" class="btn" data-next><span>Continue</span></button>
      </div>
    </form>
  </div>
  <a class="ct-x" href="${root}" aria-label="Close and return to the homepage"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a>
</section>`;
  return page({ root, path: 'contact/', title: 'Start a project — Flint', desc: 'Tell Flint about your project. We reply to every enquiry within one business day.', body, cls: 'p-contact', scripts: ['contact.js'], bare: true });
}

export function notFound() {
  const root = '/iconic/';
  const body = `<section class="phero wrap nf404"><p class="eyebrow">Error 404</p><h1 class="h-xxl" data-split="hero">This page <em class="serif-i">went cold.</em></h1><p class="lead phero-lede">The page you are looking for has moved or never existed.</p><a class="btn" href="${root}" data-magnetic><span>Back to the homepage</span></a></section>`;
  return page({ root, path: '404', title: 'Page not found — Flint', desc: 'Page not found.', body, cls: 'p-404' });
}
