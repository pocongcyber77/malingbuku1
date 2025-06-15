const mongoose = require('mongoose');

const aktivitasSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
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

// Index untuk pencarian cepat
aktivitasSchema.index({ user_id: 1, created_at: -1 });
aktivitasSchema.index({ jenis_aktivitas: 1, created_at: -1 });

const Aktivitas = mongoose.model('Aktivitas', aktivitasSchema);

module.exports = Aktivitas; 