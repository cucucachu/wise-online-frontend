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
            exams: []
        }
    }

    async componentDidMount() {
        const { examDate } = this.props.location.state;
        const { exam } = this.props.location.state;
        this.setState({exams: exam.results});
        
        this.setState({examDate: examDate});
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.examDate}</h1>
                    <div className="shadow">
         
                    <ul>{
                        this.state.exams.map((result,i) => 
                        <li 
                            className="underbar" 
                            key={i}
                        >
                            {result.student} 
                            {
                                (result.confidenceScore <= 0.4 && result.confidenceScore) !== 0 || result.screenshotViolations.length > 0 ? <Link to={{
                                    pathname: `/professor/view-detail`,
                                    state: {
                                        testResult: result,
                                    }
                                }
                            }
                        >
                            <img className="red-flag" src={redFlag} alt="red flag icon"/><span className="red-text">Red Flags Detected</span>
                            <img src={chevronRight} alt="chevron right icon" />

                        </Link> 
                        : 
                        <Link 
                            to={{
                            pathname: `/professor/view-detail`,
                            state: {
                                testResult: result,
                            }
                        }}>
                        
                        <img src={chevronRight} alt="chevron right icon" />

                        </Link>
                        }
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