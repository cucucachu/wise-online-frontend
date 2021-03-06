import React, { Component } from 'react'

import attendClass from '../../Assets/images/attend-class.png';
import { proctoringStudentStartTest } from "../../store/axios";

import Spinner from '../Spinner';
import LoginModal from '../LoginModal';

import { AuthContext } from '../../contexts/AuthContext';

class StudentTestFromLink extends Component {

    constructor(props) {
        super(props);
        const params = new URLSearchParams(props.location.search);

        this.state = {
            classId: params.get('c'),
            keyCode: params.get('k'),
            showLogin: false,
            error: null,
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);

    }
    
    static contextType = AuthContext;

    async componentDidMount() {
        await this.tryStartTest();
    }

    async tryStartTest() {
        try {
            const response = await proctoringStudentStartTest({
                classId: this.state.classId,
                keyCode: this.state.keyCode
            });

            if (response.status === 200) {
                if (response.data.proctorSession) {
                    this.props.history.push('/student/proctor', {
                        ...response.data,
                    });
                }
                else {
                    this.context.storeClassId(this.state.classId);
                    this.context.storeTestAttendanceId(response.data.id);
    
                    if (response.data.proctorConfiguration) {
                        this.context.setScreenshotInterval(response.data.proctorConfiguration.screenshotInterval);
                        this.context.setWebcamInterval(response.data.proctorConfiguration.webcamInterval);
                    }
    
                    sessionStorage.setItem('classId', this.state.classId);
                    this.props.history.push('record-agree-to-terms');
                }
            }
            else if (response.status === 401) {
                this.setState({...this.state, showLogin: true});
            }
            else {
                this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
            }
        }
        catch (error) {
            console.log(error.message);
            this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
        }
    }

    async handleSuccessfulLogin(loginResponseData) {
        this.props.onSuccessfulLogin(loginResponseData);
        this.setState({...this.state, showLogin: false});
        await this.tryStartTest();
    }

    render() {
        return (
            <div className="container">
                <img src={attendClass} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>Taking a Test for {this.state.classId}</h1>
                <div className="spacer-vertical" />
                {(() => {
                    if (this.state.showLogin) {
                        return (<LoginModal 
                            handleSuccessfulLogin = {this.handleSuccessfulLogin}
                        />)
                    }
                    else if (this.state.error) {
                        return <p>Sorry, this link is no longer valid.</p>;
                    } 
                    else {
                        return (<Spinner />);
                    }
                })()}
                
                <div className="spacer-vertical" />
                    
            </div>
        )
    }
}

export default StudentTestFromLink;
