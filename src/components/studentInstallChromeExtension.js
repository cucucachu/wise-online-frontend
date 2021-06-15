import React, { useState } from 'react';
import editIcon from '../Assets/images/edit-icon.png';
import { i18n } from 'web-translate';

const StudentInstallChromeExtension = (props) => {

    const [hasAgreed, setHasAgreed] = useState(false);
    const [showHide, setShowHide] = useState(false);
    const errMsg = 'Please agree to terms and conditions.';
    const input = {fontSize: '1.5rem'};

    const handleRadio = e => {
        e.preventDefault()
        setHasAgreed(!hasAgreed);
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        if (hasAgreed) {
            props.history.push('test/record');
        }
        else {
            setShowHide(true);
        }
    }

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Download the Chrome Extension")}</h1>
                <div className="spacer-vertical" />


                    <h4 className="" style={{color: '#222'}}>{i18n("Make sure you have the ")}<a href="https://chrome.google.com/webstore/detail/wise-attend/ifbdkkmplemchhmcafjphahhmdgleolp" target="blank">{i18n("chrome extension")}</a> {i18n("downloaded.")}</h4>

                <div className="spacer-vertical" />
                {showHide ? <p style={input}>{errMsg}</p> :''}
                <div className="input-wrapper">
                {/* style={ isLoggedIn ? { display:'block'} : {display : 'none'} }  */}
                                    <span style={hasAgreed? {paddingRight: '5px', paddingLeft: '5px'} : {paddingLeft: '12px', paddingRight: '12px'}} className="mimic-radio" onClick={handleRadio} >{hasAgreed ? <strong>&#10003;</strong> : ''}</span>
                                <strong className="font-terms">&nbsp;{i18n("I have downloaded the chrome extension.")}</strong>
           
                    </div>
                <div className="spacer-vertical" />
                    <button className="btn" onClick={handleConfirm}>{i18n("Next")}</button>
                
            </div>
        </React.Fragment>
    );
}
 
export default StudentInstallChromeExtension;