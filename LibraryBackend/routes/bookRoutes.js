const express = require('express');
const router = express.Router();
const {
  addBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookById,
} = require('../controllers/bookController');

const authMiddleware = require('../middleware/authMiddleware'); // ✅ Correct
const { adminOnly } = require('../middleware/roleMiddleware');

// Public/User Routes
router.get('/', getBooks);
router.get('/:id', getBookById);

// Admin Routes (Protected)
router.post('/', authMiddleware, adminOnly, addBook);
router.put('/:id', authMiddleware, adminOnly, updateBook);
router.delete('/:id', authMiddleware, adminOnly, deleteBook);

module.exports = router;
