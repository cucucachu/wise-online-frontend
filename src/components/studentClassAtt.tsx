import React, { Component } from 'react'
import attendClass from '../Assets/images/attend-class.png';
import { markAttendance, logout } from "../store/axios";
import {CodeEntry} from './Resusable/CodeEntry';

import { i18n } from 'web-translate';

import { AuthContext } from '../contexts/AuthContext'

type StudentClassAttState = {
  classId: string;
  keyCode1: string;
  keyCode2: string;
  keyCode3: string;
  keyCode4: string;
  message: string;
  show: string;
}

class StudentClassAtt extends Component<any, StudentClassAttState> {
  static contextType = AuthContext

  state={
    classId: '',
    keyCode1: '',
    keyCode2: '',
    keyCode3: '',
    keyCode4: '',
    message: '',
    show: 'none',
};

handleChangeID: React.ChangeEventHandler<HTMLInputElement> = e =>{
    this.setState({classId: e.target.value})
}
handleChangeKeyCode1 = (keyCode1: string) =>{
  this.setState({keyCode1})
}

handleChangeKeyCode2 = (keyCode2: string) =>{
  this.setState({keyCode2})
}

handleChangeKeyCode3 = (keyCode3: string) =>{
  this.setState({keyCode3})
}

handleChangeKeyCode4 = (keyCode4: string) =>{
  this.setState({keyCode4})
}

showError = () =>{
  this.setState({show: 'block'});
}
handleSubmit: React.FormEventHandler<HTMLFormElement> = async e =>{
    e.preventDefault()

    const keycode =  this.state.keyCode1.concat(this.state.keyCode2, this.state.keyCode3, this.state.keyCode4)
    try {
      const response = await markAttendance(this.state.classId, keycode)
      // const testObj = response.data

      if (response.status === 200) {
          sessionStorage.setItem('classId', this.state.classId)
          this.props.history.push('attend-success')
      }else if(response.status === 401){
        console.log('res: ', response)
        sessionStorage.clear();
        logout()
        this.props.history.push({
          pathname: '/student-login',
          state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
        })
    }
      else {
          const state = Object.assign({}, this.state);
          state.message = 'Invalid Class ID or Attendance Code. Please try again.';
          state.show = 'block';
          this.setState(state);
      }

  }
  catch (error) {
      this.setState({message: 'Oops, something went wrong. Please try again.'})
      this.showError()
  }
    
}

  render(){
      return(
        <div className="container prevent-text">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Mark your attendance")}</h1>

            <div className="spacer-vertical" />
            <form onSubmit={this.handleSubmit}>
                <div className="input-wrapper">
                  <div style={{display: this.state.show}}>{this.state.message}</div>
                    <span className="input-label">{i18n("Class ID")}</span>
                    <input id="classID" type="text" placeholder={i18n("Class ID")} className="" name="classID" value={this.state.classId} onChange={this.handleChangeID.bind(this)} required/>
                </div>
                <div className="container-note input-wrapper">
                  <div className="space-adjust-2">
                    <p className="text-left tooltip-login" ><span className="tooltip-show">{i18n("What is my class ID?")}<br/>
                        <span className="tooltiptext">
                        {i18n("The class ID is needed to ensure you have authorization to join a class, and can only be obtained from your instructor.")}
                        </span>
                      </span>
                    </p>
                  </div>
                  
                </div>
                <div className="spacer-vertical" />
                <CodeEntry
                  keyCode1={this.state.keyCode1}
                  keyCode2={this.state.keyCode2}
                  keyCode3={this.state.keyCode3}
                  keyCode4={this.state.keyCode4}
                  onChangeKeyCode1={this.handleChangeKeyCode1}
                  onChangeKeyCode2={this.handleChangeKeyCode2}
                  onChangeKeyCode3={this.handleChangeKeyCode3}
                  onChangeKeyCode4={this.handleChangeKeyCode4}
                />
                
                <div className="spacer-vertical" />
                <input type="submit" className="btn-att" value={i18n("Next")} />
            </form>
            
    </div>
      )
  }
}

export default StudentClassAtt;


