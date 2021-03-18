import React, { useState, useContext } from 'react'
import editIcon from '../Assets/images/edit-icon.png'
import { AuthContext } from '../contexts/AuthContext'
import { proctoringStudentStartTest } from '../store/axios'
import { logout } from '../store/axios'

const StudentTestId = (props) => {
    const [testId, setTestId] = useState('')
    const [classId, setClassId] = useState('')
    const [message, setMessage] = useState('')
    const [showHide, setShowHide] = useState({display: 'none'})
    const { storeClassId, storeTestAttendanceId, setScreenshotInterval, setWebcamInterval } = useContext(AuthContext)

    const handleChangeKey = e =>{
        console.log('onchange: ', e.target.value);
        setTestId(e.target.value)
    }
    const handleChangeClass = e =>{
        setClassId(e.target.value)
    }
    const showError = () =>{
        setShowHide({display: 'block'})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        
        // storeTestID(testId)
        storeClassId(classId)

        try {
            // const response = await takeTest(classId, testId);
            const response = await proctoringStudentStartTest({
                classId: classId,
                keyCode: testId,
            });

            if (response.status === 200) {

                if (response.data.proctorSession) {
                    props.history.push('/student/proctor', {
                        ...response.data,
                    });
                }
                else {
                    storeTestAttendanceId(response.data.id);
    
                    if (response.data.proctorConfiguration) {
                        setScreenshotInterval(response.data.proctorConfiguration.screenshotInterval);
                        setWebcamInterval(response.data.proctorConfiguration.webcamInterval);
                    }
    
                    props.history.push('record-agree-to-terms');
                }
            }else if(response.status === 401){
                sessionStorage.clear();
                logout();
                this.props.history.push({
                    pathname: '/student-login',
                    state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'}}
                  });
            }
            else {
                setMessage('Invalid Class ID or Test ID. Please try again.');
                showError();
            }

        }
        catch (error) {
            console.log(error.message);
            setMessage('Oops, something went wrong. Please try again.');
            showError();
        }
    };

    const onFocus = (id) => {
        document.getElementById(id).onpaste = e => {
            e.preventDefault();
            return false;
        };
    };

    return ( 
        <React.Fragment>
            <div className="container prevent-text">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical" />
                <h1>Enter Test ID</h1>
                <div className="spacer-vertical" />
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <div style={showHide}>{message}</div>
                        <span className="input-label">Class ID</span>
                        <input id="student_test1" type="text" className="" name="key" onChange={handleChangeClass} value={classId} placeholder="Class ID" onFocus={() => onFocus("student_test1")} required/>
                    </div>
                    <div className="spacer-vertical" />
                    <div className="input-wrapper">
                        <span className="input-label">Test ID</span>
                        <input id="student_test2" type="text" className="" name="key" placeholder="Test ID" onChange={handleChangeKey} value={testId} onFocus={() => onFocus("student_test2")} required/>
                    </div>
                    <div className="spacer-vertical" /><br/>
                    <input id="student_test3" type="submit" className="btn-m" value="Begin test" onFocus={() => onFocus("student_test3")} />
                </form>
        
            </div>
        </React.Fragment>
     );
};
 
export default StudentTestId;