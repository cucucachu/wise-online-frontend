import React from 'react';


function AttendanceSummary(props) {

    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="shadow">
                    <h3>Summary</h3>
                    <br></br>
                    <p><strong>Class Name</strong>: {props.course.name}</p>
                    <p><strong>Class ID</strong>: {props.course.classId}</p>
                    <p><strong>Attendance Date</strong>: {new Date(props.attendance.startTime).toLocaleDateString()}</p>
                    <p><strong>Attendance Start Time</strong>: {new Date(props.attendance.startTime).toLocaleTimeString()}</p>
                    <p><strong>Scheduled Time</strong>: {props.attendance.scheduledTime ? new Date(props.attendance.scheduledTime).toLocaleString() : 'None'}</p>
                    <p><strong>Students Present</strong>: {props.attendance.studentsPresent}</p>
                    <p><strong>Students Absent</strong>: {props.attendance.studentsAbsent}</p>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="shadow" style={{textAlign: 'center'}}>
                    <h3>Actions</h3>
                    <br/>
                        {(() => {
                            if (props.editing) {
                                return <button className="btn-primary" onClick={props.onClickSave}>Save</button>
                            }
                            else {
                                return <button className="btn-primary" onClick={props.onClickEdit}>Edit</button>
                            }
                        })()}
                </div>
            </div>
        </div>
    )

}

export default AttendanceSummary;