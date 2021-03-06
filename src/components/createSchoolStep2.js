import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';

import { AuthContext } from '../contexts/AuthContext'

class SchoolStep2 extends Component {
    static contextType = AuthContext
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
            <h1>Create Your School</h1>

            <form>
                <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" />
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
                <div className="spacer-vertical" />
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