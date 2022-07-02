import React, { Component, Fragment } from 'react'

import editIcon from '../../Assets/images/edit-icon.png'
import CourseCardRow from './CourseCardRow';

import { professorProctorConfigurationAllowed, createCourse, editCourse, deleteCourse, getCourses, logout } from '../../store/axios'
import { AuthContext } from '../../contexts/AuthContext'

import { i18n } from 'web-translate';

class ProfessorCourse extends Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            inputStype: {
                borderRadius: '0.5rem',
                width: '100%',
                marginBottom: '5px',
            },
            courseName: '',
            courseId: '',
            courses: [],
            error: null,
            proctorConfigurationAllowed: false,
        }

        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmitNewCourse = this.handleSubmitNewCourse.bind(this);
        this.handleSubmitEditCourse = this.handleSubmitEditCourse.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.setError = this.setError.bind(this);
        this.proctorConfigurationAllowed = this.proctorConfigurationAllowed.bind(this);
    }
    
    static contextType = AuthContext;

    handleChangeID = (e: any) => {
        const state: any = Object.assign({}, this.state);

        state.courseId = e.target.value;
        this.setState(state);
    }

    handleChangeName = (e: any) => {
        const state: any = Object.assign({}, this.state);

        state.courseName = e.target.value;
        this.setState(state);
    }

    setError(error: any) {
        const state: any = Object.assign({}, this.state);
        state.error = error;
        this.setState(state);
    }

    async handleSubmitEditCourse(e: any, courseId: any, name: any, classId: any, integrationId: any) {
        e.preventDefault();
        const response = await editCourse(courseId, {name, classId, integrationId});

        if (response.status !== 200) {
            this.setError(`The Class Id ${classId} is already in use by another course. Please choose a different Class ID.`);
        }
        else {
            this.setError(null);
        }

        await this.loadCourses();
    }

    async handleDeleteCourse(e: any, courseId: any) {
        e.preventDefault();
        await deleteCourse(courseId);
        await this.loadCourses();
    }

    handleSubmitNewCourse = async (e: any) => {
        e.preventDefault();
        const response = await createCourse(this.state.courseName, this.state.courseId);

        if (response.status !== 200) {
            this.setError(`That Class Id is already in use by another course. Please choose a different Class ID.`);
        }
        else {
            this.setError(null);
        }

        await this.loadCourses();
    };

    async loadCourses() {
        let state: any = Object.assign({}, this.state);
        state.courses = [];
        this.setState(state);

        const response = await getCourses();
        if (response.status === 401) {
            sessionStorage.clear();
            logout();
            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
            });
        }
        else {
            const courses = response.data;
            sessionStorage.setItem('courses', courses);
            state = Object.assign({}, this.state);

            state.courses = courses;

            this.setState(state);
        }
    }

    async proctorConfigurationAllowed() {
        const response = await professorProctorConfigurationAllowed();
        this.setState({
            ...this.state,
            proctorConfigurationAllowed: response.data.overrideAllowed,
        });
    }

    async componentDidMount() {
        await this.loadCourses();
        await this.proctorConfigurationAllowed();
    }

    render() {
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
                    <h1>{i18n("My Courses")}</h1>
                    <div className="row">
                        <div className="col-sm">
                            {
                                (() => {
                                    if (this.state.error !== null) {
                                        return (
                                            <div className="error-message">{this.state.error}</div>
                                        )
                                    }
                                })()
                            }
                        </div>
                    </div>
                    {
                        (() => {
                            const rows = [];
    
                            for (let index = 0; index < this.state.courses.length; index++) {
                                if (index % 2){
                                    continue;
                                }
    
                                const course = this.state.courses[index];
                                const coursesForRow = [course];
    
                                if (index + 1 < this.state.courses.length) {
                                    coursesForRow.push(this.state.courses[index + 1]);
                                }
    
                                rows.push(
                                    <CourseCardRow 
                                        courses={coursesForRow}
                                        inputStype={this.state.inputStype}
                                        key={`CoursesRow${index}`} 
                                        lastRow={index >= this.state.courses.length - 1}
                                        handleSubmitNewCourse={this.handleSubmitNewCourse}
                                        handleChangeID={this.handleChangeID}
                                        handleChangeName={this.handleChangeName}
                                        handleSubmitEditCourse={this.handleSubmitEditCourse}
                                        handleDeleteCourse={this.handleDeleteCourse}
                                    />
                                );
                            }
    
                            if (this.state.courses.length % 2 === 0) {
    
                                rows.push(
                                    <CourseCardRow 
                                        courses={[]}
                                        inputStype={this.state.inputStype}
                                        key={`CoursesRowLast`} 
                                        lastRow={true}
                                        handleSubmitNewCourse={this.handleSubmitNewCourse}
                                        handleChangeID={this.handleChangeID}
                                        handleChangeName={this.handleChangeName}
                                        handleSubmitEditCourse={this.handleSubmitEditCourse}
                                    />
                                );
    
                            }
    
                            return rows;
                        })()
                    }
                
                </div>
            </Fragment>
        )

    }
}

export default ProfessorCourse;