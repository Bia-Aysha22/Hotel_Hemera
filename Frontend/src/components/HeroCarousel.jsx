import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Hotel Hemera",
      subtitle: "Onde a luz encontra o conforto",
      description: "Descubra um refúgio de tranquilidade e elegância, inspirado na deusa grega da luz.",
      image: "bg-gradient-to-br from-hemera-blue-100 via-hemera-gold-50 to-hemera-blue-50"
    },
    {
      id: 2,
      title: "Suítes Celestiais",
      subtitle: "Espaços pensados para seu bem-estar",
      description: "Cada suíte é um santuário de paz, projetado para oferecer o máximo conforto e serenidade.",
      image: "bg-gradient-to-br from-hemera-gold-50 via-white to-hemera-blue-50"
    },
    {
      id: 3,
      title: "Experiências Únicas",
      subtitle: "Momentos que ficam para sempre",
      description: "Cada momento no Hotel Hemera é uma oportunidade de criar memórias inesquecíveis.",
      image: "bg-gradient-to-br from-white via-hemera-blue-50 to-hemera-gold-50"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${currentSlideData.image} transition-all duration-1000 ease-in-out`}>
        {/* Image placeholder - você pode adicionar imagens reais aqui */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              {/* Title */}
              <h1 className="font-display text-5xl md:text-7xl font-light text-hemera-navy-900 mb-6">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <h2 className="text-2xl md:text-3xl text-hemera-blue-700 mb-8 font-light">
                {currentSlideData.subtitle}
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-hemera-blue-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/rooms">
                  <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500 px-8 py-4 text-lg font-light transition-all duration-300">
                    Reservar Agora
                  </Button>
                </Link>
                
                <Link to="/suites">
                  <Button variant="outline" className="border-hemera-navy-300 text-hemera-navy-700 hover:bg-hemera-navy-50 px-8 py-4 text-lg font-light transition-all duration-300">
                    Explorar Suítes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-hemera-gold-400 scale-125' 
                : 'bg-hemera-blue-300 hover:bg-hemera-blue-400'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-hemera-navy-900 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-hemera-navy-900 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;