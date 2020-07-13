import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import editIcon from '../Assets/images/edit-icon.png'

const StudentRecordAgreeToTerms = (props) => {

    const [hasAgreed, setHasAgreed] = useState(false)
    const [showHide, setShowHide] = useState(false)
    const errMsg = 'Please agree to terms and conditions.'
    const input = {fontSize: '1.5rem'}

    const handleRadio = e =>{
        e.preventDefault()
        setHasAgreed(!hasAgreed);

    }
    const handleConfirm = (e) =>{
        e.preventDefault()
        if(hasAgreed){
            props.history.push('chrome-extension')
        }else{
            setShowHide(true)
        }
    }

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>ATTENTION: YOU WILL BE RECORDED</h1>
                <div className="spacer-vertical-s"></div>
                
                <div className="width-adjust-1">
                    <h4 className="" style={{color: '#222'}}>PLEASE CAREFULLY READ THE FOLLWING:</h4>
                    <div className="spacer-vertical-s"></div>
                    <p style={{color: '#444'}}>
                    By clicking “begin” you acknowledge that you are aware that you will be recorded by Wise through your device webcam, and the content of your web-browsing tabs will be recorded and displayed to professors, in effort to offer a secure exam proctoring experience at educational institutions. You hereby re-affirm that you have read, understand, and agree to our <a href="https://www.wiseattend.com/privacy" target="_blank">privacy policy</a> and <a href="https://www.wiseattend.com/privacy" target="_blank">terms of service</a>. Please know that all your information which is generated as part of using Wise is considered to be in the public domain. Your information may be stored and transmitted at the discretion of Wise to provide a secure exam proctoring experience.
                    </p>
                </div>
                <div className="spacer-vertical"></div>
                {showHide ? <p style={input}>{errMsg}</p> :''}
                <div classNamΩe="input-wrapper">
                {/* style={ isLoggedIn ? { display:'block'} : {display : 'none'} }  */}
                                    <span style={hasAgreed? {paddingRight: '5px', paddingLeft: '5px', } : {paddingLeft: '12px', paddingRight: '12px'}} className="mimic-radio height-lower" onClick={handleRadio} >{hasAgreed ? <strong>&#10003;</strong> : ''}</span>
                                
                                <strong style={{color: '#444'}} className="font-terms">&nbsp;I agree to the <a href="https://www.wiseattend.com/privacy" target="_blank">terms of use</a>.</strong>
           
                        <div className="spacer-vertical"></div>
                    </div>
                    <button onClick={handleConfirm} className="btn">Next</button>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentRecordAgreeToTerms;