const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const CredentialsError = require('../errors/credentials-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле EMAIL должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты {VALUE}',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле PASSWORD должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, '"{VALUE}" короче минимальной длины в 2 символа'],
    maxlength: [30, '"{VALUE}" длинее максимальной длины в 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => { throw new CredentialsError('Неправильные почта или пароль'); })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new CredentialsError('Неправильные почта или пароль');
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
