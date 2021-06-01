const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CredentialsError = require('../errors/credentials-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле EMAIL должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => /\w+@\w+\.\w+/.test(v),
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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CredentialsError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CredentialsError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
