import React from 'react';
import downloadIcon from '../../Assets/images/download-icon-white.svg';

import { 
    adminDownloadDataByCourseURL,
    adminDownloadDataByProfessorURL, 
    adminDownloadDataByStudentURL 
} from '../../store/axios';

function DownloadDataForTerm(props) {

    return (
        <div className="shadow">
            <div className="row">
                <div className="col-sm">
                    <h1 style={ { textAlign: 'center' } }>Attendance Data For {props.term.name}</h1>
                </div>
                <div className="col-sm-1">
                    <button 
                        className="btn-neutral no-width"
                        onClick={props.onClickCancelDownloadView}
                    >
                        &#128473;
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <div className="spacer-vertical"></div>
                    <a 
                        href={adminDownloadDataByCourseURL(props.term._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn-primary full-width">
                            <img src={downloadIcon} className="icon-xs" alt="download icon" />
                            Download Data by Course
                        </button>
                    </a>
                    <div className="spacer-vertical"></div>
                    <a 
                        href={adminDownloadDataByProfessorURL(props.term._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn-primary full-width">
                            <img src={downloadIcon} className="icon-xs" alt="download icon" />
                            Download Data by Professor
                        </button>
                    </a>
                    <div className="spacer-vertical"></div>
                    <a 
                        href={adminDownloadDataByStudentURL(props.term._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn-primary full-width">
                            <img src={downloadIcon} className="icon-xs" alt="download icon" />
                            Download Data by Student
                        </button>
                    </a>
                    <div className="spacer-vertical"></div>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}

export default DownloadDataForTerm;