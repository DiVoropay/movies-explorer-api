const router = require('express').Router();

const { createMovie, getMoviesByOwner, removeMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.post('/', auth, createMovie);
router.get('/', auth, getMoviesByOwner);
router.delete('/:movieId', auth, removeMovie);

module.exports = router;
