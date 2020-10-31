import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';


import { startTest } from '../store/axios';
// startTest(courseId)

import { AuthContext } from '../contexts/AuthContext';

import ClipboardLink from './ClipboardLink';

class ProfessorExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendanceCode: '',
            course: {
                classId: '...',
            },
            link: '',
        }
    }

    static contextType = AuthContext;

    async loadAttendance(course) {
        const response = await startTest(course._id);

        const testData = response.data;
        const state = Object.assign({}, this.state);
        
        state.link = this.createLink(testData.classId, testData.keyCode);
        state.attendanceCode = testData.keyCode;
        this.setState(state);
    }
    
    createLink(classId, keyCode) {
        if (window.location.hostname === 'localhost') {
            return `http://localhost:3000/student/testLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
        }
        else {
            return `https://${window.location.hostname}/student/testLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
        }
    }
    
    componentDidMount() {
        const { course } = this.props.location.state;
        // const { cookies } = this.context
        console.log('course:');
        console.dir(course);
        const state = Object.assign({}, this.state);
        state.course = course;
        this.loadAttendance(course);
        this.setState(state);

        // this.timer = setInterval(
        //     () => this.checkCookie(),
            
        //     30000
        //   );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
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
                    <h2 className="bold">{this.state.attendanceCode}</h2>
                    <div className="spacer-vertical"></div>
                    <Link to="/professor/course">
                        <button className="btn">Done</button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default ProfessorExam;