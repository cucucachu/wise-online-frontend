import React, { Component, Fragment } from 'react';

//axios
import { getAttendance, editAttendance, setAttendanceReadyForIntegration, logout } from '../store/axios';
import attendanceIcon from '../Assets/images/attendance-icon.png';

import AttendanceStudentsTableView from './AttendanceView/AttendanceStudentsTableView';
import AttendanceStudentsTableEdit from './AttendanceView/AttendanceStudentsTableEdit';
import AttendanceSummary from './AttendanceView/AttendanceSummary';

import { i18n } from 'web-translate';

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
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickApproveForIntegration = this.handleClickApproveForIntegration.bind(this);
    }

    handleClickEdit() {
        const state = Object.assign({}, this.state);
        state.editing = true;
        
        state.attendance.startTime = state.attendance.startTime ? this.UTCStringToLocalDateString(state.attendance.startTime) : '';
        state.attendance.scheduledTime = state.attendance.scheduledTime ? this.UTCStringToLocalDateString(state.attendance.scheduledTime) : '';
        
        this.setState(state);
    }

    async handleClickSave() {
        const studentsPresent = this.state.attendance.students.filter(s => s.attended).map(s => s.id);

        let scheduledTime = this.state.attendance.scheduledTime ? new Date(this.state.attendance.scheduledTime) : null;
        let startTime = this.state.attendance.startTime ? new Date(this.state.attendance.startTime) : null;

        await editAttendance(this.state.course._id, this.state.attendance.id, studentsPresent, scheduledTime, startTime);

        return this.loadAttendance();
    }

    UTCStringToLocalDateString(dateString) {
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - (60000 * date.getTimezoneOffset()));
        const localDateString = localDate.toISOString();
        return localDateString.slice(0, localDateString.length - 5);
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

    handleChangeStartTime(e) {
        e.preventDefault();
        const state = Object.assign({}, this.state);
        state.attendance.startTime = e.target.value;
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



            state.attendance.scheduledTime = state.attendance.scheduledTime ? state.attendance.scheduledTime : '';
            state.attendance.startTime = state.attendance.startTime ? state.attendance.startTime : '';

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
                        <div className="spacer-vertical" />
                    <h1>{i18n("Attendance for")} {this.state.course.classId} {i18n("on")} {new Date(this.state.attendance.startTime).toLocaleDateString()}</h1>

                    <div className="spacer-vertical" />
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
                        <div className="spacer-vertical" />
                    <h1>{i18n("Attendance for")} {this.state.course.classId} {i18n("on")} {new Date(this.state.attendance.startTime).toLocaleDateString()}</h1>

                    <div className="spacer-vertical" />
                    <AttendanceSummary
                        course={this.state.course}
                        attendance={this.state.attendance}
                        onClickSave={this.handleClickSave}
                        editing={true}
                        onChangeScheduledTime={this.handleChangeScheduledTime}
                        onChangeStartTime={this.handleChangeStartTime}
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