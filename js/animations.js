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

  /* ============ TEXT LINE REVEALS ============ */
  function initLineReveals() {
    document.querySelectorAll('[data-reveal="lines"]').forEach(function (group) {
      var lines = group.querySelectorAll('.reveal-line');
      ScrollTrigger.create({
        trigger: group,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          lines.forEach(function (line, i) {
            setTimeout(function () {
              line.classList.add('is-visible');
            }, i * 100);
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
      initLineReveals();
      initBodyReveals();
      initImageReveals();
      initServiceListReveal();
      initMagnetic();
      initPageTransitions();
      ScrollTrigger.refresh();
    });
  });
})();
