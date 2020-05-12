import React, {Component} from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { AuthContext } from '../contexts/AuthContext'
import { submitFeeWaive } from '../store/axios'


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
    
    handleSubmit = async e =>{
        e.preventDefault()

        
        try {
            const schoolName = sessionStorage.getItem('schoolName')
            const emailLowerCase = this.state.email.toLowerCase()
            const data = {firstName: this.state.firstName, lastName: this.state.lastName, email: emailLowerCase, school: schoolName}
            // data.firstName || !data.lastName || !data.email || !data.school
            
            const response = await submitFeeWaive(data)
            
            if (response.status === 200) {            
                
                this.props.history.push('fee-waiver-confirmation')
            }
            else {
                this.setState({message: 'Invalid name or email. Please try again.'})
                this.showError()
            }

        }
        catch (error) {
            this.setState({message: 'Opps, something went wrong. Please try again.'})
            this.showError()
        }
   
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
                    <input type="text" placeholder="First Name" className="" value={this.state.firstName} onChange={this.handleFirstName.bind(this)} required/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Last Name</span>
                    <input type="text" placeholder="Last Name" className="" value={this.state.lastName} onChange={this.handleLastName.bind(this)} required/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" placeholder="Email" className="" onChange={this.handleEmail.bind(this)} value={this.state.email} required/>
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


