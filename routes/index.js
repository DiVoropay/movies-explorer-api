const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

router.get('/singup', createUser);
router.patch('/signin', login);

module.exports = router;