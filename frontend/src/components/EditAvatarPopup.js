import React from 'react'

import PopupWithForm from './PopupWithForm'


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-data">
        <input
          className="popup__item popup__item_type_avatar"
          name="useravatar"
          id="useravatar"
          type="text"
          placeholder="Укажите URL изображения"
          required
          ref={avatarRef}
        />
        <span className="popup__error useravatar-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup