const express = require('express')
const router = express.Router()
const {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getMyOverdueBooks,
  getAllOverdueBooks
} = require('../controllers/borrowController')

const authMiddleware = require('../middleware/authMiddleware')
const { adminOnly } = require('../middleware/roleMiddleware')

// Borrow book
router.post('/borrow/:bookId', authMiddleware, borrowBook)

// Return book
router.put('/return/:id', authMiddleware, returnBook)

// User: Get borrow history
router.get('/history', authMiddleware, getBorrowHistory)

// User: Get overdue books
router.get('/overdue', authMiddleware, getMyOverdueBooks)

// Admin: Get all overdue books
router.get('/admin/overdue', authMiddleware, adminOnly, getAllOverdueBooks)

module.exports = router
