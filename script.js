(function () {
  const cfg = window.INVITATION_CONFIG || {};
  const topBtn = document.getElementById('rsvpButtonTop');
  const bottomBtn = document.getElementById('rsvpButtonBottom');

  function getRsvpHref() {
    if (cfg.rsvpMode === 'url' && cfg.rsvpUrl) {
      return cfg.rsvpUrl;
    }

    const email = encodeURIComponent(cfg.email || '');
    const subject = encodeURIComponent(cfg.mailSubject || 'Réponse invitation');
    const body = encodeURIComponent(cfg.mailBody || 'Bonjour,');
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const href = getRsvpHref();
  [topBtn, bottomBtn].forEach((btn) => {
    if (!btn) return;
    btn.setAttribute('href', href);
    if (cfg.rsvpMode === 'url') {
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
