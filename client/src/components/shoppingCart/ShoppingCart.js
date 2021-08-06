import React, { useEffect, useState } from 'react'
import ShoppingCartItem from '../shoppingCartItem/ShoppingCartItem'
import { getItems } from '../../service/ProductService'
import './ShoppingCart.css'
import { useHistory } from "react-router-dom";

export default function ShoppingCart(props) {
  const goToTop = props.goToTop;
  let history = useHistory();
  const [myItems, setMyItems] = useState([]);
  const [shipping, setShipping] = useState(0);
  const changeUser = props.changeUser;

  async function fetchData() {
    let allStoreItems = await getItems("items/all",false);
    let myTempItems = allStoreItems.filter(item => item.id in (props.currentUser.cart));
    setMyItems(myTempItems);
  }

  const goBack = () => {
    history.goBack();
  }

  const goToCheckout = () => {
    history.push({
      pathname: "/checkout",
      state: {
        total: (temporaryTotal + shipping + +vat),
        date: (new Date()).toString().split(" ", 3).join(" "),
        cart: myItems,
        shipping: shipping,
        bool: true
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [props.currentUser.cart]);

  useEffect(() => {
    goToTop();
  }, []);

  let temporaryTotal = myItems.reduce((prev, cur) => +prev + +cur.price * props.currentUser.cart[cur.id], 0);
  let vat = ((shipping + temporaryTotal) * 0.175).toFixed(2);

  const getDate_ = (days) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    let tmpDate = date.toString();
    return tmpDate.split(" ", 3).join(" ");
  }

  return (
    <div className="container">
      {myItems !== [] ?<section>
        <div className="row">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">
                  <div className="cartAmount">Cart {myItems.length !== 0 && <span> ({myItems.length} items)</span>}
                    <small><button className="signIn goBack" onClick={goBack}>back</button></small></div>
                </h5>
                {!myItems.length && <div>Your cart is empty.</div>}
                {Object.keys(myItems).map((index) => {
                  return (<div key={myItems[index].id}>
                    <ShoppingCartItem
                      id={myItems[index].id}
                      image={myItems[index].image}
                      price={myItems[index].price}
                      name={myItems[index].name}
                      currentUser={props.currentUser}
                      changeUser={(user) => { changeUser(user) }}
                      isOrder={false}
                    />
                    <hr className="mb-4" />
                  </div>)
                })}

              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">

                <h5 className="mb-4">Estimated delivery</h5>

                <div className="inputGroup">
                  <input className="input" id="radio1" name="radio" type="radio" onChange={() => { setShipping(10) }} />
                  <label htmlFor="radio1">Next day {getDate_(1)}<small className="right"> $10</small></label>
                </div>
                <div className="inputGroup">
                  <input className="input" id="radio2" name="radio" type="radio" onChange={() => { setShipping(5) }} />
                  <label htmlFor="radio2">3 days {getDate_(3)}<small className="right"> $5</small></label>
                </div>
                <div className="inputGroup">
                  <input className="input" id="radio3" name="radio" type="radio" onChange={(e) => { setShipping(5) }} defaultChecked />
                  <label htmlFor="radio3" >1 week {getDate_(7)}<small className="right"> Standard - FREE</small></label>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">

                <h5 className="mb-4">We accept</h5>

                <img className="mr-2 creditCards" width="45px"
                  src="https://raw.githubusercontent.com/FreshVine/Payment-Methods-SVG/master/icons/cards/visa.svg?sanitize=true"
                  alt="Visa" />
                <img className="mr-2 creditCards" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <img className="mr-2 creditCards" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                <img className="mr-2 creditCards" width="45px"
                  src="https://raw.githubusercontent.com/FreshVine/Payment-Methods-SVG/master/icons/cards/diners-club.svg?sanitize=true"
                  alt="Diners Club" />
                <img className="mr-2 creditCards" width="45px"
                  src="https://raw.githubusercontent.com/FreshVine/Payment-Methods-SVG/master/icons/cards/discover.svg?sanitize=true"
                  alt="Discover" />
              </div>
            </div>

          </div>

          <div className="col-lg-4">


            <div className="card mb-3">
              <div className="card-body">

                <h5 className="mb-3">The total amount of</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal
              <span>${temporaryTotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-0">
                    Shipping
              <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Vat
              <span>${vat}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Order Total</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span><strong>${temporaryTotal + shipping + +vat}</strong></span>
                  </li>
                </ul>

                <button type="button" className="btn checkout in" onClick={goToCheckout}>proceed to checkout</button>

              </div>
            </div>
          </div>
        </div>
      </section>:
      <div class="lds-facebook"><div></div><div></div><div></div></div>}
    </div>
  )
}

