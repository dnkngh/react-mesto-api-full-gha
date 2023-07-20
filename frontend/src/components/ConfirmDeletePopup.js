import React from 'react'

import PopupWithForm from './PopupWithForm'


function ConfirmDeletePopup({isOpen, onClose, onConfirm}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return(
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup
