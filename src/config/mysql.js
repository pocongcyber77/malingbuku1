const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'perpustakaan_user',
  password: 'password900900', // ganti dengan password sesuai DBeaver Anda
  database: 'perpustakaan_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;