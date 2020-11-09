import React, { Component } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import icon from '../../Assets/images/attend-class.png';

import HorizontalSelector from './HorizontalSelector';
import TextWithCheckbox from './TextWithCheckbox';

import { 
    adminGetProctorConfiguration, 
    professorGetProctorConfiguration, 
    adminSetProctorConfiguration,
    professorSetProctorConfiguration,
 } from '../../store/axios';

class ProctorSettings extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            imageFrequency: 'LOW',
            facialRecognitionThreshold: 'LOW',
            restrictedDomains: [],
            allowOverride: false,
            role: null,
        }

        this.handleSelectFrequency = this.handleSelectFrequency.bind(this);
        this.handleSelectThreshold = this.handleSelectThreshold.bind(this);
        this.handleClickAllowOverride = this.handleClickAllowOverride.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getCurrentProctorConfiguration() {
        let currentProctorConfiguration;

        if (this.context.role === 'Admin') {
            const result = await adminGetProctorConfiguration();
            currentProctorConfiguration = result.data.proctorConfiguration;
        }
        else if (this.context.role === 'Professor') {
            const result = await professorGetProctorConfiguration();
            currentProctorConfiguration = result.data.proctorConfiguration;
        }
        else {
            console.log('no role');
            return;
        }

        let imageFrequency, facialRecognitionThreshold;

        if (currentProctorConfiguration === null) {
            this.setState({
                role: this.context.role,
            });
            return;
        }

        if (currentProctorConfiguration.webcamInterval <= 4) {
            imageFrequency = 'HIGH';
        }
        else if (currentProctorConfiguration.webcamInterval > 4 && currentProctorConfiguration.webcamInterval <= 10) {
            imageFrequency = 'MEDIUM';
        }
        else {
            imageFrequency = 'LOW';
        }

        switch (currentProctorConfiguration.facialRecognitionThreshold) {
            case .9:
                facialRecognitionThreshold = 'HIGH';
                break;
            case .75:
                facialRecognitionThreshold = 'MEDIUM';
                break;
            case .5:
                facialRecognitionThreshold = 'LOW';
                break;
            default:
                facialRecognitionThreshold = 'LOW';
        }

        this.setState({
            ...this.state,
            imageFrequency,
            facialRecognitionThreshold,
            restrictedDomains: currentProctorConfiguration.restrictedDomains,
            allowOverride: currentProctorConfiguration.allowOverride,
            role: this.context.role,
        });
    }

    handleSelectFrequency(index) {
        const options = ['LOW', 'MEDIUM', 'HIGH'];

        this.setState({
            ...this.state,
            imageFrequency: options[index],
        });
    }

    handleSelectThreshold(index) {
        const options = ['LOW', 'MEDIUM', 'HIGH'];

        this.setState({
            ...this.state,
            facialRecognitionThreshold: options[index],
        });
    }

    handleClickAllowOverride() {
        console.log('clicked');
        console.log(`current = ${this.state.allowOverride}`);

        this.setState({
            ...this.state,
            allowOverride: !this.state.allowOverride,
        });
    }

    async handleSubmit() {
        let screenshotInterval, webcamInterval, facialRecognitionThreshold;

        switch (this.state.imageFrequency) {
            case 'LOW':
                screenshotInterval = 20;
                webcamInterval = 20;
                break;
            case 'MEDIUM':
                screenshotInterval = 10;
                webcamInterval = 10;
                break;
            case 'HIGH':
                screenshotInterval = 4;
                webcamInterval = 4;
                break;
            default: 
                screenshotInterval = 10;
                webcamInterval = 10;
        }

        switch (this.state.facialRecognitionThreshold) {
            case 'LOW':
                facialRecognitionThreshold = .5;
                break;
            case 'MEDIUM':
                facialRecognitionThreshold = .75;
                break;
            case 'HIGH':
                facialRecognitionThreshold = .90;
                break;
            default: 
                facialRecognitionThreshold = .5;
        }

        const requestData = {
            screenshotInterval,
            webcamInterval, 
            facialRecognitionThreshold, 
            restrictedDomains: this.state.restrictedDomains, 
            allowOverride: this.state.allowOverride,
        };

        let response;

        if (this.state.role === 'Admin') {
            response = await adminSetProctorConfiguration(requestData);
        }
        else if (this.state.role === 'Professor') {
            response = await professorSetProctorConfiguration(requestData);
        }
        else {
            console.log('no role');
        }

        if (response && response.status === 200) {
            if (this.state.role === 'Admin') {
                this.props.history.push('/admin');
            }
            else if (this.state.role === 'Professor') {
                this.props.history.push('/professor/course');
            }
        }
        else if (response) {
            console.log(response.data);
        }
    }

    renderAllowOverride() {
        if (this.state.role === 'Admin') {
            return (
                <div className="shadow width-80">
                    <TextWithCheckbox 
                        text="Allow professors to override these settings."
                        checked={this.state.allowOverride}
                        onClick={this.handleClickAllowOverride}
                    />
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    render() {
        if (this.state.role === null && this.context.role !== '') {
            this.getCurrentProctorConfiguration();
        }

        return (
            <div className="container">
                <img src={icon} className="page-icon" alt="login icon"/>
                <h1>Proctor Settings</h1>
                <div className="spacer-vertical-s"></div>
                <HorizontalSelector 
                    title="Image Capture Frequency"
                    options={['Low', 'Medium', 'High']}
                    onSelect={this.handleSelectFrequency}
                    selected={['LOW', 'MEDIUM', 'HIGH'].indexOf(this.state.imageFrequency)}
                />
                <div className="spacer-vertical-s"></div>
                <HorizontalSelector 
                    title="Security Level"
                    options={['Quiz', 'Test', 'Exam']}
                    onSelect={this.handleSelectThreshold}
                    selected={['LOW', 'MEDIUM', 'HIGH'].indexOf(this.state.facialRecognitionThreshold)}
                />
                <div className="spacer-vertical-s"></div>
                {this.renderAllowOverride()}
                <div className="spacer-vertical-s"></div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default ProctorSettings;