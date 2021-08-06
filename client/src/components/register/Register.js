import React, { useState } from 'react'
import './Register.css'
import Modal from 'react-bootstrap/Modal'
import { validateForm, isEmptyField, validateField } from '../../shared/Validations'
import FormTextBox from '../formTextBox/FormTextBox'
import { addToDb, getItem, updateItem } from '../../service/ProductService'
import { Link } from 'react-router-dom';

export default function Register(props) {
    const changeUser = props.changeUser;
    const [formValues, setFormValues] = useState({
        name: "",
        id: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isRegistered, setIsRegistered] = useState(false);

    //object containig all forms' errors
    const [formErrors, setFormErrors] = useState({});

    //updating the forms values after new input
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

    const handleSubmit = async (event) => {
        //preventing the page from refreshing
        event.preventDefault();

        //updating the forms errors
        let errors = validateForm(formValues);
        setFormErrors({
            ...errors
        });

        //checking if there are no more errors
        let noErrors = true;
        Object.values(errors).forEach((err) => {
            noErrors &= isEmptyField(err)
        })        
        if (noErrors) {
            const user = await getItem("users/users",formValues.email,true);
            if (user.length!==0) {
                setIsRegistered(true);
            }
            else {
                await updateItem("users/update",{...props.currentUser, cart:{},orders:[]},"0");
                addToDb("users/addUser", { ...formValues, cart: props.currentUser.cart });
                changeUser({ ...formValues, cart: props.currentUser.cart });
                props.onCloseShow();
            }
        }
    }

    return (
        <Modal className="modal regist" show={props.show} onHide={props.onCloseShow}>
            <Modal.Body className="modalBody ">
                <div className="signup-form" >
                    <form onSubmit={handleSubmit}>
                        <button type="button"
                            className="btn btn-block btn-lg close_"
                            onClick={props.onCloseShow}>&times;
                        </button>
                        <h2>Create Account</h2>

                        <FormTextBox
                            type="text"
                            name="name"
                            placeholder="Username"
                            value={formValues.name}
                            onChange={updateFormValues}
                            small={formErrors.name}
                            class_="" />

                        <FormTextBox
                            type="text"
                            name="id"
                            placeholder="ID"
                            value={formValues.id}
                            onChange={updateFormValues}
                            small={formErrors.id}
                            class_="" />

                        <FormTextBox
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formValues.email}
                            onChange={updateFormValues}
                            small={formErrors.email}
                            class_="" />

                        <FormTextBox
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={updateFormValues}
                            small={formErrors.password}
                            class_="" />

                        <FormTextBox
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formValues.confirmPassword}
                            onChange={updateFormValues}
                            small={formErrors.confirmPassword}
                            class_="" />

                        <div className="form-group">
                            <button type="submit"
                                className="btn btn-primary btn-block btn-lg"
                                onClick={handleSubmit}>Sign Up
                            </button>
                        </div>
                        {isRegistered && <div className="small_ small">You are already signed up, please go to login.</div>}
                        <div className="small text-center">
                            By clicking the Sign Up button, you agree to our <br />
                            <Link className="terms" to="/termsAndConditions" onClick={props.onCloseShow}>Terms &amp; Conditions</Link>, and
                            <Link className="terms" to="/privacyPolicy" onClick={props.onCloseShow}> Privacy Policy</Link>.
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>Already have an account?
                <button className="signIn" onClick={props.openSignIn}>Login here</button>
            </Modal.Footer>
        </Modal>

    )
}
