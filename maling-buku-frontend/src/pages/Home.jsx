import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat data buku');
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/books/search?q=${searchQuery}`);
      setBooks(res.data.data);
    } catch (err) {
      setError('Gagal mencari buku');
    }
  };

  const handleCategoryFilter = async (category) => {
    try {
      const res = await api.get(`/books/category/${category}`);
      setBooks(res.data.data);
      setSelectedCategory(category);
    } catch (err) {
      setError('Gagal memfilter kategori');
    }
  };

  const handleYearFilter = async (year) => {
    try {
      const res = await api.get(`/books/year/${year}`);
      setBooks(res.data.data);
      setSelectedYear(year);
    } catch (err) {
      setError('Gagal memfilter tahun');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Daftar Buku</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cari
        </button>
      </form>

      {/* Filters */}
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="font-bold mb-2">Filter Kategori:</h3>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Semua Kategori</option>
            <option value="novel">Novel</option>
            <option value="pendidikan">Pendidikan</option>
            <option value="teknologi">Teknologi</option>
          </select>
        </div>

        <div>
          <h3 className="font-bold mb-2">Filter Tahun:</h3>
          <select
            value={selectedYear}
            onChange={(e) => handleYearFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Semua Tahun</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold mb-2">{book.judul}</h2>
            <p className="text-gray-600 mb-2">Penulis: {book.penulis}</p>
            <p className="text-gray-600 mb-2">Tahun: {book.tahun_terbit}</p>
            <p className="text-gray-600 mb-4">Kategori: {book.kategori}</p>
            <Link
              to={`/books/${book._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 