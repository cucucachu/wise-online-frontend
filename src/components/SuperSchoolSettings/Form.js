
import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

export default function Form(props) {

    // const inputs = props.questions.map(q => <TextInput question={q} handleChange={props.handleChange}/>);

    const inputs = [];

    // const convertFormInput = () => {
    //     for(let question of questions) {
    //         switch(question.type) {
    //             case("number") :
    //                 question.value = toString(question.value);
    //         }
    //     }
    // }

    // const revertFormInput = event => {
    //     const question = props.questions.filter( q => q.id == e.target.id )[0];
    //     const myEvent = {
    //         target: {
    //             value: '',
    //             id: e.target.id
    //         }
    //     }

    //     switch(question.type) {
    //         case("number") :
    //             myEvent.target.value = Number(e.target.value);
    //     }
    //     props.handleChange(myEvent);
    // }



    for(const question of props.questions) {
        if(question.type === "text" || question.type === "number")  {
            inputs.push(
                <TextInput question={question} handleChange={props.handleChange} />)
        }
        if(question.type === "select")  {
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