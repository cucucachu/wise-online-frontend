import React　from 'react';
import { Link } from 'react-router-dom'

import attendanceIcon from '../Assets/images/attendance-icon.png';


const AdminHomePage = (props) => {

    return ( 
        <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>{sessionStorage.getItem('schoolName')}</h1>
                <div className="spacer-vertical"></div>

                <div className="spacer-vertical-s"></div>

                <Link to="/admin-terms">
                       
                    <button className="btn-l">
                    Academic Terms
                    </button>
                </Link>
                
                <div className="spacer-vertical-s"></div>
                <Link to="/set-up-school">
                    <button className="btn-l">Add Students and Professors</button>
                </Link>
                
                <div className="spacer-vertical-s"></div>
                <Link to="admin/professors">
                    <button className="btn-l">View Professors</button>
                </Link>
        </div>
    );
  }
   
  export default AdminHomePage;
