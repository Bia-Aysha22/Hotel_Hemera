const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validateUpdate, handleValidationErrors } = require('../validators/usuarioValidator');
const { authenticateToken, authorizeUser } = require('../middleware/auth');

// Rotas de usuários
router.get('/', authenticateToken, UsuarioController.getAll);
router.get('/profile', authenticateToken, UsuarioController.getProfile);
router.get('/:id', authenticateToken, authorizeUser, UsuarioController.getById);
router.get('/email/:email', authenticateToken, UsuarioController.getByEmail);
router.put('/profile', authenticateToken, validateUpdate, handleValidationErrors, UsuarioController.updateProfile);
router.put('/:id', authenticateToken, authorizeUser, validateUpdate, handleValidationErrors, UsuarioController.update);
router.delete('/:id', authenticateToken, authorizeUser, UsuarioController.delete);

module.exports = router;
