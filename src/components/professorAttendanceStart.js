import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'

import ClipboardLink from './ClipboardLink';
//axios
import { startAttendance, logout } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

class ProfessorAttendanceStart extends Component {
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
        const response = await startAttendance(course._id);

        if(response.status === 401){
            sessionStorage.clear();
            logout()
            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
              })
        }
        else {
            const attendanceData = response.data;
            const state = Object.assign({}, this.state);
            state.link = this.createLink(state.course.classId, attendanceData.keyCode);
            state.attendanceCode = attendanceData.keyCode;
            this.setState(state);
        }
        
    }

    createLink(classId, keyCode) {
        if (window.location.hostname === 'localhost') {
            return `http://localhost:3000/student/attendanceLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
        }
        else {
            return `https://${window.location.hostname}/student/attendanceLink?c=${classId.replace(' ', '%20')}&k=${keyCode}`;
        }
    }
    
    componentDidMount() {
        const { course } = this.props.location.state;

        const state = Object.assign({}, this.state);
        state.course = course;
        this.loadAttendance(course);
        this.setState(state);

        this.timer = setInterval(
            () => this.checkCookie(),
            
            300000
          );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    checkCookie() {
        const { cookies } = this.context;
        
        if(cookies === undefined){
            this.props.history.push('/professor-login')
        }
        else {
            return
        }
    }

    copyLink() {
        const link = document.getElementById('attendance-link');
        link.select();
    }

    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Share this URL Link with Students</h1>
                    <div className="spacer-vertical-s"></div>
                    <ClipboardLink 
                        link={this.state.link}
                    />
                    <div className="spacer-vertical"></div>
                    <h2 className="bold">Or share this attendance code with your students</h2>
                    <h2 className="bold">{this.state.attendanceCode}</h2>
                    <div className="spacer-vertical"></div>
                    <Link 
                        to={
                            {
                                pathname: "/professor/attendancesView",
                                state: {
                                    course: this.state.course,
                                }
                            }
                        }
                    >
                        <button className="btn">Done</button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default ProfessorAttendanceStart;