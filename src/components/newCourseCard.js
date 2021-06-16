import React, { Component } from 'react';

import { i18n } from 'web-translate';

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
                                <h2 className="course-title">{i18n("New Course")}</h2>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn-neutral" onClick={this.handleClickCancel}><div style={{textAlign: 'center'}}>&#128473;</div></button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={this.props.handleSubmit}>
                                    <input type="text" placeholder={i18n("Enter class name")} style={this.props.inputStype} onChange={this.props.handleChangeName}/>
                                    <input type="text" placeholder={i18n("Enter class ID")} style={this.props.inputStype} onChange={this.props.handleChangeID}/>
                                    <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value={i18n("Create")}/>
                                </form>
                            </div>
                            <div className="col-sm-6 text-plain-s">
                                {i18n("Create a class name")}<br/>
                                {i18n("e.g. ECON 101")}<br/>
                                {i18n("Create a unique class ID")}<br/>
                                {i18n("e.g. My ECON 101")}
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
                                <h2 className="center-v-h">{i18n("Create course")}</h2>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default NewCourseCard;