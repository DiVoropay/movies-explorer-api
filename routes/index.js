const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { validateUserData, validateUserEmail } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserData, createUser);
router.post('/signin', validateUserEmail, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
