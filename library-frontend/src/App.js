import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Categories from './pages/Categories';
import BorrowHistory from './pages/BorrowHistory';
import Overdue from './pages/Overdue';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/history" element={<BorrowHistory />} />
        <Route path="/overdue" element={<Overdue />} />
      </Routes>
    </Router>
  );
};

export default App;
