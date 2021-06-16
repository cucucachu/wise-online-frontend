import React, { Component } from 'react';

import { i18n } from 'web-translate';

class AdminNewTermCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            name: '',
            id: ''
        }

        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        if (this.props.openForm) {
            return (
                <div className="col-sm-6">
                    <div className="shadow" >
                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={this.props.handleSubmit}>
                                    <input type="text" placeholder={i18n("Enter term name")} className="input-settings" name="name" onChange={this.props.handleChange}/>
                                    {/* <input type="text" placeholder="Enter term ID" className="input-settings" onChange={this.props.handleChange} name="id"/> */}
                                    
                                    <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value={i18n("Create")}/>
                                </form>
                            </div>
                            <div className="col-sm-6 text-plain-s">
                                {i18n("Create a term name")}<br/>
                                {i18n("e.g. Wise Term 1")}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="col-sm-6"onClick={this.props.handleOpenForm}>
                    <div className="create-course-div shadow" >
                        <div className="row">
                            <div className="create-course">
                                <h2 className="center-v-h">{i18n("Create new term")}</h2>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AdminNewTermCard;