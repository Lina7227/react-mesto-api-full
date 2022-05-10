require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./utils/utils');

const app = express();

const { MONGODB_URL, NODE_ENV, PORT } = process.env;

app.use(corsOptions);

app.use(cookieParser());

const BD_URL = NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://localhost:27017/mestodb';

mongoose.connect(BD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());

app.use(require('./routes/auth'));

app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(NODE_ENV === 'production' ? PORT : 3000);
