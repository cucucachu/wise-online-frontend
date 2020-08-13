import React, { useState, useEffect, Fragment }　from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import moment from 'moment'
// import CourseCard from './adminTermCard';

const AdminViewCourses = (props) => {

    const colNum = 2
    let content = ''
    const [isLoaded, setIsloaded] = useState(false)
    const courses = props.location.state.courses
    const [contentStr, setContentStr] = useState('')

   
    
    return(
        <div className="container">
            <img src={viewIcon} className="page-icon" alt="view icon"/>
            <div className="spacer-vertical"></div>
            <h1>View courses by professor</h1>
            <div className="spacer-vertical"></div> 
            
            <div className="row">
                {
                    (() => {
                        const termCards = [];
                        for (const term of props.location.state.terms) {
                            //props.courses be in course
                            const component = <TermsCard 
                                course={course} 
                                handleSubmit={props.handleSubmitEditCourse}
                                key={course._id}
                            />
                            courseCards.push(component);
                        }
                        return courseCards;
                    })()
                }
            </div>
            
        </div>
    )
}

export default AdminViewCourses