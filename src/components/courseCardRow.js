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
                        const component = <CourseCard course={course} key={course._id}/>
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
                                handleSubmit={props.handleSubmit}
                            />
                        )
                    }
                })()
            }
        </div>
    );
}

export default CourseCardRow;