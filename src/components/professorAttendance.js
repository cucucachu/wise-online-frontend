import React, { Component, Fragment } from 'react'
import { 
    Link,
   } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'

//axios
import { startAttendance } from '../store/axios'

import { AuthContext } from '../contexts/AuthContext'


class ProfessorAttendance extends Component {
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
        const response = await startAttendance(course._id);
        console.dir(response.data);

        const attendanceData = response.data;
        const state = Object.assign({}, this.state);

        state.attendanceCode = attendanceData.keyCode;
        this.setState(state);
    }
    
    componentDidMount() {
        console.log('mounted');
        const { course } = this.props.location.state;
        console.log('course:');
        console.dir(course);

        const state = Object.assign({}, this.state);
        state.course = course;
        this.loadAttendance(course);
        this.setState(state);
    }

    render(){
        const { attendanceCode } = this.context
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Attendance Started for {this.state.course.classId}</h1>
                    <div className="spacer-vertical"></div>
                    
                    <div className='jumbo-text text-plain'>
                        {this.state.attendanceCode}
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <p className="text-plain xlarge-text width-50">
                    {attendanceCode}
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

export default ProfessorAttendance;