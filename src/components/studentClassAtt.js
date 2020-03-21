import React, {Component} from 'react';

import attendClass from '../Assets/images/attend-class.png';
import { markAttendance } from "../store/axios";
// markAttendance(classId, keyCode)

class StudentClassAtt extends Component {
  state={
    classID: '',
    keyCode: ''
};

handleChangeID = e =>{
    this.setState({classID: e.target.value})
}
handleChangeKeyCode = e =>{
  this.setState({classID: e.target.value})
}

handleSubmit = e =>{
    e.preventDefault()
    
    console.log('state: ', this.state)
    const attendance = markAttendance(this.state.classID)
}
  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
                <h1>Mark your attendance</h1>

            <div className="spacer-vertical"></div>
            <form >
                <div className="input-wrapper">
                    <span className="input-label">Class ID</span>
                    <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" name="classID" value={this.state.classID} onChange={this.handleChangeID.bind(this)} />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Class ID</span>
                    <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" name="classID" value={this.state.keyCode} onChange={this.handleChangeKeyCode.bind(this)} />
                </div>
                <p className="width-adjust-1">What is my class ID?</p>
                <div className="spacer-vertical"></div>

              <div className="row">
                  <div className="row-container">
                    <div className="col-sm-3">
                      <div className="shadow-sm">7</div>
                    </div>
                    <div className="col-sm-3">
                      <div className="shadow-sm">1</div>
                    </div>
                    <div className="col-sm-3">
                      <div className="shadow-sm">1</div>
                    </div>
                    <div className="col-sm-3">
                      <div className="shadow-sm">4</div>
                    </div>
                  </div>
                </div>
                <input type="submit" className="btn" value="Next" />
            </form>
            
    </div>
      )
  }
}

export default StudentClassAtt;


