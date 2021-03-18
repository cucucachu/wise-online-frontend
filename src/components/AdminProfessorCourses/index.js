import React, { Component }　from 'react';
import { logout, adminGetProfessorCourses } from '../../store/axios';
import viewIcon from '../../Assets/images/view-icon.png';
import '../../Assets/css/spinner.css';
import '../../Assets/css/radiobtn.css';

import CoursesTable from './CoursesTable';

class AdminProfessorCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            professor: props.location.state.professor,
            courses: [],
            isLoading: true,
        }

        this.cookiesExpired = this.cookiesExpired.bind(this);
        this.handleClickViewCourse = this.handleClickViewCourse.bind(this);
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

    async loadCourses() {
        try {
            this.setIsLoading(true);
            const response = await adminGetProfessorCourses(this.state.professor._id);
    
            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    courses: response.data.courses,
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
        await this.loadCourses();
    }

    handleClickViewCourse(course) {
        console.log('clicked course');
        console.dir(course);
        this.props.history.push('/admin/course', {
            course,
        });
    }

    renderCourses() {
        return (
            <div className="row">
                <CoursesTable 
                    courses={this.state.courses}
                    onClickViewCourse={this.handleClickViewCourse}
                />

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
                <h1>Courses</h1>
                <div className="spacer-vertical" />
                { 
                    (() => {
                        if (this.state.isLoading) {
                            return this.renderLoading();
                        }
                        else {
                            return this.renderCourses();
                        }
                    })()
                }
            </div>
        );
    }
}

export default AdminProfessorCourses;