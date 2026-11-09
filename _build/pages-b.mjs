import { esc, img, arrow, page } from './shell.mjs';
import { cases, services, clients, clientSectors, news, leaders, people2, history, awards, offices, roles } from './data.mjs';
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
    ${[['Project', 'A defined scope, a fixed fee and a launch date. Typically 8–20 weeks.', 'Best for rebrands, launches and campaigns.'], ['Retainer', 'A dedicated team on a monthly fee with quarterly objectives.', 'Best for always-on content, media and product.'], ['Embedded', 'Iconic strategists, designers or analysts working inside your team.', 'Best for in-house teams that need senior capacity.']].map((m, i) => `<div class="model" data-reveal><span class="mono">0${i + 1}</span><h3>${m[0]}</h3><p>${m[1]}</p><p class="mono model-b">${m[2]}</p></div>`).join('')}
  </div>
</section>`;
  return page({ root, path: 'services/', title: 'Services — Iconic', desc: 'Brand strategy, identity, campaigns, performance media, social and digital product from one independent team.', body, cls: 'p-services' });
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
  <ul class="rw">${work.map(c => `<li data-reveal><a href="${root}work/${c.slug}/" data-cursor="View"><span class="rw-m" data-img-reveal>${img(root, c.slug + '-2', c.client)}</span><span class="rw-c">${c.client}</span><span class="rw-t">${c.title}</span><span class="mono rw-r">${c.metrics[0].prefix || ''}${c.metrics[0].v}${c.metrics[0].suffix} ${c.metrics[0].label.toLowerCase()}</span></a></li>`).join('')}</ul>
</section>
<section class="wrap grid faq" aria-labelledby="faq-h">
  <h2 id="faq-h" class="h-m" data-split>Questions we hear</h2>
  <div>${s.faq.map(f => `<details class="acc acc-sm" data-reveal><summary><span class="acc-t">${f[0]}</span><span class="acc-x" aria-hidden="true"></span></summary><div class="acc-b"><div class="acc-in"><p>${f[1]}</p></div></div></details>`).join('')}</div>
</section>
<section class="wrap other-svc">
  <p class="eyebrow">Other services</p>
  <ul class="os">${services.filter(x => x !== s).map(x => `<li><a href="../${x.slug}/" class="os-a"><span class="mono">${x.n}</span>${x.name} ${arrow}</a></li>`).join('')}</ul>
</section>`;
  return page({ root, path: 'services/', title: `${s.name} — Iconic`, desc: s.lede, body, cls: 'p-service' });
}

