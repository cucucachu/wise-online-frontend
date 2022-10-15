import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom';
import { professorRequestResetPW } from '../store/axios'
import { i18n } from 'web-translate';

import loginIcon from '../Assets/images/login-icon.png'

class ForgotPWProfessor extends React.Component<RouteComponentProps> {
    state={
        email: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = e =>{
        this.setState({email: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit: React.FormEventHandler = async e =>{
        e.preventDefault()

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            const response = await professorRequestResetPW({professorEmail: emailLowerCase})

            if (response.status === 200) {
                this.props.history.push('reset-pw-sent')
            }
            else {
                this.setState({message: 'Invalid email. Please try again.'})
                this.showError()
            }

        }
        catch (error) {
            this.setState({message: 'Oops, something went wrong. Please try again.'})
            this.showError()
        }
   
        return
        
    }
    
  render(){
    
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Forgot my Password")}</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-adjust-1">
                <p className="text-plain ">
                    {i18n("We will send you a link to reset your password. Please allow a few moments for the email to reach your inbox.")}
                </p>
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">{i18n("School email")}</span>
                    <input type="email" placeholder={i18n("School email")} className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} required/>
                </div>
                        
                <div className="spacer-vertical" />
                <div className="">
                    {/* <Link to="/student/dashboard"> */}
                        <input type="submit" className="btn" value={i18n("Reset password")} />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default ForgotPWProfessor;


