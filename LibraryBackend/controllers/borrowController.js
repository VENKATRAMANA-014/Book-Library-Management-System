const Borrow = require('../models/Borrow')
const Book = require('../models/Book')
const mongoose = require('mongoose')

// User borrows a book
const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.bookId
    const userId = req.user._id

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' })
    }

    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    if (!book.available) return res.status(400).json({ message: 'Book not available' })

    const borrow = new Borrow({
      user: userId,
      book: bookId,
      borrowedDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returnDate: null
    })

    book.available = false
    await borrow.save()
    await book.save()

    res.status(201).json({ message: 'Book borrowed successfully', borrow })
  } catch (error) {
    res.status(500).json({ message: 'Borrow failed', error: error.message })
  }
}

// User returns a book
const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id)
    if (!borrow || borrow.returnDate) {
      return res.status(404).json({ message: 'Borrow record not found or already returned' })
    }

    borrow.returnDate = new Date()
    await borrow.save()

    const book = await Book.findById(borrow.book)
    book.available = true
    await book.save()

    res.status(200).json({ message: 'Book returned successfully', borrow })
  } catch (error) {
    res.status(500).json({ message: 'Return failed', error: error.message })
  }
}

// User's borrow history
const getBorrowHistory = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id })
      .populate('book')
      .sort({ borrowedDate: -1 })

    res.json(borrows)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history', error: error.message })
  }
}

// User's overdue books
const getMyOverdueBooks = async (req, res) => {
  try {
    const overdue = await Borrow.find({
      user: req.user._id,
      dueDate: { $lt: new Date() },
      returnDate: null
    }).populate('book')

    res.json(overdue)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overdue books', error: error.message })
  }
}

// Admin: All overdue books
const getAllOverdueBooks = async (req, res) => {
  try {
    const overdue = await Borrow.find({
      dueDate: { $lt: new Date() },
      returnDate: null
    }).populate('book user')

    res.json(overdue)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overdue books', error: error.message })
  }
}

module.exports = {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getMyOverdueBooks,
  getAllOverdueBooks
}
