import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';

import { AuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';

class SchoolStep2 extends Component {
    static contextType = AuthContext
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
            <h1>{i18n("HERE")}Create Your School</h1>

            <form>
                <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <span className="input-label">{i18n("HERE")}Email</span>
                    <input type="email" className="" />
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("HERE")}Confirm Email</span>
                    <input type="email" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div className="input-label">{i18n("HERE")}Password</div>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("HERE")}Confirm Password</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical" />
                <div className="">
                    <Link to="/set-up-school"><button className="btn">{i18n("HERE")}Next</button></Link>
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default SchoolStep2;