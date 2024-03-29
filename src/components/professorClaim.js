import React, { Component, Fragment } from 'react'
import editIcon from '../Assets/images/edit-icon.png';
import { claimProfessorAccount } from '../store/axios'
import { i18n } from 'web-translate';


class ProfessorClaim extends Component {
    state={
        email: '',
        conemail: '',
        setupkey: '',
        password: '',
        conpassword: '',
        showHide: {display: 'none'},
        hasAgreedToTerms: false
    };

    handleChangeEmail = e => {
        this.setState({email: e.target.value});
    }

    handleChangePW = e => {
        this.setState({password: e.target.value});
    }

    handleChangeConPW = e => {
        this.setState({conpassword: e.target.value});
    }

    handleChangeKey = e => {
        this.setState({setupkey: e.target.value});
    }

    showError = () => {
        this.setState({showHide: {display: 'block'}});
    }

    handleRadio = e => {
        e.preventDefault();
        this.setState(prevState => ({
            hasAgreedToTerms: !prevState.hasAgreedToTerms
          }));
    }
    
    handleSubmit = async e =>{
        e.preventDefault()

        if (this.state.hasAgreedToTerms === false) {
            this.setState({message: 'Please agree to terms and conditions'});
            this.showError();
        }
        else if (this.state.password === this.state.conpassword) {
            try {
                const emailLowerCase = this.state.email.toLowerCase();
                const response = await claimProfessorAccount(this.state.setupkey, emailLowerCase, this.state.password);
    
                if (response.status === 200) {
                    this.props.history.push('/professor/claim-account-success');
                }
                else if (response.status === 500 ) {
                    this.setState({message: 'Claim professor account failed.'});
                    this.showError();
                }
            }
            catch (error) {
                this.setState({message: 'Oops, something went wrong. Please try again.'});
                this.showError();
            }
        }
        else {
            this.setState({message: 'Password and Confirm Password do not match. Please try again.'});
            this.showError();
        }
    }

    render() {
        return(
            <Fragment>
                <div className="container">
                        <img src={editIcon} className="page-icon" alt="login icon"/>
                        <div className="spacer-vertical" />
                <h1>{i18n("Claim your account")}</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="spacer-vertical" />
                    
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <div style={this.state.showHide}>{this.state.message}</div>
                        <span className="input-label">{i18n("Email")}</span>
                        <input type="email" placeholder={i18n("Email")} name="email" className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} required/>
                    </div>
                    
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <div className="input-label">{i18n("Password")}</div>
                        <input type="password" placeholder={i18n("Password")} className="" name="password" value={this.state.password} onChange={this.handleChangePW.bind(this)} required/>
                    </div>
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("Confirm Password")}</span>
                        <input type="password" placeholder={i18n("Confirm Password")} name="confirmpassword" className="" value={this.state.conpassword} onChange={this.handleChangeConPW.bind(this)} required/>
                    </div>
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("Setup key")}</span>
                        <input type="text" placeholder={i18n("Setup Key")} name="setupkey" className="" value={this.state.setupkey} onChange={this.handleChangeKey.bind(this)} required/>
                    </div>
                    <div className="spacer-vertical" />
                        <div className="input-wrapper">
                            <div className="row content-center">
                                <div className="col">
                                    <button 
                                        style={this.state.hasAgreedToTerms ? {paddingTop: 0, paddingBottom: 0} : {padding: '13px'}} 
                                        className="mimic-radio" 
                                        onClick={this.handleRadio.bind(this)} 
                                    >
                                        {this.state.hasAgreedToTerms ? <strong>&#10003;</strong> : ''}
                                    </button>
                                    <strong style={{color: '#444'}}>&nbsp;{i18n("I agree to the")} <a href="https://www.wiseattend.com/privacy" target="_blank" rel="noopener noreferrer">{i18n("terms of use")}</a>.</strong></div>
                                    
                                </div>
                            <div className="spacer-vertical" />
                        </div>
                    <div className="">
                        <input type="submit" className="btn" value={i18n("Submit")} />
                    </div>
                </form>
                </div>
            </Fragment>
        )
    }
}

export default ProfessorClaim;