import React, { Component, Fragment } from 'react'

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
                this.props.history.push('/set-up-school')
            }
            else {
                this.setState({message: 'Sorry, we could not find a school with that setup key.'})
                this.showError()
            }
        }
        catch (error) {
            this.setState({message: 'Opps, something went wrong. Please try again.'})
            this.showError()
        }
        
        return
    }
    componentDidMount(){
        this.timer = setInterval(
            () => this.checkCookie(),
            
            300000
          );
      }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    checkCookie(){
    const { cookies } = this.context
    console.log('cookies: ', cookies);
    
    if(cookies === undefined){
        this.props.history.push('/professor-login')
    }else{return}
    }
  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
            <h1>Create Your School</h1>

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
                    <span className="input-label">School setup key</span>
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