import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

class StudentLogin extends Component {
  render(){
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Login to Wise</h1>
            <form>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" />
                </div>
                <div className="input-wrapper">
                    <div className="text-plain" style={{width: '58%'}}>
                        <Link to="#">What's my student ID?</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to="/student/dashboard"><button className="btn">Submit</button></Link>
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


