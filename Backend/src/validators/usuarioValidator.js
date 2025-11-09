const { body, validationResult } = require('express-validator');

// Validações para cadastro de usuário
const validateRegister = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim(),

  body('pronome')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Pronome deve ter no máximo 20 caracteres')
    .trim(),

  body('email')
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email deve ter no máximo 255 caracteres'),

  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),

  body('telefone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Telefone deve ter no máximo 20 caracteres')
    .matches(/^[\d\s\(\)\-\+]+$/)
    .withMessage('Telefone deve conter apenas números, espaços, parênteses, hífens e +'),

  body('data_nascimento')
    .optional()
    .isISO8601()
    .withMessage('Data de nascimento deve estar no formato YYYY-MM-DD')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        throw new Error('Usuário deve ter pelo menos 13 anos');
      }
      
      if (age > 120) {
        throw new Error('Data de nascimento inválida');
      }
      
      return true;
    }),

  body('cpf')
    .optional()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)
    .withMessage('CPF deve ter formato válido (000.000.000-00 ou 00000000000)')
    .custom((value) => {
      if (value) {
        // Remover formatação
        const cpf = value.replace(/\D/g, '');
        
        // Verificar se tem 11 dígitos
        if (cpf.length !== 11) {
          throw new Error('CPF deve ter 11 dígitos');
        }
        
        // Verificar se não são todos iguais
        if (/^(\d)\1{10}$/.test(cpf)) {
          throw new Error('CPF inválido');
        }
        
        // Validação básica do CPF
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) {
          throw new Error('CPF inválido');
        }
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10))) {
          throw new Error('CPF inválido');
        }
      }
      return true;
    })
];

// Validações para login
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),

  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 1 })
    .withMessage('Senha não pode estar vazia')
];

// Validações para atualização de usuário
const validateUpdate = [
  body('nome')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim(),

  body('pronome')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Pronome deve ter no máximo 20 caracteres')
    .trim(),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email deve ter no máximo 255 caracteres'),

  body('telefone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Telefone deve ter no máximo 20 caracteres')
    .matches(/^[\d\s\(\)\-\+]+$/)
    .withMessage('Telefone deve conter apenas números, espaços, parênteses, hífens e +'),

  body('data_nascimento')
    .optional()
    .isISO8601()
    .withMessage('Data de nascimento deve estar no formato YYYY-MM-DD')
    .custom((value) => {
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 13) {
          throw new Error('Usuário deve ter pelo menos 13 anos');
        }
        
        if (age > 120) {
          throw new Error('Data de nascimento inválida');
        }
      }
      return true;
    }),

  body('cpf')
    .optional()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)
    .withMessage('CPF deve ter formato válido (000.000.000-00 ou 00000000000)')
    .custom((value) => {
      if (value) {
        const cpf = value.replace(/\D/g, '');
        
        if (cpf.length !== 11) {
          throw new Error('CPF deve ter 11 dígitos');
        }
        
        if (/^(\d)\1{10}$/.test(cpf)) {
          throw new Error('CPF inválido');
        }
      }
      return true;
    })
];

// Validações para alteração de senha
const validateChangePassword = [
  body('senhaAtual')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),

  body('novaSenha')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),

  body('confirmarSenha')
    .custom((value, { req }) => {
      if (value !== req.body.novaSenha) {
        throw new Error('Confirmação de senha não confere');
      }
      return true;
    })
];

// Middleware para verificar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdate,
  validateChangePassword,
  handleValidationErrors
};
