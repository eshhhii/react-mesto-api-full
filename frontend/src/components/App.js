import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Register from "./Register.js";
import Login from "./Login.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import successIcon from "../images/success.png";
import failIcon from "../images/fail.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [info, setInfo] = React.useState({ icon: "", text: "" });
  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((cardList) => {
        setCurrentUser(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleInfoTooltipContainer({ icon, text }) {
    setInfo({ icon: icon, text: text });
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUserRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleInfoTooltipContainer({
            icon: successIcon,
            text: "Вы успешно зарегистрировались!",
          });
          handleInfoTooltipOpen();

          setTimeout(history.push, 3500, "/sign-in");
          setTimeout(closeAllPopups, 3000);
        } else {
          console.log("Некорректно заполнено одно из полей!");
        }
      })
      .catch((err) => {
        handleInfoTooltipContainer({
          icon: failIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipOpen();

        setTimeout(closeAllPopups, 3000);

        console.log(err);
      });
  }

  function handleUserAuthorization(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setCurrentEmail(email);
          handleInfoTooltipContainer({
            icon: successIcon,
            text: "Вы успешно авторизовались!",
          });
          handleInfoTooltipOpen();
          setTimeout(history.push, 3500, "/");
          setTimeout(closeAllPopups, 3000);
        }
      })
      .catch((err) => {
        handleInfoTooltipContainer({
          icon: failIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipOpen();

        setTimeout(closeAllPopups, 3000);

        console.log(err);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentEmail("");
    setTimeout(history.push, 3500, "/sign-in");
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          currentEmail={currentEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/sign-in">
            <Login
              onInfoTooltip={handleInfoTooltipOpen}
              setLoggedIn={setLoggedIn}
              setCurrentEmail={setCurrentEmail}
              onLogin={handleUserAuthorization}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onInfoTooltip={handleInfoTooltipOpen}
              onClose={closeAllPopups}
              onRegister={handleUserRegistration}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handCardDelete}
          />
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        submitButton="Да"
      ></PopupWithForm>
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        info={info}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
