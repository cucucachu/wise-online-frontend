import React, { Component, Fragment } from 'react';

//axios
import { getAttendance, editAttendance, setAttendanceReadyForIntegration, logout } from '../store/axios';
import attendanceIcon from '../Assets/images/attendance-icon.png';

import AttendanceStudentsTableView from './AttendanceView/AttendanceStudentsTableView';
import AttendanceStudentsTableEdit from './AttendanceView/AttendanceStudentsTableEdit';
import AttendanceSummary from './AttendanceView/AttendanceSummary';

class AttendanceView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            course: props.location.state.course,
            attendance: {},
            editing: false,
        }

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickPresent = this.handleClickPresent.bind(this);
        this.handleChangeScheduledTime = this.handleChangeScheduledTime.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickApproveForIntegration = this.handleClickApproveForIntegration.bind(this);
    }

    handleClickEdit() {
        const state = Object.assign({}, this.state);
        state.editing = true;
        this.setState(state);
    }

    async handleClickSave() {
        const studentsPresent = this.state.attendance.students.filter(s => s.attended).map(s => s.id);
        let scheduledTime = this.state.attendance.scheduledTime;

        if (this.state.attendance.scheduledTime === '') {
            console.log('here')
            scheduledTime = null;
        }
        else {
            scheduledTime = new Date(`${scheduledTime}:00.000Z`);
        }

        console.log(scheduledTime);

        await editAttendance(this.state.course._id, this.state.attendance.id, studentsPresent, scheduledTime);

        return this.loadAttendance();
    }

    async handleClickApproveForIntegration() {
        await setAttendanceReadyForIntegration(this.state.course._id, this.state.attendance.id);

        return this.loadAttendance();
    }

    handleChangeScheduledTime(e) {
        e.preventDefault();
        const state = Object.assign({}, this.state);
        state.attendance.scheduledTime = e.target.value;
        this.setState(state);
    }

    handleClickPresent(studentId) {
        const state = Object.assign({}, this.state);
        const student = state.attendance.students.filter(s => s.id === studentId)[0];
        student.attended = student.attended ? false : true;
        this.setState(state);
    }

    async loadAttendance() {        
        const response = await getAttendance(this.state.course._id, this.props.location.state.attendance.id);
        if(response.status === 401){
            sessionStorage.clear();

            logout();

            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
            });
        }
        else {
            const state = Object.assign({}, this.state);
            state.attendance = response.data;

            if (state.attendance.scheduledTime) {
                state.attendance.scheduledTime = state.attendance.scheduledTime.slice(0, state.attendance.scheduledTime.length - 1);
            }
            else {
                state.attendance.scheduledTime = '';
            }

            state.editing = false;
            this.setState(state);
        }
    }

    async componentDidMount() {
        await this.loadAttendance();
    }

    renderView() {
        return(
            <Fragment>
                <div className="container">
                    <img src={attendanceIcon} className="page-icon" alt="Attendance icon"/>
                        <div className="spacer-vertical"></div>
                    <h1>Attendance for {this.state.course.classId} on {new Date(this.state.attendance.startTime).toLocaleDateString()}</h1>

                    <div className="spacer-vertical"></div>
                    <AttendanceSummary
                        course={this.state.course}
                        attendance={this.state.attendance}
                        onClickEdit={this.handleClickEdit}
                        onClickApproveForIntegration={this.handleClickApproveForIntegration}
                        editing={false}
                    />
                    <div className="row">
                        <div className="col-sm">
                            <AttendanceStudentsTableView
                                course={this.state.course}
                                attendance={this.state.attendance}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    renderEdit() {
        return(
            <Fragment>
                <div className="container">
                    <img src={attendanceIcon} className="page-icon" alt="Attendance icon"/>
                        <div className="spacer-vertical"></div>
                    <h1>Attendance for {this.state.course.classId} on {new Date(this.state.attendance.startTime).toLocaleDateString()}</h1>

                    <div className="spacer-vertical"></div>
                    <AttendanceSummary
                        course={this.state.course}
                        attendance={this.state.attendance}
                        onClickSave={this.handleClickSave}
                        editing={true}
                        onChangeScheduledTime={this.handleChangeScheduledTime}
                    />
                    <div className="row">
                        <div className="col-sm">
                            <AttendanceStudentsTableEdit
                                course={this.state.course}
                                attendance={this.state.attendance}
                                onClickPresent={this.handleClickPresent}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }

        return this.renderView();
    }
}

export default AttendanceView;