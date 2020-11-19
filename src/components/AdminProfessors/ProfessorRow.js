import React from 'react';

function ProfessorRow(props) {
    return (
        <tr>
            <td>{`${props.professor.firstName} ${props.professor.lastName}`}</td>
            <td>{props.professor.setupKey}</td>
            <td>
                <button 
                    className="btn-link"
                    onClick={() => props.onClickViewCourses(props.professor)}
                >
                    {props.professor.courses.length}
                </button>
            </td>
        </tr>
    );
}

export default ProfessorRow;