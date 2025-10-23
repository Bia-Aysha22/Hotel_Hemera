import React from 'react';
import { Users, Shield, Star, TrendingUp } from 'lucide-react';

const HeroSection = ({ userStats }) => {
  const stats = [
    {
      icon: Users,
      label: 'Total de Usuários',
      value: userStats?.total || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      label: 'Administradores',
      value: userStats?.admins || 0,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Star,
      label: 'Usuários Ativos',
      value: userStats?.active || 0,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      label: 'Novos Hoje',
      value: userStats?.newToday || 0,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Sistema de Usuários
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
            Gerencie usuários de forma eficiente e segura com nossa plataforma completa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Shield className="h-5 w-5 mr-2" />
              <span>Segurança Avançada</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Users className="h-5 w-5 mr-2" />
              <span>Gestão Completa</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Star className="h-5 w-5 mr-2" />
              <span>Interface Moderna</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-200">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
