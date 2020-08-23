import React from 'react';

function AttendanceStudentRowView(props) {
    return (
        <tr>
            <td>{`${props.student.firstName} ${props.student.lastName}`}</td>
            <td>{props.student.attended ? 'X' : '' }</td>
        </tr>
    );
}

export default AttendanceStudentRowView;