import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Waves, Coffee, Car, Wifi, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Hotel Hemera",
      subtitle: "Luxo e Conforto em Cada Detalhe",
      description: "Descubra uma experiência única de hospitalidade com nossos quartos elegantes, serviços premium e localização privilegiada.",
      imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1920&auto=format&fit=crop",
      icon: Star,
      features: ["Wi-Fi Grátis", "Estacionamento", "Piscina", "Restaurante"],
      cta: "Reservar Agora",
      link: "/rooms"
    },
    {
      id: 2,
      title: "Suítes Presidenciais",
      subtitle: "O Máximo em Sofisticação",
      description: "Luxo absoluto com vista panorâmica, serviço de mordomo e terraço privativo.",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1920&auto=format&fit=crop",
      icon: Waves,
      features: ["Vista Panorâmica", "Serviço de Mordomo", "Terraço Privativo", "Chef Particular"],
      cta: "Ver Suítes",
      link: "/suites"
    },
    {
      id: 3,
      title: "Experiência Premium",
      subtitle: "Serviços Exclusivos para Você",
      description: "Spa, academia, restaurante gourmet e concierge 24h para uma estadia inesquecível.",
      imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop",
      icon: Coffee,
      features: ["Spa & Wellness", "Academia", "Restaurante Gourmet", "Concierge 24h"],
      cta: "Conhecer Serviços",
      link: "/services"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
  const IconComponent = currentSlideData.icon;

  return (
    <div className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.imageUrl}
          alt={currentSlideData.title}
          className="w-full h-full object-cover scale-105 animate-[zoomIn_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hemera-navy-900/70 via-hemera-navy-800/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-hemera-navy-900/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="animate-fade-in">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="p-6 rounded-full border border-aurum-500/50 bg-aurum-500/10 backdrop-blur-sm shadow-3xl">
                  <IconComponent className="h-16 w-16 text-aurum-400" />
                </div>
              </div>

              {/* Title */}
              <h1 className="font-logo text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-hemera-blue-100 text-center mb-6">
                {currentSlideData.subtitle}
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 text-center mb-8 max-w-3xl mx-auto">
                {currentSlideData.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {currentSlideData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={currentSlideData.link}>
                  <Button className="px-8 py-4 text-lg font-semibold bg-aurum-500 text-hemera-navy-900 hover:bg-aurum-600 transition-all duration-300 hover:scale-105">
                    {currentSlideData.cta}
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-hemera-blue-200 text-hemera-blue-100 hover:bg-hemera-blue-100 hover:text-hemera-navy-900 transition-all duration-300">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;
