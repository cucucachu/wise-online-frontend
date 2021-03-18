import React, { Component } from 'react';

import { studentLogin, studentAgreeToTerms } from '../store/axios';

class LoginModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            key: '',
            display: 'none',
            message:'',
            showHide: {display: 'none'},
            isFirstTime: false,
            hasAgreedToTerms: false
        };
    }

    handleChangeName(e) {
        this.setState({email: e.target.value});
    }

    handleChangeKey(e) {
        this.setState({key: e.target.value});
    }

    showError() {
        this.setState({showHide: {display: 'block'}});
    }

    handleChangeIAgree(e) {
        this.setState({...this.state, hasAgreedToTerms: !this.state.hasAgreedToTerms});
    }

    async handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await studentLogin(this.state.email, this.state.key);
            
            if (response.status === 200 && response.data.hasAgreedToTerms !== true) {
                if (this.state.isFirstTime && this.state.hasAgreedToTerms) {
                    await studentAgreeToTerms();
                    this.props.handleSuccessfulLogin(response.data);
                }
                else {
                    this.setState({message: 'Please agree to terms and conditions'});
                    this.showError();
                    this.setState({...this.state, isFirstTime: true});
                }

                return;
            }
            else {
                if (response.status === 200) {
                    this.props.handleSuccessfulLogin(response.data);
                }
                else {
                    this.setState({message: 'Invalid email or student id. Please try again.'});
                    this.showError();
                }
            }
        }
        catch (error) {
            console.log(error.message);
            this.setState({message: 'Oops, something went wrong. Please try again.'});
            this.showError();
        }
        return;        
    }

    componentDidMount() {
    }

    render() {
            return(
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="spacer-vertical" />
                    <h2>Please Login to Continue</h2>
                    <div className="spacer-vertical" />
                    <div className="input-wrapper">
                        <div style={this.state.showHide}>{this.state.message}</div>
                        <span className="input-label">Email</span>
                        <input 
                            type="email" 
                            className="" 
                            value={this.state.email} 
                            onChange={this.handleChangeName.bind(this)} 
                            placeholder="Email" 
                            required
                            autoComplete="email"
                        />
                    </div>
                    
                    <div className="spacer-vertical" />
                    <div className="input-wrapper">
                        <span className="input-label">Student ID</span>
                        <input 
                            type="password" 
                            className="" 
                            onChange={this.handleChangeKey.bind(this)} value={this.state.key} 
                            placeholder="Student ID" 
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-wrapper">
                        <div className="width-md">
                            {/* <Link to="#">What's my student ID?</Link> */}
                            <p className="tooltip-login">
                                <span className="for-border">What's my student ID?<br />
                                    <span className="tooltiptext">
                                    Your school’s student ID is a code of letters and/or numbers provided to identify you by your school.  Wise uses your school’s student ID to verify your identity, securely.  If you have forgotten your school ID, please contact the appropriate individual at your school.
                                    </span>
                                </span><br/>
                                
                            </p>
                            
                        </div>
                    </div>
                    <div className="spacer-vertical" />
                    {this.state.isFirstTime ? 
                    <React.Fragment>
                        <div className="input-wrapper">
                            <div className="row content-center">
                                <div className="col">
                                    <input 
                                        type='checkbox' 
                                        onChange={e => this.handleChangeIAgree(e)}
                                        checked={this.state.hasAgreedToTerms}
                                    >
                                    </input>
                                    <strong style={{color: '#444'}} className="font-terms">
                                        &nbsp;I agree to the&nbsp;
                                        <a 
                                            href="https://www.wiseattend.com/privacy" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        > 
                                            terms of use
                                        </a>.
                                    </strong>
                                    
                                </div>
                                
                            </div>
                            <div className="spacer-vertical" />
                        </div>
                    </React.Fragment>
                    : ''}
                    <div className="test">
                            <input type="submit" className="btn" value="Submit" />
                    </div>
                </form>
        );
    }
}

export default LoginModal;


