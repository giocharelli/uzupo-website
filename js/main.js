(function () {
  'use strict';

  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ============ GRAIN OVERLAY ============ */
  function injectGrain() {
    var grain = document.createElement('div');
    grain.className = 'grain-overlay';
    document.body.appendChild(grain);
  }

  /* ============ LOADING SCREEN ============ */
  function runLoader() {
    var loader = document.querySelector('.loader');
    if (!loader) return;
    var mark = loader.querySelector('.loader__mark');
    var underline = loader.querySelector('.loader__underline');

    document.body.classList.add('is-loading');

    if (window.gsap) {
      var tl = gsap.timeline({
        onComplete: function () {
          document.body.classList.remove('is-loading');
        }
      });
      tl.to(mark, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 })
        .to(underline, { scaleX: 1, duration: 0.3, ease: 'power1.out' }, 0.8)
        .to(loader, { opacity: 0, duration: 0.3, ease: 'power1.out' }, 1.1)
        .set(loader, { display: 'none' }, 1.4);
    } else {
      setTimeout(function () {
        loader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        setTimeout(function () { loader.style.display = 'none'; }, 300);
      }, 300);
    }
  }

  /* ============ CUSTOM CURSOR ============ */
  function initCursor() {
    if (isTouch) return;
    document.documentElement.classList.add('has-custom-cursor');

    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;
    var lerp = 0.12;
    var active = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) {
        active = true;
        dot.classList.add('is-active');
        ring.classList.add('is-active');
        ringX = mouseX;
        ringY = mouseY;
      }
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function raf() {
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    var hoverTargets = 'a, button, .magnetic, input, textarea, select, [data-cursor-hover]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) {
        ring.classList.add('is-hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) {
        ring.classList.remove('is-hovering');
      }
    });
  }

  /* ============ LENIS SMOOTH SCROLL ============ */
  var lenis;
  function initLenis() {
    if (isTouch || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
    });

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop: function (value) {
          return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
        },
        getBoundingClientRect: function () {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
      });
      lenis.on('scroll', ScrollTrigger.update);
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.uzupoLenis = lenis;
  }

  /* ============ NAV SCROLL BEHAVIOR ============ */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function update() {
      if (window.scrollY > 80) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', update);
    update();
  }

  /* ============ MOBILE NAV ============ */
  function initMobileNav() {
    var burger = document.querySelector('.nav__burger');
    var overlay = document.querySelector('.nav__overlay');
    if (!burger || !overlay) return;
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      overlay.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    overlay.querySelectorAll('.nav__overlay-link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============ ACTIVE NAV LINK ============ */
  function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__overlay-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var hrefFile = href.split('/').pop();
      if (hrefFile === path) {
        link.classList.add('is-active');
      }
    });
  }

  /* ============ AUTO-ADVANCING SLIDER ============ */
  function initAutoSliders() {
    document.querySelectorAll('[data-ig-slider]').forEach(function (slider) {
      var slides = slider.querySelectorAll('.ig-slider__slide');
      var dashes = slider.querySelectorAll('.ig-slider__dash');
      var prevBtn = slider.querySelector('[data-ig-prev]');
      var nextBtn = slider.querySelector('[data-ig-next]');
      var caption = slider.querySelector('.ig-slider__caption');
      var total = slides.length;
      var current = 0;
      var duration = parseInt(slider.getAttribute('data-ig-duration'), 10) || 4000;
      var timer = null;

      slider.style.setProperty('--ig-duration', duration + 'ms');

      function render() {
        slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
        dashes.forEach(function (d, i) {
          d.classList.toggle('is-done', i < current);
          d.classList.toggle('is-active', i === current);
        });
        var raw = slides[current].getAttribute('data-caption') || '';
        if (caption) {
          caption.classList.add('is-fading');
          setTimeout(function () {
            caption.textContent = raw;
            caption.classList.remove('is-fading');
          }, 250);
        }
      }

      function goTo(index) {
        current = (index + total) % total;
        render();
        restart();
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }

      function restart() {
        clearTimeout(timer);
        timer = setTimeout(next, duration);
      }

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      function start() {
        render();
        restart();
      }

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              start();
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });
        observer.observe(slider);
      } else {
        start();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectGrain();
    runLoader();
    initCursor();
    initLenis();
    initNavScroll();
    initMobileNav();
    markActiveNav();
    initAutoSliders();
  });
})();
