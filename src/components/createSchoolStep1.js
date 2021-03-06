import React, { Component, Fragment } from 'react'

import editIcon from '../Assets/images/edit-icon.png';

import { createSchool, logout } from '../store/axios'
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
        
        this.setState({setupkey: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = async e =>{
        e.preventDefault()
        const { loggedinUser, authToggle } = this.context

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            const response = await createSchool(this.state.name, this.state.setupkey, emailLowerCase, this.state.password)
            const newSchool = response.data

            if (response.status === 200) {
                
                loggedinUser(newSchool.id, newSchool.school.name, newSchool.school.id)
                authToggle() 
                this.props.history.push('/admin-login')
            }else if(response.status === 401){
                sessionStorage.clear();
                logout()
                this.props.history.push({
                    pathname: '/admin-login',
                    state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                  })
            }
            else {
                this.setState({message: 'Sorry, we could not find a school with that setup key.'})
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
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
            <h1>Create Your School</h1>

            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">School name</span>
                    <input type="text" placeholder="School name" className="" name="name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">School email</span>
                    <input type="email" placeholder="School email" name="email" className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}/>
                </div>

                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">School password</span>
                    <input type="password" placeholder="School password" name="password" className="" value={this.state.password} onChange={this.handleChangePW.bind(this)} />
                </div>

                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">School setup key</span>
                    <input type="text" placeholder="School setup key" name="setupkey" className="" value={this.state.setupkey} onChange={this.handleChangeKey.bind(this)}/>
                </div>
 
                <div className="spacer-vertical-s"></div>
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