const Book = require('../models/BookModel');
const pool = require('../config/mysql');

class BookController {
  // Get all books
  static async getAllBooks(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM buku');
      res.json({ success: true, data: rows });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // Get book by ID
  static async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Buku tidak ditemukan'
        });
      }
      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Create new book
  static async createBook(req, res) {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Buku berhasil ditambahkan',
        data: book
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Gagal menambahkan buku',
        error: error.message
      });
    }
  }

  // Update book
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { judul, penulis, isbn, kategori, tahun_terbit, deskripsi, cover_url, stok } = req.body;

      const updatedBook = await Book.findByIdAndUpdate(id, {
        judul,
        penulis,
        isbn,
        kategori,
        tahun_terbit,
        deskripsi,
        cover_url,
        stok
      }, { new: true });

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: 'Buku tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Buku berhasil diperbarui',
        data: updatedBook
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Delete book
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({
          success: false,
          message: 'Buku tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Buku berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Search books
  static async searchBooks(req, res) {
    try {
      const { q } = req.query;
      const books = await Book.find({
        $or: [
          { judul: { $regex: q, $options: 'i' } },
          { penulis: { $regex: q, $options: 'i' } },
          { kategori: { $regex: q, $options: 'i' } },
          { isbn: { $regex: q, $options: 'i' } },
        ],
      });

      res.json({
        success: true,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Get books by category
  static async getBooksByCategory(req, res) {
    try {
      const { category } = req.params;
      const books = await Book.find({ kategori: category });
      res.json({
        success: true,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }

  // Get books by year
  static async getBooksByYear(req, res) {
    try {
      const { year } = req.params;
      const books = await Book.find({ tahun_terbit: year });
      res.json({
        success: true,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  }
}

module.exports = BookController; 