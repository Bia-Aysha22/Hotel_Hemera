import React from 'react';
import { Users, Shield, Star, TrendingUp, Crown, Sparkles, Sun, Moon } from 'lucide-react';

const HeroSection = ({ userStats }) => {
  const stats = [
    {
      icon: Users,
      label: 'Total de Membros',
      value: userStats?.total || 0,
      color: 'text-hemera-blue-600',
      bgColor: 'bg-hemera-blue-100'
    },
    {
      icon: Shield,
      label: 'Guardiões',
      value: userStats?.admins || 0,
      color: 'text-hemera-gold-600',
      bgColor: 'bg-hemera-gold-100'
    },
    {
      icon: Star,
      label: 'Membros Ativos',
      value: userStats?.active || 0,
      color: 'text-hemera-light-600',
      bgColor: 'bg-hemera-light-100'
    },
    {
      icon: TrendingUp,
      label: 'Novos Hoje',
      value: userStats?.newToday || 0,
      color: 'text-hemera-navy-600',
      bgColor: 'bg-hemera-navy-100'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-hemera-blue-600 via-hemera-blue-700 to-hemera-navy-800 text-white overflow-hidden mythology-pattern">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-overlay">
        <div className="absolute inset-0 bg-gradient-to-r from-hemera-blue-600/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-hemera-gold-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-hemera-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-hemera-light-300/30 rounded-full blur-2xl animate-glow"></div>
        <div className="absolute inset-0 animate-shimmer opacity-30"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <span className="inline-flex items-center px-6 py-2 bg-hemera-gold-400/20 backdrop-blur-sm rounded-full border border-hemera-gold-300/50 text-hemera-gold-200 text-sm font-medium">
              <Crown className="h-4 w-4 mr-2 animate-pulse" />
              Portal Divino
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 luxury-heading">
            <span className="luxury-text-gradient">Hotel Hemera</span>
          </h1>
          <p className="text-xl md:text-2xl text-hemera-gold-200 max-w-3xl mx-auto mb-8 font-light italic">
            Gerencie membros da elite celestial com segurança divina e elegância eterna
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-hemera-gold-300/30">
              <Shield className="h-5 w-5 mr-2 text-hemera-gold-300" />
              <span>Proteção Divina</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-hemera-blue-300/30">
              <Users className="h-5 w-5 mr-2 text-hemera-blue-300" />
              <span>Elite Celestial</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-hemera-light-300/30">
              <Star className="h-5 w-5 mr-2 text-hemera-light-300" />
              <span>Interface Etérea</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-hemera-gold-300/30 hover:bg-white/15 hover:border-hemera-gold-400/50 transition-all duration-300 animate-slide-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-hemera-gold-300">{stat.value}</div>
                  <div className="text-sm text-hemera-gold-200">{stat.label}</div>
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
