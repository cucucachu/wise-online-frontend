import React, { useState, useContext, useEffect } from 'react'
import editIcon from '../Assets/images/edit-icon.png'
import { AuthContext } from '../contexts/AuthContext'
import { takeTest } from '../store/axios'
//classID key

const StudentTestId = (props) => {
    const [testId, setTestId] = useState('')
    const [classId, setClassId] = useState('')
    const [message, setMessage] = useState('')
    const [showHide, setShowHide] = useState({display: 'none'})
    const { storeTestID, storeClassId, cookies } = useContext(AuthContext)

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
            const response = await takeTest(classId, testId)
            // const testObj = response.data

            if (response.status === 200) {
                                
                props.history.push('test/record')
            }
            else {
                setMessage('Invalid Class ID or Test ID. Please try again.')
                showError()
            }

        }
        catch (error) {
            setMessage('Opps, something went wrong. Please try again.')
            showError()
        }

    }
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
                        <input type="text" className="" name="key" onChange={handleChangeClass} value={classId}/>
                    </div>
                    <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">Test ID</span>
                        <input type="text" className="" name="key" onChange={handleChangeKey} value={testId}/>
                    </div>
                    <div className="spacer-vertical"></div><br/>
                    <input type="submit" className="btn-m" value="Begin test" />
                </form>
        
            </div>
        </React.Fragment>
     );
}
 
export default StudentTestId;