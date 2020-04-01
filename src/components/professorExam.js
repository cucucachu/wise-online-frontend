import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'


import { startTest } from '../store/axios'
// startTest(courseId)

import { AuthContext } from '../contexts/AuthContext'

class ProfessorExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendanceCode: '',
            course: {
                classId: '...',
            },
        }
    }

    static contextType = AuthContext;

    async loadAttendance(course) {
        const response = await startTest(course._id);
        console.log('response: ')
        console.dir(response.data);

        const attendanceData = response.data;
        const state = Object.assign({}, this.state);

        state.attendanceCode = attendanceData.keyCode;
        this.setState(state);
    }
    
    componentDidMount() {
        const { course } = this.props.location.state;
        const { cookies } = this.context
        console.log('course:');
        console.dir(course);
        if(cookies === undefined){
            this.props.history.push('/professor-login')
        }else{
            const state = Object.assign({}, this.state);
            state.course = course;
            this.loadAttendance(course);
            this.setState(state);
        }
        this.timer = setInterval(
            () => this.checkCookie(),
            
            30000
          );
    }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
      checkCookie(){
        const { cookies } = this.context
        console.log('cookies: ', cookies);
        
        if(cookies === undefined){
            this.props.history.push('/student-login')
        }else{return}
      }
    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.course.classId} Test code</h1>
                    <div className="spacer-vertical"></div>
                    
                    <div className='jumbo-text text-plain'>
                        {this.state.attendanceCode}
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <p className="text-plain xlarge-text width-50">
                    Provide this code to your students, to enter before taking their test online.
                    </p>
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