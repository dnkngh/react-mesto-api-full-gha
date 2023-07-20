import React from 'react'

import PopupWithForm from './PopupWithForm'


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return(
    <PopupWithForm
      name="add-place"
      title="Новое место"
      submitButtonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-data">
        <input
          className="popup__item popup__item_type_place"
          name="name"
          id="placename"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__error placename-error"></span>
        <input
          className="popup__item popup__item_type_image"
          name="link"
          id="placeimage"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={handleLinkChange}
        />
        <span className="popup__error placeimage-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup