/* Iconic — branching contact flow (demo: nothing is sent) */
(function () {
  'use strict';
  var root = document.querySelector('[data-contact]'); if (!root) return;
  var d = document, G = window.gsap, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = root.querySelector('[data-stage]'), form = root.querySelector('[data-form]'), back = root.querySelector('[data-back]'), next = root.querySelector('[data-next]'), prog = root.querySelector('[data-prog]'), stepsEl = root.querySelector('[data-steps]');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var SERVICES = [
    { id: 'brand-strategy', t: 'Brand strategy', d: 'Positioning, architecture, naming' },
    { id: 'identity-design', t: 'Identity & design', d: 'Visual identity, packaging, type, motion' },
    { id: 'campaigns', t: 'Campaign', d: 'Integrated creative, film, out-of-home' },
    { id: 'performance-media', t: 'Performance media', d: 'Planning, buying, measurement' },
    { id: 'social-content', t: 'Social & content', d: 'Always-on content, creators, community' },
    { id: 'digital-product', t: 'Digital product', d: 'Websites, e-commerce, apps' }
  ];
  var OTHER = [
    { id: 'press', t: 'Press enquiry', d: 'Interviews, comment, assets' },
    { id: 'careers', t: 'Join Iconic', d: 'Apply for a role or send a portfolio' },
    { id: 'other', t: 'Something else', d: 'Partnerships, speaking, everything else' }
  ];
  var ALL = SERVICES.concat(OTHER);
  var ROLES = ['Senior Copywriter', 'Art Director', 'Brand Strategist', 'Paid Social Lead', 'Senior Product Designer', 'Front-end Engineer', 'Producer, Film', 'Community Manager', 'Group Account Director', 'Data Scientist, Effectiveness', 'Motion Designer', 'Creative Intern, The Bowery Programme', 'Speculative application'];

  // Service-specific question sets. type: one (single chips), many (multi chips), text, area, select, date, url
  var Q = {
    'brand-strategy': { h: 'Where is the brand today?', f: [
      { k: 'stage', l: 'Situation', type: 'one', req: 1, o: ['New company, no brand yet', 'Established, needs repositioning', 'Merger or portfolio change', 'Needs a new name'] },
      { k: 'trigger', l: 'What prompted this now?', type: 'area', req: 1, ph: 'A new competitor, flat growth, a new CEO, an upcoming launch…' },
      { k: 'markets', l: 'Markets', type: 'many', o: ['North America', 'UK & Europe', 'Asia-Pacific', 'Global'] } ] },
    'identity-design': { h: 'What needs designing?', f: [
      { k: 'scope', l: 'Scope', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Logo or wordmark', 'Full identity system', 'Packaging', 'Custom typeface', 'Motion identity', 'Guidelines & toolkit', 'Environmental / signage'] },
      { k: 'strategy', l: 'Do you have a brand strategy in place?', type: 'one', req: 1, o: ['Yes, signed off', 'Partly', 'No, we need help with that too'] },
      { k: 'launch', l: 'Target launch', type: 'month' } ] },
    'campaigns': { h: 'Tell us about the campaign.', f: [
      { k: 'objective', l: 'Primary objective', type: 'one', req: 1, o: ['Brand awareness', 'Product launch', 'Consideration', 'Drive sales', 'Change perception'] },
      { k: 'channels', l: 'Channels you are considering', hint: 'Choose all that apply', type: 'many', o: ['TV & online video', 'Out-of-home', 'Social', 'Audio', 'Experiential', 'Print', 'Not sure yet'] },
      { k: 'media', l: 'Working media budget', type: 'one', req: 1, o: ['Under $1M', '$1–5M', '$5–20M', '$20M+'] } ] },
    'performance-media': { h: 'How does your media work today?', f: [
      { k: 'spend', l: 'Annual media spend', type: 'one', req: 1, o: ['Under $2M', '$2–10M', '$10–50M', '$50M+'] },
      { k: 'channels', l: 'Current channels', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Paid social', 'Search', 'Retail media', 'Connected TV', 'Programmatic', 'Out-of-home', 'Audio'] },
      { k: 'measure', l: 'How do you measure success?', type: 'one', o: ['Last-click / platform reporting', 'Marketing mix modelling', 'Incrementality tests', 'Not sure'] } ] },
    'social-content': { h: 'What do you need on social?', f: [
      { k: 'need', l: 'What you need', hint: 'Choose all that apply', type: 'many', req: 1, o: ['Social strategy', 'Always-on content', 'Creator partnerships', 'Community management', 'Paid social creative'] },
      { k: 'platforms', l: 'Priority platforms', type: 'many', o: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Pinterest'] },
      { k: 'audience', l: 'Current combined following', type: 'select', o: ['Under 10k', '10k–100k', '100k–1M', 'Over 1M'] } ] },
    'digital-product': { h: 'What are you building?', f: [
      { k: 'type', l: 'Product type', type: 'one', req: 1, o: ['Marketing website', 'E-commerce', 'iOS / Android app', 'Service or platform'] },
      { k: 'phase', l: 'Where are you now?', type: 'one', req: 1, o: ['Just an idea', 'Redesigning something live', 'Live and growing'] },
      { k: 'stack', l: 'Current stack (optional)', type: 'text', ph: 'e.g. Shopify, Next.js, Contentful' } ] },
    'press': { h: 'What’s your request?', f: [
      { k: 'outlet', l: 'Publication or outlet', type: 'text', req: 1, ph: 'e.g. Design Week' },
      { k: 'deadline', l: 'Deadline', type: 'date' },
      { k: 'request', l: 'Request', type: 'area', req: 1, ph: 'Interview, comment, images, award entry…' } ] },
    'careers': { h: 'Which role are you interested in?', f: [
      { k: 'role', l: 'Role', type: 'select', req: 1, o: ROLES },
      { k: 'portfolio', l: 'Portfolio or LinkedIn URL', type: 'url', req: 1, ph: 'https://' },
      { k: 'why', l: 'Why Iconic? (optional)', type: 'area', ph: 'A few sentences is plenty.' } ] },
    'other': { h: 'How can we help?', f: [
      { k: 'topic', l: 'Topic', type: 'one', req: 1, o: ['Partnership', 'Speaking', 'Education', 'Something else'] },
      { k: 'msg', l: 'Message', type: 'area', req: 1, ph: 'Tell us a little more.' } ] }
  };
  var BUDGET = { h: 'Budget and timing.', f: [
    { k: 'budget', l: 'Fee budget for this project', type: 'one', req: 1, o: ['$100–250k', '$250–500k', '$500k–1M', '$1M+', 'Not sure yet'] },
    { k: 'timing', l: 'When do you want to start?', type: 'one', req: 1, o: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'] },
    { k: 'studio', l: 'Preferred studio', type: 'one', o: ['New York', 'London', 'Lisbon', 'Singapore', 'Los Angeles', 'No preference'] } ] };
  var ABOUT = { h: 'And finally, about you.', f: [
    { k: 'name', l: 'Full name', type: 'text', req: 1, ac: 'name' },
    { k: 'email', l: 'Work email', type: 'email', req: 1, ac: 'email' },
    { k: 'company', l: 'Company', type: 'text', req: 1, ac: 'organization' },
    { k: 'title', l: 'Job title', type: 'text', ac: 'organization-title' },
    { k: 'source', l: 'How did you hear about us?', type: 'select', o: ['Recommendation', 'Award show or press', 'Search', 'Social media', 'Event or talk', 'Other'] } ] };

  function AF() {
    var f = ABOUT.f.slice();
    if (state.service === 'careers' || state.service === 'press') f[2] = { k: 'company', l: state.service === 'press' ? 'Organisation (optional)' : 'Current company (optional)', type: 'text', ac: 'organization' };
    return f;
  }
  var params = new URLSearchParams(location.search);
  var state = { service: null, a: {} };
  var pre = params.get('service'); if (pre && ALL.some(function (s) { return s.id === pre; })) state.service = pre;
  var role = params.get('role'); if (role) state.a.role = ROLES.indexOf(role) > -1 ? role : 'Speculative application';
  var step = 0;

  function flow() {
    var s = state.service, isWork = SERVICES.some(function (x) { return x.id === s; });
    var f = [{ id: 'service', label: 'Service' }, { id: 'details', label: 'Details' }];
    if (isWork || !s) f.push({ id: 'budget', label: 'Budget & timing' });
    if (s === 'careers') f.push({ id: 'about', label: 'About you', careers: true }); else f.push({ id: 'about', label: 'About you' });
    f.push({ id: 'review', label: 'Review' });
    return f;
  }
  function svcName(id) { var s = ALL.filter(function (x) { return x.id === id; })[0]; return s ? s.t : ''; }

  function field(q) {
    var v = state.a[q.k], id = 'f-' + q.k, html = '';
    var lab = '<span class="fl" id="' + id + '-l">' + esc(q.l) + (q.req ? '' : '') + (q.hint ? ' <span class="opt-hint">— ' + q.hint + '</span>' : '') + '</span>';
    if (q.type === 'one' || q.type === 'many') {
      html = lab + '<div class="tchips" role="' + (q.type === 'one' ? 'radiogroup' : 'group') + '" aria-labelledby="' + id + '-l">' + q.o.map(function (o) {
        var on = q.type === 'one' ? v === o : (v || []).indexOf(o) > -1;
        return '<label class="tchip"><input type="' + (q.type === 'one' ? 'radio' : 'checkbox') + '" name="' + q.k + '" value="' + esc(o) + '"' + (on ? ' checked' : '') + '><span>' + esc(o) + '</span></label>';
      }).join('') + '</div>';
    } else if (q.type === 'area') {
      html = '<label class="fl" for="' + id + '">' + esc(q.l) + '</label><textarea class="inp" id="' + id + '" name="' + q.k + '" placeholder="' + esc(q.ph || '') + '"' + (q.req ? ' required' : '') + '>' + esc(v || '') + '</textarea>';
    } else if (q.type === 'select') {
      html = '<label class="fl" for="' + id + '">' + esc(q.l) + '</label><select class="inp" id="' + id + '" name="' + q.k + '"' + (q.req ? ' required' : '') + '><option value="">Select…</option>' + q.o.map(function (o) { return '<option' + (v === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
    } else {
      var t = q.type === 'month' ? 'month' : q.type;
      html = '<label class="fl" for="' + id + '">' + esc(q.l) + '</label><input class="inp" id="' + id + '" name="' + q.k + '" type="' + t + '" value="' + esc(v || '') + '" placeholder="' + esc(q.ph || '') + '"' + (q.ac ? ' autocomplete="' + q.ac + '"' : '') + (q.req ? ' required' : '') + '>';
    }
    var err = q.type === 'email' ? 'Enter a valid email address.' : q.type === 'url' ? 'Enter a link starting with http:// or https://' : (q.type === 'one' || q.type === 'many' || q.type === 'select') ? 'Please choose an option.' : 'This field is required.';
    return '<div class="fld" data-k="' + q.k + '">' + html + '<span class="fld-err" role="alert">' + err + '</span></div>';
  }

  function render(dir) {
    var F = flow(), cur = F[step], html = '';
    var head = function (k, h, sub) { return '<p class="eyebrow ct-k">Step ' + (step + 1) + ' of ' + F.length + ' — ' + k + '</p><h2 class="ct-q">' + h + '</h2>' + (sub ? '<p class="ct-sub">' + sub + '</p>' : ''); };
    if (cur.id === 'service') {
      var opt = function (s, i) { return '<label class="opt"><input type="radio" name="service" value="' + s.id + '"' + (state.service === s.id ? ' checked' : '') + '><span class="mono">' + String(i + 1).padStart(2, '0') + '</span><span class="opt-t">' + s.t + '</span><span class="opt-d">' + s.d + '</span><span class="opt-c" aria-hidden="true"></span></label>'; };
      html = head('Service', 'What can we help with?', 'Your answer shapes the next few questions, so we only ask what matters.') +
        '<div class="fld" data-k="service"><div class="opts" role="radiogroup" aria-label="Services">' + SERVICES.map(opt).join('') + '</div><div class="opts-sec"><p class="eyebrow">Not a project?</p><div class="opts" role="radiogroup" aria-label="Other enquiries">' + OTHER.map(function (s, i) { return opt(s, i + 6); }).join('') + '</div></div><span class="fld-err" role="alert">Please choose one to continue.</span></div>';
    } else if (cur.id === 'details') {
      var q = Q[state.service]; html = head(svcName(state.service), q.h) + q.f.map(field).join('');
    } else if (cur.id === 'budget') {
      html = head('Budget & timing', BUDGET.h, 'Ranges are fine. It helps us bring the right team to the first call.') + BUDGET.f.map(field).join('');
    } else if (cur.id === 'about') {
      html = head('About you', ABOUT.h) + '<div class="two">' + AF().slice(0, 4).map(field).join('') + '</div>' + field(AF()[4]) +
        '<label class="chk"><input type="checkbox" name="consent"' + (state.a.consent ? ' checked' : '') + '><span>Send me The Iconic Letter, one email a month. Unsubscribe any time.</span></label>';
    } else if (cur.id === 'review') {
      html = head('Review', 'Does this look right?', 'Check your answers, then send. You can edit any section.') + '<div class="rev">' + F.slice(0, -1).map(function (s, i) {
        var rows = [];
        if (s.id === 'service') rows.push(['Enquiry', svcName(state.service)]);
        var set = s.id === 'details' ? Q[state.service].f : s.id === 'budget' ? BUDGET.f : s.id === 'about' ? AF() : [];
        set.forEach(function (q) { var v = state.a[q.k]; if (v && (!Array.isArray(v) || v.length)) rows.push([q.l.replace(/ \(optional\)/, ''), Array.isArray(v) ? v.join(', ') : v]); });
        return '<div class="rev-g"><div class="rev-h"><span class="eyebrow">' + s.label + '</span><button type="button" data-edit="' + i + '">Edit</button></div><dl>' + rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl></div>';
      }).join('') + '</div>';
    }
    var swap = function () {
      stage.innerHTML = '<div class="ct-step">' + html + '</div>';
      back.hidden = step === 0;
      next.querySelector('span').textContent = cur.id === 'review' ? 'Send enquiry' : 'Continue';
      prog.style.transform = 'scaleX(' + ((step + 1) / (F.length + 1)) + ')';
      stepsEl.innerHTML = F.map(function (s, i) { return '<li class="' + (i === step ? 'on' : i < step ? 'done' : '') + '"><span>0' + (i + 1) + ' ' + s.label + '</span><span>' + (i < step ? 'Done' : i === step ? '●' : '') + '</span></li>'; }).join('');
      stage.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.edit); }); });
      stage.querySelectorAll('input[name=service]').forEach(function (r) { r.addEventListener('change', function () { var old = state.service; state.service = r.value; if (old !== r.value) setTimeout(function () { go(1); }, 260); }); });
      if (G && !RM) G.fromTo(stage.querySelectorAll('.ct-step > *, .two > *'), { opacity: 0, y: dir < 0 ? -24 : 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 });
      if (dir) { var h = stage.querySelector('.ct-q'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
    };
    if (dir && G && !RM && stage.firstChild) G.to(stage.firstChild, { opacity: 0, y: dir > 0 ? -24 : 24, duration: 0.25, ease: 'power2.in', onComplete: swap }); else swap();
    if (dir) { var top = root.getBoundingClientRect().top + scrollY - 20; if (scrollY > top + 40) { if (window.icLenis) window.icLenis.scrollTo(top, { duration: 0.8 }); else scrollTo(0, top); } }
  }

  function collect() {
    stage.querySelectorAll('.fld[data-k]').forEach(function (f) {
      var k = f.dataset.k; if (k === 'service') return;
      var ins = f.querySelectorAll('input,textarea,select');
      if (!ins.length) return;
      if (ins[0].type === 'checkbox') state.a[k] = Array.prototype.filter.call(ins, function (i) { return i.checked; }).map(function (i) { return i.value; });
      else if (ins[0].type === 'radio') { var c = Array.prototype.filter.call(ins, function (i) { return i.checked; })[0]; state.a[k] = c ? c.value : ''; }
      else state.a[k] = ins[0].value.trim();
    });
    var c = stage.querySelector('input[name=consent]'); if (c) state.a.consent = c.checked;
  }
  function validate() {
    var F = flow(), cur = F[step], ok = true, firstBad = null;
    var set = cur.id === 'details' ? Q[state.service].f : cur.id === 'budget' ? BUDGET.f : cur.id === 'about' ? AF() : [];
    if (cur.id === 'service') { var f = stage.querySelector('[data-k=service]'); var bad = !state.service; f.classList.toggle('err', bad); if (bad) return false; }
    set.forEach(function (q) {
      var v = state.a[q.k], bad = false;
      if (q.req && (!v || (Array.isArray(v) && !v.length))) bad = true;
      if (!bad && v && q.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad = true;
      if (!bad && v && q.type === 'url' && !/^https?:\/\/\S+\.\S+/.test(v)) bad = true;
      var el = stage.querySelector('.fld[data-k="' + q.k + '"]'); if (el) { el.classList.toggle('err', bad); if (bad && !firstBad) firstBad = el; }
      if (bad) ok = false;
    });
    if (firstBad) { var i = firstBad.querySelector('input,textarea,select'); if (i) i.focus(); }
    return ok;
  }
  function go(n) { var dir = n > step ? 1 : -1; step = n; render(dir); }

  stage.addEventListener('input', function (e) { var f = e.target.closest('.fld'); if (f && f.classList.contains('err')) { collect(); f.classList.remove('err'); } });
  stage.addEventListener('change', function (e) { var f = e.target.closest('.fld'); if (f) f.classList.remove('err'); });
  back.addEventListener('click', function () { collect(); if (step > 0) go(step - 1); });
  form.addEventListener('submit', function (e) {
    e.preventDefault(); collect();
    if (!validate()) return;
    var F = flow();
    if (F[step].id === 'review') return done();
    go(step + 1);
  });

  function done() {
    var first = (state.a.name || '').split(' ')[0] || 'there';
    var ref = 'IC-26-' + String(Math.floor(1000 + Math.random() * 9000));
    var studio = state.a.studio && state.a.studio !== 'No preference' ? state.a.studio : 'New York';
    var s = state.service, steps;
    if (s === 'press') steps = [['Within 4 hours', 'Our communications team replies with availability.'], ['Same day', 'Assets and spokesperson briefing sent over.']];
    else if (s === 'careers') steps = [['Within 5 days', 'A member of our talent team reviews your portfolio.'], ['Within 2 weeks', 'If it is a fit, a first conversation with the hiring lead.']];
    else if (s === 'other') steps = [['Within 2 days', 'The right person at Iconic replies to you directly.']];
    else steps = [['Within 1 day', 'A partner from our ' + studio + ' studio replies personally.'], ['Within 1 week', 'A 45-minute call to understand the business problem.'], ['Within 3 weeks', 'A written proposal with team, approach, timeline and fee.']];
    var html = '<div class="ct-step done"><span class="done-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2"/></svg></span>' +
      '<p class="eyebrow ct-k">Enquiry received</p><h2 class="ct-q" tabindex="-1">Thank you, ' + esc(first) + '.</h2>' +
      '<p class="ct-sub" style="margin-top:0">' + (s === 'careers' ? 'Your application is with our talent team.' : s === 'other' ? 'Your message is with us.' : 'Your ' + esc(svcName(s).toLowerCase()) + ' enquiry is with us.') + ' A copy is on its way to ' + esc(state.a.email || 'your inbox') + '.</p>' +
      '<div class="done-ref mono"><span>Reference <b>' + ref + '</b></span><span>Studio <b>' + esc(studio) + '</b></span></div>' +
      '<ol class="next-steps">' + steps.map(function (x) { return '<li><span class="mono">' + x[0] + '</span><span>' + x[1] + '</span></li>'; }).join('') + '</ol>' +
      '<p class="mono" style="color:var(--mute)">This is a demonstration site, so nothing was actually sent.</p>' +
      '<div><a class="btn" href="../work/"><span>Explore our work while you wait</span></a></div></div>';
    stage.innerHTML = html; root.querySelector('[data-nav]').hidden = true;
    prog.style.transform = 'scaleX(1)';
    stepsEl.querySelectorAll('li').forEach(function (li) { li.className = 'done'; li.lastChild.textContent = 'Done'; });
    stage.querySelector('.ct-q').focus({ preventScroll: true });
    var top = root.getBoundingClientRect().top + scrollY; if (window.icLenis) window.icLenis.scrollTo(top, { duration: 0.9 }); else scrollTo(0, top);
    if (G && !RM) G.fromTo(stage.querySelectorAll('.done > *'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 });
  }

  if (state.service && params.get('service')) step = 1;
  render(0);
})();
