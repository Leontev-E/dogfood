import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Trash3} from "react-bootstrap-icons"
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import {Container, Row, Col, Figure, Table, ButtonGroup, Button, Tabs, Tab, Nav} from "react-bootstrap";
import "./Product.css";

export default ({name, pictures, price, _id, author}) => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    // По id товара получаются данные о товаре для отрисовки страницы с товаром
    const {api, PATH, user, setGoods} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);
    const btnSt = {
        position: "absolute",
        right: "20px",
        top: "250px",
        cursor: "pointer",
        height: "auto"
    }
    const remove = () => {
        api.delProduct(id)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setGoods(prev => prev.filter(g => g._id !== data._id))
                    navigate(`${PATH}catalog`);
                }
            })
    }

    return <>
    
        {product && product.author && product.author._id === user._id && <button onClick={remove} className="btn" style={btnSt}>
            <Trash3/>
        </button>}
        <Row>
        <Col xs={12} md={6}>
        <img src={product.pictures} alt={name} style={{maxWidth: "500px"}}/>
        </Col>
        <Col xs={12} md={6}>
        <h1>{product.name || "Страница товара"}</h1>
        <h5>Стоимость: {product.price}₽</h5>
        <h5>СКИДКА: {product.discount}%</h5>
        <p>Описание товара: {product.description}</p>
        <p>Вес товара: {product.wight}</p>
        <p>Колличество на складе: {product.stock} шт.</p>
        </Col>
        <button className="btn">В корзину</button>

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Главная</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Профиль</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Контакт</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">..1.</div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">..2.</div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">..3.</div>
</div>

        <Link to={PATH +"catalog"}>Назад</Link>
        <h2>Отзывы</h2>
        <div className="reviews">
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} key={i}/>)}
        </div>
        </Row>
    </>
}