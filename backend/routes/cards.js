const cardRoutes = require('express').Router();

const {
  addLike,
  createCard,
  deleteCard,
  deleteLike,
  getCards,
} = require('../controllers/cards');
const {
  createCardValidation,
  cardByIdValidation,
} = require('../middlewares/validation');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidation, createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', addLike);
cardRoutes.delete('/:cardId/likes', deleteLike);

module.exports = cardRoutes;
