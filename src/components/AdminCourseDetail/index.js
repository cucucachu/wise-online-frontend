import React, { Component }　from 'react';
import { logout, adminGetCourseDetails } from '../../store/axios';
import viewIcon from '../../Assets/images/view-icon.png';
import '../../Assets/css/spinner.css';
import '../../Assets/css/radiobtn.css';

import DataPane from '../Resusable/DataPane';
import AttendanceTable from './AttendanceTable';
import AdminAttendanceDetail from './AdminAttendanceDetail';

class AdminCourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: props.location.state.course,
            isLoading: true,
            viewingAttendance: null,
        }

        this.cookiesExpired = this.cookiesExpired.bind(this);
        this.handleClickViewAttendance = this.handleClickViewAttendance.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
    }

    cookiesExpired() {
        sessionStorage.clear();
        logout();
        this.props.history.push({
            pathname: '/admin-login',
            state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
        });
    }

    setIsLoading(loading) {
        this.setState({
            ...this.state,
            isLoading: loading,
        });
    }

    async loadCourseDetail() {
        try {
            this.setIsLoading(true);
            const response = await adminGetCourseDetails(this.state.course._id);
    
            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    course: response.data.course,
                    isLoading: false,
                });
            }
            else if (response.status === 401) {
                this.cookiesExpired();
            }
            else {
                console.log('Something\'s wrong, try again.');
            }
        }
        catch (error) {
            console.log(error);
        }  
    }

    async componentDidMount() {
        await this.loadCourseDetail();
    }

    handleClickViewAttendance(attendance) {
        this.setState({
            ...this.state,
            viewingAttendance: attendance,
        });
    }

    handleClickBack() {
        this.setState({
            ...this.state,
            viewingAttendance: null,
        });
    }

    renderCourse() {
        return (
            <div>
                <h1>{this.state.course.name}</h1>
                <div className="row">
                    <div className="col-12">
                        <DataPane
                            title="Course Details"
                            data={{
                                Professor: `${this.state.course.professor.firstName} ${this.state.course.professor.lastName}`,
                                'Class Name': this.state.course.name,
                                'Class Id': this.state.course.classId,
                                Term: this.state.course.term.name,
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <AttendanceTable
                            attendances={this.state.course.attendances}
                            course={this.state.course}
                            onClickView={this.handleClickViewAttendance}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderLoading() {
        return (
            <div>
                <div className="spacer-vertical" />
                <h2>Loading
                    <div className="lds-ellipsis"></div>
                </h2>
            </div>
        );
    }

    render() {
        return ( 
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical" />
                <div className="spacer-vertical" />
                { 
                    (() => {
                        if (this.state.isLoading) {
                            return this.renderLoading();
                        }
                        else if (this.state.viewingAttendance) {
                            return (
                                <AdminAttendanceDetail
                                    attendance={this.state.viewingAttendance}
                                    course={this.state.course}
                                    onClickBack={this.handleClickBack}
                                />
                            )
                        }
                        else {
                            return this.renderCourse();
                        }
                    })()
                }
            </div>
        );
    }
}

export default AdminCourseDetail;