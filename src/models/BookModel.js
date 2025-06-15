const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Judul buku wajib diisi'],
    trim: true,
  },
  penulis: {
    type: String,
    required: [true, 'Penulis wajib diisi'],
    trim: true,
  },
  isbn: {
    type: String,
    required: [true, 'ISBN wajib diisi'],
    unique: true,
    trim: true,
  },
  kategori: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    trim: true,
  },
  tahun_terbit: {
    type: Number,
    required: [true, 'Tahun terbit wajib diisi'],
  },
  deskripsi: {
    type: String,
  },
  cover_url: {
    type: String,
  },
  stok: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book; 