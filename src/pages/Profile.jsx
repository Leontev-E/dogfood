import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Ctx from "../Ctx";

export default () => {
    const {user, setUser} = useContext(Ctx);
    console.log(user);
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user8");
        navigate("/");
    }
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {user}</p>
        <a href="" onClick={logOut} style={{color: "orange"}}>Выйти из аккаунта</a>
    </>
}