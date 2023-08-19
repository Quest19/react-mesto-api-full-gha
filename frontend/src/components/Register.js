import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Register(props) {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormValue({ ...formValue, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = formValue;
        Auth.register(email, password)
            .then((res) => {
                props.setInfoTooltipPopupOpen(true);
                props.setSuccess(true);
                navigate("/sign-in", { replace: true });
            })
            .catch((err) => {
                props.setInfoTooltipPopupOpen(true);
                props.setSuccess(false);
                console.log(err);
            });
    }

    return (
        <div className="register">
            <div className="register__container">
                <h1 className="register__title">Регистрация</h1>
                <form className="register__form" onSubmit={handleSubmit}>
                    <input
                        className="register__input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formValue.email}
                        required
                    />
                    <input
                        className="register__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={formValue.password}
                        minLength="6"
                        required
                    />
                    <button className="register__button" type="submit">
                        Зарегистрироваться
                    </button>
                    <Link to="/sign-in" className="register__link">
                        Уже зарегистрированы? Войти
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
