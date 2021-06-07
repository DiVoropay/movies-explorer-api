const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');
const BadRequestError = require('../errors/bad-request-error');

const handlerError = (err) => {
  switch (err.name) {
    case 'ValidationError':
      return new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
    case 'CastError':
      return new BadRequestError(`Ошибка запроса ${err.message}`);
    default: return err;
  }
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const currentUserId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: currentUserId,
  })
    .then((createdMovie) => {
      const movieWithoutOwner = createdMovie;
      movieWithoutOwner.owner = undefined;

      res.send(movieWithoutOwner);
    })
    .catch((err) => next(handlerError(err)));
};

module.exports.getMoviesByOwner = (req, res, next) => {
  const currentUserId = req.user._id;

  Movie.find({ owner: currentUserId })
    .then((movies) => res.send(movies))
    .catch((err) => next(handlerError(err)));
};

module.exports.removeMovie = (req, res, next) => {
  const currentUserId = req.user._id;
  const { movieId } = req.params;

  Movie.findById({ _id: movieId }).select('+owner')
    .orFail(() => { throw new NotFoundError('Фильм с указанным идентификатором не найден'); })
    .then((movie) => {
      if (!movie.owner.equals(currentUserId)) {
        throw new AccessError('Вы можете удалять только свои карточки');
      }
      Movie.findByIdAndDelete({ _id: movieId })
        .then((deletedMovie) => {
          const movieWithoutOwner = deletedMovie;
          movieWithoutOwner.owner = undefined;

          res.send(movieWithoutOwner);
        })
        .catch((err) => next(handlerError(err)));
    })
    .catch((err) => next(handlerError(err)));
};
