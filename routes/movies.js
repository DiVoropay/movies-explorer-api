const router = require('express').Router();

const { createMovie, getMoviesByOwner, removeMovie } = require('../controllers/movies');
const { validateMovieId, validateMovieData } = require('../middlewares/validators');

router.post('/', validateMovieData, createMovie);
router.get('/', getMoviesByOwner);
router.delete('/:movieId', validateMovieId, removeMovie);

module.exports = router;
