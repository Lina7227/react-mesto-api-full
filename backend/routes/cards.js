const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validatyCardId,
  validatyCard,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validatyCard, createCard);
router.delete('/:cardId', validatyCardId, deleteCard);
router.put('/:cardId/likes', validatyCardId, likeCard);
router.delete('/:cardId/likes', validatyCardId, dislikeCard);

module.exports = router;
