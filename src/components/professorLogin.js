import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import { professorLogin } from '../store/axios'

import loginIcon from '../Assets/images/login-icon.png';

class ProfessorLogin extends Component {
    state={
        email: '',
        key: ''
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value);
        
        this.setState({key: e.target.value})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        
        console.log('state: ', this.state);
        const userProfessor = professorLogin(this.state.email, this.state.key)
        
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
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" value={this.state.email} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" className="" name="key" onChange={this.handleChangeKey.bind(this)} value={this.state.key}/>
                </div>
  
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/professor-course"> */}
                        <input type="submit" className="btn" value="Next" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default ProfessorLogin;


