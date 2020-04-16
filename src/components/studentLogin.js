import React, {Component} from 'react'
// import { Link } from "react-router-dom"

import loginIcon from '../Assets/images/login-icon.png'

import { studentLogin } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'


class StudentLogin extends Component {
    static contextType = AuthContext

    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        this.setState({key: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = async e =>{
        e.preventDefault()
        const { loggedinUser, authToggle } = this.context

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            const response = await studentLogin(emailLowerCase, this.state.key)
            const userStudent = response.data

            if (response.status === 200) {
                // argument (name, id, schoolID)
                
                sessionStorage.setItem('userID', userStudent.id)
                sessionStorage.setItem('username', userStudent.name)
                sessionStorage.setItem('schoolName', userStudent.name)
                sessionStorage.setItem('schoolID', userStudent.school.id)
                // loggedinUser(userStudent.id, userStudent.name, userStudent.school.name, userStudent.school.id)
                // authToggle()                 
                
                this.props.history.push('/student/dashboard')
            }
            else {
                this.setState({message: 'Invalid email or student id. Please try again.'})
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
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Login to Wise</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3"value={this.state.email} onChange={this.handleChangeName.bind(this)} placeholder="Email"/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" onChange={this.handleChangeKey.bind(this)} value={this.state.key} placeholder="Student ID"/>
                </div>
                <div className="input-wrapper">
                    <div className="width-md">
                        {/* <Link to="#">What's my student ID?</Link> */}
                        <p className="tooltip-login">
                            <span className="for-border">What's my student ID?</span><br/>
                            <span className="tooltiptext">
                            {/* <div class="arrow bottom right"></div> */}
                            Your school’s student ID is a code of letters and/or numbers provided to identify you by your school.  Wise uses your school’s student ID to verify your identity, securely.  If you have forgotten your school ID, please contact the appropriate individual at your school.
                                </span>
                        </p>
                        

                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                        <input type="submit" className="btn" value="Submit" />
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


