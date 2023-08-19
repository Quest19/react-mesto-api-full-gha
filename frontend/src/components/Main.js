import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button
                    className="profile__avatar-btn"
                    type="button"
                    onClick={props.onEditAvatar}
                >
                    <img
                        src={currentUser.avatar}
                        alt="Изображение профиля"
                        className="profile__avatar"
                    />
                </button>
                <div className="profile__info">
                    <div className="profile__group">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            className="profile__edit-btn"
                            type="button"
                            onClick={props.onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-btn"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="cards">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        onCardClick={props.onCardClick}
                        // onDeleteCard={props.onDeleteCard}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        card={card}
                    ></Card>
                ))}
            </section>
        </main>
    );
}

export default Main;
