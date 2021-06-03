const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  const currentUserId = req.user._id;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: currentUserId })
    .then((createdMovie) => res.send(createdMovie))
    .catch(next);
};

module.exports.getMoviesByOwner = (req, res, next) => {
  const currentUserId = req.user._id;

  Movie.find({ owner: currentUserId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  const currentUserId = req.user._id;
  const movieId = req.params.movieId;

  Movie.find({ _id: movieId, owner: currentUserId })
    .orFail(() => {throw new NotFoundError('Фильм по запросу не найден')})
    .then((movie) => {
      Movie.findByIdAndDelete({ _id: movieId })
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};