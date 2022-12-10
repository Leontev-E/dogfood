import React, {useState, useEffect} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";

import {Api} from './Api';

const smiles = [<span>^_^</span>, "=)", "O_o", ";(", "^_0", "@_@", "–_–"];

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user8"));
    const [token, setToken] = useState(localStorage.getItem('token8'));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));

    useEffect(() => {
        console.log(token);
        if (token) {
            // Загрузить данные с сервера
        }
    }, [])

    useEffect(() => {
        console.log("change token!");
        setApi(new Api(token));
        setUser(localStorage.getItem('user8'));
    }, [token])

    useEffect(() => {
        if (token) {
            // Загрузить данные с сервера
        }
    }, [api])

    return (
        <>
            <div className="container">
                <Header 
                    user={user} 
                    setUser={setUser} 
                    products={products} 
                    setModalActive={setModalActive}
                />
                <main>
                    {user ? <Catalog data={products}/> : <Home data={smiles}/>}
                </main>
                <Footer/>
            </div>
            {/* 
                isActive, setState - параметры, которые работают внутри компонента Modal
                modalActive, setModalActive - значения, которые сохраняются внутри параметров
            */}
            <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken}/>
        </>
    )
}
export default App;