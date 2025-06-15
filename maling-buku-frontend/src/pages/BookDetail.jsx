import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, komentar: '' });

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat detail buku');
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/book/${id}`);
      setReviews(res.data.data);
    } catch (err) {
      setError('Gagal memuat review');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reviews/book/${id}`, newReview, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNewReview({ rating: 5, komentar: '' });
      fetchReviews();
    } catch (err) {
      setError('Gagal menambahkan review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Buku tidak ditemukan</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Book Details */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{book.judul}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="mb-2"><strong>Penulis:</strong> {book.penulis}</p>
            <p className="mb-2"><strong>Tahun Terbit:</strong> {book.tahun_terbit}</p>
            <p className="mb-2"><strong>Kategori:</strong> {book.kategori}</p>
            <p className="mb-2"><strong>ISBN:</strong> {book.isbn}</p>
            <p className="mb-4"><strong>Deskripsi:</strong> {book.deskripsi}</p>
          </div>
          {book.cover_url && (
            <div>
              <img src={book.cover_url} alt={book.judul} className="max-w-full h-auto rounded-lg shadow" />
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        
        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="border p-2 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Bintang</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Komentar:</label>
            <textarea
              value={newReview.komentar}
              onChange={(e) => setNewReview({ ...newReview, komentar: e.target.value })}
              className="border p-2 rounded w-full"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Tambah Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="text-yellow-500">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <span className="ml-2 text-gray-600">
                  oleh {review.user_id.nama}
                </span>
              </div>
              <p className="text-gray-800">{review.komentar}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 