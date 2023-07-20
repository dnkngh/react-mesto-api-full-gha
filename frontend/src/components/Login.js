import React, {useState} from 'react'

function Login({ onLogin }) {
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

    onLogin({email, password});
  }


  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
            autoComplete="on"
          />
        </fieldset>
        <button className="auth__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login
