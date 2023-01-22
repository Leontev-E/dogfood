import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Trash3} from "react-bootstrap-icons"
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import {Container, Row, Col, Figure, Table, ButtonGroup, Button} from "react-bootstrap";
import data from "../assets/data.json";


export default ({}) => {
    const {id} = useParams();
    let p = data[0];
    const [product, setProduct] = useState({});
    const [cnt, setCnt] = useState(0);
    const {api, PATH, user, setGoods} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                console.log(data.reviews)
            })
    });
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

    return <Container>
        {product._id &&
            <Row>
                <Col xs={12}>
                <h1>{product.name || "Страница товара"}</h1>
                </Col>
                <Col xs={8}>
                    <Figure>
                        <Figure.Image className="img-fluid" src={product.pictures}/>
                    </Figure>
                </Col>
                <Col xs={12} md={4}>
                    {/* {product.discount && <small><del>{product.price} ₽</del></small>}
                    <div><strong className={product.discount ? "text-danger" : "text-dark"}>{Math.ceil(product.price * ((100 - product.discount) / 100))} ₽</strong></div> */}
                    <Row>
                        <Col md={6}>
                        {/* <ButtonGroup>
                            <Button size="sm" variant="light" disabled={!cnt} onClick={e => setCnt(cnt - 1)}>-</Button>
                            <Button size="sm" variant="light" disabled>{cnt}</Button>
                            <Button size="sm" variant="light" onClick={e => setCnt(cnt + 1)}>+</Button>
                        </ButtonGroup> */}
                        </Col>
                        <Col md={6}>
                        <Button size="sm" variant="warning">В корзину</Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <h2>Описание</h2>
                    <p>{product.description}</p>
                </Col>
                <Col xs={12}>
                    <h2>Характеристики</h2>
                    <Table hover>
                        <tbody>
                            <tr>
                                <th>Вес</th>
                                <td>{product.wight} г.</td>
                            </tr>
                            <tr>
                                <th>Цена</th>
                                <td>{product.price} ₽ за {product.wight} г.</td>
                            </tr>
                            <tr>
                                <th>Остаток на складе</th>
                                <td>{product.stock} шт.</td>
                            </tr>
                            <tr>
                                <th>Польза</th>
                                <td>{product.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xs={12}>
                    <h2>Отзывы</h2>
                    
                    <div className="reviews">
                      {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} key={i}/>)}
                    </div>
                </Col>
            </Row>
        }
    </Container>
}