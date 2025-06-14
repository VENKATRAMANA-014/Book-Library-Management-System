

import React, { useEffect, useState } from 'react'
import API from '../api/api'
import BookCard from '../components/BookCard'
import './Books.css'

const Books = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')

  const getBooks = async () => {
    try {
      const res = await API.get('/books')
      setBooks(res.data)
    } catch (err) {
      alert('Failed to fetch books')
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const handleBorrow = async (bookId) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    try {
      await API.post('/borrow', { bookId, userId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Book borrowed successfully')
      getBooks()
    } catch (err) {
      alert(err.response?.data?.message || 'Borrow failed')
    }
  }

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="books-page container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Books</h3>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <BookCard book={book} onBorrow={handleBorrow} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books

