import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const isLiked = props.card.likes.some((id) => id === currentUser._id);

    const cardLikeButtonClassName = `card__like-icon ${
        isLiked && "card__like-icon_active"
    }`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="card">
            {isOwn && (
                <button
                    className="card__delete-btn"
                    type="button"
                    onClick={handleDeleteCard}
                />
            )}
            <button
                className="card__image-btn"
                type="button"
                onClick={handleClick}
            >
                <img
                    src={props.card.link}
                    alt={props.card.name}
                    className="card__image"
                />
            </button>
            <div className="card__group">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    ></button>
                    <h3 className="card__like-counter">
                        {props.card.likes.length}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Card;