export function about() {
  const root = '../';
  const body = `
<section class="parting" data-parting aria-label="Independent since 2004">
  <div class="pa-in">
    <h1 class="pa-h"><span class="pa-a">Independent</span><span class="pa-b">since <em class="serif-i">2004</em></span></h1>
    <div class="pa-img">${img(root, 'studio', 'The Iconic studio on the Bowery, New York', '', 'loading="eager"')}</div>
  </div>
</section>
<section class="wrap grid statement">
  <p class="eyebrow st-eb">(Who we are)</p>
  <div class="st-body"><p class="focus" data-focus>Iconic started in a two-room studio on the Bowery with four people and one client. Twenty-two years later we are 640 people in five cities, still independent, and since 2020 owned by the people who work here. We have never taken outside investment, never pitched for free and never stopped believing that the best marketing is the kind people choose to pay attention to.</p></div>
</section>
<section class="wrap principles" aria-labelledby="pr-h">
  <div class="sec-head"><h2 id="pr-h" class="h-l" data-split>What we believe</h2></div>
  <ol class="pr">${[['Say one thing.', 'The brands people remember are the ones that edited hardest.'], ['Earn attention.', 'If people would skip it, we have not finished yet.'], ['Measure honestly.', 'We agree objectives with finance, not just marketing, and publish how we did.'], ['Stay small inside.', 'No team larger than nine. No idea without an owner.']].map((p, i) => `<li data-reveal><span class="mono">0${i + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>
</section>
<section class="history" data-history aria-labelledby="hi-h">
  <div class="wrap hi-grid">
    <div class="hi-side"><p class="eyebrow">History</p><h2 id="hi-h" class="h-m" data-split>Twenty-two years, one address.</h2><div class="hi-year" aria-hidden="true"><span data-hi-year>2004</span></div></div>
    <ol class="hi-list">${history.map(h => `<li data-year="${h[0]}"><span class="hi-y">${h[0]}</span><p>${h[1]}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="wrap leaders" aria-labelledby="ld-h">
  <div class="sec-head"><h2 id="ld-h" class="h-l" data-split>Leadership</h2><p class="mono sec-meta">Partners: 38 · Average tenure: 11 years</p></div>
  <ul class="ld">${leaders.map(l => `<li data-reveal><div class="ld-m" data-img-reveal>${img(root, l.img, 'Portrait of ' + l.name)}</div><h3>${l.name}</h3><p class="mono">${l.role}</p><p class="ld-b">${l.bio}</p></li>`).join('')}</ul>
  <ul class="team mono">${people2.map(p => `<li data-reveal><span>${p[0]}</span><span>${p[1]}</span></li>`).join('')}</ul>
</section>
<section class="wrap offices" aria-labelledby="of-h">
  <div class="sec-head"><h2 id="of-h" class="h-l" data-split>Studios</h2><p class="mono sec-meta">Five cities, one P&amp;L</p></div>
  <ul class="of">${offices.map(o => `<li data-reveal><span class="of-c">${o.city}</span><span class="mono of-t" data-clock="${o.tz}">—:—</span><span class="of-a">${o.addr}<br>${o.zip}</span><span class="mono of-p">${o.people} people · since ${o.opened}</span></li>`).join('')}</ul>
  <figure class="of-img" data-img-reveal>${img(root, 'studio-2', 'A creative review in the London studio')}</figure>
</section>
<section class="wrap awards" aria-labelledby="aw-h">
  <div class="sec-head"><h2 id="aw-h" class="h-l" data-split>Recognition</h2><p class="mono sec-meta">Since 2004</p></div>
  <table class="atab aw"><thead class="mono"><tr><th>Show</th><th>Total</th><th class="hide-s">Highlights</th></tr></thead><tbody>${awards.map(a => `<tr data-reveal><td>${a[0]}</td><td class="aw-n" data-count="${a[1]}">${a[1]}</td><td class="mono hide-s">${a[2]}</td></tr>`).join('')}</tbody></table>
  <p class="mono aw-note">Independent Agency of the Year: 2015, 2019, 2023, 2026.</p>
</section>`;
  return page({ root, path: 'about/', title: 'About — Iconic', desc: 'Independent since 2004 and employee-owned since 2020: the history, leadership, studios and recognition behind Iconic.', body, cls: 'p-about' });
}

export function clientsPage() {
  const root = '../';
  const sectorOf = c => Object.keys(clientSectors).find(k => clientSectors[k].includes(c)) || '';
  const tq = [cases[2], cases[3], cases[5], cases[7]].map(c => c.quote);
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Clients — 300+ brands since 2004</p>
  <h1 class="h-xxl" data-split="hero">Long <em class="serif-i">partnerships,</em> not projects.</h1>
  <p class="lead phero-lede" data-fade>The average Iconic client has worked with us for 7.4 years. Here are some of the companies we work with today.</p>
</section>
<section class="wrap cl-stats">${[{ v: 7.4, dec: 1, label: 'Years, average relationship' }, { v: 94, suffix: '%', label: 'Five-year retention' }, { v: 31, label: 'Clients with us for 10+ years' }, { v: 48, label: 'Markets served' }].map(s => `<div class="num" data-reveal><span class="num-v">${count(s)}</span><span class="num-l">${s.label}</span></div>`).join('')}</section>
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
  return page({ root, path: 'clients/', title: 'Clients — Iconic', desc: 'The brands Iconic partners with, from banks and football clubs to tea makers and fragrance houses.', body, cls: 'p-clients' });
}

export const articles = {
  'iconic-named-independent-agency-of-the-year': ['Iconic has been named Independent Agency of the Year at the 2026 Agency Awards, the fourth time the company has received the title and the first time any agency has won it four times.', 'Judges cited a year of record growth for the employee-owned company, including five new global clients, 41 international awards and a 23% increase in revenue. The award also recognised the agency’s outcome-based fee model, under which more than half of its revenue is now tied to client business results.', 'q:We are proud to be independent, but we are prouder that our clients keep choosing us. Every award on our shelf belongs to a client who was brave enough to make the work. — Margot Ellery, Founder & Chief Executive', 'Highlights of the year included the launch of Maison Orée’s first fragrance, the rebrand of Brightwater FC and the continued growth of Norrow, which passed two million customers in September.', 'The agency also expanded its Lisbon studio with a dedicated type foundry and grew its Singapore studio to 90 people, serving clients across eleven Asia-Pacific markets.'],
  'iconic-opens-lisbon-type-studio': ['Iconic today announced Iconic Type, a dedicated type foundry based in its Lisbon studio. The foundry will design custom typefaces for clients and release a retail library of eight families beginning in 2027.', 'Iconic Type grows out of the agency’s Lisbon design team, which has drawn 19 custom typefaces for clients since 2016, including the condensed stadium face created for Brightwater FC.', 'q:Typography is the voice of a brand before anyone reads a word. Giving it a home of its own lets us do it properly. — Clémence Faure, Head of Design', 'The foundry will be led by Rafael Couto, Managing Director of the Lisbon studio, and will employ eleven type designers and engineers by the end of 2026.'],
  'norrow-wins-grand-effie': ['Norrow’s launch campaign “Money, made plain” has won the Grand Effie at this year’s UK Effie Awards, the highest honour for marketing effectiveness.', 'The campaign helped the digital bank open 1.4 million accounts in nine months, four months ahead of plan, while reducing the cost per funded account by 41% against its business case.', 'q:The judges were struck by the discipline of the idea. One sentence per screen, one idea per ad, and a business result that speaks for itself. — Chair of the Effie UK jury', 'The win is Iconic’s sixth Grand Effie and its second for a financial services brand.'],
  'the-case-for-saying-less': ['In 2023 we reviewed 2,400 pieces of financial services advertising. The average ad contained 38 words. The ones that performed best contained fewer than twelve.', 'This is not a new insight. Every effectiveness study of the last thirty years points in the same direction: brands grow by being easy to notice and easy to remember. And yet the pressure inside most companies pushes the other way. Every stakeholder wants their message included. Every message dilutes the others.', 'q:Strategy is the art of deciding what not to say. Most briefs fail because nobody was willing to make that decision.', 'At Iconic we have a simple test. Before any brief leaves strategy, we ask whether a stranger could repeat the idea after hearing it once. If not, we keep editing.', 'Norrow is the clearest example. The brand has one rule: one idea at a time. It applies to ads, to app screens, to customer emails and to legal disclosures. It is harder to follow than it sounds. It is also the reason the brand is remembered.'],
  'halden-into-the-quiet-cannes': ['Halden Outdoor’s “Into the Quiet” has won Gold in the Film category at the Cannes Lions International Festival of Creativity.', 'The four-minute film, made with almost no dialogue, was shot over 19 days in Norway and the Scottish Highlands by a crew of 24. It has been viewed more than 61 million times organically.', 'q:We wanted to make something you would watch with the sound up, even though almost nothing is said. — Luca Brennan, Chief Creative Officer', 'The campaign has driven a 212% increase in Halden’s direct-to-consumer revenue and reduced the median customer age from 54 to 38.'],
  'iconic-appoints-global-head-of-performance': ['Iconic has appointed Arjun Mehta as Global Head of Performance Media. Mehta joins from a leading retail media network, where he led measurement and partnerships for nine years.', 'He will lead Iconic’s 120-person media practice across New York, London and Singapore, with a remit to scale the agency’s outcome-based fee model and its incrementality testing platform.', 'q:The best media plans start with the work. Iconic is one of the few places where analysts and creatives sit at the same table. — Arjun Mehta', 'Mehta reports to Chief Operating Officer Kenji Arakawa and is based in the London studio.'],
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
  <div><p class="lead">For interviews, speaking requests, logos and leadership photography, contact our communications team. We reply to press enquiries within four working hours.</p><a class="btn" href="${root}contact/?service=press" data-magnetic><span>Press enquiry</span></a></div>
</section>`;
  return page({ root, path: 'news/', title: 'Newsroom — Iconic', desc: 'Press releases, news and insight from Iconic.', body, cls: 'p-news' });
}

export function article(n) {
  const root = '../../';
  const paras = articles[n.slug];
  const pr = n.type === 'Press release';
  const city = { 'iconic-opens-lisbon-type-studio': 'LISBON', 'norrow-wins-grand-effie': 'LONDON', 'iconic-appoints-global-head-of-performance': 'LONDON' }[n.slug] || 'NEW YORK';
  const author = n.type === 'Insight' ? (n.slug.includes('saying') ? 'Adaeze Moreau, Global Head of Strategy' : 'Theo Grant, Head of Digital Product') : 'Iconic Communications';
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
    ${pr ? `<div class="boiler"><h2 class="mono">About Iconic</h2><p>Iconic is an independent brand and marketing company founded in 2004. Employee-owned since 2020, it has 640 people in studios in New York, London, Lisbon, Singapore and Los Angeles, and works with clients including Halden Outdoor, Norrow, Maison Orée and Brightwater FC.</p><h2 class="mono">Media contact</h2><p><a class="ul" href="${root}contact/?service=press">Send a press enquiry →</a></p></div>` : ''}
  </div>
</article>
<section class="wrap art-rel-list"><p class="eyebrow">More from the newsroom</p><ul class="nl-list" data-hover-list>${related.map(r => `<li><a href="../${r.slug}/" data-img="${root}assets/img/${r.img}.webp" data-cursor="Read"><span class="mono nl-d">${fmtDate(r.date)}</span><span class="mono nl-ty">${r.type}</span><span class="nl-t">${r.title}</span>${arrow}</a></li>`).join('')}</ul></section>`;
  return page({ root, path: 'news/', title: `${n.title} — Iconic`, desc: n.dek, body, cls: 'p-article' });
}

export function careers() {
  const root = '../';
  const depts = [...new Set(roles.map(r => r[1]))];
  const body = `
<section class="phero wrap">
  <p class="eyebrow" data-fade>Careers — ${roles.length} open roles</p>
  <h1 class="h-xxl" data-split="hero">Do the best work <em class="serif-i">of your career.</em></h1>
  <p class="lead phero-lede" data-fade>Iconic is owned by the people who work here. That means profit share for everyone, small senior teams, and the time to do things properly.</p>
</section>
<section class="csr-img" data-expand><div class="reel-frame">${img(root, 'studio', 'The New York studio', '', 'loading="eager"')}</div></section>
<section class="wrap benefits" aria-labelledby="be-h">
  <div class="sec-head"><h2 id="be-h" class="h-l" data-split>Why people stay</h2><p class="mono sec-meta">Average tenure: 6.8 years</p></div>
  <ol class="be">${[['Ownership', 'Every permanent employee is a beneficiary of the Employee Ownership Trust and receives an equal profit share.'], ['Four-day August', 'Every studio works four-day weeks through August, without changes to pay.'], ['Studio swap', 'After two years, spend up to three months working from another Iconic studio.'], ['Learning budget', '$3,000 a year per person for courses, conferences and books, no approval needed.'], ['Sabbatical', 'Four weeks of paid sabbatical every five years.'], ['Health', 'Comprehensive health, dental and mental health cover in every market.']].map((b, i) => `<li data-reveal><span class="mono">0${i + 1}</span><h3>${b[0]}</h3><p>${b[1]}</p></li>`).join('')}</ol>
</section>
<section class="wrap roles" aria-labelledby="ro-h">
  <div class="sec-head"><h2 id="ro-h" class="h-l" data-split>Open roles</h2><p class="mono sec-meta" data-roles-count>${roles.length} roles</p></div>
  <div class="chips" role="group" aria-label="Filter by studio" data-role-filter>
    <button class="chip on" type="button" data-f="all" aria-pressed="true">All studios</button>
    ${offices.map(o => `<button class="chip" type="button" data-f="${o.city}" aria-pressed="false">${o.city} <sup>${roles.filter(r => r[2] === o.city).length}</sup></button>`).join('')}
  </div>
  <div class="role-list">${roles.map(r => `<details class="acc role" data-city="${r[2]}"><summary><span class="acc-t">${r[0]}</span><span class="mono role-m">${r[1]}</span><span class="mono role-m">${r[2]}</span><span class="mono role-m hide-s">${r[3]}</span><span class="acc-x" aria-hidden="true"></span></summary><div class="acc-b"><div class="acc-in"><p>You will join the ${r[1].toLowerCase()} team in our ${r[2]} studio, working across two or three client teams at a time. We are looking for someone with a portfolio of work that made a measurable difference, and the curiosity to keep learning from people in other disciplines.</p><ul class="mono acc-caps"><li>${r[3]}</li><li>Hybrid, 3 days in studio</li><li>Profit share from day one</li></ul><a class="btn" href="${root}contact/?service=careers&amp;role=${encodeURIComponent(r[0])}" data-magnetic><span>Apply for this role</span></a></div></div></details>`).join('')}</div>
  <p class="mono roles-none" data-roles-none hidden>No open roles in this studio right now. Send a speculative application through the contact page.</p>
</section>`;
  return page({ root, path: 'careers/', title: 'Careers — Iconic', desc: 'Join an employee-owned agency with studios in New York, London, Lisbon, Singapore and Los Angeles.', body, cls: 'p-careers' });
}

export function contact() {
  const root = '../';
  const body = `
<section class="ct wrap" data-contact>
  <aside class="ct-side">
    <p class="eyebrow">Start a project</p>
    <h1 class="h-l ct-h" data-split="hero">Tell us what you’re working on.</h1>
    <ol class="ct-steps mono" data-steps></ol>
    <div class="ct-help"><p>Prefer to talk? Every studio has a new-business partner on call.</p><ul class="mono">${offices.slice(0, 3).map(o => `<li><span>${o.city}</span><span>${o.phone}</span></li>`).join('')}</ul></div>
  </aside>
  <div class="ct-main">
    <div class="ct-prog" aria-hidden="true"><span data-prog></span></div>
    <form class="ct-form" data-form novalidate autocomplete="on">
      <div class="ct-stage" data-stage aria-live="polite"></div>
      <div class="ct-nav" data-nav>
        <button type="button" class="btn btn-ghost" data-back><span>← Back</span></button>
        <button type="submit" class="btn" data-next data-magnetic><span>Continue</span></button>
      </div>
    </form>
    <p class="ct-demo mono">Demo site — submissions are not sent anywhere.</p>
  </div>
</section>`;
  return page({ root, path: 'contact/', title: 'Start a project — Iconic', desc: 'Tell Iconic about your project. A partner from the nearest studio will reply within one business day.', body, cls: 'p-contact', scripts: ['contact.js'] });
}

export function notFound() {
  const root = '/iconic/';
  const body = `<section class="phero wrap nf404"><p class="eyebrow">Error 404</p><h1 class="h-xxl" data-split="hero">This page <em class="serif-i">isn’t iconic</em> yet.</h1><p class="lead phero-lede">The page you are looking for has moved or never existed.</p><a class="btn" href="${root}" data-magnetic><span>Back to the homepage</span></a></section>`;
  return page({ root, path: '404', title: 'Page not found — Iconic', desc: 'Page not found.', body, cls: 'p-404' });
}
