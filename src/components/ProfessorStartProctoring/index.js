import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import icon from '../../Assets/images/attend-class.png';

import ClipboardLink from '../ClipboardLink';
import HorizontalSelector from '../ProctorSettings/HorizontalSelector';

import { proctoringProfessorCreateTest } from '../../store/axios';

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
            imageFrequency: 'LOW',
            facialRecognitionThreshold: 'LOW',
        }

        this.handleSelectFrequency = this.handleSelectFrequency.bind(this);
        this.handleSelectThreshold = this.handleSelectThreshold.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChangeTestLink(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            testLink: e.target.value,
        });
    }

    handleChangeTestName(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            testName: e.target.value,
        });
    }

    async handleSubmit() {
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
            screenshotInterval,
            webcamInterval,
            facialRecognitionThreshold,
        };

        const response = await proctoringProfessorCreateTest(requestData);

        if (response && response.status === 200) {
            const keyCode = response.data.test.keyCode;
            let link;
            const classId = this.props.location.state.course.classId;

            if (window.location.hostname === 'localhost') {
                link = `http://localhost:3000/student/testLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
            }
            else {
                link = `https://${window.location.hostname}/student/testLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
            }

            this.setState({
                ...this.state,
                success: true,
                keyCode,
                link,
            });
        }
    }

    render() {
        if (this.state.success === true) {
            return (
                <div className="container">
                    <img src={icon} className="page-icon" alt="login icon"/>
                    <h1>Test Created</h1>
                    <div className="spacer-vertical"></div>
                    <h1>Share this URL Link with Students</h1>
                    <div className="spacer-vertical"></div>
                    <h2 className="width-slim bold">Copy and paste this link into the description of the test on your LMS</h2>
                    <div className="spacer-vertical"></div>
                    <ClipboardLink 
                        link={this.state.link}
                    />                    
                    <div className="spacer-vertical"></div>
                    <h2 className="bold">Or share this test code with your students</h2>
                    <h2 className="bold">{this.state.keyCode}</h2>
                    <div className="spacer-vertical"></div>
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
                    <div className="shadow full-width">
                        <h2>Test Details</h2>
                        <div className="labeled-input">
                            <label>Test Name</label>
                            <input 
                                type="text" 
                                property="testName" 
                                onChange={e => this.handleChangeTestName(e)} 
                                value={this.state.testName}>
                            </input>
                        </div>
                        <div className="labeled-input">
                            <label>Link to Test</label>
                            <input type="text" onChange={e => this.handleChangeTestLink(e)} value={this.state.testLink}></input>
                        </div>
                    </div>
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
                    <button className="btn btn-green" onClick={this.handleSubmit}>Start</button>
                </div>
            );
        }
    }
}

export default ProfessorStartProctoring;