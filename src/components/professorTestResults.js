import React, { Component, Fragment} from 'react';
import viewIcon from '../Assets/images/view-icon.png';
import redFlag from '../Assets/images/red-flag.png';
import { Link } from 'react-router-dom';
import chevronRight from '../Assets/images/chevron_right.svg';

class ViewTestResults extends Component{
    constructor(props){
        super(props)
        this.state = {
            examDate: '',
            testResults: [],
            studentList: [],
            exam: {
                results: [],
                proctorConfiguration: {
                    facialRecognitionThreshold: 0,
                },
            },
        }
    }

    async componentDidMount() {
        this.setState({
            ...this.state,
            ...this.props.location.state,
        });
    }


    render() {
        return (
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.examDate}</h1>
                    <div className="shadow">
         
                    <ul>
                        {
                            this.state.exam.results.map((result,i) => 
                                <li 
                                    className="underbar" 
                                    key={i}
                                >
                            {result.student} 
                            <Link 
                                to={{
                                    pathname: `/professor/view-detail`,
                                    state: {
                                        testResult: result,
                                        proctorConfiguration: this.state.exam.proctorConfiguration,
                                    }
                            }}>
                                {(() => {
                                    const lowConfidenceScore = result.confidenceScore <= this.state.exam.proctorConfiguration.facialRecognitionThreshold;
                                    const screenshotViolations = Array.isArray(result.screenshotViolations) && result.screenshotViolations.length > 0;
                                    const multiplePeople = result.numberOfPeople && Array.isArray(result.numberOfPeople) && result.numberOfPeople.filter(n => n > 1).length;

                                    if (lowConfidenceScore || screenshotViolations || multiplePeople) {
                                        return (
                                            <span>
                                                <img className="red-flag" src={redFlag} alt="red flag icon"/>
                                                <span className="red-text">Red Flags Detected</span>
                                            </span>
                                        );
                                    }
                                    else {
                                        return '';
                                    }
                                })()}
                                <img src={chevronRight} alt="chevron right icon" />
                            </Link> 
                        </li>
                        )
                    }</ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ViewTestResults