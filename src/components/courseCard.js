import React, { Component } from 'react';
import { Link } from "react-router-dom"

import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'
import settingIcon from '../Assets/images/settings.svg'
import editIcon from '../Assets/images/edit-icon-white.svg'
import viewIcon from '../Assets/images/eye-icon-white.svg'

import { downloadDataForCourseURL } from '../store/axios';

import { i18n } from 'web-translate';

class CourseCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classId: props.course.classId,
            name: props.course.name,
            integrationId: props.course.integrationId,
            editing: false,
            deleting: false,
        }

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIntegrationId = this.handleChangeIntegrationId.bind(this);
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    handleClickEdit() {
        const state = Object.assign({}, this.state);
        state.editing = true;
        this.setState(state);
    }

    handleClickDelete() {
        const state = Object.assign({}, this.state);
        state.editing = false;
        state.deleting = true;
        this.setState(state);
    }

    handleClickCancel() {
        const state = Object.assign({}, this.state);
        state.editing = false;
        state.deleting = false;
        state.name = this.props.course.name;
        state.classId = this.props.course.classId;
        this.setState(state);
    }

    handleChangeId(e) {
        const state = Object.assign({}, this.state);
        state.classId = e.target.value;
        this.setState(state);
    }

    handleChangeName(e) {
        const state = Object.assign({}, this.state);
        state.name = e.target.value;
        this.setState(state);
    }

    handleChangeIntegrationId(e) {
        const state = Object.assign({}, this.state);
        state.integrationId = e.target.value;
        this.setState(state);
    }

    downloadCourseData() {
        window.location = downloadDataForCourseURL(this.props.course._id);
    } 

    renderView() {
        return (
            <div className="col-sm-6">
                <div className="shadow">
                    <div className="row ">
                        
                        <div className="col-sm-6">
                            <h2 className="course-title">{this.props.course.name}</h2>
                            <p>{i18n("Class ID:")} {this.props.course.classId}</p>
                            {(() => {
                                    const integrationName = sessionStorage.getItem('integrationName');
                                    if (integrationName) {
                                        return (
                                        <p>{`${integrationName} ID:`} {this.props.course.integrationId ? this.props.course.integrationId : 'Not Set'}</p>
                                        );
                                    }
                                })()}
                            <ul className="text-plain custom-list">
                                <li>{this.props.course.attendances ? this.props.course.attendances.length : 0} class{this.props.course.attendances && this.props.course.attendances.length === 1 ? '' : 'es'} recorded</li>
                                <li>{this.props.course.tests ? this.props.course.tests.length : 0} test{this.props.course.tests && this.props.course.tests.length === 1 ? '' : 's'} recorded</li>
                            </ul>
                            <button className="btn-setting" onClick={this.handleClickEdit}>
                                <img src={settingIcon} className="icon-sm" alt="setting icon"/>
                                &nbsp;{i18n("Settings")}
                            </button>
                        </div>
                        
                        <div className="col-sm-6">

                            <Link to={{
                                pathname: '/professor/attendancesView',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />{i18n("Attendance")}</button>
                            </Link>
    
                            <Link to={{
                                pathname: '/proctor/professor/start',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={editIcon} className="icon-xs" alt="edit icon" />{i18n("Proctor exam")}</button>
                            </Link>
    
                            {/* <Link to={{
                                pathname: '/professor/exam',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={editIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                            </Link> */}

                            <button className="btn-upload" onClick={this.downloadCourseData.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />{i18n("Download data")}</button>

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
                            <p>Warning: Deleting a course perminantly deletes the course as well as all it's attendance and proctoring data.</p>
                            <p>Are you sure you want to delete this course?</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <button 
                                className="btn-danger"
                                style={ { textAlign: 'center' } }
                                onClick={(e) => { this.props.handleDelete(e, this.props.course._id) }}
                            >
                                Delete
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