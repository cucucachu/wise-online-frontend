import React, { Component, Fragment } from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import ExamCardRow from './examCardRow'

import { getTestsByCourse, getTestResults, logout } from '../store/axios'
import '../Assets/css/spinner.css'

class ViewProctoring extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputStype: {
                borderRadius: '0.5rem',
                width: '100%',
                marginBottom: '5px',
            },
            courseName: '',
            courseId: '',
            exams: [],
            selectedCourse: '',
            examData: [],
            isLoading: true,
        }

    }


    async loadProctoring() {
        // this.setState({isLoading: true})
        const professor = {id: sessionStorage.getItem('userID'), courses: sessionStorage.getItem('courses')}
        // const data = {courseId: this.props.match.params.courseId}
        
        let state = Object.assign({}, this.state);
        state.exams = [];
        this.setState(state);

        const response = await getTestsByCourse(professor, this.props.match.params.courseId);
        
        const exams = response.data;

        for (const exam of exams) {
            try {
                const responseResult = await getTestResults(professor, exam.id)
                if (responseResult.status === 200) {
                    // const resultsArr = responseResult.data.proctoringResults;
                    exam.results = responseResult.data.proctoringResults;
                    exam.proctorConfiguration = responseResult.data.proctorConfiguration;
                    // this.state.examData.push({id: exam.id, date: exam.date, results: resultsArr})
                }
                else if (response.status === 401) {
                    sessionStorage.clear();
                    logout()
                    this.props.history.push({
                        pathname: '/professor-login',
                        state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                      })
                }
                else {
                    console.log(responseResult.data.error)
                }
            }
            catch (error) {
                this.setState({
                    ...state,
                    isLoading: false
                });
                console.log('error happened: ', error);
            }
        }
        

        this.setState({
            ...this.state,
            exams,
            selectedCourse: this.props.location.state.course.name,
        });
        // state = Object.assign({}, this.state);
        // state.exams = exams;
        // // state.exams = manualData

        // this.setState(state);
        // const { course } = this.props.location.state
        
        // this.setState({selectedCourse: course.name})
    }

    async componentDidMount() {
        await this.loadProctoring();
        this.setState({isLoading: false})

    }
    render() {
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.selectedCourse}&nbsp; Proctoring</h1>

                    {this.state.isLoading ?
                    <div >
                        <div className="spacer-vertical"></div>
                        <h2>Loading
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </h2>
                    </div>
                     : 
                    <ExamCardRow 
                        exams={this.state.exams}
                        selectedCourse={this.state.selectedCourse}
                        inputStype={this.state.inputStype}
                        key={`CoursesRowLast`} 
                    /> }
                </div>
            </Fragment>
        )

    }
}

export default ViewProctoring;