// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize room image carousels
    const initRoomCarousels = () => {
        document.querySelectorAll('.room-images').forEach(carousel => {
            const images = carousel.querySelectorAll('img');
            let currentIndex = 0;
            
            const showImage = (index) => {
                images.forEach((img, i) => {
                    img.classList.toggle('hidden', i !== index);
                });
            };
            
            carousel.querySelector('.prev-btn').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });
            
            carousel.querySelector('.next-btn').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });
            
            // Show first image initially
            showImage(0);
        });
    };
    
    initRoomCarousels();

    // Eventos de autenticação
    window.addEventListener('auth:login-success', (e) => {
        const user = e.detail?.user;
        console.log('Login efetuado:', user);
        // Aqui podemos atualizar UI global se necessário
        // Ex.: document.querySelector('custom-header')?.setAttribute('data-auth', 'true');
    });

    window.addEventListener('auth:register-success', (e) => {
        const user = e.detail?.user;
        console.log('Cadastro efetuado:', user);
    });

    window.addEventListener('auth:logout', () => {
        console.log('Sessão encerrada');
    });
});

// Booking form validation
const validateBookingForm = (form) => {
    const name = form.querySelector('#booking-name').value.trim();
    const email = form.querySelector('#booking-email').value.trim();
    const phone = form.querySelector('#booking-phone').value.trim();
    const checkin = form.querySelector('#booking-checkin').value;
    const checkout = form.querySelector('#booking-checkout').value;
    const roomType = form.querySelector('#booking-room-type').value;
    
    if (!name || !email || !phone || !checkin || !checkout || roomType === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, insira um endereço de email válido.');
        return false;
    }
    
    if (new Date(checkout) <= new Date(checkin)) {
        alert('A data de check-out deve ser posterior à data de check-in.');
        return false;
    }
    
    return true;
};

// Initialize date pickers
const initDatePickers = () => {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
        input.value = today;
    });
};

document.addEventListener('DOMContentLoaded', initDatePickers);

// Float-up reveal on scroll for generic elements
const initFloatUpAnimations = () => {
    const elems = document.querySelectorAll('.float-up');
    if (!elems.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, { threshold: 0.2 });
    elems.forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', initFloatUpAnimations);

// Handle booking form submission
document.querySelector('#booking-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateBookingForm(this)) {
        // In a real app, you would send this data to your server
        alert('Reserva enviada com sucesso! Nossa equipe entrará em contato em breve para confirmação.');
        this.reset();
    }
});
// Inicialização de múltiplos carrosséis (Rooms, Galeria, Explorar)
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.hemera-carousel, #rooms-carousel');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const slides = carousel.querySelector('.slides');
    if (!slides) return;
    const slideEls = Array.from(slides.children);
    if (!slideEls.length) return;

    let index = 0;
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');

    const update = () => {
      slides.style.transform = `translateX(-${index * 100}%)`;
    };

    next?.addEventListener('click', () => {
      index = (index + 1) % slideEls.length;
      update();
    });

    prev?.addEventListener('click', () => {
      index = (index - 1 + slideEls.length) % slideEls.length;
      update();
    });

    // Auto-play leve por carrossel
    let auto = setInterval(() => {
      index = (index + 1) % slideEls.length;
      update();
    }, 7000);

    // Pausar ao interagir
    carousel.addEventListener('mouseenter', () => {
      clearInterval(auto);
    });
    carousel.addEventListener('mouseleave', () => {
      clearInterval(auto);
      auto = setInterval(() => {
        index = (index + 1) % slideEls.length;
        update();
      }, 7000);
    });

    // Render inicial
    update();
  });
});
