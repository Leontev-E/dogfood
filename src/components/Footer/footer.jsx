import React from "react";
import "./footer.css";
import {Link} from "react-router-dom"
import logo from "../Logo/logo.svg";

export default () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="footer__logo">
                <Link to="/">
                    <img src={logo} />
                </Link>
                <div className="footer__copy">
                    ©️ {year} "Интернет-магазин DogFood.ru"
                </div>
            </div>
            <div className="footer_contacts">
                <div className="contacts">
                    <p>Мы на связи</p>
                    <a className="phone" href="tel: +79450000000">8 (999) 999-99-99</a>
                    <a href="mailto: infou@mail.ru">info@mail.ru</a>
                </div>
            <div className="social-media">
                <a href="#">
                    <i class="fa-brands fa-telegram"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-vk"></i>
                </a>
                <a href="#">
                <i class="fa-brands fa-skype"></i>
                </a>
            </div>
            </div>
        </footer>
    )
}