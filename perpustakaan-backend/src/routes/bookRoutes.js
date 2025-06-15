const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const { auth, adminAuth } = require('../middlewares/auth');

// Public routes
router.get('/', BookController.getAllBooks);
router.get('/search', BookController.searchBooks);
router.get('/category/:category', BookController.getBooksByCategory);
router.get('/year/:year', BookController.getBooksByYear);
router.get('/:id', BookController.getBookById);

// Protected routes (admin only)
router.post('/', adminAuth, BookController.createBook);
router.put('/:id', adminAuth, BookController.updateBook);
router.delete('/:id', adminAuth, BookController.deleteBook);

module.exports = router; 