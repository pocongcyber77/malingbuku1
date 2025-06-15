const { pool } = require('../config/mysql');

class Peminjaman {
  static async create({ user_id, buku_id, tanggal_pinjam, tanggal_kembali, status = 'dipinjam' }) {
    const [result] = await pool.execute(
      'INSERT INTO peminjaman (user_id, buku_id, tanggal_pinjam, tanggal_kembali, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, buku_id, tanggal_pinjam, tanggal_kembali, status]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, u.username, b.judul as buku_judul 
      FROM peminjaman p 
      JOIN users u ON p.user_id = u.id 
      JOIN buku b ON p.buku_id = b.id
    `);
    return rows;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(`
      SELECT p.*, b.judul as buku_judul 
      FROM peminjaman p 
      JOIN buku b ON p.buku_id = b.id 
      WHERE p.user_id = ?
    `, [userId]);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE peminjaman SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Peminjaman; 