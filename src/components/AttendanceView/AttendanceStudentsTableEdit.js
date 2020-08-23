import React from 'react';

import AttendanceStudentRowEdit from './AttendanceStudentRowEdit';

function AttendanceStudentsTableEdit(props) {

    if (props.attendance && props.attendance.students) {

        return (
            <div className="shadow">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
        
                                const rows = [];

                                const students = props.attendance.students.map(s => s);

                                students.sort((a, b) => a.firstName.localeCompare(b.firstName));
        
                                for (const student of students) {
                                    rows.push(<AttendanceStudentRowEdit
                                        course={props.course}
                                        attendance={props.attendance}
                                        student={student}
                                        onClickPresent={props.onClickPresent}
                                        key={student.id}
                                    />);
                                }
        
                                return rows;
                            })()
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    return <div></div>
}

export default AttendanceStudentsTableEdit;