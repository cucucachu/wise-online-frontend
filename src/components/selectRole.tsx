import React from 'react';
import { Link } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

import { i18n } from 'web-translate';

export const SelectRole: React.FC<{}> = () => {
    return (
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h2 className="bold">{i18n('Welcome to Wise')}</h2>
            <p className='large-body-text'>{i18n('Login to your account below')}</p>
            <div className="spacer-vertical" />

            <Link to="student-login">
                <button className="btn-m">{i18n('Student')}</button>
            </Link>
            <div className="spacer-vertical-s"></div>

            <Link to="professor-login">
                <button className="btn-m">{i18n('Professor')}</button>
            </Link>
            <div className="spacer-vertical-s"></div>

            <Link to="admin-login">
                <button className="btn-m">{i18n('Administrator')}</button>
            </Link>

        </div>
    );
}
