import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }
  return (
    <section className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
        ></input>
        <input
          className="sign__input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={handleChangePassword}
        ></input>
        <button className="sign__button">Зарегистрироваться</button>
      </form>
      <Link className="sign__link" to="/sign-in">
        Уже Зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
