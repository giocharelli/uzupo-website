(function () {
  'use strict';

  function whenGsapReady(cb) {
    if (window.gsap && window.ScrollTrigger) {
      cb();
    } else {
      setTimeout(function () { whenGsapReady(cb); }, 50);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.work-poster-grid .work-card');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          if (window.gsap) {
            gsap.to(card, {
              opacity: match ? 1 : 0,
              duration: 0.3,
              onComplete: function () {
                card.classList.toggle('is-hidden', !match);
              }
            });
          } else {
            card.classList.toggle('is-hidden', !match);
          }
        });

        if (window.ScrollTrigger) {
          setTimeout(function () { ScrollTrigger.refresh(); }, 350);
        }
      });
    });

    /* ============ POSTER GRID SCROLL REVEAL ============ */
    whenGsapReady(function () {
      if (!cards.length) return;
      gsap.set(cards, { y: 30, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08
          });
        }
      });
    });
  });
})();
