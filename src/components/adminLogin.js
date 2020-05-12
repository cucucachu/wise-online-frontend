import React, { Component } from 'react'
import { Link } from "react-router-dom"

import loginIcon from '../Assets/images/login-icon.png'
import { AuthContext } from '../contexts/AuthContext'

import { adminLogin } from '../store/axios'
   
   
class AdminLogin extends Component {
    static contextType = AuthContext
    state={
        email: '',
        key: '',
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
        // const { loggedinUser, authToggle } = this.context

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            
            const response = await adminLogin(emailLowerCase, this.state.key)
            const userAdmin = response.data;
            sessionStorage.setItem('userID', userAdmin.id)
            sessionStorage.setItem('username', userAdmin.name)
            sessionStorage.setItem('schoolName', userAdmin.school.name)
            sessionStorage.setItem('schoolID', userAdmin.school.id)
            
            if (response.status === 200) {
                // loggedinUser(userAdmin.id, '', userAdmin.school.name, userAdmin.school.id)
                // authToggle() 
                
                
                sessionStorage.setItem('isLoggedIn', true)
                this.props.history.push('/admin/download')
            }
            else {
                this.setState({message: 'Invalid email or password. Please try again.'})
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
            <h1>Administration login</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Email</span>
                    <input type="email" placeholder="Email" className=""  name="email" value={this.state.email} onChange={this.handleChangeName.bind(this)} required/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" placeholder="Password"
                    className="" name="key" onChange={this.handleChangeKey.bind(this)} value={this.state.key} required/>
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom width-md">
                        <div className="student-login-wrapper">
                            <Link to="/create-school">Create your school</Link>
                            <Link to="admin/forgot-pw">Forgot Password</Link>
                        </div>
                    </div>
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

export default AdminLogin;