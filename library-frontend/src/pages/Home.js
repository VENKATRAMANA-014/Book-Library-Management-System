import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content text-center">
        <h1>Welcome to the Online Library</h1>
        <p>Explore a world of books, borrow them, and track your reading history easily.</p>
        <div className="home-buttons mt-4">
          <Link to="/books" className="btn btn-primary me-3">Browse Books</Link>
          <Link to="/login" className="btn btn-outline-secondary">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
