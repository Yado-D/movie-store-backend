
const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  genre: {
    type: String,
    required: true
  },
  releasedYear: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdBy: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.models.Movies || mongoose.model('Movies', moviesSchema);
