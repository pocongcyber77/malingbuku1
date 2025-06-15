import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, searchQuery]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3000/api/books';
      const params = new URLSearchParams();
      
      if (selectedCategory !== 'all') {
        params.append('kategori', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await axios.get(`${url}?${params.toString()}`);
      setBooks(response.data.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data buku');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'novel', 'teknologi', 'pendidikan'];

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Buku</h1>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'Semua Kategori' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Cari buku..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{book.judul}</h2>
            <p className="text-gray-600 mb-2">Penulis: {book.penulis}</p>
            <p className="text-gray-600 mb-2">ISBN: {book.isbn}</p>
            <p className="text-gray-600 mb-2">Kategori: {book.kategori}</p>
            <p className="text-gray-600 mb-2">Tahun Terbit: {book.tahun_terbit}</p>
            <p className="text-gray-600 mb-2">Stok: {book.stok}</p>
            <p className="text-gray-700 mt-2">{book.deskripsi}</p>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Tidak ada buku yang ditemukan
        </div>
      )}
    </div>
  );
};

export default BookList; 