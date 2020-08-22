import React　from 'react';
import { Link } from 'react-router-dom'

import attendanceIcon from '../Assets/images/attendance-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'


const AdminDownload = (props) => {

    return ( 
        <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>Attendance Data</h1>
                <div className="spacer-vertical"></div>

                <div className="spacer-vertical-s"></div>

                <Link to="terms">
                       
                    <button className="btn-l">
                    <img src={downloadIcon} className="icon-xs" alt="download icon" />
                    Download terms
                    </button>
                </Link>
                
                <div className="spacer-vertical-s"></div>
                <Link to="/set-up-school">
                    <button className="btn-l">Set up your school</button>
                </Link>
        </div>
    );
  }
   
  export default AdminDownload;
