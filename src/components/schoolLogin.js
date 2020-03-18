import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

class SchoolLogin extends Component {
  render(){
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>School login</h1>
            <form>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Name</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Key</span>
                    <input type="password" className="" />
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom">
                        <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to="/select-role"><button className="btn">Next</button></Link>
                </div>
            </form>
    </div>
      )
  }
}

export default SchoolLogin;


