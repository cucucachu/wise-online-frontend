import React, {Component} from 'react';
import setUpIcon from '../Assets/images/setting-icon.png';
import uploadIcon from '../Assets/images/upload-icon.svg';
import downloadIcon from '../Assets/images/download-icon.svg';

import '../Assets/css/radiobtn.css'
import '../Assets/css/spinner.css'
// import { Link } from "react-router-dom";
import { postFiles, getStudentTemplateURL, getProfessorTemplateURL } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'



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
        isLoading: false
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
    handleSubmit= async e =>{
        e.preventDefault()
        if(this.state.fileStudent.name === undefined || this.state.fileProfessor.name === undefined){
            this.setState({message: 'Please upload both files.'})
            this.showError()
        }else{
            this.setState({isLoading: true})
            try {
                const response = await postFiles(this.state.fileProfessor, this.state.fileStudent)
    
                if (response.status === 200) {
                                    
                    this.props.history.push('/admin/set-up-success')
                }
                else {
                    console.log('res: ', response);
                    
                    this.setState({isLoading: false})
                    this.setState({message: response.data.error})
                    this.showError()
                }
    
            }
            catch (error) {
                this.setState({isLoading: false})
                this.setState({message: 'Opps, something went wrong. Please try again.'})
                this.showError()
            }
        }
        
    }

  render(){

      return(
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Set up your school</h1>
                    {this.state.isLoading ?
                    <div >
                        <div className="spacer-vertical"></div>
                        <h2>Loading
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </h2>
                    </div>
                     : 
                     <React.Fragment>
                         <p className="text-plain">Information must match the provided template </p>
                        <div className="spacer-vertical-s"></div>
                        <h3 style={this.state.showHide}>{this.state.message}</h3>
                        <div className="container">
                            <div className="row align-1">
                                
                                <form className="width-adjust-3">
                                <div className="col-sm-6">
                                        <div className="shadow">
                                        
                                            <label className="radio-container"><h2 style={{paddingTop: "5px"}} className="text-plain">Student roster</h2>
                                            {this.state.checkStudent ? <input type="checkbox" disabled="disabled" checked/> : <input type="checkbox" disabled="disabled" /> }
                                            <span className="checkmark"></span>
                                            </label>
                                            {this.state.isFileStudent ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">Not uploaded</p>}
                                            <input type="file" id="fileupload1" onChange={(e)=>{
                                                    this.handleFileStudent(e)
                                                }}/>
                                            <label className="btn-upload" htmlFor="fileupload1"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileStudentName}
                                            </label>
                                            <div className="spacer-vertical-s"></div>
                                            <button　className="btn-download" onClick={this.handleDownloadStudent}> <div><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;Download template</div>
                                            </button>
                                        </div> 
                                    </div>
                        
                                    <div className="col-sm-6">
                                        <div className="shadow">
                                            {/* <h3 style={this.state.showHide}>{this.state.message}</h3> */}

                                            <label className="radio-container"><h2 className="text-plain" style={{paddingTop: "5px"}}>Professor roster</h2>
                                            {this.state.checkProfessor ? <input type="checkbox" disabled="disabled" checked/> : <input type="checkbox" disabled="disabled"/>}
                                            <span className="checkmark"></span>
                                            </label>
                                            {this.state.isFileProfessor ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">Not uploaded</p>}        

                                            <input type="file" id="fileupload2" onChange={(e)=>{
                                                    this.handleFileProfessor(e)
                                                }}/>
                                            <label className="btn-upload" htmlFor="fileupload2"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileProfessorName}
                                            </label>

                                            <div className="spacer-vertical-s"></div>
                                            
                                            <button　className="btn-download" onClick={this.handleDownloadProfessor}><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;Download template</button>  
                                            
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            <div className="spacer-vertical"></div>
                            <button onClick={this.handleSubmit.bind(this)} className="btn">Next</button>
                        </div>
                     </React.Fragment>
                     }
                    
                    
                </div>
            </div>
      )
  }
}

export default SetUpSchoolPage;
