import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Ctx from "../Ctx";
import Favorites from "./Favorites";

export default () => {
    const {user, setUser} = useContext(Ctx);
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user8");
        navigate("/");
    }
    return <>
        <h1 className="heading">Личный кабинет</h1>
        <h4 className="name">Привет, {user && user.name}!</h4>
        <Favorites/>
        <button className="btn btn-prof" href="" onClick={logOut}>Выйти из аккаунта</button>

    </>
}