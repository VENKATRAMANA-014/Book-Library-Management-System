import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Online Library</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {token && <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>}
          {token && role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/add-book">Add Book</Link></li>}
          {token && role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>}
          {token && <li className="nav-item"><Link className="nav-link" to="/borrow-history">Borrow History</Link></li>}
          {token && role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/overdue">Overdue</Link></li>}
          {!token && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
          {!token && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
          {token && <li className="nav-item"><button className="btn btn-outline-light btn-sm ms-2" onClick={logout}>Logout</button></li>}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
