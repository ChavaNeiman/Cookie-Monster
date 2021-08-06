import React, { useState } from 'react'
import ShoppingCartItem from '../shoppingCartItem/ShoppingCartItem.js'
import './PreviousOrder.css'

export default function PreviousOrder(props) {
    const [showOrder, setShowOrder] = useState(false);
    let sumOfItems=0;
    Object.keys(props.order.slice(0,props.order.length-3)).map(item=>{
        sumOfItems+= +props.order[item].quantity;
    })
    return (
        <div>
            <button className="prevOrders" onClick={() => setShowOrder(!showOrder)}>
                <span className="orderNumber">{(showOrder ? "Close order" : "Show order")}</span>
                {"Order " + (+props.index + 1)+ "-"+ props.order[props.order.length-1].date}
                <span className="orderAmount">{"Amount of items in order: " + sumOfItems}</span>
            </button>

            {showOrder && <section className="actualOrder">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card wish-list mb-3">
                            <div className="card-body">
                                <h5 className="mb-4">
                                    <div className="cartAmount">Cart <span> ({sumOfItems} items)</span>
                                    </div>
                                </h5>
                                {Object.keys(props.order.slice(0, props.order.length - 3)).map((index) => {
                                    return (<div key={index}>

                                        <ShoppingCartItem
                                            id={props.order[index].id}
                                            image={props.order[index].image}
                                            price={props.order[index].price}
                                            name={props.order[index].name}
                                            currentUser={props.currentUser}
                                            changeUser={(user) => { props.changeUser(user) }}
                                            isOrder={true}
                                            quantity={props.order[index].quantity}
                                            order={props.order}
                                        />
                                        <hr className="mb-4" />
                                    </div>)
                                })}

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
              <span>${(props.order[props.order.length - 2].total - +props.order[props.order.length - 2].total * (17 / 100)).toFixed(2)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-0">
                                        Shipping
              <span>${props.order[props.order.length - 3].shipping}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Vat
              <span>${(props.order[props.order.length - 2].total * (17 / 100)).toFixed(2)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Order Total</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>${props.order[props.order.length - 2].total}</strong></span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </div>
    )
}
