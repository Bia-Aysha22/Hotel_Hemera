import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Settings, Shield, Users, BarChart3, Bell, Home } from 'lucide-react';
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
      title: 'Gerenciar Usuários',
      description: 'Visualize e gerencie todos os usuários',
      action: () => navigate('/users'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Relatórios',
      description: 'Acesse relatórios e estatísticas',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Settings,
      title: 'Configurações',
      description: 'Configure o sistema',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Bell,
      title: 'Notificações',
      description: 'Central de notificações',
      action: () => toast.info('Em desenvolvimento'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-xl font-semibold text-secondary-900">
                Sistema de Usuários
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-secondary-500" />
                <span className="text-sm text-secondary-700">
                  {user?.nome}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
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
            <h2 className="text-3xl font-bold text-secondary-900">
              Bem-vindo, {user?.nome}!
            </h2>
            <p className="mt-2 text-secondary-600">
              Gerencie sua conta e informações pessoais
            </p>
          </div>

          {/* Ações Rápidas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={action.title}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={action.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900">{action.title}</h4>
                        <p className="text-sm text-secondary-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card de Informações Pessoais */}
            <Card>
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
            <Card>
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
            <Card>
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

          {/* Informações da Conta */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Detalhes sobre sua conta no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-secondary-500">ID do Usuário</p>
                    <p className="text-secondary-900 font-mono text-sm">{user?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-500">Data de Cadastro</p>
                    <p className="text-secondary-900">
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
