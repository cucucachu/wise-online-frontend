import React from 'react';

function LabeledTextInput(props) {
    return (
        <div className="labeled-input">
            <label>{props.label}</label>
            <input 
                type="text"
                property={props.property} 
                onChange={e => props.onChange(e)} 
                value={props.value}
                placeholder={props.placeholder ? props.placeholder : ""}
            >
            </input>
        </div>
    )
}

export default LabeledTextInput;