import React, { Component } from 'react';

import TextWithCheckbox from '../Resusable/TextWithCheckbox';

class ProctoringTerms extends Component {
    constructor(props) {
        super(props)

        this.state = {
            agreed: false,
            showMessage: false,
        }

        this.handleClickAgree = this.handleClickAgree.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleClickAgree() {
        this.setState({
            ...this.state,
            agreed: this.state.agreed ? false : true,
        });
    }

    handleConfirm() {
        if (this.state.agreed === false) {
            this.setState({
                ...this.state,
                showMessage: true,
            });
        }
        else {
            this.props.handleConfirm();
        }
    }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>

                <h2>ATTENTION: YOU WILL BE RECORDED</h2>
                <div className="spacer-vertical-s"></div>
                
                <div className="width-adjust-1">
                    <h4 className="" style={{color: '#222'}}>PLEASE READ CAREFULLY:</h4>
                    <div className="spacer-vertical-s"></div>
                    <p style={{color: '#444'}}>
                    By clicking “begin” you acknowledge that you are aware that you will be recorded by Wise through 
                    your device webcam, and the content of your screen will be recorded and displayed to 
                    professors, in effort to offer a secure exam proctoring experience at educational institutions. 
                    You hereby re-affirm that you have read, understand, and agree to our&nbsp; 
                    <a 
                        href="https://www.wiseattend.com/privacy" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        privacy policy
                    </a> and &nbsp; 
                    <a 
                        href="https://www.wiseattend.com/privacy" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        terms of service
                    </a>. 
                    Please know that all your information which is generated as part of using Wise is available for use
                    by your school and by Wise Education Systems. Your information may be stored and transmitted at the discretion 
                    of Wise to provide a secure exam proctoring experience.
                    </p>
                </div>
                <div className="spacer-vertical" />
                {this.state.showMessage ? <p className="red center">"Please agree to the terms and conditions.</p> :''}
                
                <TextWithCheckbox
                    text="I agree to the terms of use."
                    checked={this.state.agreed}
                    onClick={this.handleClickAgree}
                />
                
                <div className="spacer-vertical-s"></div>
                <button onClick={this.handleConfirm} className="btn">Begin</button>
                
            </div>
        )
    }
}
 
export default ProctoringTerms;