import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import editIcon from '../Assets/images/edit-icon.png';

import { createSchool } from '../store/axios'
// name, setupKey, email, password


class SchoolStep1 extends Component {
    state={
        email: '',
        setupkey: '',
        password: '',
        name: ''
    };

    handleChangeName = e =>{
        this.setState({name: e.target.value})
    }
    handleChangeEmail = e =>{
        this.setState({email: e.target.value})
    }
    handleChangePW = e =>{
        this.setState({password: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value)
        
        this.setState({setupkey: e.target.value})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        
        console.log('state: ', this.state)
        const newSchool = createSchool(this.state.name, this.state.setupkey, this.state.email, this.state.password)
    }
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
            <h1>Create Your Shool</h1>

            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School name</span>
                    <input type="text" className="" name="name" id="basic-url" aria-describedby="basic-addon3" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School email</span>
                    <input type="email" name="email" className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}/>
                </div>

                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School password</span>
                    <input type="password" name="password" className="" value={this.state.password} onChange={this.handleChangePW.bind(this)} />
                </div>

                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School setupkey</span>
                    <input type="text" name="setupkey" className="" value={this.state.setupkey} onChange={this.handleChangeKey.bind(this)}/>
                </div>
 
                <div className="spacer-vertical"></div>
                <div className="">
                {/* <Link to="/create-school/step2"> */}
                    <button type="submit" className="btn">Next</button>
                {/* </Link> */}
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default SchoolStep1;