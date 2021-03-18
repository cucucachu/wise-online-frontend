import React, {Component} from 'react';

import loginIcon from '../Assets/images/login-icon.png'
import successIcon from '../Assets/images/success-icon.png'

import { Link } from 'react-router-dom';

class AdminResetPWSuccess extends Component {


  render(){
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
                <h1 style={{color: '#4ebd0f'}}>Success!</h1>

            <div className="spacer-vertical-s"></div>
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">Your password has been reset.</p>
            <div className="spacer-vertical" />
            <Link to="/admin-login">
                <button className="btn" >Log in</button>
            </Link>
            
    </div>
      )
  }
}

export default AdminResetPWSuccess;


