import React, {Component} from 'react'
import { Link } from "react-router-dom"

import loginIcon from '../Assets/images/login-icon.png'

import { AuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';


class ForgotPWSentAdmin extends Component {
    static contextType = AuthContext

    
  render(){
    
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Forgot my Password")}</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-adjust-1">
                <p className="text-plain ">{i18n("Reset link sent! Please allow a few moments for the email to reach your inbox.")}</p>
            </div>
            <div className="spacer-vertical" />
 
                        
                <div className="spacer-vertical" />
                <div className="">
                    <Link to="/">
                    <button className="btn">{i18n("Back")}</button>
                    </Link>
                </div>
    </div>
      )
  }
}

export default ForgotPWSentAdmin;


