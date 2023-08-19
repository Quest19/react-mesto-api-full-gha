import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {
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
                <img
                    className="popup__register-img"
                    src={props.isSuccess ? success : fail}
                    alt={props.isSuccess ? 'Успешно!' : 'Что-то пошло не так.'}
                />
                <p className="popup__register-txt">
                    {props.isSuccess
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
            </div>
        </div>
    );
}

export default InfoTooltip;
