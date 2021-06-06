require('dotenv').config();

const configDev = {
  PORT: 3000,
  MONGO_DB: 'mongodb://localhost:27017/moviesexplorerdb',
  JWT_SECRET_KEY: 'movies-secret',
  JWT_EXPIRES_IN: '7d',
};

const configProd = {
  PORT: process.env.PORT || configDev.PORT,
  MONGO_DB: process.env.MONGO_DB || configDev.MONGO_DB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || configDev.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || configDev.JWT_EXPIRES_IN,
};

const isProduction = process.env.NODE_ENV === 'production';

module.exports = isProduction ? configProd : configDev;
