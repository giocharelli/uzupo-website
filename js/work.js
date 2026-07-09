(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.work-grid .project-split');

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
  });
})();
