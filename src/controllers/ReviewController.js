const Review = require('../models/ReviewModel');
const Book = require('../models/BookModel');

class ReviewController {
  // Create new review
  static async createReview(req, res) {
    try {
      const { buku_id, rating, komentar } = req.body;
      const user_id = req.user.id;

      // Check if book exists
      const book = await Book.findById(buku_id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Buku tidak ditemukan'
        });
      }

      // Check if user already reviewed this book
      const existingReview = await Review.findOne({ user_id, buku_id });
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'Anda sudah mengulas buku ini'
        });
      }

      const review = new Review({
        user_id,
        buku_id,
        rating,
        komentar
      });

      await review.save();

      res.status(201).json({
        success: true,
        message: 'Ulasan berhasil dibuat',
        data: review
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Get reviews for a book
  static async getBookReviews(req, res) {
    try {
      const reviews = await Review.find({ buku_id: req.params.buku_id })
        .populate('user_id', 'nama')
        .sort({ created_at: -1 });

      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Update review
  static async updateReview(req, res) {
    try {
      const { rating, komentar } = req.body;
      const review = await Review.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        { rating, komentar },
        { new: true }
      ).populate('user_id', 'nama');

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Ulasan tidak ditemukan atau tidak diotorisasi'
        });
      }

      res.json({
        success: true,
        message: 'Ulasan berhasil diperbarui',
        data: review
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Delete review
  static async deleteReview(req, res) {
    try {
      const review = await Review.findOneAndDelete({
        _id: req.params.id,
        user_id: req.user.id
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Ulasan tidak ditemukan atau tidak diotorisasi'
        });
      }

      res.json({
        success: true,
        message: 'Ulasan berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Get user's reviews
  static async getUserReviews(req, res) {
    try {
      const reviews = await Review.find({ user_id: req.user.id })
        .populate('buku_id', 'judul penulis')
        .sort({ created_at: -1 });

      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }
}

module.exports = ReviewController; 