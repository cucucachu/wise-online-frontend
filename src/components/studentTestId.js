import React, { useState, useContext } from 'react'
import editIcon from '../Assets/images/edit-icon.png'
import { AuthContext } from '../contexts/AuthContext'
import { takeTest } from '../store/axios'
import { logout } from '../store/axios'

const StudentTestId = (props) => {
    const [testId, setTestId] = useState('')
    const [classId, setClassId] = useState('')
    const [message, setMessage] = useState('')
    const [showHide, setShowHide] = useState({display: 'none'})
    const { storeTestID, storeClassId, storeTestAttendanceId } = useContext(AuthContext)

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
        
        storeTestID(testId)
        storeClassId(classId)

        try {
            const response = await takeTest(classId, testId);

            if (response.status === 200) {
                storeTestAttendanceId(response.data.id);
                props.history.push('record-agree-to-terms');
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

    }
  

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>Enter Test ID</h1>
                <div className="spacer-vertical"></div>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <div style={showHide}>{message}</div>
                        <span className="input-label">Class ID</span>
                        <input type="text" className="" name="key" onChange={handleChangeClass} value={classId} placeholder="Class ID" required/>
                    </div>
                    <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">Test ID</span>
                        <input type="text" className="" name="key" placeholder="Test ID" onChange={handleChangeKey} value={testId} required/>
                    </div>
                    <div className="spacer-vertical"></div><br/>
                    <input type="submit" className="btn-m" value="Begin test" />
                </form>
        
            </div>
        </React.Fragment>
     );
}
 
export default StudentTestId;