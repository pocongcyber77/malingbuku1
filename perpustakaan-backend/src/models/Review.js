const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    ref: 'User'
  },
  buku_id: {
    type: Number,
    required: true,
    ref: 'Buku'
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

module.exports = mongoose.model('Review', reviewSchema); 