import React from 'react';

const images = [
  {
    src: '/Design/img/8159433-praia-por-do-sol-relaxamento-piscina-em-um-luxuoso-hotel-resort-a-praia-em-por-do-sol-luz-praia-perfeita-.jpg',
    title: 'Piscina Infinita',
    subtitle: 'Vista panorâmica ao pôr do sol'
  },
  {
    src: '/Design/img/guarda-chuva-e-cadeira-ao-redor-da-piscina-perto-da-praia-do-mar-ou-do-oceano-ao-nascer-ou-por-do-sol_74190-8444.jpeg',
    title: 'Relaxamento à Beira-Mar',
    subtitle: 'Conforto e elegância'
  },
  {
    src: '/Design/img/magnifico-cenario-de-uma-praia-com-arvores-e-um-mar-ao-por-do-sol_181624-19305.jpeg',
    title: 'Cenário Deslumbrante',
    subtitle: 'Relaxamento completo'
  },
  {
    src: '/Design/img/romance-inesquecivel-a-beira-mar-velas-flores-e-um-jantar-ao-por-do-sol-de-tirar-o-folego_896558-15505.jpg',
    title: 'Jantar Romântico',
    subtitle: 'Sabores exclusivos'
  },
  {
    src: '/Design/img/CassioToledo_por_do_sol_jantar.jpg',
    title: 'Experiência Gastronômica',
    subtitle: 'Momentos inesquecíveis'
  },
  {
    src: '/Design/img/guarda-chuva-e-cadeira-ao-redor-da-piscina-no-hotel-resort-para-viagens-de-lazer-e-ferias_74190-8222.jpeg',
    title: 'Lazer e Férias',
    subtitle: 'Descanso perfeito'
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-lg shadow-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/20 group-hover:to-transparent transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              <h3 className="text-white text-xl font-semibold mb-1 transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {img.title}
              </h3>
              <p className="text-white/90 text-sm transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200">{img.subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 rotate-0 group-hover:rotate-180 transition-all duration-500 delay-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceGallery;

