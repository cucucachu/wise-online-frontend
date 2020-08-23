import React from 'react';
import { Link } from 'react-router-dom';

import tickIcon from '../../Assets/images/tick-icon-white.svg'

function AttendancesSummary(props) {

    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="shadow">
                    <h3>Summary</h3>
                    <br></br>
                    <p><strong>Class Name</strong>: {props.course.name}</p>
                    <p><strong>Class ID</strong>: {props.course.classId}</p>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="shadow" style={{textAlign: 'center'}}>
                    <h3>Actions</h3>
                    <br/>
                        
                    <Link to={{
                                pathname: '/professor/attendance/start',
                                state: {
                                    course: props.course,
                                }
                            }}>
                                <button className="btn-primary"><img src={tickIcon} className="icon-xs" alt="tick icon"/>Take attendance</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default AttendancesSummary;