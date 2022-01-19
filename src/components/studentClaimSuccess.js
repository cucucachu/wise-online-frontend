import React, { Component } from 'react';

import loginIcon from '../Assets/images/login-icon.png';
import successIcon from '../Assets/images/success-icon.png'

import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';
import { i18n } from 'web-translate';

class StudentClaimSuccess extends Component {
  static contextType = AuthContext

  state={
    userID: '',
};

// componentDidMount(){
//     const { userID } = this.context
//     this.setState({userID: userID})

//     this.timer = setInterval(
//         () => this.checkCookie(),
        
//         300000
//       );
// }
// componentWillUnmount() {
//     clearInterval(this.timer);
//   }
// checkCookie(){
// const { cookies } = this.context
// console.log('cookies: ', cookies);

// if(cookies === undefined){
//     this.props.history.push('/professor-login')
// }else{return}
// }
  render(){
      return(
        <div className="container">
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical" />
            <h1 style={{color: '#4ebd0f'}}>{i18n("Success!")}</h1>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">{i18n("You have created your student account")}</p>
            <div className="spacer-vertical-s"></div>
            <Link to="/student-login">
                <button className="btn" >{i18n("Continue")}</button>
            </Link>
            
    </div>
      )
  }
}

export default StudentClaimSuccess;


