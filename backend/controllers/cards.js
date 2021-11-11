const Card = require("../models/card");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          BadRequest("Переданы некорректные данные в методы создания карточки")
        );
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound("Карточка не найдена");
      }
      if (userId !== String(card.owner)) {
        throw new Forbidden("Недостаточно прав");
      }
      Card.findOneAndRemove(cardId)
        .then((currentCard) => {
          if (!currentCard) {
            throw new NotFound("Карточка не найдена");
          }
          return res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === "CastError") {
            throw new BadRequest(
              "Переданы некорректные данные в методы удалении карточки"
            );
          }
        })
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFound("Нет данных");
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest("Переданы некорректные данные для лайка");
      } else {
        next(err);
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFound("Нет данных");
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest("Переданы некорректные данные для удаления лайка");
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
