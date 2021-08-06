import React, { useState, useEffect } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default function Paypal(props) {

    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(props.total);
    }, [props.total]);

    const onSuccess = (payment) => {
        console.log("The payment succeeded!", payment);
        props.cleanCart();
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);   
    }

    let env = 'sandbox'; 
    let currency = 'USD'; 

    const client = {
        sandbox: 'AegpJUsNai6iouPuwQEPY1JdOUugGFiCjjjBx1qDbmoJbGV6HUjfFdPwAdhw0IpomVjIPNuAEiqpHlyP',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    
    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={{ color: "silver" }} />
    );
}