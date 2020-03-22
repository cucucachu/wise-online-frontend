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

import { AuthContext } from '../contexts/AuthContext'


class SchoolStep1 extends Component {
    static contextType = AuthContext

    state={
        email: '',
        setupkey: '',
        password: '',
        name: '',
        message: '',
        showHide: {display: 'none'}
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
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        const { getSchoolID, authToggle } = this.context
        const newSchool = createSchool(this.state.name, this.state.setupkey, this.state.email, this.state.password)

        //this object returns
        // ctx.body = {
        //     message: 'School created succesfully.',
        //     id: school.id,
        // }

        if(newSchool === 400){
            this.setState({message: newSchool.message})
            this.showError()
            
        }else{
            getSchoolID(newSchool.id)
            authToggle() 
            this.props.history.push('/create-school')
        }
        return
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
                    <div style={this.state.showHide}>{this.state.message}</div>
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
                    <input type="submit" className="btn" value="Next" />
                {/* </Link> */}
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default SchoolStep1;