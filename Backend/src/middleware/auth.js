const AuthService = require('../services/authService');

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acesso necessário'
    });
  }

  try {
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
};

// Middleware para verificar se é admin (se necessário)
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Permissões de administrador necessárias.'
    });
  }
  next();
};

// Middleware para verificar se o usuário pode acessar seus próprios dados
const authorizeUser = (req, res, next) => {
  const userId = req.params.id || req.params.userId;
  
  if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Você só pode acessar seus próprios dados.'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  authorizeUser
};
