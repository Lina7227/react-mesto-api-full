const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('./auth');
const NotFound = require('../errors/NotFound');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use((req, res, next) => {
  next(new NotFound(`По адресу ${req.path} ничего нет`));
});

module.exports = router;
