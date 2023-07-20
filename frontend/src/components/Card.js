import React from 'react'

import {CurrentUserContext} from '../contexts/CurrentUserContext'


function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__favorite-disabled button button_opacity_fifty ${isLiked && 'elements__favorite-active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return(
    <article className="elements__element">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__favorite-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Добавить в избранное"
            onClick={handleLikeClick}
          ></button>
          <span className="elements__favorite-count">{card.likes.length}</span>
        </div>
        {isOwn && <button className="elements__delete-button" onClick={handleDeleteClick}></button>}
      </div>
    </article>
  );
}

export default Card
