import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../Assets/images/edit-icon.png';
import { i18n } from 'web-translate';

const StudentRecError = (props) => {
    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Recording error")}</h1>
                <div className="spacer-vertical" />
                <div className="width-adjust-1">
                    <h2>{i18n("How to allow camera permissions")}</h2>
                    <p className="text-plain">{i18n("Wise uses confidential facial recognition to make sure you are really you.")}</p>
                    <div className="spacer-vertical-s"></div>
                    <p className="text-black" style={{fontWeight: 'bold', fontSize: 'large'}}>{i18n("How to activate by browser")}</p>
                    <div className="text-plain">
                        {i18n("Chrome")}: <br/>
                        {i18n("Firefox")}:<br/>
                        {i18n("Safar")}:<br/>
                        {i18n("Microsoft Edge")}:<br/>
                        {i18n("Opera")}:<br/><br/>
                        {i18n("Email suppport: support@wiseattend.com")}<br/><br />
                  
                        <p className="text-black" style={{fontWeight: 'bold', fontSize: 'large'}}>{i18n("Refresh the page when ready")}</p>
                    </div>
      
                </div>
                <div className="spacer-vertical" />
                <Link to="/student/test/record">
                    <button className="btn">{i18n("Refresh page")}</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentRecError;
