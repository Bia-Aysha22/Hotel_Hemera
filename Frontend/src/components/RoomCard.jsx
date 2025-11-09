import React from 'react';
import { Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import Button from './ui/Button';

const RoomCard = ({ room, onReserve }) => {
  const renderStars = (stars) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < stars ? 'text-hemera-gold-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-hemera-blue-100">
      {/* Image Placeholder - Minimalista */}
      <div className="relative h-64 bg-gradient-to-br from-hemera-blue-50 via-hemera-gold-50 to-white overflow-hidden">
        {/* Placeholder para imagem real */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl text-hemera-blue-200 opacity-50">
            🏨
          </div>
        </div>
        
        {/* Rating no canto */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            {renderStars(room.stars)}
          </div>
        </div>
      </div>

      <CardHeader className="pb-4 px-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-light text-hemera-navy-900 mb-2">
              {room.name}
            </CardTitle>
            <CardDescription className="text-hemera-blue-600 font-light">
              {room.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Preço */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-light text-hemera-navy-900">
              R$ {room.price.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-hemera-blue-500 font-light">por noite</div>
          </div>
          <Button
            className="bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500 px-6 py-2 font-light transition-all duration-300"
            onClick={() => onReserve && onReserve(room)}
          >
            Reservar
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="flex items-center justify-between text-sm text-hemera-blue-600 font-light">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Até 4 pessoas</span>
          </div>
          <div className="text-hemera-gold-600">
            {room.category.toUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;