import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/api'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/register', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form shadow">
        <h2 className="mb-4 text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label>Name</label>
          <input type="text" required className="form-control" name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" required className="form-control" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" required className="form-control" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  )
}

export default Register
