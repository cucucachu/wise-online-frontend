import React, { Component } from 'react'
import { Link } from "react-router-dom"
import type { RouteComponentProps } from "react-router-dom";
import { UserLoginData } from '../types';
import loginIcon from '../Assets/images/login-icon.png';

import { adminLogin } from '../store/axios';

import { i18n } from 'web-translate';
   
type AdminLoginProps = {
    onSuccessfulLogin(loginData: UserLoginData): void;
} & RouteComponentProps;

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccessfulLogin, history }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async e => {
        e.preventDefault();
        try {
            const emailLowerCase = email.toLowerCase();
            
            const response = await adminLogin(emailLowerCase, password);
            
            if (response.status === 200) {
                onSuccessfulLogin(response.data);
                if (response.data.role === 'Admin') {
                    history.push('/admin');
                }
                else if (response.data.role === 'Super') {
                    history.push('/super');
                }
            }
            else {
                setErrorMessage('Invalid email or password. Please try again.');
            }
        }
        catch (error) {
            setErrorMessage('Oops, something went wrong. Please try again.');
        }

    }, [email, password, history, onSuccessfulLogin]);

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e) => {
            setEmail(e.target.value);
        },
        [setEmail]
      );

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e) => {
            setPassword(e.target.value);
        },
        [setPassword]
      );

      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Administration login")}</h1>
            <form onSubmit={handleSubmit}>
                <div className="spacer-vertical" />
                <div className="input-wrapper">
                    {errorMessage && <div>{errorMessage}</div>}
                    <span className="input-label">{i18n("Email")}</span>
                    <input 
                        type="email" 
                        placeholder={i18n("Email")} 
                        className=""  
                        name="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required
                        autoComplete="email"
                    />
                </div>
                
                <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <span className="input-label">{i18n("Password")}</span>
                    <input 
                        type="password" 
                        placeholder={i18n("Password")}
                        className="" 
                        name="key" 
                        onChange={handlePasswordChange} 
                        value={password} 
                        required
                        autoComplete="current-password"
                    />
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom width-md">
                        <div className="student-login-wrapper">
                            <Link to="/create-school">{i18n("Create your school")}</Link>
                            <Link to="admin/forgot-pw">{i18n("Forgot Password")}</Link>
                        </div>
                    </div>
                </div>
                <div className="spacer-vertical" />
                <div className="">
                    <input type="submit" className="btn" value={i18n("Next")} />
                </div>
                <div
                    className="btn-common-radius get-support"
                    // onClick={this.onShowModal}
                >
                    {i18n("Get Support")}
                </div>
            </form>
    </div>
    )
}
