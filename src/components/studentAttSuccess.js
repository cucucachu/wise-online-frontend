import React, {Component} from 'react';

import attendClass from '../Assets/images/attend-class.png';
import successIcon from '../Assets/images/success-icon.png'

import { Link } from 'react-router-dom';

import { i18n } from 'web-translate';

class StudentAttSuccess extends Component {
  state={
    classID: sessionStorage.getItem('classId')
  }


  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
                <h1 style={{color: '#4ebd0f'}}>{i18n("Success!")}</h1>

            <div className="spacer-vertical-s"></div>
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">{i18n("Your attendance has been registered for:")}</p>
            <h2>{this.state.classID}</h2>
            <Link to="/student/dashboard">
                <button className="btn" >{i18n("Done")}</button>
            </Link>
            
    </div>
      )
  }
}

export default StudentAttSuccess;


