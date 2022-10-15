import React, { Component } from 'react';

import downloadIcon from '../Assets/images/download-icon-white.svg'
import settingIcon from '../Assets/images/settings.svg'

import { adminDownloadDataByCourseURL, adminDownloadDataByProfessorURL, adminDownloadDataByStudentURL, adminEditTerm, logout, setCurrentTerm } from '../store/axios'

import { i18n } from 'web-translate';

class AdminTermCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            termId: props.term._id,
            name: props.term.name,
            editing: false,
            errorCurrentTerm: false,
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
    async handleSetCurrent(e){
        
        try{
            const response = await setCurrentTerm(e.target.id)
            if(response.status === 200){
                await this.props.loadTerms()
            } else {
                this.setState({errorCurrentTerm: false})
            }
        }catch(error){
            this.setState({errorCurrentTerm: false})
            console.log('server error', error)
        }
        
    }
    async handleSubmitEditTerm(e) {
        e.preventDefault()
        try{
            const response = await adminEditTerm(this.state.termId, this.state.name);
            if(response.status === 200){
                await this.props.loadTerms()
                this.setState({editing: false})
            }
        }catch(error){
            console.log('Oops, something wrong', error)
        }
        
        
    }

    renderView() {
        return (
            <div className="col-sm-6">
                <div className="shadow">
                    <div className="row ">
                        
                        <div className="col-sm-6">
                            <h2 className="course-title">{this.props.term.name}</h2>
                            {/* <p>Term ID: {this.state.termId}</p> */}
                            <label className="radio-container"  onClick={this.handleSetCurrent.bind(this)}><h2 id={this.state.termId} style={{paddingTop: "5px"}} className="text-plain" >{i18n("Current term")}</h2>
                            {this.props.term.current ? 
                            <input type="checkbox" disabled="disabled" key={this.state.termId}  onClick={this.handleSetCurrent.bind(this)} checked/> : 
                            <input type="checkbox" name={this.props.term.name}  disabled="disabled"  /> }
                            <span className="checkmark"></span>
                            </label>
                            {this.state.errorCurrentTerm && <p>{i18n("Oops, something wrong, try again.")}</p>}
                            <div className="spacer-vertical-s"></div>
                            <button className="btn-setting" onClick={this.handleClickEdit}>
                                <img src={settingIcon} className="icon-sm" alt="setting icon"/>
                                &nbsp;{i18n("Settings")}
                            </button>
                        </div>
                        
                        <div className="col-sm-6">
                        
                            <button className="btn-upload" onClick={this.downloadDataByCourse.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />{i18n("Download data by course")}</button>
                            <button className="btn-upload" onClick={this.downloadDataByProfessor.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />{i18n("Download data by professor")}</button>
                            <button className="btn-upload" onClick={this.downloadDataByStudent.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />{i18n("Download data by student")}</button>
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
                                <input type="text" placeholder={i18n("Enter a new class name")} style={AdminTermCard.inputStype} onChange={this.handleChangeName} value={this.state.name}/>
                                {/* <input type="text" placeholder="Enter a new class ID" style={AdminTermCard.inputStype} onChange={this.handleChangeId} value={this.state.termId}/> */}
                                <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value={i18n("Submit")}/>
                            </form>
                        </div>
                        <div className="col-sm-6 text-plain-s">
                            {i18n("Enter a new term name")}<br/>
                            {i18n("e.g. Wise New Term")}<br/>
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