import React, {useContext} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import "./style.css";

export default () => {
    const {visibleGoods} = useContext(Ctx);
    const paginate = usePagination(visibleGoods, 12);
    return <>
        {visibleGoods.length > 0 
            ? <>
                <h1>Каталог товаров</h1>
                <Pagination hook={paginate}/>
                <div className="cards">
                    {paginate.setPageData().map((el, i) => <Link to={`/catalog/${el._id}`} key={el._id}>
                        <Card key={"card_" + i} {...el}/>
                    </Link>)}
                </div>
                <Pagination hook={paginate}/>
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Простите, по вашему запросу товаров не найдено</p>
                <Link to="/" className="btn">На главную</Link>
            </div>
        }
    </>
}