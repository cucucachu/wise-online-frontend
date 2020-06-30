import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'
import { logout } from '../store/axios'

import chevronIcon from '../Assets/images/chevron-left.svg'

class Header extends Component {
  constructor( props ) {
    super( props );
}
  // static contextType = AuthContext
  state={
    redirect: false,
    schoolName: sessionStorage.getItem('schoolName'),
    username: sessionStorage.getItem('username'),
    isLoggedIn: sessionStorage.setItem('isLoggedIn')
  }
  handleLogout = () =>{

    sessionStorage.clear();
    logout()
  
    this.props.history.push("/");

  }

  handleGoBack = (e) =>{
    e.preventDefault()
    this.props.history.goBack();
  }



  render(){

    console.log('login: ', this.state.isLoggedIn);
    
    const historyPath = this.props.history.location.pathname
    
      return(
          <header>
              <div className="logo"></div>
              { historyPath === '/' || 
                historyPath === '/admin/download' ||
                historyPath === '/create-school' ||
                historyPath === '/professor/course' ||
                historyPath === '/student/dashboard'
               ? '' : (<button onClick={this.handleGoBack.bind(this)} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;Go back </button>)}
      
              <nav className="">
                { this.state.isLoggedIn === true ? 
                (<p className="nav-pos"><span className="hide-mobile">{ this.state.username === '' ?  'Logged in as ' + this.state.schoolName  : 'Logged in as ' + 	 this.state.username} </span><button className="btn-s" onClick={this.handleLogout.bind(this)} >Log out</button></p> ):
                ''}
              </nav>
                
          </header>
      )
  }
}

export default withRouter(Header)
