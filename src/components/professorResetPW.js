import React, {useState, useEffect} from 'react'

import loginIcon from '../Assets/images/login-icon.png'
import queryString from 'query-string'
import { resetProfessorPW } from '../store/axios'

const ProfessorResetPW = (props) => {
    const [userID, setUserID] = useState('')
    const [key, setKey] = useState('')
    const [pw, setPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')
    const [showHide, setShowHide] = useState({display: 'none'})
    const [message, setMessage] = useState('')

    const handlePW = (e) =>{
        setPw(e.target.value)
    }
    const handleConfirmPW = (e) =>{
        setConfirmPw(e.target.value)
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        if(pw === confirmPw){
            const data = {professorId: userID, passwordResetKey: key, password: pw}
            const response = await resetProfessorPW(data)

            try{
                if(response.status === 200){

                    props.history.push('reset-success')
                }else{
                    setMessage('Invalid Professor ID or Reset Key.')
                    setShowHide({display: 'block'})
                }
            }catch(error){
                setMessage('Opps, something went wrong. Please try again.')
                setShowHide({display: 'block'})
            }

        }else{
            setMessage('The password you typed does not match the confirmation password. Please try again.')
            setShowHide({display: 'block'})
        }
    }
    useEffect(() => {
        console.log(props.location.search)
        const values = queryString.parse(props.location.search)
        // https://online.wiseattend.com/admin/reset-password?adminId=5e9f5a847b83fe13804e3deb&passwordResetKey=RESET-123

        setUserID(values.professorId)
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
                    <input type="pw" placeholder="New Password" className="" value={pw} onChange={handlePW} required/>
                </div>
                        
                <div className="spacer-vertical"></div>

                <div className="input-wrapper">
                    <span className="input-label">Confirm Password</span>
                    <input type="pw" placeholder="Confirm Password" className="" value={confirmPw} onChange={handleConfirmPW}required/>
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