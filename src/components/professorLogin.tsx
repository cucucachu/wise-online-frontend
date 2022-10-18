import * as React from 'react';
import { Link } from "react-router-dom";
import type { RouteComponentProps } from "react-router-dom";
import { professorLogin } from '../store/axios';
import { UserLoginData } from '../types';
import loginIcon from '../Assets/images/login-icon.png';
import { i18n } from 'web-translate';
import { useAuth } from '../hooks';

export const ProfessorLogin: React.FC<RouteComponentProps> = ({ history }) => {
    const auth = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async e => {
        e.preventDefault();
        try {
            const response = await professorLogin(email, password);

            if (response.status === 200) {
                auth.onLogin(response.data);
                history.push('/professor/course');
            }
            else {
                setErrorMessage('Invalid email or password. Please try again.');
            }

        }
        catch (error) {
            setErrorMessage('Oops, something went wrong. Please try again.');
        }
    }, [email, password, history, auth]);

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
    console.log('RE RENDERING PROF LOGN')
    return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"/>
            <h1>{i18n("Professor login")}</h1>
            <form onSubmit={handleSubmit}>
            <div className="spacer-vertical"/>
                <div className="input-wrapper">
                    {errorMessage && <div>{errorMessage}</div>}
                    <span className="input-label" >{i18n("Email")}</span>
                    <input type="email" className="" value={email} placeholder={i18n("Email")} onChange={handleEmailChange} required />
                </div>
                
                <div className="spacer-vertical"/>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("Password")}</span>
                    <input type="password" placeholder={i18n("Password")} className="" name="key" onChange={handlePasswordChange} value={password} required/>
                </div>

                <div className="input-wrapper">
                    <div className="input-wrapper-bottom width-md">
                        <div className="student-login-wrapper">
                            <Link  to="/professor/claim-account" >{i18n("Claim your account")}</Link>
                            <Link  to="professor/forgot-pw" >{i18n("Forgot Password")}</Link>
                        </div>
                        
                    </div>
                </div>

                <div className="spacer-vertical"/>
            
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
    );
}
