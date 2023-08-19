import React from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Login(props) {
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

        Auth.login(formValue.email, formValue.password)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                props.handleLogin();
                props.setHeaderEmail(data.email);
                props.setInfoTooltipPopupOpen(true);
                props.setSuccess(true);
                navigate("/");
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
                <h1 className="register__title">Вход</h1>
                <form className="register__form" onSubmit={handleSubmit}>
                    <input
                        className="register__input"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formValue.email}
                        required
                    />
                    <input
                        className="register__input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={formValue.password}
                        minLength="6"
                        required
                    />
                    <button className="register__button" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
