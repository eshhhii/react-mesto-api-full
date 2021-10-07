import React from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }
  return (
    <section className="sign">
      <h1 className="sign__title">Вход</h1>
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
        <button className="sign__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
