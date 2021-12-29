import React, { Component } from 'react';

import TextWithCheckbox from '../Resusable/TextWithCheckbox';

import { i18n } from 'web-translate';

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

                <h2>{i18n("ATTENTION: YOU WILL BE RECORDED")}</h2>
                <div className="spacer-vertical-s"></div>
                
                <div className="width-adjust-1">
                    <h4 className="" style={{color: '#222'}}>{i18n("PLEASE READ CAREFULLY:")}</h4>
                    <div className="spacer-vertical-s"></div>
                    <p style={{color: '#444'}}>{i18n("studentRecordAgreeToTerms_acknowledge")}&nbsp; 
                    <a 
                        href="https://www.wiseattend.com/privacy" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {i18n("privacy policy")}
                    </a> {i18n("and")} &nbsp; 
                    <a 
                        href="https://www.wiseattend.com/privacy" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {i18n("terms of service")}
                    </a>. 
                    {i18n("studentRecordAgreeToTerms_information")}
                    </p>
                </div>
                <div className="spacer-vertical" />
                {this.state.showMessage ? <p className="red center">{i18n("Please agree to the terms and conditions.")}</p> :''}
                
                <TextWithCheckbox
                    text={i18n("I agree to the terms of use.")}
                    checked={this.state.agreed}
                    onClick={this.handleClickAgree}
                />
                
                <div className="spacer-vertical-s"></div>
                <button onClick={this.handleConfirm} className="btn">{i18n("Begin")}</button>
                
            </div>
        )
    }
}
 
export default ProctoringTerms;