import React, {useContext} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../Ctx";

export default () => {
    const {visibleGoods} = useContext(Ctx);
    console.log(visibleGoods)
    return <>
        {visibleGoods.length > 0 
            ? <>
                <h1>Каталог товаров</h1>
                <div className="cards">
                    {visibleGoods.map((el, i) => <Link to={`/catalog/${el._id}`} key={el._id}>
                        <Card key={"card_" + i} text={el.name} like={(i + 1) % 2 === 0}/>
                    </Link>)}
                </div>
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Простите, по вашему запросу товаров не найдено</p>
                <Link to="/" className="btn">На главную</Link>
            </div>
        }
    </>
}