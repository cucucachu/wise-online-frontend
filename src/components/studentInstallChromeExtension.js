import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import editIcon from '../Assets/images/edit-icon.png'

const StudentInstallChromeExtension = (props) => {

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
            props.history.push('test/record')
        }else{
            setShowHide(true)
        }
    }

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>Download the Chrome Extension</h1>
                <div className="spacer-vertical"></div>


                    <h4 className="" style={{color: '#222'}}>Make sure you have the <a href="https://chrome.google.com/webstore/detail/wise-attend/ifbdkkmplemchhmcafjphahhmdgleolp" target="blank">chrome extension</a> downloaded.</h4>

                <div className="spacer-vertical"></div>
                {showHide ? <p style={input}>{errMsg}</p> :''}
                <div classNamΩe="input-wrapper">
                {/* style={ isLoggedIn ? { display:'block'} : {display : 'none'} }  */}
                                    <span style={hasAgreed? {paddingRight: '5px', paddingLeft: '5px'} : {paddingLeft: '12px', paddingRight: '12px'}} className="mimic-radio" onClick={handleRadio} >{hasAgreed ? <strong>&#10003;</strong> : ''}</span>
                                <strong className="font-terms">&nbsp;I have downloaded the chrome extension.</strong>
           
                    </div>
                <div className="spacer-vertical"></div>
                    <button className="btn" onClick={handleConfirm}>Next</button>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentInstallChromeExtension;