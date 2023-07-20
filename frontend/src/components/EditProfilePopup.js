import React from 'react'

import PopupWithForm from './PopupWithForm'

import {CurrentUserContext} from '../contexts/CurrentUserContext'


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-data">
        <input
          className='popup__item popup__item_type_name'
          name="username"
          id="username"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__error username-error"></span>
        <input
          className="popup__item popup__item_type_about"
          name="userabout"
          id="userabout"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error userabout-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}


export default EditProfilePopup