import React, {Component} from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { AuthContext } from '../contexts/AuthContext'


class StudentFeeWaiveForm extends Component {
    static contextType = AuthContext

    state={
        email: '',
        firstName: '',
        lastName: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleFirstName = e =>{
        this.setState({firstName: e.target.value})
    }
    handleLastName = e =>{
        this.setState({lastName: e.target.value})
    }
    handleEmail = e =>{
        this.setState({email: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        
        const { studentForm, firstName } = this.context
        studentForm(this.state.firstName, this.state.lastName, this.state.email )
        
        this.props.history.push('fee-waiver-confirmation')
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
            <h1>Input your information</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">First Name</span>
                    <input type="text" className="" value={this.state.firstName} onChange={this.handleFirstName.bind(this)}/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Last Name</span>
                    <input type="text" className="" value={this.state.lastName} onChange={this.handleLastName.bind(this)}/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" onChange={this.handleEmail.bind(this)} value={this.state.email} />
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                        <input type="submit" className="btn" value="Next" />
                </div>
            </form>
    </div>
      )
  }
}

export default StudentFeeWaiveForm;


