require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const handlerErrors = require('./middliwares/handler-errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 