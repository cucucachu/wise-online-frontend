import React, { Component } from 'react';
import { Link } from "react-router-dom"

import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'
import settingIcon from '../Assets/images/settings.svg'
import editIcon from '../Assets/images/edit-icon-white.svg'
import viewIcon from '../Assets/images/eye-icon-white.svg'
import bookIcon from '../Assets/images/book.svg'

import { downloadDataForCourseURL } from '../store/axios';

import { i18n } from 'web-translate';
import { paths } from '../paths';
import {Course} from '../types';

type CourseCardProps = {
    course: Course;
    handleDelete(e: any, id: string): void;
    handleSubmit(e: any, courseId: string, name: string, classId: string, integrationId: string): void;
};

type CourseCardState = {
    classId: string;
    name: string;
    integrationId: string;
    editing: boolean;
    deleting: boolean;
}

class CourseCard extends Component<CourseCardProps, CourseCardState> {
    
    constructor(props: CourseCardProps) {
        super(props);
        this.state = {
            classId: props.course.classId,
            name: props.course.name,
            integrationId: props.course.integrationId,
            editing: false,
            deleting: false,
        };
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    handleClickEdit = () => {
        this.setState({
            editing: true,
        });
    }

    handleClickDelete = () => {
        this.setState({
            editing: false,
            deleting: true,
        });
    }

    handleClickCancel = () => {
        this.setState({
            editing: false,
            deleting: false,
            name: this.props.course.name,
            classId: this.props.course.classId,
        });
    }

    handleChangeId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            classId: e.target.value,
        });
    }

    handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    handleChangeIntegrationId: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({
            integrationId: e.target.value,
        });
    }

    downloadCourseData = () => {
        window.location.href = downloadDataForCourseURL(this.props.course._id);
    } 

    renderView() {
        const integrationName = sessionStorage.getItem('integrationName');

        return (
            <div className="col-sm-6">
                <div className="shadow">
                    <div className="row ">
                        
                        <div className="col-sm-6 course-card-info">
                            <div className='course-card-info__content'>
                                <h2 className="course-title">{this.props.course.name}</h2>
                                <div><strong>{i18n("Class ID:")}</strong> {this.props.course.classId}</div>
                                {this.props.course.accessCode && <div><strong>{i18n("Access Code:")}</strong> {this.props.course.accessCode}</div>}
                                {integrationName && <p>{`${integrationName} ID:`} {this.props.course.integrationId ? this.props.course.integrationId : 'Not Set'}</p>}
                            </div>
                            <button className="btn-setting" onClick={this.handleClickEdit}>
                                <img src={settingIcon} className="icon-sm" alt="setting icon"/>
                                &nbsp;{i18n("Course Settings")}
                            </button>
                        </div>
                        
                        <div className="col-sm-6">

                            {/* <Link to={{
                                pathname: '/professor/attendancesView',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />{i18n("Attendance")}</button>
                            </Link> */}
                            <Link to={{
                                pathname: paths.professorInClass({ courseId: this.props.course._id }),
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />
                                {this.props.course.isInSession ? i18n("View In Progress Class") : i18n("Start InClass")}
                            </button>
                            </Link>
                            <Link to={{
                                pathname: paths.professorInClassPastSessions({ courseId: this.props.course._id }),
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={bookIcon} className="icon-xs" alt="tick icon" />
                                {i18n("View InClass Sessions")}
                            </button>
                            </Link>
                            <Link to={{
                                pathname: '/proctor/professor/start',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={editIcon} className="icon-xs" alt="edit icon" />{i18n("Start Proctoring")}</button>
                            </Link>
    
                            {/* <Link to={{
                                pathname: '/professor/exam',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={editIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                            </Link> */}

                            {/* <button className="btn-upload" onClick={this.downloadCourseData.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />{i18n("Download data")}</button> */}

                            <Link to={{
                                pathname: `/proctor/tests`,
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}>
                                <img src={viewIcon} className="icon-xs" alt="download icon" />
                                {i18n("View proctoring")}
                            </button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

    renederEdit() {
        return (
            <div className="col-sm-6">
                <div className="shadow" >
                    <div className="row">
                        <div className="col-sm-10">
                            <h2 className="course-title">{this.props.course.name}</h2>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn-neutral" onClick={this.handleClickCancel}><div style={{textAlign: 'center'}}>&#128473;</div></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <input type="text" placeholder="Enter a class name" style={CourseCard.inputStype} onChange={this.handleChangeName} value={this.state.name}/>
                                <input type="text" placeholder="Enter a unique class ID" style={CourseCard.inputStype} onChange={this.handleChangeId} value={this.state.classId}/>
                                {(() => {
                                    const integrationName = sessionStorage.getItem('integrationName');
                                    if (integrationName) {
                                        return (
                                            <input type="text" placeholder={`ID in ${integrationName}`} style={CourseCard.inputStype} onChange={this.handleChangeIntegrationId} value={this.state.integrationId}/>
                                        );
                                    }
                                })()}
                            </form>
                        </div>
                        <div className="col-sm-6 text-plain-s">
                            {i18n("Enter a class name")}<br/>
                            {i18n("For Example: ECON 101")}<br/>
                            {i18n("Enter a unique class ID")}<br/>
                            {i18n("For Example: ECON 101 Section 2")}<br/>
                            {(() => {
                                    const integrationName = sessionStorage.getItem('integrationName');
                                    if (integrationName) {
                                        return `Enter the Id of this course in ${integrationName}`;
                                    }
                            })()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <button 
                                className="btn-upload" 
                                style={ { textAlign: 'center' } }
                                
                                onClick={(e) => { this.props.handleSubmit(e, this.props.course._id, this.state.name, this.state.classId, this.state.integrationId) }}
                                >
                                {i18n("Submit")}
                            </button>
                        </div>
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-4">
                            <button 
                                className="btn-danger"
                                style={ { textAlign: 'center' } }
                                onClick={this.handleClickDelete}
                            >
                                {i18n("Delete")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderDelete() {
        return (
            <div className="col-sm-6">
                <div className="shadow" >
                    <div className="row">
                        <div className="col-sm-10">
                            <h2 className="course-title">{this.props.course.name}</h2>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn-neutral" onClick={this.handleClickCancel}><div style={{textAlign: 'center'}}>&#128473;</div></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <p>{i18n("Warning: Deleting a course perminantly deletes the course as well as all it's attendance and proctoring data.")}</p>
                            <p>{i18n("Are you sure you want to delete this course?")}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <button 
                                className="btn-danger"
                                style={ { textAlign: 'center' } }
                                onClick={(e) => { this.props.handleDelete(e, this.props.course._id) }}
                            >
                                {i18n("Delete")}
                            </button>
                        </div>
                        <div className="col-sm 6">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.editing) {
            return this.renederEdit();
        }

        if (this.state.deleting) {
            return this.renderDelete();
        }

        return this.renderView();
    }
}

export default CourseCard;