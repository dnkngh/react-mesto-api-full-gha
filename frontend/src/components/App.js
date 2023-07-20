import React, {useEffect} from 'react'
import { Route, Routes, useNavigate } from  'react-router-dom'

import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import Footer from './Footer'
import Header from './Header'
import InfoToolTip from './InfoToolTip'
import ImagePopup from './ImagePopup'
import Login from './Login'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'

import { api, apiAuth } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardId, setCardId] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessful, setSuccessful] = React.useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([data, userData]) => {
          setCards(data);
          setCurrentUser({...currentUser, ...userData});
        })
        .catch(error => console.log(error));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setCardId(card._id);
    setConfirmDeletePopupOpen(true);
  }

  function openInfooTooltipPopup(isSuccessful) {
    setInfoTooltipPopup(true);
    setSuccessful(isSuccessful);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoTooltipPopup(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then(newCard => {
      setCards((state) => state.map(c => c._id === card._id ? newCard : c));
    }).catch(error => console.log(error));
  }

  function handleCardDelete() {
    api.deleteCard(cardId).then(() => {
      setCards(cards.filter(item => item._id !== cardId));
    }).catch(error => console.log(error));

    closeAllPopups();
  }

  function handleUpdateUser(inputValues) {
    api.setUserInfo(inputValues).then((userdata) => {
      setCurrentUser(userdata);

      closeAllPopups();
    }).catch(error => console.log(error));
  }

  function handleUpdateAvatar(inputValues) {
    api.setUserAvatar(inputValues).then((userdata) => {
      setCurrentUser(userdata);

      closeAllPopups();
    }).catch(error => console.log(error));
  }

  function handleAddPlaceSubmit(invputValues) {
    api.addCard(invputValues).then(cardData => {
      setCards([cardData, ...cards]);

      closeAllPopups();
    }).catch(error => console.log(error));
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleLogin(loginData) {
    apiAuth.login(loginData)
      .then(res => {
        if (res && res.token) {
          setCurrentUser({...currentUser, email: loginData.email});
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch(error => {
        openInfooTooltipPopup(false);
        console.log(error);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      apiAuth.checkToken(token)
        .then(res => {
          if (res && res.data) {
            setLoggedIn(true);
            setCurrentUser({...currentUser, email: res.data.email});
            console.log(currentUser);
            navigate('/');
          }
        })
        .catch(error => {
          openInfooTooltipPopup(false);
          console.log(error)
        });
    }
  }

  useEffect(() => {checkToken()}, [])

  function handleRegister(registrationData) {
    apiAuth.register(registrationData)
      .then(res => {
        if (res && res.data) {
          openInfooTooltipPopup(true);
          navigate('/sign-in');
        }
      })
      .catch(error => {
        openInfooTooltipPopup(false);
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={currentUser.email}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                cards={cards}
              />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        >
        </ConfirmDeletePopup>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isSuccessful={isSuccessful}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
