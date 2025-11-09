import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UsuarioService from '../services/usuarioService';
import UserCard from '../components/UserCard';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Search, Filter, Plus, Users as UsersIcon, UserPlus, Settings, Crown, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userStats, setUserStats] = useState({
    total: 0,
    admins: 0,
    active: 0,
    newToday: 0
  });

  const roles = [
    { value: 'all', label: 'Todos' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderador' },
    { value: 'user', label: 'Usuário' }
  ];

  // Carregar usuários
  const loadUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await UsuarioService.getUsuarios(page, 12);
      
      if (response.success) {
        setUsers(response.data.usuarios);
        setTotalPages(response.data.totalPages);
        
        // Calcular estatísticas
        const stats = {
          total: response.data.total,
          admins: response.data.usuarios.filter(u => u.role === 'admin').length,
          active: response.data.usuarios.filter(u => u.active).length,
          newToday: response.data.usuarios.filter(u => {
            const today = new Date();
            const userDate = new Date(u.timestamp);
            return userDate.toDateString() === today.toDateString();
          }).length
        };
        setUserStats(stats);
      }
    } catch (error) {
      toast.error('Erro ao carregar usuários');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  // Filtrar usuários
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Editar usuário
  const handleEditUser = (user) => {
    toast.success(`Editando usuário: ${user.nome}`);
    // Implementar modal de edição
  };

  // Remover usuário
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Tem certeza que deseja remover ${user.nome}?`)) {
      try {
        await UsuarioService.deleteUsuario(user.id);
        toast.success('Usuário removido com sucesso');
        loadUsers(currentPage);
      } catch (error) {
        toast.error('Erro ao remover usuário');
      }
    }
  };

  // Navegar páginas
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        {/* Header com filtros */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-hemera-navy-900 mb-2">
                Usuários
              </h2>
              <p className="text-hemera-blue-700 font-light">
                Visualize e gerencie os usuários do sistema
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex items-center space-x-2 bg-hemera-gold-400 hover:bg-hemera-gold-500 text-hemera-navy-900">
                <UserPlus className="h-4 w-4" />
                <span>Novo Usuário</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 border-hemera-blue-200 text-hemera-blue-700 hover:bg-hemera-blue-50">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <Card className="border border-hemera-blue-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Busca */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-600 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar por nome ou email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-hemera-blue-200 rounded-lg focus:ring-2 focus:ring-hemera-gold-400 focus:border-hemera-gold-400 bg-white"
                    />
                  </div>
                </div>

                {/* Filtro por role */}
                <div className="md:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-600 h-4 w-4" />
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-hemera-blue-200 rounded-lg focus:ring-2 focus:ring-hemera-gold-400 focus:border-hemera-gold-400 appearance-none bg-white"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de usuários */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hemera-gold-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <UserCard
                    user={user}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    showActions={currentUser?.role === 'admin'}
                  />
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}

        {/* Footer minimalista */}
        <footer className="bg-white border-t border-hemera-blue-100 py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-display text-2xl mb-2 text-hemera-navy-900">Hotel Hemera</h3>
            <p className="text-hemera-blue-700 font-light">© 2025. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Users;
