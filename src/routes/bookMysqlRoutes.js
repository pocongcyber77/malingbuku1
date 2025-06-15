const express = require('express');
const router = express.Router();
const BookMysqlController = require('../controllers/BookMysqlController');

router.get('/mysql', BookMysqlController.getAllBooks);

module.exports = router;