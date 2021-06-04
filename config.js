require('dotenv').config();

const {
  PORT = 3000,
  MONGO_DB = 'mongodb://localhost:27017/moviesexplorerdb',
  NODE_ENV,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN = '7d',
} = process.env;

module.exports = {
  PORT,
  MONGO_DB,
  JWT_SECRET_KEY: NODE_ENV === 'production' ? JWT_SECRET_KEY : 'movies-secret',
  JWT_EXPIRES_IN,
};
