import React, { Component } from 'react';

import loginIcon from '../Assets/images/login-icon.png';

import { studentLogin, logout, studentAgreeToTerms } from '../store/axios';

import ModalSupport from "./modal-support";

class StudentLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            key: '',
            display: 'none',
            message:'',
            showHide: {display: 'none'},
            isFirstTime: false,
            hasAgreedToTerms: false,

            show: false,
        };
    }

    handleChangeName = e => {
        this.setState({email: e.target.value});
    };

    handleChangeKey = e => {
        this.setState({key: e.target.value});
    };

    showError = () => {
        this.setState({showHide: {display: 'block'}});
    };

    handleChangeIAgree(e) {
        this.setState({...this.state, hasAgreedToTerms: !this.state.hasAgreedToTerms});
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await studentLogin(this.state.email, this.state.key);
            
            if (response.status === 200 && response.data.hasAgreedToTerms !== true) {
                if (this.state.isFirstTime && this.state.hasAgreedToTerms) {
                    await studentAgreeToTerms();
                    this.props.onSuccessfulLogin(response.data);
                    this.props.history.push('/student/dashboard');
                }
                else {
                    await logout();
                    this.setState({message: 'Please agree to terms and conditions'});
                    this.showError();
                    this.setState({...this.state, isFirstTime: true});
                }

                return;
            }
            else {
                if (response.status === 200) {
                    this.props.onSuccessfulLogin(response.data);
                    this.props.history.push('/student/dashboard');
                }
                else {
                    this.setState({message: 'Invalid email or student id. Please try again.'});
                    this.showError();
                }
            }
        }
        catch (error) {
            this.setState({message: 'Oops, something went wrong. Please try again.'});
            this.showError();
        }
        return null;
    };

    componentDidMount() {
        if (this.props.location.state) {
            const historyStates = this.props.location.state;

            this.setState({message: historyStates.message, showHide: historyStates.showHide});
        }
        else {
            return null;
        }
    }

    onShowModal = () => {
       this.setState({
           show: !this.state.show,
       })
    };
    onHideModal = () => {
        this.setState({
            show: !this.state.show,
        })
    };
    render() {
        return(
            <div className="container">
                <img src={loginIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>Login to Wise</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                    <div
                        className="btn-common-radius get-support"
                        // onClick={this.onShowModal}
                    >
                        Get Support
                    </div>
                </form>

                {/* Modal */}
                <ModalSupport
                    show={this.state.show}
                    handleClose={this.onHideModal}
                />
            </div>
        );
    }
}

export default StudentLogin;


