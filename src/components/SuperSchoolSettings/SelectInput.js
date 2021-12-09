import React from "react";
import { i18n } from 'web-translate';

export default function SelectInput(props) {

    const {question, handleChange} = props;
    let {label, id, type, placeholder, className, name, value, options} = question;

    const answers = options.map(a => <option key={a.key} value={a.value}> {a.label} </option>);

    value = value ? value : "UNDEFINED";

    // const answers = [];
    // let hadValue = false;

    // for(const answer of options) {
    //     if(answer.value === value) {
    //         answers.push(<option selected key={answer.key} value={answer.value}> {answer.label} </option>);
    //         hadValue = true;
    //     }
    //     else {
    //         answers.push(<option key={answer.key} value={answer.value}> {answer.label} </option>);
    //     }
    // }

    // if(!value) {
    //     answers.push(<option disabled selected> -- select an option -- </option>)
    // }


    return(
        <div> 
            <span className="input-label">{i18n(label)} </span>
            <select
            id={id}
            type={type}
            placeholder={placeholder}
            className={className}
            name={name}
            value={value}
            onChange={handleChange}> 

            <option disabled value="UNDEFINED"> -- select an option -- </option>

            {answers}
            
            </select>
        </div>
     )
    
}