const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const handlerErrors = require('./middlewares/handler-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const { PORT, MONGO_DB } = require('./config');

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {});
