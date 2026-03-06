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


  const dressToggle = document.getElementById('dressToggle');
  const dressPanel = document.getElementById('dressPanel');
  const dressClose = document.getElementById('dressClose');

  function setDressPanelState(isOpen) {
    if (!dressToggle || !dressPanel) return;
    dressToggle.setAttribute('aria-expanded', String(isOpen));
    dressPanel.setAttribute('aria-hidden', String(!isOpen));
    dressPanel.classList.toggle('is-open', isOpen);
  }

  if (dressToggle && dressPanel) {
    dressToggle.addEventListener('click', () => {
      const isOpen = dressPanel.classList.contains('is-open');
      setDressPanelState(!isOpen);
    });

    if (dressClose) {
      dressClose.addEventListener('click', () => setDressPanelState(false));
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setDressPanelState(false);
    });

    document.addEventListener('click', (event) => {
      if (!dressPanel.classList.contains('is-open')) return;
      const clickedInsidePanel = dressPanel.contains(event.target);
      const clickedToggle = dressToggle.contains(event.target);
      if (!clickedInsidePanel && !clickedToggle) {
        setDressPanelState(false);
      }
    });
  }

})();