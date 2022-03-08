const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized ');

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Необходимо авторизоваться');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }
};
