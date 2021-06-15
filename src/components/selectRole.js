import React from 'react';
import { Link } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

import {
    i18n,
  } from 'web-translate';

function SelectRole(props) {
    return (
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1 style={{color: '#444'}}>{i18n('I Am A...')}</h1>
            <div className="spacer-vertical" />

            <Link to="student-login">
                <button className="btn-m">{i18n('student')}</button>
            </Link>
            <div className="spacer-vertical-s"></div>

            <Link to="professor-login">
                <button className="btn-m">{i18n('professor')}</button>
            </Link>
            <div className="spacer-vertical-s"></div>

            <Link to="admin-login">
                <button className="btn-m">{i18n('admin')}</button>
            </Link>

        </div>
    );
}

export default SelectRole;
