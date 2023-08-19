import React from "react";
import logo from "../images/header__logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип Место(Россия)"
                className="header__logo"
            />
            <Routes>
                <Route
                    path="/sign-in"
                    element={
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    }
                />

                <Route
                    path="/"
                    element={
                        <div className="header__panel">
                            <p className="header__email">{props.headerEmail}</p>
                            <button
                                className="header__link header__button"
                                onClick={props.signOut}
                            >
                                Выйти
                            </button>
                        </div>
                    }
                />
            </Routes>
        </header>
    );
}

export default Header;
