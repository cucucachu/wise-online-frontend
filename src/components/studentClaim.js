import React, { Component, Fragment } from 'react'
import editIcon from '../Assets/images/edit-icon.png';
import { claimStudentAccount } from '../store/axios'

import { AuthContext } from '../contexts/AuthContext'
import { i18n } from 'web-translate';


class StudentClaim extends Component {
    constructor(props) {
        super(props);

        this.state={
            firstName: '',
            lastName: '',
            studentId: '',
            email: '',
            confirmEmail: '',
            accessCode: '',
            password: '',
            confirmPassword: '',
            emailError: '',
            passwordError: '',
            termsError: '',
            hasAgreedToTerms: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    static contextType = AuthContext

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    handleRadio = e => {
        e.preventDefault();
        this.setState(prevState => ({
            hasAgreedToTerms: !prevState.hasAgreedToTerms
          }));
    }

    validateForm() {

        const termsMessage = this.state.hasAgreedToTerms ? '' : 'Please agree to terms and conditions';
        const passwordMessage = this.state.password === this.state.confirmPassword ? '' : 'Passwords do not match. Please try again.';
        const emailMessage = this.state.email === this.state.confirmEmail ? '' : 'Emails do not match. Please try again.';

        this.setState({
            ...this.state,
            termsError: termsMessage,
            passwordError: passwordMessage,
            emailError: emailMessage,
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault()
        this.validateForm();

        try {
            const {firstName, lastName, email, password, studentId, accessCode} = this.state;
            const response = await claimStudentAccount(firstName, lastName, email.toLowerCase(), password, studentId, accessCode);

            if (response.status === 200) {
                //Make This V
                this.props.history.push('/student/claim-account-success');
            }
            else{
                this.setState({message: response.error});
            }
        }
        catch (error) {
            this.setState({message: 'Error: Student Account Could Not Be Claimed.'});
        }


    }

    render() {
        return(
            <Fragment>
                <div className="container">
                        <img src={editIcon} className="page-icon" alt="login icon"/>
                        <div className="spacer-vertical" />
                <h1>{i18n("Claim Your Student Account")}</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="spacer-vertical" />
                    
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("First Name")}</span>
                        <input id="firstName" type="text" placeholder={i18n("First Name")} name="firstName" className="" value={this.state.firstName} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("Last Name")}</span>
                        <input id="lastName" type="text" placeholder={i18n("Last Name")} name="lastName" className="" value={this.state.lastName} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("Student ID")}</span>
                        <input id="studentId" type="text" placeholder={i18n("Student ID")} name="studentId" className="" value={this.state.studentId} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        { this.state.emailError && <p className="red-text"> {this.state.emailError} </p> }
                        <span className="input-label">{i18n("Email")}</span>
                        <input id="email" type="email" placeholder={i18n("Email")} name="email" className="" value={this.state.email} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                    { this.state.emailError && <p className="red-text"> {this.state.emailError} </p> }
                        <span className="input-label">{i18n("Confirm Email")}</span>
                        <input id="confirmEmail" type="email" placeholder={i18n("Confirm Email")} name="confirmEmail" className="" value={this.state.confirmEmail} onChange={this.handleChange} required/>
                    </div>
                    
                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                    { this.state.passwordError && <p className="red-text"> {this.state.passwordError} </p> }
                        <div className="input-label">{i18n("Password")}</div>
                        <input id="password" type="password" placeholder={i18n("Password")} className="" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                    { this.state.passwordError && <p className="red-text"> {this.state.passwordError} </p> }
                        <span className="input-label">{i18n("Confirm Password")}</span>
                        <input id="confirmPassword" type="password" placeholder={i18n("Confirm Password")} name="confirmPassword" className="" value={this.state.confirmPassword} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <div className="input-wrapper">
                        <span className="input-label">{i18n("Access Code")}</span>
                        <input id="accessCode" type="text" placeholder={i18n("Access Code")} name="accessCode" className="" value={this.state.accessCode} onChange={this.handleChange} required/>
                    </div>

                    <div className="spacer-vertical" />
                    { this.state.termsError && <p className="red-text"> {this.state.termsError} </p> }
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

export default StudentClaim;