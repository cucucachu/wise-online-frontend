import React, {useState, useEffect} from 'react'

import loginIcon from '../Assets/images/login-icon.png'
import queryString from 'query-string'


const ProfessorResetPW = (props) => {
    const [userID, setUserID] = useState('')
    const [key, setKey] = useState('')
    const [pw, setPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')
    const [showHide, setShowHide] = useState({display: 'none'})
    const message = 'The password and confirm password do not match. Please try again.'

    const handlePW = (e) =>{
        setPw(e.target.value)
    }
    const handleConfirmPW = (e) =>{
        setConfirmPw(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(pw === confirmPw){
            console.log('success')
            //call axios
        }else{
            setShowHide({display: 'block'})
        }
    }
    useEffect(() => {
        console.log(props.location.search)
        const values = queryString.parse(props.location.search)
        // https://online.wiseattend.com/admin/reset-password?adminId=5e9f5a847b83fe13804e3deb&passwordResetKey=RESET-123
        console.log('id: ', values.adminId);
        console.log('key: ', values.passwordResetKey);
        setUserID(values.adminId)
        setKey(values.passwordResetKey)
        // return () => {
        //     cleanup
        // }
    }, [props.location.search])

    return ( 
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Reset my Password</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-adjust-1">
                <p className="text-plain ">
                    Please type your new password and confirm password below.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={showHide}>{message}</div>
                    <span className="input-label">Password</span>
                    <input type="pw" placeholder="New Password" className="" id="basic-url" aria-describedby="basic-addon3" value={pw} onChange={handlePW}/>
                </div>
                        
                <div className="spacer-vertical"></div>

                <div className="input-wrapper">
                    <span className="input-label">Confirm Password</span>
                    <input type="pw" placeholder="Confirm Password" className="" id="basic-url" aria-describedby="basic-addon3" value={confirmPw} onChange={handleConfirmPW}/>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                        <input type="submit" className="btn" value="Reset password" />
                </div>
            </form>
    </div>
     );
}
 
export default ProfessorResetPW