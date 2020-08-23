import React from 'react';

function AttendanceStudentRowEdit(props) {
    return (
        <tr>
            <td>{`${props.student.firstName} ${props.student.lastName}`}</td>
            <td>
                <input 
                    type="checkbox"
                    checked={props.student.attended}
                    onChange={() => props.onClickPresent(props.student.id)}
                ></input>
            </td>
        </tr>
    );
}

export default AttendanceStudentRowEdit;