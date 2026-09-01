(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Opening sequence
     The inline script in <head> already decided whether to run this: it
     added html.show-intro before first paint if (no JS-blocked state) AND
     (not seen this session) AND (no prefers-reduced-motion). If that class
     isn't present, there is nothing to do here — the homepage is already
     what's showing.
     ------------------------------------------------------------------- */
  var root = document.documentElement;

  if (root.classList.contains('show-intro')) {
    var HOLD_MS = 1400;      // how long the statement sits before it leaves
    var EXIT_MS = 1350;      // must match the CSS: .35s delay + 1s fade

    var holdTimer = null;
    var doneTimer = null;
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
      root.classList.add('intro-exit', 'intro-done');
      try { sessionStorage.setItem('sasIntroSeen', '1'); } catch (e) { /* ignore */ }
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', skipOnKey);
    }

    function beginExit() {
      root.classList.add('intro-exit');
      doneTimer = setTimeout(finish, EXIT_MS);
    }

    function skip() { finish(); }
    function skipOnKey(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    }

    // Let the reader interrupt at any point — the sequence must never trap input.
    window.addEventListener('click', skip);
    window.addEventListener('keydown', skipOnKey);

    holdTimer = setTimeout(beginExit, HOLD_MS);
  }

  /* ---------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobilenav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? 'Close' : 'Menu';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
      });
    });
  }
})();
