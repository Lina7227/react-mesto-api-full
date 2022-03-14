import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { register, login, checkToken } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

function App() {

  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopup, onDeleteCardPopup] = React.useState(false);
  const [isInfoTooltipPopup, onInfoTooltipPopup] = React.useState(false);
  const [isLuckInfoTooltip, setLuckInfoTooltip] = React.useState(null);
  const [islogOn, setlogOn] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});
  const [profilePopupButtonText, setProfilePopupButtonText] = React.useState('Сохранить');
  const [avatarPopupButtonText, setAvatarPopupButtonText] = React.useState('Сохранить');
  const [placePopupButtonText, setPlacePopupButtonText] = React.useState('Создать');
  const [removePopupButtonText, setRemovePopupButtonText] = React.useState('Да');

  function handleEditAvatarClick() {
    onEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    onEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    onAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    onDeleteCardPopup(true);
    setCardDelete(card); 
  }

  function closeAllPopups() {
    onEditAvatarPopupOpen(false);
    onEditProfilePopupOpen(false);
    onAddPlacePopupOpen(false);
    onDeleteCardPopup(false);
    onInfoTooltipPopup(false);
    setSelectedCard({link: '', name: ''});
    setCardDelete({link: '',  name: ''});
  }

  function closeInfoTooltipPopup() {
    closeAllPopups();
    if (isLuckInfoTooltip) {
      handleIsLogin({email: userEmail, password: userPassword});
    }
  }

  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup')) {
        if (isLuckInfoTooltip) {
          closeInfoTooltipPopup();
        } else {
          closeAllPopups();
        }
      }
    }
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    }

  }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
    isLuckInfoTooltip,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard
  ]);

  React.useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.key ==='Escape') {
        if (isLuckInfoTooltip) {
          closeInfoTooltipPopup();
        } else {
          closeAllPopups();
        }
      }
    }
    document.addEventListener('keyup', handleEscapeClick);

    return () => {
      document.removeEventListener('keyup', handleEscapeClick);
    }

  }, // eslint-disable-next-line
    [
    isLuckInfoTooltip,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard
  ]);


  React.useEffect(() => {
    setIsLoading(false);
    handleIsToken();
    setLuckInfoTooltip(false);
  }, // eslint-disable-next-line
   [])

  function handleIsToken() {

    setIsLoading(false);
    let jwt = localStorage.getItem("jwt");
    if (islogOn !== null) {
      checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setlogOn(true);
          setIsLoading(true);
          history.push("/");
        })
        .catch(() => {
          setLuckInfoTooltip(false);
          onInfoTooltipPopup(true);
        })
    } else {
      setIsLoading(false);
      return;
    }
  }

  function handleIsRegister(data) {
    register(data)
      .then((res) => {
        setUserEmail(res.email);
        setUserPassword(data.password);
        setLuckInfoTooltip(true);
        onInfoTooltipPopup(true);
      })
      .catch(() => {
        setLuckInfoTooltip(false);
        onInfoTooltipPopup(true);
      })
  }

  function handleIsLogin(data) {
    login(data)
      .then((res) => {
        if (res.jwt) {
          localStorage.setItem("jwt", res.jwt);
          setlogOn(true);
          handleIsToken();
          history.push('/');
        }
        
      })
      .catch(async  () => {
        setLuckInfoTooltip(false);
        onInfoTooltipPopup(true);
      })
  }

  function handleSignOut() {
    setlogOn(null);
    history.push("/sign-in");
    localStorage.removeItem("jwt");
    setUserEmail("");
    setUserPassword("");
    setLuckInfoTooltip(null);
    setIsLoading(false);
  }
  
  React.useEffect(() => {

    if (islogOn !== null) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, // eslint-disable-next-line
   [islogOn])

  function handleCardLike(card) {
      
    const isLiked = card.likes.some(like => like === currentUser._id);
      
    api.changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
          console.log(err);
      })
  }
    
  function handleCardDelete(card) {
    setRemovePopupButtonText('Удаление...');
    setIsLoading(true);
    api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((evt) => evt._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemovePopupButtonText('Да');
      })
  }

  function handleUpdateUser(user) {
    setProfilePopupButtonText('Сохранение...');
    setUserEmail(true);
    api.setUser(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProfilePopupButtonText('Сохранить');
      })
  }

  function handleUpdateAvatar(avatar) {
    setAvatarPopupButtonText('Сохранение...');
    setUserEmail(true);
    api.setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAvatarPopupButtonText('Сохранить');
      })
  }

  function handleAddPlaceSubmit(card) {
    setPlacePopupButtonText('Добавление...');
    setUserEmail(true);
    api.addCard(card)
      .then((cardNew) => {
        setCards([cardNew, cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPlacePopupButtonText('Создать');
      })
  }
  
  return (
    <div className="page">
     
     <CurrentUserContext.Provider value={currentUser}>

        <Header
          islogOn={islogOn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
          isLoading={isLoading}
        />

        <Switch>

          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            cards={cards}
            islogOn={islogOn}
          />

          <Route path="/sign-up">
            <Register
              onSubmitRegister={handleIsRegister}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onSubmitLogin={handleIsLogin}
              isLoading={isLoading}
            />
          </Route>

          <Route>
            <Redirect to={!islogOn ? "/sign-in" : "/"} />
          </Route>

        </Switch>

        <Footer/>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonSubmitText={profilePopupButtonText}
        /> 

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonSubmitText={placePopupButtonText}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonSubmitText={avatarPopupButtonText}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopup}
          onClose={closeAllPopups}
          onSubmitDeleteCard={handleCardDelete}
          card={cardDelete}
          buttonSubmitText={removePopupButtonText}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopup}
          onClose={closeInfoTooltipPopup}
          isLuck={isLuckInfoTooltip}
        />

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;