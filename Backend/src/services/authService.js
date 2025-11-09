const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class AuthService {
  // Gerar hash da senha
  static async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verificar senha
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Gerar token JWT
  static generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  }

  // Verificar token JWT
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Registrar novo usuário
  static async register(userData) {
    const { email, senha, ...otherData } = userData;

    // Verificar se email já existe
    const existingUser = await Usuario.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Verificar se CPF já existe (se fornecido)
    if (otherData.cpf) {
      const existingCpf = await Usuario.findByCpf(otherData.cpf);
      if (existingCpf) {
        throw new Error('CPF já está em uso');
      }
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(senha);

    // Criar usuário
    const newUser = await Usuario.create({
      ...otherData,
      email,
      senha: hashedPassword
    });

    // Gerar token
    const token = this.generateToken(newUser);

    return {
      user: newUser.toJSON(),
      token
    };
  }

  // Login do usuário
  static async login(email, senha) {
    // Buscar usuário por email
    const user = await Usuario.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await this.comparePassword(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se usuário está ativo
    if (!user.active) {
      throw new Error('Usuário inativo');
    }

    // Gerar token
    const token = this.generateToken(user);

    return {
      user: user.toJSON(),
      token
    };
  }

  // Renovar token
  static async refreshToken(token) {
    try {
      const decoded = this.verifyToken(token);
      const user = await Usuario.findById(decoded.id);
      
      if (!user || !user.active) {
        throw new Error('Usuário não encontrado ou inativo');
      }

      const newToken = this.generateToken(user);
      return {
        user: user.toJSON(),
        token: newToken
      };
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Alterar senha
  static async changePassword(userId, currentPassword, newPassword) {
    const user = await Usuario.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await this.comparePassword(currentPassword, user.senha);
    if (!isCurrentPasswordValid) {
      throw new Error('Senha atual incorreta');
    }

    // Hash da nova senha
    const hashedNewPassword = await this.hashPassword(newPassword);

    // Atualizar senha no banco
    const query = 'UPDATE usuario SET senha = $1 WHERE id = $2';
    const pool = require('../config/database');
    
    try {
      await pool.query(query, [hashedNewPassword, userId]);
      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw new Error('Erro ao alterar senha');
    }
  }

  // Reset de senha (implementação básica)
  static async resetPassword(email) {
    const user = await Usuario.findByEmail(email);
    if (!user) {
      throw new Error('Email não encontrado');
    }

    // Aqui você implementaria a lógica de envio de email
    // Por enquanto, apenas retornamos uma mensagem
    return { 
      message: 'Instruções de reset de senha enviadas para o email',
      email: user.email 
    };
  }
}

module.exports = AuthService;
