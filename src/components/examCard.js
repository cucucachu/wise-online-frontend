import React, { Component } from 'react';
import {
    Link,
   } from "react-router-dom"

import viewIcon from '../Assets/images/eye-icon-white.svg'
import Moment from 'react-moment'
import moment from 'moment'
import { downloadDataForCourseURL } from '../store/axios';

class ExamCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classId: props.exam,
            name: props.exam,
            editing: false,
            formattedDate: ''
        }

        // // this.handleClickEdit = this.handleClickEdit.bind(this);
        // this.handleChangeId = this.handleChangeId.bind(this);
        // this.handleChangeName = this.handleChangeName.bind(this);
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    // handleChangeId(e) {
    //     const state = Object.assign({}, this.state);
    //     state.classId = e.target.value;
    //     this.setState(state);
    // }

    // handleChangeName(e) {
    //     const state = Object.assign({}, this.state);
    //     state.name = e.target.value;
    //     this.setState(state);
    // }

    componentDidMount(){
        this.setState({formattedDate: moment.utc(this.props.examDate).format('MMM DD, YYYY')})
    }

    render() {
        const formattedDate = moment.utc(this.props.examDate).format('MMM DD, YYYY')

        return (
            <div className="col-12 col-md-4">
                <div className="shadow">
                        
                            <h3 className="course-title">{formattedDate} </h3>
                        
                            <Link to={{
                                pathname: `/professor/view-report/${this.props.examId}`,
                                state: {
                                    // examId: this.props.examId,
                                    examDate: formattedDate,
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