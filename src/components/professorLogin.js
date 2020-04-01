import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { professorLogin } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

import loginIcon from '../Assets/images/login-icon.png';

class ProfessorLogin extends Component {
    static contextType = AuthContext

    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: { display: 'none'}
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
        const { loggedinUser, authToggle, isAuthenticated } = this.context

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            
            const response = await professorLogin(emailLowerCase, this.state.key)
            const userProfessor = response.data;

            if (response.status === 200) {
                console.log('userProfessor: ', userProfessor);
       
                // (userID, schoolName, schoolID)
                loggedinUser(userProfessor.id, userProfessor.name, userProfessor.school.name, userProfessor.school.id)
                if(isAuthenticated === false){
                    authToggle()
                }
                
                this.props.history.push('/professor/course')
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
            <h1>Professor login</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" value={this.state.email} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" className="" name="key" onChange={this.handleChangeKey.bind(this)} value={this.state.key}/>
                </div>

                <div className="input-wrapper">
                    <div className="input-wrapper-bottom">
                        <Link to="/professor/claim-account">Claim your account</Link><Link to="/forgot-pw">Forgot Password</Link>
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

export default ProfessorLogin;


