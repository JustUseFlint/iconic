/* Flint — Start a project flow. One question per screen; every screen fits the viewport, the page never scrolls. */
(function () {
  'use strict';
  var root = document.querySelector('[data-contact]'); if (!root) return;
  var d = document, G = window.gsap, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = root.querySelector('[data-stage]'), form = root.querySelector('[data-form]'), back = root.querySelector('[data-back]'), next = root.querySelector('[data-next]'), prog = root.querySelector('[data-prog]'), stepsEl = root.querySelector('[data-steps]'), countEl = root.querySelector('[data-count-step]');
  // Delivery: FormSubmit (free) emails every inquiry to the address in data-endpoint. Set data-w3f-key to use Web3Forms instead.
  var ENDPOINT = form.getAttribute('data-endpoint') || '', W3F = form.getAttribute('data-w3f-key') || '';
  var errEl = root.querySelector('[data-send-err]');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var SERVICES = [
    { id: 'brand-strategy', t: 'Brand strategy', d: 'Positioning, architecture, naming' },
    { id: 'identity-design', t: 'Identity & design', d: 'Logo, identity, packaging, motion' },
    { id: 'campaigns', t: 'Campaign', d: 'Integrated creative, film, out-of-home' },
    { id: 'performance-media', t: 'Performance media', d: 'Planning, buying, measurement' },
    { id: 'social-content', t: 'Social & content', d: 'Always-on content, creators, community' },
    { id: 'digital-product', t: 'Website or app', d: 'Websites, e-commerce, apps' }
  ];
  var OTHER = [
    { id: 'press', t: 'Press enquiry', d: 'Interviews, comment, assets' },
    { id: 'other', t: 'Something else', d: 'Partnerships, speaking, anything else' }
  ];
  var ALL = SERVICES.concat(OTHER);
  var COUNTIES = ['Montgomery County', 'Tippecanoe County', 'Fountain County', 'Boone County', 'Parke County', 'Putnam County', 'Clinton County', 'Elsewhere in Indiana', 'Outside Indiana'];

  // q = the question shown as the screen heading; l = short label used on the review screen
  var Q = {
    'brand-strategy': [
      { k: 'stage', q: 'Where is the brand today?', l: 'Situation', type: 'one', req: 1, o: ['New company, no brand yet', 'Established, needs repositioning', 'Merger or portfolio change', 'Needs a new name'] },
      { k: 'trigger', q: 'What prompted this now?', l: 'Trigger', type: 'area', req: 1, ph: 'A new competitor, flat growth, new leadership, an upcoming launch…' },
      { k: 'markets', q: 'Where do your customers live?', l: 'Markets', hint: 'Choose all that apply', type: 'many', o: ['West-central Indiana', 'Across Indiana', 'Across the US', 'International'] } ],
    'identity-design': [
      { k: 'scope', q: 'What needs designing?', l: 'Scope', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Logo or wordmark', 'Full identity system', 'Packaging', 'Custom typeface', 'Motion identity', 'Guidelines & toolkit', 'Signage'] },
      { k: 'strategy', q: 'Do you have a brand strategy in place?', l: 'Strategy', type: 'one', req: 1, o: ['Yes, signed off', 'Partly', 'No, we need help with that too'] },
      { k: 'launch', q: 'When would you like to launch?', l: 'Target launch', type: 'month', opt: 1 } ],
    'campaigns': [
      { k: 'objective', q: 'What should the campaign do?', l: 'Objective', type: 'one', req: 1, o: ['Brand awareness', 'Product launch', 'Consideration', 'Drive sales', 'Change perception'] },
      { k: 'channels', q: 'Which channels are you considering?', l: 'Channels', hint: 'Choose all that apply', type: 'many', o: ['TV & online video', 'Out-of-home', 'Social', 'Audio', 'Experiential', 'Print', 'Not sure yet'] },
      { k: 'adspend', q: 'Roughly how much could go on ads each month?', l: 'Monthly ad spend', type: 'one', o: ['Nothing yet', 'Under $250', '$250–$1,000', '$1,000+', 'Not sure yet'] } ],
    'performance-media': [
      { k: 'adspend', q: 'Roughly how much do you spend on ads each month?', l: 'Monthly ad spend', type: 'one', req: 1, o: ['Nothing yet', 'Under $250', '$250–$1,000', '$1,000–$5,000', '$5,000+'] },
      { k: 'channels', q: 'Where do you advertise today?', l: 'Channels', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Facebook & Instagram', 'Google search', 'Google Maps', 'Local radio', 'Print', 'Billboards', 'Nowhere yet'] },
      { k: 'measure', q: 'How do you know if an ad worked?', l: 'Measurement', type: 'one', o: ['Calls or orders go up', 'Platform reports', 'We ask customers', 'Not sure'] } ],
    'social-content': [
      { k: 'need', q: 'What do you need on social?', l: 'Needs', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Social strategy', 'Regular posts', 'Photos & short video', 'Replying to comments', 'Ads on social'] },
      { k: 'platforms', q: 'Which platforms matter most?', l: 'Platforms', hint: 'Choose all that apply', type: 'many', o: ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Pinterest'] },
      { k: 'audience', q: 'How big is your following today?', l: 'Following', type: 'one', o: ['Under 500', '500–5,000', '5,000–50,000', 'Over 50,000'] } ],
    'digital-product': [
      { k: 'type', q: 'What are you building?', l: 'Product', type: 'one', req: 1, o: ['Marketing website', 'Online store', 'iOS / Android app', 'Service or platform'] },
      { k: 'phase', q: 'Where are you now?', l: 'Stage', type: 'one', req: 1, o: ['Just an idea', 'Redesigning something live', 'Live and growing'] },
      { k: 'stack', q: 'What runs your site today?', l: 'Current stack', type: 'text', opt: 1, ph: 'e.g. Shopify, Wix, Squarespace, WordPress' } ],
    'press': [
      { k: 'outlet', q: 'Which publication or outlet?', l: 'Outlet', type: 'text', req: 1, ph: 'e.g. Journal & Courier' },
      { k: 'deadline', q: 'When is your deadline?', l: 'Deadline', type: 'date', opt: 1 },
      { k: 'request', q: 'What do you need from us?', l: 'Request', type: 'area', req: 1, ph: 'Interview, comment, images…' } ],
    'other': [
      { k: 'topic', q: 'What is it about?', l: 'Topic', type: 'one', req: 1, o: ['Partnership', 'Speaking', 'Education', 'Something else'] },
      { k: 'msg', q: 'Tell us a little more.', l: 'Message', type: 'area', req: 1, ph: 'A few sentences is plenty.' } ]
  };
  var BUDGET = [
    { k: 'budget', q: 'What monthly budget do you have in mind?', l: 'Monthly budget', sub: 'Flint works on monthly memberships. A range is fine.', type: 'one', req: 1, o: ['$100–$500/mo', '$500–$1,000/mo', '$1,000–$2,500/mo', '$2,500–$5,000/mo', 'Not sure yet'] },
    { k: 'timing', q: 'When do you want to start?', l: 'Start', type: 'one', req: 1, o: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'] },
    { k: 'where', q: 'Where is your business based?', l: 'Location', type: 'one', o: COUNTIES }
  ];
  var ABOUT1 = [
    { k: 'name', l: 'Full name', type: 'text', req: 1, ac: 'name' },
    { k: 'email', l: 'Email', type: 'email', req: 1, ac: 'email' },
    { k: 'company', l: 'Company', type: 'text', req: 1, ac: 'organization' }
  ];
  var ABOUT2 = [
    { k: 'website', l: 'Company website (optional)', type: 'url', ac: 'url', ph: 'yourbusiness.com' },
    { k: 'title', l: 'Job title (optional)', type: 'text', ac: 'organization-title' },
    { k: 'phone', l: 'Phone (optional)', type: 'tel', ac: 'tel' },
    { k: 'source', l: 'How did you hear about us?', type: 'one', o: ['Recommendation', 'Search', 'Social media', 'Saw our work', 'Event', 'Other'] }
  ];
  function about1() { var f = ABOUT1.slice(); if (state.service === 'press') f[2] = { k: 'company', l: 'Organisation (optional)', type: 'text', ac: 'organization' }; return f; }

  var params = new URLSearchParams(location.search);
  var state = { service: null, a: {} };
  var pre = params.get('service'); if (pre && ALL.some(function (s) { return s.id === pre; })) state.service = pre;
  var step = 0;

  function isWork(s) { return SERVICES.some(function (x) { return x.id === s; }); }
  function flow() {
    var s = state.service, F = [{ id: 'service', sec: 'Service' }];
    (Q[s] || [{ k: '_', q: 'Details' }]).forEach(function (f) { F.push({ id: 'q', sec: 'Details', f: f }); });
    if (!s || isWork(s)) BUDGET.forEach(function (f) { F.push({ id: 'q', sec: 'Budget & timing', f: f }); });
    F.push({ id: 'about1', sec: 'About you' }, { id: 'about2', sec: 'About you' }, { id: 'review', sec: 'Review' });
    return F;
  }
  function sections(F) { var out = []; F.forEach(function (x) { if (out.indexOf(x.sec) < 0) out.push(x.sec); }); return out; }
  function svcName(id) { var s = ALL.filter(function (x) { return x.id === id; })[0]; return s ? s.t : ''; }

  function control(q, labelled) {
    var v = state.a[q.k], id = 'f-' + q.k, html;
    if (q.type === 'one' || q.type === 'many') {
      html = '<div class="tchips" role="' + (q.type === 'one' ? 'radiogroup' : 'group') + '" aria-labelledby="' + labelled + '">' + q.o.map(function (o) {
        var on = q.type === 'one' ? v === o : (v || []).indexOf(o) > -1;
        return '<label class="tchip"><input type="' + (q.type === 'one' ? 'radio' : 'checkbox') + '" name="' + q.k + '" value="' + esc(o) + '"' + (on ? ' checked' : '') + '><span>' + esc(o) + '</span></label>';
      }).join('') + '</div>';
    } else if (q.type === 'area') {
      html = '<textarea class="inp" id="' + id + '" name="' + q.k + '" aria-labelledby="' + labelled + '" placeholder="' + esc(q.ph || '') + '"' + (q.req ? ' required' : '') + '>' + esc(v || '') + '</textarea>';
    } else {
      html = '<input class="inp" id="' + id + '" name="' + q.k + '" type="' + q.type + '" aria-labelledby="' + labelled + '" value="' + esc(v || '') + '" placeholder="' + esc(q.ph || '') + '"' + (q.ac ? ' autocomplete="' + q.ac + '"' : '') + (q.type === 'email' ? ' inputmode="email" autocapitalize="off"' : q.type === 'url' ? ' inputmode="url" autocapitalize="off" spellcheck="false"' : '') + (q.req ? ' required' : '') + '>';
    }
    return html;
  }
  function errText(q) { return q.type === 'email' ? 'Enter a valid email address.' : q.type === 'url' ? 'Enter a web address, like yourbusiness.com.' : (q.type === 'one' || q.type === 'many') ? 'Please choose an option.' : 'This field is required.'; }
  function single(q) { return '<div class="fld" data-k="' + q.k + '">' + control(q, 'ct-q') + '<span class="fld-err" role="alert">' + errText(q) + '</span></div>'; }
  function labelled(q) { return '<div class="fld" data-k="' + q.k + '"><span class="fl" id="l-' + q.k + '">' + esc(q.l) + '</span>' + control(q, 'l-' + q.k) + '<span class="fld-err" role="alert">' + errText(q) + '</span></div>'; }

  function render(dir) {
    var F = flow(), cur = F[step], html = '';
    var head = function (k, h, sub) { return '<p class="eyebrow ct-k">' + k + '</p><h2 class="ct-q" id="ct-q" tabindex="-1">' + h + '</h2>' + (sub ? '<p class="ct-sub">' + sub + '</p>' : ''); };
    if (cur.id === 'service') {
      var opt = function (s, i, other) { return '<label class="opt' + (other ? ' opt-other' : '') + '"><input type="radio" name="service" value="' + s.id + '"' + (state.service === s.id ? ' checked' : '') + '><span class="mono">' + String(i + 1).padStart(2, '0') + '</span><span class="opt-t">' + s.t + '</span><span class="opt-d">' + s.d + '</span><span class="opt-c" aria-hidden="true"></span></label>'; };
      html = head('Service', 'What can we help with?', 'Your answer shapes the next few questions, so we only ask what matters.') +
        '<div class="fld" data-k="service"><div class="opts" role="radiogroup" aria-labelledby="ct-q">' + SERVICES.map(function (s, i) { return opt(s, i); }).join('') + OTHER.map(function (s, i) { return opt(s, i + 6, true); }).join('') + '</div><span class="fld-err" role="alert">Please choose one to continue.</span></div>';
    } else if (cur.id === 'q') {
      var q = cur.f;
      html = head(cur.sec === 'Details' ? svcName(state.service) : cur.sec, esc(q.q) + (q.opt ? ' <span class="serif-i" style="color:var(--mute);font-weight:400">(optional)</span>' : ''), q.sub || (q.hint ? q.hint + '.' : '')) + single(q);
    } else if (cur.id === 'about1') {
      html = head('About you', 'And finally, about you.') + '<div class="two">' + about1().map(labelled).join('') + '</div>';
    } else if (cur.id === 'about2') {
      html = head('About you', 'A few optional extras.') + '<div class="two two-3">' + ABOUT2.slice(0, 3).map(labelled).join('') + '</div>' + labelled(ABOUT2[3]);
    } else if (cur.id === 'review') {
      var groups = [];
      F.forEach(function (s, i) {
        if (s.id === 'review') return;
        var label, val;
        if (s.id === 'service') { label = 'Enquiry'; val = svcName(state.service); }
        else if (s.id === 'q') { label = s.f.l; val = state.a[s.f.k]; }
        else { var set = s.id === 'about1' ? about1() : ABOUT2; label = s.id === 'about1' ? 'Contact' : 'Extras'; val = set.map(function (q) { return state.a[q.k]; }).filter(function (x) { return x && (!Array.isArray(x) || x.length); }).map(function (x) { return Array.isArray(x) ? x.join(', ') : x; }).join(' · '); }
        if (Array.isArray(val)) val = val.join(', ');
        if (!val && s.id !== 'service' && s.id !== 'about1') return;
        groups.push('<div class="rev-g"><div class="rev-h"><span class="eyebrow">' + esc(label) + '</span><button type="button" data-edit="' + i + '">Edit</button></div><p class="rev-v' + (s.id === 'about1' ? ' rev-wide' : '') + '" title="' + esc(val || '') + '">' + esc(val || '—') + '</p></div>');
      });
      html = head('Review', 'Does this look right?', 'Check your answers, then send.') + '<div class="rev">' + groups.join('') + '</div>';
    }
    var swap = function () {
      stage.innerHTML = '<div class="ct-step">' + html + '</div>';
      back.hidden = step === 0;
      next.querySelector('span').textContent = cur.id === 'review' ? 'Send enquiry' : 'Continue';
      prog.style.transform = 'scaleX(' + ((step + 1) / (F.length + 1)) + ')';
      countEl.textContent = String(step + 1).padStart(2, '0') + ' / ' + String(F.length).padStart(2, '0');
      var secs = sections(F), curSec = secs.indexOf(cur.sec);
      stepsEl.innerHTML = secs.map(function (s, i) { return '<li class="' + (i === curSec ? 'on' : i < curSec ? 'done' : '') + '"><span>0' + (i + 1) + ' ' + s + '</span><span>' + (i < curSec ? 'Done' : i === curSec ? '●' : '') + '</span></li>'; }).join('');
      stage.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.edit); }); });
      stage.querySelectorAll('input[name=service]').forEach(function (r) { r.addEventListener('change', function () { var old = state.service; state.service = r.value; if (old !== r.value) { Object.keys(state.a).forEach(function (k) { if (!/^(name|email|company|website|title|phone|source|budget|timing|where)$/.test(k)) delete state.a[k]; }); } setTimeout(function () { go(1); }, 280); }); });
      // single-choice questions advance on their own
      if (cur.id === 'q' && cur.f.type === 'one') stage.querySelectorAll('input[type=radio]').forEach(function (r) { r.addEventListener('change', function () { collect(); setTimeout(function () { if (flow()[step] === cur || flow()[step].f === cur.f) go(step + 1); }, 320); }); });
      fit();
      if (G && !RM) G.fromTo(stage.querySelectorAll('.ct-step > *, .two > *'), { opacity: 0, y: dir < 0 ? -20 : 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.045 });
      if (dir) { var h = stage.querySelector('.ct-q'); if (h) h.focus({ preventScroll: true }); }
    };
    if (dir && G && !RM && stage.firstChild) G.to(stage.firstChild, { opacity: 0, y: dir > 0 ? -20 : 20, duration: 0.22, ease: 'power2.in', onComplete: swap }); else swap();
  }

  // Guarantee the step fits: if content would overflow the stage, step down to compact tiers.
  function fit() {
    stage.classList.remove('tight', 'tighter');
    if (stage.scrollHeight > stage.clientHeight + 1) stage.classList.add('tight');
    if (stage.scrollHeight > stage.clientHeight + 1) stage.classList.add('tighter');
    stage.scrollTop = 0;
  }
  var rT; window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(fit, 80); });
  stage.addEventListener('scroll', function () { stage.scrollTop = 0; });

  function collect() {
    stage.querySelectorAll('.fld[data-k]').forEach(function (f) {
      var k = f.dataset.k; if (k === 'service') return;
      var ins = f.querySelectorAll('input,textarea,select');
      if (!ins.length) return;
      if (ins[0].type === 'checkbox') state.a[k] = Array.prototype.filter.call(ins, function (i) { return i.checked; }).map(function (i) { return i.value; });
      else if (ins[0].type === 'radio') { var c = Array.prototype.filter.call(ins, function (i) { return i.checked; })[0]; state.a[k] = c ? c.value : ''; }
      else state.a[k] = ins[0].value.trim();
    });
  }
  function validate() {
    var F = flow(), cur = F[step], ok = true, firstBad = null;
    var set = cur.id === 'q' ? [cur.f] : cur.id === 'about1' ? about1() : cur.id === 'about2' ? ABOUT2 : [];
    if (cur.id === 'service') { var f = stage.querySelector('[data-k=service]'); var bad = !state.service; f.classList.toggle('err', bad); if (bad) return false; }
    set.forEach(function (q) {
      var v = state.a[q.k], bad = false;
      if (q.req && (!v || (Array.isArray(v) && !v.length))) bad = true;
      if (!bad && v && q.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad = true;
      if (!bad && v && q.type === 'url') { var u = normUrl(v); if (u) state.a[q.k] = u; else bad = true; }
      var el = stage.querySelector('.fld[data-k="' + q.k + '"]'); if (el) { el.classList.toggle('err', bad); if (bad && !firstBad) firstBad = el; }
      if (bad) ok = false;
    });
    if (firstBad) { var i = firstBad.querySelector('input,textarea,select'); if (i) i.focus({ preventScroll: true }); }
    fit();
    return ok;
  }
  // Light check: accept "site.com", "www.site.com" or a full URL; store it with https:// in front.
  function normUrl(v) {
    v = v.trim(); if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) v = 'https://' + v.replace(/^\/+/, '');
    try { var u = new URL(v); return /^https?:$/.test(u.protocol) && /^[^.\s]+(\.[^.\s]+)*\.[a-z]{2,}$/i.test(u.hostname) ? u.href.replace(/\/$/, '') : ''; } catch (e) { return ''; }
  }
  function go(n) { var dir = n > step ? 1 : -1; step = n; render(dir); }

  stage.addEventListener('input', function (e) { var f = e.target.closest('.fld'); if (f && f.classList.contains('err')) { collect(); f.classList.remove('err'); } });
  stage.addEventListener('change', function (e) { var f = e.target.closest('.fld'); if (f) f.classList.remove('err'); });
  back.addEventListener('click', function () { collect(); if (step > 0) go(step - 1); });
  form.addEventListener('submit', function (e) {
    e.preventDefault(); collect();
    if (!validate()) return;
    if (flow()[step].id === 'review') return send();
    go(step + 1);
  });

  function payloadFor(ref) {
    var F = flow(), rows = [['Inquiry type', svcName(state.service)]], seen = {};
    F.forEach(function (st) {
      var set = st.id === 'q' ? [st.f] : st.id === 'about1' ? about1() : st.id === 'about2' ? ABOUT2 : [];
      set.forEach(function (q) { if (seen[q.k]) return; seen[q.k] = 1; var v = state.a[q.k]; v = Array.isArray(v) ? v.join(', ') : (v || ''); rows.push([q.l.replace(/ \(optional\)$/, ''), v || '—']); });
    });
    rows.push(['Reference', ref], ['Sent from', location.href.split('?')[0]]);
    return rows;
  }
  function send() {
    var ref = 'FL-26-' + String(Math.floor(1000 + Math.random() * 9000));
    var hp = form.querySelector('[data-hp]');
    if (hp && hp.value) return done(ref); // bots fill the hidden field; pretend it worked
    if (!ENDPOINT && !W3F) return done(ref);
    var rows = payloadFor(ref), name = state.a.name || 'someone';
    var subject = 'New Flint inquiry: ' + svcName(state.service) + ' from ' + name;
    var body = {};
    rows.forEach(function (r) { body[r[0]] = r[1]; });
    var url = ENDPOINT;
    if (W3F) { url = 'https://api.web3forms.com/submit'; body.access_key = W3F; body.subject = subject; body.from_name = 'Flint website'; body.email = state.a.email || ''; body.name = name; body.botcheck = false; }
    else { body._subject = subject; body._template = 'table'; body._captcha = 'false'; body._replyto = state.a.email || ''; body._honey = ''; if (form.getAttribute('data-cc')) body._cc = form.getAttribute('data-cc'); }
    next.disabled = true; back.disabled = true; next.querySelector('span').textContent = 'Sending…'; if (errEl) errEl.hidden = true;
    var ctl = window.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 20000);
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === false || j.success === 'false') throw new Error(j.message || ('HTTP ' + r.status)); return j; }); })
      .then(function () { clearTimeout(to); done(ref); })
      .catch(function (e) {
        clearTimeout(to); next.disabled = false; back.disabled = false; next.querySelector('span').textContent = 'Try again';
        if (errEl) errEl.hidden = false;
        fit(); if (window.console) console.warn('Flint form:', e && e.message);
      });
  }
  function done(ref) {
    var first = (state.a.name || '').split(' ')[0] || 'there';
    if (errEl) errEl.hidden = true;
    var s = state.service, steps;
    if (s === 'press') steps = [['Within 1 day', 'We reply with availability and anything you asked for.']];
    else if (s === 'other') steps = [['Within 1 day', 'The right person at Flint replies to you directly.']];
    else steps = [['Within 1 day', 'We reply personally to set up a first conversation.'], ['Within 1 week', 'A call to understand the business problem.'], ['After the call', 'A written plan with the work, the timing and the monthly fee.']];
    var html = '<div class="ct-step done"><span class="done-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2"/></svg></span>' +
      '<p class="eyebrow ct-k">Enquiry received</p><h2 class="ct-q" tabindex="-1">Thank you, ' + esc(first) + '.</h2>' +
      '<p class="ct-sub">' + (s === 'other' || s === 'press' ? 'Your message is with us.' : 'Your ' + esc(svcName(s).toLowerCase()) + ' enquiry is with us.') + '</p>' +
      '<div class="done-ref mono"><span>Reference <b>' + ref + '</b></span></div>' +
      '<ol class="next-steps">' + steps.map(function (x) { return '<li><span class="mono">' + x[0] + '</span><span>' + x[1] + '</span></li>'; }).join('') + '</ol>' +
      '<div><a class="btn" href="../work/"><span>Explore our work</span></a></div></div>';
    stage.innerHTML = html; root.querySelector('[data-nav]').hidden = true;
    prog.style.transform = 'scaleX(1)';
    stepsEl.querySelectorAll('li').forEach(function (li) { li.className = 'done'; li.lastChild.textContent = 'Done'; });
    fit();
    stage.querySelector('.ct-q').focus({ preventScroll: true });
    if (G && !RM) G.fromTo(stage.querySelectorAll('.done > *'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 });
  }

  if (state.service && params.get('service')) step = 1;
  render(0);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
