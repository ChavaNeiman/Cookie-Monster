import React, { useState } from 'react'
import './ShoppingCartItem.css'
import { getItem, updateItem } from '../../service/ProductService'
import ItemInfo from '../itemInfo/ItemInfo.js';

export default function ShoppingCartItem(props) {
  let imageSource =require("../../assets/images/" + props.image);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const tmpQuantity = props.isOrder ? props.quantity : props.currentUser.cart[props.id];
  const [quantity, setQuantity] = useState(tmpQuantity);
  let changeUser = props.changeUser;

  const removeItem = async () => {
    let user = await getItem("users/users" , props.currentUser.email);
    delete user.cart[props.id];
    updateItem("users/update", user, props.currentUser.id);
    changeUser(user);
  }

  const changeQauntity = async (e) => {
    if (!props.isOrder) {
      setQuantity(e.target.value);
      if (+e.target.value) {
        let itemToUpdate = await getItem("users/users" , props.currentUser.email);
        itemToUpdate.cart[props.id] = +e.target.value;
        updateItem("users/update" ,itemToUpdate, props.currentUser.id);
        changeUser(itemToUpdate);
      } else {
        removeItem();
      }
    }
  }

  return (
    <div className="row cart">
      <div className="col-md-5 col-lg-3 col-xl-3">

        <div className="mask waves-effect waves-light signIn show-view" onClick={() => setShowItemInfo(true)}>
          <img className="img-fluid w-100 itemImage" src={imageSource.default} alt="" />
          <span className="view">View</span>
        </div>

      </div>
      <div className="col-md-7 col-lg-9 col-xl-9">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h5>{props.name}</h5>
            </div>
            <div>
              <div className="">
                <input className="quantity" min="0" name="quantity" value={quantity} type="number" onChange={changeQauntity} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {!props.isOrder ?<div>
              <button className="card-link-secondary small text-uppercase mr-3 red signIn" onClick={removeItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>  Remove item </button>
            </div>:
            <div className="card-link-secondary small text-uppercase mr-3 red signIn"></div>}
            <p className="mb-0"><span><strong>${props.price * (props.isOrder? props.quantity : props.currentUser.cart[props.id])}</strong></span></p>
          </div>
        </div>
      </div>
      
      <ItemInfo
        show={showItemInfo}
        onCloseShow={() => setShowItemInfo(false)}
        image={props.image}
        name={props.name}
        onClick={removeItem}
        price={props.price}
        inCart={true} 
        isOrder={props.isOrder}/>
    </div>
  )
}
