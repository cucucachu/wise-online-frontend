import React, {Component} from 'react';

import attendClass from '../Assets/images/attend-class.png';
import successIcon from '../Assets/images/success-icon.png'

import { markAttendance } from "../store/axios";
// markAttendance(classId, keyCode)

import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';

class StudentAttSuccess extends Component {
  static contextType = AuthContext

  state={
    classID: '',
    keyCode1: '',
    keyCode2: '',
    keyCode3: '',
    keyCode4: ''
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
    const { classID } = this.context
    this.setState({classID: classID})
    console.log('classID: ', this.state.classID);
    
}
  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
                <h1 style={{color: '#4ebd0f'}}>Success!</h1>

            <div className="spacer-vertical-s"></div>
            <img src={successIcon} className="page-icon" alt="success icon" style={{boxShadow: '0 0 0 transparent'}}/>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">Your attendance has been registered for:</p>
            <h2>{this.state.classID}</h2>
            <Link to="/student/dashboard">
                <button className="btn" >Done</button>
            </Link>
            
    </div>
      )
  }
}

export default StudentAttSuccess;


