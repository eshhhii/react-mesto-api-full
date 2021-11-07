import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id; //owner без Id

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__bin ${
    isOwn ? "element__bin" : "element__bin_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : "element__like"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="Удалить"
      ></button>
      <div className="element__text">
        <p className="element__title">{card.name}</p>
        <div className="element__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Лайкнуть"
          ></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
