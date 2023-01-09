import React from "react";
import "./ads.css";
import banner from "./img/banner.png";
import dog from "./img/dog.png";

export default () => {
    return <div className="promo">
        <h2>Подарок за первый заказ!</h2>
        <img src={banner} alt="Миска" />
        <img src={dog} alt="Собачки" />
    </div>
}