import React from "react";

function PopupWithForm(props) {
    return (
        <div
            className={`popup popup_type_${props.name} ${
                props.isOpen && `popup_opened`
            }`}
        >
            <div className="popup__container">
                <button
                    className="popup__btn-close"
                    type="button"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form
                    action="#"
                    onSubmit={props.onSubmit}
                    className={`popup__form popup__form_type_${props.name}`}
                    name="popup__form"
                >
                    {props.children}
                    <button className="popup__btn-save" type="submit">
                        {props.text}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
