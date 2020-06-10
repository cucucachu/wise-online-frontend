import React, {Component, Fragment} from 'react'
// import { Link } from "react-router-dom"

import loginIcon from '../Assets/images/login-icon.png'

import { studentLogin, studentAgreeToTerms } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'


class StudentLogin extends Component {
    static contextType = AuthContext

    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'},
        isFirstTime: false,
        hasAgreedToTerms: false
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        this.setState({key: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    handleRadio = e =>{
        e.preventDefault()
        this.setState(prevState => ({
            hasAgreedToTerms: !prevState.hasAgreedToTerms
          }));

    }
    handleSubmit = async e =>{
        e.preventDefault()
        if(this.state.hasAgreedToTerms === true){
            try{
                const response = await studentLogin(this.state.email, this.state.key)
                const isAgreed = await studentAgreeToTerms(this.state.key)
                console.log('agreed: ', isAgreed)
                
                
                if(response.status === 200){
                    const userStudent = response.data
                    sessionStorage.setItem('userID', userStudent.id)
                    sessionStorage.setItem('username', userStudent.name)
                    sessionStorage.setItem('schoolName', userStudent.name)
                    sessionStorage.setItem('schoolID', userStudent.school.id)
                    sessionStorage.setItem('isLoggedIn', true)                
                    
                    this.props.history.push('/student/dashboard')
                }else{
                    this.setState({message: 'Invalid email or student id. Please try again.'})
                    this.showError()
                }
                
            }catch(error){
                this.setState({message: 'Opps, something went wrong. Please try again.'})
                this.showError()
            }
        }else{
            try {
            
                const response = await studentLogin(this.state.email, this.state.key)
                const userStudent = response.data
    
                if (response.status === 200) {
                    //check is the student ever checked terms and conditions
                    if(userStudent.hasAgreedToTerms === false){
                        //show checkbox
                        this.setState({message: 'Please agree to terms and conditions'})
                        this.showError()
                        this.setState({isFirstTime: true})
                        return
                    }else{
                    
                    sessionStorage.setItem('userID', userStudent.id)
                    sessionStorage.setItem('username', userStudent.name)
                    sessionStorage.setItem('schoolName', userStudent.name)
                    sessionStorage.setItem('schoolID', userStudent.school.id)
                    sessionStorage.setItem('isLoggedIn', true)                
                    
                    this.props.history.push('/student/dashboard')
                    }
                    
                }
                else {
                    this.setState({message: 'Invalid email or student id. Please try again.'})
                    this.showError()
                }
    
            }
            catch (error) {
                this.setState({message: 'Opps, something went wrong. Please try again.'})
                this.showError()
            }
        }

        return
        
    }
    
  render(){
    
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Login to Wise</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Email</span>
                    <input type="email" className="" value={this.state.email} onChange={this.handleChangeName.bind(this)} placeholder="Email" required/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" onChange={this.handleChangeKey.bind(this)} value={this.state.key} placeholder="Student ID" required/>
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
                <div className="spacer-vertical"></div>
                {this.state.isFirstTime ? 
                <React.Fragment>
                    <div classNamΩe="input-wrapper">
                        <div className="row content-center">
                            <div className="col">
                                <button className="mimic-radio" onClick={this.handleRadio.bind(this)} >{this.state.hasAgreedToTerms ? <strong>&#10003;</strong> : ''}</button>
                                <strong className="font-terms">&nbsp;I agree to the terms of use.</strong>
                                
                            </div>
                            
                        </div>
                        <div className="spacer-vertical"></div>
                    </div>
                </React.Fragment>
                : ''}
                <div className="test">
                        <input type="submit" className="btn" value="Submit" />
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


