import React from 'react';


function AttendanceSummary(props) {
    console.log(props.attendance.scheduledTime);
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
                            <p><strong>Attendance Date</strong>: {new Date(props.attendance.startTime).toLocaleDateString()}</p>
                            <p><strong>Attendance Start Time</strong>: {new Date(props.attendance.startTime).toLocaleTimeString()}</p>
                            <p><strong>Students Present</strong>: {props.attendance.studentsPresent}</p>
                            <p><strong>Students Absent</strong>: {props.attendance.studentsAbsent}</p>
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

export default AttendanceSummary;