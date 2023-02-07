import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Trash3 } from "react-bootstrap-icons"
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import { Container, Row, Col, Figure, Table, Form } from "react-bootstrap";
import data from "../assets/data.json";
import Modal from "react-modal";

export default ({ }) => {
    const { id } = useParams();
    let p = data[0];
    const [product, setProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { api, PATH, user, setGoods, setBasket } = useContext(Ctx);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    });
    const btnSt = {
        // position: "absolute",
        right: "20px",
        top: "20px",
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



    const submit = (e) => {
        e.preventDefault();
        let body = {
            rating: rating,
            text: text || " ",
        };

        api.setReview(id, body)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setGoods(prev => [...prev, data]);
                    clear();
                    navigate(`${PATH}catalog/${data._id}`);
                }
            })
    };

    const clear = (e) => {
        setRating(0);
        setText("");
    };

    const customStyles = {
        content: {
            top: '35%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width: 'max-content',
            transform: 'translate(-40%, -10%)',
        },
    };

    return <>
        <p className="breadcrumbs">
            <Link to={PATH + "./"}>Главная</Link>&nbsp;-&nbsp;
            <Link to={PATH + "catalog"}>Каталог</Link>&nbsp;-&nbsp;
            {product.name || "Страница товара"}
        </p>
        <Modal isOpen={showModal} ariaHideApp={false} onRequestClose={() => setShowModal(false)} style={customStyles}>
            <div className="popup">
                <div><h5 className="">Вы точно хотите удалить:</h5></div>
                <div><p>{product.name} ?</p></div>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Закрыть</button>
                <button className="btn btn-danger" onClick={remove}>Удалить</button>
            </div>
        </Modal>
        <Container>
            {product._id &&
                <Row>
                    <Col xs={12} md={6}>
                        <Figure>
                            <Figure.Image className="img-fluid img-thumbnail" src={product.pictures} />
                        </Figure>
                    </Col>
                    <Col Col xs={12} md={6}>
                        <Col xs={12}>
                            <h1 className="head">{product.name || "Страница товара"}</h1>
                        </Col>
                        <Col md={12}>
                            <h4 className="head-description">Описание товара:</h4>
                            <p className="description-product">{product.description}</p>
                        </Col>
                        {product && product.author && product.author._id === user._id && <button
                            onClick={() =>
                                setShowModal(true)
                            }
                            className="btn"
                            style={btnSt}>
                            <Trash3 />
                        </button>}
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

                        <Form onSubmit={submit}>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Оценка товара</Form.Label>
                                        <Form.Select value={rating} onChange={e => setRating(e.target.value)}>
                                            <option value={1}>★</option>
                                            <option value={2}>★★</option>
                                            <option value={3}>★★★</option>
                                            <option value={4}>★★★★</option>
                                            <option value={5}>★★★★★</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ваш отзыв</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={text}
                                            onChange={e => setText(e.target.value)} />
                                    </Form.Group>
                                    <button className="btn" type="submit">
                                        Отправить
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                        <div className="reviews">
                            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} key={i} />)}
                        </div>
                    </Col>
                </Row>
            }
        </Container>
    </>
}
