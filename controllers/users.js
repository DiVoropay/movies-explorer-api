const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  User.create({ email, name, password })
    .then((createdUser) => {
      const userWithoutPassword = createdUser;
      userWithoutPassword.password = undefined;
      res.send(userWithoutPassword);
    })
    .catch(err);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'movies-secret',
        { expiresIn: JWT_EXPIRES_IN },
      );
      res.send({ token });
    })
    .catch(next);

  User.create({ email, password })
    .then((createdUser) => {
      const userWithoutPassword = createdUser;
      userWithoutPassword.password = undefined;
      res.send(userWithoutPassword);
    })
    .catch(err);
}