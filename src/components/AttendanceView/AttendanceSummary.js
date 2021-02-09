import React from 'react';


function AttendanceSummary(props) {
    return (
        <div className="row">
            <div className="col-sm">
                <div className="shadow">
                    <div className="row">
                        <div className="col-sm">
                            <h3>Summary</h3>
                            <br></br>
                            <p><strong>Class Name</strong>: {props.course.name}</p>
                            <p><strong>Class ID</strong>: {props.course.classId}</p>
                            <p><strong>Key Code ID</strong>: {props.attendance.keyCode}</p>
                            {(() => {
                                if (props.editing) {
                                    console.dir(props);

                                    return (
                                        <p><strong>Attendance Date</strong>:
                                        <input 
                                            type="datetime-local"
                                            value={props.attendance.startTime}
                                            onChange={props.onChangeStartTime}
                                        /></p>
                                    )
                                }
                                else {
                                    return <p><strong>Attendance Date</strong>: {new Date(props.attendance.startTime).toLocaleString()}</p>
                                }
                            })()}
                            <p><strong>Students Present</strong>: {props.attendance.studentsPresent}</p>
                            <p><strong>Students Absent</strong>: {props.attendance.studentsAbsent}</p>
                            <p><strong>Attendance Link for Students</strong>: {attendanceLink(props.course.classId, props.attendance.keyCode)}</p>
                        </div>
                        <div className="col-sm-2">
                            {(() => {
                                if (props.editing) {

                                    return (
                                        <div className='btn-bar'>
                                            <button className="btn-primary" onClick={props.onClickSave}>Save</button> 
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className='btn-bar'>
                                            <button className="btn-primary" onClick={props.onClickEdit}>Edit</button>
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
                {(() => {
                    const integrationName = sessionStorage.getItem('integrationName');

                    if (integrationName) {

                        let status = props.attendance.integrationState;

                        if (status === undefined) {
                            status = 'Awaiting Approval';
                        }
                        else if (status === 'READY') {
                            status = 'Approved';
                        }
                        else if (status === 'COMPLETED') {
                            status = 'Completed';
                        }

                        return (
                            <div className="col-sm">
                                <div className="shadow">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h3>{integrationName}</h3>
                                            <br></br>
                                            <p>
                                                <strong>{integrationName} Status: </strong>
                                                {status}
                                            </p>
                                            <p><strong>Course ID in {integrationName}</strong>: {props.course.integrationId ? props.course.integrationId : 'Not Set'}</p>
                                            {(() => {
                                                if (props.editing) {
                                                    return (
                                                        <div>
                                                            <strong>Course Scheduled Time: </strong>
                                                            <input 
                                                                type="datetime-local"
                                                                value={props.attendance.scheduledTime}
                                                                onChange={props.onChangeScheduledTime}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <p><strong>Course Scheduled Time</strong>: {props.attendance.scheduledTime ? new Date(props.attendance.scheduledTime).toLocaleString() : 'None'}</p>
                                                    )
                                                }
                                            })()}
                                            <strong>Integration Instructions:</strong>
                                            <p>Make sure that the Course has an ID for {integrationName} and that the scheduled time is set correctly before approving.</p>
                                            <p>Data can only be sent to {integrationName} once. Any corrections after data is sent will need to be made directly in {integrationName}.</p>
                                            <p>Once approved, attendance may take up to 24 hours to show up in {integrationName}.</p>
                                        </div>
                                        {(() => {
                                            if (!props.attendance.integrationState && props.editing === false && props.course.integrationId && props.attendance.scheduledTime) {
                                                return <div className="col-sm-4"><button className="btn-primary" onClick={props.onClickApproveForIntegration}>Approve for {integrationName}</button></div>;
                                            }
                                        })()} 
                                    </div>                              
                                </div>
                            </div>
                        );
                    }
                })()}
        </div>
    )

}

function attendanceLink(classId, keyCode) {
    if (window.location.hostname === 'localhost') {
        return `http://localhost:3000/student/attendanceLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
    }
    else {
        return `https://${window.location.hostname}/student/attendanceLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
    }
}

export default AttendanceSummary;