import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
   } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'

//axios
import { startAttendance } from '../store/axios'

import { AuthContext } from '../contexts/AuthContext'


class ProfessorAttendance extends Component {
    static contextType = AuthContext
    state={
        attendanceCode: null,
        courseName: '',
        courseID: '',

    }
    handleChangeName = e =>{
        this.setState({courseName: e.target.value})
    }
    handleChangeID = e =>{
        this.setState({courseID: e.target.value})
    }
    handleSubmit = e =>{
        e.preventDefault()
        // const newCourse = createCourse(this.state.courseID, this.state.courseName)
    }
    // takeAttendance = () =>{
    //     const { professorID, schoolID } = this.context
  
        
    // }
  render(){
    const { attendanceCode } = this.context
      return(
        <Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>ECON 101 Take Attendance</h1>
                <div className="spacer-vertical"></div>
                
                <div className='jumbo-text text-plain'>
                    {this.state.attendanceCode}
                </div>

                <div className="spacer-vertical-s"></div>
                <p className="text-plain xlarge-text width-50">
                {attendanceCode}
                </p>
                <div className="spacer-vertical"></div>
                <Link to="/professor/course">
                    <button className="btn">Exit</button>
                </Link>
            </div>
        </Fragment>
      )
  }
}

export default ProfessorAttendance;