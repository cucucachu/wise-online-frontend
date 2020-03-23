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
import CourseCardRow from './courseCardRow';

//axios
import { createCourse, getCourses } from '../store/axios'

import { AuthContext } from '../contexts/AuthContext'


class ProfessorCourse extends Component {
    static contextType = AuthContext
    state={
        inputStype: {
            borderRadius: '0.5rem',
            width: '100%',
            marginBottom: '5px',
        },
        courses: [],
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
        const { userID, schoolID } = this.context;
        const response = await getCourses(schoolID, '5e780300e18a2035a451d692');
        
        const allCourses = response.data
        console.log('allCources.classId: ', allCourses);
        const state = Object.assign({}, this.state);
        state.courses = allCourses;

        this.setState(state);
    }

  render(){

      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                <h1>My Courses</h1>
                {
                    (() => {
                        const rows = [];

                        for (let index = 0; index < this.state.courses.length; index++) {
                            if (index % 2){
                                continue;
                            }

                            const course = this.state.courses[index];
                            const coursesForRow = [course];

                            if (index + 1 < this.state.courses.length) {
                                coursesForRow.push(this.state.courses[index + 1]);
                            }

                            rows.push(
                                <CourseCardRow 
                                    courses={coursesForRow}
                                    inputStype={this.state.inputStype}
                                    key={`CoursesRow${index}`} 
                                    lastRow={index >= this.state.courses.length - 1}
                                    handleSubmit={this.handleSubmit.bind(this)}
                                    handleSubmit={this.handleChangeID.bind(this)}
                                    handleSubmit={this.handleChangeName.bind(this)}
                                />
                            );
                        }

                        if (this.state.courses.length % 2 === 0) {

                            rows.push(
                                <CourseCardRow 
                                    courses={[]}
                                    inputStype={this.state.inputStype}
                                    key={`CoursesRowLast`} 
                                    lastRow={true}
                                    handleSubmit={this.handleSubmit.bind(this)}
                                    handleSubmit={this.handleChangeID.bind(this)}
                                    handleSubmit={this.handleChangeName.bind(this)}
                                />
                            );

                        }

                        return rows;
                    })()
                }
            
            </div>
        </Fragment>
      )
  }
}

export default ProfessorCourse;