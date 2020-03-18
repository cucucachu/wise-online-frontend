import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import attendClass from '../Assets/images/attend-class.png';

class StudentClassAtt extends Component {
  render(){
      return(
        <div className="container">
            <img src={attendClass} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
                <h1>Mark your attendance</h1>

            <div className="spacer-vertical"></div>

            <div className="input-wrapper">
                <span className="input-label">Class ID</span>
                <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" />
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
    </div>
      )
  }
}

export default StudentClassAtt;


