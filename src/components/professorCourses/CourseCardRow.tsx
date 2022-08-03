import * as React from 'react';
import { Course } from '../../types';
import CourseCard from './CourseCard';
import NewCourseCard from './newCourseCard';

type CourseCardRowProps = {
    courses: Course[];
    handleDeleteCourse: any;
    lastRow: boolean;
};

function CourseCardRow (props: CourseCardRowProps) {
    return (
        <div className="row">
            { props.courses.map(course => 
                <CourseCard 
                    course={course} 
                    handleDelete={props.handleDeleteCourse}
                    key={course._id}
                />
            )}
            {props.lastRow && <NewCourseCard />}
        </div>
    );
}

export default CourseCardRow;