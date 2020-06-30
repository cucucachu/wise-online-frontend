import React, {Component} from 'react';

import attendClassIcon from '../Assets/images/attend-class.png';

class StudentClass extends Component {
  render(){
      return(
        <div className="container">
            <img src={attendClassIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <div className="screen-adjust">
                <h1>Have a great class!</h1>
            </div>
          
        </div>
      )
  }
}

export default StudentClass;


