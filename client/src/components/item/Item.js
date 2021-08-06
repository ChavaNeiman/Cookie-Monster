import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Item.css';
import { getItem, updateItem } from '../../service/ProductService';
import ItemInfo from '../itemInfo/ItemInfo';

export default function Item(props) {
    const [showItemInfo, setShowItemInfo] = useState(false);

    let changeUser = props.changeUser;
    let requireImage = require("../../assets/images/" + props.image);

    const Msg = () => (
        <div>
            <img src={requireImage.default} width="40%" height="80px" className="img-toast" alt=""></img>
            <div className="title-toast">
                {props.name + " cookies was just added to your cart."}
            </div>
        </div>
    )

    const notify = () =>
        toast(<Msg />);

    const addToCart = async () => {
        let userInfo = await getItem("users/users" , props.currentUser.email);
        if (props.id in userInfo.cart) {
            userInfo.cart = { ...userInfo.cart, [props.id]: userInfo.cart[props.id] + 1 };
        } else {
            userInfo.cart = { ...userInfo.cart, [props.id]: 1 };
        }
        updateItem("users/update", { ...userInfo }, userInfo.id);
        changeUser(userInfo);
    }

    return (
        <div className="storeContainer">
            <div className="card">
                <div className="signIn viewer" onClick={() => setShowItemInfo(true)}>
                    <img className="img" src={requireImage.default} alt={props.name}></img>
                    <span className="view">View</span>
                </div>
                <div>{props.name}</div>
                <span className="MSRP col-20"><small>Category: {props.category}</small></span>
                <span className="price col-20">Price: ${props.price}</span>
                <button className="btn-default btn-dark addToCart" onClick={() => { addToCart(); notify() }}>Add to Cart</button>
            </div>

            <ItemInfo
                show={showItemInfo}
                onCloseShow={() => setShowItemInfo(false)}
                image={props.image}
                name={props.name}
                onClick={() => { addToCart(); notify(); setShowItemInfo() }}
                price={props.price}
                inCart={false} />
        </div>
    )
}
