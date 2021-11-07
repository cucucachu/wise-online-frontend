import React, {Component} from 'react';
import setUpIcon from '../Assets/images/setting-icon.png';
import uploadIcon from '../Assets/images/upload-icon.svg';
import downloadIcon from '../Assets/images/download-icon.svg';
import { logout } from '../store/axios'

import '../Assets/css/radiobtn.css'
import '../Assets/css/spinner.css'
import { postFiles, getStudentTemplateURL, getProfessorTemplateURL, addUsersPrecheck } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';



class SetUpSchoolPage extends Component {
    static contextType = AuthContext;
    
    state={
        fileStudent: {},
        fileProfessor: {},
        fileStudentName: 'No file',
        fileProfessorName: 'No file',
        message: '',
        showHide: {display: 'none'},
        isFileStudent: false,
        isFileProfessor: false,
        checkStudent: false,
        checkProfessor: false,
        isLoading: false,
        preCheckComplete: false,
        newStudents: [],
        newProfessors: [],
    };

    handleFileStudent = async e =>{
        
        const fileStudent = e.target.files[0]
        
        this.setState({fileStudentName: fileStudent.name, fileStudent: fileStudent, checkStudent: true})

    }

    handleFileProfessor = async e =>{

        const fileProfessor = e.target.files[0]
        this.setState({fileProfessorName: fileProfessor.name, fileProfessor: fileProfessor, checkProfessor: true})
    }

    handleDownloadStudent = async e =>{
        e.preventDefault();
        window.location = getStudentTemplateURL();
    }

