const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/auth');
const Buku = require('../models/Buku');
const Peminjaman = require('../models/Peminjaman');

// Add new book
router.post('/books', adminAuth, async (req, res) => {
  try {
    const { judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit } = req.body;
    const bookId = await Buku.create({ 
      judul, 
      penulis, 
      penerbit, 
      isbn, 
      kategori, 
      jumlah, 
      tahun_terbit 
    });
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: { id: bookId }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update book
router.put('/books/:id', adminAuth, async (req, res) => {
  try {
    const { judul, penulis, penerbit, isbn, kategori, jumlah, tahun_terbit } = req.body;
    const success = await Buku.update(req.params.id, { 
      judul, 
      penulis, 
      penerbit, 
      isbn, 
      kategori, 
      jumlah, 
      tahun_terbit 
    });
    if (!success) {
      throw new Error('Book not found');
    }
    res.json({
      success: true,
      message: 'Book updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete book
router.delete('/books/:id', adminAuth, async (req, res) => {
  try {
    const success = await Buku.delete(req.params.id);
    if (!success) {
      throw new Error('Book not found');
    }
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all borrowings
router.get('/borrowings', adminAuth, async (req, res) => {
  try {
    const borrowings = await Peminjaman.findAll();
    res.json({
      success: true,
      data: borrowings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update borrowing status
router.put('/borrowings/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const success = await Peminjaman.updateStatus(req.params.id, status);
    if (!success) {
      throw new Error('Borrowing record not found');
    }
    res.json({
      success: true,
      message: 'Borrowing status updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 