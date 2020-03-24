import React, { Component, Fragment } from 'react'
// import { 
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect
//    } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';
import { claimProfessorAccount } from '../store/axios'
// setupKey, email, password

import { AuthContext } from '../contexts/AuthContext'


class ProfessorClaim extends Component {
    static contextType = AuthContext

    state={
        email: '',
        conemail: '',
        setupkey: '',
        password: '',
        conpassword: '',
        showHide: {display: 'none'}
    };

    handleChangeEmail = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeConEmail = e =>{
        this.setState({conemail: e.target.value})
    }
    handleChangePW = e =>{
        this.setState({password: e.target.value})
    }
    handleChangeConPW = e =>{
        this.setState({conpassword: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value);
        
        this.setState({setupkey: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        console.log('state: ', this.state);
        const { getProfessorID } = this.context
        if(this.state.email === this.state.conemail && this.state.password === this.state.conpassword){
            
            const newProfessorAccount = claimProfessorAccount(this.state.setupkey, this.state.email, this.state.password)
            if(newProfessorAccount){
                //obj below return
                // ctx.body = {
                //     message: 'Account claimed succesfully.',
                //     id: professor.id,
                // }
                getProfessorID(newProfessorAccount.id)
                this.props.history.push('/professor/course')
                
            }
        }

    }
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
            <h1>Claim your account</h1>

            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Setupkey</span>
                    <input type="text" name="setupkey" className="" id="basic-url" aria-describedby="basic-addon3" value={this.state.setupkey} onChange={this.handleChangeKey.bind(this)} />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" name="email" className="" id="basic-url" aria-describedby="basic-addon3" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}/>
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Email</span>
                    <input type="email" name="conemail" className=""  value={this.state.conemail} onChange={this.handleChangeConEmail.bind(this)}/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div className="input-label">Password</div>
                    <input type="password" className="" name="password" value={this.state.password} onChange={this.handleChangePW.bind(this)}/>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Password</span>
                    <input type="password" name="confirmpassword" className="" value={this.state.conpassword} onChange={this.handleChangeConPW.bind(this)}/>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/set-up-school"><button className="btn">Next</button></Link> */}
                    <input type="submit" className="btn" value="Next" />
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default ProfessorClaim;