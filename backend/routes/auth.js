const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const {
  validatySigUp,
  validatySigIn,
} = require('../middlewares/validation');

router.post('/signin', validatySigIn, login);
router.post('/signup', validatySigUp, createUser);

module.exports = router;
