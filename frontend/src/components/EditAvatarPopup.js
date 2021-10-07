import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState("");

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  React.useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar });
  }

  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      submitButton="Cохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_update"
        id="newAvatar"
        name="link-avatar"
        type="url"
        value={avatar}
        placeholder="Ссылка на новый аватар"
        onChange={handleChangeAvatar}
        required
      />
      <span className="popup__error" id="newAvatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
