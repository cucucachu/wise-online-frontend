import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import icon from '../../Assets/images/attend-class.png';

import ClipboardLink from '../ClipboardLink';
import HorizontalSelector from '../ProctorSettings/HorizontalSelector';
import LabeledTextInput from '../Resusable/LabeledTextInput';
import TextWithCheckbox from '../Resusable/TextWithCheckbox';

import { proctoringSchoolAllowsAudio, proctoringProfessorCreateTest } from '../../store/axios';

class ProfessorStartProctoring extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            keyCode: '',
            link: '',
            testName: '',
            testLink: '',
            testPassword: '',
            imageFrequency: 'LOW',
            facialRecognitionThreshold: 'LOW',
            schoolAllowsAudio: false,
            audioEnabled: false,
            demoEnabled: false,
        };

        this.handleSelectFrequency = this.handleSelectFrequency.bind(this);
        this.handleSelectThreshold = this.handleSelectThreshold.bind(this);
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickAudio = this.handleClickAudio.bind(this);
        this.handleClickDemo = this.handleClickDemo.bind(this);
    }

    async componentDidMount() {
        const response = await proctoringSchoolAllowsAudio(); 

        this.setState({
            ...this.state,
            schoolAllowsAudio: response.data.audioAllowed,
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

    handleChangeTextInput(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.attributes.property.value]: e.target.value,
        });
    }

    handleClickAudio(e) {

        this.setState({
            ...this.state,
            audioEnabled: e.target.checked,
        });
    }

    handleClickDemo(e) {

        this.setState({
            ...this.state,
            demoEnabled: e.target.checked,
        });
    }

    async handleSubmit() {

        if(this.state.demoEnabled) {

            let link;

            if (window.location.hostname === 'localhost') {
                link = `http://localhost:3000/student/demo/proctor`;
            }
            else {
                link = `https://${window.location.hostname}/student/demo/proctor`;
            }

            this.setState({
                ...this.state,
                success: true,
                link,
            });

        }
        else {
            let screenshotInterval, webcamInterval, facialRecognitionThreshold;

            switch (this.state.imageFrequency) {
                case 'LOW':
                    screenshotInterval = 15;
                    webcamInterval = 15;
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
                courseId: this.props.location.state.course._id,
                publicKey: this.state.publicKey ? this.state.publicKey : undefined,
                testName: this.state.testName ? this.state.testName : undefined,
                testLink: this.state.testLink ? this.state.testLink : undefined,
                testPassword: this.state.testPassword ? this.state.testPassword : undefined,
                screenshotInterval,
                webcamInterval,
                facialRecognitionThreshold,
                audioEnabled: this.state.audioEnabled,
            };



            const response = await proctoringProfessorCreateTest(requestData);

            if (response && response.status === 200) {
                const keyCode = response.data.test.keyCode;
                let link;
                const classId = this.props.location.state.course.classId;

                if (window.location.hostname === 'localhost') {
                    link = `http://localhost:3000/student/testLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
                }
                else {
                    link = `https://${window.location.hostname}/student/testLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
                }

                this.setState({
                    ...this.state,
                    success: true,
                    keyCode,
                    link,
                });
            }

        }

    }

    render() {
        if (this.state.success === true) {
            return (
                <div className="container">
                    <img src={icon} className="page-icon" alt="login icon"/>
                    <h1>Test Created</h1>
                    <div className="spacer-vertical" />
                    <h1>Share this URL Link with Students</h1>
                    <div className="spacer-vertical" />
                    <h2 className="width-slim bold">Copy and paste this link into the description of the test on your LMS</h2>
                    <div className="spacer-vertical" />
                    <ClipboardLink 
                        link={this.state.link}
                    />                    
                    <div className="spacer-vertical" />
                    {/* <h2 className="bold">Or share this test code with your students</h2>
                    <h2 className="bold">{this.state.keyCode}</h2>
                    <div className="spacer-vertical" /> */}
                    <Link to="/professor/course">
                        <button className="btn">Done</button>
                    </Link>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <img src={icon} className="page-icon" alt="login icon"/>
                    <h1>Start Test</h1>
                    <div className="spacer-vertical-s"></div>
                    <div className="shadow width-80 center">
                        <h2>Test Details</h2>
                        <hr></hr>
                        <p id='warning' className={
                            `red${this.state.facialRecognitionThreshold !== 'LOW' || this.state.imageFrequency !== 'LOW' ? '' : ' display-none'}`
                        }>
                            Warning - higher settings may bring more false positive red-flags.  
                            Please only use this setting in high security exams.
                        </p>
                        <LabeledTextInput 
                            label="Test Name:"
                            property="testName"
                            placeholder="Midterm 1 (optional)"
                            onChange={this.handleChangeTextInput}
                            value={this.state.testName}
                        />
                        <LabeledTextInput 
                            label="Link to Test:"
                            property="testLink"
                            placeholder="https://myschool.com/test/1 (optional)"
                            onChange={this.handleChangeTextInput}
                            value={this.state.testLink}
                        />
                        <LabeledTextInput
                            label="Test Password:"
                            property="testPassword"
                            placeholder="Password (optional)"
                            onChange={this.handleChangeTextInput}
                            value={this.state.testPassword}
                        />
                    </div>
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
                    {
                        this.state.schoolAllowsAudio &&
                        <div>

                            <div className="shadow horizontal-selector">
                                <TextWithCheckbox
                                    text="Audio Recording"
                                    checked={this.state.audioEnabled}
                                    onClick={this.handleClickAudio}
                                />
                            </div>

                            <div className="shadow horizontal-selector">
                                <TextWithCheckbox
                                    text="Demo Test"
                                    checked={this.state.demoEnabled}
                                    onClick={this.handleClickDemo}
                                />
                            </div>
                            
                            <div className="spacer-vertical-s"></div>
                        </div>
                    }
                    <button className="btn btn-green" onClick={this.handleSubmit}>Start</button>
                </div>
            );
        }
    }
}

export default ProfessorStartProctoring;