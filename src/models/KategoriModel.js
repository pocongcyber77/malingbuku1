const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    unique: true,
    trim: true
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

// Index untuk pencarian cepat
kategoriSchema.index({ nama: 1 });

const Kategori = mongoose.model('Kategori', kategoriSchema);

module.exports = Kategori; 