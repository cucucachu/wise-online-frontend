import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
   } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';

import { AuthContext } from '../contexts/AuthContext'

class SchoolStep2 extends Component {
    static contextType = AuthContext
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
            <h1>Create Your Shool</h1>

            <form>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Email</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div className="input-label">Password</div>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Password</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to="/set-up-school"><button className="btn">Next</button></Link>
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default SchoolStep2;