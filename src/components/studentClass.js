import React, {Component} from 'react';

import attendClassIcon from '../Assets/images/attend-class.png';

import { i18n } from 'web-translate';

class StudentClass extends Component {
  render(){
      return(
        <div className="container">
            <img src={attendClassIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <div className="screen-adjust">
                <h1>{i18n("Have a great class!")}</h1>
            </div>
          
        </div>
      )
  }
}

export default StudentClass;


