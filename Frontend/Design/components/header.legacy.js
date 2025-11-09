class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap');
                .header-container {
                    transition: all 0.3s ease;
                    background: rgba(255,255,255,0.35); /* barra branca semitransparente */
                    backdrop-filter: saturate(180%) blur(8px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    border-bottom: 1px solid rgba(0,0,0,0.08);
                    position: fixed; width: 100%; z-index: 50;
                }
                .header-container:hover {
                    background: rgba(255,255,255,0.6); /* menos transparente no hover */
                }
                .scrolled {
                    background-color: rgba(255,255,255,0.85) !important;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                }
                .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; align-items: center; }
                .nav-link {
                    position: relative;
                    color: rgba(0,0,0,0.8);
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    text-transform: none;
                }
                .nav-link:hover { color: var(--hemera-gold); filter: saturate(1.2); }
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                    background-color: rgba(255,255,255,0.95);
                    backdrop-filter: blur(4px);
                }
                .mobile-menu.open { max-height: 500px; }
                .brand { display:flex; align-items:center; gap:10px; color: rgba(0,0,0,0.85); }
                .brand-title { font-family: 'Cinzel', serif; font-size: 1.25rem; font-weight: 700; letter-spacing: 0.02em; text-transform: none; }
                .brand-sub { font-size: 0.7rem; opacity: 0.9; }
                .brand-dot { width: 8px; height: 8px; border-radius:50%; background: var(--hemera-gold); box-shadow: 0 0 0 3px rgba(255,215,0,0.25); }
                .logo-img { height: 56px; width: auto; display: block; }
                .btn-reservar {
                    background: var(--hemera-brown);
                    color: #fff;
                    padding: 0.6rem 1.25rem;
                    font-size: 0.875rem;
                    font-weight: 700;
                    border-radius: 9999px; /* pill */
                    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
                    transition: transform 0.1s ease, filter 0.2s ease;
                }
                .btn-reservar:hover { filter: brightness(1.05); }
                .btn-reservar:active { transform: scale(0.98); }
                .btn-outline {
                    border: 1px solid var(--hemera-gold);
                    color: rgba(0,0,0,0.85);
                    padding: 0.6rem 1rem;
                    font-size: 0.875rem;
                    font-weight: 700;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }
                .btn-outline:hover { background-color: var(--hemera-gold); color: var(--hemera-blue-mid); filter: brightness(1.02); }
                .nav { display:none; }
                @media (min-width: 768px) { .nav { display:flex; gap: 2rem; } .actions { display:flex; gap: 1rem; align-items:center; } .mobile-trigger { display:none; } }
                .mobile-trigger { color: rgba(0,0,0,0.8); }
                .lang { color: rgba(0,0,0,0.75); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; font-family:'Poppins', sans-serif; }
                .lang a { color: inherit; margin-left: 0.75rem; }
                .lang a:hover { color: var(--hemera-gold); }
                /* Links do menu mobile em cor escura */
                .mobile-menu a { color: rgba(0,0,0,0.85); }
                .mobile-menu a:hover { color: var(--hemera-gold); }
            </style>
            <header class="header-container text-white py-3">
                <div class="container mx-auto px-4 flex justify-between items-center">
                    <a href="/" class="brand">
                        <img src="/img/Capturar.png" alt="Hemera logo" class="logo-img" />
                        <span class="brand-title">Hemera</span>
                    </a>
                    
                    <div class="nav">
                        <a href="#" class="nav-link hover:text-hemera-gold">Hotel</a>
                        <a href="#rooms" class="nav-link hover:text-hemera-gold">Acomodações</a>
                        <a href="#amenities" class="nav-link hover:text-hemera-gold">Gastronomia</a>
                        <a href="#amenities" class="nav-link hover:text-hemera-gold">Wellness & Spa</a>
                        <a href="#" class="nav-link hover:text-hemera-gold">Eventos</a>
                        <a href="#" class="nav-link hover:text-hemera-gold">Experiências</a>
                        <a href="#contact" class="nav-link hover:text-hemera-gold">Contato</a>
                    </div>
                    
                    <div class="actions">
                        <a href="#rooms" class="btn-reservar">Reservar</a>
                    </div>
                    
                    <button id="mobile-menu-button" class="mobile-trigger">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="mobile-menu md:hidden">
                    <div class="container mx-auto px-4 py-2 flex flex-col space-y-3">
                        <a href="#" class="block py-2 hover:text-hemera-gold">Hotel</a>
                        <a href="#rooms" class="block py-2 hover:text-hemera-gold">Acomodações</a>
                        <a href="#amenities" class="block py-2 hover:text-hemera-gold">Gastronomia</a>
                        <a href="#amenities" class="block py-2 hover:text-hemera-gold">Wellness & Spa</a>
                        <a href="#" class="block py-2 hover:text-hemera-gold">Eventos</a>
                        <a href="#" class="block py-2 hover:text-hemera-gold">Experiências</a>
                        <a href="#contact" class="block py-2 hover:text-hemera-gold">Contato</a>
                        <div class="flex py-2">
                            <a href="#rooms" class="btn-reservar">Reservar</a>
                        </div>
                    </div>
                </div>
            </header>
            
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    feather.replace();
                    
                    // Handle mobile menu toggle
                    const mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
                    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
                    
                    mobileMenuButton.addEventListener('click', function() {
                        mobileMenu.classList.toggle('open');
                        const icon = mobileMenuButton.querySelector('svg');
                        if (mobileMenu.classList.contains('open')) {
                            feather.icons['x'].toSvg().then(svg => {
                                icon.outerHTML = svg;
                            });
                        } else {
                            feather.icons['menu'].toSvg().then(svg => {
                                icon.outerHTML = svg;
                            });
                        }
                    });
                    
                    // Handle scroll effect
                    window.addEventListener('scroll', function() {
                        const header = this.shadowRoot.querySelector('header');
                        if (window.scrollY > 50) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                    });

                    // Links já direcionam para páginas dedicadas de Login/Cadastro
                });
            </script>
        `;
    }
}

customElements.define('custom-header', CustomHeader);
