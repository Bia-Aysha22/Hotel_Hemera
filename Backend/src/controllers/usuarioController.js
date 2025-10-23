const Usuario = require('../models/Usuario');

class UsuarioController {
  // Listar todos os usuários
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await Usuario.findAll(page, limit);
      
      res.json({
        success: true,
        message: 'Usuários listados com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Buscar usuário por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Usuário encontrado',
        data: usuario
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Buscar usuário por email
  static async getByEmail(req, res) {
    try {
      const { email } = req.params;
      const usuario = await Usuario.findByEmail(email);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Usuário encontrado',
        data: usuario
      });
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Atualizar usuário
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      // Verificar se email já existe (se estiver sendo alterado)
      if (updateData.email && updateData.email !== usuario.email) {
        const existingUser = await Usuario.findByEmail(updateData.email);
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }
      
      // Verificar se CPF já existe (se estiver sendo alterado)
      if (updateData.cpf && updateData.cpf !== usuario.cpf) {
        const existingCpf = await Usuario.findByCpf(updateData.cpf);
        if (existingCpf) {
          return res.status(409).json({
            success: false,
            message: 'CPF já está em uso'
          });
        }
      }
      
      const updatedUsuario = await usuario.update(updateData);
      
      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: updatedUsuario
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      
      if (error.message.includes('Nenhum campo válido')) {
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

  // Soft delete (marcar como inativo)
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user.id;
      
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      await usuario.softDelete(deletedBy);
      
      res.json({
        success: true,
        message: 'Usuário removido com sucesso'
      });
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Buscar perfil do usuário logado
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const usuario = await Usuario.findById(userId);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Perfil encontrado',
        data: usuario
      });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Atualizar perfil do usuário logado
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      
      const usuario = await Usuario.findById(userId);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      // Verificar se email já existe (se estiver sendo alterado)
      if (updateData.email && updateData.email !== usuario.email) {
        const existingUser = await Usuario.findByEmail(updateData.email);
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }
      
      // Verificar se CPF já existe (se estiver sendo alterado)
      if (updateData.cpf && updateData.cpf !== usuario.cpf) {
        const existingCpf = await Usuario.findByCpf(updateData.cpf);
        if (existingCpf) {
          return res.status(409).json({
            success: false,
            message: 'CPF já está em uso'
          });
        }
      }
      
      const updatedUsuario = await usuario.update(updateData);
      
      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: updatedUsuario
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = UsuarioController;
