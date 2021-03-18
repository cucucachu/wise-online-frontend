import React, { Component, Fragment } from 'react';

//axios
import { getAttendancesForCourse, logout } from '../store/axios';
import attendanceIcon from '../Assets/images/attendance-icon.png';

import AttendancesTableView from './professorAttendancesView/AttendancesTableView';
import AttendancesSummary from './professorAttendancesView/AttendancesSummary';

class ProfessorAttendancesView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            course: props.location.state.course,
            attendances: [],
        }

        this.handleClickView = this.handleClickView.bind(this);
    }

    async loadAttendances() {        
        let state = Object.assign({}, this.state);

        const response = await getAttendancesForCourse(this.state.course._id);
        if(response.status === 401){
            sessionStorage.clear();

            logout()

            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
            });
        }
        else {
            state = Object.assign({}, this.state);
            state.attendances = response.data;
            this.setState(state);
        }
    }

    async componentDidMount() {
        await this.loadAttendances();
    }

    handleClickView(attendanceId) {
        console.log(`clicked ${attendanceId}`);
    }

    render() {
        return(
            <Fragment>
                <div className="container">
                        <img src={attendanceIcon} className="page-icon" alt="Attendance icon"/>
                        <div className="spacer-vertical" />
                    <h1>Attendance for {this.state.course.classId}</h1>

                    <br/>
                    <AttendancesSummary 
                        course={this.state.course}
                    />
                    <div className="row">
                        <div className="col-sm">
                            <AttendancesTableView
                                course={this.state.course}
                                attendances = {this.state.attendances}
                                onClickView = {this.handleClickView}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )

    }
}

export default ProfessorAttendancesView;