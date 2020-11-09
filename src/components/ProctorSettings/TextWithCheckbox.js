import React from 'react';

function TextWithCheckbox(props) {
    return ( 
        <div className="text-with-checkbox">
            <span>{props.text}</span>      
            <input 
                type="checkbox"
                checked={props.checked}
                onChange={props.onClick}
            ></input>
        </div>
    )
}

export default TextWithCheckbox;