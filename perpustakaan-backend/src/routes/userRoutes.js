const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { auth } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validateUser');

// Public routes
router.post('/register', validateRegister, UserController.register);
router.post('/login', validateLogin, UserController.login);

// Protected routes
router.get('/profile', auth, UserController.getProfile);
router.put('/profile', auth, UserController.updateProfile);
router.delete('/account', auth, UserController.deleteAccount);

module.exports = router; 