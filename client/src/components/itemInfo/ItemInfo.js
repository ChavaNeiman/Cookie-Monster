import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './ItemInfo.css'

export default function ItemInfo(props) {
	let requireImage = require("../../assets/images/" + props.image);
	return (
		<Modal show={props.show} onHide={props.onCloseShow} className="modal">
			<Modal.Body className="modalBody">
				<div className="signup-form" >
					<button type="button" className="btn btn-block btn-lg close_" onClick={props.onCloseShow}>&times;</button>
					<h5>{props.name}</h5>
					<img src={requireImage.default} alt={props.name} className="bigImage" />
					<span className="price col-20">Price: ${props.price}</span>
					<div className="form-group">
						{!props.isOrder && <button className="btn btn-primary btn-block btn-lg" onClick={props.onClick}>{props.inCart ? "Remove from Cart" : "Add to Cart"}</button>}
					</div>
				</div>
			</Modal.Body>
			{!props.isOrder && <Modal.Footer className="modal-footer">
				<button className="btn btn-block btn-lg back" onClick={props.onCloseShow}>Back to Shopping</button>
			</Modal.Footer>}
		</Modal>
	)
}
