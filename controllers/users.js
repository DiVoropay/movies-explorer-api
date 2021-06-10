const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictDataError = require('../errors/conflict-data-error');
const BadRequestError = require('../errors/bad-request-error');

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = require('../config');

const handlerError = (err) => {
  switch (err.name) {
    case 'ValidationError':
      return new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
    case 'CastError':
      return new BadRequestError(`Ошибка запроса ${err.message}`);
    case 'MongoError':
      return err.code === 11000 ? new ConflictDataError(`Пользователь с указанной почтой ${err.keyValue.email || ''} уже существует`) : err;
    default: return err;
  }
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email: email.toLowerCase(),
        name,
        password: hash,
      })
        .then((createdUser) => {
          const userWithoutPassword = createdUser;
          userWithoutPassword.password = undefined;

          res.send(userWithoutPassword);
        })
        .catch((err) => next(handlerError(err)));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRES_IN },
      );
      res.send({ token });
    })
    .catch((err) => next(handlerError(err)));
};

module.exports.getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;
  User.findById({ _id: currentUserId })
    .then((user) => res.send(user))
    .catch((err) => next(handlerError(err)));
};

module.exports.updateCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    { _id: currentUserId },
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => next(handlerError(err)));
};
