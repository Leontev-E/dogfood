import React, {useContext} from "react";
import "./index.css";
import Ctx from "../../Ctx";

export default ({name, pictures, price, _id, author}) => {
    const {user} = useContext(Ctx);
    const like = author._id === user.id;
    return <div className="card">
        <img src={pictures} alt={name} style={{height: "100px"}}/>
        <h5>{name}</h5>
        <h6>{price} Руб</h6>
        <button className="btn">Купить</button>
        <span className="card__heart">
            {
                like 
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
        </span>
    </div>
}