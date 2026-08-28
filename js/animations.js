(function () {
  'use strict';

  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  function whenGsapReady(cb) {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      cb();
    } else {
      setTimeout(function () { whenGsapReady(cb); }, 50);
    }
  }

  /* ============ TEXT LINE REVEALS — IMMEDIATE (ABOVE THE FOLD) ============ */
  /* The first heading on a page is already on screen at load — making a
     visitor scroll before they can even read it feels broken rather than
     stylish. This variant just slides the lines in on load, no scroll tie. */
  function initImmediateLineReveals() {
    document.querySelectorAll('[data-reveal="lines-immediate"]').forEach(function (group) {
      var inners = Array.from(group.querySelectorAll('.reveal-line .inner'));
      if (!inners.length) return;
      gsap.set(inners, { yPercent: 110 });
      gsap.to(inners, {
        yPercent: 0,
        ease: 'power3.out',
        duration: 0.9,
        stagger: 0.1,
        delay: 0.2
      });
    });
  }

  /* ============ TEXT LINE REVEALS — SCROLL-SCRUBBED ============ */
  /* Tied directly to scroll position (scrub) rather than a one-shot
     trigger that fires once and finishes on its own timer — each line
     physically uncovers itself as the heading passes through the
     scrub window, so the reveal is driven by scroll movement itself. */
  function initLineReveals() {
    document.querySelectorAll('[data-reveal="lines"]').forEach(function (group) {
      var inners = Array.from(group.querySelectorAll('.reveal-line .inner'));
      if (!inners.length) return;
      gsap.set(inners, { yPercent: 110 });
      /* Driven by hand via onUpdate rather than gsap's built-in `stagger`
         option: staggering a yPercent tween under scrub left a residual
         pixel offset baked into some lines' transforms even once GSAP
         reported the tween fully complete (yPercent back at 0 but a
         leftover `y` in px still applied) — reproducible by forcing the
         scroll position and GSAP's ticker well past the trigger's end
         and checking gsap.getProperty(el, 'y') against getComputedStyle.
         Setting yPercent directly from a hand-rolled per-line progress
         value avoids that interaction entirely. */
      var staggerStep = inners.length > 1 ? 0.6 / inners.length : 0;
      ScrollTrigger.create({
        trigger: group,
        start: 'top 100%',
        end: 'top 20%',
        onUpdate: function (self) {
          inners.forEach(function (inner, i) {
            var span = 1 - staggerStep * (inners.length - 1);
            var local = (self.progress - staggerStep * i) / span;
            local = Math.max(0, Math.min(1, local));
            gsap.set(inner, { yPercent: 110 * (1 - local) });
          });
        }
      });
    });
  }

  /* ============ BODY TEXT REVEALS ============ */
  function initBodyReveals() {
    document.querySelectorAll('.reveal-body').forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () { el.classList.add('is-visible'); }
      });
    });
  }

  /* ============ IMAGE CLIP-PATH REVEALS ============ */
  function initImageReveals() {
    document.querySelectorAll('.img-reveal').forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: true,
        onEnter: function () { el.classList.add('is-visible'); }
      });
    });
  }

  /* ============ SERVICE LIST ENTRANCE ============ */
  function initServiceListReveal() {
    document.querySelectorAll('.service-list').forEach(function (list) {
      var items = list.querySelectorAll('.service-list__item');
      gsap.set(items, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: list,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08
          });
        }
      });
    });
  }

  /* ============ PARALLAX ON FULL-BLEED PHOTOS ============ */
  /* The background photo travels a fraction of the section's own
     scroll distance — roughly 40% — so it visibly lags behind the
     rest of the page instead of moving 1:1 with the scroll. */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.full-bleed').forEach(function (section) {
      var bg = section.querySelector('.full-bleed__bg:not(.full-bleed__bg--video)');
      if (!bg) return;
      gsap.fromTo(bg,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }

  /* ============ MAGNETIC BUTTONS ============ */
  function initMagnetic() {
    if (isTouch) return;
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var content = el.querySelector('.magnetic__content') || el;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var moveX = Math.max(Math.min(x * 0.35, 12), -12);
        var moveY = Math.max(Math.min(y * 0.35, 12), -12);
        gsap.to(content, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(content, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ============ PAGE TRANSITIONS ============ */
  function initPageTransitions() {
    document.body.style.opacity = '0';
    gsap.to(document.body, { opacity: 1, duration: 0.4, ease: 'power1.out', delay: 0.1 });

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 ||
          href.indexOf('http') === 0 || link.target === '_blank') return;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        gsap.to(document.body, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
          onComplete: function () { window.location.href = href; }
        });
      });
    });

    /* A page we navigated AWAY from can get frozen mid fade-out
       (opacity 0) in the browser's back/forward cache. Restoring it via
       the back/forward buttons doesn't re-fire DOMContentLoaded, so
       that faded-out state was never reset — the page looked blank.
       `pageshow` fires on every load, including bfcache restores;
       `event.persisted` is true only for the latter. */
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        gsap.killTweensOf(document.body);
        gsap.set(document.body, { opacity: 1 });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    whenGsapReady(function () {
      initImmediateLineReveals();
      initLineReveals();
      initBodyReveals();
      initImageReveals();
      initServiceListReveal();
      initParallax();
      initMagnetic();
      initPageTransitions();
      ScrollTrigger.refresh();

      /* Web fonts swapping in and images finishing their network load
         both change section heights after this first refresh — without
         a follow-up refresh, every trigger's start/end stays pinned to
         the pre-layout-shift measurements and can fire early or late. */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
      }
      window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    });
  });
})();
