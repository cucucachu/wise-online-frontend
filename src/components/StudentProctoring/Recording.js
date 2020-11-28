import React, { Component } from 'react';


import { proctoringEndProctorSession } from '../../store/axios';


class GetPrivileges extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.endTest = this.endTest.bind(this);
    }

    async endTest() {
        await proctoringEndProctorSession({proctorSessionId: this.props.proctorSession._id});

        this.props.onEndRecording();
    }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>
                <h1>Recording</h1>
                <div className="spacer-vertical-s"></div>
                <div className="width-80 center">
                    <h2>You can begin your test now</h2>
                    {(() => {
                        if (this.props.test.testLink)
                            return (
                                <p className="black">
                                    Here is the link to your test:&nbsp;
                                    <a
                                        href={this.props.test.testLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{this.props.test.testLink}</a>
                                </p>
                            );
                        else return '';
                    })()}
                    <p className="black">Good Luck! When you're done, click the "I'm Done" button.</p>
                    <div className="spacer-vertical-s"></div>
                    <button className='btn' onClick={this.endTest}>Im Done!</button>
                </div>
            </div>
        )
    }
}

export default GetPrivileges;