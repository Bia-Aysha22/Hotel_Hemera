import React from 'react';
import { Star, Users, Wifi, Car, Coffee, Utensils, Waves } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import Button from './ui/Button';

const RoomCard = ({ room, onReserve }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'deluxe':
        return 'bg-green-100 text-green-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'suite':
        return 'bg-gold-100 text-gold-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'standard':
        return '🏨';
      case 'deluxe':
        return '✨';
      case 'vip':
        return '👑';
      case 'suite':
        return '🏰';
      default:
        return '🛏️';
    }
  };

  const renderStars = (stars) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi Grátis' },
    { icon: Car, label: 'Estacionamento' },
    { icon: Coffee, label: 'Café da Manhã' },
    { icon: Utensils, label: 'Restaurante' },
    { icon: Waves, label: 'Piscina' }
  ];

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(room.category)}`}>
            {getCategoryIcon(room.category)} {room.category.toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-1">
            {renderStars(room.stars)}
          </div>
        </div>
        {/* Placeholder for room image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {getCategoryIcon(room.category)}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {room.name}
            </CardTitle>
            <CardDescription className="text-secondary-600 mt-1">
              {room.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-secondary-600">
              <amenity.icon className="h-3 w-3" />
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-secondary-200">
          <div>
            <div className="text-2xl font-bold text-primary-600">
              R$ {room.price.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-secondary-500">por noite</div>
          </div>
          <Button
            onClick={() => onReserve && onReserve(room)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2"
          >
            Reservar
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>Até 4 pessoas</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400" />
            <span>{room.stars} estrelas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
