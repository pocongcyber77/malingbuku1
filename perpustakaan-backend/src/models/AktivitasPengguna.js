const mongoose = require('mongoose');

const aktivitasPenggunaSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    ref: 'User'
  },
  jenis_aktivitas: {
    type: String,
    required: true,
    enum: ['login', 'pinjam_buku', 'kembalikan_buku', 'review_buku', 'update_profil']
  },
  detail: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AktivitasPengguna', aktivitasPenggunaSchema); 