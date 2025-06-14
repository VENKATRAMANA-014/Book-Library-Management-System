// const mongoose = require('mongoose');

// const borrowSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   book: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Book',
//     required: true,
//   },
//   borrowedDate: { type: Date, default: Date.now },
//   returnDate: { type: Date },
//   dueDate: { type: Date, required: true },
//   isReturned: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('Borrow', borrowSchema);


const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Borrow', borrowSchema)


