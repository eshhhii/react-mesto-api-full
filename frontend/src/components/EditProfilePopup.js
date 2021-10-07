import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeN(e) {
    setName(e.target.value);
  }
  function handleChangeD(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitButton="Cохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeN}
        className="popup__input"
        id="username"
        type="text"
        name="name"
        value={name || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error" id="username-error"></span>
      <input
        onChange={handleChangeD}
        className="popup__input"
        id="userjob"
        name="about"
        type="text"
        value={description || ""}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error" id="userjob-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
