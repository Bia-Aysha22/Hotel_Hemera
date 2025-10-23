const AuthService = require('../services/authService');

class AuthController {
  // Cadastro de usuário
  static async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      if (error.message.includes('já está em uso')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Login de usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const result = await AuthService.login(email, senha);
      
      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no login:', error);
      
      if (error.message.includes('Credenciais inválidas') || 
          error.message.includes('Usuário inativo')) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Renovar token
  static async refreshToken(req, res) {
    try {
      const { token } = req.body;
      const result = await AuthService.refreshToken(token);
      
      res.json({
        success: true,
        message: 'Token renovado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      
      res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }
  }

  // Alterar senha
  static async changePassword(req, res) {
    try {
      const { senhaAtual, novaSenha } = req.body;
      const userId = req.user.id;
      
      await AuthService.changePassword(userId, senhaAtual, novaSenha);
      
      res.json({
        success: true,
        message: 'Senha alterada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      
      if (error.message.includes('Senha atual incorreta')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Reset de senha
  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await AuthService.resetPassword(email);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Erro no reset de senha:', error);
      
      if (error.message.includes('Email não encontrado')) {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Logout (invalidar token - implementação básica)
  static async logout(req, res) {
    try {
      // Em uma implementação mais robusta, você manteria uma blacklist de tokens
      res.json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = AuthController;
