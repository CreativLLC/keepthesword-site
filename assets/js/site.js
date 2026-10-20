// Keep the Sword: the only script on the site. No trackers, no network calls.
(function () {
  // The letter: there is no backend yet, so say so instead of pretending to send.
  // TODO: when a mail provider is chosen, set the form's action and delete this handler.
  var form = document.querySelector('form[data-todo="signup"]');
  if (form) {
    var note = document.getElementById('form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!email.value || !email.checkValidity()) {
        note.textContent = 'That email does not look right. Try again?';
        email.focus();
        return;
      }
      note.textContent = 'Thanks. Sign-up is not open yet, so nothing was sent. Check back soon.';
    });
  }

  // Pause the hero motion while it is off screen (saves battery; CSS already skips it for reduced motion).
  var hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('paused', !entries[0].isIntersecting);
    }).observe(hero);
  }
})();
