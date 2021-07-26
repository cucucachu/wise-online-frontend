import React, { Component } from 'react';
import attendanceIcon from '../../Assets/images/attendance-icon.png';

import { superSetAudioEnabled } from '../../store/axios';

import TextWithCheckbox from '../Resusable/TextWithCheckbox';

class SuperSchoolSetings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.location.state,
        }

        this.handleClickAudioEnabled = this.handleClickAudioEnabled.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }

    handleClickAudioEnabled(e) {

        this.setState({
            ...this.state,
            school: {
                ...this.state.school,
                audioEnabled: this.state.school.audioEnabled ? false : true,
            }
        });
    }

    async handleClickSubmit(e) {
        e.preventDefault();

        try {
            const response = await superSetAudioEnabled({
                schoolId: this.state.school._id,
                 enable: this.state.school.audioEnabled
            });

            if (response.status == 200) {
                this.props.history.push('/super');
            }
        }
        catch (error) {

        }
    }

    render() {
        return (
            <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>School Settings</h1>
                <h2>{this.state.school.name}</h2>
                <div className="spacer-vertical"></div>
                <TextWithCheckbox
                    text="Audio Enabled"
                    checked={this.state.school.audioEnabled}
                    onClick={this.handleClickAudioEnabled}
                />
                <div className="spacer-vertical"></div>
                <button 
                    onClick={this.handleClickSubmit}
                    className="btn"
                >
                    Submit
                </button>
            </div>
        )
    }

}

export default SuperSchoolSetings;