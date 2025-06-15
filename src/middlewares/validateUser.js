const { check, validationResult } = require('express-validator');

// Validation middleware for registration
const validateRegister = [
  check('nama')
    .notEmpty()
    .withMessage('Nama wajib diisi')
    .trim(),
  
  check('email')
    .notEmpty()
    .withMessage('Email wajib diisi')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),
  
  check('password')
    .notEmpty()
    .withMessage('Password wajib diisi')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter'),
  
  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation middleware for login
const validateLogin = [
  check('email')
    .notEmpty()
    .withMessage('Email wajib diisi')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),
  
  check('password')
    .notEmpty()
    .withMessage('Password wajib diisi'),
  
  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateRegister,
  validateLogin
}; 