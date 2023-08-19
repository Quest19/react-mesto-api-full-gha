import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            name,
            link,
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName("");
            setLink("");
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            text="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-label"
                value={name}
                onChange={handleNameChange}
                type="text"
                className="popup__input popup__input_value_label"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                required
            />
            <span id="input-label-error" className="popup__input-error"></span>
            <input
                id="input-link"
                value={link}
                onChange={handleLinkChange}
                type="url"
                className="popup__input popup__input_value_link"
                placeholder="Ссылка на картинку"
                name="link"
                required
            />
            <span id="input-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
