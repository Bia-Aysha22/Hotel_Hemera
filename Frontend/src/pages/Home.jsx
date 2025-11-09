import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroCarousel from '../components/HeroCarousel';
import RoomCard from '../components/RoomCard';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Star, Waves, Coffee, Car, Wifi, Utensils, Spa, Dumbbell, Concierge, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Dados dos quartos do hotel
  const rooms = [
    {
      id: 1,
      name: "Quarto Standard",
      description: "Conforto essencial com todas as comodidades básicas para uma estadia agradável.",
      price: 250,
      stars: 3,
      category: "standard"
    },
    {
      id: 2,
      name: "Quarto Standard Plus",
      description: "Espaço adicional e vista privilegiada da cidade com amenidades premium.",
      price: 350,
      stars: 4,
      category: "standard"
    },
    {
      id: 3,
      name: "Quarto Deluxe",
      description: "Elegância refinada com área de estar separada e acabamentos de luxo.",
      price: 480,
      stars: 4,
      category: "deluxe"
    },
    {
      id: 4,
      name: "Deluxe Premium",
      description: "Experiência superior com varanda privativa e serviço de quarto 24h.",
      price: 620,
      stars: 4,
      category: "deluxe"
    }
  ];

  // Serviços do hotel
  const services = [
    {
      id: 1,
      name: "Spa & Wellness",
      description: "Relaxe em nosso spa completo com tratamentos exclusivos e profissionais especializados.",
      icon: Spa,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      stats: "Tratamentos Premium"
    },
    {
      id: 2,
      name: "Academia",
      description: "Mantenha-se em forma com equipamentos modernos e instrutores qualificados.",
      icon: Dumbbell,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      stats: "24h Disponível"
    },
    {
      id: 3,
      name: "Restaurante Gourmet",
      description: "Saboreie pratos únicos preparados por nossos chefs renomados.",
      icon: Utensils,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      stats: "Culinária Internacional"
    },
    {
      id: 4,
      name: "Concierge 24h",
      description: "Serviço personalizado para atender todas as suas necessidades durante a estadia.",
      icon: Concierge,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      stats: "Atendimento Exclusivo"
    }
  ];

  const handleReserve = (room) => {
    if (isAuthenticated) {
      // Redirecionar para página de reserva
      console.log('Reservando quarto:', room.name);
    } else {
      // Redirecionar para login
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimalista e elegante */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-hemera-blue-50 via-white to-hemera-gold-50">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-display text-6xl md:text-8xl font-light text-hemera-navy-900 mb-6 tracking-tight">
            Hotel Hemera
          </h1>
          <p className="text-2xl md:text-3xl text-hemera-blue-700 font-light mb-8 leading-relaxed">
            Onde a luz do amanhecer encontra o luxo atemporal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500 px-8 py-4 text-lg font-light transition-all duration-300 hover:scale-105">
                Reservar Agora
              </Button>
            </Link>
            <Link to="#rooms">
              <Button variant="outline" className="border-hemera-navy-300 text-hemera-navy-700 hover:bg-hemera-navy-50 px-8 py-4 text-lg font-light transition-all duration-300">
                Explorar Suítes
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 text-hemera-gold-600 rotate-90" />
        </div>
      </section>

      {/* Rooms Section - Minimalista com foco nas imagens */}
      <section id="rooms" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-light text-hemera-navy-900 mb-6">
              Suítes
            </h2>
            <p className="text-xl text-hemera-blue-700 font-light max-w-2xl mx-auto">
              Espaços cuidadosamente projetados para proporcionar tranquilidade e conforto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room, index) => (
              <div key={room.id} className="group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden rounded-sm bg-white group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] bg-gradient-to-br from-hemera-blue-100 to-hemera-gold-100 flex items-center justify-center">
                    <div className="text-center text-hemera-blue-700">
                      <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-light">Imagem do {room.name}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-light text-hemera-navy-900 mb-2">
                      {room.name}
                    </h3>
                    <p className="text-hemera-blue-700 font-light mb-4 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-light text-hemera-gold-600">
                        R$ {room.price}
                      </span>
                      <span className="text-sm text-hemera-blue-600 font-light">
                        /noite
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Minimalista */}
      <section className="py-32 bg-hemera-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-light text-hemera-navy-900 mb-6">
              Experiências
            </h2>
            <p className="text-xl text-hemera-blue-700 font-light max-w-2xl mx-auto">
              Cada momento é uma oportunidade para renovar sua conexão com o bem-estar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div key={service.id} className="text-center group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-6">
                  <service.icon className="h-12 w-12 text-hemera-gold-600 mx-auto mb-4 group-hover:text-hemera-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-2xl font-light text-hemera-navy-900 mb-4 group-hover:text-hemera-gold-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-hemera-blue-700 font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="text-sm text-hemera-gold-600 font-light tracking-wide">
                  {service.stats}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Quick Actions - Minimalista */}
        {isAuthenticated && (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h3 className="font-display text-4xl font-light text-hemera-navy-900 mb-4">
                  Seu Portal
                </h3>
                <p className="text-xl text-hemera-blue-700 font-light">
                  Acesso rápido às funcionalidades exclusivas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {quickActions.map((action, index) => (
                  <Link key={action.title} to={action.action}>
                    <div className="group text-center cursor-pointer">
                      <div className="mb-4">
                        <action.icon className="h-8 w-8 text-hemera-gold-600 mx-auto group-hover:text-hemera-blue-600 transition-colors duration-300" />
                      </div>
                      <h4 className="font-display text-xl font-light text-hemera-navy-900 mb-2 group-hover:text-hemera-gold-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-hemera-blue-700 font-light text-sm">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && user && (
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-hemera-navy-900 via-hemera-blue-900 to-hemera-navy-900 text-white border border-hemera-gold-300 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4 text-hemera-gold-300">
                    Bem-vindo de volta, {user.nome}!
                  </h3>
                  <p className="text-hemera-blue-200 text-lg mb-6">
                    Você está conectado ao portal divino e pode acessar todas as funcionalidades do Hotel Hemera.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard">
                      <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-300 hover:scale-105 transition-all duration-300 font-semibold">
                        <Crown className="h-4 w-4 mr-2" />
                        Portal do Membro
                      </Button>
                    </Link>
                    <Link to="/users">
                      <Button variant="outline" className="border-hemera-gold-400 text-hemera-gold-300 hover:bg-hemera-gold-400 hover:text-hemera-navy-900 hover:scale-105 transition-all duration-300">
                        <Users className="h-4 w-4 mr-2" />
                        Gerenciar Elite
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-hemera-navy-900 via-hemera-blue-900 to-hemera-navy-900 text-white border border-hemera-gold-300 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4 text-hemera-gold-300">
                    Pronto para Ascender?
                  </h3>
                  <p className="text-hemera-blue-200 text-lg mb-6">
                    Junte-se à elite do Hotel Hemera e tenha acesso a todas as funcionalidades do portal divino.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                      <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-300 hover:scale-105 transition-all duration-300 font-semibold">
                        <Crown className="h-4 w-4 mr-2" />
                        Ingressar na Elite
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="border-hemera-gold-400 text-hemera-gold-300 hover:bg-hemera-gold-400 hover:text-hemera-navy-900 hover:scale-105 transition-all duration-300">
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                        Acessar Portal
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Welcome Message - Minimalista */}
      {isAuthenticated && user && (
        <section className="py-24 bg-hemera-gold-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-display text-4xl font-light text-hemera-navy-900 mb-6">
              Bem-vindo de volta, {user.nome}
            </h3>
            <p className="text-xl text-hemera-blue-700 font-light mb-8 max-w-2xl mx-auto">
              Sua presença ilumina nosso espaço. Continue sua jornada de tranquilidade conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500 px-8 py-3 font-light transition-all duration-300">
                  Dashboard
                </Button>
              </Link>
              <Link to="/users">
                <Button variant="outline" className="border-hemera-navy-300 text-hemera-navy-700 hover:bg-hemera-navy-50 px-8 py-3 font-light transition-all duration-300">
                  Gerenciar
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Minimalista */}
      {!isAuthenticated && (
        <section className="py-24 bg-hemera-navy-900">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-display text-4xl font-light text-white mb-6">
              Pronto para sua próxima escapada?
            </h3>
            <p className="text-xl text-hemera-blue-200 font-light mb-8 max-w-2xl mx-auto">
              Junte-se a nós e descubra o verdadeiro significado de bem-estar e tranquilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500 px-8 py-3 font-light transition-all duration-300">
                  Criar Conta
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-hemera-gold-400 text-hemera-gold-300 hover:bg-hemera-gold-400 hover:text-hemera-navy-900 px-8 py-3 font-light transition-all duration-300">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer - Minimalista */}
      <footer className="bg-white border-t border-hemera-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="font-display text-3xl font-light text-hemera-navy-900 mb-4">
              Hotel Hemera
            </h3>
            <p className="text-hemera-blue-700 font-light mb-2">Onde a luz encontra o conforto</p>
            <p className="text-hemera-blue-600 font-light text-sm mb-8">Av. da Serenidade, 1000 • contato@hemera.com</p>
            <p className="text-hemera-gold-600 text-sm font-light">© 2025 Hotel Hemera. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
