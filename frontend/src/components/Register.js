import React, {useState} from "react"
import {Link} from "react-router-dom"


function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({email, password});
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            onChange={handleChangeEmail}
            className="auth__input"
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            required
          />
          <input
            onChange={handleChangePassword}
            className="auth__input"
            id="passowrd"
            name="password"
            placeholder="Пароль"
            type="password"
            value={password}
            required
          />
        </fieldset>
        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register
