import React, {Component} from 'react';
import { Link } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

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
                loggedinUser(userStudent.id, userStudent.name, userStudent.school.name, userStudent.school.id)
                authToggle()                 
                
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
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3"value={this.state.email} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" onChange={this.handleChangeKey.bind(this)} value={this.state.key} />
                </div>
                <div className="input-wrapper">
                    <div className="text-plain" style={{width: '58%'}}>
                        <Link to="#">What's my student ID?</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/student/dashboard"> */}
                        <input type="submit" className="btn" value="Submit" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


