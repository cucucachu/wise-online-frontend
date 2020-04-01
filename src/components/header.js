import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { logout } from '../store/axios'

import chevronIcon from '../Assets/images/chevron-left.svg'

class Header extends Component {
  constructor( props ) {
    super( props );
}
  static contextType = AuthContext
  state={
    redirect: false
  }
  handleLogout = () =>{
    const { authToggle, isAuthenticated  } = this.context
    
    if(isAuthenticated){
      authToggle()
    }

    logout()
    this.props.history.push("/");

  }
  handleGoBack = (e) =>{
    e.preventDefault()
    this.props.history.goBack();
  }
  render(){

    
    const { isAuthenticated, username, schoolName } = this.context
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
      {isAuthenticated === true ? 
      (<p className="nav-pos">{ username === '' ? 'Logged in as ' + {schoolName} : 'Logged in as ' + 	 username} <button className="btn-s" onClick={this.handleLogout.bind(this)} >Log out</button></p> ):
      ''}
                <ul>

                    {/* <a href="#" ><li>Home</li></a>
                    <a href="#" ><li>Admin Login</li></a> */}
                </ul>
              </nav>
                
          </header>
      )
  }
}

export default withRouter(Header)
