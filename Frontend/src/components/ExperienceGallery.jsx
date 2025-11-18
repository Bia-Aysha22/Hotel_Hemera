import React from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1543489816-2b4b58b0d6d3?q=80&w=1200&auto=format&fit=crop',
    title: 'Piscina Infinita',
    subtitle: 'Vista panorâmica ao pôr do sol'
  },
  {
    src: 'https://images.unsplash.com/photo-1546201451-931c6b3a0c63?q=80&w=1200&auto=format&fit=crop',
    title: 'Suíte Presidencial',
    subtitle: 'Conforto e elegância'
  },
  {
    src: 'https://images.unsplash.com/photo-1558449028-b53a39f3f02f?q=80&w=1200&auto=format&fit=crop',
    title: 'Spa & Wellness',
    subtitle: 'Relaxamento completo'
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    title: 'Gastronomia',
    subtitle: 'Sabores exclusivos'
  }
];

const ExperienceGallery = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-logo text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
          Experiências Hemera
        </h2>
        <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
          Explore um mundo de luxo com imagens e animações inspiradas nas referências
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-lg shadow-3xl">
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white text-xl font-semibold">
                {img.title}
              </h3>
              <p className="text-white/80 text-sm">{img.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceGallery;

