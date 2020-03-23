import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { logout } from '../store/axios';

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
  render(){

    
    const { isAuthenticated, username } = this.context
      return(
          <header>
              <div className="logo"></div>
              <nav className="">
      {isAuthenticated === true ? 
      (<p className="nav-pos">Logged in as {username} <button className="btn-s" onClick={this.handleLogout.bind(this)} >Log out</button></p> ):
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
