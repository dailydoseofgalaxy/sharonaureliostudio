(function () {
  'use strict';

  /* Language switcher (globe). A disclosure button plus a list of plain links:
     English and Spanish are separate pages, so each item simply navigates. */
  var wrap = document.getElementById('lang');
  var toggle = document.getElementById('langToggle');
  var menu = document.getElementById('langMenu');
  if (!wrap || !toggle || !menu) return;

  function open() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close(returnFocus) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (menu.hidden) open(); else close(false);
  });

  document.addEventListener('click', function (e) {
    if (!menu.hidden && !wrap.contains(e.target)) close(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) close(true);
  });

  wrap.addEventListener('focusout', function (e) {
    if (!menu.hidden && e.relatedTarget && !wrap.contains(e.relatedTarget)) close(false);
  });

  // Section ids are identical in both languages, so carry the current one across.
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      var base = a.getAttribute('href').split('#')[0];
      a.setAttribute('href', base + (location.hash || ''));
    });
  });
})();
