const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validateRegister, validateLogin, validateChangePassword, handleValidationErrors } = require('../validators/usuarioValidator');
const { authenticateToken } = require('../middleware/auth');

// Rotas de autenticação
router.post('/register', validateRegister, handleValidationErrors, AuthController.register);
router.post('/login', validateLogin, handleValidationErrors, AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', authenticateToken, AuthController.logout);
router.post('/change-password', authenticateToken, validateChangePassword, handleValidationErrors, AuthController.changePassword);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
