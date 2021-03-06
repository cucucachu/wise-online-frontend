import React, { Component } from 'react';

class NewCourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
    }

    handleClick() {
        const state = Object.assign({}, this.state);
        state.clicked = true;
        this.setState(state);
    }

    handleClickCancel() {
        const state = Object.assign({}, this.state);
        state.clicked = false;
        this.setState(state);
    }

    render() {
        if (this.state.clicked) {
            return (
                <div className="col-sm-6">
                    <div className="shadow" >
                        <div className="row">
                            <div className="col-sm-10">
                                <h2 className="course-title">New Course</h2>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn-neutral" onClick={this.handleClickCancel}><div style={{textAlign: 'center'}}>&#128473;</div></button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={this.props.handleSubmit}>
                                    <input type="text" placeholder="Enter class name" style={this.props.inputStype} onChange={this.props.handleChangeName}/>
                                    <input type="text" placeholder="Enter class ID" style={this.props.inputStype} onChange={this.props.handleChangeID}/>
                                    <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Create"/>
                                </form>
                            </div>
                            <div className="col-sm-6 text-plain-s">
                                Create a class name<br/>
                                e.g. ECON 101<br/>
                                Create a unique class ID<br/>
                                e.g. My ECON 101
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="col-sm-6"onClick={this.handleClick}>
                    <div className="create-course-div shadow" >
                        <div className="row">
                            <div className="create-course">
                                <h2 className="center-v-h">Create course</h2>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default NewCourseCard;