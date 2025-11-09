import React from 'react';
import { User, Mail, Phone, Calendar, Shield, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import Button from './ui/Button';

const UserCard = ({ user, onEdit, onDelete, showActions = true }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-hemera-gold-100 text-hemera-gold-800';
      case 'user':
        return 'bg-hemera-blue-100 text-hemera-blue-800';
      case 'moderator':
        return 'bg-hemera-light-100 text-hemera-light-800';
      default:
        return 'bg-hemera-navy-100 text-hemera-navy-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return '👑';
      case 'moderator':
        return '🛡️';
      default:
        return '👤';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 card-luxury">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-hemera-blue-100 rounded-full flex items-center justify-center group-hover:bg-hemera-gold-100 transition-colors duration-300">
              <User className="h-6 w-6 text-hemera-blue-600 group-hover:text-hemera-gold-600 transition-colors duration-300" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-hemera-navy-900 group-hover:text-hemera-gold-600 transition-colors font-display">
                {user.nome}
              </CardTitle>
              <CardDescription className="text-sm text-hemera-blue-700">
                {user.email}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role || 'user')}`}>
              {getRoleIcon(user.role || 'user')} {user.role || 'user'}
            </span>
            {user.active ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-hemera-light-100 text-hemera-light-800">
                Ativo
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-hemera-gold-100 text-hemera-gold-800">
                Inativo
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informações básicas */}
        <div className="space-y-2">
          {user.pronome && (
            <div className="flex items-center text-sm text-hemera-blue-600">
              <span className="font-medium mr-2 text-hemera-navy-800">Forma de Tratamento:</span>
              <span>{user.pronome}</span>
            </div>
          )}
          
          {user.telefone && (
            <div className="flex items-center text-sm text-hemera-blue-600">
              <Phone className="h-4 w-4 mr-2 text-hemera-gold-400" />
              <span>{user.telefone}</span>
            </div>
          )}
          
          {user.data_nascimento && (
            <div className="flex items-center text-sm text-hemera-blue-600">
              <Calendar className="h-4 w-4 mr-2 text-hemera-gold-400" />
              <span>{formatDate(user.data_nascimento)}</span>
            </div>
          )}
        </div>

        {/* CPF se disponível */}
        {user.cpf && (
          <div className="flex items-center text-sm text-hemera-blue-600">
            <Shield className="h-4 w-4 mr-2 text-hemera-gold-400" />
            <span>Identificação Divina: {user.cpf}</span>
          </div>
        )}

        {/* Data de cadastro */}
        <div className="pt-2 border-t border-hemera-gold-200">
          <div className="flex items-center justify-between text-xs text-hemera-blue-600">
            <span>Ascendido em:</span>
            <span>{formatDate(user.timestamp)}</span>
          </div>
        </div>

        {/* Ações */}
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit && onEdit(user)}
              className="flex-1"
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete && onDelete(user)}
              className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
            >
              Remover
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
