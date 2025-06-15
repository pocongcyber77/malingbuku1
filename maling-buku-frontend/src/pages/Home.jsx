import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const categories = [
    'Fiksi Sejarah',
    'Fiksi',
    'Pengembangan Diri',
    'Non-Fiksi',
    'Religi',
    'Sains',
    'Anak-anak',
    'Seksualitas'
  ];

  const years = Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => 2021 + i);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchQuery, selectedCategory, selectedYear]);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data);
      setFilteredBooks(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat data buku');
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...books];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.judul.toLowerCase().includes(query) ||
        book.penulis.toLowerCase().includes(query) ||
        book.kategori.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(book => 
        book.kategori === selectedCategory
      );
    }

    // Apply year filter
    if (selectedYear) {
      result = result.filter(book => 
        book.tahun_terbit === parseInt(selectedYear)
      );
    }

    setFilteredBooks(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleYearFilter = (year) => {
    setSelectedYear(year === selectedYear ? '' : year);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedYear('');
    setFilteredBooks(books);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 p-4">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari buku berdasarkan judul, penulis, atau kategori..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedCategory || selectedYear) && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-gray-600">Filter aktif:</span>
          {searchQuery && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              Pencarian: {searchQuery}
            </span>
          )}
          {selectedCategory && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              Kategori: {selectedCategory}
            </span>
          )}
          {selectedYear && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              Tahun: {selectedYear}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Hapus semua filter
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tahun Terbit</h3>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearFilter(year)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedYear === year
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Menampilkan {filteredBooks.length} dari {books.length} buku
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{book.judul}</h3>
                <p className="text-gray-600 mb-2">Oleh: {book.penulis}</p>
                <p className="text-sm text-gray-500">Tahun: {book.tahun_terbit}</p>
                <p className="text-sm text-gray-500 mb-4">Kategori: {book.kategori}</p>
                <Link
                  to={`/books/${book.id}`}
                  className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
} 