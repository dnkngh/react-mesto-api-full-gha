function ImagePopup({card, onClose}) {
  return(
    <div
      className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__image-name">{card?.name}</h2>
        <button
          type="button"
          className="popup__close-button button button_opacity_sixty"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup
