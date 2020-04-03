import React, { useContext, useEffect } from 'react';

import attendanceIcon from '../Assets/images/attendance-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'
import { AuthContext } from '../contexts/AuthContext'

import { adminDownloadDataByCourseURL, adminDownloadDataByProfessorURL, adminDownloadDataByStudentURL } from '../store/axios';

function downloadDataByCourse() {
    window.location = adminDownloadDataByCourseURL();
}

function downloadDataByProfessor() {
    window.location = adminDownloadDataByProfessorURL();
}

function downloadDataByStudent() {
    window.location = adminDownloadDataByStudentURL();
}

const AdminDownload = (props) => {
    const { cookies } = useContext(AuthContext)

    const checkCookie = ()=>{
        if(cookies === undefined){
            props.history.push('/student-login')
        }else{return}
    }
    useEffect(() => {
        const interval = setInterval(() => {
            checkCookie()
        }, 300000);
        return () => clearInterval(interval)
    })
    return ( 
        <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>Attendance Data</h1>
                <div className="spacer-vertical"></div>
                <button className="btn-l" onClick={downloadDataByCourse}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by course</button>
                <div className="spacer-vertical"></div>
                <button className="btn-l" onClick={downloadDataByProfessor}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by professor</button>
                <div className="spacer-vertical"></div>
                <button className="btn-l" onClick={downloadDataByStudent}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data by student</button>
        </div>
  );
  }
   
  export default AdminDownload;
