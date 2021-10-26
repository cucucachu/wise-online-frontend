
import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

export default function Form(props) {

    // const inputs = props.questions.map(q => <TextInput question={q} handleChange={props.handleChange}/>);

    const inputs = [];

    for(const question of props.questions) {
        if(question.type == "text" || question.type == "number")  {
            inputs.push(
                <TextInput question={question} handleChange={props.handleChange} />)
        }
        if(question.type == "select")  {
            inputs.push(
                <SelectInput question={question} handleChange={props.handleChange} />)
        }
    }

    return(
        <form className="schoolSettingsEditForm" onSubmit={props.handleSubmit}>
            {inputs}
            <div className="spacer-vertical"/>
            <input type="submit" className="btn" value={props.buttonLabel} />

            {props.children}
        </form>
     )
    
}