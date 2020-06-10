import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { professorLogin } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

import loginIcon from '../Assets/images/login-icon.png';

class ProfessorLogin extends Component {
    static contextType = AuthContext

    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: { display: 'none'},
        // isFirstTime: false,
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
    // handleRadio = e =>{
    //     e.preventDefault()
    //     this.setState(prevState => ({
    //         isAgreed: !prevState.isAgreed
    //       }));

    // }
    handleSubmit = async e =>{
        e.preventDefault()
        // const { loggedinUser, authToggle } = this.context
        // if(this.state.hasAgreedToTerms === true){
            try{
                const response = await professorLogin(this.state.email, this.state.key)
                
                if(response.status === 200){
                    const userProfessor = response.data
                    console.log('user: ', userProfessor)
                    sessionStorage.setItem('userID', userProfessor.id)
                    sessionStorage.setItem('username', userProfessor.name)
                    sessionStorage.setItem('schoolName', userProfessor.name)
                    sessionStorage.setItem('schoolID', userProfessor.school.id)
                    sessionStorage.setItem('isLoggedIn', true)       
                    sessionStorage.setItem('professor', userProfessor)         
                    
                    this.props.history.push('/professor/course')
                }else{
                    this.setState({message: 'Invalid email or student id. Please try again.'})
                    this.showError()
                }
                
            }catch(error){
                this.setState({message: 'Opps, something went wrong. Please try again.'})
                this.showError()
            }
        // }else{
        //     try {
            
        //         const response = await professorLogin(this.state.email, this.state.key)
        //         const userProfessor = response.data
    
        //         if (response.status === 200) {
        //             // argument (name, id, schoolID)
        //             //check is the student ever checked terms and conditions
        //             if(userProfessor.hasAgreedToTerms === false){
        //                 //show checkbox
        //                 this.setState({message: 'Please agree to terms and conditions'})
        //                 this.showError()
        //                 this.setState({isFirstTime: true})
        //                 return
        //             }else{
                    
        //             sessionStorage.setItem('userID', userProfessor.id)
        //             sessionStorage.setItem('username', userProfessor.name)
        //             sessionStorage.setItem('schoolName', userProfessor.name)
        //             sessionStorage.setItem('schoolID', userProfessor.school.id)
        //             sessionStorage.setItem('isLoggedIn', true)                
                    
        //             this.props.history.push('/professor/course')
        //             }
                    
        //         }
        //         else {
        //             this.setState({message: 'Invalid email or student id. Please try again.'})
        //             this.showError()
        //         }
    
        //     }
        //     catch (error) {
        //         this.setState({message: 'Opps, something went wrong. Please try again.'})
        //         this.showError()
        //     }
        // }

        return
        
    }
  render(){
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Professor login</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label" >Email</span>
                    <input type="email" className="" value={this.state.email} placeholder="Email" onChange={this.handleChangeName.bind(this)} required/>
                </div>
                
                <div className="spacer-vertical"></div>
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
  
                <div className="spacer-vertical"></div>
            
                <div className="">
                        <input type="submit" className="btn" value="Next" />
                </div>
            </form>
    </div>
      )
  }
}

export default ProfessorLogin;


