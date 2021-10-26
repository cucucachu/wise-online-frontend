import React from "react";
import { i18n } from 'web-translate';

export default function TextInput(props) {

    const {question, handleChange} = props;
    const {label, id, type, placeholder, className, name, value} = question;

    return(
        <div> 
            <span className="input-label">{i18n(label)} </span>
            <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={className}
            name={name}
            value={value}
            onChange={handleChange}/>
        </div>
     )
    
}