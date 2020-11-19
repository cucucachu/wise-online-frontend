import React from 'react';

function AttendanceRow(props) {

    return (
        <tr>
            <td>{new Date(props.attendance.startTime).toLocaleString()}</td>
            <td>{props.attendance.keyCode}</td>
            <td>{props.attendance.students.length}</td>
            <td>{props.course.students.length - props.attendance.students.length}</td>
            <td>           
                <button className="btn-primary" onClick={() => props.onClickView(props.attendance)}>View</button>                 
            </td>
        </tr>
    );
}

export default AttendanceRow;