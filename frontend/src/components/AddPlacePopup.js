import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }
  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submitButton="Cохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        onChange={handleChangePlaceName}
        className="popup__input"
        id="placeName"
        name="name"
        type="text"
        placeholder="Название"
        value={placeName}
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error" id="placeName-error"></span>
      <input
        onChange={handleChangePlaceLink}
        value={placeLink}
        className="popup__input"
        id="placeLink"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error" id="placeLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
