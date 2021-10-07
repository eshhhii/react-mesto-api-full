import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_images ${card.name ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container popup__container_image">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <h3 className="popup__title popup__title_image">{card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;
