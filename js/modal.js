(function () {
  'use strict';

  var PROJECTS = {
    'touching-the-sky': {
      title: 'Touching the Sky',
      service: 'Foley',
      credit: 'Directed by Jonathan Griffith',
      festival: '',
      description: 'Foley performed and recorded for every scene, frame-accurate against picture.'
    },
    'blackbird': {
      title: 'Blackbird Was Chirping',
      service: 'Full Audio Post · 5.1 Mix',
      credit: 'Directed by Giorgi Chumburidze',
      festival: '',
      description: 'Complete audio post-production, mixed and delivered in 5.1.'
    },
    'air-blue-silk': {
      title: 'Air Blue Silk',
      service: 'Foley',
      credit: 'Directed by Irine Jordania',
      festival: 'Tallinn Black Nights Film Festival 2024',
      description: 'Foley built entirely from scratch for this festival-selected feature.'
    },
    'field': {
      title: 'Field',
      service: 'Foley',
      credit: 'Directed by Lasha Tskvitinidze',
      festival: '',
      description: 'Every footstep and prop performed specifically for this story.'
    },
    'the-gamers': {
      title: 'The Gamers: Dornkess Falls',
      service: 'Full Foley',
      credit: '',
      festival: '',
      description: 'Full foley library built for an interactive game project.'
    },
    'freud': {
      title: 'Freud And His Wolf-Man',
      service: '',
      credit: '',
      festival: '',
      description: 'Project details coming soon.'
    },
    'elene-dariani': {
      title: 'Elene Dariani',
      service: 'Sound Design & Foley',
      credit: 'Fantasmagoria',
      festival: 'Annecy Animation Film Festival · Sarajevo Film Festival',
      description: 'Sound design and foley built for a fully imagined animated world.'
    },
    'what-made-you-tired': {
      title: 'What Made You Tired?',
      service: 'Full Audio Post · 5.1 Mix',
      credit: 'Fantasmagoria',
      festival: '',
      description: 'Complete audio post, mixed in 5.1 for animation.'
    },
    'oh-mother-mother': {
      title: 'Oh, Mother Mother',
      service: 'Full Audio Post',
      credit: 'Directed by Khatuna Tatuashvili',
      festival: '',
      description: 'Full audio post-production for this animated short.'
    },
    'inhale': {
      title: 'Inhale',
      service: 'Sound Design & Foley',
      credit: 'Directed by Melana Sokhadze',
      festival: '',
      description: 'Sound design and foley built specifically for this short film.'
    },
    'horse-fly': {
      title: 'Horse Fly',
      service: 'Foley',
      credit: 'Directed by Alex Park',
      festival: 'Seattle Short Film Festival',
      description: 'Foley performed and recorded for this festival short.'
    },
    'silent-blues': {
      title: 'Silent Blues',
      service: 'Full Audio Post · 5.1 Mix',
      credit: 'Directed by Elene Dundua',
      festival: '',
      description: 'Complete audio post, mixed in 5.1 for this short film.'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('project-modal');
    if (!modal) return;

    var posterImg = document.getElementById('modal-poster');
    var titleEl = document.getElementById('modal-title');
    var serviceEl = document.getElementById('modal-service');
    var creditEl = document.getElementById('modal-credit');
    var festivalEl = document.getElementById('modal-festival');
    var descEl = document.getElementById('modal-description');
    var lastFocused = null;

    function open(slug, posterSrc) {
      var data = PROJECTS[slug];
      if (!data) return;
      lastFocused = document.activeElement;
      posterImg.src = posterSrc;
      posterImg.alt = data.title;
      titleEl.textContent = data.title;
      serviceEl.textContent = data.service || '';
      creditEl.textContent = data.credit || '';
      festivalEl.textContent = data.festival || '';
      descEl.textContent = data.description || '';
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      /* So the back button/gesture closes the modal instead of leaving
         the page — consistent with the mobile menu's back behavior. */
      history.pushState({ uzupoModalOpen: true }, '', window.location.href);
    }

    function close(fromPopstate) {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () { modal.hidden = true; }, 350);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      if (!fromPopstate && history.state && history.state.uzupoModalOpen) {
        history.back();
      }
    }

    document.querySelectorAll('.work-card[data-project]').forEach(function (card) {
      card.addEventListener('click', function () {
        var slug = card.getAttribute('data-project');
        var img = card.querySelector('.work-card__image img');
        open(slug, img ? img.src : '');
      });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', function () { close(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close(false);
    });

    window.addEventListener('popstate', function () {
      if (modal.classList.contains('is-open')) close(true);
    });
  });
})();
