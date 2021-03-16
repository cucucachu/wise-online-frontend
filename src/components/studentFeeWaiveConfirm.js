import React, {Component} from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { AuthContext } from '../contexts/AuthContext'


class StudentFeeWaiveConfirm extends Component {
    static contextType = AuthContext

    state={
        email: '',
        firstName: '',
        lastName: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'},
        toggleCss: false
    };
    handleRadio = e =>{
        e.preventDefault()
        this.setState(prevState => ({
            toggleCss: !prevState.toggleCss
          }));
    }
    handleSubmit = e =>{
        e.preventDefault()
        this.props.history.push('/student-login')
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
        //     this.setState({message: 'Oops, something went wrong. Please try again.'})
        //     this.showError()
        // }
   
        return
        
    };

    onFocus = (id) => {
        document.getElementById(id).onpaste = e => {
            e.preventDefault();
            return false;
        };
    };
  render(){
    const { firstName, lastName, email, schoolName } = this.context
    console.log('school: ', schoolName);
    
        // console.log('firstname: ', firstName);
        
        // this.setState({firstName: firstName, lastName: lastName, email: email, schoolName: schoolName})
        // console.log('this state: ', this.firstName);

      return(
        <div className="container prevent-text">
            <img src={educationIcon} className="page-icon" alt="wise education icon"/>
            <div className="spacer-vertical"></div>
            <h1>Review and confirm</h1>
            <div className="spacer-vertical"></div>
            <div className="width-slim text-plain">
                <p>
                Please review and confirm that the following information is accurate, in your registration for waiving the Wise Education support fee.
                </p>
                <div className="spacer-vertical"></div>
                <p>
                    School: {schoolName} <br/>
                    Student name: {firstName} {lastName} <br/>
                    Student email: {email}
                </p>
                
                    <div className="spacer-vertical"></div>

                    <div className="row">
                        <div className="col-sm-1">
                            <button className="mimic-radio" onClick={this.handleRadio.bind(this)} >{this.state.toggleCss ? <strong>&#10003;</strong> : ''}</button>
                            
                        </div>
                        <div className="col-sm-11">
                            <strong>I register as having financial need.<br /> The above information is accurate.</strong></div>
                    </div>
                    
                    <div className="spacer-vertical"></div>
                
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input id="student_fee_waive" type="submit" className="btn" value="Submit" onFocus={() => this.onFocus("student_fee_waive")}/>
            </form>
            
    </div>
      )
  }
}

export default StudentFeeWaiveConfirm;


