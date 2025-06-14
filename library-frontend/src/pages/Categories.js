import React, { useState, useEffect } from 'react'
import API from '../api/api'
import './Categories.css'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)

  const fetchCategories = async () => {
    const res = await API.get('/categories')
    setCategories(res.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (editId) {
      await API.put(`/categories/${editId}`, { name })
    } else {
      await API.post('/categories', { name })
    }
    setName('')
    setEditId(null)
    fetchCategories()
  }

  const handleEdit = (category) => {
    setEditId(category._id)
    setName(category.name)
  }

  const handleDelete = async (id) => {
    await API.delete(`/categories/${id}`)
    fetchCategories()
  }

  return (
    <div className="categories-container container">
      <h2 className="text-center mb-4">Manage Categories</h2>
      <form onSubmit={handleAdd} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <ul className="list-group">
        {categories.map((cat) => (
          <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
            {cat.name}
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(cat)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
