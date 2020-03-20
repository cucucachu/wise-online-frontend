import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';
import { studentLogin } from '../store/axios'


class StudentLogin extends Component {
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
        // const userAdmin = studentLogin({email: this.state.name, password: this.state.key});
        const userAdmin = studentLogin(this.state.email, this.state.key)
        
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


