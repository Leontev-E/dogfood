import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import Search from "../Search/search";
import Ctx from "../../Ctx";

import "./header.css";

import logo from "../Logo/logo.svg";

export default ({goods, searchGoods, setModalActive}) => {
    const {user, setUser} = useContext(Ctx);

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user8");
        setUser("");
    }
    return <header>
            <div className="header-top">
                <Link className="logo" to="/">
                    <img src={logo} />
                </Link>
                <Search data={goods} searchGoods={searchGoods} />
                <nav className="menu">
                    {user && <Link to="/profile">{user}</Link>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {user && <a href="" onClick={logOut}>Выйти</a>}
                </nav>
                </div>
                <div className="header-bottom">
                    <h1>Крафтовые лакомства для собак</h1>
                    <h3>Всегда свежие лакомства ручной работы с доставкой на дом по России и всему миру</h3>
                <Link className="btn-link" to="/catalog">
                    Каталог
                </Link>
            </div>
    </header>
}
