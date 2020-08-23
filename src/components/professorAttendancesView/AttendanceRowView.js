import React from 'react';
import { Link } from 'react-router-dom';

function AttendanceRowView(props) {

    return (
        <tr>
            <td>{new Date(props.attendance.startTime).toLocaleString()}</td>
            <td>{props.attendance.keyCode}</td>
            <td>{props.attendance.studentsPresent}</td>
            <td>{props.attendance.studentsAbsent}</td>
            <td>                            
                <Link to={{
                                pathname: '/professor/attendanceView',
                                state: {
                                    course: props.course,
                                    attendance: props.attendance
                                }
                            }}>
                    <button className="btn-primary">View</button>
                </Link>
            </td>
        </tr>
    );
}

export default AttendanceRowView;