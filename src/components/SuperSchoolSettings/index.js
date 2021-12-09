import React, { Component } from 'react';
import attendanceIcon from '../../Assets/images/attendance-icon.png';

import { superUpdateSchool } from '../../store/axios';
import DataPane from '../Resusable/DataPane';
import Form from './Form';

class SuperSchoolSetings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.location.state,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // async componentDidMount() {
    //     // const response = await 
    // }

    handleChange(e) {
        this.setState({
            ...this.state,
            school: {
                ...this.state.school,
                [e.target.id]: e.target.value,
            } 
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = {
            ...this.state.school,
            unitPrice: Number(this.state.school.unitPrice),
            billingFrequency: Number(this.state.school.billingFrequency),
            audioEnabled: Boolean(this.state.school.audioEnabled),
        };

        try {
            const response = await superUpdateSchool(data);

            if (response.status === 200) {
                this.props.history.push('/super');
            }
        }      
        catch(error) {
            console.log(error);
        }  
    }

    render() {

        const questions = [
            // {
            //     label: "School Name",
            //     id: "name",
            //     type: "text",
            //     className: "",
            //     name: "",
            //     value: this.state.school.name,
            // },
            // {
            //     label: "Setup Key",
            //     id: "setupKey",
            //     type: "text",
            //     className: "",
            //     name: "",
            //     value: this.state.school.setupKey,
            // },
            // {
            //     label: "Integration Key",
            //     id: "integrationKey",
            //     type: "text",
            //     className: "",
            //     name: "",
            //     value: this.state.school.integrationKey,
            // },
            // {
            //     label: "Integration Name",
            //     id: "integrationName",
            //     type: "text",
            //     className: "",
            //     name: "",
            //     value: this.state.school.integrationName,
            // },
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
                value: this.state.school.billingFrequency,
            },  
        ];

        const schoolDetails = {
            'School': this.state.school.name,
            'Setup Key': this.state.school.setupKey,
            'Integration Key':this.state.school.integrationKey,
            "Integration Name":this.state.school.integrationName,

        };

        return (
            <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>School Info And Settings</h1>
                <h2>{this.state.school.name}</h2>
                <div className="spacer-vertical"></div>
                <DataPane
                    title="School Details"
                    data={schoolDetails}
                /> 
                <div className="spacer-vertical"></div>
                <Form 
                    questions={questions} 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit} 
                    buttonLabel="Save Changes"
                />      
            </div>
        )
    }

}

export default SuperSchoolSetings;