import React from 'react'
import PreviousOrder from './PreviousOrder.js'

export default function PreviousOrders(props) {
    return (
        <div className="container">
            {props.currentUser.orders && props.currentUser.orders.length ? <div>
                {Object.keys(props.currentUser.orders).map(order => {
                    return (
                        <div key={order}>
                            <PreviousOrder
                                index={order}
                                order={props.currentUser.orders[order]}
                                currentUser={props.currentUser} />
                        </div>
                    )
                })}
            </div> :
                <div><b>There are no previous orders</b></div>}
        </div>
    )
}
