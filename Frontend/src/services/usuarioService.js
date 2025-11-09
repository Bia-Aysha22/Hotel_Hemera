import api from './api';

class UsuarioService {
  // Listar usuários
  static async getUsuarios(page = 1, limit = 10) {
    try {
      const response = await api.get(`/usuarios?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar usuário por ID
  static async getUsuarioById(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar usuário por email
  static async getUsuarioByEmail(email) {
    try {
      const response = await api.get(`/usuarios/email/${email}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obter perfil do usuário logado
  static async getProfile() {
    try {
      const response = await api.get('/usuarios/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Atualizar perfil do usuário logado
  static async updateProfile(userData) {
    try {
      const response = await api.put('/usuarios/profile', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Atualizar usuário por ID
  static async updateUsuario(id, userData) {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Remover usuário (soft delete)
  static async deleteUsuario(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Tratar erros da API
  static handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'Erro no servidor';
      const status = error.response.status;
      
      return {
        message,
        status,
        details: error.response.data?.errors || null
      };
    } else if (error.request) {
      return {
        message: 'Erro de conexão. Verifique sua internet.',
        status: 0,
        details: null
      };
    } else {
      return {
        message: error.message || 'Erro desconhecido',
        status: 0,
        details: null
      };
    }
  }
}

export default UsuarioService;
