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
      service: 'Foley',
      credit: '',
      festival: '',
      description: 'Full foley for this intense, highly detailed medieval feature film — a sprawling quest across many characters.'
    },
    'freud': {
      title: 'Freud And His Wolf-Man',
      service: 'Full Audio Post · 5.1 Mix',
      credit: '',
      festival: '',
      description: 'Complete audio post for this feature film — sound design, foley, dialogue edit, and a full 5.1 mix.'
    },
    'elene-dariani': {
      title: 'Elene Dariani',
      service: 'Sound Design & Foley',
      credit: 'Fantasmagoria',
      festival: 'Annecy Animation Film Festival · Sarajevo Film Festival',
      description: 'Sound design and foley built for this stop-motion puppet animation\'s fully imagined world.'
    },
    'what-made-you-tired': {
      title: 'What Made You Tired?',
      service: 'Full Audio Post · 5.1 Mix',
      credit: 'Fantasmagoria',
      festival: '',
      description: 'Complete audio post — sound design, foley, and a 5.1 mix — for this stop-motion puppet animation.'
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
    },
    'bog-christmas-2': {
      title: 'Bank of Georgia — Christmas',
      service: 'Sound Design',
      credit: '',
      festival: '',
      description: 'ემიგრანტი დედის და საქართველოში დარჩენილი შვილის ამბავი, რომელიც ათასობით ოჯახს აერთიანებს.',
      link: 'https://www.facebook.com/reel/1077793354460200'
    },
    'music-credit-1-setanta': {
      title: 'Setanta Sports — Let\'s Make Georgia Proud',
      service: 'Music Writing & Production',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.youtube.com/watch?v=YdDh6SiQ_p4'
    },
    'tegeta-womandrives': {
      title: 'Tegeta — Woman Drives',
      service: 'Sound Design',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/3862287667409905'
    },
    'music-credit-2-bog-gviriloba': {
      title: 'Bank of Georgia — Gviriloba',
      service: 'Sound Design & Music',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/926747813522065'
    },
    'tbc-game': {
      title: 'TBC — Four Families And A Treasure',
      service: 'Sound Design',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/1701808861135903'
    },
    'sukh-2': {
      title: 'Bank of Georgia & Sukhishvilebi — A Story That Never Stops',
      service: 'Sound Design',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/2435686136917186'
    },
    'music-credit-4-chivas': {
      title: 'Chivas Regal — Brotherhood and the Path to Success',
      service: 'Sound Design & Music',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/2135161643885308'
    },
    'music-credit-3-wynfl-2': {
      title: 'WYNFLAIR — 8 out of 8 Georgians would think the same',
      service: 'Music Composing & Sound Design',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.facebook.com/reel/1610726923277406'
    },
    'rkena': {
      title: 'RKENA MMA — Event 03',
      service: 'Sound Design',
      credit: '',
      festival: '',
      description: '',
      link: 'https://www.instagram.com/reel/DXel0okjJRr/'
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
    var watchEl = document.getElementById('modal-watch');
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
      if (watchEl) {
        if (data.link) {
          watchEl.href = data.link;
          watchEl.hidden = false;
        } else {
          watchEl.hidden = true;
        }
      }
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
