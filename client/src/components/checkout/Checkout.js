import React, { useState, useEffect } from 'react'
import { validateCheckoutForm, isEmptyField, validateField } from '../../shared/Validations'
import FormTextBox from '../formTextBox/FormTextBox'
import { getItem, getItems, sendEmail, updateItem } from '../../service/ProductService'
import './Checkout.css'
import { useHistory } from 'react-router-dom'
import Paypal from '../paypal/Paypal.js';
import Modal from 'react-bootstrap/Modal'
import logo from "../../assets/images/logo.png"


export default function Checkout(props) {
    const { total, date, cart, shipping } = (props.location && props.location.state) || { bool: false };
    const [show, setShow] = useState({ form: false, modal: false, cantUseInfo: false });
    const history = useHistory();
    const [countries, setCountries] = useState([]);
    const [formValues, setFormValues] = useState({
        name: "",
        shippingAddress: "",
        city: "",
        country: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        securityNumber: "",
        zipCode: ""
    });


    //object containig all forms' errors
    const [formErrors, setFormErrors] = useState({});
    const updateFormValues = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });

        //validating input and updating the forms errors
        let error = validateField(event.target);
        setFormErrors({
            ...formErrors,
            [event.target.name]: error
        })
    }

    const createOrder = () => {
        let order = [...cart];
        order.forEach((item, index) => {
            order[index] = { ...order[index], quantity: props.currentUser.cart[item.id] };
        })
        return order;
    }

    const cleanCartAndSendEmail = async () => {
        let cartToSend = `<br/><b>Item<b/>_________________<b>Quantity<b/>_____<b>Price<b/> <br/><br/>`;
        let order = createOrder();
        order.forEach(item => {
            let underlines = ``;
            for (let i = 0; i < 28 - item.name.length; i++) {
                underlines += `_`;
            }
            cartToSend += item.name + underlines + item.quantity + `________` + (item.price * item.quantity) + `<br/>`;
        })

        await sendEmail("users/confirmOrder", {
            email: props.currentUser.email,
            name: props.currentUser.name,
            date: date,
            order: cartToSend,
            total: total
        })

        let user = await getItem("users/users", props.currentUser.email);
        order.push({ shipping: shipping });
        order.push({ total: total });
        order.push({ date: date });
        user.orders.push(order);
        user.cart = {};
        await updateItem("users/update", user, props.currentUser.id);
        props.changeUser(user);
        history.push("/");
    }

    const handleSubmit = async (event) => {
        //preventing the page from refreshing
        event.preventDefault();

        //updating the forms errors
        let errors = validateCheckoutForm(formValues);
        setFormErrors({
            ...errors
        });

        //checking if there are no more errors
        let noErrors = true;
        Object.values(errors).forEach((err) => {
            noErrors &= isEmptyField(err)
        })
        if (noErrors) {
            setShow({ ...show, modal: true });
        }
    }

    const getCountries = async () => {
        let countries_ = await getItems("countries/all");
        setCountries(countries_);
    }

    useEffect(() => {
        getCountries();
    }, []);

    const goBack = () => {
        history.goBack();
    }

    const saveInformation = (e) => {
        if (e.target.checked) {
            let user = { ...props.currentUser, PaymentShipping: { ...formValues } };
            updateItem("users/update", user, props.currentUser.id);
            props.changeUser(user);
        } else {
            if ("cardNumber" in props.currentUser.PaymentShipping) {
                let user = { ...props.currentUser }
                delete user.PaymentShipping.cardNumber;
                updateItem("users/update", user, props.currentUser.id);
                props.changeUser(user);
            }
        }
    }

    const checkIfSavedInfo = (e) => {
        if ("cardNumber" in props.currentUser.PaymentShipping && e.target.checked) {
            setShow({ ...show, modal: true, cantUseInfo: false });
            return;
        }
        else {
            setShow({ ...show, cantUseInfo: true });
        }
        if (!e.target.checked) {
            setShow({ ...show, cantUseInfo: false });
        }

    }

    return (
        <div>
            <button className="signIn goBack" onClick={goBack}>back to cart</button>
            <div className="container pay">
                <h4>Choose payment Method</h4>
                <ul role="tablist" className="nav nav-pills rounded nav-fill mb-3">
                    <li className="nav-item center" >
                        <button className="signIn in" onClick={() => setShow({ ...show, form: true })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                        </svg> Credit Card</button>
                    </li>
                    <li className="nav-item" >
                        <Paypal className="paypal-button" history={history} total={total} cleanCart={cleanCartAndSendEmail} currency={props.currency} />
                    </li>
                </ul>
            </div>
            {show.form &&
                <div className="container check ">
                    <div className="signup-form" >
                        <form className="row g-1" onSubmit={handleSubmit}>
                            <h2>Payment Information</h2>
                            <label className="save" htmlFor="usePrevious"><input type="checkbox" id="usePrevious" name="usePrevious" onChange={(e) => checkIfSavedInfo(e)} />
                                Use previous shipping and credit card information?</label>
                            {show.cantUseInfo && <div className="small_">Sorry, we dont have your credit card information saved in our system, please fill out the form to continue.</div>}
                            <FormTextBox
                                type="text"
                                name="name"
                                placeholder="Full name as appears on card"
                                value={formValues.name}
                                onChange={updateFormValues}
                                small={formErrors.name}
                                class_="col-5"
                            />

                            <FormTextBox
                                type="text"
                                name="shippingAddress"
                                placeholder="Shipping/Billing Address"
                                value={formValues.shippingAddress}
                                onChange={updateFormValues}
                                small={formErrors.shippingAddress}
                                class_="col-12" />

                            <FormTextBox
                                type="text"
                                name="city"
                                placeholder="city (state)"
                                value={formValues.city}
                                onChange={updateFormValues}
                                small={formErrors.city}
                                class_="col-md-4" />

                            <div className="col-md-4">
                                <select name="country"
                                    className="form-control"
                                    onChange={updateFormValues}
                                >
                                    <option value="" hidden>Country</option>
                                    {countries.map((item,index) => {
                                        return (<option key={index} value={item.name}>{item.name}</option>)
                                    })}
                                </select>
                                {formErrors.country !== "" && <small className="form-text small_">{formErrors.country}</small>}
                            </div>
                            <FormTextBox
                                type="text"
                                name="zipCode"
                                placeholder="Zip/postal code"
                                value={formValues.zipCode}
                                onChange={updateFormValues}
                                small={formErrors.zipCode}
                                class_="col-md-4" />

                            <FormTextBox
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={formValues.phoneNumber}
                                onChange={updateFormValues}
                                small={formErrors.phoneNumber}
                                class_="col-12" />

                            <FormTextBox
                                type="text"
                                name="cardNumber"
                                placeholder="Card number"
                                value={formValues.cardNumber}
                                onChange={updateFormValues}
                                small={formErrors.cardNumber}
                                class_="col-12" />

                            <FormTextBox
                                type="text"
                                name="expirationDate"
                                placeholder="Expiration date (MM / YYYY)"
                                value={formValues.expirationDate}
                                onChange={updateFormValues}
                                small={formErrors.expirationDate}
                                class_="col-md-8" />

                            <FormTextBox
                                type="text"
                                name="securityNumber"
                                placeholder="Cvv"
                                value={formValues.securityNumber}
                                onChange={updateFormValues}
                                small={formErrors.securityNumber}
                                class_="col-md-4" />

                            <label className="save" htmlFor="save"><input type="checkbox" id="save" name="save" value="save" onChange={(e) => saveInformation(e)} />
                                Save credit card and shipping information for the future purchases.</label>

                            <div className="form-group">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-lg"
                                    onClick={handleSubmit}>Pay now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <Modal show={show.modal} onHide={() => setShow({ ...show, modal: false })} className="modal">
                <Modal.Header className="text-center">
                    <img src={logo} alt="site logo" width="40%" />
                    <h4 className="w-100">Thank You!</h4></Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="signup-form container">
                        By clicking <button className="signIn"
                            onClick={() => { setShow({ ...show, modal: false }); cleanCartAndSendEmail() }}>OK</button>
                        you will receive a confirmation email of your order.<br />
                        If you want to cancel your order press
                        <button type="button" className="signIn" onClick={() => setShow({ ...show, modal: false })}>
                            cancel payment.</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}
