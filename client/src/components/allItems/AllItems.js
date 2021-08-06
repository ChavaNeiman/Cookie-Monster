import React, { useEffect, useState } from 'react'
import Item from '../item/Item.js'
import './AllItems.css'
import { getItems } from '../../service/ProductService'

const AllItems = (props) => {
    const [items, setItems] = useState([]);
    let changeUser = props.changeUser;

    async function fetchData() {
        let storeItems = await getItems("items/all", props.location.category);
        setItems(storeItems);
    }

    useEffect(() => {
        fetchData();
    }, [props.location.category]);


    return (
        <div className="container allItems">
            {items !== [] ? <div className="row">
                {Object.keys(items).map((index) => {
                    return (<div className="col-3" key={items[index].id}>
                        <Item
                            id={items[index].id}
                            image={items[index].image}
                            price={items[index].price}
                            name={items[index].name}
                            category={items[index].category}
                            currentUser={props.currentUser}
                            changeUser={(user) => { changeUser(user); }}
                        />
                    </div>)
                })}
            </div> :
                <div class="lds-facebook"><div></div><div></div><div></div></div>}
            <button onClick={props.goToTop}
                className="goUp"></button>

        </div >
    )
}

export default AllItems;
