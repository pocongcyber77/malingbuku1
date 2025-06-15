const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validateUser');

// Public routes
router.post('/register', validateRegister, UserController.register);
router.post('/login', validateLogin, UserController.login);

// Protected routes
router.get('/profile', auth, UserController.getProfile);
router.put('/profile', auth, UserController.updateProfile);
router.delete('/account', auth, UserController.deleteAccount);

// Admin routes
router.put('/:userId/role', auth, adminAuth, UserController.updateRole);

module.exports = router; 