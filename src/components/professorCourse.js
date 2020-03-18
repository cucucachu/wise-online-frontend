import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
   } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'

class ProfessorCourse extends Component {
  render(){

      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                <h1>My Courses</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="shadow">
                            <div className="row ">
                                <h2 className="course-title">ECON 101</h2>
                                <div className="col-sm-6">
                                    <ul className="text-plain custom-list">
                                        <li>2 classes recorded</li>
                                        <li>1 test recorded</li>
                                    </ul>
                                    <button>Settings</button>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />Take attendance</button>
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data</button>
                                </div>
                                
                            </div>
                        </div>                        
                    </div>
                    <div className="col-sm-6">
                        <div className="shadow" style={{textAlign: 'center'}}>
                            <h2 >Create Course</h2>
                        </div>
                    </div>
                </div>
            
            </div>
        </Fragment>
      )
  }
}

export default ProfessorCourse;