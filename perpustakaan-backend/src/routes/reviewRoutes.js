const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { auth } = require('../middlewares/auth');

// Public routes
router.get('/book/:bookId', ReviewController.getBookReviews);

// Protected routes
router.post('/book/:bookId', auth, ReviewController.createReview);
router.put('/:id', auth, ReviewController.updateReview);
router.delete('/:id', auth, ReviewController.deleteReview);
router.get('/user', auth, ReviewController.getUserReviews);

module.exports = router; 