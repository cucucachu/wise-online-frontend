import React from 'react';
import {
    Link,
   } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'
import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'

function CourseCard (props) {

    return (
        <div className="col-sm-6">
            <div className="shadow">
                <div className="row ">
                    <h2 className="course-title">{props.course.classId}</h2>
                    <div className="col-sm-6">
                        <ul className="text-plain custom-list">
                            <li>{props.course.attendances ? props.course.attendances.length : 0} classes recorded</li>
                            <li>{props.course.tests ? props.course.tests.length : 0} test recorded</li>
                        </ul>
                        <button>Settings</button>
                    </div>
                    
                    <div className="col-sm-6">
                        <Link to="/professor/attendance">
                        <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />Take attendance</button>
                        </Link>

                        <Link to="">
                        <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                        </Link>

                        <Link to="">
                        <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CourseCard;