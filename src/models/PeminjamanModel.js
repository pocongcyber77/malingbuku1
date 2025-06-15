const mongoose = require('mongoose');

const peminjamanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  buku_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  tanggal_pinjam: {
    type: Date,
    default: Date.now,
  },
  tanggal_kembali: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['dipinjam', 'dikembalikan', 'terlambat'],
    default: 'dipinjam',
  },
}, {
  timestamps: true,
});

const Peminjaman = mongoose.model('Peminjaman', peminjamanSchema);

module.exports = Peminjaman; 