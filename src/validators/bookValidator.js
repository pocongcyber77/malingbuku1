const { check } = require('express-validator');

const createBookSchema = [
  check('judul')
    .notEmpty()
    .withMessage('Judul buku wajib diisi')
    .trim(),
  check('penulis')
    .notEmpty()
    .withMessage('Penulis wajib diisi')
    .trim(),
  check('isbn')
    .notEmpty()
    .withMessage('ISBN wajib diisi')
    .isLength({ min: 10, max: 13 })
    .withMessage('ISBN harus antara 10 dan 13 karakter')
    .isNumeric()
    .withMessage('ISBN harus berupa angka')
    .trim(),
  check('kategori')
    .notEmpty()
    .withMessage('Kategori wajib diisi')
    .trim(),
  check('tahun_terbit')
    .notEmpty()
    .withMessage('Tahun terbit wajib diisi')
    .isNumeric()
    .withMessage('Tahun terbit harus berupa angka')
    .isLength({ min: 4, max: 4 })
    .withMessage('Tahun terbit harus 4 digit'),
  check('deskripsi')
    .optional()
    .trim(),
  check('cover_url')
    .optional()
    .isURL()
    .withMessage('Format URL cover tidak valid')
    .trim(),
];

const updateBookSchema = [
  check('judul')
    .optional()
    .trim(),
  check('penulis')
    .optional()
    .trim(),
  check('isbn')
    .optional()
    .isLength({ min: 10, max: 13 })
    .withMessage('ISBN harus antara 10 dan 13 karakter')
    .isNumeric()
    .withMessage('ISBN harus berupa angka')
    .trim(),
  check('kategori')
    .optional()
    .trim(),
  check('tahun_terbit')
    .optional()
    .isNumeric()
    .withMessage('Tahun terbit harus berupa angka')
    .isLength({ min: 4, max: 4 })
    .withMessage('Tahun terbit harus 4 digit'),
  check('deskripsi')
    .optional()
    .trim(),
  check('cover_url')
    .optional()
    .isURL()
    .withMessage('Format URL cover tidak valid')
    .trim(),
];

module.exports = {
  createBookSchema,
  updateBookSchema,
}; 