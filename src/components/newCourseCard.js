import React from 'react';

function NewCourseCard (props) {
    return (
        <div className="col-sm-6">
            <div className="shadow" >
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={props.handleSubmit}>
                            <input type="text" placeholder="Enter class name" style={props.inputStype} onChange={props.handleChangeName}/>
                            <input type="text" placeholder="Enter class ID" style={props.inputStype} onChange={props.handleChangeID}/>
                            <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Create"/>
                        </form>
                    </div>
                    <div className="col-sm-6 text-plain-s">
                        Create a new class name,<br/>
                        e.g. ECON 101<br/>
                        <br/>
                        Create a unique class ID<br/>
                        e.g. ECON101SP
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCourseCard;