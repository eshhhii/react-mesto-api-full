export const templateElement = document.querySelector(".template");
export const showUserInfoPopup = document.querySelector(".profile__edit");
export const closePopupButton = document.querySelector(".popup__close");
export const showNewCardPopup = document.querySelector(".profile__add");
export const showUserPicPopup = document.querySelector(".profile__container");
export const nameInput = document.querySelector("#username");
export const jobInput = document.querySelector("#userjob");
export const popupForm = document.querySelector(".popup__form");
export const addCard = document.querySelector("#popupFormAdd");
export const popupFormAvatar = document.querySelector("#popupFormAvatar");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
