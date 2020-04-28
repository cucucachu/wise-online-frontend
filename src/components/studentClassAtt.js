import React, { Component } from 'react'

import attendClass from '../Assets/images/attend-class.png';
import { markAttendance } from "../store/axios";
// markAttendance(classId, keyCode)

import { AuthContext } from '../contexts/AuthContext'

class StudentClassAtt extends Component {
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

handleChangeID = e =>{
    this.setState({classId: e.target.value})
}
handleChangeKeyCode1 = e =>{
  this.setState({keyCode1: e.target.value})
}

handleChangeKeyCode2 = e =>{
  this.setState({keyCode2: e.target.value})
}
handleChangeKeyCode3 = e =>{
  this.setState({keyCode3: e.target.value})
}
handleChangeKeyCode4 = e =>{
  this.setState({keyCode4: e.target.value})
}
showError = () =>{
  this.setState({showHide: {display: 'block'}})
}
handleSubmit = async e =>{
    e.preventDefault()

    const keycode =  this.state.keyCode1.concat(this.state.keyCode2, this.state.keyCode3, this.state.keyCode4)
    try {
      const response = await markAttendance(this.state.classId, keycode)
      // const testObj = response.data

      if (response.status === 200) {
          sessionStorage.setItem('classId', this.state.classId)
          this.props.history.push('attend-success')
      }
      else {
          const state = Object.assign({}, this.state);
          state.message = 'Invalid Class ID or Attendance Code. Please try again.';
          state.show = 'block';
          this.setState(state);
      }

  }
  catch (error) {
      this.setState({message: 'Opps, something went wrong. Please try again.'})
      this.showError()
  }
    
}
  // componentDidMount() {
  //   this.timer = setInterval(
  //     () => this.checkCookie(),
      
  //     30000
  //   );
  // }
  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }
  // checkCookie(){
  //   const { cookies } = this.context
  //   console.log('cookies: ', cookies);
    
  //   if(cookies === undefined){
  //       this.props.history.push('/student-login')
  //   }else{return}
  // }
  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Mark your attendance</h1>

            
            <div className="spacer-vertical"></div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-wrapper">
                  <div style={{display: this.state.show}}>{this.state.message}</div>
                    <span className="input-label">Class ID</span>
                    <input type="text" placeholder="Class ID" className="" name="classID" value={this.state.classID} onChange={this.handleChangeID.bind(this)} />
                </div>
                <div className="container-note input-wrapper">
                  <div className="space-adjust-2">
                    <p className="text-left tooltip-login" ><span className="tooltip-show">What is my class ID?<br/>
                        <span className="tooltiptext">
                        The class ID is needed to ensure you have authorization to join a class, and can only be obtained from your instructor.
                        </span>
                      </span>
                    </p>
                  </div>
                  
                </div>
                <div className="spacer-vertical"></div>
                <div className="container input-wrapper">
                  <div className="space-adjust-1">
                <div className="row space-adjust">
                  <div className="col">
                    <input type="text" className="keycode-input" value={this.state.keyCode1} onChange={this.handleChangeKeyCode1.bind(this)} maxlength="1"  />
                  </div>
                  <div className="col">
                    <input type="text" className="keycode-input" value={this.state.keyCode2} onChange={this.handleChangeKeyCode2.bind(this)} maxlength="1"  />
                  </div>
                  <div className="col">
                    <input type="text" className="keycode-input" value={this.state.keyCode3} onChange={this.handleChangeKeyCode3.bind(this)} maxlength="1"  />
                  </div>
                  <div className="col">
                    <input type="text" className="keycode-input" value={this.state.keyCode4} onChange={this.handleChangeKeyCode4.bind(this)} maxlength="1"  />
                  </div>
                </div>
                </div>
                </div>
                
                <div className="spacer-vertical"></div>
                <input type="submit" className="btn-att" value="Next" />
            </form>
            
    </div>
      )
  }
}

export default StudentClassAtt;


