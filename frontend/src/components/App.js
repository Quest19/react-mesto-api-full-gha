/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditeAvatarPopup from "./EditeAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    //Переменные состояния
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] =
        React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [headerEmail, setHeaderEmail] = React.useState(null);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
        React.useState(false);
    const [isSuccess, setSuccess] = React.useState(false);
    const navigate = useNavigate();

    //Открытие попапа профиля
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    //Открытие попапа для добавления карт
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    //Открытие попапа для редактирования аватара профиля
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    //Попап для изображения
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //Закрытие всех попапов
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setInfoTooltipPopupOpen(false);
    }

    //Зкарытие на клавишу Esc
    const isOpen =
        isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        selectedCard;

    useEffect(() => {
        function closeByEsc(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", closeByEsc);
            return () => {
                document.removeEventListener("keydown", closeByEsc);
            };
        }
    }, [isOpen]);

    React.useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
      }
    }, [isLoggedIn]);

    //Лайк карточки
    function handleCardLike(card) {
        //Проверка на лайк
        const isLiked = card.likes.some((id) => id === currentUser._id);

        if (!isLiked) {
            api.putLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    //Удаление карты
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.patchProfileAvatar(data)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleLogin = () => {
        setLoggedIn(true);
    };

    //Проверка токена
    function checkToken() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          Auth.tokenCheck(jwt)
          .then((data) => {
              if (data) {
                setLoggedIn(true);
                setHeaderEmail(data.email);
                navigate("/");
              }
          })
          .catch((err) => {
              console.log(err);
              setHeaderEmail(null);
          });
        }
    }

    useEffect(() => {
        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function signOut() {
        localStorage.removeItem("jwt");
        navigate("/sign-in");
        setHeaderEmail(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header signOut={signOut} headerEmail={headerEmail} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                element={Main}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                // onDeleteCard={handleDeleteCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <Register
                                setInfoTooltipPopupOpen={
                                    setInfoTooltipPopupOpen
                                }
                                setSuccess={setSuccess}
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                handleLogin={handleLogin}
                                setHeaderEmail={setHeaderEmail}
                                setInfoTooltipPopupOpen={
                                    setInfoTooltipPopupOpen
                                }
                                setSuccess={setSuccess}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/" />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                </Routes>
                {isLoggedIn && <Footer />}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditeAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleAddPlaceSubmit}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccess}
                    name={"register"}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;