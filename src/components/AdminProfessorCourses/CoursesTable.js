import React from 'react';

import CourseRow from './CourseRow';

function CoursesTable(props) {

    if (props.courses) {
        return (
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Class Id</th>
                        <th>Students</th>
                        <th>Attendances</th>
                        <th>Tests</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (() => {
    
                            const rows = [];
    
                            for (const courseIndex in props.courses) {
                                const course = props.courses[courseIndex];
                                rows.push(<CourseRow
                                    course={course}
                                    onClickViewCourse={props.onClickViewCourse}
                                    key={`course-row-${courseIndex}`}
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

export default CoursesTable;