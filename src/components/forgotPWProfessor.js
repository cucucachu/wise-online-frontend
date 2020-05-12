import React, {Component} from 'react'

import loginIcon from '../Assets/images/login-icon.png'

import { AuthContext } from '../contexts/AuthContext'
import { professorRequestResetPW } from '../store/axios'

class ForgotPWProfessor extends Component {
    static contextType = AuthContext

    state={
        email: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeEmail = e =>{
        this.setState({email: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = async e =>{
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
            this.setState({message: 'Opps, something went wrong. Please try again.'})
            this.showError()
        }
   
        return
        
    }
    
  render(){
    
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Forgot my Password</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-adjust-1">
                <p className="text-plain ">
                    We will send you a link to reset your password. Please allow a few moments for the email to reach your inbox.
                </p>
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">School email</span>
                    <input type="email" placeholder="School email" className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} required/>
                </div>
                        
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/student/dashboard"> */}
                        <input type="submit" className="btn" value="Reset password" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default ForgotPWProfessor;


