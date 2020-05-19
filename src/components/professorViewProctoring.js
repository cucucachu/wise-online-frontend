import React, { Component, Fragment } from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import ExamCardRow from './examCardRow'

//axios
import { getTestsByCourse, getTestResults } from '../store/axios'
// import { AuthContext } from '../contexts/AuthContext'

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
        }

    }


    async loadProctoring() {
        const professor = {id: sessionStorage.getItem('userID'), courses: sessionStorage.getItem('courses')}
        // const data = {courseId: this.props.match.params.courseId}
        
        let state = Object.assign({}, this.state);
        state.exams = [];
        this.setState(state);

        const response = await getTestsByCourse(professor, this.props.match.params.courseId);
        
        const exams = response.data
        console.log('exams: ', exams);
        for(const exam of exams){
             
             const responseResult = await getTestResults(professor, exam.id)
             console.log('responseResult data: ', responseResult.data.proctoringResults);
             const resultsArr = responseResult.data.proctoringResults
             
             this.state.examData.push({id: exam.id, date: exam.date, results: resultsArr})
        }
        
        console.log('examdata: ', this.state.examData);
        state = Object.assign({}, this.state);
        state.exams = exams;
        // state.exams = manualData

        this.setState(state);
        const { course } = this.props.location.state
        console.log('name: ', course);
        
        this.setState({selectedCourse: course.name})
    }

    async componentDidMount() {
        
        await this.loadProctoring();


    }
    render() {
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.selectedCourse}&nbsp; Proctoring</h1>
             
                    <ExamCardRow 
                        exams={this.state.exams}
                        examData={this.state.examData}
                        selectedCourse={this.state.selectedCourse}
                        inputStype={this.state.inputStype}
                        key={`CoursesRowLast`} 
                    />
                </div>
            </Fragment>
        )

    }
}

export default ViewProctoring;