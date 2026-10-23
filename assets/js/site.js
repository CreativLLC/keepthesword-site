// Keep the Sword: the only script on the site. No trackers, no network calls.
(function () {
  // Pause the hero motion while it is off screen (saves battery; CSS already skips it for reduced motion).
  var hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('paused', !entries[0].isIntersecting);
    }).observe(hero);
  }
})();
