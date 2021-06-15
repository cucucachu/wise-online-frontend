import React from 'react'
import { Link } from 'react-router-dom'
import educationIcon from '../Assets/images/wise-education.png'

import { i18n } from 'web-translate';

const StudentFeeWaiveNote = (props) => {


    return ( 
        <React.Fragment>
            <div className="container">
                <img src={educationIcon} className="page-icon" alt="wise education icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Input your information")}</h1>
                <div className="spacer-vertical" />
                <div className="width-slim">
                   <p className="text-plain">
                   {i18n("Please enter the correct information associated with your school to ensure that your free-waiver is successful.")}
                   </p>
                </div>
                <div className="spacer-vertical" />
                <Link to="fee-waiver-form">
                    <button className="btn">{i18n("Next")}</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentFeeWaiveNote;