import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { professorLogin } from '../store/axios';
import { AuthContext } from '../contexts/AuthContext';

import loginIcon from '../Assets/images/login-icon.png';

class ProfessorLogin extends Component {
    static contextType = AuthContext;

    state = {
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: { display: 'none'},
        hasAgreedToTerms: false
    };

    handleChangeName = e => {
        this.setState({email: e.target.value});
    };

    handleChangeKey = e => {        
        this.setState({key: e.target.value});
    };

    showError = () => {
        this.setState({showHide: {display: 'block'}});
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await professorLogin(this.state.email, this.state.key);

            if (response.status === 200) {
                if (response.data.school.integrationName) {
                    sessionStorage.setItem('integrationName', response.data.school.integrationName);
                }
                this.props.onSuccessfulLogin(response.data);
                this.props.history.push('/professor/course');
            }
            else {
                this.setState({message: 'Invalid email or password. Please try again.'});
                this.showError();
            }

        }
        catch (error) {
            this.setState({message: 'Oops, something went wrong. Please try again.'});
            this.showError();
        }
    };

    componentDidMount() {
        if (this.props.location.state) {
            const historyStates = this.props.location.state;
            this.setState({message: historyStates.message, showHide: historyStates.showHide});
        }
    }
    
    render() {
        return(
            <div className="container">
                <img src={loginIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"/>
                <h1>Professor login</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical"/>
                    <div className="input-wrapper">
                        <div style={this.state.showHide}>{this.state.message}</div>
                        <span className="input-label" >Email</span>
                        <input type="email" className="" value={this.state.email} placeholder="Email" onChange={this.handleChangeName.bind(this)} required/>
                    </div>
                    
                    <div className="spacer-vertical"/>
                    <div className="input-wrapper">
                        <span className="input-label">Password</span>
                        <input type="password" placeholder="Password" className="" name="key" onChange={this.handleChangeKey.bind(this)} value={this.state.key} required/>
                    </div>

                    <div className="input-wrapper">
                        <div className="input-wrapper-bottom width-md">
                            <div className="student-login-wrapper">
                                <Link  to="/professor/claim-account" >Claim your account</Link>
                                <Link  to="professor/forgot-pw" >Forgot Password</Link>
                            </div>
                            
                        </div>
                    </div>

                    <div className="spacer-vertical"/>
                
                    <div className="">
                        <input type="submit" className="btn" value="Next" />
                    </div>
                    <div
                        className="btn-common-radius get-support"
                        // onClick={this.onShowModal}
                    >
                        Get Support
                    </div>
                </form>
            </div>
        );
    }
}

export default ProfessorLogin;


