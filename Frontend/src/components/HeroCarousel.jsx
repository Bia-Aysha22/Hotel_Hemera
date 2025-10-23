import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Users, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Sistema de Usuários",
      subtitle: "Gerencie usuários de forma eficiente e segura",
      description: "Plataforma completa para gestão de usuários com interface moderna e recursos avançados de segurança.",
      image: "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800",
      icon: Shield,
      features: ["Segurança Avançada", "Interface Moderna", "Gestão Completa"],
      cta: "Começar Agora",
      link: "/register"
    },
    {
      id: 2,
      title: "Controle Total",
      subtitle: "Tenha controle completo sobre seus usuários",
      description: "Visualize, edite e gerencie todos os usuários do sistema com ferramentas profissionais.",
      image: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
      icon: Users,
      features: ["Dashboard Completo", "Relatórios Detalhados", "Filtros Avançados"],
      cta: "Acessar Dashboard",
      link: "/dashboard"
    },
    {
      id: 3,
      title: "Segurança Garantida",
      subtitle: "Proteção máxima para seus dados",
      description: "Sistema de autenticação robusto com criptografia de ponta e controles de acesso.",
      image: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800",
      icon: Lock,
      features: ["Autenticação JWT", "Criptografia", "Controle de Acesso"],
      cta: "Saiba Mais",
      link: "/login"
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
    <div className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${currentSlideData.image} transition-all duration-1000 ease-in-out`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="animate-fade-in">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <IconComponent className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary-100 text-center mb-6">
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
                  <Button className="px-8 py-4 text-lg font-semibold bg-white text-primary-600 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                    {currentSlideData.cta}
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300">
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
