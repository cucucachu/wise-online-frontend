import React, { Component, Fragment } from 'react'
import { 
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
    // Redirect
   } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'

//axios
import { createCourse } from '../store/axios'
//passing classId, students
import { getCourses } from '../store/axios'
// school, professor

import { AuthContext } from '../contexts/AuthContext'


class ProfessorCourse extends Component {
    static contextType = AuthContext
    state={
        inputStype: {
            borderRadius: '0.5rem',
            width: '100%',
            marginBottom: '5px',
        },
        courseName: [],
        courseIds: [],
        students: []
    }
    handleChangeName = e =>{
        this.setState({courseName: e.target.value})
    }
    handleChangeID = e =>{
        this.setState({courseID: e.target.value})
    }
    handleSubmit = async e =>{
        e.preventDefault()
        const newCourse = await createCourse(this.state.courseID, this.state.courseName)
    }
    async componentDidMount(){
        
        
        const { userID, schoolID } = this.context
        const response = await getCourses(schoolID, userID)
        
        const allCourses = response.data
        console.log('allCources.classId: ', allCourses);
        this.setState({courseIds: [...this.state.courseIds, ...allCourses]})
        // this.setState({
        //     cars: [ ...this.state.cars, ...carArray ]
        //   })
        // 0:
        // classId: "Course4"
        // professor: "5e77e47c7da0ce08306da1c2"
        // students: Array(10)
        // 0: "5e77e47f7da0ce08306da1f3"
        // 1: "5e77e47f7da0ce08306da1f4"
        // 2: "5e77e47f7da0ce08306da1f5"
        // 3: "5e77e47f7da0ce08306da1f6"
        // 4: "5e77e47f7da0ce08306da1f7"
        // 5: "5e77e47f7da0ce08306da1f8"
        // 6: "5e77e47f7da0ce08306da1f9"
        // 7: "5e77e47f7da0ce08306da1fa"
        // 8: "5e77e47f7da0ce08306da1fb"
        // 9: "5e77e47f7da0ce08306da1fc"
        // length: 10
        // __proto__: Array(0)
        // _id: "5e77e47d7da0ce08306da1cd"
        // __proto__: Object

// classId: "ECON 101 SCC"
// professor: "5e7802fee18a2035a451d661"
// students: (11) ["5e7802fee18a2035a451d664", "5e7802ffe18a2035a451d672", "5e7802ffe18a2035a451d673", "5e7802ffe18a2035a451d674", "5e7802ffe18a2035a451d675", "5e7802ffe18a2035a451d676", "5e7802ffe18a2035a451d677", "5e7802ffe18a2035a451d678", "5e7802ffe18a2035a451d679", "5e7802ffe18a2035a451d67a", "5e7802ffe18a2035a451d67b"]
// attendances: ["5e7802fee18a2035a451d665"]
// tests: ["5e7802fee18a2035a451d666"]
// _id: "5e7802fee18a2035a451d662"
// __proto__: Object
    }

  render(){

      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                <h1>My Courses</h1>
                {this.state.courseIds.map((id, index) => (
                                    <p>Course name: {id.classId} </p>
                                ))}
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
                                    <Link to="/professor/attendance">
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />Take attendance</button>
                                    </Link>

                                    <Link to="">
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                                    </Link>

                                    <Link to="">
                                    <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data</button>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>                        
                    </div>
                    <div className="col-sm-6">
                        <div className="shadow" >
                            <div className="row">
                                <div className="col-sm-6">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <input type="text" placeholder="Enter class name" style={this.state.inputStype} onChange={this.handleChangeName.bind(this)}/>
                                        <input type="text" placeholder="Enter class ID" style={this.state.inputStype} onChange={this.handleChangeID.bind(this)}/>
                                        <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Create"/>
                                    </form>
                                </div>
                                <div className="col-sm-6 text-plain-s">
                                    Create a new class name,<br/>
                                    e.g. ECON 101<br/>
                                    <br/>
                                    Create a unique class ID<br/>
                                    e.g. ECON101SP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </Fragment>
      )
  }
}

export default ProfessorCourse;