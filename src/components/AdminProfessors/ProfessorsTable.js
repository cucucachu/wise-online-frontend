import React from 'react';

import ProfessorRow from './ProfessorRow';

function ProfessorsTable(props) {

    if (props.professors) {
        return (
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Professor</th>
                        <th>Email</th>
                        <th>Setup Key</th>
                        <th>Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (() => {
    
                            const rows = [];
    
                            for (const professorIndex in props.professors) {
                                const professor = props.professors[professorIndex];
                                rows.push(<ProfessorRow
                                    professor={professor}
                                    onClickViewCourses={props.onClickViewCourses}
                                    key={`professor-row-${professorIndex}`}
                                />);
                            }
    
                            return rows;
                        })()
                    }
                </tbody>
            </table>
        );
    }

    return <div></div>
}

export default ProfessorsTable;