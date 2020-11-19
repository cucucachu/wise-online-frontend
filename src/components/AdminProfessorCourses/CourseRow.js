import React from 'react';

function CourseRow(props) {
    return (
        <tr>
            <td>
                <button 
                    className="btn-link"
                    onClick={() => props.onClickViewCourse(props.course)}
                >
                    {props.course.name}
                </button>
            </td>
            <td>{props.course.classId}</td>
            <td>{props.course.students.length}</td>
            <td>{props.course.attendances.length}</td>
            <td>{props.course.tests.length}</td>
        </tr>
    );
}

export default CourseRow;