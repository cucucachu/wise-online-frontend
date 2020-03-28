import React from 'react'
import { Link } from 'react-router-dom'
import editIcon from '../Assets/images/edit-icon.png'

const StudentRecError = () => {
    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>Recording error</h1>
                <div className="spacer-vertical"></div>
                <div className="width-adjust-1">
                    <h2>How to allow camera parmissions</h2>
                    <p className="text-plain">Wise uses confidential facial recognition to make sure you are really you.</p>
                    <div className="spacer-vertical-s"></div>
                    <p className="text-black" style={{fontWeight: 'bold', fontSize: 'large'}}>How to activate by browser</p>
                    <div className="text-plain">
                        Chrome: <br/>
                        Firefox:<br/>
                        Safar:<br/>
                        Microsoft Edge:<br/>
                        Opera:<br/><br/>
                        Email suppport: support@wiseattend.com<br/><br />
                  
                        <p className="text-black" style={{fontWeight: 'bold', fontSize: 'large'}}>Refresh the page when ready</p>
                    </div>
      
                </div>
                <div className="spacer-vertical"></div>
                <Link to="/student/test/record">
                    <button className="btn">Refresh page</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentRecError;