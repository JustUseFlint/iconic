/* Flint — motion & interaction system (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';
  var d = document, H = d.documentElement, W = window;
  var RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasG = !!(W.gsap && W.ScrollTrigger);
  var motion = !RM && hasG;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lenis = null;
  W.__flReady = true;
  H.classList.toggle('motion', motion);
  H.classList.toggle('no-motion', !motion);
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll ---------- */
  if (motion && W.Lenis && !H.classList.contains('is-app')) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  W.icLenis = lenis;

  /* ---------- Page transitions ---------- */
  var pt = $('.pt');
  function clearPT() { H.classList.remove('pt-in'); try { sessionStorage.removeItem('fl-pt'); } catch (e) {} }
  var entering = H.classList.contains('pt-in');
  if (motion && pt) {
    if (entering) { gsap.set(pt, { yPercent: 0 }); H.classList.remove('pt-in'); gsap.to(pt, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', delay: 0.1, onComplete: function () { gsap.set(pt, { yPercent: 100 }); } }); }
    else gsap.set(pt, { yPercent: 100 });
  }
  clearPT();
  function leave(href) {
    try { sessionStorage.setItem('fl-pt', '1'); } catch (e) {}
    if (!motion || !pt) { location.href = href; return; }
    closeIsland(true); closeAcm(true);
    gsap.fromTo(pt, { yPercent: 100 }, { yPercent: 0, duration: 0.65, ease: 'expo.inOut', onComplete: function () { location.href = href; } });
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) {
      if (url.hash) {
        var t = url.hash === '#top' ? 0 : d.getElementById(url.hash.slice(1));
        if (t !== null) { e.preventDefault(); if (lenis) lenis.scrollTo(t, { duration: 1.4 }); else W.scrollTo({ top: t === 0 ? 0 : t.getBoundingClientRect().top + scrollY, behavior: RM ? 'auto' : 'smooth' }); }
        return;
      }
      e.preventDefault(); closeIsland(); closeAcm(); return;
    }
    e.preventDefault(); leave(url.href);
  });
  W.addEventListener('pageshow', function (e) { if (e.persisted && hasG && pt) { gsap.set(pt, { yPercent: 100 }); } H.classList.remove('pt-in'); });

  /* ---------- Island menu ----------
     A floating pill pinned to the bottom of the screen. Hidden at the top of the page, it rises into view once
     you scroll down, and morphs (height first, then width) into the menu card. The top bar's Menu button
     opens it at any time, so navigation is reachable on page load. */
  var isl = $('[data-isl]'), body = isl && $('[data-isl-body]', isl), panel = isl && $('[data-isl-panel]', isl);
  var trig = isl && $('[data-isl-trig]', isl), openers = $$('[data-isl-open]'), cap = isl && $('[data-isl-cap]', isl);
  var islOpen = false, islTl = null, lastFocus = null, scrim = null, closedW = 300;
  function islSize() {
    var mob = innerWidth < 768, vh = (W.visualViewport ? W.visualViewport.height : innerHeight);
    if (mob) { var w = Math.min(340, innerWidth - 24); return { w: w, h: Math.min(Math.round(w * 1.36), vh - 32) }; }
    return { w: 468, h: Math.min(312, vh - 56) };
  }
  function setShown() {
    if (!isl) return;
    var show = islOpen || scrollY > Math.min(innerHeight * 0.45, 360);
    isl.classList.toggle('is-shown', show);
  }
  function links() { return $$('.isl-link', panel); }
  function focusables() { return $$('a[href],button:not([disabled])', isl).filter(function (el) { return el.offsetParent !== null || el === trig; }); }
  function setTrig(on) {
    [trig].concat(openers).forEach(function (b) { if (b) b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    if (trig) trig.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
  }
  function openIsland(fromKey) {
    if (!isl || islOpen) return;
    if (!isl.classList.contains('is-open')) closedW = body.offsetWidth;
    islOpen = true; lastFocus = d.activeElement;
    var sz = islSize();
    isl.style.setProperty('--isl-open-w', sz.w + 'px'); isl.style.setProperty('--isl-open-h', sz.h + 'px');
    isl.classList.add('is-open', 'is-shown'); H.classList.add('isl-open');
    panel.removeAttribute('inert'); panel.setAttribute('aria-hidden', 'false'); setTrig(true);
    $$('img', panel).forEach(function (im) { im.loading = 'eager'; });
    if (islTl) islTl.kill();
    if (motion) {
      isl.classList.add('is-anim');
      islTl = gsap.timeline({ onComplete: function () { isl.classList.remove('is-anim'); } });
      islTl.to(body, { height: sz.h, borderRadius: 22, duration: 0.5, ease: 'expo.out' }, 0)
        .to(body, { width: sz.w, duration: 0.45, ease: 'expo.out' }, 0.16)
        .fromTo(links(), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.035 }, 0.18)
        .fromTo($('.isl-slab', panel), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 0.24);
      if (cap) islTl.to(cap, { attr: { y: 3, height: 14, rx: 3 }, duration: 0.45, ease: 'expo.out' }, 0);
    } else { body.style.height = sz.h + 'px'; body.style.width = sz.w + 'px'; }
    setTimeout(function () { var l = links()[0]; if (l) l.focus({ preventScroll: true }); }, motion ? 220 : 0);
  }
  function closeIsland(instant) {
    if (!isl || !islOpen) return;
    islOpen = false; H.classList.remove('isl-open');
    panel.setAttribute('aria-hidden', 'true'); panel.setAttribute('inert', ''); setTrig(false);
    var done = function () { isl.classList.remove('is-open', 'is-anim'); body.style.width = ''; body.style.height = ''; body.style.borderRadius = ''; if (W.gsap) gsap.set(links().concat($('.isl-slab', panel)), { clearProps: 'all' }); setShown(); };
    if (islTl) islTl.kill();
    if (motion && !instant) {
      isl.classList.add('is-anim');
      islTl = gsap.timeline({ onComplete: done });
      islTl.to(links(), { y: 10, opacity: 0, duration: 0.18, ease: 'power2.in', stagger: 0.015 }, 0)
        .to($('.isl-slab', panel), { opacity: 0, duration: 0.2 }, 0)
        .to(body, { width: closedW, duration: 0.4, ease: 'expo.inOut' }, 0.08)
        .to(body, { height: 50, borderRadius: 25, duration: 0.45, ease: 'expo.inOut' }, 0.2);
      if (cap) islTl.to(cap, { attr: { y: 6, height: 8, rx: 4 }, duration: 0.4, ease: 'expo.inOut' }, 0.1);
    } else { if (cap) { cap.setAttribute('y', 6); cap.setAttribute('height', 8); cap.setAttribute('rx', 4); } done(); }
    if (lastFocus && lastFocus.focus && d.contains(lastFocus) && !instant) lastFocus.focus({ preventScroll: true });
  }
  if (isl) {
    scrim = d.createElement('div'); scrim.className = 'isl-scrim'; scrim.setAttribute('aria-hidden', 'true'); d.body.appendChild(scrim);
    scrim.addEventListener('click', function () { closeIsland(); });
    trig.addEventListener('click', function () { if (islOpen) closeIsland(); else openIsland(); });
    openers.forEach(function (b) { b.addEventListener('click', function () { if (islOpen) closeIsland(); else openIsland(); }); });
    d.addEventListener('pointerdown', function (e) { if (islOpen && !isl.contains(e.target) && !e.target.closest('[data-isl-open]')) closeIsland(); });
    isl.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !islOpen) return;
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // preview slab: swap the image + caption to match the hovered / focused link
    var caps = {}; try { caps = JSON.parse($('[data-isl-captions]', isl).getAttribute('data-isl-captions')); } catch (e) {}
    var idx = $('[data-isl-idx]', isl), txt = $('[data-isl-txt]', isl), imgs = $$('[data-isl-img]', isl);
    var slab = function (key, n) {
      var target = imgs.filter(function (im) { return im.dataset.islImg === key; })[0] || imgs[0];
      imgs.forEach(function (im) { im.classList.toggle('on', im === target); });
      if (idx) idx.textContent = n ? n : 'Flint';
      if (txt) txt.textContent = caps[key] || 'Brand & marketing, west-central Indiana';
    };
    links().forEach(function (a) {
      var on = function () { slab(a.dataset.islKey, a.querySelector('.mono') ? a.querySelector('.mono').textContent : ''); };
      a.addEventListener('pointerenter', on); a.addEventListener('focus', on);
    });
    $('.isl-nav', isl).addEventListener('pointerleave', function () { slab('home'); });
    W.addEventListener('resize', function () {
      if (!islOpen) return; var sz = islSize();
      isl.style.setProperty('--isl-open-w', sz.w + 'px'); isl.style.setProperty('--isl-open-h', sz.h + 'px');
      if (islTl) islTl.progress(1); body.style.width = sz.w + 'px'; body.style.height = sz.h + 'px';
    });
  }
  W.addEventListener('scroll', setShown, { passive: true }); setShown();
  W.icIsland = { open: openIsland, close: closeIsland };
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (typeof closeAcm === 'function') closeAcm(); closeIsland(); closeReel(); } });

  /* ---------- Accordion menu ----------
     The header's dot-grid button opens a full-screen panel of four rows (Work, Services, Studio, Contact).
     Opening a row grows it, reveals an image and its links, and dims the others. Escape closes. */
  var acm = $('[data-acm]'), acmOpeners = $$('[data-acm-open]'), acmOn = false, acmTl = null, acmLast = null;
  var acmRows = acm ? $$('[data-acm-row]', acm) : [], acmList = acm && $('.acm-list', acm);
  function acmFocusables() { return $$('a[href],button:not([disabled])', acm).filter(function (el) { return !el.closest('[inert]') && el.offsetParent !== null; }); }
  function setRow(row) {
    acmRows.forEach(function (r) {
      var on = r === row, h = $('.acm-h', r), p = $('.acm-p', r);
      r.classList.toggle('is-on', on); h.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) p.removeAttribute('inert'); else p.setAttribute('inert', '');
    });
    if (acmList) acmList.classList.toggle('has-on', !!row);
  }
  function openAcm(from) {
    if (!acm || acmOn) return;
    acmOn = true; acmLast = from || d.activeElement; closeIsland(true);
    $$('img', acm).forEach(function (im) { im.loading = 'eager'; });
    acm.removeAttribute('inert'); acm.setAttribute('aria-hidden', 'false'); acm.classList.add('is-open'); H.classList.add('acm-open');
    acmOpeners.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    if (lenis) lenis.stop();
    if (acmTl) acmTl.kill();
    if (motion) {
      var ts = $$('.acm-t>span', acm), ex = $$('.acm-n,.acm-pm,.acm-foot,.acm-top>*', acm);
      acmTl = gsap.timeline();
      acmTl.fromTo(acm, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' }, 0)
        .fromTo(ex, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.03 }, 0.35)
        .fromTo(ts, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.42);
    }
    setTimeout(function () { var f = $('.acm-h', acm); if (f) f.focus({ preventScroll: true }); }, motion ? 450 : 0);
  }
  function closeAcm(instant) {
    if (!acm || !acmOn) return;
    acmOn = false; H.classList.remove('acm-open');
    acmOpeners.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    acm.setAttribute('aria-hidden', 'true'); acm.setAttribute('inert', '');
    var done = function () { acm.classList.remove('is-open'); setRow(null); if (W.gsap) gsap.set($$('.acm-t>span,.acm-n,.acm-pm,.acm-foot,.acm-top>*', acm).concat(acm), { clearProps: 'all' }); };
    if (lenis) lenis.start();
    if (acmTl) acmTl.kill();
    if (motion && !instant) {
      acmTl = gsap.timeline({ onComplete: done });
      acmTl.to($$('.acm-t>span', acm), { yPercent: -110, duration: 0.35, ease: 'power2.in', stagger: 0.03 }, 0)
        .to(acm, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: 'expo.inOut' }, 0.15);
    } else done();
    if (!instant && acmLast && acmLast.focus && d.contains(acmLast)) acmLast.focus({ preventScroll: true });
  }
  if (acm) {
    acmOpeners.forEach(function (b) { b.addEventListener('click', function () { if (acmOn) closeAcm(); else openAcm(b); }); });
    $('[data-acm-close]', acm).addEventListener('click', function () { closeAcm(); });
    acmRows.forEach(function (r) { $('.acm-h', r).addEventListener('click', function () { setRow(r.classList.contains('is-on') ? null : r); }); });
    acm.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = acmFocusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // a click on the panel's empty space (not a row, link or button) closes it
    acm.addEventListener('click', function (e) { if (e.target === acm || e.target.classList.contains('acm-top')) closeAcm(); });
  }
  W.icAcm = { open: openAcm, close: closeAcm };

  /* ---------- Live local clocks ---------- */
  var clocks = $$('[data-clock]');
  function tick() {
    clocks.forEach(function (el) {
      try {
        var t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.clock }).format(new Date());
        el.textContent = (el.dataset.label ? el.dataset.label + ' ' : '') + t;
      } catch (e) {}
    });
  }
  tick(); setInterval(tick, 15000);

  /* ---------- Small interactions that work without GSAP ---------- */
  // Copy link
  $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { var done = function () { b.textContent = 'Link copied'; setTimeout(function () { b.textContent = 'Copy link'; }, 2000); }; if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done(); }); });
  // Quotes carousel
  $$('[data-quotes]').forEach(function (q) {
    var items = $$('.q', q), i = 0, num = $('[data-q-i]', q), timer;
    function show(n) {
      items[i].classList.remove('on'); items[i].setAttribute('aria-hidden', 'true');
      i = (n + items.length) % items.length;
      items[i].classList.add('on'); items[i].setAttribute('aria-hidden', 'false');
      num.textContent = String(i + 1).padStart(2, '0');
      if (motion) gsap.fromTo($('.q-t', items[i]), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' });
    }
    $$('[data-q]', q).forEach(function (b) { b.addEventListener('click', function () { show(i + +b.dataset.q); clearInterval(timer); }); });
    if (!RM) timer = setInterval(function () { show(i + 1); }, 8000);
  });
  // Pill + reel slideshows
  function cycle(sel, ms, cb) {
    $$(sel).forEach(function (box) {
      var imgs = $$('img', box), i = 0; if (imgs.length < 2 || RM) return;
      setInterval(function () { imgs[i].classList.remove('on'); i = (i + 1) % imgs.length; imgs[i].classList.add('on'); if (imgs[i].loading === 'lazy') imgs[i].loading = 'eager'; cb && cb(i); }, ms);
    });
  }
  var reelEl = $('[data-reel-name]'), reelNames = reelEl && reelEl.dataset.names ? reelEl.dataset.names.split('|') : [];
  cycle('.pill', 1800);
  cycle('[data-reel-slides]', 2600, function (i) { var n = $('[data-reel-name]'); if (n) n.textContent = reelNames[i] || ''; });

  // Reel modal
  var rm = $('[data-reel-modal]'), rmTimer = null, rmPrev = null;
  function closeReel() {
    if (!rm || rm.hidden) return;
    rm.hidden = true; clearInterval(rmTimer); if (lenis) lenis.start(); d.body.style.overflow = '';
    if (rmPrev) rmPrev.focus();
  }
  if (rm) {
    var slides = $$('.rm-slide', rm), bar = $('[data-rm-progress]', rm), si = 0, DUR = 4200;
    var go = function (n) { slides.forEach(function (s, k) { s.classList.toggle('on', k === n); }); si = n; if (bar) bar.style.transform = 'scaleX(' + ((n + 1) / slides.length) + ')'; };
    $('[data-reel-open]').addEventListener('click', function (e) {
      rmPrev = e.currentTarget; rm.hidden = false; if (lenis) lenis.stop(); d.body.style.overflow = 'hidden';
      $$('img', rm).forEach(function (im) { im.loading = 'eager'; });
      go(0); $('[data-reel-close]', rm).focus();
      clearInterval(rmTimer); rmTimer = setInterval(function () { if (si + 1 >= slides.length) closeReel(); else go(si + 1); }, DUR);
    });
    $('[data-reel-close]', rm).addEventListener('click', closeReel);
  }

  // Filters (work, news, clients)
  function chipGroup(root, fn) {
    if (!root) return;
    var chips = $$('.chip', root);
    chips.forEach(function (c) { c.addEventListener('click', function () { chips.forEach(function (x) { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); }); fn(c.dataset.f); }); });
  }
  var wg = $('[data-work-grid]');
  if (wg) {
    var items = $$('.wg-i', wg);
    var relayout = function () { var k = 0; items.forEach(function (it) { it.className = it.className.replace(/\bwg-[0-3]\b/, '').trim(); if (!it.classList.contains('is-out')) it.classList.add('wg-' + (k++ % 4)); }); $('[data-empty]').hidden = k > 0; if (hasG) ScrollTrigger.refresh(); };
    chipGroup($('[data-filter]'), function (f) {
      var show = items.filter(function (it) { return f === 'all' || it.dataset.tags.split(',').indexOf(f) > -1; });
      var apply = function () { items.forEach(function (it) { it.classList.toggle('is-out', show.indexOf(it) < 0); }); relayout(); if (motion) gsap.fromTo(show, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, clearProps: 'transform' }); };
      if (motion) gsap.to(items.filter(function (it) { return !it.classList.contains('is-out'); }), { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: apply }); else apply();
    });
    $$('[data-view]').forEach(function (b) { b.addEventListener('click', function () { $$('[data-view]').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); wg.classList.toggle('is-list', b.dataset.view === 'list'); if (hasG) ScrollTrigger.refresh(); }); });
  }
  chipGroup($('[data-news-filter]'), function (f) { $$('.nl-full li').forEach(function (li) { li.hidden = !(f === 'all' || li.dataset.type === f); }); if (hasG) ScrollTrigger.refresh(); });
  chipGroup($('[data-sector-filter]'), function (f) { $$('.lw-i').forEach(function (li) { li.classList.toggle('dim', !(f === 'all' || li.dataset.sector === f)); }); });
  $$('details.acc').forEach(function (dt) { dt.addEventListener('toggle', function () { if (hasG) setTimeout(function () { ScrollTrigger.refresh(); }, 650); }); });

  if (!motion) { $$('[data-count]').forEach(function () {}); return; }

  /* ================= GSAP motion ================= */
  var ease = 'expo.out';

  // --- text splitting (words -> lines) ---
  var SP = /[ \t\n\r]+/;
  function splitWords(el) {
    if (el._words) return el._words;
    var frag = d.createDocumentFragment(), words = [];
    var add = function (node) { var s = d.createElement('span'); s.className = 'w'; s.appendChild(node); frag.appendChild(s); words.push(s); };
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/([ \t\n\r]+)/).forEach(function (p) { if (!p) return; if (SP.test(p) && !p.replace(SP, '')) frag.appendChild(d.createTextNode(' ')); else add(d.createTextNode(p)); });
      } else if (n.nodeType === 1) {
        if (n.tagName === 'BR') { frag.appendChild(n); return; }
        var txt = n.textContent.trim();
        if (!n.children.length && SP.test(txt)) {
          txt.split(SP).forEach(function (wd, k, arr) { var c = n.cloneNode(false); c.textContent = wd; add(c); if (k < arr.length - 1) frag.appendChild(d.createTextNode(' ')); });
        } else add(n);
      }
    });
    el.innerHTML = ''; el.appendChild(frag); el._words = words; return words;
  }
  function splitLines(el) {
    el._orig = el.innerHTML;
    var words = splitWords(el), lines = [], top = null;
    words.forEach(function (w) { var t = w.offsetTop; if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; } lines[lines.length - 1].push(w); });
    el.innerHTML = '';
    var inners = lines.map(function (ws) {
      var ln = d.createElement('span'); ln.className = 'ln'; var inn = d.createElement('span');
      ws.forEach(function (w, k) { inn.appendChild(w); if (k < ws.length - 1) inn.appendChild(d.createTextNode(' ')); });
      ln.appendChild(inn); el.appendChild(ln); return inn;
    });
    el._words = null;
    return inners;
  }
  function revealSplit(el, delay) {
    var inners = splitLines(el);
    el.classList.add('is-split');
    gsap.fromTo(inners, { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.25, ease: ease, stagger: 0.085, delay: delay || 0, onComplete: function () { el.innerHTML = el._orig; } });
  }
  var fontsReady = (d.fonts && d.fonts.ready) ? Promise.race([d.fonts.ready, new Promise(function (r) { setTimeout(r, 1800); })]) : Promise.resolve();

  fontsReady.then(function () {
    var heroDelay = entering ? 0.55 : 0.15;
    $$('[data-split]').forEach(function (el) {
      if (el.dataset.split === 'hero') { revealSplit(el, heroDelay); return; }
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { revealSplit(el); } });
    });
    $$('[data-fade]').forEach(function (el, i) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, delay: el.closest('.hero,.phero,.cs-hero,.art-h') ? heroDelay + 0.35 + (i % 4) * 0.08 : 0, scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
    });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 92%', once: true, onEnter: function (b) { gsap.fromTo(b, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, stagger: 0.07, overwrite: true }); } });

    // focus text: words brighten as you read
    $$('[data-focus]').forEach(function (el) {
      var ws = splitWords(el);
      gsap.fromTo(ws, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true } });
    });
    setTimeout(function () { ScrollTrigger.refresh(); }, 60);
  });

  // image clip reveal
  $$('[data-img-reveal]').forEach(function (el) {
    var im = $('img', el);
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
      if (im) gsap.fromTo(im, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: ease, clearProps: 'transform' });
    } });
  });

  // counters
  $$('[data-count]').forEach(function (el) {
    var v = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    var plain = el.hasAttribute('data-plain');
    var fmt = function (x) { return pre + (dec ? x.toFixed(dec) : plain ? String(Math.round(x)) : Math.round(x).toLocaleString('en-US')) + suf; };
    el.textContent = fmt(0);
    var o = { x: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () { gsap.to(o, { x: v, duration: 2, ease: 'power3.out', onUpdate: function () { el.textContent = fmt(o.x); } }); } });
  });

  // marquee driven by scroll velocity
  $$('[data-marquee]').forEach(function (m) {
    var tr = $('.mq-track', m); tr.innerHTML += tr.innerHTML;
    $$('.lg', tr).slice(tr.children.length / 2).forEach(function (x) { x.setAttribute('aria-hidden', 'true'); });
    var dir = +m.dataset.marquee || 1, x = 0, vis = false, boost = 0;
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(m);
    gsap.ticker.add(function () {
      if (!vis) return;
      var w = tr.scrollWidth / 2; if (!w) return;
      var v = lenis ? lenis.velocity : 0; boost += (Math.abs(v) * 0.35 - boost) * 0.1;
      var sd = lenis && lenis.direction ? lenis.direction : 1;
      x -= (0.55 + boost) * dir * sd;
      x = gsap.utils.wrap(-w, 0, x);
      tr.style.transform = 'translate3d(' + x + 'px,0,0)';
    });
  });

  // magnetic elements
  if (FINE) $$('[data-magnetic]').forEach(function (el) {
    var s = parseFloat(el.dataset.strength || 0.3), inner = el.firstElementChild;
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); var x = (e.clientX - r.left - r.width / 2) * s, y = (e.clientY - r.top - r.height / 2) * s; gsap.to(el, { x: x, y: y, duration: 0.6, ease: 'power3.out' }); if (inner) gsap.to(inner, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' }); });
    el.addEventListener('pointerleave', function () { gsap.to(inner ? [el, inner] : el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1,0.35)' }); });
  });

  // cursor + hover image
  if (FINE) {
    H.classList.add('has-cursor');
    var cur = $('.cursor'), ct = $('.cursor-t', cur);
    var cx = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    var hi = d.createElement('div'); hi.className = 'hover-img'; hi.setAttribute('aria-hidden', 'true'); hi.innerHTML = '<img alt="">'; d.body.appendChild(hi);
    var hx = gsap.quickTo(hi, 'x', { duration: 0.7, ease: 'power3' }), hy = gsap.quickTo(hi, 'y', { duration: 0.7, ease: 'power3' });
    var hiImg = $('img', hi), hiOn = false;
    W.addEventListener('pointermove', function (e) {
      cx(e.clientX); cy(e.clientY);
      var r = hi.offsetWidth, h = hi.offsetHeight; hx(e.clientX - r / 2); hy(e.clientY - h / 2);
    }, { passive: true });
    d.addEventListener('pointerover', function (e) {
      var t = e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (t) { ct.textContent = t.dataset.cursor; cur.classList.add('is-label'); } else cur.classList.remove('is-label');
      var a = e.target.closest ? e.target.closest('[data-hover-list] a[data-img]') : null;
      var gridMode = a && a.closest('.wg') && !a.closest('.wg').classList.contains('is-list');
      if (a && !gridMode && innerWidth >= 900) { if (hiImg.getAttribute('src') !== a.dataset.img) hiImg.src = a.dataset.img; hi.classList.add('on'); hiOn = true; }
      else if (hiOn) { hi.classList.remove('on'); hiOn = false; }
    });
    d.addEventListener('pointerleave', function () { cur.classList.add('is-hidden'); });
    d.addEventListener('pointerenter', function () { cur.classList.remove('is-hidden'); });
  }

  // stacking cards
  var cards = $$('[data-stack] .stack-card');
  cards.forEach(function (c, i) {
    if (i === cards.length - 1) return;
    gsap.to(c, { scale: 0.94, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true } });
  });

  // expanding media frames (reel, case study)
  $$('[data-expand]').forEach(function (el) {
    var f = el.classList.contains('reel-frame') ? el : $('.reel-frame', el); if (!f) return;
    var im = $('.reel-media', f) || $('img', f);
    gsap.set(f, { width: '100%' });
    var ins = function () { return innerWidth >= 900 ? innerWidth * 0.16 + 'px' : Math.max(20, innerWidth * 0.042) + 'px'; };
    gsap.fromTo(f, { clipPath: function () { return 'inset(6% ' + ins() + ' 6% ' + ins() + ' round 8px)'; } }, { clipPath: 'inset(0% 0px 0% 0px round 0px)', ease: 'none', scrollTrigger: { trigger: f, start: 'top 90%', end: 'center 55%', scrub: true, invalidateOnRefresh: true } });
    if (im) gsap.fromTo(im, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // case study hero parallax
  $$('[data-hero-media]').forEach(function (m) {
    var im = $('img', m);
    gsap.fromTo(im, { scale: 1.18 }, { scale: 1.05, duration: 2.2, ease: ease });
    gsap.to(m, { yPercent: 22, ease: 'none', scrollTrigger: { trigger: m.parentNode, start: 'top top', end: 'bottom top', scrub: true } });
  });
  $$('[data-window]').forEach(function (w) {
    var inr = $('.cw-in', w), im = $('img', w);
    gsap.fromTo(inr, { clipPath: function () { return innerWidth >= 900 ? 'inset(14% 26% 14% 26% round 8px)' : 'inset(10% 10% 10% 10% round 8px)'; } }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: w, start: 'top 85%', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
    gsap.fromTo(im, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom bottom', scrub: true } });
  });

  // zoom-through chapter word
  $$('[data-zoom]').forEach(function (z) {
    var w = $('.cz-w', z);
    var tl = gsap.timeline({ scrollTrigger: { trigger: z, start: 'top top', end: '+=110%', pin: true, scrub: 0.6, anticipatePin: 1 } });
    gsap.fromTo(w, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: z, start: 'top 85%', end: 'top 20%', scrub: 0.6 } });
    tl.to(w, { scale: 1.08, duration: 0.3, ease: 'none' })
      .to(w, { scale: 16, opacity: 0, ease: 'power2.in', duration: 0.7 });
  });

  // chapters with sticky media (desktop)
  var mm = gsap.matchMedia();
  $$('[data-chapters]').forEach(function (sec) {
    var chs = $$('.cc-ch', sec), plates = $$('.cc-plate', sec), num = $('[data-cc-i]', sec);
    var set = function (k) { chs.forEach(function (c, j) { c.classList.toggle('on', j === k); }); plates.forEach(function (p, j) { p.classList.toggle('on', j <= k); }); if (num) num.textContent = '0' + (k + 1); };
    mm.add('(min-width: 900px)', function () {
      set(0);
      chs.forEach(function (c, k) { ScrollTrigger.create({ trigger: c, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) { if (s.isActive) set(k); } }); });
    });
  });

  // horizontal timeline
  $$('[data-hscroll]').forEach(function (sec) {
    var track = $('.tl-track', sec), steps = $$('.tl-step', sec), bar = $('[data-tl-progress]', sec);
    mm.add('(min-width: 900px)', function () {
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth); };
      gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: function (s) { if (bar) bar.style.transform = 'scaleX(' + s.progress + ')'; var k = s.progress * (steps.length - 1) + 0.35; steps.forEach(function (st, j) { st.classList.toggle('on', j <= k); }); } } });
    });
    mm.add('(max-width: 899px)', function () {
      steps.forEach(function (st) { ScrollTrigger.create({ trigger: st, start: 'top 75%', onEnter: function () { st.classList.add('on'); }, onLeaveBack: function () { st.classList.remove('on'); } }); gsap.fromTo(st, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 1, ease: ease, scrollTrigger: { trigger: st, start: 'top 88%', once: true } }); });
    });
  });

  // results: bars, ring, chart
  $$('[data-bar]').forEach(function (b) { var a = $('.obj-act', b); gsap.fromTo(a, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: ease, scrollTrigger: { trigger: b, start: 'top 90%', once: true } }); });
  $$('[data-ring]').forEach(function (r) { var c = $('.sr-fg', r), v = +r.dataset.ring; gsap.fromTo(c, { strokeDashoffset: 100 }, { strokeDashoffset: 100 - v, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 85%', once: true } }); });
  $$('[data-chart]').forEach(function (ch) {
    var line = $('.ch-line', ch), pts = $$('.ch-pt', ch), area = $('.ch-area', ch);
    var tl = gsap.timeline({ scrollTrigger: { trigger: ch, start: 'top 80%', end: 'bottom 60%', scrub: 0.6 } });
    tl.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      .fromTo(area, { opacity: 0 }, { opacity: 0.1, duration: 1 }, 0)
      .fromTo(pts, { opacity: 0 }, { opacity: 1, stagger: 1 / pts.length, duration: 0.05 }, 0);
  });

  // process rail
  $$('[data-process]').forEach(function (p) {
    var ol = $('.proc', p), line = $('.proc-line', p), fill = $('[data-proc-line]', p), steps = $$('.proc-s', p);
    var place = function () { if (line && ol) line.style.setProperty('--pl-top', (ol.offsetTop + 10) + 'px'); };
    place(); ScrollTrigger.addEventListener('refreshInit', place);
    ScrollTrigger.create({ trigger: ol, start: 'top 75%', end: 'bottom 45%', scrub: true, onUpdate: function (s) { if (fill) fill.style.transform = 'scaleX(' + s.progress + ')'; var k = s.progress * steps.length; steps.forEach(function (st, j) { st.classList.toggle('on', j < k + 0.15); }); } });
  });

  // about: parting headline + expanding image
  $$('[data-parting]').forEach(function (p) {
    var a = $('.pa-a', p), b = $('.pa-b', p), im = $('.pa-img', p), h = $('.pa-h', p);
    var tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    tl.to(a, { xPercent: -70, ease: 'none' }, 0).to(b, { xPercent: 70, ease: 'none' }, 0)
      .to(im, { width: '100vw', height: '100svh', borderRadius: 0, ease: 'power1.inOut' }, 0)
      .to(h, { opacity: 0, ease: 'power1.in' }, 0.35);
    gsap.from([a, b], { yPercent: 100, opacity: 0, duration: 1.3, ease: ease, stagger: 0.12, delay: entering ? 0.5 : 0.1 });
    gsap.from(im, { scale: 0.6, opacity: 0, duration: 1.4, ease: ease, delay: entering ? 0.6 : 0.2 });
  });

  // services: word roller
  $$('[data-roller]').forEach(function (r) {
    var inn = $('.roller-in', r), n = inn.children.length - 1, i = 0;
    setInterval(function () {
      i++; gsap.to(inn, { yPercent: -100 * i / (n + 1), duration: 0.9, ease: 'expo.inOut', onComplete: function () { if (i >= n) { i = 0; gsap.set(inn, { yPercent: 0 }); } } });
    }, 2000);
  });

  // footer wordmark rises
  $$('[data-wm]').forEach(function (wm) {
    gsap.fromTo($$('span', wm), { yPercent: 100 }, { yPercent: 0, ease: 'none', stagger: 0.06, scrollTrigger: { trigger: wm, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
  });

  W.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
