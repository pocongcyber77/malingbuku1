const { pool } = require('../config/mysql');

class Buku {
  static async create({ judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit }) {
    const [result] = await pool.execute(
      'INSERT INTO buku (judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM buku');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM buku WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit }) {
    const [result] = await pool.execute(
      'UPDATE buku SET judul = ?, penulis = ?, penerbit = ?, isbn = ?, kategori = ?, jumlah = ?, tahun_terbit = ? WHERE id = ?',
      [judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM buku WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async findByKategori(kategori) {
    const [rows] = await pool.execute('SELECT * FROM buku WHERE kategori = ?', [kategori]);
    return rows;
  }

  static async findByTahun(tahun) {
    const [rows] = await pool.execute('SELECT * FROM buku WHERE tahun_terbit = ?', [tahun]);
    return rows;
  }
}

module.exports = Buku; 