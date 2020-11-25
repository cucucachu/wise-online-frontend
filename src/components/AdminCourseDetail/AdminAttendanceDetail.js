import React from 'react';

import DataPane from '../Resusable/DataPane';

function studentRows(props) {
    const rows = [];
    const studentsInOrder = props.course.students.sort((a, b) => a.lastName.localeCompare(b.lastName));

    for (const student of studentsInOrder) {
        const attended = props.attendance.students.includes(student._id);

        rows.push(
            <tr key={student._id}>
                <td>{student.firstName} {student.lastName}</td>
                <td>{attended ? 'X' : ''}</td>
            </tr>
        );
    }

    return rows;
}

function AdminAttendanceDetail(props) {
    const date = (new Date(props.attendance.startTime)).toLocaleDateString();
    const datetime = (new Date(props.attendance.startTime)).toLocaleString();

    return (
        <div className="container">
            <div className='x-button'>
                <button onClick={props.onClickBack}><div>&#128473;</div></button>
            </div>
            <h1>Attendance for {props.course.name}, {date}</h1>
            <DataPane 
                title="Attendance Summary"
                data={{
                    'Course': props.course.name,
                    'Date': datetime,
                    'Code': props.attendance.keyCode, 
                    'Students Present': props.attendance.students.length,
                    'Students Absent': props.course.students.length - props.attendance.students.length,
                }}
            />
            <div className="shadow full-width">
                <h2>Attendance</h2>
                <hr/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        { studentRows(props) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminAttendanceDetail;