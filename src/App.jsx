import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import dataLocal from "./assets/data.json";
import AddForm from "./pages/AddForm";

import {Api} from "./Api";
import Ctx from "./Ctx";

const PATH = "/";
// const PATH = "/dogfood/";
// "homepage": "/dogfood/",

const dataHome = dataLocal;

const smiles = [<span>^_^</span>, "=)", "O_o", ";(", "^_0", "@_@", "–_–"];

const App = () => {
    let usr = localStorage.getItem("user8");
    if (usr) {
        usr = JSON.parse(usr);
    }
    const [user, setUser] = useState(usr);
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [])

    useEffect(() => {
        setApi(new Api(token));
        let usr = localStorage.getItem("user8");
            if (usr) {
                usr = JSON.parse(usr);
        }
    }, [token])

    useEffect(() => {
        if (!user) {
            localStorage.removeItem("token8");
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [api])
    useEffect(() => {
        setVisibleGoods(goods);
    }, [goods])

    useEffect(() => {
    }, [visibleGoods])
    
    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            goods: goods,
            setModalActive: setModalActive,
            setGoods: setGoods,
            setVisibleGoods: setVisibleGoods,
            visibleGoods: visibleGoods,
            PATH: PATH
        }}>
            <div className="wrapper">
                <Header/>
                <main>
                    <Routes>
                        <Route path={PATH} element={<Home data={smiles}/>}/>
                        <Route path={PATH +"catalog"} element={<Catalog data={visibleGoods}/>}/>
                        <Route path={PATH +"profile"} element={<Profile/>}/>
                        <Route path={PATH +"catalog/:id"} element={<Product/>}/>
                        <Route path={PATH +"add"} element={<AddForm/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
            <Modal/>
        </Ctx.Provider>
    )
}
export default App;
