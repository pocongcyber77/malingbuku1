const express = require('express');
const BookController = require('../controllers/BookController');
const { auth, adminAuth } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { createBookSchema, updateBookSchema } = require('../validators/bookValidator');

const router = express.Router();

// Public routes
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.get('/search', BookController.searchBooks);
router.get('/category/:category', BookController.getBooksByCategory);
router.get('/year/:year', BookController.getBooksByYear);

// Admin routes
router.post('/', auth, adminAuth, validate(createBookSchema), BookController.createBook);
router.put('/:id', auth, adminAuth, validate(updateBookSchema), BookController.updateBook);
router.delete('/:id', auth, adminAuth, BookController.deleteBook);

module.exports = router; 