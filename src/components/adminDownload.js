import React, { useContext, useEffect } from 'react';

import attendanceIcon from '../Assets/images/attendance-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'
import { AuthContext } from '../contexts/AuthContext'

const AdminDownload = () => {
    const { cookies } = useContext(AuthContext)

    useEffect(() => {
            
            if(cookies === undefined){
                this.props.history.push('/admin-login')
            }else{return}
        }, [cookies])
    return ( 
        <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>Attendance Data</h1>
                <div className="spacer-vertical"></div>
                <button className="btn-l"><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by course</button>
                <div className="spacer-vertical"></div>
                <button className="btn-l"><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by professor</button>
                <div className="spacer-vertical"></div>
                <button className="btn-l"><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by student</button>
        </div>
  );
  }
   
  export default AdminDownload;
