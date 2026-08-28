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
    var logo = nav.querySelector('.nav__logo img');
    var wasScrolled = null;
    function update() {
      var isScrolled = window.scrollY > 80;
      if (isScrolled === wasScrolled) return;
      wasScrolled = isScrolled;
      nav.classList.toggle('is-scrolled', isScrolled);
      /* The nav is transparent until scrolled, so it sits directly over
         whatever the page's first section is — a dark photo, solid
         black, or now sometimes solid amber. An amber-colored logo
         mark can lose all its internal detail once it's on top of an
         amber background, so it swaps to the white logo asset until
         the nav gets its own dark backing to sit on. */
      if (logo) {
        logo.src = isScrolled
          ? '/assets/logos/uzupologoamber.png'
          : '/assets/logos/uzupologowhite.png';
      }
    }
    window.addEventListener('scroll', update);
    update();
  }

  /* ============ MOBILE NAV ============ */
  function initMobileNav() {
    var burger = document.querySelector('.nav__burger');
    var overlay = document.querySelector('.nav__overlay');
    var closeBtn = document.querySelector('.nav__overlay-close');
    if (!burger || !overlay) return;

    function openMenu() {
      burger.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      /* Push a history entry so the native back gesture/button closes
         the menu instead of leaving the page. */
      history.pushState({ uzupoMenuOpen: true }, '', window.location.href);
    }

    function closeMenu(fromPopstate) {
      if (!burger.classList.contains('is-open')) return;
      burger.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (!fromPopstate && history.state && history.state.uzupoMenuOpen) {
        history.back();
      }
    }

    burger.addEventListener('click', function () {
      if (burger.classList.contains('is-open')) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { closeMenu(false); });
    }
    overlay.querySelectorAll('.nav__overlay-link').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });
    window.addEventListener('popstate', function () {
      if (burger.classList.contains('is-open')) closeMenu(true);
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
      var captionGroup = slider.querySelector('.ig-slider__caption-group');
      var captionTitleEl = captionGroup ? captionGroup.querySelector('.ig-slider__caption-title') : null;
      var captionSubEl = captionGroup ? captionGroup.querySelector('.ig-slider__caption-subtitle') : null;
      var total = slides.length;
      var current = 0;
      var duration = parseInt(slider.getAttribute('data-ig-duration'), 10) || 4000;
      var timer = null;
      var isHeld = false;

      function slideDuration() {
        var override = slides[current] && slides[current].getAttribute('data-duration');
        return override ? parseInt(override, 10) : duration;
      }

      function render(immediate) {
        slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
        slider.style.setProperty('--ig-duration', slideDuration() + 'ms');
        dashes.forEach(function (d, i) {
          d.classList.toggle('is-done', i < current);
          d.classList.toggle('is-active', i === current);
        });
        var raw = slides[current].getAttribute('data-caption') || '';
        if (caption) {
          if (immediate) {
            caption.textContent = raw;
          } else {
            caption.classList.add('is-fading');
            setTimeout(function () {
              caption.textContent = raw;
              caption.classList.remove('is-fading');
            }, 250);
          }
        }
        if (captionGroup) {
          var titleRaw = slides[current].getAttribute('data-caption-title') || '';
          var subRaw = slides[current].getAttribute('data-caption-sub') || '';
          if (immediate) {
            if (captionTitleEl) captionTitleEl.textContent = titleRaw;
            if (captionSubEl) captionSubEl.textContent = subRaw;
          } else {
            captionGroup.classList.add('is-fading');
            setTimeout(function () {
              if (captionTitleEl) captionTitleEl.textContent = titleRaw;
              if (captionSubEl) captionSubEl.textContent = subRaw;
              captionGroup.classList.remove('is-fading');
            }, 250);
          }
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
        if (isHeld) return;
        timer = setTimeout(next, slideDuration());
      }

      /* ============ HOLD TO PAUSE ============ */
      function pause() {
        if (isHeld) return;
        isHeld = true;
        clearTimeout(timer);
        slider.classList.add('is-held');
      }
      function resume() {
        if (!isHeld) return;
        isHeld = false;
        slider.classList.remove('is-held');
        restart();
      }

      /* ============ SWIPE / DRAG / HOLD-TO-PAUSE ============ */
      var dragStartX = 0;
      var dragStartY = 0;
      var dragging = false;
      var dragMoved = false;
      var holdTimer = null;
      slider.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        /* Pointer capture below redirects the click that follows onto
           the slider itself, not whatever was under the cursor — if
           that's the prev/next zone, its own click listener would never
           fire. Skip the drag/capture handling entirely for those, so a
           real mouse click on them reaches their listener normally. */
        if (e.target.closest('[data-ig-prev], [data-ig-next]')) return;
        dragging = true;
        dragMoved = false;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        if (e.pointerType !== 'touch') {
          pause();
        } else {
          /* Don't pause instantly on touch — a plain page-scroll touch
             that happens to start over the slider would pause it right
             away. Instead wait briefly: if the finger is still roughly
             in place once this fires, it's a deliberate press-and-hold,
             so pause. Real movement (scroll or swipe) cancels this in
             pointermove below — horizontal movement pauses immediately
             there instead, vertical movement just lets the page scroll. */
          clearTimeout(holdTimer);
          holdTimer = setTimeout(function () {
            if (dragging && !dragMoved) pause();
          }, 150);
        }
        if (slider.setPointerCapture) {
          try { slider.setPointerCapture(e.pointerId); } catch (err) {}
        }
      });
      slider.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - dragStartX;
        var dy = e.clientY - dragStartY;
        if (!dragMoved && Math.abs(dx) > 10) {
          clearTimeout(holdTimer);
          dragMoved = true;
          if (e.pointerType === 'touch') pause();
        } else if (Math.abs(dy) > 10) {
          clearTimeout(holdTimer);
        }
      });
      function endDrag(e) {
        clearTimeout(holdTimer);
        if (!dragging) return;
        dragging = false;
        var deltaX = e.clientX - dragStartX;
        if (Math.abs(deltaX) > 50) {
          /* next()/prev() call restart() internally, which bails out
             and never rearms the timer while isHeld is still true from
             this drag — clear it first or a completed swipe silently
             stops the slider from auto-advancing afterward. */
          isHeld = false;
          slider.classList.remove('is-held');
          if (deltaX < 0) { next(); } else { prev(); }
        } else {
          resume();
        }
      }
      slider.addEventListener('pointerup', endDrag);
      slider.addEventListener('pointercancel', function () { clearTimeout(holdTimer); dragging = false; resume(); });
      slider.addEventListener('mouseleave', function () { if (!dragging) resume(); });
      /* A swipe that resolves into next()/prev() already calls restart(),
         which re-arms the timer — only fall back to resume() when the
         drag didn't cross the threshold. Suppress the click a completed
         swipe would otherwise fire on the prev/next zone underneath it. */
      slider.addEventListener('click', function (e) {
        if (dragMoved) {
          e.stopPropagation();
          e.preventDefault();
          dragMoved = false;
        }
      }, true);

      /* These zones are full-height, edge-to-edge click targets with no
         visible icon. Left focused after a mouse click, Chromium can
         retroactively reveal the focus-visible outline on an unrelated
         later keypress (e.g. the left arrow) — reads as a stray amber
         line flashing over the photo. Move focus to the slider itself
         instead of just blurring: keeps arrow-key navigation working
         right after a mouse click, and :focus-visible doesn't trigger
         from a pointer-driven focus() call, so no stray outline either. */
      if (prevBtn) prevBtn.addEventListener('click', function () { prev(); slider.focus({ preventScroll: true }); });
      if (nextBtn) nextBtn.addEventListener('click', function () { next(); slider.focus({ preventScroll: true }); });

      /* ============ KEYBOARD NAVIGATION ============ */
      if (!slider.hasAttribute('tabindex')) slider.setAttribute('tabindex', '0');
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      });
      /* Focusing only on click means arrows do nothing until a button
         has been pressed at least once — hovering in is enough to start
         using the keyboard, matching how a mouse click already works. */
      if (!isTouch) {
        slider.addEventListener('mouseenter', function () { slider.focus({ preventScroll: true }); });
      }

      /* Caption text renders immediately and unconditionally — only the
         auto-advance timer waits for the slider to actually be visible.
         Gating the caption itself behind IntersectionObserver left it
         blank (the photo already shows, from the static HTML's
         is-active class) until the user scrolled far enough to trigger
         it, reading as the text "appearing while scrolling". */
      render(true);

      /* Wait until the slider actually scrolls close to view before the
         timer starts, on every device — a slider sitting off-screen
         below the fold shouldn't auto-advance through slides nobody's
         looking at. Plain scroll-position polling instead of
         IntersectionObserver: this needs to be simple to reason about
         and hold up everywhere, and a scroll listener plus
         getBoundingClientRect is about as basic as browser APIs get. */
      function checkVisibility() {
        var rect = slider.getBoundingClientRect();
        if (rect.top < window.innerHeight + 400 && rect.bottom > -400) {
          restart();
          window.removeEventListener('scroll', checkVisibility);
          window.removeEventListener('resize', checkVisibility);
        }
      }
      window.addEventListener('scroll', checkVisibility, { passive: true });
      window.addEventListener('resize', checkVisibility);
      checkVisibility();
    });
  }

  /* ============ SEAMLESS LOOP VIDEO ============ */
  /* Native `loop` restarts at the file's exact first frame, which shows a
     visible black flash on sources with a black head frame or a keyframe
     that isn't at time 0. Restarting a fraction of a second early — and a
     fraction past 0 — skips over both problems. */
  function initSeamlessLoopVideos() {
    document.querySelectorAll('video[data-seamless-loop]').forEach(function (video) {
      function tick() {
        if (!video.paused && video.duration && video.currentTime > video.duration - 0.12) {
          video.currentTime = 0.08;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      video.addEventListener('ended', function () {
        video.currentTime = 0.08;
        video.play();
      });
    });
  }

  /* ============ FONTS READY ============ */
  /* Flags when webfonts have actually swapped in, so width-sensitive
     animations (the brand marquee) don't lock in against fallback-font
     metrics and drift out of sync once Barlow Condensed loads. */
  function initFontsReady() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        document.documentElement.classList.add('fonts-ready');
      });
    } else {
      document.documentElement.classList.add('fonts-ready');
    }
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
    initSeamlessLoopVideos();
    initFontsReady();
  });
})();
