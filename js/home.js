(function () {
  'use strict';

  function whenGsapReady(cb) {
    if (window.gsap && window.ScrollTrigger) {
      cb();
    } else {
      setTimeout(function () { whenGsapReady(cb); }, 50);
    }
  }

  var isMobile = window.matchMedia('(max-width: 700px)').matches;

  /* ============ RECENT WORK HORIZONTAL SCROLL ============ */
  function initRecentWork() {
    var pinEl = document.querySelector('.recent-work__pin');
    var track = document.querySelector('.recent-work__track');
    var counter = document.querySelector('.recent-work__counter');
    if (!pinEl || !track || isMobile) return;

    var cards = track.querySelectorAll('.work-card');
    var total = cards.length;

    function getScrollDistance() {
      return track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(document.documentElement).fontSize) * 0;
    }

    var scrollTween = gsap.to(track, {
      x: function () { return -(track.scrollWidth - pinEl.offsetWidth); },
      ease: 'none',
      scrollTrigger: {
        trigger: pinEl,
        start: 'top top',
        end: function () { return '+=' + (track.scrollWidth - pinEl.offsetWidth); },
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (counter) {
            var idx = Math.min(total, Math.max(1, Math.round(self.progress * (total - 1)) + 1));
            counter.textContent = String(idx).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
          }
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    whenGsapReady(function () {
      gsap.registerPlugin(ScrollTrigger);
      initRecentWork();
    });
  });
})();
