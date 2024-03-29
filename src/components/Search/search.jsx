import React, { useState, useContext } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchImg } from "./img/magnifying-glass-solid.svg";
import { ReactComponent as CloseImg } from "./img/circle-xmark-regular.svg";
import Ctx from "../../Ctx";

export default () => {
    const navigate = useNavigate();
    const { goods, setVisibleGoods, PATH } = useContext(Ctx);
    const [text, updateText] = useState("");
    const [searchData, setSearchData] = useState(goods);
    const clearSearch = () => {
        updateText("");
        setSearchData(goods);
        setVisibleGoods(goods);
    }
    const search = (e) => {
        navigate(PATH + "catalog");
        updateText(e.target.value);
        let arr = goods.filter(el => el.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
        console.log(arr);
        setSearchData(arr);
        setVisibleGoods(arr);
    }
    return <div className="search-block">
        <input placeholder="Поиск..." value={text} onChange={search} maxLength={28} />
        <button>{text ? <CloseImg onClick={clearSearch} /> : <SearchImg />}</button>
        {text && <div className="search-result">
            По запросу <b>{text}</b>&nbsp;
            {searchData.length > 0 ? `найдено ${searchData.length} товаров` : "не найдено ни одного товара"}
        </div>}
    </div>
}