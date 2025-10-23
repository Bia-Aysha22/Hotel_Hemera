import api from './api';

class AuthService {
  // Cadastrar usuário
  static async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login do usuário
  static async login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      // Salvar token e dados do usuário no localStorage
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout
  static async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpar dados do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Alterar senha
  static async changePassword(senhaAtual, novaSenha) {
    try {
      const response = await api.post('/auth/change-password', {
        senhaAtual,
        novaSenha,
        confirmarSenha: novaSenha
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset de senha
  static async resetPassword(email) {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Renovar token
  static async refreshToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.post('/auth/refresh-token', { token });
      
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verificar se usuário está autenticado
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Obter dados do usuário logado
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Obter token
  static getToken() {
    return localStorage.getItem('token');
  }

  // Tratar erros da API
  static handleError(error) {
    if (error.response) {
      // Erro com resposta do servidor
      const message = error.response.data?.message || 'Erro no servidor';
      const status = error.response.status;
      
      return {
        message,
        status,
        details: error.response.data?.errors || null
      };
    } else if (error.request) {
      // Erro de rede
      return {
        message: 'Erro de conexão. Verifique sua internet.',
        status: 0,
        details: null
      };
    } else {
      // Outros erros
      return {
        message: error.message || 'Erro desconhecido',
        status: 0,
        details: null
      };
    }
  }
}

export default AuthService;
