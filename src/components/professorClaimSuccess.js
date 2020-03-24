import React, {Component} from 'react';

// import attendClass from '../Assets/images/attend-class.png';
import loginIcon from '../Assets/images/login-icon.png';
import successIcon from '../Assets/images/success-icon.png'

import { markAttendance } from "../store/axios";
// markAttendance(classId, keyCode)

import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';

class ProfessorClaimSuccess extends Component {
  static contextType = AuthContext

  state={
    userID: '',
};

handleChangeID = e =>{
    this.setState({classID: e.target.value})
}

handleSubmit = async e =>{
    e.preventDefault()
    const keycode =  this.state.keyCode1.concat(this.state.keyCode2, this.state.keyCode3, this.state.keyCode4)
    
    console.log('keycode: ', keycode)
    
    const response = await markAttendance(this.state.classID, keycode)
    console.log('res: response', response);
    
    const attendance = response.data
}
componentDidMount(){
    const { userID } = this.context
    this.setState({userID: userID})
    
}
  render(){
      return(
        <div className="container">
            <img src={loginIcon } className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
                <h1 style={{color: '#4ebd0f'}}>Success!</h1>

            <div className="spacer-vertical-s"></div>
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">Thank you!</p>
            <h2 className="text-black">{this.state.userID}</h2>
            <div className="spacer-vertical-s"></div>
            <Link to="/professor/course">
                <button className="btn" >Continue</button>
            </Link>
            
    </div>
      )
  }
}

export default ProfessorClaimSuccess;


