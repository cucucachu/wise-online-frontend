import React, {Component} from 'react';
import { Link } from "react-router-dom";

import educationIcon from '../Assets/images/wise-education.png'

import { studentLogin } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'


class StudentFeeWaiveSelect extends Component {
    static contextType = AuthContext

    state={
        schoolName: '',
        display: 'none',
        message:'Please select your school to proceed.',
        showHide: {display: 'none'}
    };

    handleChangeSchool = e =>{
        this.setState({schoolName: e.target.value})
        console.log('schoolname: ', this.state.schoolName);
        console.log('e: ', e.target.value);
        
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = async e =>{
        e.preventDefault()
        const { storeSchoolName } = this.context
        console.log('schoolName: ', this.state.schoolName);
        
        if(this.state.schoolName === 'not selected' || this.state.schoolName === ''){
            this.setState({showHide: {display: 'block'}})
            
        }else{
            storeSchoolName(this.state.schoolName)
            this.props.history.push('fee-waiver-note')
        }
        // try {
        //     const emailLowerCase = this.state.email.toLowerCase()
        //     const response = await studentLogin(emailLowerCase, this.state.key)
        //     const userStudent = response.data

        //     if (response.status === 200) {
        //         // argument (name, id, schoolID)
        //         loggedinUser(userStudent.id, userStudent.name, userStudent.school.name, userStudent.school.id)
        //         authToggle()                 
                
        //         this.props.history.push('/student/dashboard')
        //     }
        //     else {
        //         this.setState({message: 'Invalid email or student id. Please try again.'})
        //         this.showError()
        //     }

        // }
        // catch (error) {
        //     this.setState({message: 'Opps, something went wrong. Please try again.'})
        //     this.showError()
        // }
   
        return
        
    }
    
  render(){
    
      return(
        <div className="container">
            <img src={educationIcon} className="page-icon" alt="wise education icon"/>
            <div className="spacer-vertical"></div>
            <h1>Select your school</h1>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">Please select your school</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    {/* <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" /> */}
                    <select id="schools" name="schools" value={this.state.schoolName} onChange={this.handleChangeSchool.bind(this)} className="student-form-select text-plain shadow">
                        <option value="not selected">Select university</option>
                        <option value="schoolA">School A</option>
                        <option value="schoolB">School B</option>
                        <option value="schoolC">School C</option>
                        <option value="schoolD">School D</option>
                    </select>
                </div>
                
                {/* <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" onChange={this.handleChangeKey.bind(this)} value={this.state.key} />
                </div>
                <div className="input-wrapper">
                    <div className="text-plain" style={{width: '58%'}}>
                        <Link to="#">What's my student ID?</Link>
                    </div>
                </div> */}
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/student/dashboard"> */}
                        <input type="submit" className="btn" value="Next" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default StudentFeeWaiveSelect;


