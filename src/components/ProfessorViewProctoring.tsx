import * as React from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import ExamCardRow from './examCardRow'

import { getTestsByCourse, getTestResults, logout } from '../store/axios'
import '../Assets/css/spinner.css'

import { i18n } from 'web-translate';
import { RouteComponentProps } from 'react-router-dom'
import { IAuthContext } from '../contexts/AuthContext'

type ViewProctoringRouteProps = RouteComponentProps<{ courseId: string }, any, any>;;

type ViewProctoringProps =  IAuthContext & ViewProctoringRouteProps;

class ViewProctoring extends React.Component<ViewProctoringProps, any> {
    
    constructor(props: ViewProctoringProps) {
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
        let state = Object.assign({}, this.state, { exams: [] });
        this.setState(state);

        const response = await getTestsByCourse({}, this.props.match.params.courseId);
        
        const exams = response.data;

        for (const exam of exams) {
            try {
                const responseResult = await getTestResults({}, exam.id)
                if (responseResult.status === 200) {
                    exam.results = responseResult.data.proctoringResults;
                    exam.proctorConfiguration = responseResult.data.proctorConfiguration;
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
    }

    async componentDidMount() {
        await this.loadProctoring();
        this.setState({isLoading: false})

    }
    render() {
        return(
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical" />
                <h1>{this.state.selectedCourse}&nbsp; {i18n("Proctoring")}</h1>

                {this.state.isLoading ?
                <div >
                    <div className="spacer-vertical" />
                    <h2>{i18n("Loading")}
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
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
        )

    }
}

export default ViewProctoring;
