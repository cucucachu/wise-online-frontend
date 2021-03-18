import React, { useState, useEffect, Fragment }　from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import AdminNewTermCard from './adminNewTermCard'

const AdminViewCourses = (props) => {
    
    return(
        <div className="container">
            <img src={viewIcon} className="page-icon" alt="view icon"/>
            <div className="spacer-vertical" />
            <h1>View courses by professor</h1>
            <div className="spacer-vertical" />
            
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
                {
                    (() => {
                    if (props.lastRow) {
                        return (
                            <AdminNewTermCard
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
            
        </div>
    )
}

export default AdminViewCourses