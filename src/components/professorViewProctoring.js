import React, { Component, Fragment } from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import ExamCardRow from './examCardRow'

//axios
import { getTestsByCourse } from '../store/axios'
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
            selectedCourse: ''
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
        
        
        state = Object.assign({}, this.state);
        const manualData = [
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            },
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            },
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            },
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            },
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            },
            {
            date: "2020-05-16T16:28:48.630Z",
            id: "5ec014c0a514313bc0167d02"
            }
        ]
        state.exams = exams;
        // state.exams = manualData

        this.setState(state);
        const { course } = this.props.location.state
        console.log('name: ', course);
        
        this.setState({selectedCourse: course.name})
    }
    // componentDidMount(){
        
    //     console.log('location: ', this.props.match.params.courseId)
    // }
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
                        selectedCourse={this.state.selectedCourse}
                        inputStype={this.state.inputStype}
                        key={`CoursesRowLast`} 
                        // lastRow={true}
                        // handleSubmitNewCourse={this.handleSubmitNewCourse}
                        handleChangeID={this.handleChangeID}
                        handleChangeName={this.handleChangeName}
                        // handleSubmitEditCourse={this.handleSubmitEditCourse}
                    />
                </div>
            </Fragment>
        )

    }
}

export default ViewProctoring;