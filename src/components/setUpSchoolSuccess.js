import React, {Component} from 'react';

import setUpIcon from '../Assets/images/setting-icon.png'
import successIcon from '../Assets/images/success-icon.png'

import { i18n } from 'web-translate';

import { Link } from 'react-router-dom';

class SetupSchoolSuccess extends Component {


  render(){
      return(
        <div className="container">
            <img src={setUpIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
                <h1 style={{color: '#4ebd0f'}}>{i18n("Success!")}</h1>

            <div className="spacer-vertical-s"></div>
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">{i18n("Your school has been set up.")}</p>
            {/* <h2>{this.state.classID}</h2> */}
            <div className="spacer-vertical" />
            <Link to="/admin/download">
                <button className="btn" >{i18n("Finish")}</button>
            </Link>
            
    </div>
      )
  }
}

export default SetupSchoolSuccess;