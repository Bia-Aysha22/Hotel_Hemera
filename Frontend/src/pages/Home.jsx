import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroCarousel from '../components/HeroCarousel';
import ExperienceGallery from '../components/ExperienceGallery';
import RoomCard from '../components/RoomCard';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Star, Waves, Coffee, Car, Wifi, Utensils, Flower2, Dumbbell, ConciergeBell, ArrowRight } from 'lucide-react';

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
      icon: Flower2,
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
      icon: ConciergeBell,
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
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Galeria de Experiências com animações */}
      <ExperienceGallery />

      {/* Rooms Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Nossos Quartos
          </h2>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Escolha entre nossa seleção exclusiva de acomodações, 
            cada uma projetada para proporcionar conforto excepcional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {rooms.map((room, index) => (
            <div key={room.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <RoomCard room={room} onReserve={handleReserve} />
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Desfrute de uma experiência completa com nossos serviços premium e comodidades exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${service.bgColor} rounded-full flex items-center justify-center`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-secondary-900">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-secondary-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  {service.stats}
                </div>
                <Button variant="outline" className="w-full">
                  Saiba Mais
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions - Only show if authenticated */}
        {isAuthenticated && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="font-display text-3xl font-bold text-secondary-900 mb-4">
                Ações Rápidas
              </h3>
              <p className="text-secondary-600 text-lg">
                Acesse rapidamente as principais funcionalidades do sistema
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={action.title} to={action.action}>
                  <Card 
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${action.bgColor}`}>
                          <action.icon className={`h-6 w-6 ${action.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-sm text-secondary-600">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && user && (
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4">
                    Bem-vindo de volta, {user.nome}!
                  </h3>
                  <p className="text-primary-100 text-lg mb-6">
                    Você está logado e pode acessar todas as funcionalidades do sistema.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard">
                      <Button className="bg-white text-primary-600 hover:bg-white/90">
                        Ir para Dashboard
                      </Button>
                    </Link>
                    <Link to="/users">
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                        Gerenciar Usuários
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
            <Card className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4">
                    Pronto para Começar?
                  </h3>
                  <p className="text-secondary-300 text-lg mb-6">
                    Crie sua conta agora e tenha acesso a todas as funcionalidades do sistema.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                      <Button className="bg-primary-600 text-white hover:bg-primary-700">
                        Criar Conta
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary-900">
                        Fazer Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl mb-4">Hotel Hemera</h3>
          <p className="text-white/80 mb-2">Av. Luxo Premium, 1000 - Centro</p>
          <p className="text-white/80">Tel: (11) 5555-0000 | contato@hemera.com</p>
          <p className="text-primary-400 mt-6">© 2025 Hotel Hemera. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
