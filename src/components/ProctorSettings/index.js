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

// These are hardcoded but shouldn't be!
const restrictedDomains = [
    'wolframalpha.com',
    'paulsonlinemathnotes.com',
    'wikipedia.org',
    'analyzemath.com',
    'desmos.com',
    'geteasysolution.com',
    'facebook.com',
    'instagram.com',
    'mathway.com',
    'mathportal.org',
    'gmail.com',
    'socratic.org',
    'chegg.com',
    'bartelby.com',
    'youtube.com',
    'study.com',
    'symbolab.com',
    'doubtnut.com',
    'toppr.com',
    'reddit.com',
    'imathesis.com',
    'philschatz.com',
    'enotes.com',
    'varsitytutors.com',
    'kahnacademy.com',
    'stackexchange.com',
    'coursehero.com',
    'quizlet.com',
    'studyblue.com',
    'kahoot.com',
    'quizizz.com',
    'shmoop.com',
    'anki.com',
    'slader.com',
    'quora.com',
    'onlinecourseschools.com',
    'gradebees.com',
    'yahoo.com',
    'answers.com',
    'slideshare.com',
    'oppapers.com',
    'scribd.com',
    'medlibrary.org',
];

const allowedDomains = [
    'wiseattend.com',
    'canvas.com',
    'blackboard.com',
    'edgenuity.com',
    'edgenuity.us', 
    'speechstream.net',
    'pglms.org',
    'k12hsn.org',
    'middil.com',
    'ucopenaccess.org',
    'learnosity.com',
    'education2020.com',
    'desmos.com',
    'brightcove.com',
    'education2020.us',
    'explorelearning.com',
    'onetonline.org',
    'microsoft.com', 
    'fueleducation.com',
    'edynamiclearning.com',
];

class ProctorSettings extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            imageFrequency: 'LOW',
            facialRecognitionThreshold: 'LOW',
            restrictedDomains: [],
            allowedDomains: [],
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
            allowedDomains: currentProctorConfiguration.allowedDomains,
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
            restrictedDomains: restrictedDomains,
            allowedDomains: allowedDomains,
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
                this.props.history.push({
                    pathname: '/professor/exam',
                    state: {
                        course: this.props.history.location.state.course,
                    },
                });
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
                <p id='warning' className={
                    `red${this.state.facialRecognitionThreshold !== 'LOW' || this.state.imageFrequency !== 'LOW' ? '' : ' hidden'}`
                }>
                    Warning - higher settings may bring more false positive red-flags.  
                    Please only use this setting in high security exams.
                </p>
                <HorizontalSelector 
                    title="Image Capture Frequency"
                    options={['Normal', 'High', 'Extreme']}
                    onSelect={this.handleSelectFrequency}
                    selected={['LOW', 'MEDIUM', 'HIGH'].indexOf(this.state.imageFrequency)}
                />
                <div className="spacer-vertical-s"></div>
                <HorizontalSelector 
                    title="Security Level"
                    options={['Normal', 'High', 'Extreme']}
                    onSelect={this.handleSelectThreshold}
                    selected={['LOW', 'MEDIUM', 'HIGH'].indexOf(this.state.facialRecognitionThreshold)}
                />
                <div className="spacer-vertical-s"></div>
                {this.renderAllowOverride()}
                <div className="spacer-vertical-s"></div>
                <button className="btn btn-green" onClick={this.handleSubmit}>Start</button>
            </div>
        );
    }
}

export default ProctorSettings;