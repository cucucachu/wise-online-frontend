import React, { Component } from 'react';
import attendanceIcon from '../../Assets/images/attendance-icon.png';

import { superSetAudioEnabled, superUpdateSchool } from '../../store/axios';

import TextWithCheckbox from '../Resusable/TextWithCheckbox';
import Form from './Form';

class SuperSchoolSetings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.location.state,
        }

        this.handleClickAudioEnabled = this.handleClickAudioEnabled.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        this.setState({
            ...this.state,
            school: {
                ...this.state.school,
                [e.target.id]: e.target.value,
            }
            
        });
    }

    async handleClickSubmit(e) {
        e.preventDefault();

        try {
            // const response = await superSetAudioEnabled({
            //     schoolId: this.state.school._id,
            //      enable: this.state.school.audioEnabled
            // });

            const response = await superUpdateSchool(this.state.school);

            if (response.status == 200) {
                this.props.history.push('/super');
            }
        }
        catch (error) {

        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
        //     const userAccount = await createUserAccount(this.state.email, this.state.password);
        //     this.props.successfulLoginHandler(userAccount);
        //     const user = await addUser({...this.state, uid : userAccount.uid});
        }      
        catch(error) {
            console.log(error);
        }  
    }

    render() {

        const questions = [
            {
                label: "School Name",
                id: "name",
                type: "text",
                className: "",
                name: "",
                value: this.state.school.name,
            },
            {
                label: "Setup Key",
                id: "setupKey",
                type: "text",
                className: "",
                name: "",
                value: this.state.school.setupKey,
            },
            {
                label: "Integration Key",
                id: "integrationKey",
                type: "text",
                className: "",
                name: "",
                value: this.state.school.integrationKey,
            },
            {
                label: "Integration Name",
                id: "integrationName",
                type: "text",
                className: "",
                name: "",
                value: this.state.school.integrationName,
            },
            {
                label: "Audio Enabled",
                id: "audioEnabled",
                type: "select",
                options: [
                    {
                        key: "Yes",
                        value: true,
                        label: "Yes"
                    },
                    {
                        key: "No",
                        value: false,
                        label: "No"
                    },
                ],
                className: "",
                name: "",
                value: this.state.school.audioEnabled,
            },
            {
                label: "Billing Type",
                id: "billingType",
                type: "select",
                options: [
                    {
                        key: "Per Student",
                        value: "student",
                        label: "Per Student"
                    },
                    {
                        key: "Per Test",
                        value: "test",
                        label: "Per Test"
                    },
                ],
                className: "",
                name: "",
                value: this.state.school.billingType,
            },
            {
                label: "Unit Price",
                id: "unitPrice",
                type: "number",
                className: "",
                name: "",
                value: this.state.school.unitPrice,
            },
            {
                label: "Billing Frequency",
                id: "billingFrequency",
                type: "select",
                options: [
                    {
                        key: "Quarter",
                        value: 10,
                        label: "Quarter"
                    },
                    {
                        key: "Semester",
                        value: 15,
                        label: "Semester"
                    },
                    {
                        key: "Annual",
                        value: 52,
                        label: "Annual"
                    },
                ],
                className: "",
                name: "",
                value: this.state.school.billingFrquency,
            },  
        ];

        return (
            <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>School Settings</h1>
                <h2>{this.state.school.name}</h2>
                <div className="spacer-vertical"></div>
                {/* <TextWithCheckbox
                    text="Audio Enabled"
                    checked={this.state.school.audioEnabled}
                    onClick={this.handleClickAudioEnabled}
                /> */}
                
                <Form questions={questions} handleChange={this.handleChange} handleSubmit={this.handleSubmit} buttonLabel="Save Changes"/>
                
            </div>
        )
    }

}

export default SuperSchoolSetings;