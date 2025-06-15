const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    unique: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Kategori', kategoriSchema); 