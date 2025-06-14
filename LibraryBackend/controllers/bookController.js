const Book = require('../models/Book');
const Category = require('../models/Category');

// Admin: Add new book
const addBook = async (req, res) => {
  const { title, author, category, availableCopies } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ message: 'Invalid category' });

    const newBook = await Book.create({
      title,
      author,
      category,
      availableCopies,
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin: Update book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, availableCopies } = req.body;

  try {
    const updated = await Book.findByIdAndUpdate(
      id,
      { title, author, category, availableCopies },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin: Delete book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// User: Get all books (with search/filter)
const getBooks = async (req, res) => {
  const { title, category } = req.query;

  let query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' }; // case-insensitive
  }

  if (category) {
    query.category = category;
  }

  try {
    const books = await Book.find(query).populate('category');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// User: Get single book
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).populate('category');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookById,
};
