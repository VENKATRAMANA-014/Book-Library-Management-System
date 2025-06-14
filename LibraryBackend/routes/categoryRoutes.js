const express = require('express');
const router = express.Router();

const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const authMiddleware = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// Public route: Get all categories
router.get('/', getCategories);

// Admin-only routes
router.post('/', authMiddleware, adminOnly, addCategory);
router.put('/:id', authMiddleware, adminOnly, updateCategory);
router.delete('/:id', authMiddleware, adminOnly, deleteCategory);

module.exports = router;
