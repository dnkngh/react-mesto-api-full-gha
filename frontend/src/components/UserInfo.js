import { Link } from 'react-router-dom'


function UserInfo({ email, loggedIn, onSignOut }) {
  return(
    <div className="header__info">
      <p className="header__email">{email}</p>
      <Link
        to="/sign-up"
        className={`header__link ${loggedIn && 'header__link-active'}`}
        onClick={onSignOut}
      >
        Выйти
      </Link>
    </div>
  )
}

export default UserInfo
