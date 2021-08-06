import React from 'react'
import './FormTextBox.css'

export default function FormTextBox({ type, name, value, onChange, small,placeholder,class_ }) {
    return (
        <div className={"form-group " + class_}>
            <div className="input-group">
                <input type={type}
                    className="form-control"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} /></div>
            {small !== "" && <small className="form-text small_">{small}</small>}
        </div>
    )
}

FormTextBox.defaultProps = {
    type: "text",
    name: "",
    value: "",
    onChange: "updateFormValues",
    small: "",
    class_:""
}

