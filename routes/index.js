const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', require('./users'));

module.exports = router;