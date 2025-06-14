import React, { useState, useEffect } from 'react'
import API from '../api/api'
import './AddBook.css'

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    availableCopies: 1
  })
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')

  const fetchCategories = async () => {
    const res = await API.get('/categories')
    setCategories(res.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'availableCopies' ? parseInt(value) : value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const token = localStorage.getItem('token') 
    await API.post('/books', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setMessage('Book added successfully')
    setFormData({ title: '', author: '', category: '', availableCopies: 1 })
  } catch (err) {
    setMessage('Failed to add book')
  }
}


  return (
    <div className="add-book-container">
      <form onSubmit={handleSubmit} className="add-book-form shadow">
        <h2 className="mb-4 text-center">Add New Book</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label>Title</label>
          <input type="text" required className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input type="text" required className="form-control" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select className="form-select" name="category" required value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Available Copies</label>
          <input type="number" min="1" required className="form-control" name="availableCopies" value={formData.availableCopies} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100">Add Book</button>
      </form>
    </div>
  )
}

export default AddBook
