import React from 'react'

import Card from './Card'

import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteClick, cards}) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        <button
          type="button"
          className="profile__avatar-edit-button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button button button_opacity_sixty"
              title="Редактировать профиль"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button button button_opacity_sixty"
          title="Добавить место"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <div className="elements__list">
          {cards.map(card => <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
          />)}
        </div>
      </section>
    </main>
  );
}

export default Main
