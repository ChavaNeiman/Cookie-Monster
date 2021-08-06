import React, { useState } from 'react'
import './SignIn.css'
import Modal from 'react-bootstrap/Modal'
import FormTextBox from '../formTextBox/FormTextBox'
import { validateForm, isEmptyField, validateField } from '../../shared/Validations'
import {getItem, updateItem } from '../../service/ProductService'

export default function SignIn(props) {

	const [formValues, setFormValues] = useState({
		email: "",
		password: ""
	})

	const changeUser = props.changeUser;

	//object containig all forms' errors
	const [formErrors, setFormErrors] = useState({});
	const [doesntExist, setDoesntExist] = useState(false);

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

	const mergeUser = (user1, user2) => {
		let mergedUser = {}, mergedCart = {};
		Object.entries(user1.cart).forEach(([key, value]) => {
			mergedCart = { ...mergedCart, [key]: value };
		})
		Object.entries(user2.cart).forEach(([key, value]) => {
			if (key in mergedCart) {
				mergedCart = { ...mergedCart, [key]: value + mergedCart[key] };
			}
			else {
				mergedCart = { ...mergedCart, [key]: value };
			}
		})
		mergedUser = { ...user2, cart: mergedCart };
		return mergedUser;
	}
	const loginToAccount = async () => {
		const loginUser = await getItem("users/users",formValues.email,true);
		if (loginUser.length!==0 && loginUser.password === formValues.password) {
			let mergedUser = mergeUser(props.currentUser, loginUser);
			await updateItem("users/update",{...props.currentUser, cart:{},orders:[]},"0");
			await updateItem("users/update" , mergedUser, loginUser.id);
			changeUser(mergedUser);
			props.onCloseShow();
			setDoesntExist(false);
		}else{
			setDoesntExist(true);
		}
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
			loginToAccount();
		}
	}

	return (
		<Modal show={props.show} onHide={props.onCloseShow} className="modal">
			<Modal.Body className="modalBody ">
				<div className="signup-form" >
					<form onSubmit={handleSubmit}>
						<button type="button" className="btn btn-block btn-lg close_" onClick={props.onCloseShow}>&times;</button>
						<h2>Login</h2>

						<FormTextBox
							type="email"
							name="email"
							placeholder="Email"
							value={formValues.email}
							onChange={updateFormValues}
							small={formErrors.email} />

						<FormTextBox
							type="password"
							name="password"
							placeholder="Password"
							value={formValues.password}
							onChange={updateFormValues}
							small={formErrors.password} />

						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block btn-lg" onClick={handleSubmit}>Sign In</button>
						</div>
						{doesntExist && <p className="small_">Sorry, you are not registered in our system, please sign up to continue.</p>}
					</form>
				</div>
			</Modal.Body>
			<Modal.Footer className="modal-footer">Don't have an account?
			<button className="signIn" onClick={props.openRegister}>
					create one</button>
			</Modal.Footer>
		</Modal>
	)
}
