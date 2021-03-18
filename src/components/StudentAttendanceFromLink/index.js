import React, { Component } from 'react'

import attendClass from '../../Assets/images/attend-class.png';
import { markAttendance } from "../../store/axios";

import Spinner from '../Spinner';
import LoginModal from '../LoginModal';

class StudentAttendanceFromLink extends Component {

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

    async componentDidMount() {
        await this.tryMarkAttendance();
    }

    async tryMarkAttendance() {
        try {
            const response = await markAttendance(this.state.classId, this.state.keyCode);

            if (response.status === 200) {
                sessionStorage.setItem('classId', this.state.classId);
                this.props.history.push('class/attend-success');
            }
            else if (response.status === 401) {
                this.setState({...this.state, showLogin: true});
            }
            else {
                this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
            }
        }
        catch (error) {
            this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
        }
    }

    async handleSuccessfulLogin(loginResponseData) {
        this.props.onSuccessfulLogin(loginResponseData);
        this.setState({...this.state, showLogin: false});
        await this.tryMarkAttendance();
    }

    render() {
        return (
            <div className="container">
                <img src={attendClass} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>Marking Your Attendance for {this.state.classId}</h1>
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

export default StudentAttendanceFromLink;
