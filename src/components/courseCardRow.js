import React from 'react';

import CourseCard from './courseCard';
import NewCourseCard from './newCourseCard';

function CourseCardRow (props) {
    return (
        <div className="row">
            {
                (() => {
                    const courseCards = [];
                    for (const course of props.courses) {
                        //props.courses be in course
                        const component = <CourseCard 
                            course={course} 
                            handleSubmit={props.handleSubmitEditCourse}
                            handleDelete={props.handleDeleteCourse}
                            key={course._id}
                        />
                        courseCards.push(component);
                    }
                    return courseCards;
                })()
            }
            {
                (() => {
                    if (props.lastRow) {
                        return (
                            <NewCourseCard
                                inputStype={props.inputStype}
                                handleChangeID={props.handleChangeID}
                                handleChangeName={props.handleChangeName}
                                handleSubmit={props.handleSubmitNewCourse}
                            />
                        )
                    }
                })()
            }
        </div>
    );
}

export default CourseCardRow;