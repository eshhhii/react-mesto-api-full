import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({ loggedIn, currentEmail, onSignOut }) {
  const { pathname } = useLocation();
  const textToggle = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
  const linkToggle = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;

  function handleSignOut() {
    onSignOut();
  }

  return (
    <div className="header">
      <img src={headerLogo} className="logo" alt="Логотип" />
      <div className="header__container">
        {loggedIn ? (
          <>
            <p className="header__email">{currentEmail}</p>
            <Link to="" className="header__logout" onClick={handleSignOut}>
              Выйти
            </Link>
          </>
        ) : (
          <Link to={linkToggle} className="header__link">
            {textToggle}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
