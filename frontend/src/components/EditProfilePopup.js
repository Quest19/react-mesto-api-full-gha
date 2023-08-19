import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
    //переменные состояния
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    //Обработчики изменения инпута
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    //Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //Подставляем данные пользователя
    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name || "");
            setDescription(currentUser.about || "");
        }
    }, [props.isOpen, currentUser]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            text="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-name"
                value={name}
                onChange={handleNameChange}
                className="popup__input popup__input_value_name"
                type="text"
                placeholder="Ваше Имя"
                name="name"
                minLength="2"
                maxLength="40"
                required
            />
            <span id="input-name-error" className="popup__input-error"></span>
            <input
                id="input-info"
                value={description}
                onChange={handleDescriptionChange}
                className="popup__input popup__input_value_info"
                type="text"
                placeholder="Ваша деятельность"
                name="about"
                minLength="2"
                maxLength="200"
                required
            />
            <span id="input-info-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
