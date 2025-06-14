// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true,
//   },
//   availableCopies: { type: Number, default: 1 },
// });

// module.exports = mongoose.model('Book', bookSchema);


const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', bookSchema);
