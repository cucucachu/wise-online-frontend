import React, { Component } from 'react';
import {
    Link,
   } from "react-router-dom"

import viewIcon from '../Assets/images/eye-icon-white.svg'
import moment from 'moment'
import redFlag from '../Assets/images/red-flag.png'

class ExamCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classId: props.exam,
            name: props.exam,
            editing: false,
            formattedDate: '',
            isRedTab: 0
        }
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    componentDidMount(){
        this.setState({formattedDate: moment.utc(this.props.examDate).format('MMM DD, YYYY'), isRedTab: this.props.isRedTab})
    }

    render() {
        const formattedDate = moment.utc(this.props.examDate).format('MMM DD, YYYY');

        return (
            <div className="col-12 col-md-4">
                <div className="shadow">
                        
                            <h3 className="course-title">{formattedDate} {this.props.isRedFlag.length >= 1 || this.props.isRedTab > 0 ? <img className="red-flag" src={redFlag} alt="red flag icon"/> : ' '}</h3>
                        
                            <Link to={{
                                pathname: `/professor/view-report/${this.props.examId}`,
                                state: {
                                    // examId: this.props.examId,
                                    examDate: formattedDate,
                                    exam: this.props.exam
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={viewIcon} className="icon-xs" alt="tick icon" />View Reports &amp; Videos</button>
                            </Link>
                </div>
            </div>
        )
    }
}

export default ExamCard;