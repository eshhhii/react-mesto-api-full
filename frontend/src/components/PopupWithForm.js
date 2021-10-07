import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  submitButton,
  handleSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={`form_${name}`}
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__fieldset">{children}</fieldset>
          <button type="submit" className="popup__save">
            {submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
