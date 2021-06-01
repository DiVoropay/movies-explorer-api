const mongoose = require('mongoose');

const regexLink = /^http[s]?:\/\/[www.]*[\w-._~:/?#[\]@!$&'()*+,;=]+/;

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Неправильный формат ссылки {VALUE}',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Неправильный формат ссылки {VALUE}',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Неправильный формат ссылки {VALUE}',
    },
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
