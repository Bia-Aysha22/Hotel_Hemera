import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Settings, Shield, Users, BarChart3, Bell, Home, Crown, Sparkles, Sun, Moon, Mail, Calendar, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const quickActions = [
    {
      icon: Users,
      title: 'Gerenciar Elite',
      description: 'Visualize e gerencie todos os membros',
      action: () => navigate('/users'),
      color: 'text-hemera-blue-600',
      bgColor: 'bg-hemera-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Divinos',
      description: 'Acesse relatórios e estatísticas celestiais',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-hemera-gold-600',
      bgColor: 'bg-hemera-gold-100'
    },
    {
      icon: Settings,
      title: 'Configurações Sagradas',
      description: 'Configure o portal divino',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-hemera-light-600',
      bgColor: 'bg-hemera-light-100'
    },
    {
      icon: Bell,
      title: 'Notificações Celestes',
      description: 'Central de mensagens divinas',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-hemera-yellow-600',
      bgColor: 'bg-hemera-yellow-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-hemera-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-hemera-gold-400" />
              <h1 className="ml-2 text-xl font-light text-hemera-navy-900 font-display">
                Dashboard Hemera
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-hemera-blue-600" />
                <span className="text-sm text-hemera-navy-900 font-light">
                  {user?.nome}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 border-hemera-blue-200 text-hemera-blue-700 hover:bg-hemera-blue-50 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-light text-hemera-navy-900 font-display">
              Bem-vindo(a), {user?.nome}
            </h2>
            <p className="mt-2 text-hemera-blue-700 font-light">
              Gerencie sua conta e informações
            </p>
          </div>

          {/* Ações Rápidas */}
          <div className="mb-8">
            <h3 className="text-xl font-light text-hemera-navy-900 mb-4 font-display">Ações rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={action.title}
                  className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={action.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.bgColor} group-hover:bg-hemera-blue-100 transition-colors duration-300`}>
                        <action.icon className={`h-6 w-6 ${action.color} group-hover:text-hemera-blue-600 transition-colors duration-300`} />
                      </div>
                      <div>
                        <h4 className="font-light text-hemera-navy-900 transition-colors font-display">{action.title}</h4>
                        <p className="text-sm text-hemera-blue-700 font-light">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card de Informações Pessoais */}
            <Card className="border border-hemera-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary-600" />
                  <span>Informações Pessoais</span>
                </CardTitle>
                <CardDescription>
                  Seus dados pessoais e de contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-secondary-500">Nome</p>
                  <p className="text-secondary-900">{user?.nome}</p>
                </div>
                {user?.pronome && (
                  <div>
                    <p className="text-sm font-medium text-secondary-500">Pronome</p>
                    <p className="text-secondary-900">{user?.pronome}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-secondary-500">Email</p>
                  <p className="text-secondary-900">{user?.email}</p>
                </div>
                {user?.telefone && (
                  <div>
                    <p className="text-sm font-medium text-secondary-500">Telefone</p>
                    <p className="text-secondary-900">{user?.telefone}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Card de Dados Adicionais */}
            <Card className="border border-hemera-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary-600" />
                  <span>Dados Adicionais</span>
                </CardTitle>
                <CardDescription>
                  Informações complementares
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.data_nascimento && (
                  <div>
                    <p className="text-sm font-medium text-secondary-500">Data de Nascimento</p>
                    <p className="text-secondary-900">
                      {new Date(user.data_nascimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                {user?.cpf && (
                  <div>
                    <p className="text-sm font-medium text-secondary-500">CPF</p>
                    <p className="text-secondary-900">{user?.cpf}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-secondary-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Card de Ações Rápidas */}
            <Card className="border border-hemera-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span>Gerenciar Conta</span>
                </CardTitle>
                <CardDescription>
                  Ações para sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Informações do Portal */}
          <div className="mt-8">
            <Card className="border border-hemera-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-hemera-navy-900 font-display font-light">Informações da conta</CardTitle>
                <CardDescription className="text-hemera-blue-700 font-light">
                  Detalhes sobre sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-hemera-blue-700">ID do Membro</p>
                    <p className="text-hemera-navy-900 font-mono text-sm">{user?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-hemera-blue-700">Data de ingresso</p>
                    <p className="text-hemera-navy-900">
                      {user?.timestamp ? new Date(user.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
