const router = require('express').Router();
const {
  getUsers,
  getUserId,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validatyUser,
  validatyAvatar,
  validatyUserId,
} = require('../middlewares/validation');

router.get('/me', getUser);
router.get('/:userId', validatyUserId, getUserId);
router.patch('/me', validatyUser, updateUserInfo);
router.patch('/me/avatar', validatyAvatar, updateUserAvatar);
router.get('/', getUsers);

module.exports = router;
