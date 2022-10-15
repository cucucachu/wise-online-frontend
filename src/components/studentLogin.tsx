import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import loginIcon from '../Assets/images/login-icon.png';

import { studentLogin, logout, studentAgreeToTerms } from '../store/axios';

import ModalSupport from "./modal-support";

import { i18n } from 'web-translate';
import { UserLoginData } from '../types';

type StudentLoginProps = {
    onSuccessfulLogin(data: UserLoginData): void;
} & RouteComponentProps<{}, any, any>;

type StudentLoginState = {
    email: string;
    key: string;
    display: 'none' | 'block';
    message:string;
    showHide: any;
    isFirstTime: boolean;
    hasAgreedToTerms: boolean;
    show: boolean;
}

class StudentLogin extends Component<StudentLoginProps, StudentLoginState> {

    constructor(props: StudentLoginProps) {
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

    handleChangeName: React.ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({email: e.target.value});
    };

    handleChangeKey: React.ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({key: e.target.value});
    };

    showError = () => {
        this.setState({showHide: {display: 'block'}});
    };

    handleChangeIAgree: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({...this.state, hasAgreedToTerms: !this.state.hasAgreedToTerms});
    }

    handleSubmit: React.FormEventHandler = async e => {
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
                <h1>{i18n('Login to Wise')}</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical" />
                    <div className="input-wrapper">
                        <div style={this.state.showHide}>{this.state.message}</div>
                        <span className="input-label">{i18n('Email')}</span>
                        <input
                            type="email"
                            className=""
                            value={this.state.email}
                            onChange={this.handleChangeName.bind(this)}
                            placeholder={i18n('Email')}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="spacer-vertical" />
                    <div className="input-wrapper">
                        <span className="input-label">{i18n('Student ID')}</span>
                        <input
                            type="password"
                            className=""
                            onChange={this.handleChangeKey.bind(this)} value={this.state.key}
                            placeholder={i18n('Student ID')}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-wrapper">
                        <div className="width-md">
                            {/* <Link to="#">What's my student ID?</Link> */}
                            <p className="tooltip-login">
                                <span className="for-border">{i18n('Whats my student ID?')}<br />
                                    <span className="tooltiptext">  
                                    {i18n('studentLogin_StudentIDHelp')}
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
                                        &nbsp;{i18n('I agree to the')}&nbsp;
                                        <a
                                            href="https://www.wiseattend.com/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {i18n('terms of use')}
                                        </a>.
                                    </strong>

                                </div>

                            </div>
                            <div className="spacer-vertical" />
                        </div>
                    </React.Fragment>
                    : ''}
                    <div className="test">
                        <input type="submit" className="btn" value={i18n("Submit")} />
                    </div>
                    <div
                        className="btn-common-radius get-support"
                        // onClick={this.onShowModal}
                    >
                        {i18n("Get Support")}
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


