const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
  imgUrl: String,
  duration: Number,
  rating: Number
});

module.exports = mongoose.model('Movie', movieSchema);