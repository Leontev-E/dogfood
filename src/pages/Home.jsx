import React from "react";
import Card from "../components/Card";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";
import "./style.css";
import one from "./img/one.png";
import two from "./img/two.png";
import three from "./img/three.png";
import four from "./img/four.png";
import five from "./img/five.png";
import banner from "./img/banner.png";

export default ({data}) => {
    return <>
        <Ads/>
        {/* <div className="cards">
            {data.map((el, i) => <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>)}
        </div> */}
        {/* <Ads/> */}
        <div className="block one">
                <div className="description one-block">
                    <div>
                        <h3>Наборы <br/>для дрессировки</h3>
                        <h3>от 840 Р</h3>
                    </div>
                    <img className="block-img" src={one} />
                </div>
                <div className="description two-block">
                    <div>
                        <h3>Микс масел</h3>
                        <p>пищевая здоровая <br/> натуральная добавка</p>
                    </div>
                    <img className="block-img" src={two} />
                </div>
            </div>

            <div className="block two">
                <div className="description three-block">
                    <div>
                        <h3>Рога северного оленя</h3>
                        <p>от 10 до 30 кг.</p>
                    </div>
                    <img className="block-img" src={three} />
                </div>
                <div className="description four-block">
                    <div>
                        <h3>Слипы из шеи индейки</h3>
                        <p>100 % натуральное</p>
                    </div>
                    <img className="block-img" src={four} />
                </div>
                <div className="block five-block">
                    <div>
                        <h3>Игрушка - погремушка</h3>
                        <p>для мелких пород</p>
                    </div>
                    <img className="block-img" src={five} />
                </div>
            </div>

            <div className="banner">
                <div className="first-description">
                    <h2>Подарок за<br />первый заказ!</h2>
                    <p>Сухой корм "Мясное изобилие"</p>
                </div>
                <img src={banner} />
            </div>
    </>
}