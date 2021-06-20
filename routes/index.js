const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { validateUserData, validateUserLoginData } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', validateUserData, createUser);
router.post('/signin', validateUserLoginData, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(() => { throw new NotFoundError('Страница не существует'); });

module.exports = router;
