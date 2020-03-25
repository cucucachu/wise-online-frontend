import React, {Component} from 'react';
import setUpIcon from '../Assets/images/setting-icon.png';
import uploadIcon from '../Assets/images/upload-icon.svg';
import downloadIcon from '../Assets/images/download-icon.svg';

import '../Assets/css/radiobtn.css'
import { Link } from "react-router-dom";
import { postFiles } from '../store/axios'
import { fs } from 'fs'


class SetUpSchoolPage extends Component {
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
        checkProfessor: false
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

        const studentTemplate = await fs.writeFile('student.csv', 'First Name,Middle Name,Last Name,Email\n', 'utf8')
        console.log('studentTemplate: ', studentTemplate);
        
    }
    handleDownloadProfessor = async e =>{
        
        await fs.writeFile('professor.csv', 'First Name,Middle Name,Last Name,Email\n', 'utf8')

    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    handleSubmit= async e =>{
        e.preventDefault()
        try {
            const response = await postFiles(this.state.fileProfessor, this.state.fileStudent)
            const result = response.data

            if (response.status === 200) {
                console.log('result: ', result);
                                
                this.props.history.push('/admin/download')
            }
            else {
                this.setState({message: 'No file uploaded.'})
                this.showError()
            }

        }
        catch (error) {
            this.setState({message: 'Opps, something went wrong. Please try again.'})
            this.showError()
        }
    }


  render(){

      return(
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Set up your shool</h1>
                    <p className="text-plain">Information must match the provided template </p>
                    <div className="spacer-vertical-s"></div>
                    <div className="container">
                        <div className="row">
                            <form>
                            <div className="col-sm-6">
                                    <div className="shadow">
                                        <h3 style={this.state.showHide}>{this.state.message}</h3>
                                    
                                        <label className="radio-container"><h2 style={{paddingTop: "5px"}} className="text-plain">Student roster</h2>
                                        {this.state.checkStudent ? <input type="checkbox" checked/> : <input type="checkbox" /> }
                                        <span className="checkmark"></span>
                                        </label>
                                        {this.state.isFileStudent ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">Not uploaded</p>}
                                        <input type="file" id="fileupload1" onChange={(e)=>{
                                                this.handleFileStudent(e)
                                            }}/>
                                         <label className="btn-upload" htmlFor="fileupload1"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileStudentName}
                                        </label>
                                        <div className="spacer-vertical-s"></div>
                                        <button　className="btn-download"> <div><img src={downloadIcon} className="icon-sm" />&nbsp;Download template</div> 
                                        </button>                                    
                                    </div> 
                                </div>
                      
                                <div className="col-sm-6">
                                    <div className="shadow">
                                        <h3 style={this.state.showHide}>{this.state.message}</h3>

                                        <label className="radio-container"><h2 className="text-plain" style={{paddingTop: "5px"}}>Professor roster</h2>
                                        {this.state.checkProfessor ? <input type="checkbox" checked/> : <input type="checkbox"/>}
                                        <span className="checkmark"></span>
                                        </label>
                                        {this.state.isFileProfessor ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  style={{paddingLeft: "35px", color: 'gray'}} className="text-plain">Not uploaded</p>}        

                                        <input type="file" id="fileupload2" onChange={(e)=>{
                                                this.handleFileProfessor(e)
                                            }}/>
                                         <label className="btn-upload" htmlFor="fileupload2"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{this.state.fileProfessorName}
                                        </label>

                                        <div className="spacer-vertical-s"></div>
                                        <a href="#" target="_blank">
                                            <button　className="btn-download"><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;Download template</button>  
                                        </a>
                                    </div>
                                </div>
                                
                                
                            </form>
                            
                        </div>
                        <button onClick={this.handleSubmit.bind(this)} className="btn">Next</button>
                    </div>
                </div>
            </div>
      )
  }
}

export default SetUpSchoolPage;
