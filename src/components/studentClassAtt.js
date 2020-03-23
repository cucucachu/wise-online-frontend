import React, {Component} from 'react';

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
    keyCode4: ''
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
handleSubmit = async e =>{
    e.preventDefault()
    const { storeClassId } = this.context
    storeClassId(this.state.classId)

    const keycode =  this.state.keyCode1.concat(this.state.keyCode2, this.state.keyCode3, this.state.keyCode4)
    
    const response = await markAttendance(this.state.classId, keycode)
    console.log('res: response', response);
    this.props.history.push('/student/class/attend-success')
    
    const attendance = response.data
}
  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
                <h1>Mark your attendance</h1>

            <div className="spacer-vertical"></div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-wrapper">
                    <span className="input-label-att">Class ID</span>
                    <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" name="classID" value={this.state.classID} onChange={this.handleChangeID.bind(this)} />
                </div>
                <div className="spacer-vertical-s"></div>
                {/* <div className="input-wrapper">
                    <span className="input-label">Keycode</span>
                    <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" name="classID" value={this.state.keyCode} onChange={this.handleChangeKeyCode.bind(this)} />
                </div> */}
                <p className="width-adjust-1">What is my class ID?</p>
                <div className="spacer-vertical"></div>

              <div className="row">
                  <div className="row-container">
                    <div className="col-sm-3">
                      <input type="text" className="keycode-input" value={this.state.keyCode1} onChange={this.handleChangeKeyCode1.bind(this)} />
                    </div>
                    <div className="col-sm-3">
                    <input type="text" className="keycode-input" value={this.state.keyCode2} onChange={this.handleChangeKeyCode2.bind(this)} />
                    </div>
                    <div className="col-sm-3">
                    <input type="text" className="keycode-input" value={this.state.keyCode3} onChange={this.handleChangeKeyCode3.bind(this)} />
                    </div>
                    <div className="col-sm-3">
                    <input type="text" className="keycode-input" value={this.state.keyCode4} onChange={this.handleChangeKeyCode4.bind(this)} />
                    </div>
                  </div>
                </div>
                <div className="spacer-vertical"></div>
                <input type="submit" className="btn" value="Next" />
            </form>
            
    </div>
      )
  }
}

export default StudentClassAtt;


