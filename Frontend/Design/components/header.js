class CustomHeader extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Raleway:wght@400;600;700&display=swap');
        :host { display: block; }
        .header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.92); backdrop-filter: blur(8px) saturate(1.1); border-bottom: 1px solid rgba(255,215,0,0.25); }
        .wrap { max-width: 1200px; margin: 0 auto; padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .logo { width: 56px; height: 56px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12)); }
        .title { font-family: 'Cinzel', serif; font-size: 1.5rem; color: var(--hemera-blue-dark); letter-spacing: 0.02em; }
        .accent { width: 8px; height: 8px; border-radius: 50%; background: var(--hemera-gold); box-shadow: 0 0 0 3px rgba(255,215,0,0.35); margin-left: 6px; }
        .nav { display: none; align-items: center; gap: 1rem; }
        .link { font-family: 'Raleway', sans-serif; font-size: 0.95rem; color: var(--hemera-blue-dark); text-decoration: none; padding: 0.35rem 0.5rem; border-radius: 0.4rem; transition: color 150ms ease, background 150ms ease; }
        .link:hover { color: var(--hemera-gold); background: rgba(15,61,122,0.06); }
        .actions { display: none; align-items: center; gap: 0.75rem; }
        .reserve { font-family: 'Raleway', sans-serif; font-weight: 700; background: var(--hemera-gold); color: var(--hemera-blue-dark); padding: 0.5rem 0.85rem; border-radius: 0.6rem; text-decoration: none; transition: filter 150ms ease; }
        .reserve:hover { filter: brightness(0.96) saturate(1.08); }
        .toggle { display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; color: var(--hemera-blue-dark); padding: 0.45rem; border-radius: 0.6rem; }
        .toggle:hover { background: rgba(15,61,122,0.08); }
        @media (min-width: 768px) { .nav { display: flex; } .actions { display: flex; } .toggle { display: none; } }
        .drawer { position: fixed; top: 64px; left: 0; right: 0; background: rgba(255,255,255,0.98); border-top: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 28px rgba(0,0,0,0.08); transform: translateY(-8px); opacity: 0; pointer-events: none; transition: transform 200ms ease, opacity 200ms ease; }
        .drawer.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .item { display: block; padding: 1rem; color: var(--hemera-blue-dark); text-decoration: none; border-bottom: 1px solid rgba(15,61,122,0.06); }
        .item:hover { background: rgba(15,61,122,0.06); color: var(--hemera-gold); }
      </style>
      <header class="header">
        <div class="wrap">
          <a href="/" class="brand" aria-label="Hemera - Início">
            <img src="/img/Capturar.png" alt="Logo Hemera" class="logo" />
            <span class="title">Hemera</span><span class="accent" aria-hidden="true"></span>
          </a>
          <nav class="nav" aria-label="Menu principal">
            <a href="#" class="link">Hotel</a>
            <a href="#rooms" class="link">Acomodações</a>
            <a href="#amenities" class="link">Gastronomia</a>
            <a href="#amenities" class="link">Wellness & Spa</a>
            <a href="#" class="link">Eventos</a>
            <a href="#" class="link">Experiências</a>
            <a href="#contact" class="link">Contato</a>
          </nav>
          <div class="actions">
            <a href="#rooms" class="reserve">Reservar</a>
          </div>
          <button id="hdr-toggle" class="toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="hdr-drawer"><i data-feather="menu"></i></button>
        </div>
        <nav id="hdr-drawer" class="drawer" aria-label="Menu móvel">
          <a href="#" class="item">Hotel</a>
          <a href="#rooms" class="item">Acomodações</a>
          <a href="#amenities" class="item">Gastronomia</a>
          <a href="#amenities" class="item">Wellness & Spa</a>
          <a href="#" class="item">Eventos</a>
          <a href="#" class="item">Experiências</a>
          <a href="#contact" class="item">Contato</a>
          <a href="#rooms" class="item">Reservar</a>
        </nav>
      </header>
    `;
    const toggle = shadow.getElementById('hdr-toggle');
    const drawer = shadow.getElementById('hdr-drawer');
    toggle?.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? '<i data-feather="x"></i>' : '<i data-feather="menu"></i>';
      if (window.feather) feather.replace();
    });
  }
}

customElements.define('custom-header', CustomHeader);