    handleDownloadProfessor = async e =>{
        e.preventDefault();
        window.location = getProfessorTemplateURL();
    }

    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }

    loading() {
        const state = Object.assign({}, this.state);
        state.isLoading = true;
        this.setState(state);
    }

    handleSubmitForPreCheck= async e =>{
        e.preventDefault()
        if(this.state.fileStudent.name === undefined && this.state.fileProfessor.name === undefined){
            this.setState({message: 'Please select at least one file to upload.'})
            this.showError()
        }else{
            this.loading();
            try {
                const response = await addUsersPrecheck(this.state.fileProfessor, this.state.fileStudent)
    
                if (response.status === 200) {
                    const state = Object.assign({}, this.state);
                    state.preCheckComplete = true;
                    state.isLoading = false;
                    state.newStudents = response.data.newStudents;
                    state.newProfessors = response.data.newProfessors;
                    this.setState(state);
                }else if(response.status === 401){
                    sessionStorage.clear();
                    logout()
                    this.props.history.push({
                        pathname: '/admin-login',
                        state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                      })
                }
                else {                    
                    this.setState({isLoading: false, message: response.data.error});
                    this.showError()
                }
    
            }
            catch (error) {
                this.setState({isLoading: false})
                this.setState({message: 'Oops, something went wrong. Please try again.'})
                this.showError()
            }
        }
        
    }

    handleSubmit= async e =>{
        e.preventDefault()
        if(this.state.fileStudent.name === undefined && this.state.fileProfessor.name === undefined){
            this.setState({message: 'Please select at least one file to upload.'})
            this.showError()
        }else{
            this.loading();
            try {
                const response = await postFiles(this.state.fileProfessor, this.state.fileStudent)

                if (response.status === 200) {
                    this.props.history.push('/admin/set-up-success')
                }else if(response.status === 401){
                    sessionStorage.clear();
                    logout()
                    this.props.history.push({
                        pathname: '/admin-login',
                        state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                      })
                }
                else {
                    const state = Object.assign({}, this.state);
                    state.isLoading = false;
                    state.preCheckComplete = false;
                    state.message = `One or more files is invalid. Please check that the column headings are correct and that all required information is filled in.`;
                    this.setState(state);
                    this.showError();
                }
    
            }
            catch (error) {
                this.setState({isLoading: false})
                this.setState({message: 'Oops, something went wrong. Please try again.'})
                this.showError()
            }
        }
    }

    renderUploadPage() {
        return(
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
                    <h1>{i18n("Add Students and Professors")}</h1>
                    <div className="spacer-vertical-s"></div>
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <h4>{i18n('Instructions:')}</h4>
                            <p className="text-plain">{i18n("setUpSchoolPage_download")}</p>
                            <p className="text-plain">{i18n("setUpSchoolPage_headings")}</p>
                            <p className="text-plain">{i18n("setUpSchoolPage_update")}</p>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    <div className="spacer-vertical-s"></div>
                    <h3 style={this.state.showHide}>{this.state.message}</h3>
                    <div className="container">
                        <div className="row align-1">
                        <div className="col-sm-6">
                                <div className="shadow">
                                
                                    <label className="radio-container"><h2 style={{paddingTop: "5px"}} className="text-plain">{i18n("Student roster")}</h2>
                                    {this.state.checkStudent ? <input type="checkbox" disabled="disabled" checked/> : <input type="checkbox" disabled="disabled" /> }
                                    <span className="checkmark"></span>
                                    </label>
                                    {this.state.isFileStudent ? <p　style={{paddingLeft: "35px"}}>{i18n("Uploaded")}</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">{i18n("Not uploaded")}</p>}
                                    <input type="file" id="fileupload1" onChange={(e)=>{
                                            this.handleFileStudent(e)
                                        }}/>
                                    <label className="btn-upload" htmlFor="fileupload1"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileStudentName}
                                    </label>
                                    <div className="spacer-vertical-s"></div>
                                    <button　className="btn-download" onClick={this.handleDownloadStudent}> <div><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;{i18n("Download template")}</div>
                                    </button>
                                </div> 
                            </div>
                
                            <div className="col-sm-6">
                                <div className="shadow">
                                    {/* <h3 style={this.state.showHide}>{this.state.message}</h3> */}

                                    <label className="radio-container"><h2 className="text-plain" style={{paddingTop: "5px"}}>{i18n("Professor roster")}</h2>
                                    {this.state.checkProfessor ? <input type="checkbox" disabled="disabled" checked/> : <input type="checkbox" disabled="disabled"/>}
                                    <span className="checkmark"></span>
                                    </label>
                                    {this.state.isFileProfessor ? <p　style={{paddingLeft: "35px"}}>{i18n("Uploaded")}</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">{i18n("Not uploaded")}</p>}        

                                    <input type="file" id="fileupload2" onChange={(e)=>{
                                            this.handleFileProfessor(e)
                                        }}/>
                                    <label className="btn-upload" htmlFor="fileupload2"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileProfessorName}
                                    </label>

                                    <div className="spacer-vertical-s"></div>
                                    
                                    <button　className="btn-download" onClick={this.handleDownloadProfessor}><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;{i18n("Download template")}</button>  
                                    
                                </div>
                            </div>                            
                        </div>
                        <div className="spacer-vertical" />
                        <button onClick={this.handleSubmitForPreCheck.bind(this)} className="btn">{i18n("Continue")}</button>
                    </div>
                </div>
            </div>
        )
    }

    renderConfirmPage() {
        return (
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
                    <h1>{i18n("Add Students and Professors")}</h1>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="shadow">
                                <h2>{i18n("Upload Preview")}</h2>
                                <br/>
                                <p>{i18n("School:")} {sessionStorage.getItem('schoolName')}</p>
                                <p>{i18n('setUpSchoolPage_confirm', {newStudents: this.state.newStudents.length, newProfessors: this.state.newProfessors.length})}</p>
                                <p>{i18n("Click Confirm below to begin upload.")}</p>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                    <div className="spacer-vertical-s"></div>
                    <div className="spacer-vertical" />
                    <button onClick={this.handleSubmit.bind(this)} className="btn">{i18n("Confirm")}</button>
                </div>
            </div>
        )
    }

    renderLoading() {
        return(
                <div className="wrap">
                    <div className="page-header"></div>
                    <div className="container">
                        <img src={setUpIcon} className="page-icon" alt="login icon"/>
                        <div className="spacer-vertical" />
                        <h1>{i18n("Add Students and Professors")}</h1>
                        <div >
                            <div className="spacer-vertical" />
                            <h2>{i18n("Loading")}
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </h2>
                        </div>
                    </div>
                </div>
        )
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }
        else if (this.state.preCheckComplete) {
            return this.renderConfirmPage();
        }
        else {
            return this.renderUploadPage();
        }
    }
}

export default SetUpSchoolPage;
