const pool = require('../config/database');

class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.pronome = data.pronome;
    this.senha = data.senha;
    this.email = data.email;
    this.telefone = data.telefone;
    this.data_nascimento = data.data_nascimento;
    this.cpf = data.cpf;
    this.timestamp = data.timestamp;
    this.active = data.active;
    this.deleteAt = data.deleteAt;
    this.deleteBy = data.deleteBy;
  }

  // Criar usuário
  static async create(usuarioData) {
    const {
      nome,
      pronome,
      senha,
      email,
      telefone,
      data_nascimento,
      cpf
    } = usuarioData;

    const query = `
      INSERT INTO usuario (nome, pronome, senha, email, telefone, data_nascimento, cpf)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [nome, pronome, senha, email, telefone, data_nascimento, cpf];
    
    try {
      const result = await pool.query(query, values);
      return new Usuario(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    const query = 'SELECT * FROM usuario WHERE id = $1 AND active = true';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows.length > 0 ? new Usuario(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM usuario WHERE email = $1 AND active = true';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows.length > 0 ? new Usuario(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por CPF
  static async findByCpf(cpf) {
    const query = 'SELECT * FROM usuario WHERE cpf = $1 AND active = true';
    
    try {
      const result = await pool.query(query, [cpf]);
      return result.rows.length > 0 ? new Usuario(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Listar todos os usuários (com paginação)
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM usuario 
      WHERE active = true 
      ORDER BY timestamp DESC 
      LIMIT $1 OFFSET $2
    `;
    
    const countQuery = 'SELECT COUNT(*) FROM usuario WHERE active = true';
    
    try {
      const [result, countResult] = await Promise.all([
        pool.query(query, [limit, offset]),
        pool.query(countQuery)
      ]);
      
      return {
        usuarios: result.rows.map(row => new Usuario(row)),
        total: parseInt(countResult.rows[0].count),
        page,
        limit,
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
      };
    } catch (error) {
      throw error;
    }
  }

  // Atualizar usuário
  async update(updateData) {
    const allowedFields = ['nome', 'pronome', 'email', 'telefone', 'data_nascimento', 'cpf'];
    const updates = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (updates.length === 0) {
      throw new Error('Nenhum campo válido para atualização');
    }

    values.push(this.id);
    const query = `
      UPDATE usuario 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} AND active = true
      RETURNING *
    `;

    try {
      const result = await pool.query(query, values);
      if (result.rows.length > 0) {
        Object.assign(this, result.rows[0]);
        return this;
      }
      throw new Error('Usuário não encontrado');
    } catch (error) {
      throw error;
    }
  }

  // Soft delete (marcar como inativo)
  async softDelete(deletedBy) {
    const query = `
      UPDATE usuario 
      SET active = false, deleteAt = NOW(), deleteBy = $1 
      WHERE id = $2 AND active = true
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [deletedBy, this.id]);
      if (result.rows.length > 0) {
        this.active = false;
        this.deleteAt = result.rows[0].deleteAt;
        this.deleteBy = result.rows[0].deleteBy;
        return this;
      }
      throw new Error('Usuário não encontrado');
    } catch (error) {
      throw error;
    }
  }

  // Remover dados sensíveis antes de retornar
  toJSON() {
    const { senha, ...usuarioSemSenha } = this;
    return usuarioSemSenha;
  }
}

module.exports = Usuario;
