const router = require('express').Router();

const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUserUpdateData } = require('../middlewares/validators');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdateData, updateCurrentUser);

module.exports = router;
