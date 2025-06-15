const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  buku_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  komentar: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Index untuk pencarian cepat
reviewSchema.index({ buku_id: 1, user_id: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 