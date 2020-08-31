import React, { Component } from 'react'
import { Link } from "react-router-dom"

import loginIcon from '../Assets/images/login-icon.png';
import { AuthContext } from '../contexts/AuthContext';

import { adminLogin } from '../store/axios';
   
   
class AdminLogin extends Component {

    static contextType = AuthContext
    state={
        email: '',
        key: '',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeName = e => {
        this.setState({email: e.target.value});
    }

    handleChangeKey = e => {
        this.setState({key: e.target.value});
    }
    
    showError = () => {
        this.setState({showHide: {display: 'block'}});
    }

    handleSubmit = async e => {
        e.preventDefault();

        try {
            const emailLowerCase = this.state.email.toLowerCase();
            
            const response = await adminLogin(emailLowerCase, this.state.key);
            
            if (response.status === 200) {
                this.props.onSuccessfulLogin(response.data);
                this.props.history.push('/admin');
            }
            else {
                this.setState({message: 'Invalid email or password. Please try again.'});
                this.showError();
            }
        }
        catch (error) {
            this.setState({message: 'Oops, something went wrong. Please try again.'});
            this.showError();
        }
        
        return;        
    }
    
    componentDidMount() {
        if (this.props.location.state) {
            const historyStates = this.props.location.state;
            this.setState({message: historyStates.message, showHide: historyStates.showHide});
        }
        else {
            return;
        }
    }

    render() {
        
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
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className=""  
                            name="email" 
                            value={this.state.email} 
                            onChange={this.handleChangeName.bind(this)} 
                            required
                            autoComplete="email"
                        />
                    </div>
                    
                    <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">Password</span>
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="" 
                            name="key" 
                            onChange={this.handleChangeKey.bind(this)} 
                            value={this.state.key} 
                            required
                            autoComplete="current-password"
                        />
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