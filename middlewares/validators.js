const { celebrate, Joi } = require('celebrate');

const PATTERN_URL = /^http[s]?:\/\/[www.]*[\w-._~:/?#[\]@!$&'()*+,;=]+/;

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Недопустимый формат email',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

module.exports.validateUserEmail = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Недопустимый формат email',
      }),
  }),
});

module.exports.validateUserUpdateData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Недопустимый формат email',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required()
      .messages({
        'string.length': 'Длина movieId должна быть 24 символа',
        'any.required': 'Параметр movieId обязательный',
        'string.hex': 'movieId должен быть в формате hex',
      }),
  }),
});

module.exports.validateMovieData = celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().pattern(PATTERN_URL)
      .messages({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.pattern.base': 'Неправильный формат ссылки "thumbnail"',
      }),
    trailer: Joi.string().required().pattern(PATTERN_URL)
      .messages({
        'any.required': 'Поле "trailer" должно быть заполнено',
        'string.pattern.base': 'Неправильный формат ссылки "trailer"',
      }),
    image: Joi.string().pattern(PATTERN_URL).required()
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
        'string.pattern.base': 'Неправильный формат ссылки "image"',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
        'number.base': 'Поле "duration" должно быть числом',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "country" должно быть заполнено',
      }),
  }),
});
