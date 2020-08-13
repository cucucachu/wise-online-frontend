import React, { Component } from 'react';
import {
    Link,
   } from "react-router-dom"

import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'
import settingIcon from '../Assets/images/settings.svg'
import editIcon from '../Assets/images/edit-icon-white.svg'
import viewIcon from '../Assets/images/eye-icon-white.svg'

import { adminDownloadDataByCourseURL, adminDownloadDataByProfessorURL, adminDownloadDataByStudentURL, adminEditTerm } from '../store/axios'

class AdminTermCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            termId: props.term._id,
            name: props.term.name,
            editing: false
        }

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    handleChangeId(e) {
        const state = Object.assign({}, this.state);
        state.termId = e.target.value;
        this.setState(state);
    }

    handleChangeName(e) {
        const state = Object.assign({}, this.state);
        state.name = e.target.value;
        this.setState(state);
    }
    download(csv, exportedFilenmae){
        let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    async downloadDataByCourse() {
        let exportedFilenmae = this.state.name + '-data-by-course'
        // window.location = await adminDownloadDataByCourseURL(this.state.termId);
        const res = await adminDownloadDataByCourseURL(this.state.termId);

        const csv = res.data
        this.download(csv, exportedFilenmae)
        
    }
    async downloadDataByProfessor() {
        let exportedFilenmae = this.state.name + '-data-by-professor'
        const res = await adminDownloadDataByProfessorURL(this.state.termId);
        const csv = res.data
        this.download(csv, exportedFilenmae)
    }
    async downloadDataByStudent() {
        let exportedFilenmae = this.state.name + '-data-by-student'
        const res = await adminDownloadDataByStudentURL(this.state.termId);
        const csv = res.data
        this.download(csv, exportedFilenmae)
    }
    handleClickEdit() {
        const state = Object.assign({}, this.state);
        state.editing = true;
        this.setState(state);
    }
    async handleSubmitEditTerm(e) {
        e.preventDefault()
        const res = await adminEditTerm(this.state.termId, this.state.name);
        await this.props.loadTerms()
        this.setState({editing: false})
    }

    renderView() {
        return (
            <div className="col-sm-6">
                <div className="shadow">
                    <div className="row ">
                        
                        <div className="col-sm-6">
                            <h2 className="course-title">{this.props.term.name}</h2>
                            <p>Term ID: {this.state.termId}</p>
                            {/* <ul className="text-plain custom-list">
                                <li>{this.props.course.attendances ? this.props.course.attendances.length : 0} class{this.props.course.attendances && this.props.course.attendances.length === 1 ? '' : 'es'} recorded</li>
                                <li>{this.props.course.tests ? this.props.course.tests.length : 0} test{this.props.course.tests && this.props.course.tests.length === 1 ? '' : 's'} recorded</li>
                            </ul> */}
                            <button className="btn-setting" onClick={this.handleClickEdit}>
                                <img src={settingIcon} className="icon-sm" alt="setting icon"/>
                                &nbsp;Settings
                            </button>
                        </div>
                        
                        <div className="col-sm-6">
                        
                            <button className="btn-upload" onClick={this.downloadDataByCourse.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by course</button>
                            <button className="btn-upload" onClick={this.downloadDataByProfessor.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by professor</button>
                            <button className="btn-upload" onClick={this.downloadDataByStudent.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by student</button>
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
                        <div className="col-sm-6">
                            {/* <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.termId, this.state.name, this.state.term) }}> */}
                            <form onSubmit={this.handleSubmitEditTerm.bind(this)}>
                                <input type="text" placeholder="Enter a new class name" style={AdminTermCard.inputStype} onChange={this.handleChangeName} value={this.state.name}/>
                                <input type="text" placeholder="Enter a new class ID" style={AdminTermCard.inputStype} onChange={this.handleChangeId} value={this.state.termId}/>
                                <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Submit"/>
                            </form>
                        </div>
                        <div className="col-sm-6 text-plain-s">
                            Enter a new term name<br/>
                            e.g. Wise New Term<br/>
                            Enter a new term ID<br/>
                            e.g. Wise New term
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
        return this.renderView();
    }
}

export default AdminTermCard;