class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap');
                :host { --footer-text: var(--hemera-blue-dark); --footer-accent: var(--hemera-gold); --footer-soft: rgba(15,61,122,0.08); }
                .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
                .footer-root { background: #fff; color: var(--footer-text); border-top: 1px solid var(--footer-soft); }
                .row { padding: 1rem 0; }
                .top-nav { display:flex; gap: 1.5rem; align-items:center; flex-wrap: wrap; }
                .top-nav a { display:flex; align-items:center; gap:6px; color: var(--footer-text); font-family:'Raleway', system-ui, sans-serif; font-weight:700; }
                .top-nav a:hover { color: var(--footer-accent); }
                .actions { display:flex; gap:0.75rem; align-items:center; flex-wrap: wrap; }
                .btn { border:1px solid var(--footer-soft); border-radius:10px; padding:0.5rem 0.9rem; background:#fff; color: var(--footer-text); font-family:'Raleway', system-ui, sans-serif; font-weight:700; transition: box-shadow 200ms ease, transform 120ms ease, background-color 150ms ease, border-color 150ms ease; }
                .btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,0.08); background-color: rgba(255,215,0,0.08); border-color: rgba(255,215,0,0.35); }
                .btn:active { transform: translateY(1px); }
                .right { margin-left:auto; display:flex; align-items:center; gap:0.75rem; }
                .social { display:flex; gap:0.75rem; }
                .social a { color: var(--footer-text); transition: transform 150ms ease, color 200ms ease; }
                .social a:hover { color: var(--footer-accent); transform: translateY(-2px); }
                .divider { border-top:1px solid var(--footer-soft); margin: 0.75rem 0; }
                .disclaimer { font-family:'Raleway', system-ui, sans-serif; color:#425b72; line-height:1.7; font-size:0.95rem; }
                .disclaimer a { color: var(--footer-text); text-decoration: underline; }
                .bottom-links { display:flex; flex-wrap:wrap; gap:1rem; align-items:center; }
                .bottom-links a { color: var(--footer-text); font-family:'Raleway', system-ui, sans-serif; font-weight:700; }
                .bottom-links a:hover { color: var(--footer-accent); }
                .brand { margin-left:auto; color: var(--footer-text); font-weight:800; font-family:'Raleway', system-ui, sans-serif; }
                .cookie-panel { display:none; background: #fff; border:1px solid var(--footer-soft); border-radius:12px; padding:0.75rem; margin-top:0.75rem; }
                .cookie-panel.open { display:block; }
                .cookie-panel label { display:flex; align-items:center; gap:0.5rem; margin:0.35rem 0; color: var(--footer-text); }
                .cookie-panel .apply { margin-top:0.5rem; }
            </style>
            <footer class="footer-root">
                <div class="container">
                    <!-- Menu superior similar ao da referência -->
                    <div class="row top-nav">
                        <a href="#"><i data-feather="home"></i> Hotéis</a>
                        <a href="#"><i data-feather="sun"></i> Experiências</a>
                        <a href="#"><i data-feather="calendar"></i> Tramitar reservas</a>
                        <a href="#"><i data-feather="info"></i> Sobre nós</a>
                    </div>

                    <!-- Ações e CTAs -->
                    <div class="row actions">
                        <button class="btn" id="btn-contact">Contacte-nos</button>
                        <button class="btn">Emprego</button>
                        <button class="btn">Contactar</button>
                        <button class="btn">FAQs</button>
                        <button class="btn" id="btn-cookies">Configurar cookies</button>
                        <div class="right">
                            <!-- Controles de idioma/moeda removidos; botão Iberostar removido -->
                        </div>
                        <div id="cookie-panel" class="cookie-panel">
                            <label><input type="checkbox" checked> Essenciais</label>
                            <label><input type="checkbox"> Analíticos</label>
                            <label><input type="checkbox"> Marketing</label>
                            <button class="btn apply" id="apply-cookies">Aplicar preferências</button>
                        </div>
                    </div>

                    <!-- Social -->
                    <div class="row social">
                        <a href="#"><i data-feather="facebook"></i></a>
                        <a href="#"><i data-feather="instagram"></i></a>
                        <a href="#"><i data-feather="youtube"></i></a>
                        <a href="#"><i data-feather="twitter"></i></a>
                        <a href="#"><i data-feather="linkedin"></i></a>
                    </div>

                    <div class="divider"></div>

                    <!-- Texto descritivo similar ao exemplo -->
                    <div class="row disclaimer">
                        O Hemera Luxe Haven é uma rede hoteleira que promove experiências responsáveis em destinos de praia e cidade, com hotéis 4 e 5 estrelas. Nossos resorts à beira-mar combinam elegância e relaxamento para famílias e casais, sempre respeitando o meio ambiente.
                    </div>

                    <div class="divider"></div>

                    <!-- Links inferiores -->
                    <div class="row bottom-links">
                        <a href="#">Mapa do site</a>
                        <a href="#">Nota legal</a>
                        <a href="#">Afiliados</a>
                        <a href="#">Política de cookies</a>
                        <a href="#">Política de Privacidade</a>
                        <a href="#">Confiança online e métodos de pagamento</a>
                        <span class="brand">Hemera Hotels & Resorts</span>
                    </div>
                </div>
            </footer>

            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    feather.replace();
                    const btnCookies = this.shadowRoot.getElementById('btn-cookies');
                    const panel = this.shadowRoot.getElementById('cookie-panel');
                    const apply = this.shadowRoot.getElementById('apply-cookies');
                    btnCookies.addEventListener('click', () => panel.classList.toggle('open'));
                    apply.addEventListener('click', () => {
                        panel.classList.remove('open');
                        alert('Preferências de cookies atualizadas.');
                    });
                });
            </script>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
