import React　from 'react'
import { Link } from 'react-router-dom'
import educationIcon from '../Assets/images/wise-education.png'
import { i18n } from 'web-translate';

const StudentFeeWaive = () => {
    return ( 
        <React.Fragment>
            <div className="container">
                <img src={educationIcon} className="page-icon" alt="wise education icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Register for a fee-waiver")}</h1>
                <div className="spacer-vertical" />
                <div className="width-slim">
                   <p className="text-plain">
                   {i18n("If you are a student with financial need, please complete this fee-waiver form to register you free waiver for the Wise Education student fee.")}
                   </p>
                </div>
                <div className="spacer-vertical" />
                <Link to="fee-waiver-select-school">
                    <button className="btn">{i18n("Begin Registration")}</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentFeeWaive;