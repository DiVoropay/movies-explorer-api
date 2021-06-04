require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const handlerErrors = require('./middlewares/handler-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/moviesexplorerdb' } = process.env;

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

app.use(errorLogger);
app.use(handlerErrors);

app.listen(PORT, () => {});
