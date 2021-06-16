import React, { Component } from 'react';
import {
    Link,
   } from "react-router-dom"

import viewIcon from '../Assets/images/eye-icon-white.svg'
import moment from 'moment'
import redFlag from '../Assets/images/red-flag.png'

import { i18n } from 'web-translate';

class ExamCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classId: props.exam,
            name: props.exam,
            editing: false,
            formattedDate: '',
            isRedTab: 0,
            multiplePeople: false,
        }
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    componentDidMount(){
        let multiplePeople = false;

        if (this.props.exam.results && Array.isArray(this.props.exam.results)) {
            for (const result of this.props.exam.results) {
                if (Array.isArray(result.numberOfPeople)) {
                    if (result.numberOfPeople.filter(n => n > 1).length) {
                        multiplePeople = true;
                        break;
                    }
                }
            }
        }

        this.setState({
            formattedDate: moment.utc(this.props.examDate).format('MMM DD, YYYY'), 
            isRedTab: this.props.isRedTab,
            multiplePeople,
        });
    }

    render() {
        const formattedDate = moment.utc(this.props.examDate).format('MMM DD, YYYY');

        return (
            <div className="col-12 col-md-4">
                <div className="shadow">
                        
                            <h3 className="course-title">{formattedDate} {this.props.isRedFlag.length >= 1 || this.props.isRedTab > 0 || this.state.multiplePeople ? <img className="red-flag" src={redFlag} alt="red flag icon"/> : ' '}</h3>
                        
                            <Link to={{
                                pathname: `/professor/view-report/${this.props.examId}`,
                                state: {
                                    // examId: this.props.examId,
                                    examDate: formattedDate,
                                    exam: this.props.exam
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={viewIcon} className="icon-xs" alt="tick icon" />{i18n("View Reports")} &amp; {i18n("Videos")}</button>
                            </Link>
                </div>
            </div>
        )
    }
}

export default ExamCard;