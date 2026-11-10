import { esc, img, arrow, page, logo, countyList } from './shell.mjs';
import { cases, services, news, areas, areaOrder, TZ } from './data.mjs';
import { fmtDate, brandWall } from './pages-a.mjs';

export function servicesIndex() {
  const root = '../';
  const allCaps = services.flatMap(s => s.caps);
  const body = `
<section class="phero wrap svc-hero">
  <p class="eyebrow" data-fade>Services — six practices, one team</p>
  <h1 class="h-xxl roller-h"><span data-split="hero">We do</span> <span class="roller" data-roller aria-label="${services.map(s => s.short).join(', ')}"><span class="roller-in">${services.map(s => `<span>${s.short}.</span>`).join('')}<span>${services[0].short}.</span></span></span></h1>
  <p class="lead phero-lede" data-fade>Most clients start with a website or one practice on a monthly membership and add more as they grow. Every project has one named lead and a reply within one business day.</p>
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
    <div class="sec-head"><h2 id="proc-h" class="h-l" data-split>How every project runs</h2><p class="mono sec-meta">Monthly memberships for local businesses</p></div>
    <ol class="proc">
      ${[['Discover', 'Week 1', 'We listen before we make anything: you, your customers, your numbers and your competition.'], ['Define', 'Weeks 1–2', 'One short brief and a few clear goals, signed off by you before work starts.'], ['Design', 'Weeks 2–6', 'We make the work, test it with real customers where we can and refine it fast.'], ['Deliver', 'Then monthly', 'Launch, measure, improve. A monthly check-in on what is working.']].map((p, i) => `<li class="proc-s"><span class="proc-dot"><i></i></span><span class="mono">0${i + 1} · ${p[1]}</span><h3>${p[0]}</h3><p>${p[2]}</p></li>`).join('')}
    </ol>
    <div class="proc-line" aria-hidden="true"><span data-proc-line></span></div>
  </div>
</section>
<section class="wrap caps-cloud" aria-labelledby="caps-h">
  <div class="sec-head"><h2 id="caps-h" class="h-l" data-split>Capabilities</h2><p class="mono sec-meta">${allCaps.length} things we can help with</p></div>
  <ul class="cloud">${allCaps.map(c => `<li data-magnetic data-strength="0.25">${c}</li>`).join('')}</ul>
</section>
<section class="wrap models grid" aria-labelledby="mod-h">
  <h2 id="mod-h" class="h-m models-h" data-split>How memberships work</h2>
  <div class="models-list">
    ${[['Membership', 'One monthly fee, from $100 to $5,000 a month, for your website and the work we agree together each month.', 'Best for most local businesses.'], ['Project', 'A defined scope and a fixed price, agreed up front.', 'Best for a new site, a rebrand or a launch.'], ['Add-on', 'Extra work, such as a campaign or a photo day, added to a membership month.', 'Best when something big is coming up.']].map((m, i) => `<div class="model" data-reveal><span class="mono">0${i + 1}</span><h3>${m[0]}</h3><p>${m[1]}</p><p class="mono model-b">${m[2]}</p></div>`).join('')}
  </div>
</section>`;
  return page({ root, path: 'services/', title: 'Services — Flint', desc: 'Brand strategy, identity, campaigns, media, social and websites for local businesses, on a monthly membership.', body, cls: 'p-services' });
}

export function servicePage(s, i) {
  const root = '../../';
  const work = (s.work.length ? s.work : cases.map(c => c.slug)).map(slug => cases.find(c => c.slug === slug));
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
  <div class="sec-head"><h2 id="sw-h" class="h-l" data-split>${s.work.length ? 'Related work' : 'Recent work'}</h2><a class="link-arrow sec-link" href="${root}work/">All work ${arrow}</a></div>
  <ul class="rw">${work.map(c => `<li data-reveal><a href="${root}work/${c.slug}/" data-cursor="View"><span class="rw-m" data-img-reveal>${img(root, c.slug + '-2', c.client, '', 'sizes="(min-width:900px) 30vw, 50vw"')}</span><span class="rw-c">${c.client}</span><span class="rw-t">${c.title}</span><span class="mono rw-r">${c.disc.join(' · ')}</span></a></li>`).join('')}</ul>
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
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Clients — ${String(cases.length).padStart(2, '0')}</p>
  <h1 class="h-xxl" data-split="hero">Long <em class="serif-i">partnerships,</em> not projects.</h1>
  <p class="lead phero-lede" data-fade>From a thermal drone pilot in Rockville to a meal-prep kitchen in Crawfordsville. These are the businesses we work with so far, and there is room on this wall for yours.</p>
</section>
<section class="wrap cl-wall">${brandWall(root, true)}</section>`;
  return page({ root, path: 'clients/', title: 'Clients — Flint', desc: 'The businesses Flint works with: Aerial Hunter, a thermal drone search service, and Casa Fresca, a meal-prep and catering kitchen.', body, cls: 'p-clients' });
}

export const articles = {
  'introducing-flint': ['Flint is an independent brand and marketing company founded in 2026 and based in west-central Indiana. It serves businesses across Montgomery, Tippecanoe, Fountain, Boone, Parke, Putnam and Clinton counties.', 'Flint brings six practices under one roof: brand strategy, identity and design, campaigns, performance media, social and content, and websites built to turn a visitor into a phone call, a booking or an order. Local businesses work with Flint on a monthly membership.', 'q:A business in Crawfordsville or Rockville deserves the same care as any national brand. That is the whole idea.', 'The company also goes by Flint Marketing and Just Use Flint. Its first case studies are the website for Aerial Hunter, a thermal drone search and recovery service based in Rockville, and a custom Shopify theme for Casa Fresca, a meal-prep and catering kitchen in Crawfordsville.'],
  'aerial-hunter-website-launch': ['Aerial Hunter, a thermal drone search and recovery service based in Rockville, Indiana, now has a website built by Flint at justuseflint.github.io/aerial-hunter.', 'Aerial Hunter is run by an FAA Part 107 certified pilot who flies a DJI Matrice 4T for deer recovery, lost-pet searches, herd counts and land checks anywhere in Indiana.', 'q:Someone who has just lost a blood trail or a dog is standing in a field with a phone. Everything on the site works back from that moment.', 'The ten-page site opens on a thermal view you can sweep with a cursor or a finger, shows one scene in four thermal palettes, maps the whole state from home base in Rockville and keeps tap-to-call and text one thumb away on every page.'],
};

export function newsIndex() {
  const root = '../';
  const [f, ...rest] = news;
  const types = ['Press release', 'News'];
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
    <form class="ct-form" data-form data-endpoint="https://formsubmit.co/ajax/brianwalls2002@gmail.com" data-cc="support@justuseflint.com" novalidate autocomplete="on">
      <div class="ct-stage" data-stage aria-live="polite"></div>
      <div class="hp" aria-hidden="true"><label for="f-hp">Leave this empty</label><input id="f-hp" type="text" name="_honey" tabindex="-1" autocomplete="off" data-hp></div>
      <p class="ct-err" data-send-err role="alert" hidden>We couldn’t send that just now. Please try again, or email <a class="ul" href="mailto:support@justuseflint.com">support@justuseflint.com</a>.</p>
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
