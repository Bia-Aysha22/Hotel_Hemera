import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroCarousel from '../components/HeroCarousel';
import UserCard from '../components/UserCard';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Shield, Users, Star, Lock, BarChart3, Settings, Bell, ArrowRight } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Dados de exemplo para demonstração
  const features = [
    {
      id: 1,
      name: "Gestão de Usuários",
      description: "Controle completo sobre todos os usuários do sistema com ferramentas avançadas de administração.",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      stats: "500+ Usuários"
    },
    {
      id: 2,
      name: "Segurança Avançada",
      description: "Sistema de autenticação robusto com criptografia de ponta e controles de acesso granulares.",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      stats: "100% Seguro"
    },
    {
      id: 3,
      name: "Relatórios Detalhados",
      description: "Acesse relatórios completos e estatísticas em tempo real sobre o uso do sistema.",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      stats: "24/7 Monitoramento"
    },
    {
      id: 4,
      name: "Interface Moderna",
      description: "Design responsivo e intuitivo que funciona perfeitamente em qualquer dispositivo.",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      stats: "UX Premium"
    }
  ];

  const quickActions = [
    {
      icon: Users,
      title: 'Gerenciar Usuários',
      description: 'Visualize e gerencie todos os usuários',
      action: '/users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Relatórios',
      description: 'Acesse relatórios e estatísticas',
      action: '/reports',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Settings,
      title: 'Configurações',
      description: 'Configure o sistema',
      action: '/settings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Bell,
      title: 'Notificações',
      description: 'Central de notificações',
      action: '/notifications',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Features Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Nossos Recursos
          </h2>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Descubra todas as funcionalidades que tornam nosso sistema a melhor escolha para gestão de usuários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-secondary-900">
                  {feature.name}
                </CardTitle>
                <CardDescription className="text-secondary-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  {feature.stats}
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
      <footer className="bg-secondary-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl mb-4">Sistema de Usuários</h3>
          <p className="text-white/80 mb-2">Gerencie usuários de forma eficiente e segura</p>
          <p className="text-white/80">Desenvolvido com React + Node.js</p>
          <p className="text-primary-400 mt-6">© 2025 Sistema de Usuários. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
