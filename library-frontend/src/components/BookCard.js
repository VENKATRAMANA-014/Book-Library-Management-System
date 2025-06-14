

import React from 'react'
import API from '../api/api'
import './BookCard.css'

const BookCard = ({ book }) => {
  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem('token')
      await API.post(`/borrow/${book._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Book borrowed')
      window.location.reload()
    } catch (err) {
      alert(err.response?.data?.message || 'Borrow failed')
    }
  }

  return (
    <div className="book-card card">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <p className="card-text">Available: {book.available ? 'Yes' : 'No'}</p>
        {book.available && (
          <button className="btn btn-primary" onClick={handleBorrow}>Borrow</button>
        )}
      </div>
    </div>
  )
}

export default BookCard
