import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

import { studentLogin } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'


class StudentLogin extends Component {
    static contextType = AuthContext

    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value);
        
        this.setState({key: e.target.value})
    }
    showError = () =>{
        // const displayStyle = {display: block}
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        
        const { loggedinUser, authToggle } = this.context
        // const userAdmin = studentLogin({email: this.state.name, password: this.state.key});
        const userStudent = studentLogin(this.state.email, this.state.key)

        //currently Promise pending due to DB connection 

        //for test to connect DB, use code below
        // if(userStudent){
        //     loggedinUser('Professor A', 'some id retunred')
        //     authToggle() 
        //     this.props.history.push('/student/dashboard')
        // }

        // error message TBD
        if(userStudent.status === 400){
            this.setState({message: userStudent.message})
            this.showError()
        }else{
            loggedinUser(userStudent.school.name, userStudent.school.id)
            authToggle() //tihs triggers redirect to next page at HomePage.js
            this.props.history.push('/student/dashboard')
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
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3"value={this.state.email} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" onChange={this.handleChangeKey.bind(this)} value={this.state.key} />
                </div>
                <div className="input-wrapper">
                    <div className="text-plain" style={{width: '58%'}}>
                        <Link to="#">What's my student ID?</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/student/dashboard"> */}
                        <input type="submit" className="btn" value="Submit" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


