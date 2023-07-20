import React from 'react'

import infotooltip_success_icon from '../images/infotooltip_success_icon.svg'
import infotooltip_fail_icon from '../images/infotooltip_fail_icon.svg'


function InfoToolTip({ isSuccessful, isOpen, onClose }) {
  const image = isSuccessful ? infotooltip_success_icon : infotooltip_fail_icon
  const message = isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'

  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-infotooltip">
        <button className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__infotooltip-image" src={image} alt={message} />
        <h2 className="popup__infotooltip-title">{message}</h2>
      </div>
    </div>
  )
}

export default InfoToolTip;
