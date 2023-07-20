import {Link, useLocation, Route, Routes } from 'react-router-dom'
import React from 'react'

import headerLogo from '../images/header-logo.svg'


function Header({ email, loggedIn, onSignOut }) {
  const location = useLocation();
  const linkText = location.pathname === '/sign-in' ? 'Регистрация' : 'Войти';
  const buttonText = loggedIn ? "Выйти" : linkText;

  return(
    <header className="header">
      <img src={headerLogo} alt="Лого" className="header__logo" />

      <div className="header__info">
        {loggedIn && <p className="header__email">{email}</p>}
        <Routes>
          <Route
            path="/react-mesto-auth"
            element={<Link to="/sign-in" className="header__link header__button">Войти</Link>}
          />
          <Route
            path="/sign-up"
            element={<Link to="/sign-in" className="header__link header__button-">Войти</Link>}
          />
          <Route
            path="/sign-in"
            element={<Link to="/sign-up" className="header__link header__button">Регистрация</Link>}
          />
        </Routes>
        {loggedIn && (
          <button className="header__link header__button" onClick={onSignOut}>{buttonText}</button>
        )}
      </div>
    </header>
  );
}

export default Header
