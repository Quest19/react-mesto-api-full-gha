import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditeAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="add-avatar"
            title="Обновить аватар"
            text="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-avatar"
                ref={avatarRef}
                type="url"
                className="popup__input popup__input_value_avatar"
                placeholder="Ссылка на картинку"
                name="avatar"
                required
            />
            <span id="input-avatar-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditeAvatarPopup;
