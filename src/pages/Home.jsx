import React from "react";
import Card from "../components/Card";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data}) => {
    return <>
        <h1>Крафтовые лакомства для собак</h1>
        <Link className="catalog" to="/catalog">Каталог</Link>
        <Ads/>
        {/* <div className="cards">
            {data.map((el, i) => <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>)}
        </div> */}
    </>
}